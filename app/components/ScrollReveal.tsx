'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number; // 0-1, 多少比例进入视口时触发
  delay?: number;     // 延迟时间 (ms)
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({ 
  children, 
  threshold = 0.1, 
  delay = 0,
  className = '',
  style = {}
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 设置一个小延迟，让动画更有节奏感
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          // 触发后取消观察，只播放一次动画
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      style={{
        ...style,
        // 如果还没显示，保持透明以避免闪烁
        // 注意：animate-fade-up 也会设置 opacity: 0 -> 1，这里是为了防止 JS 加载前的闪烁
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.1s' 
      }}
    >
      {children}
    </div>
  );
}


