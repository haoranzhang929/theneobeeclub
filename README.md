# The NeoBee Club - Dublin Music Collective 🎵

[中文版本](#中文版本) | [English Version](#english-version)

---

## English Version

### 🎯 About The NeoBee Club

**The NeoBee Club** is a Dublin-based collective of music lovers exploring soulful, jazzy, and electronic sounds. We're passionate about sharing the joy of music through DJ sets, live performances, and creative collaborations.

This repository contains the source code for our official website, built with modern web technologies to showcase our artists, music, and upcoming events.

### 🌟 Features

#### 🎨 **Interactive Visual Experience**

- **Three.js Metaballs Animation**: Stunning WebGL-based organic blob animations that respond to mouse movement (inspired by [Codrops tutorial](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/))
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Perfect experience across all devices and screen sizes

#### 🌍 **Internationalization**

- **Bilingual Support**: Full English and Chinese (中文) language support
- **SEO Optimized**: Multi-language meta tags and structured data
- **Automatic Language Detection**: Smart routing based on user preferences

#### 🎵 **Music Showcase**

- **Artists Section**: Dynamic artist profiles with social media integration
- **Music Collection**: Embedded music videos and audio content
- **Works Gallery**: Complete collection of our musical releases

#### ⚡ **Performance & SEO**

- **Next.js 15**: Latest React framework with App Router
- **Server-Side Rendering**: Optimal loading speeds and SEO
- **Vercel Analytics**: Real-time performance monitoring
- **Google Search Console**: Comprehensive SEO optimization

#### 🎛️ **Customizable Animations**

The metaballs effect includes easily adjustable parameters:

- Animation speed controls
- Mouse interaction sensitivity
- Visual effects intensity
- Color scheme modifications

### 🛠️ Tech Stack

#### **Frontend Framework**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

#### **Styling & Animations**

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **Custom CSS Animations** - Gradient animations and effects

#### **3D Graphics**

- **Three.js** - WebGL 3D graphics library
- **Custom Shaders** - GLSL fragment and vertex shaders
- **Interactive Metaballs** - Real-time fluid simulation

#### **Internationalization**

- **next-intl** - Type-safe internationalization
- **JSON Message Files** - Structured translation management

#### **Analytics & SEO**

- **Vercel Analytics** - Performance monitoring
- **Structured Data** - Rich snippets and schema markup
- **Sitemap & Robots** - Search engine optimization

#### **Development Tools**

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Turbopack** - Fast development bundler

### 🚀 Quick Start

#### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

#### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/haoranzhang929/theneobeeclub.git
   cd theneobeeclub
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   NEXT_PUBLIC_SITE_URL=https://theneobee.club
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
   ```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the website.

### 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles and animations
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── MetaballsEffect.tsx # Three.js animation
│   ├── HeroSection.tsx    # Landing section
│   ├── ArtistsSection.tsx # Artist showcase
│   └── ...                # Other UI components
├── data/                  # Static data and content
│   ├── artists.ts         # Artist information
│   └── works.ts           # Music works data
├── messages/              # Internationalization
│   ├── en.json           # English translations
│   └── zh.json           # Chinese translations
└── lib/                   # Utility functions
    └── animations.ts      # Framer Motion variants
```

### 🎛️ Customizing Animations

The Three.js metaballs effect includes adjustable parameters marked with 🎛️ emojis:

**Animation Speed:**

```glsl
// Overall animation speed (0.1 = very slow → 1.5 = very fast)
float t = u_time * 0.2;
```

**Mouse Following:**

```javascript
// Mouse following speed (0.01 = slow → 0.3 = fast)
const lerpFactor = 0.01;
```

**Visual Effects:**

- Metaball sizes and influence
- Color schemes and intensity
- Glow effects around mouse
- Pulse animation settings

### 🎨 Adding New Artists

1. **Update artist data** in `src/data/artists.ts`
2. **Add translations** in `src/messages/en.json` and `src/messages/zh.json`
3. **Add artist image** to `public/` folder

See `src/data/ARTIST_GUIDE.md` for detailed instructions.

### 🌐 Deployment

#### Vercel (Recommended)

```bash
npm run build
```

Deploy to Vercel with automatic optimizations for Next.js.

#### Other Platforms

```bash
npm run build
npm start
```

### 📞 Contact & Social Media

- **Website**: [theneobee.club](https://theneobee.club)
- **YouTube**: [@TheNeoBeeClub](https://www.youtube.com/@TheNeoBeeClub)
- **Location**: Dublin, Ireland 🇮🇪

### 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 中文版本

### 🎯 关于 The NeoBee Club

**The NeoBee Club** 是一个位于都柏林的音乐爱好者团体，探索灵魂、爵士和电子等多元音乐风格。我们热衷于通过 DJ 演出、现场表演和创意合作分享音乐的乐趣。

这个代码仓库包含我们官方网站的源代码，使用现代网络技术构建，展示我们的艺术家、音乐作品和即将举行的活动。

### 🌟 功能特色

#### 🎨 **交互式视觉体验**

- **Three.js 元球动画**: 令人惊叹的基于 WebGL 的有机 blob 动画，响应鼠标移动（灵感来源于 [Codrops 教程](https://tympanus.net/codrops/2025/06/09/how-to-create-interactive-droplet-like-metaballs-with-three-js-and-glsl/)）
- **流畅动画**: Framer Motion 驱动的转场效果和微交互
- **响应式设计**: 在所有设备和屏幕尺寸上完美体验

#### 🌍 **国际化支持**

- **双语支持**: 完整的英文和中文语言支持
- **SEO 优化**: 多语言元标签和结构化数据
- **自动语言检测**: 基于用户偏好的智能路由

#### 🎵 **音乐展示**

- **艺术家专区**: 动态艺术家档案，集成社交媒体
- **音乐合集**: 嵌入式音乐视频和音频内容
- **作品画廊**: 我们音乐发布的完整收藏

#### ⚡ **性能与 SEO**

- **Next.js 15**: 最新的 React 框架，采用 App Router
- **服务端渲染**: 优化的加载速度和 SEO
- **Vercel Analytics**: 实时性能监控
- **Google Search Console**: 全面的 SEO 优化

#### 🎛️ **可定制动画**

元球效果包含易于调整的参数：

- 动画速度控制
- 鼠标交互敏感度
- 视觉效果强度
- 色彩方案修改

### 🛠️ 技术栈

#### **前端框架**

- **Next.js 15** - 带有 App Router 的 React 框架
- **React 19** - 最新的 React 并发特性
- **TypeScript** - 类型安全开发

#### **样式和动画**

- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **Framer Motion** - 高级动画库
- **自定义 CSS 动画** - 渐变动画和效果

#### **3D 图形**

- **Three.js** - WebGL 3D 图形库
- **自定义着色器** - GLSL 片段和顶点着色器
- **交互式元球** - 实时流体模拟

#### **国际化**

- **next-intl** - 类型安全的国际化
- **JSON 消息文件** - 结构化翻译管理

#### **分析和 SEO**

- **Vercel Analytics** - 性能监控
- **结构化数据** - 丰富摘要和架构标记
- **Sitemap 和 Robots** - 搜索引擎优化

### 🚀 快速开始

#### 前置要求

- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun

#### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/haoranzhang929/theneobeeclub.git
   cd theneobeeclub
   ```

2. **安装依赖**

   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. **设置环境变量**

   ```bash
   cp .env.example .env.local
   ```

   编辑 `.env.local` 配置：

   ```env
   NEXT_PUBLIC_SITE_URL=https://theneobee.club
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
   ```

4. **运行开发服务器**

   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   ```

5. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   ├── globals.css        # 全局样式和动画
│   └── layout.tsx         # 根布局
├── components/            # React组件
│   ├── MetaballsEffect.tsx # Three.js动画
│   ├── HeroSection.tsx    # 着陆页部分
│   ├── ArtistsSection.tsx # 艺术家展示
│   └── ...                # 其他UI组件
├── data/                  # 静态数据和内容
│   ├── artists.ts         # 艺术家信息
│   └── works.ts           # 音乐作品数据
├── messages/              # 国际化
│   ├── en.json           # 英文翻译
│   └── zh.json           # 中文翻译
└── lib/                   # 工具函数
    └── animations.ts      # Framer Motion变体
```

### 🎛️ 自定义动画

Three.js 元球效果包含标有 🎛️ 表情符号的可调参数：

**动画速度:**

```glsl
// 整体动画速度 (0.1 = 非常慢 → 1.5 = 非常快)
float t = u_time * 0.2;
```

**鼠标跟随:**

```javascript
// 鼠标跟随速度 (0.01 = 慢 → 0.3 = 快)
const lerpFactor = 0.01;
```

**视觉效果:**

- 元球大小和影响范围
- 色彩方案和强度
- 鼠标周围的发光效果
- 脉冲动画设置

### 🎨 添加新艺术家

1. **更新艺术家数据** 在 `src/data/artists.ts`
2. **添加翻译** 在 `src/messages/en.json` 和 `src/messages/zh.json`
3. **添加艺术家图片** 到 `public/` 文件夹

详细说明请查看 `src/data/ARTIST_GUIDE.md`。

### 🌐 部署

#### Vercel（推荐）

```bash
npm run build
```

部署到 Vercel，自动为 Next.js 优化。

#### 其他平台

```bash
npm run build
npm start
```

### 📞 联系和社交媒体

- **网站**: [theneobee.club](https://theneobee.club)
- **YouTube**: [@TheNeoBeeClub](https://www.youtube.com/@TheNeoBeeClub)
- **地点**: 爱尔兰都柏林 🇮🇪

### 📝 许可证

此项目是开源的，遵循 [MIT 许可证](LICENSE)。

---

**Made with ❤️ by The NeoBee Club Team**
