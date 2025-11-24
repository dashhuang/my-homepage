'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { PhotoSets } from "./gallery-api";
import { getPhotoPathsClient } from "./gallery-api";

import Lightbox from "../components/Lightbox";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";
import { blurDataURL } from "../utils/imageBlurData";

// 相册组件
export default function Gallery() {
  const [photoSets, setPhotoSets] = useState<PhotoSets>({ standard: [], heic: [] });
  // 添加灯箱状态
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [] as string[],
    initialIndex: 0
  });
  
  // 打开灯箱
  const openLightbox = (images: string[], index: number) => {
    setLightbox({
      isOpen: true,
      images,
      initialIndex: index
    });
  };
  
  // 关闭灯箱
  const closeLightbox = () => {
    setLightbox(prev => ({
      ...prev,
      isOpen: false
    }));
  };
  
  // 在客户端获取照片列表
  useEffect(() => {
    // 通过API获取照片列表
    async function fetchPhotos() {
      try {
        const data = await getPhotoPathsClient();
        setPhotoSets(data);
      } catch (error) {
        console.error("获取照片错误:", error);
      }
    }
    
    fetchPhotos();
  }, []);
  
  // 柔和的配色方案
  const colors = {
    mint: '#c8d6cf',      // 淡薄荷绿色背景
    sand: '#d7cec0',      // 沙色块
    white: '#ffffff',     // 白色块
    darkText: '#3a3a3a',  // 深色文字
    lightText: '#6a6a6a'  // 浅色文字
  };

  return (
    <div style={{ 
      backgroundColor: colors.mint,
      minHeight: '100vh',
      fontFamily: '"Times New Roman", serif',
      color: colors.darkText,
      padding: '0',
      margin: '0'
    }}>
      {/* 导航菜单按钮 */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        left: '2rem', // right 改为 left
        zIndex: 100
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '1.5rem' }}>←</span>
          </button>
        </Link>
      </div>

      {/* 相册标题 */}
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

      {/* 相册内容 */}
      <div style={{
        padding: '0 5%',
        paddingBottom: '8rem',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* 标准格式图片 */}
        <div className="gallery-grid">
          {photoSets.standard.map((photo, index) => (
            <ScrollReveal 
              key={`standard-${index}`} 
              delay={(index % 4) * 100} // 每行的图片依次延迟显示，制造波浪感
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
                  onClick={() => openLightbox(photoSets.standard, index)}
                >
                  <Image
                    src={photo}
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
          
          {/* HEIC格式图片 - 保持原样但加上 ScrollReveal */}
          {photoSets.heic.map((photo, index) => (
             <ScrollReveal key={`heic-${index}`} delay={(index % 4) * 100}>
               <div className="gallery-item">
                <img
                  src={photo}
                  alt={`家庭照片 HEIC ${index + 1}`}
                  width={300}
                  height={300}
                  style={{ objectFit: 'cover', cursor: 'pointer', width: '100%', height: '100%' }}
                  onClick={() => openLightbox(photoSets.heic, index)}
                  onError={(e) => {
                    // 如果浏览器不支持HEIC，则隐藏图片
                    e.currentTarget.style.display = 'none';
                    // 安全地操作父元素
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      // 这里需要找到 TiltCard 或者 ScrollReveal 的外层并隐藏
                      // 简化起见，我们只隐藏 img
                    }
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      {/* 灯箱组件 */}
      <Lightbox 
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        onClose={closeLightbox}
      />
      
      {/* 页脚 */}
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

      {/* 添加CSS样式 */}
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