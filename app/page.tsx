'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import FamilyMemberCard from "./components/FamilyMemberCard";
import { getPhotoPathsClient } from "./gallery/gallery-api";
import styles from "./page.module.css";

type Language = 'zh' | 'en';

interface LanguageChangeEventDetail {
  language: Language;
}

interface LightboxState {
  isOpen: boolean;
  currentImage: string;
  loading: boolean;
}

export default function Home() {
  const [randomPhotos, setRandomPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('zh');
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    currentImage: '',
    loading: true
  });

  const photosLoadedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage === 'zh' ? 'zh-CN' : 'en';
      } else {
        const browserLang = navigator.language.toLowerCase();
        const preferredLang: Language = browserLang.startsWith('zh') ? 'zh' : 'en';
        setLanguage(preferredLang);
        localStorage.setItem('language', preferredLang);
        document.documentElement.lang = preferredLang === 'zh' ? 'zh-CN' : 'en';
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang: Language = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en';

    const event = new CustomEvent<LanguageChangeEventDetail>('languageChange', {
      detail: { language: newLang }
    });
    window.dispatchEvent(event);
  };

  const openLightbox = (imageSrc: string) => {
    setLightbox({
      isOpen: true,
      currentImage: imageSrc,
      loading: true
    });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      currentImage: '',
      loading: true
    });
    document.body.style.overflow = 'auto';
  };

  const handleImageLoad = () => {
    setLightbox(prev => ({ ...prev, loading: false }));
  };

  const getRandomPhotos = (photos: string[], count: number) => {
    const photosCopy = [...photos];
    const result: string[] = [];

    for (let i = 0; i < count && photosCopy.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * photosCopy.length);
      result.push(photosCopy[randomIndex]);
      photosCopy.splice(randomIndex, 1);
    }

    return result;
  };

  const texts = {
    homeIntro: {
      zh: '家，是生活最初的诗篇，是记忆长久的温暖。欢迎来到我们的家庭主页，在这里分享我们的故事、回忆和未来。',
      en: 'Home is the first poem of life, and the enduring warmth of memories. Welcome to our family homepage, where we share our stories, memories, and future.'
    },
    exploreFamily: {
      zh: '了解我们的家庭 →',
      en: 'Meet Our Family →'
    },
    familyMembers: {
      zh: '家庭成员',
      en: 'Family Members'
    },
    dash: {
      name: {
        zh: 'Dash 黄一孟',
        en: 'Dash Huang'
      },
      title: {
        zh: '家庭顶梁柱',
        en: 'Family Pillar'
      }
    },
    cherry: {
      name: {
        zh: 'Cherry 吴智群',
        en: 'Cherry Wu'
      },
      title: {
        zh: '家庭的灵魂人物',
        en: 'Soul of the Family'
      }
    },
    jimmy: {
      name: {
        zh: 'Jimmy',
        en: 'Jimmy'
      },
      title: {
        zh: '大儿子',
        en: 'Eldest Son'
      }
    },
    tinny: {
      name: {
        zh: 'Tinny',
        en: 'Tinny'
      },
      title: {
        zh: '大女儿',
        en: 'Eldest Daughter'
      }
    },
    kelly: {
      name: {
        zh: 'Kelly',
        en: 'Kelly'
      },
      title: {
        zh: '二女儿',
        en: 'Younger Daughter'
      }
    },
    gallery: {
      zh: '家庭相册',
      en: 'Family Gallery'
    },
    viewGallery: {
      zh: '查看完整相册 →',
      en: 'View Full Gallery →'
    },
    languageSwitch: {
      zh: 'English',
      en: '中文'
    }
  } as const;

  const photos = {
    hero: '/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg',
    dash: '/family-photos/IMG_0875.jpeg',
    cherry: '/family-photos/L1030065.JPG',
    jimmy: '/family-photos/jimmy.jpg',
    tinny: '/family-photos/IMG_3908.jpeg',
    kelly: '/family-photos/IMG_9664.jpeg',
    gallery: [
      '/family-photos/IMG_9200.jpeg',
      '/family-photos/IMG_9147.jpeg',
      '/family-photos/IMG_9139.jpeg',
      '/family-photos/IMG_9071.jpeg',
      '/family-photos/IMG_1435.jpeg',
      '/family-photos/IMG_7604.jpeg',
      '/family-photos/2U2A5498.jpg',
      '/family-photos/2U2A5506.jpg'
    ]
  } as const;

  const familyDescriptions = {
    dash: {
      zh: (
        <p>
          作为家庭的中流砥柱，Dash不仅关心每个家庭成员的需求，也为家庭提供坚实的依靠。他喜欢编程和技术，闲暇时会带领全家一起户外活动。在
          <a
            className={`${styles.socialLink} ${styles.socialLinkX}`}
            href="https://x.com/DashHuang"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          和
          <a
            className={`${styles.socialLink} ${styles.socialLinkInstagram}`}
            href="https://www.instagram.com/dashhuang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          上分享技术和生活。
        </p>
      ),
      en: (
        <p>
          As the backbone of the family, Dash not only cares for the needs of each family member but also provides solid support. He enjoys programming and technology, and in his spare time, leads the family in outdoor activities. Follow him on{' '}
          <a
            className={`${styles.socialLink} ${styles.socialLinkX}`}
            href="https://x.com/DashHuang"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>{' '}
          and{' '}
          <a
            className={`${styles.socialLink} ${styles.socialLinkInstagram}`}
            href="https://www.instagram.com/dashhuang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{' '}
          for tech and life.
        </p>
      )
    },
    cherry: {
      zh: (
        <p>
          Cherry是家庭的情感核心，善解人意且充满智慧。她热爱阅读和烹饪，总是能为家人带来美味佳肴和温暖的关怀，是孩子们心中的避风港。
        </p>
      ),
      en: (
        <p>
          Cherry is the emotional core of the family, understanding and full of wisdom. She loves reading and cooking, always bringing delicious food and warm care to the family, and is a safe harbor for the children.
        </p>
      )
    },
    jimmy: {
      zh: (
        <p>
          Jimmy聪明好学，对科学和自然充满好奇心。他喜欢游戏和网球，总是能带给家人欢乐和惊喜。
        </p>
      ),
      en: (
        <p>
          Jimmy is intelligent and eager to learn, with curiosity about science and nature. He enjoys gaming and tennis, always bringing joy and surprises to the family.
        </p>
      )
    },
    tinny: {
      zh: (
        <p>
          Tinny充满创造力，热爱艺术和音乐。她喜欢跳舞和钢琴，有着丰富的想象力和细腻的情感。
        </p>
      ),
      en: (
        <p>
          Tinny is full of creativity, loving art and music. She enjoys dancing and playing the piano, with rich imagination and delicate emotions.
        </p>
      )
    },
    kelly: {
      zh: (
        <p>
          Kelly活泼可爱，才3岁，充满好奇心。她最喜欢和姐姐妈妈玩，总是用她天真的笑容感染着全家人。
        </p>
      ),
      en: (
        <p>
          Kelly is lively and adorable, only 3 years old, full of curiosity. She loves playing with her sister and mother, always infecting the whole family with her innocent smile.
        </p>
      )
    }
  } as const;

  const familyMembers = [
    {
      key: 'dash',
      name: texts.dash.name[language],
      title: texts.dash.title[language],
      description: familyDescriptions.dash[language],
      imageSrc: photos.dash,
      orientation: 'horizontal' as const,
      imagePosition: 'left' as const,
      className: styles.horizontalCard
    },
    {
      key: 'cherry',
      name: texts.cherry.name[language],
      title: texts.cherry.title[language],
      description: familyDescriptions.cherry[language],
      imageSrc: photos.cherry,
      orientation: 'horizontal' as const,
      imagePosition: 'right' as const,
      className: styles.horizontalCard
    },
    {
      key: 'jimmy',
      name: texts.jimmy.name[language],
      title: texts.jimmy.title[language],
      description: familyDescriptions.jimmy[language],
      imageSrc: photos.jimmy,
      orientation: 'vertical' as const,
      imagePosition: 'left' as const,
      className: undefined
    },
    {
      key: 'tinny',
      name: texts.tinny.name[language],
      title: texts.tinny.title[language],
      description: familyDescriptions.tinny[language],
      imageSrc: photos.tinny,
      orientation: 'vertical' as const,
      imagePosition: 'left' as const,
      className: undefined
    },
    {
      key: 'kelly',
      name: texts.kelly.name[language],
      title: texts.kelly.title[language],
      description: familyDescriptions.kelly[language],
      imageSrc: photos.kelly,
      orientation: 'vertical' as const,
      imagePosition: 'left' as const,
      className: undefined
    }
  ] as const;

  useEffect(() => {
    async function fetchPhotos() {
      if (photosLoadedRef.current) return;

      setIsLoading(true);
      try {
        const data = await getPhotoPathsClient();
        const allPhotos = [...data.standard, ...data.heic];
        const selected = getRandomPhotos(allPhotos, 8);
        setRandomPhotos(selected);
        photosLoadedRef.current = true;
      } catch (error) {
        console.error('获取照片错误:', error);
        setRandomPhotos([...photos.gallery]);
        photosLoadedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return (
    <div className={styles.page}>
      <button className={styles.languageSwitch} onClick={toggleLanguage}>
        {texts.languageSwitch[language]}
      </button>

      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroImage}>
              <Image
                src={photos.hero}
                alt="家庭照片"
                fill
                priority
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw"
              />
            </div>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <div className={styles.heroTitle}>
                  <span className={styles.heroTitlePrimary}>黄</span>
                  <span className={styles.heroTitleSecondary}>Huang</span>
                </div>
                <p className={styles.heroDescription}>{texts.homeIntro[language]}</p>
                <a className={styles.textLink} href="#family">
                  {texts.exploreFamily[language]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="family" className={styles.familySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>{texts.familyMembers[language]}</h2>
          <div className={styles.familyGrid}>
            {familyMembers.map(member => (
              <FamilyMemberCard
                key={member.key}
                name={member.name}
                title={member.title}
                description={member.description}
                imageSrc={member.imageSrc}
                orientation={member.orientation}
                imagePosition={member.imagePosition}
                className={member.className}
              />
            ))}
          </div>

          <div className={styles.gallerySection}>
            <h2 className={styles.galleryTitle}>{texts.gallery[language]}</h2>
            <div className={styles.galleryGrid}>
              {isLoading ? (
                <div className={styles.galleryStatus}>加载照片中...</div>
              ) : randomPhotos.length > 0 ? (
                randomPhotos.map((photo, index) => (
                  <div
                    key={photo}
                    className={styles.galleryItem}
                    onClick={() => openLightbox(photo)}
                  >
                    <Image
                      src={photo}
                      alt={`家庭照片 ${index + 1}`}
                      fill
                      className={styles.galleryImage}
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                      priority={index < 4}
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.galleryStatus}>暂无照片可显示</div>
              )}
            </div>
            <div className={styles.galleryCta}>
              <Link href="/gallery" className={styles.textLink}>
                {texts.viewGallery[language]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.footerSection}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>© 2024 黄 · Huang</p>
        </div>
      </section>

      {lightbox.isOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={event => {
              event.stopPropagation();
              closeLightbox();
            }}
          >
            ✕
          </button>
          <div
            className={styles.lightboxContent}
            onClick={event => event.stopPropagation()}
          >
            <Image
              src={lightbox.currentImage}
              alt="原图"
              fill
              className={`${styles.lightboxImage} ${lightbox.loading ? styles.hidden : ''}`}
              sizes="100vw"
              onLoadingComplete={() => handleImageLoad()}
            />
            {lightbox.loading && (
              <div className={styles.lightboxLoader}>加载中...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
