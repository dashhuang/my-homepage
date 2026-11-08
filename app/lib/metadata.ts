import type { Metadata } from 'next';
import { texts } from '../constants/texts';
import { htmlLang, languages, localePath, ogLocale, type Lang } from './i18n';

export const SITE_URL = 'https://huang.co';
const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630 };

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(languages.map(lang => [htmlLang[lang], localePath(lang, path)])),
    'x-default': localePath('zh', path),
  };
}

// 每个页面都生成完整的 canonical / hreflang / Open Graph，避免子页面继承首页的 URL
export function pageMetadata({ lang, path, title }: { lang: Lang; path: string; title?: string }): Metadata {
  const url = localePath(lang, path);
  const fullTitle = title ? `${title} | 黄 · Huang` : texts.siteTitle[lang];
  const description = texts.siteDescription[lang];
  const imageAlt = texts.familyPhoto[lang];

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: texts.siteName[lang],
      locale: ogLocale[lang],
      images: [{ ...OG_IMAGE, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@DashHuang',
      images: [OG_IMAGE.url],
    },
  };
}
