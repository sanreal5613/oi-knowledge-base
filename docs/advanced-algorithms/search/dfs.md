# 深度优先搜索（DFS）

<DifficultyBadge level="medium" />

## 什么是 DFS？

深度优先搜索（Depth-First Search）是一种**沿着一条路径走到底，再回溯**的搜索算法。

```
想象走迷宫：
- 选择一个方向一直走
- 走到死路就退回上一个岔路口
- 换另一个方向继续走
```

<AlgorithmCard 
  title="深度优先搜索"
  description="递归或栈实现，沿着路径深入搜索"
  timeComplexity="O(V + E)"
  spaceComplexity="O(V)"
/>

## 基本框架

### 递归实现

```cpp
bool visited[MAXN];

void dfs(int u) {
    visited[u] = true;
    
    // 处理当前节点
    cout << u << " ";
    
    // 遍历所有邻接节点
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}
```

### 栈实现

```cpp
void dfs(int start) {
    stack<int> st;
    bool visited[MAXN] = {false};
    
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

## 经典应用

### 1. 图的遍历

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> graph[1005];
bool visited[1005];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    
    for (int v : graph[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }
    
    dfs(1);
    
    return 0;
}
```

### 2. 连通分量

```cpp
int component[MAXN];
int comp_count = 0;

void dfs(int u, int comp_id) {
    component[u] = comp_id;
    
    for (int v : graph[u]) {
        if (component[v] == 0) {
            dfs(v, comp_id);
        }
    }
}

int main() {
    // 读入图...
    
    for (int i = 1; i <= n; i++) {
        if (component[i] == 0) {
            comp_count++;
            dfs(i, comp_count);
        }
    }
    
    cout << "连通分量数: " << comp_count << endl;
    
    return 0;
}
```

### 3. 路径搜索

```cpp
vector<int> path;
bool found = false;

void dfs(int u, int target) {
    if (found) return;
    
    path.push_back(u);
    
    if (u == target) {
        found = true;
        for (int x : path) {
            cout << x << " ";
        }
        cout << endl;
        return;
    }
    
    for (int v : graph[u]) {
        if (find(path.begin(), path.end(), v) == path.end()) {
            dfs(v, target);
            if (found) return;
        }
    }
    
    path.pop_back();  // 回溯
}
```

### 4. 全排列

```cpp
int arr[10];
bool used[10];
int n;

void dfs(int depth) {
    if (depth == n) {
        for (int i = 0; i < n; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
        return;
    }
    
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            arr[depth] = i;
            used[i] = true;
            dfs(depth + 1);
            used[i] = false;  // 回溯
        }
    }
}

int main() {
    cin >> n;
    dfs(0);
    return 0;
}
```

### 5. 迷宫问题

```cpp
char maze[105][105];
bool visited[105][105];
int n, m;

int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

bool dfs(int x, int y) {
    if (x == n - 1 && y == m - 1) {
        return true;  // 到达终点
    }
    
    visited[x][y] = true;
    
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i];
        int ny = y + dy[i];
        
        if (nx >= 0 && nx < n && ny >= 0 && ny < m &&
            maze[nx][ny] != '#' && !visited[nx][ny]) {
            if (dfs(nx, ny)) {
                return true;
            }
        }
    }
    
    return false;
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        cin >> maze[i];
    }
    
    if (dfs(0, 0)) {
        cout << "找到路径" << endl;
    } else {
        cout << "无路径" << endl;
    }
    
    return 0;
}
```

### 6. N 皇后问题

```cpp
int n;
int col[20];  // col[i] 表示第 i 行皇后放在第几列
int count = 0;

bool isValid(int row, int c) {
    for (int i = 0; i < row; i++) {
        // 同列或对角线
        if (col[i] == c || abs(i - row) == abs(col[i] - c)) {
            return false;
        }
    }
    return true;
}

void dfs(int row) {
    if (row == n) {
        count++;
        return;
    }
    
    for (int c = 0; c < n; c++) {
        if (isValid(row, c)) {
            col[row] = c;
            dfs(row + 1);
        }
    }
}

int main() {
    cin >> n;
    dfs(0);
    cout << count << endl;
    return 0;
}
```

### 7. 子集和问题

```cpp
int arr[20], n, target;
vector<int> current;

void dfs(int index, int sum) {
    if (sum == target) {
        for (int x : current) {
            cout << x << " ";
        }
        cout << endl;
        return;
    }
    
    if (index == n || sum > target) {
        return;
    }
    
    // 选择 arr[index]
    current.push_back(arr[index]);
    dfs(index + 1, sum + arr[index]);
    current.pop_back();
    
    // 不选择 arr[index]
    dfs(index + 1, sum);
}

int main() {
    cin >> n >> target;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    dfs(0, 0);
    
    return 0;
}
```

## 剪枝优化

### 1. 可行性剪枝

```cpp
void dfs(int depth, int sum) {
    if (sum > target) return;  // 超过目标，剪枝
    
    // ...
}
```

### 2. 最优性剪枝

```cpp
int best_ans = INT_MAX;

void dfs(int depth, int current) {
    if (current >= best_ans) return;  // 不可能更优，剪枝
    
    // ...
}
```

### 3. 记忆化搜索

```cpp
int memo[MAXN];

int dfs(int u) {
    if (memo[u] != -1) return memo[u];
    
    // 计算...
    
    return memo[u] = result;
}
```

## DFS vs BFS

| 特点 | DFS | BFS |
|------|-----|-----|
| 实现 | 递归/栈 | 队列 |
| 空间 | O(h)（深度） | O(w)（宽度） |
| 最短路 | 不保证 | 保证 |
| 应用 | 路径搜索、回溯 | 最短路、层序遍历 |

## 练习题

1. [洛谷 P1596 湖计数](https://www.luogu.com.cn/problem/P1596)
2. [洛谷 P1219 八皇后](https://www.luogu.com.cn/problem/P1219)
3. [LeetCode 200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)
4. [LeetCode 46. 全排列](https://leetcode.cn/problems/permutations/)
5. [LeetCode 39. 组合总和](https://leetcode.cn/problems/combination-sum/)

## 总结

- DFS 沿着一条路径走到底，再回溯
- 递归实现简洁，栈实现避免爆栈
- 应用：图遍历、路径搜索、全排列、N 皇后
- 优化：剪枝、记忆化
- 回溯是 DFS 的核心思想
