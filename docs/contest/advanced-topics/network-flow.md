# 网络流

<DifficultyBadge level="hard" />

## 什么是网络流？

网络流是在**有向图**上求解**最大流量**或**最小费用**的算法。

```
应用场景：
- 水管网络的最大流量
- 交通网络的最大通行量
- 二分图匹配
- 最小割问题
```

## 基本概念

### 网络

- **源点**（Source）：流量的起点，记为 S
- **汇点**（Sink）：流量的终点，记为 T
- **容量**（Capacity）：边 (u, v) 的最大流量，记为 c(u, v)
- **流量**（Flow）：边 (u, v) 的实际流量，记为 f(u, v)

### 约束条件

1. **容量限制**：0 ≤ f(u, v) ≤ c(u, v)
2. **流量守恒**：除 S 和 T 外，每个点的流入 = 流出

## 最大流算法

### Ford-Fulkerson 方法

**基本思想**：不断寻找增广路，增加流量。

```cpp
// 增广路：从 S 到 T 的一条路径，路径上每条边都有剩余容量
```

### Edmonds-Karp 算法

使用 **BFS** 找最短增广路。

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;

const int INF = 0x3f3f3f3f;
const int MAXN = 205;

struct Edge {
    int to, cap, flow, rev;
};

vector<Edge> graph[MAXN];
int parent[MAXN];
int n, m, s, t;

void addEdge(int u, int v, int cap) {
    graph[u].push_back({v, cap, 0, (int)graph[v].size()});
    graph[v].push_back({u, 0, 0, (int)graph[u].size() - 1});
}

bool bfs() {
    memset(parent, -1, sizeof(parent));
    queue<int> q;
    q.push(s);
    parent[s] = -2;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (auto& e : graph[u]) {
            if (parent[e.to] == -1 && e.cap > e.flow) {
                parent[e.to] = u;
                if (e.to == t) return true;
                q.push(e.to);
            }
        }
    }
    
    return false;
}

int maxFlow() {
    int flow = 0;
    
    while (bfs()) {
        // 找到增广路的最小剩余容量
        int minCap = INF;
        for (int v = t; v != s; v = parent[v]) {
            int u = parent[v];
            for (auto& e : graph[u]) {
                if (e.to == v) {
                    minCap = min(minCap, e.cap - e.flow);
                    break;
                }
            }
        }
        
        // 更新流量
        for (int v = t; v != s; v = parent[v]) {
            int u = parent[v];
            for (auto& e : graph[u]) {
                if (e.to == v) {
                    e.flow += minCap;
                    graph[v][e.rev].flow -= minCap;
                    break;
                }
            }
        }
        
        flow += minCap;
    }
    
    return flow;
}

int main() {
    cin >> n >> m >> s >> t;
    
    for (int i = 0; i < m; i++) {
        int u, v, cap;
        cin >> u >> v >> cap;
        addEdge(u, v, cap);
    }
    
    cout << maxFlow() << endl;
    
    return 0;
}
// 时间复杂度：O(V × E²)
```

### Dinic 算法

使用 **分层图** 和 **多路增广**，效率更高。

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;

const int INF = 0x3f3f3f3f;
const int MAXN = 10005;

struct Edge {
    int to, cap, rev;
};

vector<Edge> graph[MAXN];
int level[MAXN];
int iter[MAXN];
int n, m, s, t;

void addEdge(int u, int v, int cap) {
    graph[u].push_back({v, cap, (int)graph[v].size()});
    graph[v].push_back({u, 0, (int)graph[u].size() - 1});
}

// BFS 构建分层图
bool bfs() {
    memset(level, -1, sizeof(level));
    queue<int> q;
    level[s] = 0;
    q.push(s);
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (auto& e : graph[u]) {
            if (level[e.to] < 0 && e.cap > 0) {
                level[e.to] = level[u] + 1;
                q.push(e.to);
            }
        }
    }
    
    return level[t] >= 0;
}

// DFS 寻找增广路
int dfs(int u, int f) {
    if (u == t) return f;
    
    for (int& i = iter[u]; i < graph[u].size(); i++) {
        Edge& e = graph[u][i];
        
        if (e.cap > 0 && level[e.to] == level[u] + 1) {
            int d = dfs(e.to, min(f, e.cap));
            
            if (d > 0) {
                e.cap -= d;
                graph[e.to][e.rev].cap += d;
                return d;
            }
        }
    }
    
    return 0;
}

int maxFlow() {
    int flow = 0;
    
    while (bfs()) {
        memset(iter, 0, sizeof(iter));
        
        int f;
        while ((f = dfs(s, INF)) > 0) {
            flow += f;
        }
    }
    
    return flow;
}

int main() {
    cin >> n >> m >> s >> t;
    
    for (int i = 0; i < m; i++) {
        int u, v, cap;
        cin >> u >> v >> cap;
        addEdge(u, v, cap);
    }
    
    cout << maxFlow() << endl;
    
    return 0;
}
// 时间复杂度：O(V² × E)
```

## 最小割

**最大流最小割定理**：最大流 = 最小割

**最小割**：将图分成 S 集和 T 集，使得 S ∈ S 集，T ∈ T 集，割边的容量和最小。

```cpp
// 在最大流后，从 S 出发沿剩余容量 > 0 的边能到达的点构成 S 集
void minCut() {
    maxFlow();
    
    // BFS/DFS 找 S 集
    vector<bool> inS(n + 1, false);
    queue<int> q;
    q.push(s);
    inS[s] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (auto& e : graph[u]) {
            if (e.cap > 0 && !inS[e.to]) {
                inS[e.to] = true;
                q.push(e.to);
            }
        }
    }
    
    // 输出割边
    for (int u = 1; u <= n; u++) {
        if (!inS[u]) continue;
        
        for (auto& e : graph[u]) {
            if (!inS[e.to] && e.cap == 0) {
                // (u, e.to) 是割边
                cout << u << " -> " << e.to << endl;
            }
        }
    }
}
```

## 网络流建模

### 1. 二分图匹配

```cpp
// 左边 n 个点，右边 m 个点
// 源点 S = 0，汇点 T = n + m + 1

void buildBipartiteGraph() {
    s = 0;
    t = n + m + 1;
    
    // S 连接左边所有点
    for (int i = 1; i <= n; i++) {
        addEdge(s, i, 1);
    }
    
    // 右边所有点连接 T
    for (int i = 1; i <= m; i++) {
        addEdge(n + i, t, 1);
    }
    
    // 左边到右边的边
    for (auto [u, v] : edges) {
        addEdge(u, n + v, 1);
    }
}

// 最大流 = 最大匹配数
```

### 2. 多重匹配

```cpp
// 左边点可以匹配多次
void buildMultipleMatch() {
    // S 到左边点，容量为匹配次数
    for (int i = 1; i <= n; i++) {
        addEdge(s, i, matchCount[i]);
    }
    
    // 其他同上
}
```

### 3. 点上有容量限制

```cpp
// 拆点：将点 u 拆成 u_in 和 u_out
// u_in -> u_out 的边容量为点的容量

void addNodeCapacity(int u, int cap) {
    int u_in = u * 2;
    int u_out = u * 2 + 1;
    
    addEdge(u_in, u_out, cap);
    
    // 原图中的边 (u, v) 变为 (u_out, v_in)
}
```

## 费用流

在最大流的基础上，求**费用最小**的流。

```cpp
struct Edge {
    int to, cap, cost, rev;
};

// 最小费用最大流
int minCostMaxFlow() {
    int flow = 0, cost = 0;
    
    while (true) {
        // SPFA 找最短路（费用最小）
        vector<int> dist(n + 1, INF);
        vector<int> parent(n + 1, -1);
        vector<bool> inQueue(n + 1, false);
        
        queue<int> q;
        dist[s] = 0;
        q.push(s);
        inQueue[s] = true;
        
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            inQueue[u] = false;
            
            for (auto& e : graph[u]) {
                if (e.cap > 0 && dist[u] + e.cost < dist[e.to]) {
                    dist[e.to] = dist[u] + e.cost;
                    parent[e.to] = u;
                    if (!inQueue[e.to]) {
                        q.push(e.to);
                        inQueue[e.to] = true;
                    }
                }
            }
        }
        
        if (parent[t] == -1) break;
        
        // 增加流量
        int minCap = INF;
        for (int v = t; v != s; v = parent[v]) {
            // 找最小容量
        }
        
        flow += minCap;
        cost += minCap * dist[t];
    }
    
    return cost;
}
```

## 练习题

1. [洛谷 P3376 【模板】网络最大流](https://www.luogu.com.cn/problem/P3376)
2. [洛谷 P3381 【模板】最小费用最大流](https://www.luogu.com.cn/problem/P3381)
3. [洛谷 P2756 飞行员配对方案问题](https://www.luogu.com.cn/problem/P2756)（二分图匹配）
4. [洛谷 P3254 圆桌问题](https://www.luogu.com.cn/problem/P3254)

## 总结

- 网络流：求最大流量或最小费用
- Ford-Fulkerson：基本方法，找增广路
- Edmonds-Karp：BFS 找最短增广路
- Dinic：分层图 + 多路增广，效率最高
- 最大流 = 最小割
- 应用：二分图匹配、点覆盖、最小割
