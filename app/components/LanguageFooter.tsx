'use client';

import { useState, useEffect } from "react";

export function LanguageFooter() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [isClient, setIsClient] = useState(false);

  // 设置客户端渲染标记
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 从localStorage读取语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as 'zh' | 'en' | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        // 如果没有保存过语言设置，检测浏览器语言
        const browserLang = navigator.language.toLowerCase();
        const preferredLang = browserLang.startsWith('zh') ? 'zh' : 'en';
        setLanguage(preferredLang);
        localStorage.setItem('language', preferredLang);
      }
    }
  }, []);

  // 监听语言变化事件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLanguageChange = (e: CustomEvent) => {
        setLanguage(e.detail.language);
      };

      window.addEventListener('languageChange' as any, handleLanguageChange);
      return () => {
        window.removeEventListener('languageChange' as any, handleLanguageChange);
      };
    }
  }, []);

  return (
    <footer style={{
      textAlign: 'right',
      padding: '1rem 2rem',
      marginTop: '2rem',
      fontSize: '0.9rem',
      color: '#666',
      fontWeight: 300,
      backgroundColor: 'rgba(200, 214, 207, 0.3)',
      position: 'relative'
    }}>
      <p style={{ margin: 0 }}>
        {isClient && (language === 'zh' ? 
          <>本页由 <span style={{ color: '#e25555' }}>❤️</span> + <span style={{ fontWeight: 500 }}>Cursor</span> + <span style={{ fontWeight: 500 }}>Next.js</span> 构建</> : 
          <>Built with <span style={{ color: '#e25555' }}>❤️</span> + <span style={{ fontWeight: 500 }}>Cursor</span> + <span style={{ fontWeight: 500 }}>Next.js</span></>
        )}
      </p>
    </footer>
  );
} 