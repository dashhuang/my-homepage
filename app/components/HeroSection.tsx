import Image from "next/image";
import { heroPhoto } from '../constants/family';
import { texts } from '../constants/texts';
import type { Lang } from '../lib/i18n';
import { blurDataURL } from '../utils/imageBlurData';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';
import styles from './HeroSection.module.css';

export default function HeroSection({ lang }: { lang: Lang }) {
  return (
    <section className={styles.hero}>
      <TiltCard
        className={styles.tilt}
        maxRotation={2}  // 旋转角度很小，因为卡片很大
        glareMaxOpacity={0.15}
        scale={1.01}
      >
        <div className={styles.card}>
          <div className={styles.photo}>
            <div className={`animate-scale-breath ${styles.photoInner}`}>
              <Image
                src={heroPhoto}
                alt={texts.familyPhoto[lang]}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              <span className={styles.hanzi}>黄</span>
              <TextScramble className={styles.latin} text="Huang" speed={1.5} delay={500} />
            </h1>
            <p className={styles.intro}>{texts.homeIntro[lang]}</p>
            <a href="#family" className="text-link">
              {texts.exploreFamily[lang]}
            </a>
          </div>
        </div>
      </TiltCard>
    </section>
  );
}
