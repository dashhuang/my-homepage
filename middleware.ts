import { NextResponse, type NextRequest } from 'next/server';
import { LANG_COOKIE, defaultLang, isLang, type Lang } from './app/lib/i18n';

// 爬虫和链接预览一律看中文默认页，避免按 Accept-Language 跳转导致中文页不被收录
const BOT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|whatsapp|telegram|discord|wechat|micromessenger/i;

function preferredLang(request: NextRequest): Lang {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(saved)) return saved;

  if (BOT_PATTERN.test(request.headers.get('user-agent') ?? '')) return defaultLang;

  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLang;
  return acceptLanguage.trim().toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // 显式访问 /en 时尊重 URL，方便分享英文链接
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next();
  }

  // /zh 只是内部路由，对外统一使用无前缀地址
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (preferredLang(request) === 'en') {
    url.pathname = pathname === '/' ? '/en' : `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  url.pathname = pathname === '/' ? '/zh' : `/zh${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // 跳过 Next 内部资源和所有带扩展名的静态文件（照片、favicon、robots.txt 等）
  matcher: ['/((?!_next/|.*\\..*).*)'],
};
