'use client';

import { texts } from '../constants/texts';
import { LANG_COOKIE, htmlLang, localePath, type Lang } from '../lib/i18n';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  lang: Lang;
  path: string;
}

// 普通链接 + 记住选择：middleware 下次会按这个 cookie 决定默认语言
export default function LanguageSwitcher({ lang, path }: LanguageSwitcherProps) {
  const target: Lang = lang === 'zh' ? 'en' : 'zh';

  return (
    <a
      href={localePath(target, path)}
      hrefLang={htmlLang[target]}
      lang={htmlLang[target]}
      className={styles.switcher}
      onClick={() => {
        document.cookie = `${LANG_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
    >
      {texts.languageSwitch[lang]}
    </a>
  );
}
