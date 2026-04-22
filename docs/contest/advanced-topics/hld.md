# 树链剖分

<DifficultyBadge level="hard" />

## 什么是树链剖分？

树链剖分（Heavy-Light Decomposition, HLD）将树分解为若干条**链**，使得从根到任意节点的路径经过的链数为 O(log n)。

<AlgorithmCard 
  title="树链剖分"
  description="将树分解为链，支持路径查询和修改"
  timeComplexity="O(log²n)"
  spaceComplexity="O(n)"
/>

## 基本概念

### 重儿子

子树大小最大的儿子。

```cpp
// size[u]：以 u 为根的子树大小
// 重儿子：size 最大的儿子
```

### 轻儿子

其他儿子。

### 重链

由重儿子连接形成的链。

### 轻边

连接轻儿子的边。

## 预处理

### 第一次 DFS

求出：
- `parent[u]`：父节点
- `depth[u]`：深度
- `size[u]`：子树大小
- `heavy[u]`：重儿子

```cpp
void dfs1(int u, int p) {
    parent[u] = p;
    depth[u] = depth[p] + 1;
    size[u] = 1;
    heavy[u] = -1;
    
    for (int v : tree[u]) {
        if (v == p) continue;
        
        dfs1(v, u);
        size[u] += size[v];
        
        if (heavy[u] == -1 || size[v] > size[heavy[u]]) {
            heavy[u] = v;
        }
    }
}
```

### 第二次 DFS

求出：
- `top[u]`：u 所在链的顶端
- `dfn[u]`：u 的 DFS 序
- `rnk[u]`：DFS 序为 u 的节点

```cpp
void dfs2(int u, int t) {
    top[u] = t;
    dfn[u] = ++timer;
    rnk[timer] = u;
    
    if (heavy[u] != -1) {
        dfs2(heavy[u], t);  // 重儿子，同一条链
    }
    
    for (int v : tree[u]) {
        if (v == parent[u] || v == heavy[u]) continue;
        dfs2(v, v);  // 轻儿子，新链
    }
}
```

## 路径查询

将路径拆分为若干条链，在链上查询。

```cpp
// 查询 u 到 v 路径上的信息
int queryPath(int u, int v) {
    int res = 0;
    
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        
        // 查询从 top[u] 到 u 的链
        res = merge(res, query(dfn[top[u]], dfn[u]));
        u = parent[top[u]];
    }
    
    // 现在 u 和 v 在同一条链上
    if (depth[u] > depth[v]) swap(u, v);
    res = merge(res, query(dfn[u], dfn[v]));
    
    return res;
}
```

## 路径修改

```cpp
void updatePath(int u, int v, int val) {
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        
        update(dfn[top[u]], dfn[u], val);
        u = parent[top[u]];
    }
    
    if (depth[u] > depth[v]) swap(u, v);
    update(dfn[u], dfn[v], val);
}
```

## 子树查询

子树在 DFS 序上是连续的区间。

```cpp
// 查询以 u 为根的子树
int querySubtree(int u) {
    return query(dfn[u], dfn[u] + size[u] - 1);
}

// 修改以 u 为根的子树
void updateSubtree(int u, int val) {
    update(dfn[u], dfn[u] + size[u] - 1, val);
}
```

## 完整代码

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1e5 + 5;

// 树
vector<int> tree[MAXN];
int parent[MAXN], depth[MAXN], size[MAXN], heavy[MAXN];
int top[MAXN], dfn[MAXN], rnk[MAXN];
int timer = 0;
int n, m, root;

// 线段树
struct SegmentTree {
    int tree[MAXN * 4], lazy[MAXN * 4];
    int n;
    
    void init(int _n) {
        n = _n;
        memset(tree, 0, sizeof(tree));
        memset(lazy, 0, sizeof(lazy));
    }
    
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
    
    void update(int node, int start, int end, int l, int r, int val) {
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
    
    int query(int node, int start, int end, int l, int r) {
        if (l <= start && end <= r) return tree[node];
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        int sum = 0;
        if (l <= mid) sum += query(node * 2, start, mid, l, r);
        if (r > mid) sum += query(node * 2 + 1, mid + 1, end, l, r);
        return sum;
    }
};

SegmentTree seg;

// 树链剖分
void dfs1(int u, int p) {
    parent[u] = p;
    depth[u] = depth[p] + 1;
    size[u] = 1;
    heavy[u] = -1;
    
    for (int v : tree[u]) {
        if (v == p) continue;
        dfs1(v, u);
        size[u] += size[v];
        if (heavy[u] == -1 || size[v] > size[heavy[u]]) {
            heavy[u] = v;
        }
    }
}

void dfs2(int u, int t) {
    top[u] = t;
    dfn[u] = ++timer;
    rnk[timer] = u;
    
    if (heavy[u] != -1) {
        dfs2(heavy[u], t);
    }
    
    for (int v : tree[u]) {
        if (v == parent[u] || v == heavy[u]) continue;
        dfs2(v, v);
    }
}

// 路径修改
void updatePath(int u, int v, int val) {
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        seg.update(1, 1, n, dfn[top[u]], dfn[u], val);
        u = parent[top[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    seg.update(1, 1, n, dfn[u], dfn[v], val);
}

// 路径查询
int queryPath(int u, int v) {
    int res = 0;
    while (top[u] != top[v]) {
        if (depth[top[u]] < depth[top[v]]) swap(u, v);
        res += seg.query(1, 1, n, dfn[top[u]], dfn[u]);
        u = parent[top[u]];
    }
    if (depth[u] > depth[v]) swap(u, v);
    res += seg.query(1, 1, n, dfn[u], dfn[v]);
    return res;
}

// 子树修改
void updateSubtree(int u, int val) {
    seg.update(1, 1, n, dfn[u], dfn[u] + size[u] - 1, val);
}

// 子树查询
int querySubtree(int u) {
    return seg.query(1, 1, n, dfn[u], dfn[u] + size[u] - 1);
}

int main() {
    cin >> n >> m >> root;
    
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }
    
    dfs1(root, 0);
    dfs2(root, root);
    seg.init(n);
    
    while (m--) {
        int op, u, v, val;
        cin >> op;
        
        if (op == 1) {
            cin >> u >> v >> val;
            updatePath(u, v, val);
        } else if (op == 2) {
            cin >> u >> v;
            cout << queryPath(u, v) << endl;
        } else if (op == 3) {
            cin >> u >> val;
            updateSubtree(u, val);
        } else {
            cin >> u;
            cout << querySubtree(u) << endl;
        }
    }
    
    return 0;
}
```

## 复杂度分析

- **预处理**：O(n)
- **路径查询/修改**：O(log²n)（每条链 O(log n)，最多 O(log n) 条链）
- **子树查询/修改**：O(log n)

## 树链剖分 vs LCT

| 特点 | 树链剖分 | LCT |
|------|---------|-----|
| 复杂度 | O(log²n) | O(log n) |
| 代码难度 | 中等 | 难 |
| 支持换根 | 否 | 是 |
| 支持动态树 | 否 | 是 |
| 常数 | 小 | 大 |

## 练习题

1. [洛谷 P3384 【模板】重链剖分/树链剖分](https://www.luogu.com.cn/problem/P3384)
2. [洛谷 P2146 软件包管理器](https://www.luogu.com.cn/problem/P2146)
3. [洛谷 P2590 树的统计](https://www.luogu.com.cn/problem/P2590)
4. [洛谷 P3178 树上染色](https://www.luogu.com.cn/problem/P3178)

## 总结

- 树链剖分将树分解为链
- 重儿子：子树最大的儿子
- 重链：重儿子形成的链
- 路径查询：拆分为 O(log n) 条链
- 子树查询：DFS 序上的区间
- 配合线段树/树状数组使用
- 复杂度：路径 O(log²n)，子树 O(log n)
