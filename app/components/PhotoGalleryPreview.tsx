'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { colors } from '../constants/styles';
import { texts } from '../constants/texts';
import { allPhotos, getPhotoPathsClient, type PhotoAsset } from '../gallery/gallery-api';
import { blurDataURL } from '../utils/imageBlurData';
import TiltCard from './TiltCard';

interface PhotoGalleryPreviewProps {
  language: 'zh' | 'en';
  onImageClick: (images: string[], index: number) => void;
}

// 从照片集合中随机选择特定数量的照片
const getRandomPhotos = (photos: PhotoAsset[], count: number) => {
  const photosCopy = [...photos];
  const result: PhotoAsset[] = [];
  
  for (let i = 0; i < count && photosCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * photosCopy.length);
    result.push(photosCopy[randomIndex]);
    photosCopy.splice(randomIndex, 1);
  }
  
  return result;
};

export default function PhotoGalleryPreview({ language, onImageClick }: PhotoGalleryPreviewProps) {
  const [randomPhotos, setRandomPhotos] = useState<PhotoAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const photosLoadedRef = useRef(false);
  
  useEffect(() => {
    async function fetchPhotos() {
      if (photosLoadedRef.current) return;
      
      setIsLoading(true);
      try {
        const data = await getPhotoPathsClient();
        const selected = getRandomPhotos(allPhotos(data), 8);
        setRandomPhotos(selected);
        photosLoadedRef.current = true;
      } catch (error) {
        console.error("获取照片错误:", error);
        photosLoadedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPhotos();
  }, []);

  return (
    <div style={{ marginBottom: '5rem' }}>
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: '300',
        marginBottom: '3rem',
        textAlign: 'center',
        color: colors.darkText
      }}>{texts.gallery[language]}</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {isLoading ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem 0',
            color: colors.lightText 
          }}>
            {language === 'zh' ? '加载照片中...' : 'Loading photos...'}
          </div>
        ) : randomPhotos.length > 0 ? (
          randomPhotos.map((photo, index) => (
            <TiltCard
              key={index}
              scale={1.05}
              maxRotation={8}
              glareMaxOpacity={0.3}
              style={{
                position: 'relative',
                height: '250px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              <div
                onClick={() => onImageClick(randomPhotos.map(photo => photo.fullSrc), index)}
                style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}
              >
                <Image 
                  src={photo.previewSrc}
                  alt={`${language === 'zh' ? '家庭照片' : 'Family photo'} ${index+1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  loading={index < 4 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            </TiltCard>
          ))
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem 0',
            color: colors.lightText 
          }}>
            {language === 'zh' ? '暂无照片可显示' : 'No photos available'}
          </div>
        )}
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <Link 
          href="/gallery" 
          style={{
            display: 'inline-block',
            color: colors.darkText,
            textDecoration: 'none',
            borderBottom: `1px solid ${colors.darkText}`,
            paddingBottom: '0.25rem',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottomWidth = '2px';
            e.currentTarget.style.paddingBottom = '0.15rem';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomWidth = '1px';
            e.currentTarget.style.paddingBottom = '0.25rem';
          }}
        >
          {texts.viewGallery[language]}
        </Link>
      </div>
    </div>
  );
}
