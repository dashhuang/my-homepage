import type { Localized } from '../lib/i18n';

// 界面文案（家庭成员介绍在 family.tsx）
export const texts = {
  siteTitle: {
    zh: '黄 · Huang | 黄家家庭主页',
    en: '黄 · Huang | The Huang Family',
  },
  siteName: {
    zh: '黄家家庭主页',
    en: 'The Huang Family',
  },
  siteDescription: {
    zh: '欢迎来到黄家的温馨家庭主页。这里记录着Dash、Cherry和三个孩子Jimmy、Tinny、Kelly的珍贵回忆、家庭故事和美好时光。',
    en: 'Welcome to the Huang family homepage — memories, stories and good times shared by Dash, Cherry and their three children Jimmy, Tinny and Kelly.',
  },
  homeIntro: {
    zh: '家，是生活最初的诗篇，是记忆长久的温暖。欢迎来到我们的家庭主页，在这里分享我们的故事、回忆和未来。',
    en: 'Home is the first poem of life, and the enduring warmth of memories. Welcome to our family homepage, where we share our stories, memories, and future.',
  },
  exploreFamily: {
    zh: '了解我们的家庭 →',
    en: 'Meet Our Family →',
  },
  familyMembers: {
    zh: '家庭成员',
    en: 'Family Members',
  },
  gallery: {
    zh: '家庭相册',
    en: 'Family Gallery',
  },
  galleryIntro: {
    zh: '我们家庭的珍贵回忆',
    en: 'Treasured moments of our family',
  },
  viewGallery: {
    zh: '查看完整相册 →',
    en: 'View Full Gallery →',
  },
  shufflePhotos: {
    zh: '换一批',
    en: 'Shuffle',
  },
  backHome: {
    zh: '返回首页',
    en: 'Back to home',
  },
  familyPhoto: {
    zh: '家庭照片',
    en: 'Family photo',
  },
  languageSwitch: {
    zh: 'English',
    en: '中文',
  },
  builtWith: {
    zh: '本页由',
    en: 'Built with',
  },
  builtWithSuffix: {
    zh: '构建',
    en: '',
  },
  lightbox: {
    zh: { dialog: '图片查看器', close: '关闭', prev: '上一张', next: '下一张' },
    en: { dialog: 'Photo viewer', close: 'Close', prev: 'Previous photo', next: 'Next photo' },
  },
  birthday: {
    zh: (name: string) => `今天是${name}的生日！`,
    en: (name: string) => `Today is ${name}'s birthday!`,
  },
} satisfies Record<string, Localized<unknown>>;
