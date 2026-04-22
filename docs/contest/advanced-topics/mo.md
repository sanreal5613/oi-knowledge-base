# 莫队算法

<DifficultyBadge level="hard" />

## 什么是莫队算法？

莫队算法是一种**离线处理区间查询**的算法，通过**分块排序**优化查询顺序，减少指针移动次数。

<AlgorithmCard 
  title="莫队算法"
  description="离线处理区间查询的分块优化算法"
  timeComplexity="O(n√n)"
  spaceComplexity="O(n)"
/>

## 基本思想

1. **离线**：先读入所有查询，再统一处理
2. **分块**：将查询按左端点分块
3. **排序**：同一块内按右端点排序
4. **双指针**：维护当前区间 [L, R]，通过移动指针回答查询

## 算法流程

```cpp
// 1. 读入所有查询
// 2. 按左端点分块，同一块内按右端点排序
// 3. 依次处理每个查询，移动指针
```

## 经典问题：区间不同元素个数

### 问题

给定数组，多次查询区间 [l, r] 中有多少个不同的元素。

### 代码

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

const int MAXN = 5e4 + 5;

struct Query {
    int l, r, id, block;
};

int arr[MAXN];
int cnt[MAXN * 10];   // 记录每个数出现的次数（值域可能很大）
int ans[MAXN];
int currentAns;       // 当前区间不同元素个数
int n, m, blockSize;

// 添加位置 pos 的元素
void add(int pos) {
    cnt[arr[pos]]++;
    if (cnt[arr[pos]] == 1) {
        currentAns++;  // 第一次出现
    }
}

// 移除位置 pos 的元素
void remove(int pos) {
    cnt[arr[pos]]--;
    if (cnt[arr[pos]] == 0) {
        currentAns--;  // 不再出现
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
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
    
    int L = 1, R = 0;  // 当前区间为空 [1, 0]
    
    for (auto& q : queries) {
        // 扩展左边界
        while (L > q.l) add(--L);
        // 扩展右边界
        while (R < q.r) add(++R);
        // 收缩左边界
        while (L < q.l) remove(L++);
        // 收缩右边界
        while (R > q.r) remove(R--);
        
        ans[q.id] = currentAns;
    }
    
    for (int i = 0; i < m; i++) {
        cout << ans[i] << "\n";
    }
    
    return 0;
}
```

## 带修改的莫队

### 问题

支持单点修改，查询区间不同元素个数。

### 代码

```cpp
struct Query {
    int l, r, time, id, block;
};

struct Modify {
    int pos, val, pre;  // 修改位置，新值，原值
};

vector<Query> queries;
vector<Modify> modifies;
int modifyCnt = 0;

// 排序：按块、时间、r 排序
sort(queries.begin(), queries.end(), [](Query& a, Query& b) {
    if (a.block != b.block) return a.block < b.block;
    if (a.time != b.time) return a.time < b.time;
    return a.r < b.r;
});

// 处理修改
void apply(int time) {
    auto& mod = modifies[time];
    if (L <= mod.pos && mod.pos <= R) {
        // 如果修改位置在当前区间内，更新答案
        remove(mod.pos);
        arr[mod.pos] = mod.val;
        add(mod.pos);
    } else {
        arr[mod.pos] = mod.val;
    }
}

void rollback(int time) {
    auto& mod = modifies[time];
    if (L <= mod.pos && mod.pos <= R) {
        remove(mod.pos);
        arr[mod.pos] = mod.pre;
        add(mod.pos);
    } else {
        arr[mod.pos] = mod.pre;
    }
}

// 主循环
int curTime = 0;
for (auto& q : queries) {
    while (curTime < q.time) apply(curTime++);
    while (curTime > q.time) rollback(--curTime);
    
    while (L > q.l) add(--L);
    while (R < q.r) add(++R);
    while (L < q.l) remove(L++);
    while (R > q.r) remove(R--);
    
    ans[q.id] = currentAns;
}
```

## 树上莫队

将树转化为欧拉序，然后用莫队处理。

```cpp
// 欧拉序
void dfs(int u, int parent) {
    euler[++timer] = u;
    first[u] = timer;
    
    for (int v : tree[u]) {
        if (v == parent) continue;
        dfs(v, u);
    }
    
    euler[++timer] = u;
}

// 查询 u 到 v 的路径
// 如果 u 和 v 的 first 在同一块，直接暴力
// 否则用莫队
```

## 回滚莫队

适用于删除操作困难的场景。

```cpp
// 只扩展右边界，不收缩
// 左边界在每个块内暴力

for (int blockId = 0; blockId <= maxBlock; blockId++) {
    int blockR = (blockId + 1) * blockSize;
    
    // 初始化
    clear();
    int R = blockR;
    
    // 处理右端点在块内的查询
    for (auto& q : queriesInBlock[blockId]) {
        while (R < q.r) add(++R);
        
        // 保存当前状态
        int savedAns = currentAns;
        auto savedCnt = cnt;
        
        // 暴力处理左端点
        for (int i = q.l; i <= min(q.r, blockR); i++) {
            add(i);
        }
        
        ans[q.id] = currentAns;
        
        // 回滚
        cnt = savedCnt;
        currentAns = savedAns;
    }
}
```

## 复杂度分析

### 普通莫队

- **排序**：O(m log m)
- **指针移动**：O(n√n)
- **总复杂度**：O(n√n)

### 带修改莫队

- **块大小**：n^(2/3)
- **复杂度**：O(n^(5/3))

## 莫队优化技巧

### 1. 奇偶性优化

```cpp
// 奇数块按 r 升序，偶数块按 r 降序
sort(queries.begin(), queries.end(), [](Query& a, Query& b) {
    if (a.block != b.block) return a.block < b.block;
    if (a.block & 1) return a.r < b.r;
    return a.r > b.r;
});
```

### 2. 块大小选择

```cpp
// 普通莫队
blockSize = n / sqrt(m);  // 或 sqrt(n)

// 带修改莫队
blockSize = pow(n, 2.0 / 3);
```

## 莫队适用场景

1. **离线查询**
2. **区间统计**
3. **可以 O(1) 添加/删除元素**
4. **不好用线段树/树状数组解决**

## 练习题

1. [洛谷 P1494 国家集训队 - 小Z的袜子](https://www.luogu.com.cn/problem/P1494)
2. [洛谷 P1903 国家集训队 - 数颜色 / 维护队列](https://www.luogu.com.cn/problem/P1903)（带修改）
3. [洛谷 P2709 小B的询问](https://www.luogu.com.cn/problem/P2709)
4. [洛谷 P3674 小清新人渣的本愿](https://www.luogu.com.cn/problem/P3674)

## 总结

- 莫队：离线 + 分块排序 + 双指针
- 时间复杂度：O(n√n)
- 关键是 add 和 remove 函数的实现
- 扩展：带修改莫队、树上莫队、回滚莫队
- 适用：离线区间查询问题
