'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { PhotoSets } from "./gallery-api";

// 相册组件
export default function Gallery() {
  const [photoSets, setPhotoSets] = useState<PhotoSets>({ standard: [], heic: [] });
  
  // 在服务器端获取照片列表
  useEffect(() => {
    // 通过API获取照片列表
    async function fetchPhotos() {
      try {
        const response = await fetch('/api/photos');
        if (response.ok) {
          const data = await response.json();
          setPhotoSets(data);
        }
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
        right: '2rem',
        zIndex: 100
      }}>
        <Link href="/">
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
            <div key={`standard-${index}`} className="gallery-item">
              <Image
                src={photo}
                alt={`家庭照片 ${index + 1}`}
                width={300}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
          
          {/* HEIC格式图片 - 使用img标签代替Image组件，以便实现客户端错误处理 */}
          {photoSets.heic.map((photo, index) => (
            <div key={`heic-${index}`} className="gallery-item">
              <img
                src={photo}
                alt={`家庭照片 HEIC ${index + 1}`}
                width={300}
                height={300}
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  // 如果浏览器不支持HEIC，则隐藏图片
                  e.currentTarget.style.display = 'none';
                  // 安全地操作父元素
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.display = 'none';
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
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
        }}>© 2024 黄家 · Huang Family</p>
      </footer>

      {/* 添加CSS样式 */}
      <style jsx global>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        
        .gallery-item {
          height: 300px;
          overflow: hidden;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          position: relative;
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .gallery-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
} 