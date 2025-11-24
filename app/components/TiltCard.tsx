'use client';

import React, { useRef, useState, MouseEvent, useCallback } from 'react';

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

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // 计算鼠标相对于元素左上角的坐标
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 计算中心点归一化坐标 (-1 到 1)
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    // 计算旋转角度
    // yPct > 0 (下方) -> rotateX 应该是负数 (向后倒) -> 实际上 css rotateX 正值是上半部分向后，负值是上半部分向前
    // 我们希望鼠标在上面时，上半部分下沉(向后)，rotateX > 0
    // 鼠标在下面时，下半部分下沉(向后)，rotateX < 0
    // Wait, rotateX(10deg) means the top moves away from viewer.
    // So if mouse is at top (yPct < 0), we want rotateX > 0.
    // So rotateX = -1 * yPct * maxRotation
    const rotateX = -1 * yPct * maxRotation;
    const rotateY = xPct * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
    
    if (glareEnable) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: glareMaxOpacity
      });
    }
  }, [maxRotation, glareEnable, glareMaxOpacity]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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


