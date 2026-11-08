'use client';

import React, { useEffect, useRef, type PointerEvent } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  maxRotation?: number;    // 最大旋转角度，默认 10
  scale?: number;          // 悬停时缩放比例，默认 1.05
  className?: string;
  style?: React.CSSProperties;
  glareEnable?: boolean;   // 是否启用光泽效果，默认 true
  glareMaxOpacity?: number;// 光泽最大不透明度，默认 0.4
  perspective?: number;    // 透视深度，默认 1000
}

// 只在有精确指针、且用户没有要求减少动效时启用；触屏滑动时不会误触发倾斜
const TILT_MEDIA_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export default function TiltCard({
  children,
  maxRotation = 10,
  scale = 1.05,
  className = '',
  style = {},
  glareEnable = true,
  glareMaxOpacity = 0.4,
  perspective = 1000
}: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(TILT_MEDIA_QUERY);
    const update = () => { enabledRef.current = mediaQuery.matches; };
    update();
    mediaQuery.addEventListener('change', update);
    return () => {
      mediaQuery.removeEventListener('change', update);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // 直接写 DOM 样式，避免每次鼠标移动都触发 React 重新渲染
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabledRef.current || e.pointerType !== 'mouse') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const inner = innerRef.current;
      if (inner) {
        inner.style.transition = 'none';
        inner.style.transform = `rotateX(${(0.5 - y) * 2 * maxRotation}deg) rotateY(${(x - 0.5) * 2 * maxRotation}deg) scale(${scale})`;
      }
      const glare = glareRef.current;
      if (glare) {
        glare.style.transition = 'none';
        glare.style.opacity = String(glareMaxOpacity);
        glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`;
      }
    });
  };

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const inner = innerRef.current;
    if (inner) {
      inner.style.transition = 'transform 0.5s ease-out';
      inner.style.transform = '';
    }
    const glare = glareRef.current;
    if (glare) {
      glare.style.transition = 'opacity 0.5s ease-out';
      glare.style.opacity = '0';
    }
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        perspective: `${perspective}px`,
        // Keep the outer hit-test plane flat so tilted links receive pointer events.
        transformStyle: 'flat',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {children}

        {glareEnable && (
          <div
            ref={glareRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
              zIndex: 10,
              borderRadius: 'inherit'
            }}
          />
        )}
      </div>
    </div>
  );
}
