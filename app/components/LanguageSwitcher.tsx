'use client';

import { texts } from '../constants/texts';

interface LanguageSwitcherProps {
  language: 'zh' | 'en';
  onToggle: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function LanguageSwitcher({ language, onToggle, className, style }: LanguageSwitcherProps) {
  return (
    <button 
      onClick={onToggle}
      className={className}
      aria-label={`切换语言 / Switch Language to ${language === 'zh' ? 'English' : '中文'}`}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        fontWeight: '500',
        color: '#333',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
      }}
    >
      {texts.languageSwitch[language]}
    </button>
  );
}
