# queue 队列

<DifficultyBadge level="easy" />

## 什么是队列？

队列（Queue）是一种**先进先出**（FIFO - First In First Out）的数据结构。

```
想象排队买票：
- 从队尾入队（push）
- 从队头出队（pop）
- 先来的人先买到票
```

```cpp
#include <queue>
using namespace std;

queue<int> q;
```

## 基本操作

```cpp
queue<int> q;

// 入队
q.push(1);
q.push(2);
q.push(3);
// 队列：前 [1, 2, 3] 后

// 访问队头
cout << q.front() << endl;  // 1

// 访问队尾
cout << q.back() << endl;   // 3

// 出队
q.pop();  // 移除 1
// 队列：前 [2, 3] 后

// 大小
cout << q.size() << endl;  // 2

// 是否为空
cout << q.empty() << endl;  // 0（false）
```

::: warning 注意
- `pop()` 不返回值，只删除队头元素
- 访问队头用 `front()`，队尾用 `back()`
- 空队列调用 `front()`、`back()` 或 `pop()` 会出错
:::

## 遍历队列

队列不支持直接遍历，需要边弹出边访问：

```cpp
queue<int> q;
q.push(1);
q.push(2);
q.push(3);

// 遍历（会清空队列）
while (!q.empty()) {
    cout << q.front() << " ";
    q.pop();
}
// 输出：1 2 3
```

## 应用场景

### 1. 广度优先搜索（BFS）

```cpp
void bfs(int start, vector<vector<int>>& graph) {
    int n = graph.size();
    vector<bool> visited(n, false);
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

### 2. 层序遍历二叉树

```cpp
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

### 3. 滑动窗口最大值（双端队列）

```cpp
#include <deque>

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // 存储下标
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        // 移除窗口外的元素
        if (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        
        // 移除比当前元素小的元素
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

### 4. 任务调度

```cpp
struct Task {
    int id;
    int priority;
};

void processTasks() {
    queue<Task> taskQueue;
    
    // 添加任务
    taskQueue.push({1, 1});
    taskQueue.push({2, 2});
    taskQueue.push({3, 1});
    
    // 处理任务
    while (!taskQueue.empty()) {
        Task task = taskQueue.front();
        taskQueue.pop();
        
        cout << "处理任务 " << task.id << endl;
    }
}
```

## 双端队列（deque）

`deque` 支持两端插入和删除：

```cpp
#include <deque>

deque<int> dq;

// 队头操作
dq.push_front(1);  // 队头插入
dq.pop_front();    // 队头删除
dq.front();        // 访问队头

// 队尾操作
dq.push_back(2);   // 队尾插入
dq.pop_back();     // 队尾删除
dq.back();         // 访问队尾

// 随机访问
dq[0] = 10;        // 像数组一样访问
```

## 手动实现队列

### 数组实现（循环队列）

```cpp
class Queue {
    int arr[1000];
    int frontIndex, rearIndex;
    int count;
    
public:
    Queue() : frontIndex(0), rearIndex(0), count(0) {}
    
    void push(int x) {
        arr[rearIndex] = x;
        rearIndex = (rearIndex + 1) % 1000;
        count++;
    }
    
    void pop() {
        if (!empty()) {
            frontIndex = (frontIndex + 1) % 1000;
            count--;
        }
    }
    
    int front() {
        return arr[frontIndex];
    }
    
    int back() {
        return arr[(rearIndex - 1 + 1000) % 1000];
    }
    
    bool empty() {
        return count == 0;
    }
    
    int size() {
        return count;
    }
};
```

### 链表实现

```cpp
struct Node {
    int val;
    Node* next;
    Node(int x) : val(x), next(nullptr) {}
};

class Queue {
    Node *frontNode, *rearNode;
    int count;
    
public:
    Queue() : frontNode(nullptr), rearNode(nullptr), count(0) {}
    
    void push(int x) {
        Node* newNode = new Node(x);
        if (empty()) {
            frontNode = rearNode = newNode;
        } else {
            rearNode->next = newNode;
            rearNode = newNode;
        }
        count++;
    }
    
    void pop() {
        if (!empty()) {
            Node* temp = frontNode;
            frontNode = frontNode->next;
            delete temp;
            count--;
            if (empty()) {
                rearNode = nullptr;
            }
        }
    }
    
    int front() {
        return frontNode->val;
    }
    
    int back() {
        return rearNode->val;
    }
    
    bool empty() {
        return count == 0;
    }
    
    int size() {
        return count;
    }
};
```

## queue vs stack

| 特点 | queue | stack |
|------|-------|-------|
| 顺序 | 先进先出（FIFO） | 后进先出（LIFO） |
| 操作端 | 两端 | 一端 |
| 应用 | BFS、任务调度 | DFS、括号匹配 |

## 练习题

1. [洛谷 P1540 机器翻译](https://www.luogu.com.cn/problem/P1540)
2. [LeetCode 933. 最近的请求次数](https://leetcode.cn/problems/number-of-recent-calls/)
3. [LeetCode 102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
4. [LeetCode 239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)（双端队列）

## 总结

- 队列是先进先出（FIFO）的数据结构
- 主要操作：push、pop、front、back、empty、size
- 应用：BFS、层序遍历、任务调度
- deque 支持两端操作
- 空队列不能 pop、front 或 back
