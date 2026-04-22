# 提高题解

<DifficultyBadge level="medium" />

## 简介

本章节收录适合有一定基础的学生的经典题目，涉及更多算法和数据结构。

## 题目列表

### 1. 快速幂

**题目**：计算 a^b mod p。

**代码**：

```cpp
#include <iostream>
using namespace std;

long long quickPow(long long a, long long b, long long mod) {
    long long result = 1;
    a %= mod;
    
    while (b > 0) {
        if (b & 1) {
            result = result * a % mod;
        }
        a = a * a % mod;
        b >>= 1;
    }
    
    return result;
}

int main() {
    long long a, b, p;
    cin >> a >> b >> p;
    cout << quickPow(a, b, p) << endl;
    return 0;
}
```

### 2. 最长上升子序列（LIS）

**题目**：求数组的最长上升子序列长度。

**代码**：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
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
    
    cout << maxLen << endl;
    return 0;
}
```

### 3. 01 背包

**题目**：给定 n 个物品的重量和价值，背包容量 W，求最大价值。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    
    int w[1005], v[1005];
    for (int i = 1; i <= n; i++) {
        cin >> w[i] >> v[i];
    }
    
    int dp[1005] = {0};
    
    for (int i = 1; i <= n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    
    cout << dp[W] << endl;
    return 0;
}
```

### 4. Dijkstra 最短路

**题目**：求单源最短路。

**代码**：

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int INF = 0x3f3f3f3f;

int main() {
    int n, m, s;
    cin >> n >> m >> s;
    
    vector<pair<int, int>> graph[1005];
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        graph[u].push_back({v, w});
    }
    
    vector<int> dist(n + 1, INF);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[s] = 0;
    pq.push({0, s});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; i++) {
        cout << (dist[i] == INF ? -1 : dist[i]) << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 5. 并查集

**题目**：维护集合的合并和查询。

**代码**：

```cpp
#include <iostream>
using namespace std;

int parent[10005];

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    parent[find(x)] = find(y);
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
    }
    
    for (int i = 0; i < m; i++) {
        int op, x, y;
        cin >> op >> x >> y;
        
        if (op == 1) {
            unite(x, y);
        } else {
            if (find(x) == find(y)) {
                cout << "Y" << endl;
            } else {
                cout << "N" << endl;
            }
        }
    }
    
    return 0;
}
```

### 6. 线段树区间求和

**题目**：支持区间修改和区间查询。

**代码**：

```cpp
#include <iostream>
using namespace std;

long long tree[400005];
long long lazy[400005];
int n;

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

void update(int node, int start, int end, int l, int r, long long val) {
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

long long query(int node, int start, int end, int l, int r) {
    if (l <= start && end <= r) return tree[node];
    
    pushDown(node, start, end);
    int mid = (start + end) / 2;
    long long sum = 0;
    
    if (l <= mid) sum += query(node * 2, start, mid, l, r);
    if (r > mid) sum += query(node * 2 + 1, mid + 1, end, l, r);
    
    return sum;
}

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        update(1, 1, n, i, i, x);
    }
    
    int q;
    cin >> q;
    
    while (q--) {
        int op, l, r;
        long long val;
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

### 7. 树状数组

**题目**：支持单点修改和前缀查询。

**代码**：

```cpp
#include <iostream>
using namespace std;

int tree[500005];
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
        int op, x, y;
        cin >> op >> x >> y;
        
        if (op == 1) {
            update(x, y);
        } else {
            cout << query(y) - query(x - 1) << endl;
        }
    }
    
    return 0;
}
```

### 8. KMP 字符串匹配

**题目**：在主串中查找子串。

**代码**：

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> computeNext(string& pattern) {
    int m = pattern.size();
    vector<int> next(m, 0);
    
    int j = 0;
    for (int i = 1; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (pattern[i] == pattern[j]) {
            j++;
            next[i] = j;
        }
    }
    
    return next;
}

int kmpSearch(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    
    vector<int> next = computeNext(pattern);
    int j = 0;
    
    for (int i = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (text[i] == pattern[j]) {
            j++;
        }
        if (j == m) {
            return i - m + 1;
        }
    }
    
    return -1;
}

int main() {
    string text, pattern;
    cin >> text >> pattern;
    
    cout << kmpSearch(text, pattern) << endl;
    
    return 0;
}
```

## 更多题目

- [洛谷 P3372 【模板】线段树 1](https://www.luogu.com.cn/problem/P3372)
- [洛谷 P3374 【模板】树状数组 1](https://www.luogu.com.cn/problem/P3374)
- [洛谷 P4779 【模板】单源最短路径](https://www.luogu.com.cn/problem/P4779)
- [洛谷 P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

## 总结

提高题目涉及：
- 动态规划
- 图论算法
- 数据结构
- 字符串算法
- 数学算法

需要扎实的基础和算法思维。
