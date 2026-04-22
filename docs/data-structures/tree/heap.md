# 堆 (Heap)

<DifficultyBadge level="medium" />

## 什么是堆？

堆是一种特殊的完全二叉树，满足堆性质：
- **大根堆**：父节点的值 ≥ 子节点的值
- **小根堆**：父节点的值 ≤ 子节点的值

```
大根堆：              小根堆：
      9                    1
     / \                  / \
    8   7                3   2
   / \ / \              / \ / \
  4  5 6  3            5  4 6  7
```

## 堆的性质

- 是完全二叉树，可用数组存储
- 堆顶元素是最大/最小值
- 对于节点 i：
  - 左子节点：2*i + 1
  - 右子节点：2*i + 2
  - 父节点：(i-1)/2

## 堆的基本操作

### 上浮（Shift Up）

```cpp
void shiftUp(vector<int>& heap, int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] >= heap[i]) break;  // 大根堆
        swap(heap[parent], heap[i]);
        i = parent;
    }
}
```

### 下沉（Shift Down）

```cpp
void shiftDown(vector<int>& heap, int n, int i) {
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
```

### 建堆

```cpp
// O(n) 建堆
void buildHeap(vector<int>& heap) {
    int n = heap.size();
    for (int i = n / 2 - 1; i >= 0; i--) {
        shiftDown(heap, n, i);
    }
}
```

### 插入

```cpp
void push(vector<int>& heap, int val) {
    heap.push_back(val);
    shiftUp(heap, heap.size() - 1);
}
```

### 删除堆顶

```cpp
void pop(vector<int>& heap) {
    if (heap.empty()) return;
    
    heap[0] = heap.back();
    heap.pop_back();
    
    if (!heap.empty()) {
        shiftDown(heap, heap.size(), 0);
    }
}

int top(vector<int>& heap) {
    return heap.empty() ? -1 : heap[0];
}
```

## C++ STL 优先队列

```cpp
#include <queue>

// 大根堆（默认）
priority_queue<int> maxHeap;

// 小根堆
priority_queue<int, vector<int>, greater<int>> minHeap;

// 基本操作
maxHeap.push(3);        // 插入
int top = maxHeap.top(); // 查看堆顶
maxHeap.pop();          // 删除堆顶
int size = maxHeap.size(); // 大小
bool empty = maxHeap.empty(); // 是否为空
```

## 堆排序

```cpp
void heapSort(vector<int>& nums) {
    int n = nums.size();
    
    // 建堆
    for (int i = n / 2 - 1; i >= 0; i--) {
        shiftDown(nums, n, i);
    }
    
    // 排序
    for (int i = n - 1; i > 0; i--) {
        swap(nums[0], nums[i]);
        shiftDown(nums, i, 0);
    }
}
```

## 经典应用

### 1. Top K 问题

```cpp
// 找数组中第 K 大的元素
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    return minHeap.top();
}
```

### 2. 数据流的中位数

```cpp
class MedianFinder {
    priority_queue<int> maxHeap;  // 存储较小的一半
    priority_queue<int, vector<int>, greater<int>> minHeap;  // 存储较大的一半
    
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

### 3. 合并 K 个有序链表

```cpp
struct ListNode {
    int val;
    ListNode* next;
};

struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;  // 小根堆
    }
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;
    
    for (ListNode* list : lists) {
        if (list) minHeap.push(list);
    }
    
    ListNode dummy(0);
    ListNode* tail = &dummy;
    
    while (!minHeap.empty()) {
        ListNode* node = minHeap.top();
        minHeap.pop();
        
        tail->next = node;
        tail = node;
        
        if (node->next) {
            minHeap.push(node->next);
        }
    }
    
    return dummy.next;
}
```

### 4. 任务调度器

```cpp
int leastInterval(vector<char>& tasks, int n) {
    vector<int> count(26);
    for (char c : tasks) {
        count[c - 'A']++;
    }
    
    priority_queue<int> maxHeap;
    for (int c : count) {
        if (c > 0) maxHeap.push(c);
    }
    
    int time = 0;
    
    while (!maxHeap.empty()) {
        vector<int> temp;
        
        for (int i = 0; i <= n; i++) {
            if (!maxHeap.empty()) {
                temp.push_back(maxHeap.top() - 1);
                maxHeap.pop();
            }
        }
        
        for (int t : temp) {
            if (t > 0) maxHeap.push(t);
        }
        
        time += maxHeap.empty() ? temp.size() : n + 1;
    }
    
    return time;
}
```

## 练习题

1. [LeetCode 215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)
2. [LeetCode 295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)
3. [LeetCode 23. 合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)
4. [LeetCode 347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)
5. [LeetCode 621. 任务调度器](https://leetcode.cn/problems/task-scheduler/)
6. [洛谷 P3378 【模板】堆](https://www.luogu.com.cn/problem/P3378)

## 总结

- 堆是完全二叉树，满足堆性质
- 大根堆：父 ≥ 子；小根堆：父 ≤ 子
- 核心操作：上浮、下沉
- 时间复杂度：插入 O(log n)，查询堆顶 O(1)，删除堆顶 O(log n)
- 经典应用：Top K、中位数、合并有序序列
