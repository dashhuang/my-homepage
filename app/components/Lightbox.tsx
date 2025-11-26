/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useCallback } from 'react';

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ isOpen, images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // 当 isOpen 或 initialIndex 变化时更新内部状态
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setLoading(true);
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'auto';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialIndex]);

  // 重置 loading 状态当索引改变
  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  // 处理键盘事件
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, showPrev, showNext]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={`lightbox-overlay ${isAnimating ? 'open' : ''}`}
      onClick={onClose}
    >
      {/* 背景遮罩 */}
      <div className="lightbox-backdrop" />

      {/* 关闭按钮 */}
      <button
        aria-label="关闭"
        className="lightbox-close"
        onClick={onClose}
      >
        ✕
      </button>

      {/* 上一张按钮 */}
      <button
        aria-label="上一张"
        className="lightbox-nav prev"
        onClick={(e) => { e.stopPropagation(); showPrev(); }}
      >
        ‹
      </button>

      {/* 下一张按钮 */}
      <button
        aria-label="下一张"
        className="lightbox-nav next"
        onClick={(e) => { e.stopPropagation(); showNext(); }}
      >
        ›
      </button>
      
      {/* 图片容器 */}
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 加载占位动画 */}
        {loading && (
          <div className="lightbox-loader">
            <div className="spinner"></div>
          </div>
        )}
        
        <img
          key={currentImage} // Key change forces re-render for animation
          src={currentImage}
          alt={`Photo ${currentIndex + 1}`}
          className={`lightbox-image ${loading ? 'loading' : 'loaded'}`}
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* 计数器 - 移到外部固定到底部 */}
      <div className="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>

      <style jsx>{`
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .lightbox-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .lightbox-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.95); /* 更深邃的背景 */
          backdrop-filter: blur(10px); /* 模糊背景 */
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90vh;
          z-index: 10002;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .lightbox-image.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10003;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          backdrop-filter: blur(5px);
        }

        .lightbox-close:hover {
          background: rgba(255,255,255,0.3);
          transform: rotate(90deg);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
          z-index: 10003;
          width: 50px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border-radius: 4px;
          padding-bottom: 8px; /* 修正箭头垂直居中 */
          backdrop-filter: blur(5px);
        }

        .lightbox-nav:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav.prev { left: 20px; }
        .lightbox-nav.next { right: 20px; }

        .lightbox-counter {
          position: absolute;
          bottom: 30px; /* 固定在屏幕底部 */
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          letter-spacing: 1px;
          z-index: 10003; /* 确保在最上层 */
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .lightbox-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* 移动端适配 */
        @media (max-width: 768px) {
          .lightbox-nav {
            background: transparent;
            width: 40px;
            height: 60px;
          }
          .lightbox-nav.prev { left: 5px; }
          .lightbox-nav.next { right: 5px; }
        }
      `}</style>
    </div>
  );
}
