import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeInitializer } from "./components/ThemeInitializer";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import BalloonTrigger from "./components/BalloonTrigger";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "黄 · Huang | 黄家家庭主页",
  description: "欢迎来到黄家的温馨家庭主页。这里记录着Dash、Cherry和三个孩子Jimmy、Tinny、Kelly的珍贵回忆、家庭故事和美好时光。",
  keywords: "黄家, Huang Family, 家庭主页, Dash Huang, Cherry Wu, 家庭相册, 个人主页",
  authors: [{ name: "Dash Huang", url: "https://huang.co" }],
  creator: "Dash Huang",
  publisher: "Huang Family",
  metadataBase: new URL('https://huang.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://huang.co',
    title: '黄 · Huang | 黄家家庭主页',
    description: '欢迎来到黄家的温馨家庭主页。这里记录着Dash、Cherry和三个孩子Jimmy、Tinny、Kelly的珍贵回忆、家庭故事和美好时光。',
    siteName: '黄家家庭主页',
    images: [
      {
        url: '/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg',
        width: 1200,
        height: 630,
        alt: '黄家家庭照片',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '黄 · Huang | 黄家家庭主页',
    description: '欢迎来到黄家的温馨家庭主页。这里记录着Dash、Cherry和三个孩子的珍贵回忆、家庭故事和美好时光。',
    creator: '@DashHuang',
    images: ['/family-photos/719BD143-ADD6-4F94-8CFC-BAF43235608A.jpg'],
  },
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 定义特殊日期，这些日期会自动触发气球效果
  const specialDates = [
    '03-18', // Dash的生日
    '12-14', // Cherry的生日
    '03-23', // Jimmy的生日
    '09-21', // Tinny的生日
    '10-16'  // Kelly的生日
  ];

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 结构化数据 - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dash Huang',
              givenName: 'Dash',
              familyName: 'Huang',
              url: 'https://huang.co',
              image: 'https://huang.co/family-photos/IMG_0875.jpeg',
              sameAs: [
                'https://x.com/DashHuang',
                'https://www.instagram.com/dashhuang/'
              ],
              jobTitle: 'Software Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Huang Family'
              },
              spouse: {
                '@type': 'Person',
                name: 'Cherry Wu',
                givenName: 'Cherry',
                familyName: 'Wu'
              },
              children: [
                {
                  '@type': 'Person',
                  name: 'Jimmy Huang',
                  givenName: 'Jimmy',
                  familyName: 'Huang'
                },
                {
                  '@type': 'Person',
                  name: 'Tinny Huang',
                  givenName: 'Tinny',
                  familyName: 'Huang'
                },
                {
                  '@type': 'Person',
                  name: 'Kelly Huang',
                  givenName: 'Kelly',
                  familyName: 'Huang'
                }
              ]
            })
          }}
        />
        
        <ThemeInitializer />
        {children}
        
        {/* 气球效果触发器 */}
        <BalloonTrigger 
          specialDates={specialDates}
          showOnFirstVisit={false}
          autoTriggerEnabled={true}
        />
        
        {/* Vercel Analytics 统计 */}
        <Analytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
        
        {/* 自定义光标 (仅桌面端显示) */}
        <CustomCursor />
      </body>
    </html>
  );
}
