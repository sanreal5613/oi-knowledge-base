import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '芯程信奥',
  description: '面向信息学奥林匹克竞赛的综合知识库',
  lang: 'zh-CN',
  
  ignoreDeadLinks: true,
  
  // 主题配置
  themeConfig: {
    logo: '/logo.png',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速入门', link: '/guide/introduction' },
      { 
        text: '基础知识',
        items: [
          { text: 'C++ 语言基础', link: '/language/syntax/variables' },
          { text: '基础算法', link: '/basic-algorithms/enumeration/introduction' },
          { text: '数据结构', link: '/data-structures/linear/array' }
        ]
      },
      {
        text: '进阶内容',
        items: [
          { text: '进阶算法', link: '/advanced-algorithms/dp/introduction' },
          { text: '数学基础', link: '/mathematics/number-theory/prime' },
          { text: '竞赛专题', link: '/contest/advanced-topics/block' }
        ]
      },
      { text: '题解精选', link: '/solutions/beginner/' },
      { text: '资源工具', link: '/resources/platforms' },
      { text: '芯程OJ', link: 'http://oj.nicecode.top' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '快速入门',
          items: [
            { text: '信奥竞赛介绍', link: '/guide/introduction' },
            { text: '开发环境配置', link: '/guide/environment' },
            { text: '第一个程序', link: '/guide/first-program' },
            { text: '在线评测系统', link: '/guide/online-judge' },
            { text: 'C++ 常用英文单词', link: '/guide/english-words' },
            { text: 'C++ 关键字', link: '/guide/cpp-keywords' }
          ]
        }
      ],
      
      '/language/': [
        {
          text: '基本语法',
          collapsed: false,
          items: [
            { text: '变量与数据类型', link: '/language/syntax/variables' },
            { text: '运算符与表达式', link: '/language/syntax/operators' },
            { text: '输入输出详解', link: '/language/syntax/io' },
            { text: '条件语句', link: '/language/syntax/conditions' },
            { text: '循环语句', link: '/language/syntax/loops' }
          ]
        },
        {
          text: '数组与字符串',
          collapsed: false,
          items: [
            { text: '一维数组', link: '/language/array/one-dimensional' },
            { text: '二维数组', link: '/language/array/two-dimensional' },
            { text: '字符数组与字符串', link: '/language/array/string' }
          ]
        },
        {
          text: '函数与递归',
          collapsed: false,
          items: [
            { text: '函数定义与调用', link: '/language/function/basics' },
            { text: '参数传递', link: '/language/function/parameters' },
            { text: '递归基础', link: '/language/function/recursion' }
          ]
        },
        {
          text: 'STL 标准库',
          collapsed: false,
          items: [
            { text: 'vector 动态数组', link: '/language/stl/vector' },
            { text: 'stack 栈', link: '/language/stl/stack' },
            { text: 'queue 队列', link: '/language/stl/queue' },
            { text: 'priority_queue 优先队列', link: '/language/stl/priority-queue' },
            { text: 'set/map 集合与映射', link: '/language/stl/set-map' },
            { text: 'algorithm 算法库', link: '/language/stl/algorithm' }
          ]
        }
      ],

      '/basic-algorithms/': [
        {
          text: '枚举与模拟',
          collapsed: false,
          items: [
            { text: '枚举算法', link: '/basic-algorithms/enumeration/introduction' },
            { text: '模拟算法', link: '/basic-algorithms/enumeration/simulation' }
          ]
        },
        {
          text: '排序算法',
          collapsed: false,
          items: [
            { text: '排序算法概述', link: '/basic-algorithms/sorting/overview' },
            { text: '冒泡排序', link: '/basic-algorithms/sorting/bubble' },
            { text: '选择排序', link: '/basic-algorithms/sorting/selection' },
            { text: '插入排序', link: '/basic-algorithms/sorting/insertion' },
            { text: '快速排序', link: '/basic-algorithms/sorting/quick' },
            { text: '归并排序', link: '/basic-algorithms/sorting/merge' }
          ]
        },
        {
          text: '搜索算法',
          collapsed: false,
          items: [
            { text: '二分查找', link: '/basic-algorithms/searching/binary-search' },
            { text: '三分查找', link: '/basic-algorithms/searching/ternary-search' }
          ]
        }
      ],

      '/data-structures/': [
        {
          text: '线性结构',
          collapsed: false,
          items: [
            { text: '数组基础', link: '/data-structures/linear/array' },
            { text: '链表', link: '/data-structures/linear/linked-list' },
            { text: '栈的应用', link: '/data-structures/linear/stack' },
            { text: '队列的应用', link: '/data-structures/linear/queue' },
            { text: '单调栈', link: '/data-structures/linear/monotonic-stack' },
            { text: '单调队列', link: '/data-structures/linear/monotonic-queue' }
          ]
        },
        {
          text: '树形结构',
          collapsed: false,
          items: [
            { text: '二叉树基础', link: '/data-structures/tree/binary-tree' },
            { text: '二叉搜索树', link: '/data-structures/tree/bst' },
            { text: '堆 (Heap)', link: '/data-structures/tree/heap' },
            { text: '并查集', link: '/data-structures/tree/union-find' },
            { text: '线段树', link: '/data-structures/tree/segment-tree' },
            { text: '树状数组', link: '/data-structures/tree/fenwick-tree' },
            { text: '字典树 (Trie)', link: '/data-structures/tree/trie' }
          ]
        },
        {
          text: '图论基础',
          collapsed: false,
          items: [
            { text: '图的存储', link: '/data-structures/graph/storage' },
            { text: '图的遍历', link: '/data-structures/graph/traversal' },
            { text: '拓扑排序', link: '/data-structures/graph/topological-sort' }
          ]
        }
      ],

      '/advanced-algorithms/': [
        {
          text: '动态规划',
          collapsed: false,
          items: [
            { text: '动态规划入门', link: '/advanced-algorithms/dp/introduction' },
            { text: '线性 DP', link: '/advanced-algorithms/dp/linear' },
            { text: '背包问题', link: '/advanced-algorithms/dp/knapsack' },
            { text: '区间 DP', link: '/advanced-algorithms/dp/interval' },
            { text: '树形 DP', link: '/advanced-algorithms/dp/tree' },
            { text: '状态压缩 DP', link: '/advanced-algorithms/dp/state-compression' }
          ]
        },
        {
          text: '贪心算法',
          collapsed: false,
          items: [
            { text: '贪心思想', link: '/advanced-algorithms/greedy/introduction' },
            { text: '区间问题', link: '/advanced-algorithms/greedy/interval' }
          ]
        },
        {
          text: '搜索进阶',
          collapsed: false,
          items: [
            { text: '深度优先搜索', link: '/advanced-algorithms/search/dfs' },
            { text: '广度优先搜索', link: '/advanced-algorithms/search/bfs' },
            { text: '剪枝优化', link: '/advanced-algorithms/search/pruning' }
          ]
        },
        {
          text: '图论进阶',
          collapsed: false,
          items: [
            { text: '最短路算法', link: '/advanced-algorithms/graph/shortest-path' },
            { text: '最小生成树', link: '/advanced-algorithms/graph/mst' },
            { text: '网络流', link: '/advanced-algorithms/graph/network-flow' }
          ]
        },
        {
          text: '字符串算法',
          collapsed: false,
          items: [
            { text: 'KMP 算法', link: '/advanced-algorithms/string/kmp' },
            { text: '字符串哈希', link: '/advanced-algorithms/string/hash' }
          ]
        }
      ],

      '/mathematics/': [
        {
          text: '数论',
          collapsed: false,
          items: [
            { text: '质数与筛法', link: '/mathematics/number-theory/prime' },
            { text: '最大公约数', link: '/mathematics/number-theory/gcd' },
            { text: '最小公倍数', link: '/mathematics/number-theory/lcm' },
            { text: '扩展欧几里得', link: '/mathematics/number-theory/exgcd' },
            { text: '逆元', link: '/mathematics/number-theory/inverse' },
            { text: '欧拉函数', link: '/mathematics/number-theory/euler' },
            { text: '中国剩余定理', link: '/mathematics/number-theory/crt' }
          ]
        },
        {
          text: '组合数学',
          collapsed: false,
          items: [
            { text: '排列组合', link: '/mathematics/combinatorics/permutation' },
            { text: '卡特兰数', link: '/mathematics/combinatorics/catalan' },
            { text: '容斥原理', link: '/mathematics/combinatorics/inclusion-exclusion' },
            { text: '生成函数', link: '/mathematics/combinatorics/generating-function' }
          ]
        },
        {
          text: '计算几何',
          collapsed: false,
          items: [
            { text: '基础几何', link: '/mathematics/geometry/basics' },
            { text: '凸包', link: '/mathematics/geometry/convex-hull' },
            { text: '旋转卡壳', link: '/mathematics/geometry/rotating-calipers' }
          ]
        },
        {
          text: '矩阵运算',
          collapsed: false,
          items: [
            { text: '矩阵乘法', link: '/mathematics/matrix/multiplication' },
            { text: '矩阵快速幂', link: '/mathematics/matrix/matrix-power' },
            { text: '高斯消元', link: '/mathematics/matrix/gaussian-elimination' }
          ]
        }
      ],

      '/contest/': [
        {
          text: '省选/NOI 专题',
          collapsed: false,
          items: [
            { text: '分块算法', link: '/contest/advanced-topics/block' },
            { text: '莫队算法', link: '/contest/advanced-topics/mo' },
            { text: '树链剖分', link: '/contest/advanced-topics/hld' }
          ]
        }
      ],

      '/solutions/': [
        {
          text: '题解精选',
          items: [
            { text: '入门题解', link: '/solutions/beginner/' },
            { text: '提高题解', link: '/solutions/intermediate/' },
            { text: '省选题解', link: '/solutions/advanced/' }
          ]
        }
      ],

      '/resources/': [
        {
          text: '工具与资源',
          items: [
            { text: '在线评测平台', link: '/resources/platforms' },
            { text: '学习资源推荐', link: '/resources/learning' },
            { text: '代码模板', link: '/resources/templates' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/oi-knowledge-base' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2026 信奥知识库'
    },

    // 搜索
    search: {
      provider: 'local'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/yourusername/oi-knowledge-base/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '目录'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',
    
    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',
    
    // 深色模式切换标签
    darkModeSwitchLabel: '外观',
    
    // 浅色模式切换标题
    lightModeSwitchTitle: '切换到浅色模式',
    
    // 深色模式切换标题
    darkModeSwitchTitle: '切换到深色模式'
  },

  // Markdown 配置
  markdown: {
    math: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  },

  // 构建配置
  base: '/',
  outDir: '../dist',

  // 平滑滚动配置
  scrollOffset: 'header',

  // Vite 配置
  vite: {
    css: {
      devSourcemap: true
    }
  },
  
  // Head 配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ]
})
