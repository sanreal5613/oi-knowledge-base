# priority_queue 优先队列

<DifficultyBadge level="easy" />

## 什么是优先队列？

优先队列（Priority Queue）是一种特殊的队列，每次出队的是**优先级最高**的元素。

```
普通队列：先进先出
优先队列：优先级高的先出
```

```cpp
#include <queue>
using namespace std;

priority_queue<int> pq;  // 默认大根堆（最大值优先）
```

## 基本操作

```cpp
priority_queue<int> pq;

// 入队
pq.push(3);
pq.push(1);
pq.push(4);
pq.push(2);

// 访问队头（最大值）
cout << pq.top() << endl;  // 4

// 出队
pq.pop();  // 移除 4

// 大小
cout << pq.size() << endl;  // 3

// 是否为空
cout << pq.empty() << endl;  // 0（false）
```

## 大根堆 vs 小根堆

### 大根堆（默认）

最大值优先：

```cpp
priority_queue<int> pq;  // 大根堆

pq.push(3);
pq.push(1);
pq.push(4);

cout << pq.top() << endl;  // 4（最大值）
```

### 小根堆

最小值优先：

```cpp
priority_queue<int, vector<int>, greater<int>> pq;  // 小根堆

pq.push(3);
pq.push(1);
pq.push(4);

cout << pq.top() << endl;  // 1（最小值）
```

## 自定义比较

### 结构体排序

```cpp
struct Node {
    int value;
    int priority;
    
    // 重载 < 运算符
    bool operator < (const Node& other) const {
        return priority < other.priority;  // 优先级大的先出
    }
};

priority_queue<Node> pq;

pq.push({10, 1});
pq.push({20, 3});
pq.push({30, 2});

cout << pq.top().value << endl;  // 20（优先级最高）
```

### 使用 Lambda

```cpp
auto cmp = [](int a, int b) { return a > b; };  // 小根堆
priority_queue<int, vector<int>, decltype(cmp)> pq(cmp);

pq.push(3);
pq.push(1);
pq.push(4);

cout << pq.top() << endl;  // 1
```

## 应用场景

### 1. 找第 K 大的元素

```cpp
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;  // 小根堆
    
    for (int num : nums) {
        pq.push(num);
        if (pq.size() > k) {
            pq.pop();  // 保持堆大小为 k
        }
    }
    
    return pq.top();
}

// [3, 2, 1, 5, 6, 4], k=2 → 5
```

### 2. 合并 K 个有序链表

```cpp
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;  // 小根堆
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
    
    for (ListNode* list : lists) {
        if (list) pq.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!pq.empty()) {
        ListNode* node = pq.top();
        pq.pop();
        
        tail->next = node;
        tail = tail->next;
        
        if (node->next) {
            pq.push(node->next);
        }
    }
    
    return dummy.next;
}
```

### 3. Dijkstra 最短路

```cpp
vector<int> dijkstra(int start, vector<vector<pair<int, int>>>& graph) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});  // {距离, 节点}
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}
```

### 4. 哈夫曼编码

```cpp
struct Node {
    int freq;
    Node *left, *right;
    
    Node(int f) : freq(f), left(nullptr), right(nullptr) {}
};

struct Compare {
    bool operator()(Node* a, Node* b) {
        return a->freq > b->freq;
    }
};

Node* buildHuffmanTree(vector<int>& freqs) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    
    for (int freq : freqs) {
        pq.push(new Node(freq));
    }
    
    while (pq.size() > 1) {
        Node* left = pq.top(); pq.pop();
        Node* right = pq.top(); pq.pop();
        
        Node* parent = new Node(left->freq + right->freq);
        parent->left = left;
        parent->right = right;
        
        pq.push(parent);
    }
    
    return pq.top();
}
```

### 5. 中位数维护

```cpp
class MedianFinder {
    priority_queue<int> maxHeap;  // 存较小的一半
    priority_queue<int, vector<int>, greater<int>> minHeap;  // 存较大的一半
    
public:
    void addNum(int num) {
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }
        
        // 平衡两个堆
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
        return maxHeap.top();
    }
};
```

## 底层实现

优先队列底层是**堆**（Heap）：

```cpp
// 手动实现大根堆
class MaxHeap {
    vector<int> heap;
    
    void heapifyUp(int i) {
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (heap[i] <= heap[parent]) break;
            swap(heap[i], heap[parent]);
            i = parent;
        }
    }
    
    void heapifyDown(int i) {
        int n = heap.size();
        while (2 * i + 1 < n) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int largest = i;
            
            if (left < n && heap[left] > heap[largest]) {
                largest = left;
            }
            if (right < n && heap[right] > heap[largest]) {
                largest = right;
            }
            
            if (largest == i) break;
            swap(heap[i], heap[largest]);
            i = largest;
        }
    }
    
public:
    void push(int x) {
        heap.push_back(x);
        heapifyUp(heap.size() - 1);
    }
    
    void pop() {
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
    }
    
    int top() {
        return heap[0];
    }
    
    bool empty() {
        return heap.empty();
    }
};
```

## 时间复杂度

| 操作 | 时间复杂度 |
|------|-----------|
| push | O(log n) |
| pop | O(log n) |
| top | O(1) |
| size | O(1) |
| empty | O(1) |

## 练习题

1. [LeetCode 215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)
2. [LeetCode 23. 合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
3. [LeetCode 295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)
4. [洛谷 P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378)

## 总结

- 优先队列每次出队优先级最高的元素
- 默认是大根堆（最大值优先）
- 小根堆：`priority_queue<int, vector<int>, greater<int>>`
- 底层是堆，push 和 pop 都是 O(log n)
- 应用：Top K、Dijkstra、哈夫曼编码、中位数维护
