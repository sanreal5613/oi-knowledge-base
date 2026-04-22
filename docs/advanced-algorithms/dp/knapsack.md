# 背包问题

<DifficultyBadge level="medium" />

## 什么是背包问题？

背包问题是动态规划的经典问题：给定一个容量为 W 的背包和 n 个物品，每个物品有重量和价值，求背包能装下的最大价值。

## 0/1 背包

每个物品**只能选择一次**（要么拿，要么不拿）。

### 问题描述

- n 个物品，背包容量 W
- 第 i 个物品：重量 w[i]，价值 v[i]
- 每个物品只能选 0 次或 1 次
- 求最大价值

### 状态定义

`dp[i][j]` = 前 i 个物品，背包容量为 j 时的最大价值

### 状态转移

```
dp[i][j] = max(
    dp[i-1][j],              // 不选第 i 个物品
    dp[i-1][j-w[i]] + v[i]   // 选第 i 个物品
)
```

### 代码实现

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    
    int w[n + 1], v[n + 1];
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    int dp[n + 1][W + 1];
    
    // 初始化
    for (int i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    for (int j = 0; j <= W; j++) {
        dp[0][j] = 0;
    }
    
    // 状态转移
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= W; j++) {
            dp[i][j] = dp[i - 1][j];  // 不选
            if (j >= w[i]) {
                dp[i][j] = max(dp[i][j], dp[i - 1][j - w[i]] + v[i]);  // 选
            }
        }
    }
    
    cout << dp[n][W] << endl;
    
    return 0;
}
```

### 空间优化（一维数组）

```cpp
int dp[W + 1] = {0};

for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {  // 倒序遍历
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}

cout << dp[W] << endl;
```

::: tip 为什么倒序？
倒序遍历保证每个物品只被使用一次。如果正序遍历，同一个物品可能被多次使用。
:::

## 完全背包

每个物品**可以选择无限次**。

### 问题描述

- n 个物品，背包容量 W
- 第 i 个物品：重量 w[i]，价值 v[i]
- 每个物品可以选无限次
- 求最大价值

### 状态转移

```
dp[i][j] = max(
    dp[i-1][j],              // 不选第 i 个物品
    dp[i][j-w[i]] + v[i]     // 选第 i 个物品（注意是 dp[i]）
)
```

### 代码实现

```cpp
int dp[W + 1] = {0};

for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= W; j++) {  // 正序遍历
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}

cout << dp[W] << endl;
```

::: tip 为什么正序？
正序遍历允许同一个物品被多次使用。
:::

## 多重背包

每个物品有**数量限制** s[i]。

### 问题描述

- n 个物品，背包容量 W
- 第 i 个物品：重量 w[i]，价值 v[i]，数量 s[i]
- 求最大价值

### 朴素实现

```cpp
int dp[W + 1] = {0};

for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        for (int k = 1; k <= s[i] && k * w[i] <= j; k++) {
            dp[j] = max(dp[j], dp[j - k * w[i]] + k * v[i]);
        }
    }
}
```

### 二进制优化

将物品拆分成若干份，转化为 0/1 背包：

```cpp
vector<int> weights, values;

for (int i = 1; i <= n; i++) {
    int w, v, s;
    cin >> w >> v >> s;
    
    // 二进制拆分
    for (int k = 1; k <= s; k *= 2) {
        weights.push_back(k * w);
        values.push_back(k * v);
        s -= k;
    }
    if (s > 0) {
        weights.push_back(s * w);
        values.push_back(s * v);
    }
}

// 0/1 背包
int dp[W + 1] = {0};
for (int i = 0; i < weights.size(); i++) {
    for (int j = W; j >= weights[i]; j--) {
        dp[j] = max(dp[j], dp[j - weights[i]] + values[i]);
    }
}
```

## 背包问题变种

### 1. 恰好装满

初始化时，`dp[0] = 0`，其余为 `-INF`：

```cpp
int dp[W + 1];
fill(dp, dp + W + 1, -INF);
dp[0] = 0;

for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
}

if (dp[W] < 0) {
    cout << "无法恰好装满" << endl;
} else {
    cout << dp[W] << endl;
}
```

### 2. 求方案数

```cpp
int dp[W + 1] = {0};
dp[0] = 1;  // 容量为 0 有 1 种方案

for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) {
        dp[j] += dp[j - w[i]];
    }
}

cout << dp[W] << endl;
```

### 3. 输出方案

```cpp
int dp[n + 1][W + 1];
// ... 计算 dp

// 回溯方案
vector<int> selected;
int j = W;
for (int i = n; i >= 1; i--) {
    if (j >= w[i] && dp[i][j] == dp[i - 1][j - w[i]] + v[i]) {
        selected.push_back(i);
        j -= w[i];
    }
}

reverse(selected.begin(), selected.end());
for (int id : selected) {
    cout << id << " ";
}
```

## 三种背包对比

| 类型 | 每个物品 | 循环顺序 | 状态转移 |
|------|---------|---------|---------|
| 0/1 背包 | 最多选 1 次 | 倒序 | `dp[i-1][j-w]` |
| 完全背包 | 无限次 | 正序 | `dp[i][j-w]` |
| 多重背包 | 最多 s 次 | 倒序 | 拆分或枚举 |

## 练习题

1. [洛谷 P1048 采药](https://www.luogu.com.cn/problem/P1048)（0/1 背包）
2. [洛谷 P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616)（完全背包）
3. [洛谷 P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)（多重背包）
4. [LeetCode 416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)

## 总结

- 0/1 背包：每个物品最多选 1 次，倒序遍历
- 完全背包：每个物品无限次，正序遍历
- 多重背包：每个物品最多 s 次，二进制优化
- 恰好装满：初始化 `dp[0] = 0`，其余为 `-INF`
- 求方案数：`dp[j] += dp[j - w[i]]`
