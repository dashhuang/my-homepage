'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { colors } from '../constants/styles';
import { texts } from '../constants/texts';
import { getPhotoPathsClient } from '../gallery/gallery-api';
import { blurDataURL } from '../utils/imageBlurData';

interface PhotoGalleryPreviewProps {
  language: 'zh' | 'en';
  onImageClick: (imageSrc: string) => void;
}

// 从照片集合中随机选择特定数量的照片
const getRandomPhotos = (photos: string[], count: number) => {
  const photosCopy = [...photos];
  const result = [];
  
  for (let i = 0; i < count && photosCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * photosCopy.length);
    result.push(photosCopy[randomIndex]);
    photosCopy.splice(randomIndex, 1);
  }
  
  return result;
};

export default function PhotoGalleryPreview({ language, onImageClick }: PhotoGalleryPreviewProps) {
  const [randomPhotos, setRandomPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const photosLoadedRef = useRef(false);
  
  useEffect(() => {
    async function fetchPhotos() {
      if (photosLoadedRef.current) return;
      
      setIsLoading(true);
      try {
        const data = await getPhotoPathsClient();
        const allPhotos = [...data.standard, ...data.heic];
        const selected = getRandomPhotos(allPhotos, 8);
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
            <div 
              key={index} 
              style={{
                position: 'relative',
                height: '250px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }} 
              onClick={() => onImageClick(photo)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
            >
              <Image 
                src={photo}
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
