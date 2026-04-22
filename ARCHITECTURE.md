# 信奥知识库架构设计

## 一、知识体系分类

### 1. 🚀 快速入门 (Getting Started)
- 信奥竞赛介绍
- 开发环境配置 (Dev-C++, VS Code, CLion)
- C++ 基础语法速览
- 第一个程序：输入输出
- 在线评测系统使用

### 2. 📚 语言基础 (Language Basics)
#### 2.1 基本语法
- 变量与数据类型
- 运算符与表达式
- 输入输出详解
- 条件语句 (if, switch)
- 循环语句 (for, while)

#### 2.2 数组与字符串
- 一维数组
- 二维数组
- 字符数组与字符串
- string 类使用

#### 2.3 函数与递归
- 函数定义与调用
- 参数传递
- 递归基础
- 递归经典问题

#### 2.4 STL 标准库
- vector 动态数组
- stack 栈
- queue 队列
- priority_queue 优先队列
- set/map 集合与映射
- algorithm 算法库

### 3. 📐 基础算法 (Basic Algorithms)
#### 3.1 枚举与模拟
- 枚举算法
- 模拟算法
- 日期问题
- 进制转换

#### 3.2 排序算法
- 冒泡排序
- 选择排序
- 插入排序
- 快速排序
- 归并排序
- STL sort 使用

#### 3.3 搜索算法
- 顺序查找
- 二分查找
- 三分查找

#### 3.4 递推与递归
- 递推关系
- 递归实现
- 记忆化搜索

### 4. 🏗️ 数据结构 (Data Structures)
#### 4.1 线性结构
- 链表
- 栈的应用
- 队列的应用
- 单调栈
- 单调队列

#### 4.2 树形结构
- 二叉树基础
- 二叉搜索树
- 堆 (Heap)
- 并查集 (Union-Find)
- 线段树
- 树状数组
- 字典树 (Trie)

#### 4.3 图论基础
- 图的存储
- 图的遍历 (DFS/BFS)
- 拓扑排序

### 5. ⚡ 进阶算法 (Advanced Algorithms)
#### 5.1 动态规划
- 动态规划入门
- 线性 DP
- 背包问题
- 区间 DP
- 树形 DP
- 状态压缩 DP
- 数位 DP

#### 5.2 贪心算法
- 贪心思想
- 区间问题
- 哈夫曼编码
- 贪心经典题

#### 5.3 搜索进阶
- 深度优先搜索 (DFS)
- 广度优先搜索 (BFS)
- 双向搜索
- 启发式搜索 (A*)
- 剪枝优化

#### 5.4 图论进阶
- 最短路算法 (Dijkstra, SPFA, Floyd)
- 最小生成树 (Kruskal, Prim)
- 强连通分量
- 割点与桥
- 网络流
- 二分图匹配

#### 5.5 字符串算法
- KMP 算法
- 字符串哈希
- Manacher 算法
- AC 自动机
- 后缀数组

### 6. 🔢 数学基础 (Mathematics)
#### 6.1 数论
- 质数与筛法
- 最大公约数
- 扩展欧几里得
- 逆元
- 中国剩余定理
- 欧拉函数

#### 6.2 组合数学
- 排列组合
- 卡特兰数
- 容斥原理
- 生成函数

#### 6.3 计算几何
- 基础几何
- 凸包
- 旋转卡壳

#### 6.4 矩阵运算
- 矩阵乘法
- 矩阵快速幂
- 高斯消元

### 7. 🏆 竞赛专题 (Contest Topics)
#### 7.1 省选/NOI 专题
- 分块算法
- 莫队算法
- 树链剖分
- 动态树 (LCT)
- 可持久化数据结构
- 平衡树 (Treap, Splay)

#### 7.2 算法优化技巧
- 时间复杂度分析
- 空间优化
- 常数优化
- 卡常技巧

### 8. 📝 题解精选 (Problem Solutions)
- 入门题解
- 提高题解
- 省选题解
- NOI 题解
- 经典题单

### 9. 🛠️ 工具与资源 (Tools & Resources)
- 在线评测平台
- 学习资源推荐
- 竞赛信息
- 常用代码模板

---

## 二、技术架构

### 前端
- **框架**: VitePress (Vue 3)
- **样式**: 自定义主题 + TailwindCSS
- **代码高亮**: Shiki
- **代码运行**: Monaco Editor + Judge0 API

### 后端服务
- **搜索**: Meilisearch (Docker 部署)
- **代码执行**: Judge0 (Docker 部署)
- **API**: Node.js/Express

### 部署
- **版本控制**: GitHub
- **CI/CD**: GitHub Actions
- **服务器**: Ubuntu 18.04 + Docker + Nginx

---

## 三、内容组织结构

```
docs/
├── index.md                    # 首页
├── guide/                      # 快速入门
│   ├── introduction.md
│   ├── environment.md
│   └── first-program.md
├── language/                   # 语言基础
│   ├── syntax/
│   ├── array/
│   ├── function/
│   └── stl/
├── basic-algorithms/           # 基础算法
│   ├── enumeration/
│   ├── sorting/
│   ├── searching/
│   └── recursion/
├── data-structures/            # 数据结构
│   ├── linear/
│   ├── tree/
│   └── graph/
├── advanced-algorithms/        # 进阶算法
│   ├── dp/
│   ├── greedy/
│   ├── search/
│   ├── graph/
│   └── string/
├── mathematics/                # 数学基础
│   ├── number-theory/
│   ├── combinatorics/
│   ├── geometry/
│   └── matrix/
├── contest/                    # 竞赛专题
│   ├── advanced-topics/
│   └── optimization/
├── solutions/                  # 题解精选
│   ├── beginner/
│   ├── intermediate/
│   ├── advanced/
│   └── noi/
└── resources/                  # 工具与资源
    ├── platforms.md
    ├── learning.md
    └── templates.md
```

---

## 四、特色功能

### 1. 在线代码运行
- 支持 C++14/17/20
- 实时编译执行
- 显示运行结果和错误信息
- 自定义输入测试

### 2. 全文搜索
- 毫秒级搜索响应
- 支持中文分词
- 搜索结果高亮
- 智能排序

### 3. 代码模板库
- 常用算法模板
- 一键复制
- 分类管理

### 4. 学习路径
- 按难度分级
- 推荐学习顺序
- 进度追踪

### 5. 响应式设计
- 支持桌面/平板/手机
- 暗色模式
- 代码主题切换

---

## 五、开发计划

### Phase 1: 基础框架 (当前)
- ✅ 项目初始化
- ⏳ VitePress 配置
- ⏳ 导航与侧边栏
- ⏳ 首页设计
- ⏳ 基础样式

### Phase 2: 核心内容
- 编写入门教程
- 编写语言基础
- 编写基础算法
- 编写数据结构

### Phase 3: 功能集成
- 集成 Meilisearch 搜索
- 集成 Judge0 代码运行
- 代码编辑器优化

### Phase 4: 高级内容
- 进阶算法
- 数学基础
- 竞赛专题
- 题解精选

### Phase 5: 部署上线
- GitHub Actions 配置
- 服务器部署
- 域名配置
- 性能优化
