# 并查集

<DifficultyBadge level="medium" />

## 什么是并查集？

并查集（Union-Find / Disjoint Set Union）是一种用于处理**集合合并**和**查询**的数据结构。

### 主要操作

1. **Find**：查找元素所属集合
2. **Union**：合并两个集合

<AlgorithmCard 
  title="并查集"
  description="高效处理集合合并和查询"
  timeComplexity="O(α(n)) ≈ O(1)"
  spaceComplexity="O(n)"
/>

## 基本实现

```cpp
int parent[MAXN];

// 初始化
void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;  // 每个元素的父节点是自己
    }
}

// 查找（路径压缩）
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  // 路径压缩
    }
    return parent[x];
}

// 合并
void unite(int x, int y) {
    int px = find(x);
    int py = find(y);
    
    if (px != py) {
        parent[px] = py;
    }
}

// 判断是否在同一集合
bool same(int x, int y) {
    return find(x) == find(y);
}
```

## 优化：按秩合并

```cpp
int parent[MAXN];
int rank_[MAXN];  // 树的深度

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        rank_[i] = 0;
    }
}

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

void unite(int x, int y) {
    int px = find(x);
    int py = find(y);
    
    if (px == py) return;
    
    // 按秩合并：深度小的树挂到深度大的树上
    if (rank_[px] < rank_[py]) {
        parent[px] = py;
    } else if (rank_[px] > rank_[py]) {
        parent[py] = px;
    } else {
        parent[py] = px;
        rank_[px]++;
    }
}
```

## 带权并查集

维护节点到根节点的距离：

```cpp
int parent[MAXN];
int dist[MAXN];  // 到父节点的距离

void init(int n) {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        dist[i] = 0;
    }
}

int find(int x) {
    if (parent[x] != x) {
        int root = find(parent[x]);
        dist[x] += dist[parent[x]];  // 更新到根的距离
        parent[x] = root;
    }
    return parent[x];
}

void unite(int x, int y, int d) {
    int px = find(x);
    int py = find(y);
    
    if (px != py) {
        parent[px] = py;
        dist[px] = dist[y] - dist[x] + d;
    }
}

int getDistance(int x, int y) {
    if (find(x) != find(y)) return -1;
    return dist[x] - dist[y];
}
```

## 经典应用

### 1. 连通性问题

```cpp
int main() {
    int n, m;
    cin >> n >> m;
    
    init(n);
    
    for (int i = 0; i < m; i++) {
        int op, x, y;
        cin >> op >> x >> y;
        
        if (op == 1) {
            unite(x, y);
        } else {
            if (same(x, y)) {
                cout << "YES" << endl;
            } else {
                cout << "NO" << endl;
            }
        }
    }
    
    return 0;
}
```

### 2. 朋友圈数量

```cpp
int findCircleNum(vector<vector<int>>& isConnected) {
    int n = isConnected.size();
    init(n);
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (isConnected[i][j]) {
                unite(i, j);
            }
        }
    }
    
    // 统计集合数量
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (find(i) == i) {
            count++;
        }
    }
    
    return count;
}
```

### 3. 最小生成树（Kruskal）

```cpp
struct Edge {
    int u, v, w;
    bool operator < (const Edge& other) const {
        return w < other.w;
    }
};

int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    init(n);
    
    int total = 0;
    int count = 0;
    
    for (Edge& e : edges) {
        if (!same(e.u, e.v)) {
            unite(e.u, e.v);
            total += e.w;
            count++;
            
            if (count == n - 1) break;
        }
    }
    
    return total;
}
```

### 4. 岛屿数量

```cpp
class Solution {
    int parent[100005];
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    void unite(int x, int y) {
        int px = find(x);
        int py = find(y);
        if (px != py) {
            parent[px] = py;
        }
    }
    
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        
        for (int i = 0; i < m * n; i++) {
            parent[i] = i;
        }
        
        int dx[] = {0, 1};
        int dy[] = {1, 0};
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    for (int k = 0; k < 2; k++) {
                        int ni = i + dx[k];
                        int nj = j + dy[k];
                        
                        if (ni < m && nj < n && grid[ni][nj] == '1') {
                            unite(i * n + j, ni * n + nj);
                        }
                    }
                }
            }
        }
        
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1' && find(i * n + j) == i * n + j) {
                    count++;
                }
            }
        }
        
        return count;
    }
};
```

### 5. 冗余连接

```cpp
vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    init(n);
    
    for (auto& edge : edges) {
        int u = edge[0], v = edge[1];
        
        if (same(u, v)) {
            return edge;  // 形成环的边
        }
        
        unite(u, v);
    }
    
    return {};
}
```

### 6. 食物链（种类并查集）

```cpp
// 0: 同类, 1: 吃, 2: 被吃
int parent[MAXN * 3];

void init(int n) {
    for (int i = 0; i <= 3 * n; i++) {
        parent[i] = i;
    }
}

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
    int n, k;
    cin >> n >> k;
    
    init(n);
    int lies = 0;
    
    for (int i = 0; i < k; i++) {
        int d, x, y;
        cin >> d >> x >> y;
        
        if (x > n || y > n) {
            lies++;
            continue;
        }
        
        if (d == 1) {  // x 和 y 是同类
            if (find(x) == find(y + n) || find(x) == find(y + 2 * n)) {
                lies++;
            } else {
                unite(x, y);
                unite(x + n, y + n);
                unite(x + 2 * n, y + 2 * n);
            }
        } else {  // x 吃 y
            if (x == y || find(x) == find(y) || find(x) == find(y + 2 * n)) {
                lies++;
            } else {
                unite(x, y + n);
                unite(x + n, y + 2 * n);
                unite(x + 2 * n, y);
            }
        }
    }
    
    cout << lies << endl;
    
    return 0;
}
```

## 复杂度分析

- **时间复杂度**：O(α(n))，α 是反阿克曼函数，增长极慢，可视为常数
- **空间复杂度**：O(n)

## 练习题

1. [洛谷 P3367 【模板】并查集](https://www.luogu.com.cn/problem/P3367)
2. [洛谷 P1551 亲戚](https://www.luogu.com.cn/problem/P1551)
3. [洛谷 P2024 食物链](https://www.luogu.com.cn/problem/P2024)
4. [LeetCode 547. 省份数量](https://leetcode.cn/problems/number-of-provinces/)
5. [LeetCode 684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)

## 总结

- 并查集用于处理集合合并和查询
- 路径压缩：find 时压缩路径
- 按秩合并：合并时优化树的深度
- 时间复杂度接近 O(1)
- 应用：连通性、最小生成树、种类并查集
