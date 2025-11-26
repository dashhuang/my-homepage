'use client';

import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // 动画速度，越小越快
  delay?: number; // 开始延迟
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ 
  text, 
  className = '', 
  style = {},
  speed = 2,
  delay = 0 
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const originalText = useRef(text);

  useEffect(() => {
    originalText.current = text;
    
    let frame = 0;
    let queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
    let animationId: number;
    let timeoutId: NodeJS.Timeout;

    // 初始化队列
    const initQueue = () => {
      queue = [];
      const len = originalText.current.length;
      for (let i = 0; i < len; i++) {
        const from = ''; // 起始字符（空）
        const to = originalText.current[i]; // 目标字符
        const start = Math.floor(Math.random() * 40); // 随机开始时间
        const end = start + Math.floor(Math.random() * 40); // 随机持续时间
        queue.push({ from, to, start, end });
      }
    };

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      if (elementRef.current) {
        elementRef.current.innerHTML = output;
      }
      
      if (complete === queue.length) {
        setIsAnimating(false);
      } else {
        frame += speed;
        animationId = requestAnimationFrame(update);
      }
    };

    const startAnimation = () => {
      setIsAnimating(true);
      initQueue();
      frame = 0;
      update();
    };

    // Intersection Observer: 当元素进入视口时触发
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timeoutId = setTimeout(startAnimation, delay);
        observer.disconnect();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [text, speed, delay]);

  return (
    <div 
      ref={elementRef} 
      className={className} 
      style={{ ...style, display: 'inline-block', whiteSpace: 'pre-wrap' }}
    />
  );
}


