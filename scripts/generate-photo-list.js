#!/usr/bin/env node

/**
 * Scans public/family-photos, writes the single photo metadata source, and
 * generates browser-friendly WebP variants for gallery and lightbox use.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const args = new Set(process.argv.slice(2));
const isCheckMode = args.has('--check');
const force = args.has('--force');

const CONFIG = {
  photoDir: path.join(process.cwd(), 'public', 'family-photos'),
  optimizedDir: path.join(process.cwd(), 'public', 'family-photos-optimized'),
  jsonOutputFile: path.join(process.cwd(), 'public', 'photos-data.json'),
  imageExtensions: /\.(jpe?g|png|gif|heic)$/i,
  heicExtension: /\.heic$/i,
  variants: [
    {
      key: 'previewSrc',
      subdir: 'preview',
      width: 720,
      quality: 74,
    },
    {
      key: 'fullSrc',
      subdir: 'full',
      width: 2048,
      quality: 84,
    },
  ],
};

function publicPath(...segments) {
  return `/${segments.map(segment => encodeURIComponent(segment)).join('/')}`;
}

function stableSlug(fileName, usedSlugs) {
  const parsed = path.parse(fileName);
  const baseSlug = parsed.name
    .normalize('NFKD')
    .replace(/[^\w-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'photo';

  let slug = baseSlug;
  let suffix = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  usedSlugs.add(slug);
  return slug;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function canUseSips() {
  return process.platform === 'darwin';
}

function sortPhotoFiles(files) {
  return files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
}

async function buildPhotoEntries() {
  const files = sortPhotoFiles(
    fs.readdirSync(CONFIG.photoDir).filter(fileName => CONFIG.imageExtensions.test(fileName))
  );
  const usedSlugs = new Set();
  const entries = [];

  for (const fileName of files) {
    const sourcePath = path.join(CONFIG.photoDir, fileName);
    const slug = stableSlug(fileName, usedSlugs);
    const metadata = await sharp(sourcePath, { limitInputPixels: false }).metadata();
    const entry = {
      id: slug,
      originalSrc: publicPath('family-photos', fileName),
      previewSrc: publicPath('family-photos-optimized', 'preview', `${slug}.webp`),
      fullSrc: publicPath('family-photos-optimized', 'full', `${slug}.webp`),
      width: metadata.width || 0,
      height: metadata.height || 0,
      sourceFormat: (metadata.format || path.extname(fileName).slice(1)).toLowerCase(),
    };

    entries.push({
      fileName,
      sourcePath,
      kind: CONFIG.heicExtension.test(fileName) ? 'heic' : 'standard',
      entry,
    });
  }

  return entries;
}

function toPhotoData(entries) {
  return {
    standard: entries.filter(item => item.kind === 'standard').map(item => item.entry),
    heic: entries.filter(item => item.kind === 'heic').map(item => item.entry),
  };
}

function formatPhotoData(photoData) {
  return `${JSON.stringify(photoData, null, 2)}\n`;
}

async function writeWebpVariant(inputPath, outputPath, variant) {
  await sharp(inputPath, { limitInputPixels: false })
    .rotate()
    .resize({
      width: variant.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: variant.quality,
      effort: 4,
    })
    .toFile(outputPath);
}

async function writeHeicWithSipsFallback(item, outputPath, variant) {
  const tempDir = path.join(CONFIG.optimizedDir, '.tmp');
  const tempPath = path.join(tempDir, `${item.entry.id}-${variant.subdir}.jpg`);
  ensureDir(tempDir);

  try {
    execFileSync('sips', ['-s', 'format', 'jpeg', item.sourcePath, '--out', tempPath], {
      stdio: 'ignore',
    });
    await writeWebpVariant(tempPath, outputPath, variant);
  } finally {
    fs.rmSync(tempPath, { force: true });
  }
}

async function optimizePhoto(item) {
  const sourceStat = fs.statSync(item.sourcePath);
  let optimized = 0;
  let skipped = 0;

  for (const variant of CONFIG.variants) {
    const variantDir = path.join(CONFIG.optimizedDir, variant.subdir);
    const outputPath = path.join(variantDir, `${item.entry.id}.webp`);
    ensureDir(variantDir);

    if (!force && fs.existsSync(outputPath)) {
      const outputStat = fs.statSync(outputPath);
      if (outputStat.mtimeMs >= sourceStat.mtimeMs) {
        skipped += 1;
        continue;
      }
    }

    try {
      await writeWebpVariant(item.sourcePath, outputPath, variant);
    } catch (error) {
      if (item.kind !== 'heic' || !canUseSips()) {
        throw error;
      }
      await writeHeicWithSipsFallback(item, outputPath, variant);
    }
    optimized += 1;
  }

  return { optimized, skipped };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

function checkGeneratedFiles(entries) {
  const missing = [];
  for (const item of entries) {
    for (const variant of CONFIG.variants) {
      const outputPath = path.join(CONFIG.optimizedDir, variant.subdir, `${item.entry.id}.webp`);
      if (!fs.existsSync(outputPath)) {
        missing.push(path.relative(process.cwd(), outputPath));
      }
    }
  }
  return missing;
}

function removeStaleOptimizedFiles(entries) {
  const expected = new Set();
  for (const item of entries) {
    for (const variant of CONFIG.variants) {
      expected.add(path.join(CONFIG.optimizedDir, variant.subdir, `${item.entry.id}.webp`));
    }
  }

  let removed = 0;
  for (const variant of CONFIG.variants) {
    const variantDir = path.join(CONFIG.optimizedDir, variant.subdir);
    if (!fs.existsSync(variantDir)) continue;

    for (const fileName of fs.readdirSync(variantDir)) {
      if (!fileName.endsWith('.webp')) continue;
      const filePath = path.join(variantDir, fileName);
      if (!expected.has(filePath)) {
        fs.rmSync(filePath);
        removed += 1;
      }
    }
  }
  return removed;
}

async function main() {
  const entries = await buildPhotoEntries();
  const photoData = toPhotoData(entries);
  const expectedJson = formatPhotoData(photoData);

  if (isCheckMode) {
    const currentJson = fs.existsSync(CONFIG.jsonOutputFile)
      ? fs.readFileSync(CONFIG.jsonOutputFile, 'utf8')
      : '';
    const missingFiles = checkGeneratedFiles(entries);

    if (currentJson !== expectedJson || missingFiles.length > 0) {
      if (currentJson !== expectedJson) {
        console.error('Photo metadata is out of date. Run npm run update-photos.');
      }
      if (missingFiles.length > 0) {
        console.error('Optimized photo files are missing:');
        for (const filePath of missingFiles.slice(0, 20)) {
          console.error(`- ${filePath}`);
        }
        if (missingFiles.length > 20) {
          console.error(`...and ${missingFiles.length - 20} more`);
        }
      }
      process.exit(1);
    }

    console.log(`Photo metadata is current: ${photoData.standard.length} standard, ${photoData.heic.length} HEIC.`);
    return;
  }

  ensureDir(CONFIG.optimizedDir);
  const results = await mapWithConcurrency(entries, 4, optimizePhoto);
  const optimized = results.reduce((sum, result) => sum + result.optimized, 0);
  const skipped = results.reduce((sum, result) => sum + result.skipped, 0);
  const removed = removeStaleOptimizedFiles(entries);

  fs.writeFileSync(CONFIG.jsonOutputFile, expectedJson);
  console.log(`Updated photo metadata: ${photoData.standard.length} standard, ${photoData.heic.length} HEIC.`);
  console.log(`Optimized variants: ${optimized} written, ${skipped} already current, ${removed} stale removed.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
