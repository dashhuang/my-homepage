import type { MetadataRoute } from "next";
import { languages, localePath } from "./lib/i18n";
import { SITE_URL, languageAlternates } from "./lib/metadata";

const paths = ['/', '/gallery'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(path => {
    const alternates = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([hreflang, href]) => [hreflang, `${SITE_URL}${href}`])
    );

    return languages.map(lang => ({
      url: `${SITE_URL}${localePath(lang, path)}`,
      alternates: { languages: alternates },
    }));
  });
}
