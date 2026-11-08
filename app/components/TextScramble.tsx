'use client';

import { useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number; // 动画速度，越小越快
  delay?: number; // 开始延迟
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

const escapeHtml = (char: string) =>
  char === '<' ? '&lt;' : char === '>' ? '&gt;' : char === '&' ? '&amp;' : char;

export default function TextScramble({
  text,
  className = '',
  style = {},
  speed = 2,
  delay = 0
}: TextScrambleProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 减少动效时直接显示最终文字
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = text;
      return;
    }

    let frame = 0;
    let animationId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const queue = Array.from(text, to => {
      const start = Math.floor(Math.random() * 40); // 随机开始时间
      const end = start + Math.floor(Math.random() * 40); // 随机持续时间
      return { to, start, end, char: '' };
    });

    const update = () => {
      let output = '';
      let complete = 0;

      for (const item of queue) {
        if (frame >= item.end) {
          complete++;
          output += escapeHtml(item.to);
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += `<span class="dud">${escapeHtml(item.char)}</span>`;
        }
      }

      element.innerHTML = output;

      if (complete < queue.length) {
        frame += speed;
        animationId = requestAnimationFrame(update);
      }
    };

    // 元素进入视口时才开始
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timeoutId = setTimeout(update, delay);
        observer.disconnect();
      }
    });
    observer.observe(element);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [text, speed, delay]);

  return (
    <span className={className} style={style}>
      {/* 屏幕阅读器和搜索引擎读取完整文字，动画层对它们隐藏 */}
      <span className="sr-only">{text}</span>
      <span ref={elementRef} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }} />
    </span>
  );
}
