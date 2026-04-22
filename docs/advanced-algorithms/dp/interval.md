# 区间动态规划

<DifficultyBadge level="hard" />

## 什么是区间 DP？

区间 DP 是状态定义在**区间**上的动态规划，通常用于解决与区间相关的问题。

## 基本框架

```cpp
// dp[i][j] 表示区间 [i, j] 的答案
for (int len = 1; len <= n; len++) {        // 枚举区间长度
    for (int i = 0; i + len - 1 < n; i++) { // 枚举左端点
        int j = i + len - 1;                 // 右端点
        
        // 初始化
        dp[i][j] = ...;
        
        // 枚举分割点
        for (int k = i; k < j; k++) {
            dp[i][j] = max/min(dp[i][j], dp[i][k] + dp[k+1][j] + cost);
        }
    }
}
```

## 经典问题

### 1. 石子合并

**问题**：n 堆石子排成一排，每次合并相邻两堆，代价为两堆石子数之和，求最小总代价。

**状态定义**：`dp[i][j]` = 合并区间 [i, j] 的最小代价

**状态转移**：
```cpp
dp[i][j] = min(dp[i][k] + dp[k+1][j] + sum[i][j])  // i <= k < j
```

**代码**：

```cpp
#include <iostream>
#include <cstring>
using namespace std;

const int INF = 0x3f3f3f3f;

int main() {
    int n;
    cin >> n;
    
    int arr[305];
    int sum[305] = {0};
    
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
        sum[i] = sum[i-1] + arr[i];
    }
    
    int dp[305][305];
    memset(dp, INF, sizeof(dp));
    
    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
    }
    
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], 
                    dp[i][k] + dp[k+1][j] + sum[j] - sum[i-1]);
            }
        }
    }
    
    cout << dp[1][n] << endl;
    
    return 0;
}
```

### 2. 矩阵链乘法

**问题**：给定 n 个矩阵的维度，求最优乘法顺序，使得乘法次数最少。

**状态定义**：`dp[i][j]` = 计算矩阵 i 到 j 的最小乘法次数

**状态转移**：
```cpp
dp[i][j] = min(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])
```

**代码**：

```cpp
int matrixChain(vector<int>& p) {
    int n = p.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            dp[i][j] = INF;
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j], 
                    dp[i][k] + dp[k+1][j] + p[i] * p[k+1] * p[j+1]);
            }
        }
    }
    
    return dp[0][n-1];
}
```

### 3. 括号匹配

**问题**：给定括号序列，求最长合法括号子序列长度。

**状态定义**：`dp[i][j]` = 区间 [i, j] 的最长合法括号子序列长度

**状态转移**：
```cpp
if (s[i] == '(' && s[j] == ')') {
    dp[i][j] = dp[i+1][j-1] + 2;
}
dp[i][j] = max(dp[i][j], dp[i][k] + dp[k+1][j]);
```

**代码**：

```cpp
int longestValidParentheses(string s) {
    int n = s.size();
    vector<vector<int>> dp(n, vector<int>(n, 0));
    
    for (int len = 2; len <= n; len += 2) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            
            if (s[i] == '(' && s[j] == ')') {
                dp[i][j] = dp[i+1][j-1] + 2;
            }
            
            for (int k = i; k < j; k++) {
                dp[i][j] = max(dp[i][j], dp[i][k] + dp[k+1][j]);
            }
        }
    }
    
    return dp[0][n-1];
}
```

### 4. 回文串分割

**问题**：将字符串分割成最少数量的回文子串。

**状态定义**：`dp[i]` = 前缀 [0, i] 的最少回文分割数

**预处理**：`isPal[i][j]` = 区间 [i, j] 是否为回文

**代码**：

```cpp
int minCut(string s) {
    int n = s.size();
    
    // 预处理回文
    vector<vector<bool>> isPal(n, vector<bool>(n, false));
    for (int i = n - 1; i >= 0; i--) {
        for (int j = i; j < n; j++) {
            if (s[i] == s[j] && (j - i <= 2 || isPal[i+1][j-1])) {
                isPal[i][j] = true;
            }
        }
    }
    
    // dp
    vector<int> dp(n, n);
    for (int i = 0; i < n; i++) {
        if (isPal[0][i]) {
            dp[i] = 0;
        } else {
            for (int j = 0; j < i; j++) {
                if (isPal[j+1][i]) {
                    dp[i] = min(dp[i], dp[j] + 1);
                }
            }
        }
    }
    
    return dp[n-1];
}
```

### 5. 戳气球

**问题**：有 n 个气球，戳破第 i 个获得 nums[i-1]*nums[i]*nums[i+1] 硬币，求最大硬币数。

**状态定义**：`dp[i][j]` = 戳破区间 (i, j) 内所有气球的最大硬币数

**状态转移**：
```cpp
dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j])  // i < k < j
```

**代码**：

```cpp
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
    
    for (int len = 1; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            for (int k = i; k <= j; k++) {
                dp[i][j] = max(dp[i][j], 
                    dp[i][k-1] + dp[k+1][j] + nums[i-1] * nums[k] * nums[j+1]);
            }
        }
    }
    
    return dp[1][n];
}
```

### 6. 移除盒子

**问题**：移除连续相同颜色的盒子，获得 k*k 分，求最大得分。

**状态定义**：`dp[i][j][k]` = 区间 [i, j] 且右边有 k 个与 box[j] 相同颜色的盒子的最大得分

**代码**：

```cpp
int dp[105][105][105];

int removeBoxes(vector<int>& boxes) {
    int n = boxes.size();
    memset(dp, 0, sizeof(dp));
    
    function<int(int, int, int)> dfs = [&](int i, int j, int k) -> int {
        if (i > j) return 0;
        if (dp[i][j][k]) return dp[i][j][k];
        
        // 直接移除 box[j]
        int res = dfs(i, j - 1, 0) + (k + 1) * (k + 1);
        
        // 尝试与前面相同的合并
        for (int m = i; m < j; m++) {
            if (boxes[m] == boxes[j]) {
                res = max(res, dfs(i, m, k + 1) + dfs(m + 1, j - 1, 0));
            }
        }
        
        return dp[i][j][k] = res;
    };
    
    return dfs(0, n - 1, 0);
}
```

## 区间 DP 技巧

### 1. 枚举顺序

```cpp
// 按区间长度从小到大枚举
for (int len = 1; len <= n; len++) {
    for (int i = 0; i + len - 1 < n; i++) {
        int j = i + len - 1;
        // 计算 dp[i][j]
    }
}
```

### 2. 预处理

```cpp
// 预处理前缀和
for (int i = 1; i <= n; i++) {
    sum[i] = sum[i-1] + arr[i];
}

// 预处理回文
for (int i = n - 1; i >= 0; i--) {
    for (int j = i; j < n; j++) {
        isPal[i][j] = (s[i] == s[j]) && (j - i <= 2 || isPal[i+1][j-1]);
    }
}
```

### 3. 空间优化

```cpp
// 如果只需要 dp[i][j] 和 dp[i][k], dp[k+1][j]
// 无法滚动数组优化，因为依赖关系复杂
// 但可以用短边优先，减少空间
```

## 练习题

1. [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)
2. [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
3. [LeetCode 312. 戳气球](https://leetcode.cn/problems/burst-balloons/)
4. [LeetCode 546. 移除盒子](https://leetcode.cn/problems/remove-boxes/)
5. [LeetCode 132. 分割回文串 II](https://leetcode.cn/problems/palindrome-partitioning-ii/)

## 总结

- 区间 DP 状态定义在区间 [i, j] 上
- 关键是找到合适的分割点
- 枚举顺序：按区间长度从小到大
- 可以预处理一些信息优化
- 时间复杂度通常是 O(n³)
- 应用：石子合并、矩阵链乘法、括号匹配等
