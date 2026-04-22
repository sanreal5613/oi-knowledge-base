# 线性动态规划

<DifficultyBadge level="medium" />

## 什么是线性 DP？

线性 DP 是状态定义在**一维或二维数组**上，状态转移按**线性顺序**进行的动态规划。

## 经典问题

### 1. 最长上升子序列（LIS）

**问题**：求数组中最长的严格上升子序列的长度。

**状态定义**：`dp[i]` = 以 `arr[i]` 结尾的最长上升子序列长度

**状态转移**：
```cpp
dp[i] = max(dp[j] + 1)  // j < i 且 arr[j] < arr[i]
```

**代码**：

```cpp
int lengthOfLIS(vector<int>& arr) {
    int n = arr.size();
    vector<int> dp(n, 1);
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

**二分优化 O(n log n)**：

```cpp
int lengthOfLIS(vector<int>& arr) {
    vector<int> tails;  // tails[i] 表示长度为 i+1 的上升子序列的最小末尾
    
    for (int x : arr) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    
    return tails.size();
}
// 时间复杂度：O(n log n)
```

### 2. 最长公共子序列（LCS）

**问题**：求两个字符串的最长公共子序列长度。

**状态定义**：`dp[i][j]` = `s1[0..i-1]` 和 `s2[0..j-1]` 的 LCS 长度

**状态转移**：
```cpp
if (s1[i-1] == s2[j-1]) {
    dp[i][j] = dp[i-1][j-1] + 1;
} else {
    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
}
```

**代码**：

```cpp
int longestCommonSubsequence(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)，可优化至 O(min(m,n))
```

### 3. 最大子数组和

**问题**：求数组中和最大的连续子数组。

**状态定义**：`dp[i]` = 以 `arr[i]` 结尾的最大子数组和

**状态转移**：
```cpp
dp[i] = max(arr[i], dp[i-1] + arr[i])
```

**代码**：

```cpp
int maxSubArray(vector<int>& arr) {
    int n = arr.size();
    int dp = arr[0];
    int maxSum = arr[0];
    
    for (int i = 1; i < n; i++) {
        dp = max(arr[i], dp + arr[i]);
        maxSum = max(maxSum, dp);
    }
    
    return maxSum;
}
// 空间复杂度：O(1)
```

### 4. 编辑距离

**问题**：求将一个字符串变成另一个字符串的最少操作次数（插入、删除、替换）。

**状态定义**：`dp[i][j]` = `s1[0..i-1]` 变成 `s2[0..j-1]` 的最少操作数

**状态转移**：
```cpp
if (s1[i-1] == s2[j-1]) {
    dp[i][j] = dp[i-1][j-1];
} else {
    dp[i][j] = min({
        dp[i-1][j] + 1,      // 删除
        dp[i][j-1] + 1,      // 插入
        dp[i-1][j-1] + 1     // 替换
    });
}
```

**代码**：

```cpp
int minDistance(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
            }
        }
    }
    
    return dp[m][n];
}
```

### 5. 打家劫舍

**问题**：一排房子，相邻房子不能同时偷，求最大金额。

**状态定义**：`dp[i]` = 前 i 个房子的最大金额

**状态转移**：
```cpp
dp[i] = max(dp[i-1], dp[i-2] + arr[i])
```

**代码**：

```cpp
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    int prev2 = nums[0];
    int prev1 = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; i++) {
        int curr = max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}
```

### 6. 股票买卖

**问题**：给定股票价格，求最大利润（只能买卖一次）。

**状态定义**：`dp[i]` = 前 i 天的最大利润

**代码**：

```cpp
int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}
```

**多次买卖**：

```cpp
int maxProfit(vector<int>& prices) {
    int profit = 0;
    
    for (int i = 1; i < prices.size(); i++) {
        if (prices[i] > prices[i-1]) {
            profit += prices[i] - prices[i-1];
        }
    }
    
    return profit;
}
```

### 7. 爬楼梯（斐波那契）

**问题**：爬 n 级楼梯，每次可以爬 1 级或 2 级，有多少种方法？

**状态定义**：`dp[i]` = 爬到第 i 级的方法数

**状态转移**：
```cpp
dp[i] = dp[i-1] + dp[i-2]
```

**代码**：

```cpp
int climbStairs(int n) {
    if (n <= 2) return n;
    
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    
    return b;
}
```

### 8. 解码方法

**问题**：数字字符串解码成字母，求解码方法数。

**状态定义**：`dp[i]` = 前 i 个字符的解码方法数

**状态转移**：
```cpp
if (s[i-1] != '0') dp[i] += dp[i-1];  // 单独解码
if (i >= 2 && 10 <= stoi(s.substr(i-2, 2)) <= 26) {
    dp[i] += dp[i-2];  // 与前一个组合解码
}
```

**代码**：

```cpp
int numDecodings(string s) {
    int n = s.size();
    if (s[0] == '0') return 0;
    
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        if (s[i-1] != '0') {
            dp[i] += dp[i-1];
        }
        
        int twoDigit = (s[i-2] - '0') * 10 + (s[i-1] - '0');
        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] += dp[i-2];
        }
    }
    
    return dp[n];
}
```

## 线性 DP 技巧

### 1. 滚动数组优化

```cpp
// 原始：dp[i] 依赖 dp[i-1] 和 dp[i-2]
// 优化：只用两个变量
int a = 0, b = 1;
for (int i = 2; i <= n; i++) {
    int c = a + b;
    a = b;
    b = c;
}
```

### 2. 前缀和优化

```cpp
// 如果 dp[i] = sum(dp[j]) for j in [0, i-1]
// 可以用前缀和优化到 O(1)
vector<int> prefix(n + 1);
for (int i = 1; i <= n; i++) {
    dp[i] = prefix[i-1];
    prefix[i] = prefix[i-1] + dp[i];
}
```

## 练习题

1. [洛谷 P1020 导弹拦截](https://www.luogu.com.cn/problem/P1020)（LIS）
2. [洛谷 P1439 【模板】最长公共子序列](https://www.luogu.com.cn/problem/P1439)
3. [LeetCode 300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
4. [LeetCode 1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)
5. [LeetCode 72. 编辑距离](https://leetcode.cn/problems/edit-distance/)
6. [LeetCode 198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

## 总结

- 线性 DP 状态定义在一维或二维数组上
- 状态转移按线性顺序进行
- 常用优化：滚动数组、前缀和
- 经典问题：LIS、LCS、最大子数组和、编辑距离
- 关键是找到正确的状态定义和转移方程
