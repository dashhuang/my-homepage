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

- Next.js 15.2.1 (使用 App Router)
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
2. 运行以下命令更新照片列表：
   ```bash
   npm run update-photos
   ```
3. 提交更改：
   ```bash
   git add public/photos-data.json app/api/photos/route.ts public/family-photos/[新照片]
   git commit -m "添加新照片"
   git push
   ```

### 自动化

- 构建过程中会自动更新照片列表（通过 `npm run build` 命令）
- 可以单独运行 `npm run update-photos` 来更新照片列表
- 照片列表在 `app/api/photos/route.ts` 和 `public/photos-data.json` 中维护

### 技术实现

- 照片列表由 `scripts/generate-photo-list.js` 脚本生成
- 相册页面通过静态JSON文件获取照片列表并显示所有照片
- 使用静态JSON文件完全避免了API路由调用，确保在Vercel上更稳定地工作
- 保留了API路由作为备份，但前端默认使用静态JSON文件

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

## 文件结构

- `app/page.tsx` - 主页组件
- `app/layout.tsx` - 全局布局组件
- `app/gallery/page.tsx` - 相册页面组件
- `app/globals.css` - 全局样式
- `public/family-photos/` - 存放家庭照片的目录

## 最近更新

### 2024年3月6日
- 优化网站布局：调整首页照片比例和宽度
- 修改标题从"黄家 · Huang Family"为"黄 · Huang"
- 添加页脚信息并调整位置样式

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

### ESLint错误修复

在部署到Vercel时可能遇到ESLint检查错误，特别是关于TypeScript的`no-explicit-any`规则。解决方案：

1. **定义正确的类型**：
   - 为自定义事件创建明确的接口定义而不是使用`any`类型
   - 示例：`interface LanguageChangeEventDetail { language: 'zh' | 'en'; }`

2. **类型转换**：
   - 使用`as EventListener`替代`as any`进行类型转换
   - 确保事件触发和监听使用相同的类型定义

### Next.js配置更新

Next.js 15.2.1版本中，一些配置选项已移动或重命名，会导致警告。解决方案：

1. **移动配置选项**：
   - 将`experimental.outputFileTracingExcludes`移到根级别的`outputFileTracingExcludes`
   - 移除`outputFileTracing: true`，现在这是默认行为

2. **添加缺失的配置**：
   - 使用`serverComponentsExternalPackages: ['fs', 'path']`外部化模块
   - 确保viewport配置从metadata中分离出来

### 图片优化警告

项目中可能出现关于使用`<img>`标签而非Next.js的`<Image>`组件的警告。这些警告不是错误，而是性能建议。

某些情况下，保留`<img>`标签是有意为之的：
1. **HEIC格式图片**：需要特殊的错误处理，在浏览器不支持时隐藏
2. **灯箱（Lightbox）组件**：需要精确控制图片显示行为和样式
3. **动态加载的内容**：某些情况下，Image组件对动态内容支持有限

### React Hooks警告

React Hook的依赖项问题可能引起几种类型的警告和错误：

1. **缺失依赖警告**：
   ```javascript
   useEffect(() => {
     // 使用了外部变量，但没有在依赖数组中列出
   }, []); // 警告：React Hook useEffect has a missing dependency
   ```

2. **无限循环错误**：
   ```javascript
   useEffect(() => {
     // 设置状态
     setRandomPhotos(photos.gallery);
     // 如果photos.gallery在依赖数组中，可能导致无限循环
   }, [photos.gallery]); // 可能导致：Maximum update depth exceeded
   ```

解决方案：
- 对于缺失依赖，添加所有必要的依赖到数组中
- 对于可能引起循环的依赖，使用useRef、useMemo或空依赖数组
- 有时组件只需要在挂载时执行一次，使用`[]`依赖数组是合适的

特别是对于数据获取等操作，通常只需在组件挂载时执行一次，不需要添加可能引起循环的依赖。

### Vercel部署大小限制

Vercel对Serverless函数有300MB的大小限制，而我们的API函数因为包含了所有照片文件，达到了762MB。解决方案：

1. **使用静态照片列表**：
   - 在`app/api/photos/route.ts`中预定义照片路径列表
   - 不再动态读取文件系统

2. **优化Next.js配置**：
   - 在`next.config.js`中添加`output: 'standalone'`
   - 设置`serverComponentsExternalPackages: ['fs', 'path']`

3. **改进API调用**：
   - 创建专门的客户端照片获取函数(`getPhotoPathsClient`)
   - 更新相册和首页组件使用新的API方法

### 照片管理

如需添加新照片：
1. 将照片放入`public/family-photos/`目录
2. 在`app/api/photos/route.ts`中的`PHOTOS`对象中添加照片路径

## 部署

项目已部署到GitHub，可通过以下命令复制代码库：

```bash
git clone https://github.com/dashhuang/my-homepage.git
```

项目已部署到Vercel，访问URL：[my-homepage-dashhuang.vercel.app](https://my-homepage-dashhuang.vercel.app)
