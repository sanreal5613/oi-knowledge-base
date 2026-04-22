# 图的遍历

<DifficultyBadge level="easy" />

## 图的遍历方法

图的遍历是从一个节点出发，访问图中所有可达节点的过程。

主要有两种方法：
- **DFS**（深度优先搜索）
- **BFS**（广度优先搜索）

## DFS 遍历

### 递归实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1e5 + 5;
vector<int> graph[MAXN];
bool visited[MAXN];
int n, m;

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";  // 访问节点
    
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);  // 无向图
    }
    
    cout << "DFS 遍历: ";
    dfs(1);
    cout << endl;
    
    return 0;
}
```

### 栈实现

```cpp
#include <stack>

void dfs(int start) {
    stack<int> st;
    st.push(start);
    visited[start] = true;
    
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        cout << u << " ";
        
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                st.push(v);
            }
        }
    }
}
```

## BFS 遍历

```cpp
#include <queue>

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        cout << u << " ";
        
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

## 遍历所有连通分量

```cpp
void traverseAll() {
    fill(visited, visited + n + 1, false);
    
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            cout << "连通分量: ";
            dfs(i);  // 或 bfs(i)
            cout << endl;
        }
    }
}
```

## 记录遍历路径

```cpp
int parent[MAXN];
vector<int> path;

void dfs(int u) {
    visited[u] = true;
    path.push_back(u);
    
    for (int v : graph[u]) {
        if (!visited[v]) {
            parent[v] = u;
            dfs(v);
        }
    }
}

void printPath(int u) {
    if (u == -1) return;
    printPath(parent[u]);
    cout << u << " ";
}
```

## 拓扑排序

对有向无环图（DAG）进行排序，使得对于每条边 (u, v)，u 在 v 之前。

### Kahn 算法（BFS）

```cpp
#include <queue>
#include <vector>
using namespace std;

vector<int> graph[MAXN];
int indegree[MAXN];
int n, m;

vector<int> topologicalSort() {
    queue<int> q;
    
    // 入度为 0 的节点入队
    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> result;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : graph[u]) {
            indegree[v]--;
            if (indegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    // 如果结果节点数不等于 n，说明有环
    if (result.size() != n) {
        return {};  // 无法拓扑排序
    }
    
    return result;
}

int main() {
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        indegree[v]++;
    }
    
    vector<int> order = topologicalSort();
    
    if (order.empty()) {
        cout << "图中有环，无法拓扑排序" << endl;
    } else {
        for (int u : order) {
            cout << u << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

### DFS 实现

```cpp
vector<int> graph[MAXN];
bool visited[MAXN];
bool onStack[MAXN];  // 用于检测环
vector<int> result;
bool hasCycle = false;

void dfs(int u) {
    visited[u] = true;
    onStack[u] = true;
    
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);
        } else if (onStack[v]) {
            hasCycle = true;  // 发现环
        }
    }
    
    onStack[u] = false;
    result.push_back(u);  // 后序遍历
}

vector<int> topologicalSort() {
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    if (hasCycle) return {};
    
    reverse(result.begin(), result.end());
    return result;
}
```

## 判断图中是否有环

### 无向图（并查集）

```cpp
int parent[MAXN];

int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

bool hasCycleUndirected() {
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
    }
    
    for (int u = 1; u <= n; u++) {
        for (int v : graph[u]) {
            if (u < v) {  // 避免重复检查
                int pu = find(u);
                int pv = find(v);
                
                if (pu == pv) {
                    return true;  // 发现环
                }
                
                parent[pu] = pv;
            }
        }
    }
    
    return false;
}
```

### 有向图（DFS）

```cpp
bool hasCycleDirected() {
    fill(visited, visited + n + 1, false);
    fill(onStack, onStack + n + 1, false);
    
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            if (dfsCheckCycle(i)) {
                return true;
            }
        }
    }
    
    return false;
}

bool dfsCheckCycle(int u) {
    visited[u] = true;
    onStack[u] = true;
    
    for (int v : graph[u]) {
        if (!visited[v]) {
            if (dfsCheckCycle(v)) {
                return true;
            }
        } else if (onStack[v]) {
            return true;  // 发现环
        }
    }
    
    onStack[u] = false;
    return false;
}
```

## 练习题

1. [洛谷 P3916 图的遍历](https://www.luogu.com.cn/problem/P3916)
2. [洛谷 P5318 【深基18.例3】查找文献](https://www.luogu.com.cn/problem/P5318)
3. [洛谷 P1347 排序](https://www.luogu.com.cn/problem/P1347)（拓扑排序）
4. [LeetCode 207. 课程表](https://leetcode.cn/problems/course-schedule/)

## 总结

- **DFS**：用栈或递归，适合找路径、检测环
- **BFS**：用队列，适合求最短路、拓扑排序
- **拓扑排序**：Kahn 算法（BFS）或 DFS
- **环检测**：并查集（无向图）、DFS（有向图）
- 遍历前记得初始化 visited 数组
