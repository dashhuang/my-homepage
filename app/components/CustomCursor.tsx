'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // 默认认为是移动端，避免闪烁，挂载后检测
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // 检测是否是移动设备或触摸设备
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
             window.matchMedia("(pointer: coarse)").matches;
    };
    
    setIsMobile(checkMobile());

    if (checkMobile()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // 鼠标移动
    const moveCursor = (e: MouseEvent) => {
      // 使用 translate3d 提高性能
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    // 悬停检测
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer';

      setIsHovering(!!isInteractive);
    };

    // 点击检测
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 隐藏默认光标 (可选，但为了体验通常只在 body 上设置)
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border: 1px solid rgba(0, 0, 0, 0.5);
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference; /* 关键：反色效果 */
          transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
          will-change: transform;
        }

        /* 悬停状态：变大 */
        .custom-cursor.hover {
          width: 50px;
          height: 50px;
          background-color: white;
          border-color: transparent;
          mix-blend-mode: difference;
        }

        /* 点击状态：缩小 */
        .custom-cursor.clicking {
          transform: translate3d(var(--x), var(--y), 0) translate(-50%, -50%) scale(0.8) !important; /* 需要 JS 配合变量，这里简化处理，只靠 CSS 无法直接获取 transform 值，所以通过 JS 设置 transform 更好 */
          /* 由于 transform 是内联设置的，这里 scale 需要 careful */
          /* 实际上，直接修改 width/height 更简单 */
          width: 15px;
          height: 15px;
        }
        
        /* 确保所有可点击元素都没有默认光标 */
        a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}


