# 黄家家庭主页 - huang.co

这是一个使用[Next.js](https://nextjs.org)开发的家庭个人主页项目，为黄家（huang.co）打造。

## 项目特点

- 展示黄家家庭成员信息（Dash 黄一孟、Cherry 吴智群、Jimmy、Tinny、Kelly）
- 提供家庭照片展示区
- 响应式设计，在各种设备上都能良好显示
- 暗色/亮色模式支持
- 现代化UI设计，包含动画和交互效果
- 页面平滑滚动与锚点导航

## 技术栈

- Next.js (App Router)
- Tailwind CSS (使用@tailwindcss/postcss插件)
- @tailwindcss/aspect-ratio (用于照片展示)
- 响应式设计，适配手机到大屏显示器

## 运行项目

首先，安装依赖：

```bash
npm install
```

然后，运行开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

- `app/page.tsx` - 主页组件
- `app/layout.tsx` - 全局布局组件
- `app/components/ThemeToggle.tsx` - 主题切换组件
- `app/components/ThemeInitializer.tsx` - 主题初始化组件
- `public/family-photos/` - 存放家庭照片的目录

## 设计特色

- 渐变色与毛玻璃效果
- 悬停动画与交互效果
- 自适应网格布局
- 精美的照片展示组件
- 优雅的排版与文字层次

## 部署

项目可以部署到Vercel上，以便通过huang.co域名访问。
