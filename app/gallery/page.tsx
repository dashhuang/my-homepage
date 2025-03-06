import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";

export default function Gallery() {
  // 柔和的配色方案
  const colors = {
    mint: '#c8d6cf',      // 淡薄荷绿色背景
    sand: '#d7cec0',      // 沙色块
    white: '#ffffff',     // 白色块
    darkText: '#3a3a3a',  // 深色文字
    lightText: '#6a6a6a'  // 浅色文字
  };

  // 获取所有照片路径
  // 注意：这个函数只在构建时运行，不会在客户端运行
  const getPhotoPaths = () => {
    try {
      const publicDir = path.join(process.cwd(), 'public', 'family-photos');
      const fileNames = readdirSync(publicDir);
      
      // 只保留图片文件
      const imageFiles = fileNames.filter(fileName => 
        /\.(jpg|jpeg|png|gif)$/i.test(fileName)
      );
      
      // 返回完整路径
      return imageFiles.map(fileName => `/family-photos/${fileName}`);
    } catch (error) {
      console.error('获取照片错误:', error);
      return [];
    }
  };

  const photos = getPhotoPaths();

  return (
    <div style={{ 
      backgroundColor: colors.mint,
      minHeight: '100vh',
      fontFamily: '"Times New Roman", serif',
      color: colors.darkText,
      padding: '0',
      margin: '0'
    }}>
      {/* 导航菜单按钮 */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 100
      }}>
        <Link href="/">
          <button style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '1.5rem',
              height: '1.5rem',
              position: 'relative',
              transform: 'rotate(45deg)'
            }}>
              <span style={{ 
                position: 'absolute',
                height: '2px', 
                width: '100%', 
                backgroundColor: colors.darkText,
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)'
              }}></span>
              <span style={{ 
                position: 'absolute',
                width: '2px', 
                height: '100%', 
                backgroundColor: colors.darkText,
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)'
              }}></span>
            </div>
          </button>
        </Link>
      </div>

      {/* 页面标题 */}
      <div style={{ 
        backgroundColor: colors.sand,
        padding: '8rem 2rem 4rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300',
            margin: '0 0 1rem',
            color: colors.darkText,
            fontFamily: '"华文行楷", "楷体", "STKaiti", "KaiTi", serif',
          }}>家庭相册</div>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: colors.lightText,
            maxWidth: '800px',
            margin: '0 auto'
          }}>我们家庭的珍贵回忆</p>
          <div style={{
            margin: '2rem auto 0',
            display: 'inline-block'
          }}>
            <Link href="/" style={{
              color: colors.darkText,
              textDecoration: 'none',
              borderBottom: `1px solid ${colors.darkText}`,
              paddingBottom: '0.25rem',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>

      {/* 照片网格 */}
      <div style={{
        padding: '4rem 2rem',
        backgroundColor: colors.white
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {photos.map((photo, index) => (
              <div key={index} style={{
                position: 'relative',
                paddingBottom: '75%', // 4:3 宽高比
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                <Image 
                  src={photo}
                  alt={`家庭照片 ${index+1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部 */}
      <footer style={{
        backgroundColor: colors.sand,
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '1rem',
          color: colors.lightText,
          margin: '0'
        }}>© 2024 黄家 · Huang Family</p>
      </footer>
    </div>
  );
} 