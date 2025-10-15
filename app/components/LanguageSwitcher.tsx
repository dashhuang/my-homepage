'use client';

import { texts } from '../constants/texts';

interface LanguageSwitcherProps {
  language: 'zh' | 'en';
  onToggle: () => void;
}

export default function LanguageSwitcher({ language, onToggle }: LanguageSwitcherProps) {
  return (
    <button 
      onClick={onToggle}
      aria-label={`切换语言 / Switch Language to ${language === 'zh' ? 'English' : '中文'}`}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
        fontWeight: '500'
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
