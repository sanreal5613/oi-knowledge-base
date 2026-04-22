# 树状数组

<DifficultyBadge level="medium" />

## 什么是树状数组？

树状数组（Binary Indexed Tree / Fenwick Tree）是一种支持**单点修改**和**前缀查询**的数据结构，代码简洁，常数小。

<AlgorithmCard 
  title="树状数组"
  description="支持单点修改和前缀查询的简洁数据结构"
  timeComplexity="O(log n)"
  spaceComplexity="O(n)"
/>

## 基本原理

树状数组利用**二进制**特性，每个节点管理一段区间：

```
数组下标：1  2  3  4  5  6  7  8
树状数组：
  1: [1,1]      (二进制末尾1个0)
  2: [1,2]      (二进制末尾1个0)
  3: [3,3]      (二进制末尾0个0)
  4: [1,4]      (二进制末尾2个0)
  5: [5,5]
  6: [5,6]
  7: [7,7]
  8: [1,8]

lowbit(x) = x & (-x) = x 的最低位的1所代表的值
```

## 核心操作

### lowbit

```cpp
int lowbit(int x) {
    return x & (-x);
}

// lowbit(6) = lowbit(110) = 2
// lowbit(8) = lowbit(1000) = 8
```

### 单点修改

```cpp
// 在位置 pos 加上 val
void update(int pos, int val) {
    for (int i = pos; i <= n; i += lowbit(i)) {
        tree[i] += val;
    }
}
```

### 前缀查询

```cpp
// 查询 [1, pos] 的和
int query(int pos) {
    int sum = 0;
    for (int i = pos; i > 0; i -= lowbit(i)) {
        sum += tree[i];
    }
    return sum;
}

// 查询 [l, r] 的和
int queryRange(int l, int r) {
    return query(r) - query(l - 1);
}
```

## 完整代码

### 区间求和

```cpp
#include <iostream>
using namespace std;

const int MAXN = 1e5 + 5;
int tree[MAXN];
int n;

int lowbit(int x) {
    return x & (-x);
}

void update(int pos, int val) {
    for (int i = pos; i <= n; i += lowbit(i)) {
        tree[i] += val;
    }
}

int query(int pos) {
    int sum = 0;
    for (int i = pos; i > 0; i -= lowbit(i)) {
        sum += tree[i];
    }
    return sum;
}

int queryRange(int l, int r) {
    return query(r) - query(l - 1);
}

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        update(i, x);
    }
    
    int q;
    cin >> q;
    
    while (q--) {
        int op;
        cin >> op;
        
        if (op == 1) {
            int pos, val;
            cin >> pos >> val;
            update(pos, val);
        } else {
            int l, r;
            cin >> l >> r;
            cout << queryRange(l, r) << endl;
        }
    }
    
    return 0;
}
```

### 区间最大值

```cpp
int tree_max[MAXN];

void updateMax(int pos, int val) {
    for (int i = pos; i <= n; i += lowbit(i)) {
        tree_max[i] = max(tree_max[i], val);
    }
}

int queryMax(int pos) {
    int res = 0;
    for (int i = pos; i > 0; i -= lowbit(i)) {
        res = max(res, tree_max[i]);
    }
    return res;
}
```

::: warning 注意
树状数组的区间最大值只能查询前缀最大值，不能支持区间最大值查询！
:::

## 区间修改，单点查询

使用**差分**思想：

```cpp
// 区间 [l, r] 加 val
void rangeUpdate(int l, int r, int val) {
    update(l, val);
    update(r + 1, -val);
}

// 单点查询
int pointQuery(int pos) {
    return query(pos);
}
```

## 区间修改，区间查询

需要维护两个树状数组：

```cpp
long long tree1[MAXN], tree2[MAXN];

void update(int pos, long long val) {
    for (int i = pos; i <= n; i += lowbit(i)) {
        tree1[i] += val;
        tree2[i] += pos * val;
    }
}

void rangeUpdate(int l, int r, long long val) {
    update(l, val);
    update(r + 1, -val);
}

long long query(int pos) {
    long long res = 0;
    for (int i = pos; i > 0; i -= lowbit(i)) {
        res += (pos + 1) * tree1[i] - tree2[i];
    }
    return res;
}

long long rangeQuery(int l, int r) {
    return query(r) - query(l - 1);
}
```

## 树状数组 vs 线段树

| 特点 | 树状数组 | 线段树 |
|------|---------|--------|
| 代码量 | 少 | 多 |
| 常数 | 小 | 大 |
| 单点修改+前缀查询 | ✅ | ✅ |
| 区间修改+区间查询 | 需维护两个 | ✅ |
| 区间最大值 | ❌ | ✅ |
| 区间赋值 | ❌ | ✅ |

## 应用

### 1. 逆序对

```cpp
int countInversions(vector<int>& arr) {
    // 离散化
    vector<int> sorted = arr;
    sort(sorted.begin(), sorted.end());
    sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
    
    int n = sorted.size();
    fill(tree, tree + n + 1, 0);
    
    long long count = 0;
    for (int i = arr.size() - 1; i >= 0; i--) {
        int rank = lower_bound(sorted.begin(), sorted.end(), arr[i]) - sorted.begin() + 1;
        count += query(rank - 1);
        update(rank, 1);
    }
    
    return count;
}
```

### 2. 动态区间和

```cpp
// 经典应用，见完整代码
```

### 3. 求前缀最大值（不修改）

```cpp
void init(vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        updateMax(i + 1, arr[i]);
    }
}

int getMax(int pos) {
    return queryMax(pos);
}
```

## 练习题

1. [洛谷 P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
2. [洛谷 P3368 【模板】树状数组 2](https://www.luogu.com.cn/problem/P3368)
3. [洛谷 P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
4. [LeetCode 315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)

## 总结

- 树状数组代码简洁，常数小
- 核心：`lowbit(x) = x & (-x)`
- 单点修改：`i += lowbit(i)`
- 前缀查询：`i -= lowbit(i)`
- 区间查询：`query(r) - query(l-1)`
- 区间修改：用差分，维护两个树状数组
- 适用：单点修改+前缀查询的场景
