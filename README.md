# 🖋️ WechatMdCraft

> **100% 纯本地高颜值 Markdown 微信公众号排版神器 · 草稿永不上云**  
> *100% Client-Side High Aesthetic Markdown to WeChat Official Account Formatter. Zero Server Storage.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![Privacy: Local-First](https://img.shields.io/badge/Privacy-100%25%20Local-success.svg)](#-为什么选择-wechatmdcraft)

---

## 💡 为什么选择 WechatMdCraft？

在日常技术输出与公众号写作中，将 Markdown 转为微信排版是一件繁琐的事。微信公众号后台编辑器会强制剔除外部 `<style>` 标签与自定义 class，导致普通 Markdown 渲染出的格式在粘贴进后台后样式彻底丢失。

**WechatMdCraft 专为解决这一痛点设计：**
- 🔒 **纯本地离线运行**：文章内容只存在你的本地浏览器（LocalStorage 自动暂存草稿），**绝不上云，保护你的创作隐私与商业草稿**。
- 🎨 **专属 CSS 自动内联化引擎**：在渲染时直接把精美排版写入每个 HTML 节点的 `style="..."` 属性中，一键复制到公众号后台 **100% 还原样式、不跑版、不掉色**。
- 🔗 **外链自动转文末脚注**：微信公众号限制直接点击外部链接。工具会自动识别文章中所有 `[链接文本](url)`，自动转为上标 `[1]` 并在文末生成优雅的 **“引用与参考链接”** 列表。
- 💻 **Mac 风格高质感代码块**：代码块自带红黄绿 `● ● ●` 三色经典视窗圆点，优雅磨砂质感背景。

---

## 🎨 内置精选排版主题

1. **科技深蓝 (Tech Blue)**：深邃沉稳的科技感排版，适合技术架构、微服务、AI 技术分享。
2. **黑金极客 (Dark Gold)**：黑金高对比度质感，适合年终总结、深度行业洞察、高规格报告。
3. **清新薄荷 (Fresh Mint)**：清新护眼的自然绿色系，适合生活随笔、读书笔记、个人成长。
4. **优雅朱红 (Chinese Carmine)**：中国传统朱红与绯色系，适合节日推文、热点时评、文化故事。

---

## 🛠️ 本地启动与开发

基于 Vue 3 + Vite + Marked 构建：

```bash
# 1. 克隆代码或进入项目目录
cd wechat-md-craft

# 2. 安装依赖
npm install

# 3. 启动本地开发热更新
npm run dev

# 4. 打包纯静态产物
npm run build
```

打包完成后，`dist` 目录生成纯静态资源，可部署在任何静态 CDN / Nginx / GitHub Pages。

---

## 🌐 免费部署到 GitHub Pages

项目已内置 `.github/workflows/deploy.yml` 自动化流水线。

1. 在 GitHub 上创建新仓库 `wechat-md-craft`。
2. 在本地执行：
   ```bash
   git remote add origin https://github.com/Mianm-l/wechat-md-craft.git
   git branch -M main
   git push -u origin main
   ```
3. 在 GitHub 仓库的 **Settings -> Pages** 中将 **Source** 设置为 **GitHub Actions**。几分钟后即可获得专属的 `https://mianm-l.github.io/wechat-md-craft/` 独立在线排版工具！

---

## 📄 开源协议 (License)

本项目基于 [MIT License](LICENSE) 开源。
