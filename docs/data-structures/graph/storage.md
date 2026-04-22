# 图的存储

<DifficultyBadge level="easy" />

## 图的表示

图由**顶点**（Vertex）和**边**（Edge）组成，有两种存储方式：

## 邻接矩阵

用二维数组存储边，适合**稠密图**。

```cpp
const int MAXN = 1005;
const int INF = 0x3f3f3f3f;

int graph[MAXN][MAXN];  // graph[i][j] 表示 i 到 j 的边权

// 初始化
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        if (i == j) graph[i][j] = 0;
        else graph[i][j] = INF;  // 无穷大表示无边
    }
}

// 添加边
void addEdge(int u, int v, int w) {
    graph[u][v] = w;
    // graph[v][u] = w;  // 无向图
}

// 遍历 u 的所有邻居
for (int v = 1; v <= n; v++) {
    if (graph[u][v] != INF && u != v) {
        cout << u << " -> " << v << ": " << graph[u][v] << endl;
    }
}
```

### 优缺点

| 优点 | 缺点 |
|------|------|
| 查询边 O(1) | 空间 O(n²)，不适合稀疏图 |
| 代码简单 | 遍历邻居 O(n) |
| 适合稠密图 | 无法存储重边 |

## 邻接表

用链表存储边，适合**稀疏图**。

### 数组实现

```cpp
const int MAXN = 1e5 + 5;
const int MAXM = 2e5 + 5;

struct Edge {
    int to, w, next;
} edges[MAXM];

int head[MAXN];  // head[i] 表示 i 的第一条边的下标
int edge_cnt = 0;

// 初始化
void init(int n) {
    fill(head, head + n + 1, -1);
    edge_cnt = 0;
}

// 添加边
void addEdge(int u, int v, int w) {
    edges[edge_cnt].to = v;
    edges[edge_cnt].w = w;
    edges[edge_cnt].next = head[u];
    head[u] = edge_cnt++;
}

// 遍历 u 的所有邻居
for (int i = head[u]; i != -1; i = edges[i].next) {
    int v = edges[i].to;
    int w = edges[i].w;
    cout << u << " -> " << v << ": " << w << endl;
}
```

### vector 实现（推荐）

```cpp
#include <vector>
using namespace std;

vector<pair<int, int>> graph[MAXN];  // {邻居, 边权}

// 添加边
void addEdge(int u, int v, int w) {
    graph[u].push_back({v, w});
    // graph[v].push_back({u, w});  // 无向图
}

// 遍历 u 的所有邻居
for (auto [v, w] : graph[u]) {
    cout << u << " -> " << v << ": " << w << endl;
}
```

### 优缺点

| 优点 | 缺点 |
|------|------|
| 空间 O(n+m) | 查询边 O(度数) |
| 适合稀疏图 | 代码稍复杂 |
| 遍历邻居快 | |
| 可存储重边 | |

## 边集数组

只存储边的列表，适合**Kruskal**算法。

```cpp
struct Edge {
    int u, v, w;
    bool operator < (const Edge& other) const {
        return w < other.w;
    }
};

vector<Edge> edges;

// 添加边
void addEdge(int u, int v, int w) {
    edges.push_back({u, v, w});
    // edges.push_back({v, u, w});  // 无向图
}

// 排序（Kruskal）
sort(edges.begin(), edges.end());
```

## 存储方式选择

| 场景 | 推荐存储 |
|------|---------|
| 稠密图（m ≈ n²） | 邻接矩阵 |
| 稀疏图（m << n²） | 邻接表 |
| 需要快速查询边 | 邻接矩阵 |
| Kruskal 算法 | 边集数组 |
| 一般情况 | 邻接表（vector） |

## 有向图 vs 无向图

### 有向图

```cpp
// 只添加一条边
addEdge(u, v, w);
```

### 无向图

```cpp
// 添加两条边
addEdge(u, v, w);
addEdge(v, u, w);
```

## 带权图 vs 无权图

### 带权图

```cpp
// 存储边权
vector<pair<int, int>> graph[MAXN];  // {邻居, 边权}
```

### 无权图

```cpp
// 只存储邻居
vector<int> graph[MAXN];

void addEdge(int u, int v) {
    graph[u].push_back(v);
}
```

## 示例代码

### 邻接表完整示例

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1e5 + 5;
vector<pair<int, int>> graph[MAXN];  // {邻居, 边权}
int n, m;

void addEdge(int u, int v, int w) {
    graph[u].push_back({v, w});
    graph[v].push_back({u, w});  // 无向图
}

void printGraph() {
    for (int u = 1; u <= n; u++) {
        cout << u << ": ";
        for (auto [v, w] : graph[u]) {
            cout << "(" << v << ", " << w << ") ";
        }
        cout << endl;
    }
}

int main() {
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        addEdge(u, v, w);
    }
    
    printGraph();
    
    return 0;
}
```

### 输入输出格式

```
输入：
4 5
1 2 1
1 3 2
2 3 3
2 4 4
3 4 5

输出：
1: (2, 1) (3, 2)
2: (1, 1) (3, 3) (4, 4)
3: (1, 2) (2, 3) (4, 5)
4: (2, 4) (3, 5)
```

## 练习题

1. 实现邻接矩阵存储并输出
2. 实现邻接表存储并输出
3. 统计每个节点的度数

<details>
<summary>练习 3 答案</summary>

```cpp
int degree[MAXN];

void countDegree() {
    for (int u = 1; u <= n; u++) {
        degree[u] = graph[u].size();
        cout << "节点 " << u << " 的度数: " << degree[u] << endl;
    }
}
```

</details>

## 总结

- **邻接矩阵**：O(n²) 空间，O(1) 查询边，适合稠密图
- **邻接表**：O(n+m) 空间，适合稀疏图，常用
- **边集数组**：适合 Kruskal 算法
- 无向图需要添加两条边
- 竞赛中推荐使用 vector 实现的邻接表
