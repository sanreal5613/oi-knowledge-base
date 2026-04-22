# 最小生成树

<DifficultyBadge level="medium" />

## 什么是最小生成树？

最小生成树（Minimum Spanning Tree, MST）是连接图中所有顶点的**边权之和最小**的树。

```
原图：
    1
  / | \
 2--3--4
  \ | /
    5

最小生成树：
    1
  /   \
 2     4
  \   /
    3
    |
    5
```

<AlgorithmCard 
  title="最小生成树"
  description="连接所有顶点的边权和最小的树"
  timeComplexity="O(E log E) 或 O(E log V)"
  spaceComplexity="O(V)"
/>

## Kruskal 算法

基于**并查集**，按边权从小到大选边。

### 算法思想

1. 将所有边按权值从小到大排序
2. 依次选择边，如果不会形成环，则加入 MST
3. 直到选了 n-1 条边

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
    bool operator < (const Edge& other) const {
        return w < other.w;
    }
};

const int MAXN = 1e5 + 5;
int parent[MAXN];
vector<Edge> edges;
int n, m;

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    parent[find(x)] = find(y);
}

int kruskal() {
    sort(edges.begin(), edges.end());
    
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
    }
    
    int total = 0;
    int count = 0;
    
    for (Edge& e : edges) {
        if (find(e.u) != find(e.v)) {
            unite(e.u, e.v);
            total += e.w;
            count++;
            
            if (count == n - 1) break;
        }
    }
    
    // 无法生成 MST
    if (count != n - 1) return -1;
    
    return total;
}

int main() {
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        edges.push_back({u, v, w});
    }
    
    int result = kruskal();
    
    if (result == -1) {
        cout << "无法生成 MST" << endl;
    } else {
        cout << result << endl;
    }
    
    return 0;
}
```

### 复杂度分析

- **时间复杂度**：O(E log E)（排序）
- **空间复杂度**：O(V + E)

## Prim 算法

基于**贪心**，类似 Dijkstra。

### 算法思想

1. 从任意顶点开始，加入 MST
2. 每次选择连接 MST 和非 MST 的最小边
3. 重复直到所有顶点加入 MST

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int MAXN = 1e5 + 5;
const int INF = 0x3f3f3f3f;

vector<pair<int, int>> graph[MAXN];  // {邻居, 边权}
int dist[MAXN];
bool inMST[MAXN];
int n, m;

int prim() {
    fill(dist, dist + n + 1, INF);
    fill(inMST, inMST + n + 1, false);
    
    // 小根堆：{距离, 节点}
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[1] = 0;
    pq.push({0, 1});
    
    int total = 0;
    int count = 0;
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        total += d;
        count++;
        
        for (auto [v, w] : graph[u]) {
            if (!inMST[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({w, v});
            }
        }
    }
    
    if (count != n) return -1;
    
    return total;
}

int main() {
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        graph[u].push_back({v, w});
        graph[v].push_back({u, w});
    }
    
    int result = prim();
    
    if (result == -1) {
        cout << "无法生成 MST" << endl;
    } else {
        cout << result << endl;
    }
    
    return 0;
}
```

### 复杂度分析

- **时间复杂度**：O(E log V)（堆优化）
- **空间复杂度**：O(V + E)

## Kruskal vs Prim

| 特点 | Kruskal | Prim |
|------|---------|------|
| 数据结构 | 并查集 | 优先队列 |
| 适用图 | 稀疏图 | 稠密图 |
| 时间复杂度 | O(E log E) | O(E log V) |
| 空间复杂度 | O(V + E) | O(V + E) |
| 实现难度 | 简单 | 稍复杂 |

## 次小生成树

求第二小的生成树：

```cpp
int secondMST() {
    int mst = kruskal();
    int second = INF;
    
    // 枚举不在 MST 中的边
    for (Edge& e : nonMSTEdges) {
        // 加入 e 会形成环，去掉环上最大边
        int maxEdge = findMaxEdgeOnPath(e.u, e.v);
        second = min(second, mst + e.w - maxEdge);
    }
    
    return second;
}
```

## 练习题

1. [洛谷 P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)
2. [洛谷 P1546 最短网络](https://www.luogu.com.cn/problem/P1546)
3. [洛谷 P1394 繁忙的都市](https://www.luogu.com.cn/problem/P1394)
4. [LeetCode 1584. 连接所有点的最小费用](https://leetcode.cn/problems/min-cost-to-connect-all-points/)

## 总结

- **Kruskal**：排序边 + 并查集，适合稀疏图
- **Prim**：类似 Dijkstra，适合稠密图
- 两者都是贪心算法，都能求出 MST
- 边权和相同，但 MST 可能不唯一
