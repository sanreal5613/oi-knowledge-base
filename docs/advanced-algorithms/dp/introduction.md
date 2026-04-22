# 动态规划入门

<DifficultyBadge level="medium" />

## 什么是动态规划？

动态规划（Dynamic Programming，DP）是一种通过**把原问题分解为子问题**，并**保存子问题的解**来避免重复计算的算法思想。

### DP 的特征

1. **最优子结构**：问题的最优解包含子问题的最优解
2. **重叠子问题**：子问题会被多次计算
3. **无后效性**：当前状态不受之后状态的影响

## DP vs 递归

### 递归（未优化）

```cpp
// 斐波那契数列（递归）
int fib(int n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);  // 大量重复计算
}
// 时间复杂度：O(2^n)
```

### 记忆化递归

```cpp
int memo[100] = {0};

int fib(int n) {
    if (n <= 2) return 1;
    if (memo[n]) return memo[n];  // 已计算过
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}
// 时间复杂度：O(n)
```

### 动态规划（自底向上）

```cpp
int fib(int n) {
    int dp[n + 1];
    dp[1] = dp[2] = 1;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)
```

### 空间优化

```cpp
int fib(int n) {
    if (n <= 2) return 1;
    
    int a = 1, b = 1;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    
    return b;
}
// 时间复杂度：O(n)
// 空间复杂度：O(1)
```

## DP 解题步骤

1. **定义状态**：`dp[i]` 表示什么？
2. **状态转移方程**：`dp[i]` 如何从之前的状态得到？
3. **初始化**：边界条件是什么？
4. **计算顺序**：从哪里开始计算？
5. **返回结果**：答案在哪里？

## 经典例题

### 例题 1：爬楼梯

**问题**：爬 n 级楼梯，每次可以爬 1 级或 2 级，有多少种爬法？

**分析**：
- 状态定义：`dp[i]` = 爬到第 i 级的方法数
- 状态转移：`dp[i] = dp[i-1] + dp[i-2]`
  - 从第 i-1 级爬 1 级
  - 从第 i-2 级爬 2 级
- 初始化：`dp[1] = 1, dp[2] = 2`

```cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int dp[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}
```

### 例题 2：最大子数组和

**问题**：给定数组，找出和最大的连续子数组。

**分析**：
- 状态定义：`dp[i]` = 以 `arr[i]` 结尾的最大子数组和
- 状态转移：`dp[i] = max(arr[i], dp[i-1] + arr[i])`
  - 要么从 `arr[i]` 重新开始
  - 要么接在前面的子数组后面
- 初始化：`dp[0] = arr[0]`

```cpp
int maxSubArray(int arr[], int n) {
    int dp[n];
    dp[0] = arr[0];
    int maxSum = dp[0];
    
    for (int i = 1; i < n; i++) {
        dp[i] = max(arr[i], dp[i - 1] + arr[i]);
        maxSum = max(maxSum, dp[i]);
    }
    
    return maxSum;
}
```

### 例题 3：最长上升子序列（LIS）

**问题**：找出数组中最长的严格上升子序列的长度。

**分析**：
- 状态定义：`dp[i]` = 以 `arr[i]` 结尾的最长上升子序列长度
- 状态转移：`dp[i] = max(dp[j] + 1)`，其中 `j < i` 且 `arr[j] < arr[i]`
- 初始化：`dp[i] = 1`（每个元素自己构成长度为 1 的序列）

```cpp
int lengthOfLIS(int arr[], int n) {
    int dp[n];
    fill(dp, dp + n, 1);
    int maxLen = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        maxLen = max(maxLen, dp[i]);
    }
    
    return maxLen;
}
// 时间复杂度：O(n²)
```

### 例题 4：零钱兑换

**问题**：给定不同面额的硬币和总金额，求最少需要多少硬币？

**分析**：
- 状态定义：`dp[i]` = 凑成金额 i 所需的最少硬币数
- 状态转移：`dp[i] = min(dp[i - coin] + 1)`，遍历所有硬币
- 初始化：`dp[0] = 0`，其余为无穷大

```cpp
int coinChange(int coins[], int n, int amount) {
    int dp[amount + 1];
    fill(dp, dp + amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (i >= coins[j] && dp[i - coins[j]] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

## DP 的分类

### 1. 线性 DP
- 一维或二维数组
- 状态按顺序计算
- 例：爬楼梯、最大子数组和、LIS

### 2. 背包 DP
- 0/1 背包、完全背包、多重背包
- 例：零钱兑换

### 3. 区间 DP
- 状态定义在区间上
- 例：矩阵链乘法、石子合并

### 4. 树形 DP
- 状态定义在树的节点上
- 例：树的直径、树的重心

### 5. 状态压缩 DP
- 用二进制表示状态
- 例：旅行商问题（TSP）

## 常见优化

### 1. 滚动数组

```cpp
// 原始：dp[i][j] = dp[i-1][j] + dp[i][j-1]
// 优化：只保留两行
int dp[2][n];
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        dp[i & 1][j] = dp[(i - 1) & 1][j] + dp[i & 1][j - 1];
    }
}
```

### 2. 一维数组

```cpp
// 如果只依赖前一个状态，可以用一维数组
int dp[n];
for (int i = 0; i < m; i++) {
    for (int j = n - 1; j >= 0; j--) {  // 倒序遍历
        dp[j] = max(dp[j], dp[j - 1] + val);
    }
}
```

## 练习题

### 入门题
1. [洛谷 P1216 数字三角形](https://www.luogu.com.cn/problem/P1216)
2. [洛谷 P1048 采药](https://www.luogu.com.cn/problem/P1048)
3. [LeetCode 70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

### 进阶题
4. [洛谷 P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)
5. [LeetCode 300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
6. [LeetCode 322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

## 总结

- DP = 递归 + 记忆化
- 关键是定义状态和找出状态转移方程
- 自底向上计算，避免重复
- 注意初始化和边界条件
- 可以用滚动数组优化空间
- 多做题，培养 DP 思维
