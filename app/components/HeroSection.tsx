'use client';

import Image from "next/image";
import { colors, photos } from '../constants/styles';
import { texts } from '../constants/texts';
import { blurDataURL } from '../utils/imageBlurData';

interface HeroSectionProps {
  language: 'zh' | 'en';
}

export default function HeroSection({ language }: HeroSectionProps) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: colors.mint,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          margin: '0 auto',
          width: '90%',
          maxWidth: '1600px',
          height: 'auto',
          minHeight: '75vh',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          boxSizing: 'border-box'
        }}>
          {/* 左侧照片 */}
          <div style={{
            flex: '8',
            minWidth: '300px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '300px'
          }}>
            <Image 
              src={photos.hero}
              alt={language === 'zh' ? '家庭照片' : 'Family photo'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>

          {/* 右侧内容 */}
          <div style={{
            backgroundColor: colors.white,
            flex: '5',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 5vw, 5rem)',
            position: 'relative',
            boxSizing: 'border-box'
          }}>
            <div style={{
              position: 'relative',
              padding: '2rem 0'
            }}>
              <div style={{
                position: 'relative',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontWeight: '300',
                  margin: '0',
                  padding: '0',
                  border: 'none',
                  textDecoration: 'none'
                }}>
                  <div style={{
                    display: 'block',
                    fontSize: 'clamp(4rem, 6vw, 7rem)',
                    fontWeight: '300',
                    margin: '0 0 0.5rem',
                    lineHeight: '1.2',
                    color: colors.darkText,
                    fontFamily: '"造字工房朗宋", "汉仪瑞兽", "FZLangSong", "华文隶书", "LiSu", serif',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    border: 'none'
                  }}>
                    黄
                  </div>
                  <div style={{ 
                    display: 'block',
                    fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', 
                    fontWeight: '300',
                    opacity: 0.7,
                    color: colors.darkText,
                    fontFamily: '"Cinzel", "Trajan Pro", "Times New Roman", serif',
                    fontStyle: 'italic',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    border: 'none'
                  }}>
                    Huang
                  </div>
                </div>
              </div>
              <div style={{
                marginTop: '2rem',
                fontSize: 'clamp(1rem, 1.3vw, 1.3rem)',
                lineHeight: '1.8',
                letterSpacing: '0.02em',
                color: colors.darkText,
                maxWidth: '600px'
              }} 
                dangerouslySetInnerHTML={{ __html: texts.homeIntro[language] }}
              />
              
              <a 
                href="#family" 
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  color: colors.darkText,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${colors.darkText}`,
                  paddingBottom: '0.25rem',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomWidth = '2px';
                  e.currentTarget.style.paddingBottom = '0.15rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomWidth = '1px';
                  e.currentTarget.style.paddingBottom = '0.25rem';
                }}
              >
                {texts.exploreFamily[language]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
