# 黄家家庭主页

这是一个使用 [Next.js](https://nextjs.org) 开发的家庭主页项目，为黄家打造的简约而优雅的在线空间。

## 项目特点

- 现代简约的设计风格，突出家庭照片和成员介绍
- 完整展示黄家成员信息（Dash 黄一孟、Cherry 吴智群、Jimmy、Tinny、Kelly）
- 独立的相册页面，展示家庭珍贵回忆
- 响应式设计，在各种设备上都能良好显示
- 中文与英文双语展示
- 优雅的字体选择，特别为"黄"字使用了传统中文书法字体

## 技术栈

- Next.js 15.5.18 (使用 App Router)
- React 同构渲染
- CSS-in-JS 样式（内联样式对象）
- 响应式设计（使用clamp()等现代CSS特性）
- 图片优化（使用Next.js的Image组件）

## 页面结构

- **主页 (/)**: 展示家庭概览和所有成员简介
- **相册页面 (/gallery)**: 展示家庭照片集
- 未来可扩展更多页面

## 设计特色

- 柔和的配色方案（薄荷绿、沙色、白色等）
- 大幅照片展示与文字内容平衡布局
- 中文书法风格的标题设计
- 响应式布局，适配从移动设备到大屏显示器
- 精心优化的排版与文字层次

## 照片管理

### 添加新照片

1. 将新照片添加到 `public/family-photos/` 目录
2. 运行以下命令更新照片元数据和优化图：
   ```bash
   npm run update-photos
   ```
3. 提交更改：
   ```bash
   git add public/photos-data.json public/family-photos-optimized public/family-photos/[新照片]
   git commit -m "添加新照片"
   git push
   ```

### 自动化

- `npm run update-photos` 会扫描原图目录，生成 `public/photos-data.json`，并输出 WebP 预览图和大图到 `public/family-photos-optimized/`
- `npm run check-photos` 只做校验，不写文件
- `npm run build` 会先执行照片校验，避免构建过程偷偷改脏工作区
- 照片元数据只维护在 `public/photos-data.json` 中

### 技术实现

- 照片列表由 `scripts/generate-photo-list.js` 脚本生成
- 相册页在服务端导入静态 JSON，首屏直接带照片数据
- 首页预览使用同一份静态 JSON
- HEIC 原图会在本地通过 `sips` fallback 转为 WebP 优化图，浏览器端不直接加载 HEIC

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

## 代码质量与常用检查

- **代码规范检查（ESLint）**：
```bash
npm run lint
```

- **类型检查（TypeScript）**：
```bash
npm run typecheck
```

- **生产构建验证（Next.js）**：
```bash
npm run build
```

> 备注：
> - 如果看到 Browserslist 数据过旧提示，可定期运行 `npx update-browserslist-db@latest`。
> - 本机如果使用 Node 23，部分 ESLint 子依赖会提示 engine 范围不包含 Node 23；Node 20/22/24 均在声明支持范围内。

## 优化文档

- `OPTIMIZATION_SUMMARY.md`：优化总结（结构、SEO、性能、可访问性）
- `优化建议清单.md`：可继续推进的优化清单与优先级
- `优化完成报告.md`：阶段性优化完成报告与指标对比

## 文件结构

```
app/
├── page.tsx                          # 主页入口（已优化，200行左右）
├── layout.tsx                        # 全局布局（含SEO和结构化数据）
├── globals.css                       # 全局样式
├── components/                       # 组件目录
│   ├── HeroSection.tsx              # 首页英雄区组件
│   ├── FamilyMemberCard.tsx         # 家庭成员卡片组件
│   ├── PhotoGalleryPreview.tsx      # 相册预览组件
│   ├── LanguageSwitcher.tsx         # 语言切换器
│   ├── Lightbox.tsx                 # 图片灯箱组件
│   ├── BalloonEffect.tsx            # 气球特效组件
│   ├── BalloonTrigger.tsx           # 气球触发器
│   ├── CelebrationButton.tsx        # 庆祝按钮
│   ├── LanguageFooter.tsx           # 多语言页脚
│   ├── ThemeInitializer.tsx         # 主题初始化
│   └── ThemeToggle.tsx              # 主题切换器
├── constants/                        # 配置常量
│   ├── styles.ts                    # 样式和颜色配置
│   └── texts.ts                     # 多语言文本内容
├── utils/                            # 工具函数
│   └── imageBlurData.ts             # 图片模糊占位符
├── gallery/                          # 相册功能
│   ├── page.tsx                     # 相册服务端入口
│   ├── GalleryClient.tsx            # 相册客户端交互
│   └── gallery-api.ts               # 照片类型和客户端读取工具

public/
├── family-photos/                    # 原始家庭照片目录（约214张照片，另含少量HEIC）
├── family-photos-optimized/          # 生成的WebP预览图和大图
└── photos-data.json                  # 单一照片元数据源

scripts/
└── generate-photo-list.js            # 生成/校验照片元数据和优化图
```

## 最近更新

### 2026年5月 - 照片管线、安全和构建维护
- 将照片数据源收敛为 `public/photos-data.json`
- 移除重复的 `/api/photos` 路由
- 为 214 张原图生成 WebP 预览图和大图，HEIC 也转为浏览器可用的 WebP
- `npm run build` 改为先校验照片元数据，避免构建时产生未提交改动
- 迁移 `next lint` 到 ESLint CLI，并重新启用 `react-hooks/exhaustive-deps`
- 升级依赖并通过 `npm audit`

### 2025年12月 - 依赖安全升级
- 升级 `glob` 到 10.5.0，修复 GitHub 安全告警（CVE-2025-64756）
- 升级 Next.js 到 15.5.x，修复 `npm audit` 报告的关键级安全漏洞

### 2024年10月 - 重大性能和结构优化
- **代码重构与模块化**：
  - 将900+行的page.tsx拆分成多个可复用组件
  - 创建独立的组件：HeroSection、FamilyMemberCard、PhotoGalleryPreview、LanguageSwitcher、Lightbox
  - 提取样式配置到`constants/styles.ts`
  - 提取文本内容到`constants/texts.ts`
  - 创建图片优化工具`utils/imageBlurData.ts`

- **SEO全面优化**：
  - 添加详细的meta标签（描述、关键词、作者等）
  - 添加Open Graph标签，优化社交媒体分享效果
  - 添加Twitter Card配置
  - 实现JSON-LD结构化数据，帮助搜索引擎理解家庭成员关系
  - 设置robots配置，优化搜索引擎爬取

- **性能优化**：
  - 为所有图片添加blur placeholder，改善加载体验
  - 优化图片sizes属性，实现响应式图片加载
  - 图片懒加载策略：前4张eager加载，其余lazy加载
  - 改进组件结构，减少不必要的重渲染

- **用户体验提升**：
  - 添加hover动画效果到链接和图片卡片
  - 改进语言切换按钮样式，添加毛玻璃效果
  - 优化移动端触摸滚动体验
  - 添加响应式字体大小（移动端16px，平板17px，桌面18px）
  - 改进Lightbox组件的可访问性，添加aria-label

- **可访问性改进**：
  - 为所有交互元素添加适当的aria标签
  - 改进键盘导航支持
  - 优化图片alt文本的多语言支持

### 2024年4月
- 优化气球飘飞效果：
  - 减少气球数量，根据设备屏幕宽度智能调整（手机10-20个，平板20-25个，桌面25-30个，大屏30-40个）
  - 分批创建气球，减轻初始加载压力（三批次：20%、40%、40%）
  - 简化渐变和阴影效果，移动设备上禁用模糊效果
  - 添加GPU加速提示，提高动画流畅度
  - 改进动画效果，气球从屏幕外开始渐现
  - 针对iPhone等不同设备宽度进行精细优化

### 2024年3月7日
- 添加首页随机相册功能：每次刷新页面随机展示8张照片
- 增强相册功能：添加点击查看原图功能
- 修复相册标题的样式问题，移除红色和下划线
- 修复API大小超限问题：改用静态照片列表，优化Next.js配置
- 优化Vercel部署：修改构建和部署策略，提升性能
- 实现中英双语切换功能：
  - 添加语言切换按钮到页面右上角
  - 所有文本内容支持中英文切换
  - 默认显示中文，点击按钮可切换到英文
  - 更新所有家庭成员介绍为中英双语
  - 添加浏览器语言自动检测，根据用户浏览器设置自动选择语言
- 修复英文版页脚显示问题：
  - 将页脚组件改为客户端组件，支持语言切换
  - 增加英文版"Built with ❤️ + Cursor + Next.js"页脚
  - 优化项目架构，分离服务器组件和客户端组件
  - 使用localStorage保存语言设置，确保跨页面一致性
- 优化家庭成员显示效果：
  - 将儿女标题从中文角色（大儿子、大女儿、二女儿）改为英文名字（Jimmy、Tinny、Kelly）
  - 增加角色标签显示，保留角色信息
  - 统一头像alt属性的显示方式
  - 改进多语言支持结构

## 部署问题解决方案

### 照片校验失败

如果 `npm run build` 在 `check-photos` 阶段失败，说明原图目录、`photos-data.json` 或优化图不同步。运行：

```bash
npm run update-photos
```

然后提交更新后的 `public/photos-data.json` 和 `public/family-photos-optimized/`。

### 安全依赖

当前依赖通过 `npm audit --audit-level=moderate`。`package.json` 里使用 `overrides.postcss` 将 Next 内部的 PostCSS 锁到安全版本；升级 Next 时需要重新确认这个 override 是否还必要。

### HEIC处理

本地 `npm run update-photos` 会优先使用 `sharp` 处理图片；HEIC 如果遇到 libheif 支持不足，会在 macOS 上 fallback 到 `sips` 先转 JPEG，再输出 WebP。部署构建只做校验，不需要在 Vercel 环境转换 HEIC。

## 部署

项目已部署到GitHub，可通过以下命令复制代码库：

```bash
git clone https://github.com/dashhuang/my-homepage.git
```

项目已部署到Vercel，访问URL：[my-homepage-dashhuang.vercel.app](https://my-homepage-dashhuang.vercel.app)
