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
  output: 'standalone'
  // 我们已经完全移除了对fs和path的使用，不再需要将它们标记为外部包
};

module.exports = nextConfig; 