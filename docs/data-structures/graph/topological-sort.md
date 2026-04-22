# 拓扑排序

<DifficultyBadge level="medium" />

## 什么是拓扑排序？

拓扑排序是对**有向无环图（DAG）**的节点进行排序，使得对于每条边 (u, v)，u 在 v 之前。

```
图：        拓扑排序结果：
  1 → 2     1, 3, 2, 4
  ↓   ↓
  3 → 4
```

## 应用场景

- 任务调度（有依赖关系的任务）
- 课程选修计划
- 编译顺序
- 数据处理流程

## 算法一：Kahn 算法（BFS）

### 思路

1. 计算所有节点的入度
2. 将入度为 0 的节点加入队列
3. 依次取出节点，将其邻居的入度减 1
4. 如果邻居入度变为 0，加入队列

### 代码实现

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);
    
    // 构建图
    for (auto& e : edges) {
        int u = e[0], v = e[1];
        adj[u].push_back(v);
        inDegree[v]++;
    }
    
    // 入度为 0 的节点入队
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> result;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    // 如果结果节点数小于 n，说明有环
    if (result.size() != n) {
        return {};  // 无拓扑排序
    }
    
    return result;
}
```

## 算法二：DFS 算法

### 思路

1. 对图进行 DFS
2. 在回溯时将节点加入结果（后序遍历）
3. 最后反转结果

### 代码实现

```cpp
vector<int> topologicalSortDFS(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
    }
    
    vector<int> result;
    vector<int> visited(n, 0);  // 0: 未访问, 1: 访问中, 2: 已访问
    bool hasCycle = false;
    
    function<void(int)> dfs = [&](int u) {
        if (hasCycle) return;
        
        visited[u] = 1;  // 标记为访问中
        
        for (int v : adj[u]) {
            if (visited[v] == 1) {
                hasCycle = true;  // 发现环
                return;
            }
            if (visited[v] == 0) {
                dfs(v);
            }
        }
        
        visited[u] = 2;  // 标记为已访问
        result.push_back(u);  // 后序遍历加入结果
    };
    
    for (int i = 0; i < n; i++) {
        if (visited[i] == 0) {
            dfs(i);
        }
    }
    
    if (hasCycle) return {};
    
    reverse(result.begin(), result.end());
    return result;
}
```

## 经典应用

### 1. 课程表

```cpp
// 判断是否能完成所有课程
bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);
    
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        count++;
        
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    return count == numCourses;
}

// 返回课程学习顺序
vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);
    
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> result;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        result.push_back(u);
        
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    return result.size() == numCourses ? result : vector<int>();
}
```

### 2. 外星人字典

```cpp
string alienOrder(vector<string>& words) {
    // 构建图
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> inDegree;
    
    for (string& word : words) {
        for (char c : word) {
            inDegree[c] = 0;
        }
    }
    
    for (int i = 0; i < words.size() - 1; i++) {
        string& w1 = words[i];
        string& w2 = words[i + 1];
        
        int len = min(w1.size(), w2.size());
        bool found = false;
        
        for (int j = 0; j < len; j++) {
            if (w1[j] != w2[j]) {
                if (!adj[w1[j]].count(w2[j])) {
                    adj[w1[j]].insert(w2[j]);
                    inDegree[w2[j]]++;
                }
                found = true;
                break;
            }
        }
        
        // 检查前缀情况
        if (!found && w1.size() > w2.size()) {
            return "";
        }
    }
    
    // 拓扑排序
    queue<char> q;
    for (auto& [c, degree] : inDegree) {
        if (degree == 0) q.push(c);
    }
    
    string result;
    
    while (!q.empty()) {
        char c = q.front();
        q.pop();
        result += c;
        
        for (char next : adj[c]) {
            if (--inDegree[next] == 0) {
                q.push(next);
            }
        }
    }
    
    return result.size() == inDegree.size() ? result : "";
}
```

### 3. 最短路径（DAG）

```cpp
// DAG 上的单源最短路径
vector<int> shortestPathDAG(int n, vector<vector<int>>& edges, int start) {
    vector<vector<pair<int, int>>> adj(n);  // {to, weight}
    
    for (auto& e : edges) {
        adj[e[0]].push_back({e[1], e[2]});
    }
    
    // 拓扑排序
    vector<int> topo = topologicalSort(n, edges);
    
    vector<int> dist(n, INT_MAX);
    dist[start] = 0;
    
    for (int u : topo) {
        if (dist[u] == INT_MAX) continue;
        
        for (auto& [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    return dist;
}
```

### 4. 最长路径（DAG）

```cpp
// DAG 上的最长路径
int longestPathDAG(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);
    
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
        inDegree[e[1]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> dp(n, 1);  // 以 i 结尾的最长路径长度
    int maxLen = 1;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            dp[v] = max(dp[v], dp[u] + 1);
            maxLen = max(maxLen, dp[v]);
            
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    return maxLen;
}
```

## 检测环

```cpp
bool hasCycle(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> inDegree(n, 0);
    
    for (auto& e : edges) {
        adj[e[0]].push_back(e[1]);
        inDegree[e[1]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        count++;
        
        for (int v : adj[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }
    
    return count != n;  // 有环返回 true
}
```

## 练习题

1. [LeetCode 207. 课程表](https://leetcode.cn/problems/course-schedule/)
2. [LeetCode 210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii/)
3. [LeetCode 269. 火星词典](https://leetcode.cn/problems/alien-dictionary/)
4. [LeetCode 310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees/)
5. [LeetCode 1203. 项目管理](https://leetcode.cn/problems/sort-items-by-groups-respecting-dependencies/)
6. [洛谷 P1347 排序](https://www.luogu.com.cn/problem/P1347)

## 总结

- 拓扑排序针对 DAG（有向无环图）
- Kahn 算法：BFS，时间复杂度 O(V + E)
- DFS 算法：后序遍历反转，时间复杂度 O(V + E)
- 可用于检测环、任务调度、求最短/最长路径
