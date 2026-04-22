# 树形动态规划

<DifficultyBadge level="hard" />

## 什么是树形 DP？

树形 DP 是状态定义在**树的节点**上的动态规划，通常通过**DFS**遍历树进行状态转移。

## 基本框架

```cpp
void dfs(int u, int parent) {
    // 初始化 dp[u]
    dp[u] = ...;
    
    for (int v : tree[u]) {
        if (v == parent) continue;  // 避免回到父节点
        
        dfs(v, u);  // 递归处理子树
        
        // 状态转移：将子树的结果合并到 u
        dp[u] = merge(dp[u], dp[v]);
    }
}
```

## 经典问题

### 1. 树的最大独立集

**问题**：选最多的节点，使得任意两个节点不相邻。

**状态定义**：
- `dp[u][0]` = 不选 u 时，以 u 为根的子树的最大独立集
- `dp[u][1]` = 选 u 时，以 u 为根的子树的最大独立集

**状态转移**：
```cpp
dp[u][0] = sum(max(dp[v][0], dp[v][1]))  // 不选 u，子节点可选可不选
dp[u][1] = 1 + sum(dp[v][0])              // 选 u，子节点不能选
```

**代码**：

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1e5 + 5;
vector<int> tree[MAXN];
int dp[MAXN][2];

void dfs(int u, int parent) {
    dp[u][0] = 0;
    dp[u][1] = 1;  // 选 u
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        
        dfs(v, u);
        
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}

int main() {
    int n;
    cin >> n;
    
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    dfs(1, 0);
    
    cout << max(dp[1][0], dp[1][1]) << endl;
    
    return 0;
}
```

### 2. 树的重心

**问题**：删除一个节点后，最大的连通块最小，求这个节点。

**状态定义**：
- `dp[u]` = 删除 u 后，u 的子树中最大连通块的大小
- `size[u]` = 以 u 为根的子树大小

**代码**：

```cpp
const int MAXN = 1e5 + 5;
vector<int> tree[MAXN];
int size[MAXN];
int dp[MAXN];
int n;
int minMax = INF;
int centroid = -1;

void dfs(int u, int parent) {
    size[u] = 1;
    int maxPart = 0;
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        
        dfs(v, u);
        
        size[u] += size[v];
        maxPart = max(maxPart, size[v]);
    }
    
    // 父节点方向的连通块
    maxPart = max(maxPart, n - size[u]);
    
    if (maxPart < minMax) {
        minMax = maxPart;
        centroid = u;
    }
}
```

### 3. 树的直径

**问题**：树中最长路径的长度。

**方法1：两次 DFS**

```cpp
int maxDist = 0;
int farNode = 0;

void dfs(int u, int parent, int dist) {
    if (dist > maxDist) {
        maxDist = dist;
        farNode = u;
    }
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs(v, u, dist + 1);
    }
}

int treeDiameter() {
    maxDist = 0;
    dfs(1, 0, 0);  // 找最远点
    
    int start = farNode;
    maxDist = 0;
    dfs(start, 0, 0);  // 从最远点再找最远点
    
    return maxDist;
}
```

**方法2：树形 DP**

```cpp
int diameter = 0;

int dfs(int u, int parent) {
    int max1 = 0, max2 = 0;  // 最长和次长路径
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        
        int d = dfs(v, u) + 1;
        
        if (d > max1) {
            max2 = max1;
            max1 = d;
        } else if (d > max2) {
            max2 = d;
        }
    }
    
    diameter = max(diameter, max1 + max2);
    return max1;
}
```

### 4. 没有上司的舞会

**问题**：每个员工有快乐值，不能同时选员工和上司，求最大快乐值。

**状态定义**：
- `dp[u][0]` = 不选 u 的最大快乐值
- `dp[u][1]` = 选 u 的最大快乐值

**代码**：

```cpp
int happy[MAXN];
int dp[MAXN][2];

void dfs(int u) {
    dp[u][0] = 0;
    dp[u][1] = happy[u];
    
    for (int v : tree[u]) {
        dfs(v);
        
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}
```

### 5. 树的最小点覆盖

**问题**：选最少的点，使得每条边至少有一个端点被选中。

**状态定义**：
- `dp[u][0]` = 不选 u，覆盖以 u 为根的子树的最少点数
- `dp[u][1]` = 选 u，覆盖以 u 为根的子树的最少点数

**状态转移**：
```cpp
dp[u][0] = sum(dp[v][1])  // 不选 u，子节点必须选
dp[u][1] = 1 + sum(min(dp[v][0], dp[v][1]))  // 选 u，子节点可选可不选
```

### 6. 树的染色

**问题**：给树染色，相邻节点颜色不同，求最少颜色数或方案数。

**状态定义**：
- `dp[u][c]` = u 染颜色 c 时，子树的方案数

**代码**：

```cpp
const int MOD = 1e9 + 7;
int dp[MAXN][3];  // 3种颜色

void dfs(int u, int parent) {
    for (int c = 0; c < 3; c++) {
        dp[u][c] = 1;
    }
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        
        dfs(v, u);
        
        for (int c = 0; c < 3; c++) {
            long long sum = 0;
            for (int nc = 0; nc < 3; nc++) {
                if (nc != c) {
                    sum += dp[v][nc];
                }
            }
            dp[u][c] = dp[u][c] * sum % MOD;
        }
    }
}
```

### 7. 树的背包

**问题**：每个节点有重量和价值，选节点使得总重量不超过 W，且选了子节点必须选父节点。

**状态定义**：
- `dp[u][j]` = 以 u 为根的子树，总重量为 j 时的最大价值

**代码**：

```cpp
int weight[MAXN], value[MAXN];
int dp[MAXN][105];  // 背包容量

void dfs(int u, int parent) {
    // 初始化：只选 u
    for (int j = weight[u]; j <= W; j++) {
        dp[u][j] = value[u];
    }
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        
        dfs(v, u);
        
        // 背包合并
        for (int j = W; j >= weight[u]; j--) {
            for (int k = 0; k <= j - weight[u]; k++) {
                dp[u][j] = max(dp[u][j], dp[u][j - k] + dp[v][k]);
            }
        }
    }
}
```

## 树形 DP 技巧

### 1. 换根 DP

当需要以每个节点为根计算答案时：

```cpp
void dfs1(int u, int parent) {
    // 第一次 DFS，计算子树信息
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs1(v, u);
        // 合并子树信息
    }
}

void dfs2(int u, int parent) {
    // 第二次 DFS，利用父节点信息
    for (int v : tree[u]) {
        if (v == parent) continue;
        // 将 u 的信息传递给 v
        dfs2(v, u);
    }
}
```

### 2. 虚树

当只需要处理部分节点时，构建虚树优化：

```cpp
// 按 DFS 序排序
sort(nodes.begin(), nodes.end(), [](int a, int b) {
    return dfn[a] < dfn[b];
});

// 用栈构建虚树
stack<int> st;
st.push(nodes[0]);

for (int i = 1; i < nodes.size(); i++) {
    int lca = getLCA(st.top(), nodes[i]);
    
    while (st.size() > 1 && dfn[st.top()] > dfn[lca]) {
        // 连接边
        st.pop();
    }
    
    if (st.top() != lca) {
        // 添加 lca
        st.push(lca);
    }
    
    st.push(nodes[i]);
}
```

## 练习题

1. [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
2. [洛谷 P2014 选课](https://www.luogu.com.cn/problem/P2014)（树形背包）
3. [洛谷 P2015 二叉苹果树](https://www.luogu.com.cn/problem/P2015)
4. [LeetCode 337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)
5. [LeetCode 124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

## 总结

- 树形 DP 状态定义在树的节点上
- 通常用 DFS 遍历树
- 常见模型：选/不选、最大/最小、计数
- 技巧：换根 DP、虚树优化
- 关键是找到合适的状态定义
