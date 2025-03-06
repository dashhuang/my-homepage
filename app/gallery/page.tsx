import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  // 柔和的配色方案
  const colors = {
    mint: '#c8d6cf',      // 淡薄荷绿色背景
    sand: '#d7cec0',      // 沙色块
    white: '#ffffff',     // 白色块
    darkText: '#3a3a3a',  // 深色文字
    lightText: '#6a6a6a'  // 浅色文字
  };

  // 静态预定义的照片列表，而不是读取文件系统
  const photos = [
    '/family-photos/CW__4659.jpg',
    '/family-photos/IMG_1903.jpeg',
    '/family-photos/IMG_1570.jpeg',
    '/family-photos/IMG_0115.jpeg',
    '/family-photos/IMG_4473.jpeg',
    '/family-photos/IMG_0896.jpeg',
    '/family-photos/IMG_9200.jpeg',
    '/family-photos/IMG_9147.jpeg',
    '/family-photos/IMG_9139.jpeg',
    '/family-photos/IMG_9071.jpeg',
    '/family-photos/IMG_1435.jpeg',
    '/family-photos/IMG_7604.jpeg',
    '/family-photos/2U2A5457.jpg',
    '/family-photos/2U2A5495.jpg',
    '/family-photos/2U2A5498.jpg',
    '/family-photos/2U2A5506.jpg',
    '/family-photos/2U2A5569.jpg',
    '/family-photos/09A5D818-AA9A-43D2-B177-CA1901A0CBDB.jpg',
    '/family-photos/0D72608E-AD55-4B4D-BC32-02AED1EFE052.jpg',
    '/family-photos/37545F19-BEE8-4006-97C1-CB8F3E0C5A5C.jpg',
    '/family-photos/388ED0BA-052B-4C4A-AB71-A413B6150BB2.jpg',
    '/family-photos/3C54DBB6-EC95-4239-A462-A70CB1676335.jpg',
    '/family-photos/4CD2D181-F5D5-4444-A7B0-C5DA358A0E5B.jpg',
    '/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg',
    '/family-photos/76BDC83B-BE39-40AF-A727-2A80C6E3AD80.jpg',
    '/family-photos/7BEC102F-E2B6-4F11-BADA-3A0A82A713DF.jpg',
    '/family-photos/ADE7BEC9-AEAE-4840-BB9D-C7CEB5BC6380.jpg',
    '/family-photos/BDBE8C4A-2729-42A6-8B44-CAAF8A8C0FC6.jpg',
    '/family-photos/C2AC0575-C298-4FC7-A17B-69D69448A6E3.jpg',
    '/family-photos/CW__4778.jpg',
    '/family-photos/CW__4837.jpg'
    // 这里可以根据需要添加更多照片
  ];

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
            fontFamily: '"思源宋体", "Source Han Serif", "方正姚体", "SimSun", serif',
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