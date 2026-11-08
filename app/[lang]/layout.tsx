import type { Metadata, Viewport } from "next";
import { Cinzel, Noto_Serif_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from '@vercel/analytics/react';
import "../globals.css";
import BalloonTrigger from "../components/BalloonTrigger";
import { children as kids, parents } from "../constants/family";
import { htmlLang, isLang, languages } from "../lib/i18n";
import { SITE_URL } from "../lib/metadata";

// "Huang" 使用的标题字体
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cinzel",
});

// "黄" 的兜底字体：Google 按 unicode-range 切片，浏览器只会下载包含这个字的一小片
const notoSerifSC = Noto_Serif_SC({
  weight: "300",
  preload: false,
  variable: "--font-noto-serif-sc",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map(lang => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords: "黄家, Huang Family, 家庭主页, Dash Huang, Cherry Wu, 家庭相册, 个人主页",
  authors: [{ name: "Dash Huang", url: SITE_URL }],
  creator: "Dash Huang",
  publisher: "Huang Family",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c8d6cf',
};

const [dash, cherry] = parents;
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dash Huang',
  givenName: 'Dash',
  familyName: 'Huang',
  url: SITE_URL,
  image: `${SITE_URL}${dash.photo}`,
  sameAs: [
    'https://x.com/DashHuang',
    'https://www.instagram.com/dashhuang/'
  ],
  spouse: {
    '@type': 'Person',
    name: cherry.name.en,
    givenName: 'Cherry',
    familyName: 'Wu'
  },
  children: kids.map(kid => ({
    '@type': 'Person',
    name: `${kid.nickname} Huang`,
    givenName: kid.nickname,
    familyName: 'Huang'
  }))
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={`${cinzel.variable} ${notoSerifSC.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* 没有 JS 时直接显示滚动渐显的内容 */}
        <noscript>
          <style>{'.reveal{opacity:1;transform:none}'}</style>
        </noscript>

        {children}

        <BalloonTrigger lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
