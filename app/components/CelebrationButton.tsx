'use client';

import { useState } from 'react';

// 扩展Window接口以包含我们的全局方法
declare global {
  interface Window {
    triggerBalloonEffect?: () => void;
  }
}

interface CelebrationButtonProps {
  text?: string;
  englishText?: string;
  language?: 'zh' | 'en';
}

export default function CelebrationButton({ 
  text = '放飞气球', 
  englishText = 'Release Balloons',
  language = 'zh'
}: CelebrationButtonProps) {
  const [cooldown, setCooldown] = useState(false);
  
  const handleClick = () => {
    if (cooldown) return;
    
    // 触发气球效果
    if (typeof window !== 'undefined' && window.triggerBalloonEffect) {
      window.triggerBalloonEffect();
      
      // 设置冷却时间，避免频繁触发
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 30000); // 30秒冷却时间
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={cooldown}
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: cooldown ? '#ccc' : '#f59e0b',
        color: cooldown ? '#888' : '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: cooldown ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        margin: '1rem 0'
      }}
    >
      {language === 'zh' ? text : englishText}
      {cooldown && (
        <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
          {language === 'zh' ? '(冷却中)' : '(cooldown)'}
        </span>
      )}
    </button>
  );
} 