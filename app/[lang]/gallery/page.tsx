import type { Metadata } from "next";
import Link from "next/link";
import { texts } from "../../constants/texts";
import { isLang, localePath, type Lang } from "../../lib/i18n";
import { pageMetadata } from "../../lib/metadata";
import { allPhotos } from "../../lib/photos";
import PhotoGrid from "../../components/PhotoGrid";
import SiteFooter from "../../components/SiteFooter";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({ lang: lang as Lang, path: '/gallery', title: texts.gallery[lang as Lang] });
}

export default async function Gallery({ params }: PageProps) {
  const { lang } = await params;
  if (!isLang(lang)) return null;

  return (
    <main className={styles.page}>
      <Link href={localePath(lang, '/')} aria-label={texts.backHome[lang]} className={styles.back}>
        <span aria-hidden="true">←</span>
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{texts.gallery[lang]}</h1>
        <p className={styles.intro}>{texts.galleryIntro[lang]}</p>
      </header>

      <div className={styles.content}>
        <PhotoGrid photos={allPhotos} lang={lang} eagerCount={8} />
      </div>

      <SiteFooter lang={lang} path="/gallery" />
    </main>
  );
}
