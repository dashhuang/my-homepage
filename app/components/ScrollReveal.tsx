'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number; // 0-1, 多少比例进入视口时触发
  delay?: number;     // 延迟时间 (ms)
  className?: string;
  style?: React.CSSProperties;
}

// 初始隐藏样式和过渡都在 globals.css 的 .reveal 中；减少动效或无 JS 时直接显示
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
    const element = domRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setIsVisible(true);
        observer.disconnect(); // 只播放一次
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
