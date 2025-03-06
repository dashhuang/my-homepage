/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 添加输出模式配置，优化API函数大小
  output: 'standalone',
  // 排除公共静态资源，避免这些大文件被打包进函数
  outputFileTracing: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'public/family-photos/**',
        'node_modules/**',
      ],
    },
  }
};

module.exports = nextConfig; 