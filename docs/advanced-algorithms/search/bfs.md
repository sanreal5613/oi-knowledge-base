# 广度优先搜索（BFS）

<DifficultyBadge level="medium" />

## 什么是 BFS？

广度优先搜索（Breadth-First Search）是一种**逐层扩展**的搜索算法。

```
想象水波纹：
- 从起点开始
- 一圈一圈向外扩散
- 先访问距离近的，再访问距离远的
```

<AlgorithmCard 
  title="广度优先搜索"
  description="队列实现，逐层扩展搜索"
  timeComplexity="O(V + E)"
  spaceComplexity="O(V)"
/>

## 基本框架

```cpp
#include <queue>
using namespace std;

bool visited[MAXN];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        // 处理当前节点
        cout << u << " ";
        
        // 遍历所有邻接节点
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

## 经典应用

### 1. 最短路径（无权图）

```cpp
int dist[MAXN];

void bfs(int start) {
    queue<int> q;
    fill(dist, dist + MAXN, -1);
    
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : graph[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}

int main() {
    // 读入图...
    
    bfs(1);
    
    for (int i = 1; i <= n; i++) {
        cout << "到节点 " << i << " 的距离: " << dist[i] << endl;
    }
    
    return 0;
}
```

### 2. 迷宫最短路

```cpp
struct Point {
    int x, y, dist;
};

int bfs(int sx, int sy, int ex, int ey) {
    char maze[105][105];
    bool visited[105][105] = {false};
    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};
    
    queue<Point> q;
    q.push({sx, sy, 0});
    visited[sx][sy] = true;
    
    while (!q.empty()) {
        Point p = q.front();
        q.pop();
        
        if (p.x == ex && p.y == ey) {
            return p.dist;
        }
        
        for (int i = 0; i < 4; i++) {
            int nx = p.x + dx[i];
            int ny = p.y + dy[i];
            
            if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
                maze[nx][ny] != '#' && !visited[nx][ny]) {
                visited[nx][ny] = true;
                q.push({nx, ny, p.dist + 1});
            }
        }
    }
    
    return -1;  // 无法到达
}
```

### 3. 层序遍历二叉树

```cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void levelOrder(TreeNode* root) {
    if (!root) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int size = q.size();
        
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            cout << node->val << " ";
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << endl;
    }
}
```

### 4. 01 矩阵最近距离

```cpp
vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
    int m = mat.size(), n = mat[0].size();
    vector<vector<int>> dist(m, vector<int>(n, -1));
    queue<pair<int, int>> q;
    
    // 所有 0 入队
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (mat[i][j] == 0) {
                dist[i][j] = 0;
                q.push({i, j});
            }
        }
    }
    
    int dx[] = {0, 0, 1, -1};
    int dy[] = {1, -1, 0, 0};
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    
    return dist;
}
```

### 5. 单词接龙

```cpp
int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    if (!dict.count(endWord)) return 0;
    
    queue<pair<string, int>> q;
    q.push({beginWord, 1});
    
    while (!q.empty()) {
        auto [word, level] = q.front();
        q.pop();
        
        if (word == endWord) return level;
        
        for (int i = 0; i < word.size(); i++) {
            string next = word;
            for (char c = 'a'; c <= 'z'; c++) {
                next[i] = c;
                if (dict.count(next)) {
                    q.push({next, level + 1});
                    dict.erase(next);  // 标记已访问
                }
            }
        }
    }
    
    return 0;
}
```

### 6. 拓扑排序

```cpp
vector<int> topologicalSort(int n, vector<vector<int>>& graph) {
    vector<int> indegree(n, 0);
    
    // 计算入度
    for (int u = 0; u < n; u++) {
        for (int v : graph[u]) {
            indegree[v]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < n; i++) {
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
    
    if (result.size() != n) {
        return {};  // 有环
    }
    
    return result;
}
```

### 7. 多源 BFS

```cpp
// 从多个起点同时开始 BFS
void multiBFS(vector<int>& sources) {
    queue<int> q;
    bool visited[MAXN] = {false};
    
    // 所有起点入队
    for (int s : sources) {
        q.push(s);
        visited[s] = true;
    }
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

## 双向 BFS

从起点和终点同时搜索，相遇时结束：

```cpp
int bidirectionalBFS(int start, int end) {
    if (start == end) return 0;
    
    unordered_set<int> q1, q2;
    unordered_set<int> visited1, visited2;
    
    q1.insert(start);
    q2.insert(end);
    visited1.insert(start);
    visited2.insert(end);
    
    int level = 0;
    
    while (!q1.empty() && !q2.empty()) {
        // 优化：总是扩展较小的集合
        if (q1.size() > q2.size()) {
            swap(q1, q2);
            swap(visited1, visited2);
        }
        
        unordered_set<int> next;
        level++;
        
        for (int u : q1) {
            for (int v : graph[u]) {
                if (visited2.count(v)) {
                    return level;  // 相遇
                }
                
                if (!visited1.count(v)) {
                    visited1.insert(v);
                    next.insert(v);
                }
            }
        }
        
        q1 = next;
    }
    
    return -1;
}
```

## BFS 优化

### 1. 优先队列 BFS（Dijkstra）

```cpp
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
pq.push({0, start});  // {距离, 节点}
```

### 2. 双端队列 BFS（0-1 BFS）

```cpp
deque<int> dq;
dq.push_front(u);  // 边权为 0
dq.push_back(v);   // 边权为 1
```

## 练习题

1. [洛谷 P1443 马的遍历](https://www.luogu.com.cn/problem/P1443)
2. [LeetCode 102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
3. [LeetCode 542. 01 矩阵](https://leetcode.cn/problems/01-matrix/)
4. [LeetCode 127. 单词接龙](https://leetcode.cn/problems/word-ladder/)
5. [LeetCode 207. 课程表](https://leetcode.cn/problems/course-schedule/)（拓扑排序）

## 总结

- BFS 逐层扩展，用队列实现
- 保证找到最短路径（无权图）
- 应用：最短路、层序遍历、拓扑排序
- 多源 BFS：多个起点同时搜索
- 双向 BFS：从两端同时搜索，优化搜索空间
