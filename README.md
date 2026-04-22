# 信奥知识库 OI Knowledge Base

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-brightgreen.svg)](https://vitepress.dev/)

> 面向信息学奥林匹克竞赛的综合知识库

## 📚 简介

信奥知识库是一个开源的、面向信息学奥林匹克竞赛（OI）学生的综合学习平台。我们致力于提供：

- 📖 系统完整的知识体系
- 💻 在线代码运行功能
- 🔍 强大的全文搜索
- 📝 精选题解与讲解
- 🎯 清晰的学习路径

## ✨ 特性

- **完整的知识体系**：从 C++ 基础到高级算法，涵盖 NOIP、省选、NOI 所有知识点
- **在线代码运行**：内置代码编辑器，支持在线编译运行 C++ 代码
- **全文搜索**：快速找到你需要的知识点和题解
- **算法可视化**：图文并茂的算法讲解，配合动画演示
- **响应式设计**：完美支持桌面、平板、手机
- **暗色模式**：保护你的眼睛
- **持续更新**：紧跟竞赛趋势，不断补充新内容

## 🚀 快速开始

### 在线访问

访问 [https://your-domain.com](https://your-domain.com) 开始学习

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/oi-knowledge-base.git
cd oi-knowledge-base

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产版本
npm run docs:preview
```

## 📖 内容结构

```
📦 信奥知识库
├── 🚀 快速入门
│   ├── 信奥竞赛介绍
│   ├── 开发环境配置
│   ├── 第一个程序
│   └── 在线评测系统
├── 📚 语言基础
│   ├── 基本语法
│   ├── 数组与字符串
│   ├── 函数与递归
│   └── STL 标准库
├── 📐 基础算法
│   ├── 枚举与模拟
│   ├── 排序算法
│   ├── 搜索算法
│   └── 递推与递归
├── 🏗️ 数据结构
│   ├── 线性结构
│   ├── 树形结构
│   └── 图论基础
├── ⚡ 进阶算法
│   ├── 动态规划
│   ├── 贪心算法
│   ├── 搜索进阶
│   ├── 图论进阶
│   └── 字符串算法
├── 🔢 数学基础
│   ├── 数论
│   ├── 组合数学
│   ├── 计算几何
│   └── 矩阵运算
├── 🏆 竞赛专题
│   ├── 省选/NOI 专题
│   └── 算法优化技巧
├── 📝 题解精选
│   ├── 入门题解
│   ├── 提高题解
│   ├── 省选题解
│   └── NOI 题解
└── 🛠️ 工具与资源
    ├── 在线评测平台
    ├── 学习资源推荐
    └── 代码模板
```

## 🛠️ 技术栈

- **前端框架**：VitePress (Vue 3)
- **代码运行**：Judge0 (Docker)
- **搜索引擎**：Meilisearch (Docker)
- **部署**：GitHub Actions + Nginx

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 贡献内容

- 📝 完善文档内容
- 🐛 修复错误
- ✨ 添加新功能
- 📚 添加题解
- 🎨 改进界面设计

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 文档编写规范

### Markdown 格式

```markdown
# 标题

## 二级标题

### 三级标题

- 列表项
- 列表项

**粗体** *斜体* `代码`

\`\`\`cpp
// 代码块
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, OI!" << endl;
    return 0;
}
\`\`\`
```

### 使用组件

```vue
<!-- 代码运行器 -->
<CodeRunner :initialCode="`代码内容`" :showInput="true" />

<!-- 难度徽章 -->
<DifficultyBadge level="easy" />

<!-- 算法卡片 -->
<AlgorithmCard 
  title="算法名称"
  description="算法描述"
  timeComplexity="O(n)"
  spaceComplexity="O(1)"
/>
```

## 🚀 部署

### 服务器要求

- Ubuntu 18.04+
- Docker & Docker Compose
- Node.js 16+
- Nginx

### 部署步骤

详见 [DEPLOYMENT.md](DEPLOYMENT.md)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 强大的文档框架
- [Judge0](https://judge0.com/) - 开源代码执行引擎
- [Meilisearch](https://www.meilisearch.com/) - 快速搜索引擎
- [OI Wiki](https://oi-wiki.org/) - 灵感来源

## 📧 联系我们

- 📮 邮箱: your-email@example.com
- 💬 QQ 群: 123456789
- 🐛 问题反馈: [GitHub Issues](https://github.com/yourusername/oi-knowledge-base/issues)

## ⭐ Star History

如果这个项目对你有帮助，欢迎给我们一个 Star！

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/oi-knowledge-base&type=Date)](https://star-history.com/#yourusername/oi-knowledge-base&Date)

---

<div align="center">
  <p>Made with ❤️ by OI Community</p>
  <p>© 2026 信奥知识库</p>
</div>
