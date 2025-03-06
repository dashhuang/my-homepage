import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./test.css";
import { ThemeInitializer } from "./components/ThemeInitializer";

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
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
        
        {/* 页脚信息 */}
        <footer style={{
          textAlign: 'right',
          padding: '1rem 2rem',
          marginTop: '2rem',
          fontSize: '0.9rem',
          color: '#666',
          fontWeight: 300,
          backgroundColor: 'rgba(200, 214, 207, 0.3)',
          position: 'relative'
        }}>
          <p style={{ margin: 0 }}>本页由 <span style={{ color: '#e25555' }}>❤️</span> + <span style={{ fontWeight: 500 }}>Cursor</span> + <span style={{ fontWeight: 500 }}>Next.js</span> 构建</p>
        </footer>
      </body>
    </html>
  );
}
