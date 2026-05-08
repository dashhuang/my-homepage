'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PhotoSets } from "./gallery-api";
import { allPhotos } from "./gallery-api";

import Lightbox from "../components/Lightbox";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";
import { blurDataURL } from "../utils/imageBlurData";

interface GalleryClientProps {
  photoSets: PhotoSets;
}

export default function GalleryClient({ photoSets }: GalleryClientProps) {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [] as string[],
    initialIndex: 0
  });

  const openLightbox = (images: string[], index: number) => {
    setLightbox({
      isOpen: true,
      images,
      initialIndex: index
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const colors = {
    mint: '#c8d6cf',
    white: '#ffffff',
    darkText: '#3a3a3a',
    lightText: '#6a6a6a'
  };
  const galleryPhotos = allPhotos(photoSets);
  const lightboxImages = galleryPhotos.map(photo => photo.fullSrc);

  return (
    <div style={{
      backgroundColor: colors.mint,
      minHeight: '100vh',
      fontFamily: '"Times New Roman", serif',
      color: colors.darkText,
      padding: '0',
      margin: '0'
    }}>
      <div style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        zIndex: 100
      }}>
        <Link
          href="/"
          aria-label="返回首页"
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            textDecoration: 'none'
          }}>
          <span style={{ fontSize: '1.5rem' }}>←</span>
        </Link>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '8rem 0 4rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '300',
          margin: '0',
          color: colors.darkText
        }}>家庭相册</h1>
        <p style={{
          margin: '1.5rem 0 0',
          fontSize: '1.2rem',
          color: colors.lightText,
          lineHeight: '1.6'
        }}>我们家庭的珍贵回忆</p>
      </div>

      <div style={{
        padding: '0 5%',
        paddingBottom: '8rem',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div className="gallery-grid">
          {galleryPhotos.map((photo, index) => (
            <ScrollReveal
              key={photo.id}
              delay={(index % 4) * 100}
              threshold={0.1}
            >
              <TiltCard
                scale={1.05}
                maxRotation={10}
                glareMaxOpacity={0.3}
                style={{
                  height: '300px',
                  borderRadius: '4px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  className="gallery-item-inner"
                  style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}
                  onClick={() => openLightbox(lightboxImages, index)}
                >
                  <Image
                    src={photo.previewSrc}
                    alt={`家庭照片 ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover', cursor: 'pointer' }}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    loading="lazy"
                  />
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        onClose={closeLightbox}
      />

      <footer style={{
        backgroundColor: colors.white,
        padding: '3rem',
        textAlign: 'center'
      }}>
        <p style={{
          margin: '0',
          fontSize: '0.9rem',
          color: colors.lightText
        }}>
          © {new Date().getFullYear()} 黄 · Huang
        </p>
        <p style={{
          fontSize: '0.85rem',
          color: '#999',
          marginTop: '0.5rem',
          fontWeight: 300
        }}>
          本页由 <span style={{ color: '#e25555' }}>❤️</span> + <span style={{ fontWeight: 500 }}>Cursor</span> + <span style={{ fontWeight: 500 }}>Next.js</span> 构建
        </p>
      </footer>

      <style jsx global>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
      `}</style>
    </div>
  );
}
