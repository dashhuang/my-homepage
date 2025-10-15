'use client';

import { useState, useEffect } from "react";
import { colors, photos } from "./constants/styles";
import { texts } from "./constants/texts";
import HeroSection from "./components/HeroSection";
import FamilyMemberCard from "./components/FamilyMemberCard";
import PhotoGalleryPreview from "./components/PhotoGalleryPreview";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Lightbox from "./components/Lightbox";

// 定义自定义事件类型
interface LanguageChangeEventDetail {
  language: 'zh' | 'en';
}

export default function Home() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentImage: ''
  });
  
  // 初始化语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as 'zh' | 'en' | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        const browserLang = navigator.language.toLowerCase();
        const preferredLang = browserLang.startsWith('zh') ? 'zh' : 'en';
        setLanguage(preferredLang);
        localStorage.setItem('language', preferredLang);
        document.documentElement.lang = preferredLang === 'zh' ? 'zh-CN' : 'en';
      }
    }
  }, []);
  
  // 切换语言
  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';
    
    const event = new CustomEvent<LanguageChangeEventDetail>('languageChange', { 
      detail: { language: newLang } 
    });
    window.dispatchEvent(event);
  };
  
  // 打开灯箱
  const openLightbox = (imageSrc: string) => {
    setLightbox({
      isOpen: true,
      currentImage: imageSrc
    });
  };
  
  // 关闭灯箱
  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      currentImage: ''
    });
  };

  return (
    <div style={{ 
      backgroundColor: colors.mint,
      minHeight: '100vh',
      fontFamily: '"Times New Roman", serif',
      color: colors.darkText,
      padding: '0',
      margin: '0'
    }}>
      {/* 语言切换按钮 */}
      <LanguageSwitcher language={language} onToggle={toggleLanguage} />

      {/* 主页块 */}
      <HeroSection language={language} />

      {/* 家庭成员部分 */}
      <section id="family" style={{ padding: '15vh 0' }}>
        <div style={{
          margin: '0 auto',
          width: '90%',
          maxWidth: '1600px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300',
            marginBottom: '5rem',
            textAlign: 'center',
            color: colors.darkText
          }}>{texts.familyMembers[language]}</h2>

          {/* Dash */}
          <FamilyMemberCard
            name={texts.dash.name[language]}
            title={texts.dash.title[language]}
            description={texts.dash.desc[language]}
            imageSrc={photos.dash}
            layout="horizontal"
          />

          {/* Cherry */}
          <FamilyMemberCard
            name={texts.cherry.name[language]}
            title={texts.cherry.title[language]}
            description={texts.cherry.desc[language]}
            imageSrc={photos.cherry}
            layout="horizontal-reverse"
          />

          {/* 孩子们 - 并排展示 */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '8rem'
          }}>
            <FamilyMemberCard
              name={texts.jimmy.name[language]}
              title={texts.jimmy.title[language]}
              description={texts.jimmy.desc[language]}
              imageSrc={photos.jimmy}
              layout="vertical"
            />
            
            <FamilyMemberCard
              name={texts.tinny.name[language]}
              title={texts.tinny.title[language]}
              description={texts.tinny.desc[language]}
              imageSrc={photos.tinny}
              layout="vertical"
            />
            
            <FamilyMemberCard
              name={texts.kelly.name[language]}
              title={texts.kelly.title[language]}
              description={texts.kelly.desc[language]}
              imageSrc={photos.kelly}
              layout="vertical"
            />
          </div>

          {/* 相册预览 */}
          <PhotoGalleryPreview 
            language={language} 
            onImageClick={openLightbox}
          />
        </div>
      </section>

      {/* 底部 */}
      <section style={{
        backgroundColor: colors.white,
        padding: '10vh 0'
      }}>
        <div style={{
          margin: '0 auto',
          width: '90%',
          maxWidth: '800px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '1.2rem',
            color: colors.lightText,
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>© 2024 黄 · Huang</p>
        </div>
      </section>

      {/* 灯箱组件 */}
      <Lightbox 
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.currentImage}
        onClose={closeLightbox}
      />
    </div>
  );
}
