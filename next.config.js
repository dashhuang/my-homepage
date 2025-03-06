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
  // 禁止API路由打包public目录
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path']
  }
};

module.exports = nextConfig; 