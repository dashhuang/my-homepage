import { texts } from '../constants/texts';
import type { Lang } from '../lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './SiteFooter.module.css';

export default function SiteFooter({ lang, path }: { lang: Lang; path: string }) {
  return (
    <footer className={styles.footer}>
      <LanguageSwitcher lang={lang} path={path} />

      <div className={styles.meta}>
        <p className={styles.copyright}>© {new Date().getFullYear()} 黄 · Huang</p>
        <p className={styles.credits}>
          {texts.builtWith[lang]} <span className={styles.heart}>❤️</span> + <strong>Cursor</strong> + <strong>Next.js</strong> {texts.builtWithSuffix[lang]}
        </p>
      </div>
    </footer>
  );
}
