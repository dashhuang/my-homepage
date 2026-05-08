// 静态类型定义
export type PhotoAsset = {
  id: string;
  originalSrc: string;
  previewSrc: string;
  fullSrc: string;
  width: number;
  height: number;
  sourceFormat: string;
};

export type PhotoSets = {
  standard: PhotoAsset[];
  heic: PhotoAsset[];
};

const emptyPhotoSets: PhotoSets = { standard: [], heic: [] };

function normalizePhoto(photo: unknown): PhotoAsset | null {
  if (typeof photo === 'string') {
    return {
      id: photo,
      originalSrc: photo,
      previewSrc: photo,
      fullSrc: photo,
      width: 0,
      height: 0,
      sourceFormat: photo.split('.').pop()?.toLowerCase() || '',
    };
  }

  if (!photo || typeof photo !== 'object') {
    return null;
  }

  const candidate = photo as Partial<PhotoAsset>;
  if (!candidate.previewSrc || !candidate.fullSrc || !candidate.originalSrc) {
    return null;
  }

  return {
    id: candidate.id || candidate.originalSrc,
    originalSrc: candidate.originalSrc,
    previewSrc: candidate.previewSrc,
    fullSrc: candidate.fullSrc,
    width: candidate.width || 0,
    height: candidate.height || 0,
    sourceFormat: candidate.sourceFormat || '',
  };
}

function normalizePhotoSets(data: unknown): PhotoSets {
  if (!data || typeof data !== 'object') {
    return emptyPhotoSets;
  }

  const raw = data as { standard?: unknown[]; heic?: unknown[] };
  return {
    standard: (raw.standard || []).map(normalizePhoto).filter((photo): photo is PhotoAsset => Boolean(photo)),
    heic: (raw.heic || []).map(normalizePhoto).filter((photo): photo is PhotoAsset => Boolean(photo)),
  };
}

// 在客户端导入时使用的静态方法
export async function getPhotoPathsClient(): Promise<PhotoSets> {
  try {
    // 使用静态JSON文件而不是API路由
    const response = await fetch('/photos-data.json', { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error('获取照片失败');
    }
    return normalizePhotoSets(await response.json());
  } catch (error) {
    console.error("获取照片错误:", error);
    return emptyPhotoSets;
  }
}

export function allPhotos(photoSets: PhotoSets): PhotoAsset[] {
  return [...photoSets.standard, ...photoSets.heic];
}
