# 队列的应用

<DifficultyBadge level="easy" />

## 什么是队列？

队列（Queue）是一种**先进先出**（FIFO, First In First Out）的线性数据结构。

```
入队：1 → 2 → 3

队尾           队首
  3    2    1  ← 最先入队，最先出队
              
出队顺序：1, 2, 3
```

## 队列的基本操作

| 操作 | 说明 | 时间复杂度 |
|------|------|-----------|
| push / enqueue | 入队 | O(1) |
| pop / dequeue | 出队 | O(1) |
| front | 查看队首 | O(1) |
| back | 查看队尾 | O(1) |
| empty | 判断是否为空 | O(1) |

## C++ 队列的实现

### 使用 STL queue

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // 入队
    q.push(1);
    q.push(2);
    q.push(3);
    
    // 查看队首和队尾
    cout << "队首: " << q.front() << endl;  // 1
    cout << "队尾: " << q.back() << endl;   // 3
    
    // 出队
    q.pop();
    cout << "队首: " << q.front() << endl;  // 2
    
    // 大小
    cout << "大小: " << q.size() << endl;   // 2
    
    return 0;
}
```

### 数组模拟队列

```cpp
const int MAXN = 100005;
int queue[MAXN];
int head = 0;  // 队首
int tail = 0;  // 队尾（下一个插入位置）

// 入队
void push(int x) {
    queue[tail++] = x;
}

// 出队
void pop() {
    if (head < tail) head++;
}

// 查看队首
int front() {
    return queue[head];
}

// 判断是否为空
bool empty() {
    return head == tail;
}

// 大小
int size() {
    return tail - head;
}
```

## 经典应用

### 1. BFS 广度优先搜索

```cpp
#include <queue>
#include <vector>
using namespace std;

vector<int> adj[1005];
bool visited[1005];

void bfs(int start) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        cout << u << " ";  // 访问节点
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

### 2. 滑动窗口最大值

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;  // 存储索引，保持递减
    
    for (int i = 0; i < nums.size(); i++) {
        // 移除窗口外的元素
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // 保持递减：移除所有小于当前元素的
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // 记录结果
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

### 3. 任务调度

```cpp
class TaskScheduler {
    queue<pair<int, int>> tasks;  // {任务ID, 执行时间}
    
public:
    void addTask(int id, int time) {
        tasks.push({id, time});
    }
    
    void run() {
        while (!tasks.empty()) {
            auto [id, time] = tasks.front();
            tasks.pop();
            
            cout << "执行任务 " << id << ", 耗时 " << time << endl;
            
            // 模拟执行...
        }
    }
};
```

### 4. 打印二叉树

```cpp
struct TreeNode {
    int val;
    TreeNode *left, *right;
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        vector<int> level;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            
            level.push_back(node->val);
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        
        result.push_back(level);
    }
    
    return result;
}
```

## 双端队列 deque

```cpp
#include <deque>

deque<int> dq;

// 队首操作
dq.push_front(1);  // 队首入队
dq.pop_front();    // 队首出队
int f = dq.front(); // 查看队首

// 队尾操作
dq.push_back(2);   // 队尾入队
dq.pop_back();     // 队尾出队
int b = dq.back();  // 查看队尾
```

## 优先队列（见 STL 章节）

```cpp
#include <queue>

// 大根堆
priority_queue<int> pq;

// 小根堆
priority_queue<int, vector<int>, greater<int>> minPQ;
```

## 练习题

1. [LeetCode 933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/)
2. [LeetCode 239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)
3. [LeetCode 102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
4. [洛谷 P1996 约瑟夫问题](https://www.luogu.com.cn/problem/P1996)

## 总结

- 队列是先进先出（FIFO）的数据结构
- 基本操作：push、pop、front 都是 O(1)
- 经典应用：BFS、任务调度、滑动窗口
- 双端队列 deque 支持两端操作
- 优先队列用于堆相关操作
