# 省选题解

<DifficultyBadge level="hard" />

## 简介

本章节收录省选难度的经典题目，涉及高级算法和数据结构。

## 题目列表

### 1. 动态规划专题

#### 1.1 树形 DP - 没有上司的舞会

**题目**：每个员工有快乐值，不能同时选员工和上司，求最大快乐值。

**代码**：

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 6005;

vector<int> tree[MAXN];
int happy[MAXN];
int dp[MAXN][2];
int n;

void dfs(int u) {
    dp[u][0] = 0;
    dp[u][1] = happy[u];
    
    for (int v : tree[u]) {
        dfs(v);
        dp[u][0] += max(dp[v][0], dp[v][1]);
        dp[u][1] += dp[v][0];
    }
}

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        cin >> happy[i];
    }
    
    vector<bool> hasParent(n + 1, false);
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[v].push_back(u);
        hasParent[u] = true;
    }
    
    int root = 1;
    while (hasParent[root]) root++;
    
    dfs(root);
    
    cout << max(dp[root][0], dp[root][1]) << endl;
    
    return 0;
}
```

#### 1.2 状压 DP - 旅行商问题

**题目**：经过所有城市恰好一次，回到起点，求最短路径。

**代码**：

```cpp
#include <iostream>
#include <cstring>
using namespace std;

const int INF = 0x3f3f3f3f;
int dist[20][20];
int dp[1 << 20][20];
int n;

int main() {
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }
    
    memset(dp, INF, sizeof(dp));
    dp[1][0] = 0;
    
    for (int state = 1; state < (1 << n); state++) {
        for (int i = 0; i < n; i++) {
            if (!(state >> i & 1)) continue;
            if (dp[state][i] == INF) continue;
            
            for (int j = 0; j < n; j++) {
                if (state >> j & 1) continue;
                int newState = state | (1 << j);
                dp[newState][j] = min(dp[newState][j], dp[state][i] + dist[i][j]);
            }
        }
    }
    
    int ans = INF;
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    }
    
    cout << ans << endl;
    
    return 0;
}
```

### 2. 数据结构专题

#### 2.1 线段树区间修改

**题目**：支持区间加法和区间求和。

**代码**：

```cpp
#include <iostream>
#include <cstring>
using namespace std;

typedef long long ll;

const int MAXN = 1e5 + 5;

ll tree[MAXN * 4];
ll lazy[MAXN * 4];
int n, m;

void pushDown(int node, int start, int end) {
    if (lazy[node]) {
        int mid = (start + end) / 2;
        tree[node * 2] += lazy[node] * (mid - start + 1);
        lazy[node * 2] += lazy[node];
        tree[node * 2 + 1] += lazy[node] * (end - mid);
        lazy[node * 2 + 1] += lazy[node];
        lazy[node] = 0;
    }
}

void update(int node, int start, int end, int l, int r, ll val) {
    if (l <= start && end <= r) {
        tree[node] += val * (end - start + 1);
        lazy[node] += val;
        return;
    }
    pushDown(node, start, end);
    int mid = (start + end) / 2;
    if (l <= mid) update(node * 2, start, mid, l, r, val);
    if (r > mid) update(node * 2 + 1, mid + 1, end, l, r, val);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

ll query(int node, int start, int end, int l, int r) {
    if (l <= start && end <= r) return tree[node];
    pushDown(node, start, end);
    int mid = (start + end) / 2;
    ll sum = 0;
    if (l <= mid) sum += query(node * 2, start, mid, l, r);
    if (r > mid) sum += query(node * 2 + 1, mid + 1, end, l, r);
    return sum;
}

int main() {
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        ll x;
        cin >> x;
        update(1, 1, n, i, i, x);
    }
    
    while (m--) {
        int op, l, r;
        ll val;
        cin >> op;
        
        if (op == 1) {
            cin >> l >> r >> val;
            update(1, 1, n, l, r, val);
        } else {
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        }
    }
    
    return 0;
}
```

#### 2.2 树链剖分

**题目**：支持树上路径修改和查询。

见 [树链剖分](/contest/advanced-topics/hld)

### 3. 图论专题

#### 3.1 网络流

**题目**：求网络最大流。

见 [网络流](/contest/advanced-topics/network-flow)

#### 3.2 最短路

**题目**：求单源最短路。

见 [最短路](/advanced-algorithms/graph/shortest-path)

### 4. 字符串专题

#### 4.1 KMP

**题目**：字符串匹配。

见 [KMP](/advanced-algorithms/string/kmp)

### 5. 数学专题

#### 5.1 逆元

**题目**：求模意义下的逆元。

见 [逆元](/mathematics/number-theory/inverse)

## 更多题目

- [洛谷 P3385 【模板】负环](https://www.luogu.com.cn/problem/P3385)
- [洛谷 P3386 【模板】二分图匹配](https://www.luogu.com.cn/problem/P3386)
- [洛谷 P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376)
- [洛谷 P3377 【模板】堆](https://www.luogu.com.cn/problem/P3377)
- [洛谷 P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

## 总结

省选题解涉及：
- 高级动态规划（树形 DP、状压 DP）
- 高级数据结构（线段树、树链剖分）
- 图论算法（网络流、最短路）
- 字符串算法（KMP）
- 数学算法（逆元、快速幂）

需要扎实的基础和丰富的竞赛经验。
