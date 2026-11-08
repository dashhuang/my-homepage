'use client';

import Link from "next/link";
import { useState } from "react";
import { texts } from '../constants/texts';
import { localePath, type Lang } from '../lib/i18n';
import type { Photo } from '../lib/photos';
import { pickRandom } from '../utils/random';
import PhotoGrid from './PhotoGrid';
import styles from './PhotoGalleryPreview.module.css';

interface PhotoGalleryPreviewProps {
  lang: Lang;
  initialPhotos: Photo[];
  pool: Photo[]; // 服务端随机挑好的候选池，"换一批"从这里取
}

export default function PhotoGalleryPreview({ lang, initialPhotos, pool }: PhotoGalleryPreviewProps) {
  const [photos, setPhotos] = useState(initialPhotos);

  const shuffle = () => {
    const shown = new Set(photos.map(photo => photo.id));
    const fresh = pool.filter(photo => !shown.has(photo.id));
    setPhotos(pickRandom(fresh.length >= photos.length ? fresh : pool, photos.length));
  };

  return (
    <div className={styles.preview}>
      <h2 className={styles.heading}>{texts.gallery[lang]}</h2>

      <PhotoGrid photos={photos} lang={lang} />

      <div className={styles.actions}>
        {pool.length > photos.length && (
          <button type="button" className={`text-link ${styles.shuffle}`} onClick={shuffle}>
            ↻ {texts.shufflePhotos[lang]}
          </button>
        )}
        <Link href={localePath(lang, '/gallery')} className="text-link">
          {texts.viewGallery[lang]}
        </Link>
      </div>
    </div>
  );
}
