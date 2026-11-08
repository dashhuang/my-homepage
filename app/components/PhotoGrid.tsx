'use client';

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { texts } from '../constants/texts';
import type { Lang } from '../lib/i18n';
import type { Photo } from '../lib/photos';
import Lightbox from './Lightbox';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: Photo[];
  lang: Lang;
  eagerCount?: number;
}

// 等高行布局：每张图按原始宽高比占位，不裁切，同时保持从左到右的阅读顺序
export default function PhotoGrid({ photos, lang, eagerCount = 0 }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fullImages = useMemo(() => photos.map(photo => photo.fullSrc), [photos]);

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((photo, index) => {
          const ratio = photo.width && photo.height ? photo.width / photo.height : 1;
          return (
            <li key={photo.id} className={styles.item} style={{ '--ratio': ratio } as CSSProperties}>
              <button type="button" className={styles.button} onClick={() => setOpenIndex(index)}>
                {/* 预览图已由 update-photos 生成为 720px WebP，不再走 Next 图片优化 */}
                <Image
                  src={photo.previewSrc}
                  alt={`${texts.familyPhoto[lang]} ${index + 1}`}
                  fill
                  unoptimized
                  loading={index < eagerCount ? 'eager' : 'lazy'}
                  className={styles.image}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <Lightbox
        isOpen={openIndex !== null}
        images={fullImages}
        initialIndex={openIndex ?? 0}
        onClose={() => setOpenIndex(null)}
        lang={lang}
      />
    </>
  );
}
