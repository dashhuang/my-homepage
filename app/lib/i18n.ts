// 语言配置：中文是默认语言，路径不带前缀；英文路径以 /en 开头
export const languages = ['zh', 'en'] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'zh';
export const LANG_COOKIE = 'lang';

export const htmlLang: Record<Lang, string> = {
  zh: 'zh-CN',
  en: 'en',
};

export const ogLocale: Record<Lang, string> = {
  zh: 'zh_CN',
  en: 'en_US',
};

export function isLang(value: string | undefined): value is Lang {
  return languages.includes(value as Lang);
}

export function localePath(lang: Lang, path = '/'): string {
  if (lang === defaultLang) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

export type Localized<T = string> = Record<Lang, T>;
