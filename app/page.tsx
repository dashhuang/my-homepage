'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPhotoPathsClient } from "./gallery/gallery-api";

export default function Home() {
  // 添加随机照片状态
  const [randomPhotos, setRandomPhotos] = useState<string[]>([]);
  // 添加加载状态
  const [isLoading, setIsLoading] = useState(true);
  
  // 添加灯箱状态
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentImage: ''
  });
  
  // 打开灯箱
  const openLightbox = (imageSrc: string) => {
    setLightbox({
      isOpen: true,
      currentImage: imageSrc
    });
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
  };
  
  // 关闭灯箱
  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      currentImage: ''
    });
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  };
  
  // 从照片集合中随机选择特定数量的照片
  const getRandomPhotos = (photos: string[], count: number) => {
    // 复制数组，以免修改原数组
    const photosCopy = [...photos];
    const result = [];
    
    // 随机选择照片
    for (let i = 0; i < count && photosCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * photosCopy.length);
      result.push(photosCopy[randomIndex]);
      photosCopy.splice(randomIndex, 1); // 移除已选照片，避免重复
    }
    
    return result;
  };
  
  // 柔和的配色方案
  const colors = {
    mint: '#c8d6cf',      // 淡薄荷绿色背景
    sand: '#d7cec0',      // 沙色块
    white: '#ffffff',     // 白色块
    darkText: '#3a3a3a',  // 深色文字
    lightText: '#6a6a6a'  // 浅色文字
  };

  // 选择一些照片用于不同部分
  const photos = {
    hero: '/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg',  // 主页照片，添加时间戳
    dash: '/family-photos/IMG_0875.jpeg',       // Dash照片
    cherry: '/family-photos/L1030065.JPG',     // Cherry照片
    jimmy: '/family-photos/jimmy.jpg',      // Jimmy照片
    tinny: '/family-photos/IMG_3908.jpeg',      // Tinny照片
    kelly: '/family-photos/IMG_9664.jpeg',      // Kelly照片
    gallery: [                                  // 相册照片（作为备用）
      '/family-photos/IMG_9200.jpeg',
      '/family-photos/IMG_9147.jpeg',
      '/family-photos/IMG_9139.jpeg',
      '/family-photos/IMG_9071.jpeg',
      '/family-photos/IMG_1435.jpeg',
      '/family-photos/IMG_7604.jpeg',
      '/family-photos/2U2A5498.jpg',            // 添加新照片
      '/family-photos/2U2A5506.jpg'             // 添加新照片
    ]
  };
  
  // 获取照片
  useEffect(() => {
    async function fetchPhotos() {
      setIsLoading(true);
      try {
        const data = await getPhotoPathsClient();
        // 将标准格式和HEIC格式的照片合并
        const allPhotos = [...data.standard, ...data.heic];
        // 随机选择8张照片
        const selected = getRandomPhotos(allPhotos, 8);
        setRandomPhotos(selected);
      } catch (error) {
        console.error("获取照片错误:", error);
        // 如果API调用失败，使用默认照片
        setRandomPhotos(photos.gallery);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPhotos();
  }, []);

  return (
    <div style={{ 
      backgroundColor: colors.mint,
      minHeight: '100vh',
      fontFamily: '"Times New Roman", serif',
      color: colors.darkText,
      padding: '0',
      margin: '0'
    }}>
      {/* 主页块 */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '5vh 0',
        width: '100%',
        boxSizing: 'border-box'
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
              alt="家庭照片"
              fill
              style={{ objectFit: 'cover' }}
              priority
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
                {/* 使用自定义div替代h1来避免任何默认样式 */}
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
                fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                color: colors.lightText,
                lineHeight: '1.8',
                marginTop: '1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                minHeight: '80px'
              }}>
                <p>家，是港湾，是依靠，是永远的归属。欢迎来到我们的家庭主页，在这里分享我们的故事、回忆和未来。</p>
              </div>
              <a href="#family" style={{
                display: 'inline-block',
                marginTop: '1rem',
                color: colors.darkText,
                textDecoration: 'none',
                borderBottom: `1px solid ${colors.darkText}`,
                paddingBottom: '0.25rem',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                了解我们的家庭 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 家庭成员部分 */}
      <section id="family" style={{
        padding: '15vh 0'
      }}>
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
          }}>家庭成员</h2>

          {/* Dash 块 */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: '8rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            {/* 左侧照片 */}
            <div style={{
              backgroundColor: colors.sand,
              flex: '1',
              minWidth: '300px',
              minHeight: '400px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Image 
                src={photos.dash}
                alt="Dash 黄一孟"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* 右侧内容 */}
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
              }}>Dash 黄一孟</h3>
              <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: colors.sand,
                marginBottom: '2rem'
              }}></div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: colors.lightText,
                marginBottom: '1.5rem'
              }}>
                家庭顶梁柱
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: colors.lightText
              }}>
                作为家庭的中流砥柱，Dash不仅关心每个家庭成员的需求，也为家庭提供坚实的依靠。他喜欢编程和技术，闲暇时会带领全家一起户外活动。
              </p>
            </div>
          </div>

          {/* Cherry 块 */}
          <div style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            marginBottom: '8rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            {/* 右侧照片 */}
            <div style={{
              backgroundColor: colors.sand,
              flex: '1',
              minWidth: '300px',
              minHeight: '400px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Image 
                src={photos.cherry}
                alt="Cherry 吴智群"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* 左侧内容 */}
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
              }}>Cherry 吴智群</h3>
              <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: colors.sand,
                marginBottom: '2rem'
              }}></div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: colors.lightText,
                marginBottom: '1.5rem'
              }}>
                家庭的灵魂人物
              </p>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: colors.lightText
              }}>
                Cherry是家庭的情感核心，善解人意且充满智慧。她热爱阅读和烹饪，总是能为家人带来美味佳肴和温暖的关怀，是孩子们心中的避风港。
              </p>
            </div>
          </div>

          {/* 孩子们块 - 并排展示 */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '8rem'
          }}>
            {/* Jimmy 模块 */}
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
                  src={photos.jimmy}
                  alt="Jimmy"
                  fill
                  style={{ objectFit: 'cover' }}
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
                }}>Jimmy</h3>
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
                  大儿子
                </p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: colors.lightText
                }}>
                  Jimmy聪明好学，对科学和自然充满好奇心。他喜欢足球和围棋，总是能带给家人欢乐和惊喜。
                </p>
              </div>
            </div>

            {/* Tinny 模块 */}
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
                  src={photos.tinny}
                  alt="Tinny"
                  fill
                  style={{ objectFit: 'cover' }}
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
                }}>Tinny</h3>
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
                  大女儿
                </p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: colors.lightText
                }}>
                  Tinny充满创造力，热爱艺术和音乐。她擅长钢琴和画画，有着丰富的想象力和细腻的情感。
                </p>
              </div>
            </div>

            {/* Kelly 模块 */}
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
                  src={photos.kelly}
                  alt="Kelly"
                  fill
                  style={{ objectFit: 'cover' }}
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
                }}>Kelly</h3>
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
                  二女儿
                </p>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: colors.lightText
                }}>
                  Kelly活泼可爱，充满好奇心。她喜欢跳舞和讲故事，总是用她天真的笑容感染着全家人。
                </p>
              </div>
            </div>
          </div>

          {/* 相册预览 */}
          <div style={{
            marginBottom: '5rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '300',
              marginBottom: '3rem',
              textAlign: 'center',
              color: colors.darkText
            }}>家庭相册</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {isLoading ? (
                // 加载状态
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '3rem 0',
                  color: colors.lightText 
                }}>
                  加载照片中...
                </div>
              ) : randomPhotos.length > 0 ? (
                // 显示随机照片
                randomPhotos.map((photo, index) => (
                  <div key={index} style={{
                    position: 'relative',
                    height: '250px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }} onClick={() => openLightbox(photo)}>
                    <Image 
                      src={photo}
                      alt={`家庭照片 ${index+1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))
              ) : (
                // 没有照片时显示
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '3rem 0',
                  color: colors.lightText 
                }}>
                  暂无照片可显示
                </div>
              )}
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '3rem'
            }}>
              <Link href="/gallery" style={{
                display: 'inline-block',
                color: colors.darkText,
                textDecoration: 'none',
                borderBottom: `1px solid ${colors.darkText}`,
                paddingBottom: '0.25rem',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                查看更多照片 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 底部联系我们 */}
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
      {lightbox.isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out'
          }}
          onClick={closeLightbox}
        >
          {/* 关闭按钮 */}
          <button
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 1001
            }}
            onClick={closeLightbox}
          >
            ✕
          </button>
          
          {/* 图片容器 */}
          <div
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // 防止点击图片时关闭灯箱
          >
            <img
              src={lightbox.currentImage}
              alt="原图"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                cursor: 'default'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}