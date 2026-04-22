# 线段树

<DifficultyBadge level="hard" />

## 什么是线段树？

线段树是一种**区间查询和修改**的数据结构，支持 O(log n) 的区间操作。

<AlgorithmCard 
  title="线段树"
  description="支持区间查询和修改的树形数据结构"
  timeComplexity="O(log n)"
  spaceComplexity="O(n)"
/>

## 基本结构

线段树是一棵**完全二叉树**，每个节点代表一个区间：

```
数组：[1, 3, 5, 7, 9, 11]

线段树：
              [0,5] sum=36
           /              \
      [0,2] sum=9      [3,5] sum=27
      /     \           /      \
  [0,1]  [2,2]    [3,4]     [5,5]
  sum=4   5       sum=16     11
  /   \          /    \
[0,0] [1,1]  [3,3]  [4,4]
  1     3      7      9
```

## 代码实现

### 区间求和

```cpp
#include <iostream>
using namespace std;

const int MAXN = 1e5 + 5;
long long tree[MAXN * 4];
long long lazy[MAXN * 4];  // 懒标记
int arr[MAXN];
int n;

// 建树
void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// 下推懒标记
void pushDown(int node, int start, int end) {
    if (lazy[node] != 0) {
        int mid = (start + end) / 2;
        
        tree[2 * node] += lazy[node] * (mid - start + 1);
        lazy[2 * node] += lazy[node];
        
        tree[2 * node + 1] += lazy[node] * (end - mid);
        lazy[2 * node + 1] += lazy[node];
        
        lazy[node] = 0;
    }
}

// 区间更新（区间加法）
void update(int node, int start, int end, int l, int r, long long val) {
    if (r < start || end < l) return;
    
    if (l <= start && end <= r) {
        tree[node] += val * (end - start + 1);
        lazy[node] += val;
        return;
    }
    
    pushDown(node, start, end);
    
    int mid = (start + end) / 2;
    update(2 * node, start, mid, l, r, val);
    update(2 * node + 1, mid + 1, end, l, r, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// 区间查询
long long query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    
    if (l <= start && end <= r) return tree[node];
    
    pushDown(node, start, end);
    
    int mid = (start + end) / 2;
    return query(2 * node, start, mid, l, r) +
           query(2 * node + 1, mid + 1, end, l, r);
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    
    build(1, 1, n);
    
    int q;
    cin >> q;
    
    while (q--) {
        int op;
        cin >> op;
        
        if (op == 1) {
            int l, r;
            long long val;
            cin >> l >> r >> val;
            update(1, 1, n, l, r, val);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << endl;
        }
    }
    
    return 0;
}
```

### 区间最大值

```cpp
int tree_max[MAXN * 4];

void build(int node, int start, int end) {
    if (start == end) {
        tree_max[node] = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree_max[node] = max(tree_max[2 * node], tree_max[2 * node + 1]);
}

int queryMax(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INT_MIN;
    if (l <= start && end <= r) return tree_max[node];
    
    int mid = (start + end) / 2;
    return max(queryMax(2 * node, start, mid, l, r),
               queryMax(2 * node + 1, mid + 1, end, l, r));
}
```

### 单点修改

```cpp
void updatePoint(int node, int start, int end, int idx, int val) {
    if (start == end) {
        tree[node] = val;
        return;
    }
    
    int mid = (start + end) / 2;
    if (idx <= mid) {
        updatePoint(2 * node, start, mid, idx, val);
    } else {
        updatePoint(2 * node + 1, mid + 1, end, idx, val);
    }
    
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}
```

## 节点编号规律

```
节点 node 的：
- 左子节点：2 * node
- 右子节点：2 * node + 1
- 父节点：node / 2

数组大小：4 * n（保证足够）
```

## 线段树应用

### 1. 区间赋值

```cpp
// 区间赋值（而不是加法）
void updateRange(int node, int start, int end, int l, int r, int val) {
    if (r < start || end < l) return;
    
    if (l <= start && end <= r) {
        tree[node] = val * (end - start + 1);
        lazy[node] = val;
        return;
    }
    
    // 下推时需要区分是加法还是赋值
    pushDown(node, start, end);
    
    int mid = (start + end) / 2;
    updateRange(2 * node, start, mid, l, r, val);
    updateRange(2 * node + 1, mid + 1, end, l, r, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}
```

### 2. 线段树合并

```cpp
int merge(int u, int v, int start, int end) {
    if (!u) return v;
    if (!v) return u;
    if (start == end) {
        tree[u] += tree[v];
        return u;
    }
    int mid = (start + end) / 2;
    tree[u].left = merge(tree[u].left, tree[v].left, start, mid);
    tree[u].right = merge(tree[u].right, tree[v].right, mid + 1, end);
    pushUp(u);
    return u;
}
```

## 动态开点线段树

当值域很大时，使用动态开点：

```cpp
struct Node {
    int left, right;  // 左右子节点编号
    long long sum, lazy;
} tree[MAXN * 40];

int root = 0, cnt = 0;

int newNode() {
    cnt++;
    tree[cnt] = {0, 0, 0, 0};
    return cnt;
}

void update(int& node, int start, int end, int l, int r, long long val) {
    if (!node) node = newNode();
    
    if (l <= start && end <= r) {
        tree[node].sum += val * (end - start + 1);
        tree[node].lazy += val;
        return;
    }
    
    // ...
}
```

## 复杂度分析

| 操作 | 时间复杂度 |
|------|-----------|
| 建树 | O(n) |
| 单点修改 | O(log n) |
| 区间修改 | O(log n) |
| 区间查询 | O(log n) |

## 练习题

1. [洛谷 P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)
2. [洛谷 P3373 【模板】线段树 2](https://www.luogu.com.cn/problem/P3373)
3. [洛谷 P1253 扶苏的问题](https://www.luogu.com.cn/problem/P1253)
4. [LeetCode 307. 区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)

## 总结

- 线段树支持 O(log n) 的区间查询和修改
- 懒标记（lazy）用于延迟更新，提高效率
- 节点编号：左子 2*node，右子 2*node+1
- 数组大小开 4*n
- 应用：区间求和、区间最大值、区间赋值
