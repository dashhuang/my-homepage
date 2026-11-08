import type { Metadata } from "next";
import { children, parents } from "../constants/family";
import { texts } from "../constants/texts";
import { isLang, type Lang } from "../lib/i18n";
import { pageMetadata } from "../lib/metadata";
import { allPhotos } from "../lib/photos";
import { pickRandom } from "../utils/random";
import HeroSection from "../components/HeroSection";
import FamilyMemberCard from "../components/FamilyMemberCard";
import PhotoGalleryPreview from "../components/PhotoGalleryPreview";
import ScrollReveal from "../components/ScrollReveal";
import SiteFooter from "../components/SiteFooter";
import styles from "./page.module.css";

// 每 5 分钟重新生成一次，首页的随机照片随之更新
export const revalidate = 300;

const PREVIEW_COUNT = 8;
const SHUFFLE_POOL_SIZE = 48;

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({ lang: lang as Lang, path: '/' });
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  if (!isLang(lang)) return null;

  // 服务端挑好照片：首屏直接带图，不再出现"加载中"和布局跳动
  const photoPool = pickRandom(allPhotos, SHUFFLE_POOL_SIZE);

  return (
    <main className={styles.page}>
      <HeroSection lang={lang} />

      <section id="family" className={styles.family}>
        <div className={styles.container}>
          <h2 className={styles.heading}>{texts.familyMembers[lang]}</h2>

          {parents.map((member, index) => (
            <ScrollReveal key={member.id} delay={100}>
              <FamilyMemberCard
                member={member}
                lang={lang}
                layout={index % 2 === 0 ? 'horizontal' : 'horizontal-reverse'}
              />
            </ScrollReveal>
          ))}

          <div className={styles.children}>
            {children.map((member, index) => (
              <ScrollReveal key={member.id} delay={100 + index * 200} className={styles.child}>
                <FamilyMemberCard member={member} lang={lang} layout="vertical" />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <PhotoGalleryPreview
              lang={lang}
              initialPhotos={photoPool.slice(0, PREVIEW_COUNT)}
              pool={photoPool}
            />
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter lang={lang} path="/" />
    </main>
  );
}
