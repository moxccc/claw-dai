# 🎨 涂鸦画板 (Doodle Page)

一个基于 React + TypeScript 构建的精美在线涂鸦画板工具。

**在线访问**: https://moxccc.github.io/claw-dai ✅

## ✨ 功能特点

- **多彩画笔** - 15 种预设颜色供你选择
- **可调笔刷大小** - 7 种不同粗细的笔刷
- **橡皮擦工具** - 快速擦除绘制内容
- **撤销功能** - 撤销最近的一笔
- **清空画布** - 一键清除所有内容
- **响应式设计** - 支持桌面和移动设备
- **触控支持** - 完美支持触屏设备

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **GitHub Pages** - 免费托管部署

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/moxccc/claw-dai.git
cd claw-dai

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
claw-dai/
├── src/
│   ├── components/
│   │   └── DoodleCanvas.tsx  # 画布组件
│   ├── App.tsx               # 主应用组件
│   ├── App.css               # 主样式文件
│   ├── index.css             # 全局样式
│   └── main.tsx              # 入口文件
├── public/                   # 静态资源
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 使用说明

1. **选择颜色** - 点击颜色按钮选择画笔颜色
2. **调整大小** - 点击尺寸按钮调整笔刷粗细
3. **开始绘制** - 在画布上按住鼠标或手指拖动绘制
4. **橡皮擦** - 点击橡皮擦按钮切换擦除模式
5. **撤销** - 点击撤销按钮撤销上一笔
6. **清空** - 点击清空按钮清除整个画布

## 📝 License

MIT License - 欢迎自由使用和修改！

## 🙏 致谢

- [Vite](https://vitejs.dev/) - 极快的构建工具
- [React](https://react.dev/) - 强大的 UI 库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

---

Made with ❤️ by [moxccc](https://github.com/moxccc)
