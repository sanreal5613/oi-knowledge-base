# 分块算法

<DifficultyBadge level="hard" />

## 什么是分块？

分块（Sqrt Decomposition）是一种**暴力美学**，将数据分成若干块，块内暴力，块间优化。

```
数组：[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
分块：每块大小 √n ≈ 3
块1：[1, 2, 3]
块2：[4, 5, 6]
块3：[7, 8, 9]
块4：[10]
```

## 基本思想

- 将 n 个元素分成 √n 块，每块 √n 个元素
- **块内**：暴力处理
- **块间**：利用预处理信息优化
- 时间复杂度：O(√n) 或 O(n√n)

## 区间修改 + 区间查询

### 问题

支持：
- 区间加法
- 区间求和

### 代码

```cpp
#include <iostream>
#include <cmath>
using namespace std;

const int MAXN = 1e5 + 5;

long long arr[MAXN];      // 原数组
long long sum[MAXN];      // 每块的和
long long lazy[MAXN];     // 每块的懒标记
int belong[MAXN];         // 每个位置属于哪一块
int L[MAXN], R[MAXN];     // 每块的左右端点
int n, m, blockSize, blockNum;

void init() {
    blockSize = sqrt(n);
    blockNum = (n + blockSize - 1) / blockSize;
    
    for (int i = 1; i <= blockNum; i++) {
        L[i] = (i - 1) * blockSize + 1;
        R[i] = min(i * blockSize, n);
    }
    
    for (int i = 1; i <= n; i++) {
        belong[i] = (i - 1) / blockSize + 1;
        sum[belong[i]] += arr[i];
    }
}

// 区间加法
void rangeAdd(int l, int r, long long val) {
    int p = belong[l], q = belong[r];
    
    if (p == q) {
        // 同一块，暴力
        for (int i = l; i <= r; i++) {
            arr[i] += val;
        }
        sum[p] += val * (r - l + 1);
    } else {
        // 左边不完整块
        for (int i = l; i <= R[p]; i++) {
            arr[i] += val;
        }
        sum[p] += val * (R[p] - l + 1);
        
        // 中间完整块
        for (int i = p + 1; i <= q - 1; i++) {
            lazy[i] += val;
        }
        
        // 右边不完整块
        for (int i = L[q]; i <= r; i++) {
            arr[i] += val;
        }
        sum[q] += val * (r - L[q] + 1);
    }
}

// 区间求和
long long rangeSum(int l, int r) {
    int p = belong[l], q = belong[r];
    long long res = 0;
    
    if (p == q) {
        // 同一块，暴力
        for (int i = l; i <= r; i++) {
            res += arr[i] + lazy[p];
        }
    } else {
        // 左边不完整块
        for (int i = l; i <= R[p]; i++) {
            res += arr[i] + lazy[p];
        }
        
        // 中间完整块
        for (int i = p + 1; i <= q - 1; i++) {
            res += sum[i] + lazy[i] * (R[i] - L[i] + 1);
        }
        
        // 右边不完整块
        for (int i = L[q]; i <= r; i++) {
            res += arr[i] + lazy[q];
        }
    }
    
    return res;
}

int main() {
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    
    init();
    
    while (m--) {
        int op, l, r;
        long long val;
        cin >> op >> l >> r;
        
        if (op == 1) {
            cin >> val;
            rangeAdd(l, r, val);
        } else {
            cout << rangeSum(l, r) << endl;
        }
    }
    
    return 0;
}
// 时间复杂度：O(m√n)
```

## 分块求区间最值

```cpp
const int MAXN = 1e5 + 5;

int arr[MAXN];
int blockMax[MAXN];  // 每块的最大值
int belong[MAXN];
int n, blockSize;

void init() {
    blockSize = sqrt(n);
    
    for (int i = 1; i <= n; i++) {
        belong[i] = (i - 1) / blockSize + 1;
        blockMax[belong[i]] = max(blockMax[belong[i]], arr[i]);
    }
}

// 单点修改
void update(int pos, int val) {
    arr[pos] = val;
    
    int b = belong[pos];
    blockMax[b] = 0;
    
    for (int i = (b - 1) * blockSize + 1; i <= min(b * blockSize, n); i++) {
        blockMax[b] = max(blockMax[b], arr[i]);
    }
}

// 区间最大值
int queryMax(int l, int r) {
    int res = 0;
    int p = belong[l], q = belong[r];
    
    if (p == q) {
        for (int i = l; i <= r; i++) {
            res = max(res, arr[i]);
        }
    } else {
        for (int i = l; i <= min(p * blockSize, n); i++) {
            res = max(res, arr[i]);
        }
        
        for (int i = p + 1; i <= q - 1; i++) {
            res = max(res, blockMax[i]);
        }
        
        for (int i = (q - 1) * blockSize + 1; i <= r; i++) {
            res = max(res, arr[i]);
        }
    }
    
    return res;
}
```

## 莫队算法

莫队是分块的经典应用，用于**离线处理区间查询**。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

const int MAXN = 1e5 + 5;

struct Query {
    int l, r, id, block;
};

int arr[MAXN];
int cnt[MAXN];      // 记录每个数出现的次数
int ans[MAXN];      // 每个查询的答案
int currentAns;     // 当前答案
int n, m, blockSize;

// 添加位置 pos 的元素
void add(int pos) {
    cnt[arr[pos]]++;
    if (cnt[arr[pos]] == 1) {
        currentAns++;
    }
}

// 移除位置 pos 的元素
void remove(int pos) {
    cnt[arr[pos]]--;
    if (cnt[arr[pos]] == 0) {
        currentAns--;
    }
}

int main() {
    cin >> n;
    blockSize = sqrt(n);
    
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    
    cin >> m;
    vector<Query> queries(m);
    
    for (int i = 0; i < m; i++) {
        cin >> queries[i].l >> queries[i].r;
        queries[i].id = i;
        queries[i].block = queries[i].l / blockSize;
    }
    
    // 排序：按块排序，同一块内按 r 排序
    sort(queries.begin(), queries.end(), [](Query& a, Query& b) {
        if (a.block != b.block) return a.block < b.block;
        return a.r < b.r;
    });
    
    int L = 1, R = 0;  // 当前区间为空
    
    for (auto& q : queries) {
        while (L > q.l) add(--L);
        while (R < q.r) add(++R);
        while (L < q.l) remove(L++);
        while (R > q.r) remove(R--);
        
        ans[q.id] = currentAns;
    }
    
    for (int i = 0; i < m; i++) {
        cout << ans[i] << endl;
    }
    
    return 0;
}
// 时间复杂度：O(n√n)
```

## 分块 vs 线段树/树状数组

| 特点 | 分块 | 线段树 | 树状数组 |
|------|------|--------|---------|
| 代码难度 | 简单 | 中等 | 简单 |
| 时间复杂度 | O(√n) | O(log n) | O(log n) |
| 适用范围 | 广 | 较广 | 较窄 |
| 常数 | 大 | 小 | 小 |
| 灵活性 | 高 | 中 | 低 |

## 分块的应用场景

1. **线段树/树状数组无法解决**的问题
2. **复杂度要求不高**的问题
3. **需要灵活处理**的问题
4. **莫队算法**

## 练习题

1. [洛谷 P2801 教主的魔法](https://www.luogu.com.cn/problem/P2801)
2. [洛谷 P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)（可用分块做）
3. [洛谷 P1494 国家集训队 - 小Z的袜子](https://www.luogu.com.cn/problem/P1494)（莫队）
4. [洛谷 P1903 国家集训队 - 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903)（带修改莫队）

## 总结

- 分块：块内暴力，块间优化
- 块大小通常为 √n
- 时间复杂度：O(√n) 或 O(n√n)
- 代码简单，适用范围广
- 莫队是分块的经典应用
- 线段树/树状数组做不了的，试试分块
