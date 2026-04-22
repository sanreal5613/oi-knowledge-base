---
layout: home

hero:
  name: 芯程信奥知识库
  text: OI Knowledge Base
  tagline: 面向信息学奥林匹克竞赛的综合知识库
  image:
    src: /logo.png
    alt: 芯程信奥知识库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/introduction
    - theme: alt
      text: 芯程OJ
      link: http://oj.nicecode.top
    - theme: alt
      text: GitHub
      link: https://github.com/yourusername/oi-knowledge-base

features:
  - icon: 🚀
    title: 快速入门
    details: 从零开始学习 C++ 和算法基础，配置开发环境，了解竞赛规则
    link: /guide/introduction
    
  - icon: 📚
    title: 系统学习
    details: 完整的知识体系，从语言基础到高级算法，循序渐进
    link: /language/syntax/variables
    
  - icon: 💻
    title: 打字练习
    details: 打字鸭 - 专业的编程打字练习工具，提升你的代码输入速度
    link: https://www.daziya.com/
    
  - icon: 🔍
    title: 全文搜索
    details: 强大的搜索功能，快速找到你需要的知识点和题解
    
  - icon: 📐
    title: 算法可视化
    details: 图文并茂的算法讲解，配合动画演示，轻松理解复杂算法
    
  - icon: 🏆
    title: 竞赛导向
    details: 针对 NOIP、省选、NOI 等竞赛，提供专题训练和真题解析
    link: /contest/advanced-topics/block
    
  - icon: 📝
    title: 题解精选
    details: 精选经典题目，详细题解分析，帮助你快速提升解题能力
    link: /solutions/beginner/
    
  - icon: 🛠️
    title: 代码模板
    details: 常用算法模板库，一键复制，提高编码效率
    link: /resources/templates
    
  - icon: 📱
    title: 响应式设计
    details: 完美支持桌面、平板、手机，随时随地学习
    
  - icon: 🌙
    title: 暗色模式
    details: 支持浅色/暗色主题切换，保护你的眼睛
    
  - icon: 🔄
    title: 持续更新
    details: 紧跟竞赛趋势，不断补充新知识点和题解
    
  - icon: 🆓
    title: 完全免费
    details: 所有内容完全免费开放，助力每一位信奥学子
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dark {
  --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>

## 学习路径

<div class="learning-path-container">
  <img src="/learning-path.svg" alt="信奥学习路径" class="learning-path-image" />
</div>

<div class="path-buttons">
  <a href="/guide/introduction" class="path-button csp-j">CSP-J 入门</a>
  <a href="/guide/introduction" class="path-button csp-s">CSP-S 提高</a>
  <a href="/guide/introduction" class="path-button noip">NOIP 提高</a>
  <a href="/guide/introduction" class="path-button provincial">省选冲刺</a>
</div>

<style>
.learning-path-container {
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
}

.learning-path-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.path-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.path-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
}

.path-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.path-button.csp-j {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.path-button.csp-s {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

.path-button.noip {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.path-button.provincial {
  background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
}
</style>
