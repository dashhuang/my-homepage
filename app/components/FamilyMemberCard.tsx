'use client';

import Image from "next/image";
import { colors } from '../constants/styles';
import { blurDataURL } from '../utils/imageBlurData';

interface FamilyMemberCardProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  layout?: 'horizontal' | 'horizontal-reverse' | 'vertical';
}

export default function FamilyMemberCard({ 
  name, 
  title, 
  description, 
  imageSrc, 
  layout = 'horizontal' 
}: FamilyMemberCardProps) {
  if (layout === 'vertical') {
    return (
      <div style={{
        flex: '1',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        {/* 上方照片 */}
        <div style={{
          backgroundColor: colors.sand,
          minHeight: '300px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Image 
            src={imageSrc}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
        {/* 下方内容 */}
        <div style={{
          backgroundColor: colors.white,
          padding: '3rem',
          flex: '1'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            fontWeight: '300',
            marginBottom: '1rem',
            color: colors.darkText
          }}>{name}</h3>
          <div style={{
            width: '30px',
            height: '2px',
            backgroundColor: colors.sand,
            marginBottom: '1.5rem'
          }}></div>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: colors.lightText,
            marginBottom: '1rem'
          }}>
            {title}
          </p>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: colors.lightText
          }}>
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'horizontal-reverse' ? 'row-reverse' : 'row',
      flexWrap: 'wrap',
      marginBottom: '8rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    }}>
      {/* 照片 */}
      <div style={{
        backgroundColor: colors.sand,
        flex: '1',
        minWidth: '300px',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Image 
          src={imageSrc}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      {/* 内容 */}
      <div style={{
        backgroundColor: colors.white,
        flex: '1',
        minWidth: '300px',
        padding: '4rem',
        position: 'relative'
      }}>
        <h3 style={{
          fontSize: 'clamp(2rem, 3vw, 2.5rem)',
          fontWeight: '300',
          marginBottom: '1.5rem',
          color: colors.darkText
        }}>{name}</h3>
        <div style={{
          width: '50px',
          height: '2px',
          backgroundColor: colors.sand,
          marginBottom: '2rem'
        }}></div>
        <p 
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: colors.lightText,
            marginBottom: '1.5rem'
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
