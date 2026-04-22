# 在线评测系统

<DifficultyBadge level="easy" />

## 什么是在线评测系统？

在线评测系统（Online Judge，简称 OJ）是一个自动化的程序测试平台。你提交代码后，系统会：

1. 编译你的代码
2. 用多组测试数据运行
3. 检查输出是否正确
4. 给出评测结果

## 常用 OJ 平台

### 国内平台

#### 1. 洛谷（Luogu）

- **网址**：https://www.luogu.com.cn/
- **特点**：
  - 中文界面，适合初学者
  - 题目分类清晰，有难度标签
  - 社区活跃，有题解讨论
  - 支持团队功能
- **推荐指数**：⭐⭐⭐⭐⭐

#### 2. 牛客网

- **网址**：https://www.nowcoder.com/
- **特点**：
  - 题库丰富
  - 有竞赛模拟
  - 适合求职准备

### 国际平台

#### 1. Codeforces

- **网址**：https://codeforces.com/
- **特点**：
  - 国际知名竞赛平台
  - 定期举办比赛
  - 有 Rating 系统
  - 题目质量高
- **推荐指数**：⭐⭐⭐⭐⭐

#### 2. AtCoder

- **网址**：https://atcoder.jp/
- **特点**：
  - 日本平台
  - 题目质量高
  - 适合提高

#### 3. LeetCode

- **网址**：https://leetcode.cn/
- **特点**：
  - 面向求职
  - 中文版友好
  - 题目偏算法应用

## 评测结果说明

| 结果 | 英文缩写 | 说明 |
|------|---------|------|
| ✅ 通过 | AC (Accepted) | 完全正确 |
| ❌ 答案错误 | WA (Wrong Answer) | 输出不正确 |
| ⏱️ 超时 | TLE (Time Limit Exceeded) | 运行时间超过限制 |
| 💾 内存超限 | MLE (Memory Limit Exceeded) | 使用内存超过限制 |
| 💥 运行错误 | RE (Runtime Error) | 程序崩溃（如数组越界） |
| 📝 编译错误 | CE (Compile Error) | 代码无法编译 |
| ⚠️ 输出超限 | OLE (Output Limit Exceeded) | 输出过多 |

## 提交代码流程

### 1. 阅读题目

仔细阅读题目要求，理解：
- 输入格式
- 输出格式
- 数据范围
- 时间限制
- 空间限制

### 2. 编写代码

```cpp
#include <iostream>
using namespace std;

int main() {
    // 你的代码
    return 0;
}
```

### 3. 本地测试

用样例数据测试：

```
输入：
3 5

输出：
8
```

### 4. 提交代码

- 选择语言（C++）
- 粘贴代码
- 点击提交

### 5. 查看结果

等待评测结果，根据反馈调整代码。

## 常见问题

### WA (答案错误)

**可能原因：**
- 逻辑错误
- 边界条件未考虑
- 输出格式不对（多/少空格、换行）
- 数据类型溢出

**解决方法：**
```cpp
// 检查边界条件
if (n == 0) {
    cout << 0 << endl;
    return 0;
}

// 检查数据类型
long long ans = (long long)a * b;  // 防止溢出
```

### TLE (超时)

**可能原因：**
- 算法复杂度过高
- 死循环
- 输入输出未优化

**解决方法：**
```cpp
// 加速输入输出
ios::sync_with_stdio(false);
cin.tie(nullptr);

// 优化算法
// O(n²) → O(n log n)
```

### RE (运行错误)

**可能原因：**
- 数组越界
- 除以零
- 栈溢出（递归太深）
- 空指针

**解决方法：**
```cpp
// 检查数组下标
if (i >= 0 && i < n) {
    arr[i] = x;
}

// 检查除数
if (b != 0) {
    cout << a / b << endl;
}
```

### MLE (内存超限)

**可能原因：**
- 数组开太大
- 内存泄漏

**解决方法：**
```cpp
// 动态分配改为局部变量
// 或优化空间复杂度
```

## 输入输出技巧

### 多组测试数据

```cpp
// 方法 1：指定组数
int T;
cin >> T;
while (T--) {
    // 处理一组数据
}

// 方法 2：读到 EOF
int n;
while (cin >> n) {
    // 处理一组数据
}
```

### 输出格式

```cpp
// 注意空格和换行
cout << a << " " << b << endl;  // 两数之间有空格

// 每行末尾不要多余空格
for (int i = 0; i < n; i++) {
    if (i > 0) cout << " ";
    cout << arr[i];
}
cout << endl;
```

## 洛谷入门题推荐

### 超级简单

- [P1000 超级玛丽游戏](https://www.luogu.com.cn/problem/P1000) - 输出固定内容
- [P1001 A+B Problem](https://www.luogu.com.cn/problem/P1001) - 两数相加

### 简单

- [P1421 小玉买文具](https://www.luogu.com.cn/problem/P1421) - 简单计算
- [P1425 小鱼的游泳时间](https://www.luogu.com.cn/problem/P1425) - 时间计算

### 入门

- [P1008 三连击](https://www.luogu.com.cn/problem/P1008) - 枚举
- [P1035 级数求和](https://www.luogu.com.cn/problem/P1035) - 循环

## 刷题建议

### 1. 循序渐进

从简单题开始，逐步提高难度。

### 2. 分类练习

按算法分类刷题：
- 模拟
- 枚举
- 排序
- 搜索
- 动态规划

### 3. 总结归纳

每道题做完后：
- 理解算法原理
- 记录易错点
- 整理代码模板

### 4. 定期复习

隔一段时间重做之前的题目。

### 5. 参加比赛

定期参加在线比赛，锻炼实战能力。

## 竞赛代码模板

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>
#include <cmath>
using namespace std;

typedef long long ll;
const int N = 1e5 + 10;
const int INF = 0x3f3f3f3f;

int n, m;
int a[N];

void solve() {
    // 你的代码
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    solve();
    
    return 0;
}
```

## 总结

- 选择合适的 OJ 平台（推荐洛谷）
- 理解评测结果含义
- 注意输入输出格式
- 循序渐进，分类练习
- 参加比赛，积累经验

## 下一步

- [学习 C++ 基础语法](/language/syntax/variables)
- [开始刷题练习](https://www.luogu.com.cn/training/list)
- [查看题解精选](/solutions/beginner/)
