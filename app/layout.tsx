import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./test.css";
import { ThemeInitializer } from "./components/ThemeInitializer";
import { LanguageFooter } from "./components/LanguageFooter";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "黄 · Huang",
  description: "黄家的家庭个人主页 - huang.co",
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
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        {children}
        
        {/* 使用客户端Footer组件 */}
        <LanguageFooter />
        
        {/* Vercel Analytics 统计 */}
        <Analytics />
      </body>
    </html>
  );
}
