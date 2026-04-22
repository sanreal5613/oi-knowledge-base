# 信奥知识库 - 项目完整说明

## 📦 项目已创建完成

恭喜！信奥知识库的基础框架已经搭建完成。以下是项目的完整说明和后续步骤。

## 📁 项目结构

```
D:\oi-knowledge-base/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 自动部署配置
├── docs/                           # 文档源文件
│   ├── .vitepress/
│   │   ├── components/            # Vue 组件
│   │   │   ├── CodeRunner.vue     # 代码在线运行器
│   │   │   ├── DifficultyBadge.vue # 难度徽章
│   │   │   └── AlgorithmCard.vue  # 算法卡片
│   │   ├── theme/
│   │   │   ├── index.js           # 主题入口
│   │   │   └── custom.css         # 自定义样式
│   │   └── config.js              # VitePress 配置
│   ├── guide/                     # 快速入门
│   │   ├── introduction.md        # 信奥竞赛介绍
│   │   ├── environment.md         # 开发环境配置
│   │   └── first-program.md       # 第一个程序
│   ├── language/                  # 语言基础（待补充）
│   ├── basic-algorithms/          # 基础算法
│   │   └── searching/
│   │       └── binary-search.md   # 二分查找示例
│   ├── data-structures/           # 数据结构（待补充）
│   ├── advanced-algorithms/       # 进阶算法（待补充）
│   ├── mathematics/               # 数学基础（待补充）
│   ├── contest/                   # 竞赛专题（待补充）
│   ├── solutions/                 # 题解精选（待补充）
│   ├── resources/                 # 工具与资源（待补充）
│   └── index.md                   # 首页
├── nginx/                         # Nginx 配置
│   └── conf.d/
│       └── default.conf           # 站点配置
├── .env.example                   # 环境变量模板
├── .gitignore                     # Git 忽略文件
├── docker-compose.yml             # Docker 编排配置
├── package.json                   # 项目配置
├── ARCHITECTURE.md                # 架构设计文档
├── DEPLOYMENT.md                  # 部署指南
└── README.md                      # 项目说明
```

## ✅ 已完成的功能

### 1. 基础框架
- ✅ VitePress 文档框架搭建
- ✅ 自定义主题（类菜鸟教程风格）
- ✅ 响应式布局
- ✅ 暗色模式支持

### 2. 核心组件
- ✅ CodeRunner - 代码在线运行器（前端已完成，待集成后端）
- ✅ DifficultyBadge - 难度徽章
- ✅ AlgorithmCard - 算法卡片

### 3. 示例内容
- ✅ 首页设计
- ✅ 快速入门（3 篇文档）
- ✅ 二分查找算法示例

### 4. 部署配置
- ✅ Docker Compose 配置
- ✅ Nginx 反向代理配置
- ✅ GitHub Actions 自动部署
- ✅ SSL/HTTPS 支持

## 🚧 待完成的工作

### 第一优先级：核心功能集成

#### 1. Judge0 代码执行后端集成

**当前状态**：CodeRunner 组件已创建，但使用模拟数据

**需要做的**：
1. 在服务器上部署 Judge0（使用 docker-compose.yml）
2. 创建 API 中间层处理代码执行请求
3. 更新 CodeRunner.vue 连接真实 API

**参考代码**（创建 `api/execute.js`）：

```javascript
export async function executeCode(sourceCode, stdin, languageId = 54) {
  const response = await fetch('/api/execute/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source_code: sourceCode,
      stdin: stdin,
      language_id: languageId, // 54 = C++ (GCC 9.2.0)
      cpu_time_limit: 2,
      memory_limit: 128000
    })
  })
  
  const { token } = await response.json()
  
  // 轮询获取结果
  let result
  do {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const statusResponse = await fetch(`/api/execute/submissions/${token}`)
    result = await statusResponse.json()
  } while (result.status.id <= 2) // 1=In Queue, 2=Processing
  
  return result
}
```

#### 2. Meilisearch 搜索集成

**当前状态**：VitePress 内置本地搜索

**需要做的**：
1. 部署 Meilisearch
2. 创建文档索引脚本
3. 替换为 Meilisearch 搜索

**索引脚本示例**（`scripts/index-docs.js`）：

```javascript
const { MeiliSearch } = require('meilisearch')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILI_MASTER_KEY
})

async function indexDocs() {
  const index = client.index('docs')
  const docs = []
  
  function readDocs(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        readDocs(filePath)
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: body } = matter(content)
        docs.push({
          id: filePath,
          title: data.title || file.replace('.md', ''),
          content: body.substring(0, 5000),
          path: filePath.replace('docs/', '/').replace('.md', '')
        })
      }
    })
  }
  
  readDocs('./docs')
  await index.addDocuments(docs)
  console.log(`Indexed ${docs.length} documents`)
}

indexDocs()
```

### 第二优先级：内容补充

根据 ARCHITECTURE.md 中的规划，需要补充以下内容：

#### 语言基础（约 20 篇）
- [ ] 变量与数据类型
- [ ] 运算符与表达式
- [ ] 输入输出详解
- [ ] 条件语句
- [ ] 循环语句
- [ ] 数组（一维、二维）
- [ ] 字符串
- [ ] 函数
- [ ] 递归
- [ ] STL（vector, stack, queue, set, map, algorithm）

#### 基础算法（约 15 篇）
- [ ] 枚举算法
- [ ] 模拟算法
- [ ] 排序算法（冒泡、选择、插入、快速、归并）
- [ ] 三分查找
- [ ] 递推与递归

#### 数据结构（约 15 篇）
- [ ] 链表
- [ ] 栈的应用
- [ ] 队列的应用
- [ ] 单调栈/队列
- [ ] 二叉树
- [ ] 堆
- [ ] 并查集
- [ ] 线段树
- [ ] 树状数组
- [ ] 字典树
- [ ] 图的存储与遍历

#### 进阶算法（约 25 篇）
- [ ] 动态规划（线性DP、背包、区间DP、树形DP、状压DP）
- [ ] 贪心算法
- [ ] DFS/BFS
- [ ] 最短路（Dijkstra, SPFA, Floyd）
- [ ] 最小生成树
- [ ] 网络流
- [ ] KMP 算法
- [ ] 字符串哈希

#### 数学基础（约 10 篇）
- [ ] 质数与筛法
- [ ] GCD/LCM
- [ ] 逆元
- [ ] 排列组合
- [ ] 容斥原理

#### 题解精选（约 50 题）
- [ ] 入门题解（15 题）
- [ ] 提高题解（20 题）
- [ ] 省选题解（15 题）

### 第三优先级：功能增强

- [ ] 用户系统（登录、注册、个人中心）
- [ ] 学习进度追踪
- [ ] 题目收藏功能
- [ ] 评论系统
- [ ] 代码分享功能
- [ ] 算法可视化动画
- [ ] 移动端 APP

## 🚀 快速开始

### 本地开发

```bash
# 1. 进入项目目录
cd D:\oi-knowledge-base

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run docs:dev

# 4. 访问 http://localhost:5173
```

### 构建生产版本

```bash
npm run docs:build
```

构建后的文件在 `dist/` 目录。

### 预览生产版本

```bash
npm run docs:preview
```

## 📝 内容编写指南

### 1. 创建新文档

在对应目录下创建 `.md` 文件，例如：

```bash
# 创建"变量与数据类型"文档
docs/language/syntax/variables.md
```

### 2. 文档模板

```markdown
# 标题

<DifficultyBadge level="easy" />

## 简介

简要介绍...

## 详细内容

### 小节 1

内容...

\`\`\`cpp
// 代码示例
#include <iostream>
using namespace std;

int main() {
    // ...
    return 0;
}
\`\`\`

### 在线测试

<CodeRunner :initialCode="\`代码\`" :showInput="true" />

## 练习题

1. 题目 1
2. 题目 2

## 总结

总结内容...
```

### 3. 使用组件

```vue
<!-- 代码运行器 -->
<CodeRunner 
  :initialCode="`#include <iostream>
using namespace std;
int main() {
    cout << 'Hello' << endl;
    return 0;
}`"
  :showInput="true"
/>

<!-- 难度徽章 -->
<DifficultyBadge level="easy" />   <!-- 入门 -->
<DifficultyBadge level="medium" /> <!-- 提高 -->
<DifficultyBadge level="hard" />   <!-- 省选 -->

<!-- 算法卡片 -->
<AlgorithmCard 
  title="快速排序"
  description="基于分治思想的高效排序算法"
  timeComplexity="O(n log n)"
  spaceComplexity="O(log n)"
/>
```

## 🌐 部署到服务器

详细步骤请参考 [DEPLOYMENT.md](DEPLOYMENT.md)

### 快速部署

```bash
# 1. 在服务器上克隆项目
git clone https://github.com/yourusername/oi-knowledge-base.git
cd oi-knowledge-base

# 2. 配置环境变量
cp .env.example .env
nano .env  # 修改密钥

# 3. 启动服务
docker-compose up -d

# 4. 配置域名和 SSL
# 参考 DEPLOYMENT.md
```

## 🔧 配置 GitHub 自动部署

1. 在 GitHub 仓库设置中添加 Secrets：
   - `SSH_PRIVATE_KEY`
   - `REMOTE_HOST`
   - `REMOTE_USER`
   - `REMOTE_TARGET`

2. 推送代码到 main 分支即可自动部署

## 📊 项目进度

- ✅ 基础框架：100%
- ✅ 核心组件：100%
- 🚧 后端集成：0%
- 🚧 内容编写：5%（3/100+ 篇）
- ⏳ 功能增强：0%

## 🎯 下一步建议

### 立即可做：

1. **本地测试**
   ```bash
   cd D:\oi-knowledge-base
   npm run docs:dev
   ```
   访问 http://localhost:5173 查看效果

2. **补充内容**
   - 从"语言基础"开始，按照 ARCHITECTURE.md 的规划逐步补充
   - 每篇文档包含：理论讲解 + 代码示例 + 在线运行 + 练习题

3. **初始化 Git 仓库**
   ```bash
   cd D:\oi-knowledge-base
   git init
   git add .
   git commit -m "Initial commit: OI Knowledge Base"
   git remote add origin https://github.com/yourusername/oi-knowledge-base.git
   git push -u origin main
   ```

### 需要服务器时：

4. **部署后端服务**
   - 按照 DEPLOYMENT.md 部署 Judge0 和 Meilisearch
   - 集成代码执行和搜索功能

5. **配置自动部署**
   - 设置 GitHub Actions
   - 实现推送即部署

## 📚 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Judge0 文档](https://ce.judge0.com/)
- [Meilisearch 文档](https://docs.meilisearch.com/)
- [OI Wiki](https://oi-wiki.org/)

## 💡 提示

1. **内容为王**：优先补充高质量的教程内容
2. **循序渐进**：从简单到复杂，符合学习规律
3. **实践导向**：每个知识点都配代码示例和练习题
4. **持续更新**：保持内容的时效性和准确性

## 🤝 需要帮助？

如果在开发过程中遇到问题，可以：

1. 查看项目文档（README.md, ARCHITECTURE.md, DEPLOYMENT.md）
2. 搜索相关技术文档
3. 在 GitHub Issues 提问

---

祝你的信奥知识库项目顺利！🚀
