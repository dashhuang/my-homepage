'use client';

import { useState, useEffect } from 'react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageSrc, onClose }: LightboxProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复背景滚动
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        cursor: 'zoom-out'
      }}
      onClick={onClose}
    >
      {/* 关闭按钮 */}
      <button
        aria-label="关闭图片查看器"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1001,
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        ✕
      </button>
      
      {/* 图片容器 */}
      <div
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt="原图"
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            cursor: 'default',
            display: loading ? 'none' : 'block'
          }}
          onLoad={handleImageLoad}
        />
        {/* 加载指示器 */}
        {loading && (
          <div style={{ 
            color: 'white',
            fontSize: '1.2rem',
            textAlign: 'center'
          }}>
            加载中...
          </div>
        )}
      </div>
    </div>
  );
}
