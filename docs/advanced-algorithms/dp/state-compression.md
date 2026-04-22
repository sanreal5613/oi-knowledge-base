# 状态压缩动态规划

<DifficultyBadge level="hard" />

## 什么是状态压缩 DP？

状态压缩 DP 是用**二进制数**表示状态的动态规划，适用于状态数较少的情况（通常 n ≤ 20）。

```
用二进制表示集合：
{0, 2, 3} → 二进制 1101 → 十进制 13

第 i 位为 1 表示选中第 i 个元素
```

## 位运算基础

```cpp
// 判断第 i 位是否为 1
if (state >> i & 1)

// 设置第 i 位为 1
state |= (1 << i)

// 设置第 i 位为 0
state &= ~(1 << i)

// 切换第 i 位
state ^= (1 << i)

// 获取最低位的 1
lowbit = state & (-state)

// 枚举子集
for (int sub = state; sub; sub = (sub - 1) & state)
```

## 经典问题

### 1. 旅行商问题（TSP）

**问题**：从起点出发，经过所有城市恰好一次，回到起点，求最短路径。

**状态定义**：
- `dp[state][i]` = 已经访问的城市集合为 state，当前在城市 i 的最短距离

**状态转移**：
```cpp
dp[state][i] = min(dp[state ^ (1 << i)][j] + dist[j][i])
// j 是上一个城市，且 j 在 state 中
```

**代码**：

```cpp
#include <iostream>
#include <cstring>
using namespace std;

const int INF = 0x3f3f3f3f;
int dist[20][20];
int dp[1 << 20][20];
int n;

int tsp() {
    memset(dp, INF, sizeof(dp));
    dp[1][0] = 0;  // 从城市 0 出发
    
    for (int state = 1; state < (1 << n); state++) {
        for (int i = 0; i < n; i++) {
            if (!(state >> i & 1)) continue;  // i 不在 state 中
            
            for (int j = 0; j < n; j++) {
                if (i == j) continue;
                if (!(state >> j & 1)) continue;  // j 不在 state 中
                
                dp[state][i] = min(dp[state][i], 
                    dp[state ^ (1 << i)][j] + dist[j][i]);
            }
        }
    }
    
    int ans = INF;
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    }
    
    return ans;
}

int main() {
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }
    
    cout << tsp() << endl;
    
    return 0;
}
// 时间复杂度：O(n² × 2ⁿ)
```

### 2. 铺砖问题

**问题**：用 1×2 的砖块铺满 n×m 的棋盘，求方案数。

**状态定义**：
- `dp[i][state]` = 铺到第 i 行，第 i 行的状态为 state 的方案数

**代码**：

```cpp
const int MOD = 1e9 + 7;
long long dp[2][1 << 11];

int main() {
    int n, m;
    cin >> n >> m;
    
    dp[0][0] = 1;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            memset(dp[(i * m + j + 1) & 1], 0, sizeof(dp[0]));
            
            for (int state = 0; state < (1 << m); state++) {
                if (!dp[(i * m + j) & 1][state]) continue;
                
                // 不铺砖（这个位置已经被上一行覆盖了）
                if (state >> j & 1) {
                    dp[(i * m + j + 1) & 1][state ^ (1 << j)] += 
                        dp[(i * m + j) & 1][state];
                }
                
                // 竖着铺砖
                if (!(state >> j & 1)) {
                    dp[(i * m + j + 1) & 1][state | (1 << j)] += 
                        dp[(i * m + j) & 1][state];
                }
                
                // 横着铺砖
                if (j + 1 < m && !(state >> j & 1) && !(state >> (j + 1) & 1)) {
                    dp[(i * m + j + 1) & 1][state] += 
                        dp[(i * m + j) & 1][state];
                }
            }
        }
    }
    
    cout << dp[(n * m) & 1][0] << endl;
    
    return 0;
}
```

### 3. 子集 DP

**问题**：给定 n 个物品，每个物品有属性，选择一些物品使得满足某种条件。

**枚举子集**：

```cpp
// 枚举 state 的所有子集
for (int sub = state; sub; sub = (sub - 1) & state) {
    // sub 是 state 的一个非空子集
}

// 包括空集
for (int sub = state; ; sub = (sub - 1) & state) {
    // 处理 sub
    if (sub == 0) break;
}
```

### 4. 集合覆盖

**问题**：用最少的集合覆盖所有元素。

**状态定义**：
- `dp[state]` = 覆盖状态 state 所需的最少集合数

**代码**：

```cpp
int dp[1 << 20];

int setCover(vector<int>& sets, int n) {
    int m = sets.size();
    
    memset(dp, INF, sizeof(dp));
    dp[0] = 0;
    
    for (int state = 0; state < (1 << n); state++) {
        if (dp[state] == INF) continue;
        
        for (int s : sets) {
            int newState = state | s;
            dp[newState] = min(dp[newState], dp[state] + 1);
        }
    }
    
    return dp[(1 << n) - 1];
}
```

### 5. 分配问题

**问题**：n 个人分配 n 个工作，每个人做不同工作的收益不同，求最大总收益。

**状态定义**：
- `dp[state]` = 已经分配的人集合为 state 时的最大收益

**代码**：

```cpp
int profit[20][20];
int dp[1 << 20];

int assign(int n) {
    memset(dp, 0, sizeof(dp));
    
    for (int state = 0; state < (1 << n); state++) {
        int i = __builtin_popcount(state);  // 已经分配了 i 个人
        if (i >= n) continue;
        
        for (int j = 0; j < n; j++) {
            if (!(state >> j & 1)) {
                int newState = state | (1 << j);
                dp[newState] = max(dp[newState], dp[state] + profit[i][j]);
            }
        }
    }
    
    return dp[(1 << n) - 1];
}
```

### 6. 哈密顿路径

**问题**：经过每个顶点恰好一次的路径。

**代码**：

```cpp
bool dp[1 << 20][20];

bool hamiltonianPath(int n, vector<pair<int, int>>& edges) {
    vector<vector<int>> graph(n);
    for (auto [u, v] : edges) {
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    
    for (int i = 0; i < n; i++) {
        dp[1 << i][i] = true;
    }
    
    for (int state = 1; state < (1 << n); state++) {
        for (int u = 0; u < n; u++) {
            if (!dp[state][u]) continue;
            
            for (int v : graph[u]) {
                if (state >> v & 1) continue;
                dp[state | (1 << v)][v] = true;
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (dp[(1 << n) - 1][i]) return true;
    }
    return false;
}
```

## 状态压缩技巧

### 1. 预处理

```cpp
// 预处理每个状态的 popcount（1 的个数）
int popcount[1 << 20];
for (int state = 1; state < (1 << n); state++) {
    popcount[state] = popcount[state >> 1] + (state & 1);
}

// 或使用内置函数
int cnt = __builtin_popcount(state);      // int
int cnt = __builtin_popcountll(state);    // long long
```

### 2. 枚举子集优化

```cpp
// 只枚举特定大小的子集
for (int state = 0; state < (1 << n); state++) {
    if (__builtin_popcount(state) != k) continue;
    // 处理大小为 k 的子集
}
```

### 3. 滚动数组

```cpp
// 如果 dp[i] 只依赖 dp[i-1]
int dp[2][1 << 20];

for (int i = 1; i <= n; i++) {
    for (int state = 0; state < (1 << m); state++) {
        dp[i & 1][state] = ...;  // 使用 dp[(i-1) & 1]
    }
}
```

## 复杂度分析

- **时间复杂度**：O(n × 2ⁿ) 或 O(n² × 2ⁿ)
- **空间复杂度**：O(2ⁿ)
- **适用范围**：n ≤ 20（2²⁰ ≈ 10⁶）

## 练习题

1. [洛谷 P1433 吃奶酪](https://www.luogu.com.cn/problem/P1433)（TSP）
2. [洛谷 P1896 互不侵犯](https://www.luogu.com.cn/problem/P1896)（状压 DP）
3. [洛谷 P2704 炮兵阵地](https://www.luogu.com.cn/problem/P2704)
4. [LeetCode 698. 划分为k个相等的子集](https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/)
5. [LeetCode 526. 优美的排列](https://leetcode.cn/problems/beautiful-arrangement/)

## 总结

- 状态压缩用二进制表示集合
- 适用于 n ≤ 20 的问题
- 关键是找到合适的状态表示
- 常用位运算：&、|、^、<<、>>
- 经典问题：TSP、铺砖、子集 DP
