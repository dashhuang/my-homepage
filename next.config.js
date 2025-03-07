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
  // 从experimental中移出的配置
  outputFileTracingExcludes: {
    '*': [
      'public/family-photos/**',
      'node_modules/**',
    ],
  },
  // 外部化模块，减小函数体积（从experimental.serverComponentsExternalPackages移动）
  serverExternalPackages: ['fs', 'path'],
};

module.exports = nextConfig; 