# 剪枝优化

<DifficultyBadge level="medium" />

## 什么是剪枝？

剪枝是在搜索过程中**提前终止不可能产生最优解的分支**，从而提高效率的优化技术。

```
搜索树：
        根
       / | \
      A  B  C
     /|    |
    D E    F

剪枝：如果发现分支 B 不可能得到最优解，直接剪掉，不搜索 B 的子树
```

## 常见剪枝策略

### 1. 可行性剪枝

如果当前状态已经不满足条件，直接返回。

```cpp
void dfs(int depth, int sum) {
    if (sum > target) return;  // 已经超过目标，剪枝
    
    if (depth == n) {
        // 处理答案
        return;
    }
    
    // 继续搜索...
}
```

### 2. 最优性剪枝

如果当前状态不可能比已知最优解更好，直接返回。

```cpp
int best_ans = INT_MAX;

void dfs(int depth, int current) {
    if (current >= best_ans) return;  // 不可能更优，剪枝
    
    if (depth == n) {
        best_ans = min(best_ans, current);
        return;
    }
    
    // 继续搜索...
}
```

### 3. 记忆化搜索

记录已经计算过的状态，避免重复计算。

```cpp
int memo[MAXN];

int dfs(int u) {
    if (memo[u] != -1) return memo[u];  // 已计算过
    
    // 计算...
    
    return memo[u] = result;
}
```

### 4. 顺序剪枝

优先搜索更可能产生最优解的分支。

```cpp
void dfs(int depth) {
    // 按某种顺序排序后再搜索
    sort(options.begin(), options.end(), cmp);
    
    for (auto& opt : options) {
        // 优先搜索更优的选项
        dfs(depth + 1);
    }
}
```

### 5. 上下界剪枝

利用问题的上下界进行剪枝。

```cpp
void dfs(int depth, int current, int remaining) {
    // 即使剩下的全选，也无法超过目标
    if (current + remaining < target) return;
    
    // 已经超过目标
    if (current > target) return;
    
    // 继续搜索...
}
```

## 经典例题

### 例题 1：N 皇后（优化版）

```cpp
int n;
int col[20];  // col[i] 表示第 i 行皇后在第几列
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
        // 可行性剪枝
        if (!isValid(row, c)) continue;
        
        col[row] = c;
        dfs(row + 1);
    }
}
```

### 例题 2：子集和问题

```cpp
int arr[20], n, target;
int best = INT_MAX;

void dfs(int index, int sum, int remaining) {
    // 最优性剪枝
    if (sum >= best) return;
    
    // 可行性剪枝
    if (sum > target) return;
    
    // 上下界剪枝
    if (sum + remaining < target) return;
    
    if (sum == target) {
        best = sum;
        return;
    }
    
    if (index == n) return;
    
    // 顺序剪枝：先选大的
    // 需要预先排序
    
    // 选 arr[index]
    dfs(index + 1, sum + arr[index], remaining - arr[index]);
    
    // 不选 arr[index]
    dfs(index + 1, sum, remaining - arr[index]);
}

int main() {
    cin >> n >> target;
    
    int total = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        total += arr[i];
    }
    
    // 顺序剪枝：从大到小排序
    sort(arr, arr + n, greater<int>());
    
    dfs(0, 0, total);
    
    cout << best << endl;
    
    return 0;
}
```

### 例题 3：旅行商问题（TSP）

```cpp
int n;
int dist[20][20];
int best = INT_MAX;
int min_edge[20];

void dfs(int u, int count, int cost, int visited) {
    // 最优性剪枝
    if (cost >= best) return;
    
    if (count == n) {
        best = min(best, cost + dist[u][0]);  // 回到起点
        return;
    }
    
    // 下界剪枝：即使走最短的边，也无法更优
    int lower_bound = cost;
    for (int i = 0; i < n; i++) {
        if (!(visited >> i & 1)) {
            lower_bound += min_edge[i];
        }
    }
    if (lower_bound >= best) return;
    
    for (int v = 0; v < n; v++) {
        if (!(visited >> v & 1)) {
            dfs(v, count + 1, cost + dist[u][v], visited | (1 << v));
        }
    }
}

int main() {
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }
    
    // 预处理每个点的最小出边
    for (int i = 0; i < n; i++) {
        min_edge[i] = INT_MAX;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                min_edge[i] = min(min_edge[i], dist[i][j]);
            }
        }
    }
    
    dfs(0, 1, 0, 1);
    
    cout << best << endl;
    
    return 0;
}
```

### 例题 4：数独求解

```cpp
int grid[9][9];
bool row[9][10], col[9][10], box[9][10];

int getBox(int i, int j) {
    return (i / 3) * 3 + j / 3;
}

void dfs(int pos) {
    if (pos == 81) {
        // 找到解
        printGrid();
        return;
    }
    
    int i = pos / 9, j = pos % 9;
    
    if (grid[i][j] != 0) {
        dfs(pos + 1);
        return;
    }
    
    // 可行性剪枝：只尝试合法的数字
    for (int num = 1; num <= 9; num++) {
        if (!row[i][num] && !col[j][num] && !box[getBox(i, j)][num]) {
            grid[i][j] = num;
            row[i][num] = col[j][num] = box[getBox(i, j)][num] = true;
            
            dfs(pos + 1);
            
            grid[i][j] = 0;
            row[i][num] = col[j][num] = box[getBox(i, j)][num] = false;
        }
    }
}
```

## 剪枝技巧总结

| 技巧 | 适用场景 | 效果 |
|------|---------|------|
| 可行性剪枝 | 状态不满足条件 | 避免无效搜索 |
| 最优性剪枝 | 当前状态不可能最优 | 大幅剪枝 |
| 记忆化 | 重复子问题 | 避免重复计算 |
| 顺序剪枝 | 有优先级 | 更快找到优解 |
| 上下界 | 有明确界限 | 提前终止 |

## 练习题

1. [洛谷 P1219 八皇后](https://www.luogu.com.cn/problem/P1219)
2. [洛谷 P1048 采药](https://www.luogu.com.cn/problem/P1048)（剪枝优化）
3. [洛谷 P1434 滑雪](https://www.luogu.com.cn/problem/P1434)（记忆化）
4. [LeetCode 37. 解数独](https://leetcode.cn/problems/sudoku-solver/)

## 总结

- 剪枝是搜索算法的核心优化手段
- 关键是找到合适的剪枝条件
- 剪枝条件越强，效率越高，但实现越复杂
- 常用剪枝：可行性、最优性、记忆化、顺序、上下界
- 实际应用中往往需要多种剪枝结合
