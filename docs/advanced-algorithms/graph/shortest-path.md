# 最短路算法

<DifficultyBadge level="hard" />

## 问题描述

给定一个带权图，求从起点到其他所有节点的最短路径。

## Dijkstra 算法

适用于**非负权**图，贪心策略。

<AlgorithmCard 
  title="Dijkstra"
  description="贪心策略，适用于非负权图"
  timeComplexity="O((V+E) log V)"
  spaceComplexity="O(V)"
/>

### 算法思想

1. 初始化：起点距离为 0，其余为无穷大
2. 每次选择**未访问的最近节点** u
3. 用 u 更新其邻居的距离
4. 标记 u 为已访问
5. 重复直到所有节点访问完

### 朴素实现 O(V²)

```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

const int MAXN = 1005;
const int INF = 0x3f3f3f3f;

int n, m;
int dist[MAXN];
bool visited[MAXN];
int graph[MAXN][MAXN];  // 邻接矩阵

void dijkstra(int start) {
    fill(dist, dist + n + 1, INF);
    fill(visited, visited + n + 1, false);
    dist[start] = 0;
    
    for (int i = 0; i < n; i++) {
        // 找未访问的最近节点
        int u = -1;
        for (int j = 1; j <= n; j++) {
            if (!visited[j] && (u == -1 || dist[j] < dist[u])) {
                u = j;
            }
        }
        
        if (dist[u] == INF) break;
        visited[u] = true;
        
        // 更新邻居
        for (int v = 1; v <= n; v++) {
            if (graph[u][v] != INF) {
                dist[v] = min(dist[v], dist[u] + graph[u][v]);
            }
        }
    }
}
```

### 堆优化 O((V+E) log V)

```cpp
#include <queue>
#include <vector>
using namespace std;

const int INF = 0x3f3f3f3f;

vector<pair<int, int>> graph[MAXN];  // {邻居, 边权}
int dist[MAXN];

void dijkstra(int start, int n) {
    fill(dist, dist + n + 1, INF);
    dist[start] = 0;
    
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.push({0, start});  // {距离, 节点}
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;  // 过期的状态
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    int n, m, s;
    cin >> n >> m >> s;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        graph[u].push_back({v, w});
        // graph[v].push_back({u, w});  // 无向图
    }
    
    dijkstra(s, n);
    
    for (int i = 1; i <= n; i++) {
        if (dist[i] == INF) {
            cout << "2147483647 ";
        } else {
            cout << dist[i] << " ";
        }
    }
    
    return 0;
}
```

## Bellman-Ford 算法

适用于**含负权**图，可检测负环。

<AlgorithmCard 
  title="Bellman-Ford"
  description="支持负权边，可检测负环"
  timeComplexity="O(VE)"
  spaceComplexity="O(V)"
/>

```cpp
struct Edge {
    int u, v, w;
};

int dist[MAXN];
Edge edges[MAXM];

bool bellmanFord(int start, int n, int m) {
    fill(dist, dist + n + 1, INF);
    dist[start] = 0;
    
    for (int i = 0; i < n - 1; i++) {
        bool updated = false;
        
        for (int j = 0; j < m; j++) {
            int u = edges[j].u, v = edges[j].v, w = edges[j].w;
            
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        
        if (!updated) break;  // 提前终止
    }
    
    // 检测负环
    for (int j = 0; j < m; j++) {
        int u = edges[j].u, v = edges[j].v, w = edges[j].w;
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            return false;  // 存在负环
        }
    }
    
    return true;
}
```

## SPFA 算法

Bellman-Ford 的队列优化版本。

<AlgorithmCard 
  title="SPFA"
  description="Bellman-Ford 的队列优化"
  timeComplexity="O(kE)，k 通常很小"
  spaceComplexity="O(V)"
/>

```cpp
#include <queue>

int dist[MAXN];
bool inQueue[MAXN];

void spfa(int start, int n) {
    fill(dist, dist + n + 1, INF);
    fill(inQueue, inQueue + n + 1, false);
    
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    inQueue[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                
                if (!inQueue[v]) {
                    q.push(v);
                    inQueue[v] = true;
                }
            }
        }
    }
}
```

### SPFA 判断负环

```cpp
int cnt[MAXN];  // 入队次数

bool spfaWithNegCycle(int start, int n) {
    fill(dist, dist + n + 1, INF);
    fill(inQueue, inQueue + n + 1, false);
    fill(cnt, cnt + n + 1, 0);
    
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    inQueue[start] = true;
    cnt[start] = 1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        inQueue[u] = false;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                
                if (!inQueue[v]) {
                    q.push(v);
                    inQueue[v] = true;
                    cnt[v]++;
                    
                    if (cnt[v] >= n) {
                        return false;  // 存在负环
                    }
                }
            }
        }
    }
    
    return true;
}
```

## Floyd 算法

求**所有节点对**之间的最短路。

<AlgorithmCard 
  title="Floyd-Warshall"
  description="动态规划，求所有节点对最短路"
  timeComplexity="O(V³)"
  spaceComplexity="O(V²)"
/>

```cpp
int dist[MAXN][MAXN];

void floyd(int n) {
    // 初始化
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i == j) dist[i][j] = 0;
            else dist[i][j] = INF;
        }
    }
    
    // 读入边
    // dist[u][v] = w;
    
    // Floyd 核心
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
}
```

## 三种算法对比

| 算法 | 时间复杂度 | 负权 | 负环 | 适用场景 |
|------|-----------|------|------|---------|
| Dijkstra（堆） | O((V+E) log V) | ❌ | ❌ | 非负权图，单源 |
| Bellman-Ford | O(VE) | ✅ | 可检测 | 含负权，单源 |
| SPFA | O(kE) | ✅ | 可检测 | 含负权，单源 |
| Floyd | O(V³) | ✅ | ❌ | 多源，节点少 |

## 练习题

1. [洛谷 P4779 【模板】单源最短路径（标准版）](https://www.luogu.com.cn/problem/P4779)（Dijkstra）
2. [洛谷 P3371 【模板】单源最短路径（弱化版）](https://www.luogu.com.cn/problem/P3371)（SPFA）
3. [洛谷 P2910 寻找道路](https://www.luogu.com.cn/problem/P2910)
4. [LeetCode 743. 网络延迟时间](https://leetcode.cn/problems/network-delay-time/)

## 总结

- **Dijkstra**：非负权图，堆优化 O((V+E) log V)
- **Bellman-Ford**：含负权，可检测负环，O(VE)
- **SPFA**：Bellman-Ford 队列优化，实际较快
- **Floyd**：多源最短路，O(V³)，适合节点少的情况
