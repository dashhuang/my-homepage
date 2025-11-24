'use client';

import React, { useRef, useState, MouseEvent, TouchEvent, useCallback } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  // 统一处理坐标计算逻辑
  const calculateTilt = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // 计算相对于元素左上角的坐标
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 计算中心点归一化坐标 (-1 到 1)
    const xPct = (x / width - 0.5) * 2;
    const yPct = (y / height - 0.5) * 2;

    // 计算旋转角度
    const rotateX = -1 * yPct * maxRotation;
    const rotateY = xPct * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
    
    if (glareEnable) {
      setGlarePosition({
        x: (x / width) * 100,
        y: (y / height) * 100,
        opacity: glareMaxOpacity
      });
    }
  }, [maxRotation, glareEnable, glareMaxOpacity]);

  // 鼠标事件处理
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    calculateTilt(e.clientX, e.clientY);
  }, [calculateTilt]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  // 触摸事件处理
  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    // 阻止默认滚动行为（如果需要完全接管触摸），但这里我们可能希望保留滚动
    // 只有当用户意图明显是操作卡片时才可能需要阻止，这里暂不阻止
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      calculateTilt(touch.clientX, touch.clientY);
    }
  }, [calculateTilt]);

  const handleTouchStart = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        // 在移动端可能需要 touch-action: none 来防止滚动干扰，但对于大卡片这会破坏页面滚动
        // 所以我们只在小卡片上可能需要注意。这里暂不强制 touch-action。
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: isHovering 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovering ? 'none' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {children}
        
        {/* 光泽层 */}
        {glareEnable && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(
                circle at ${glarePosition.x}% ${glarePosition.y}%, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,255,255,0) 80%
              )`,
              opacity: glarePosition.opacity,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
              transition: isHovering ? 'none' : 'opacity 0.5s ease-out',
              zIndex: 10,
              borderRadius: 'inherit'
            }}
          />
        )}
      </div>
    </div>
  );
}
