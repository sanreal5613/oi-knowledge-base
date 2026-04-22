# 链表

<DifficultyBadge level="easy" />

## 什么是链表？

链表是一种**线性数据结构**，元素通过**指针**连接，不要求连续内存。

```
数组：[1, 2, 3, 4, 5]  // 连续内存
链表：1 -> 2 -> 3 -> 4 -> 5  // 非连续，通过指针连接
```

## 节点结构

```cpp
struct Node {
    int data;       // 数据
    Node* next;     // 指向下一个节点的指针
    
    Node(int x) : data(x), next(nullptr) {}
};
```

## 基本操作

### 创建链表

```cpp
// 头插法
Node* createList(vector<int>& arr) {
    Node* head = nullptr;
    
    for (int x : arr) {
        Node* newNode = new Node(x);
        newNode->next = head;
        head = newNode;
    }
    
    return head;
}

// 尾插法
Node* createListTail(vector<int>& arr) {
    Node* head = nullptr;
    Node* tail = nullptr;
    
    for (int x : arr) {
        Node* newNode = new Node(x);
        
        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }
    
    return head;
}
```

### 遍历链表

```cpp
void printList(Node* head) {
    Node* cur = head;
    
    while (cur) {
        cout << cur->data << " -> ";
        cur = cur->next;
    }
    cout << "null" << endl;
}
```

### 插入节点

```cpp
// 在位置 pos 插入（0-indexed）
Node* insert(Node* head, int pos, int val) {
    Node* newNode = new Node(val);
    
    if (pos == 0) {
        newNode->next = head;
        return newNode;
    }
    
    Node* cur = head;
    for (int i = 0; i < pos - 1 && cur; i++) {
        cur = cur->next;
    }
    
    if (!cur) return head;  // 位置无效
    
    newNode->next = cur->next;
    cur->next = newNode;
    
    return head;
}
```

### 删除节点

```cpp
// 删除位置 pos 的节点
Node* remove(Node* head, int pos) {
    if (!head || pos < 0) return head;
    
    if (pos == 0) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return head;
    }
    
    Node* cur = head;
    for (int i = 0; i < pos - 1 && cur->next; i++) {
        cur = cur->next;
    }
    
    if (!cur->next) return head;  // 位置无效
    
    Node* temp = cur->next;
    cur->next = cur->next->next;
    delete temp;
    
    return head;
}

// 删除值为 val 的所有节点
Node* removeVal(Node* head, int val) {
    Node dummy(0);
    dummy.next = head;
    
    Node* cur = &dummy;
    while (cur->next) {
        if (cur->next->data == val) {
            Node* temp = cur->next;
            cur->next = cur->next->next;
            delete temp;
        } else {
            cur = cur->next;
        }
    }
    
    return dummy.next;
}
```

### 查找节点

```cpp
Node* find(Node* head, int val) {
    Node* cur = head;
    
    while (cur) {
        if (cur->data == val) {
            return cur;
        }
        cur = cur->next;
    }
    
    return nullptr;
}
```

### 反转链表

```cpp
Node* reverse(Node* head) {
    Node* prev = nullptr;
    Node* cur = head;
    
    while (cur) {
        Node* next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    
    return prev;
}
```

### 释放链表

```cpp
void deleteList(Node* head) {
    while (head) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
}
```

## 经典问题

### 1. 判断链表是否有环

```cpp
bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            return true;  // 有环
        }
    }
    
    return false;
}
```

### 2. 找环的入口

```cpp
Node* detectCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        
        if (slow == fast) {
            // 有环，找入口
            Node* cur = head;
            while (cur != slow) {
                cur = cur->next;
                slow = slow->next;
            }
            return cur;
        }
    }
    
    return nullptr;
}
```

### 3. 找中间节点

```cpp
Node* middleNode(Node* head) {
    Node* slow = head;
    Node* fast = head;
    
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    return slow;
}
```

### 4. 合并两个有序链表

```cpp
Node* mergeTwoLists(Node* l1, Node* l2) {
    Node dummy(0);
    Node* tail = &dummy;
    
    while (l1 && l2) {
        if (l1->data < l2->data) {
            tail->next = l1;
            l1 = l1->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    
    tail->next = l1 ? l1 : l2;
    
    return dummy.next;
}
```

### 5. 删除倒数第 n 个节点

```cpp
Node* removeNthFromEnd(Node* head, int n) {
    Node dummy(0);
    dummy.next = head;
    
    Node* fast = &dummy;
    Node* slow = &dummy;
    
    // fast 先走 n+1 步
    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }
    
    // 一起走
    while (fast) {
        fast = fast->next;
        slow = slow->next;
    }
    
    // 删除 slow->next
    Node* temp = slow->next;
    slow->next = slow->next->next;
    delete temp;
    
    return dummy.next;
}
```

## 链表 vs 数组

| 特点 | 链表 | 数组 |
|------|------|------|
| 内存 | 不连续 | 连续 |
| 插入删除 | O(1) | O(n) |
| 随机访问 | O(n) | O(1) |
| 内存占用 | 多（指针） | 少 |
| 缓存友好 | 否 | 是 |

## 竞赛中的应用

链表在竞赛中较少直接使用，但以下场景会用到：
- 邻接表（图的存储）
- 哈希表（拉链法）
- 某些特殊题目

实际竞赛中，vector 更常用。

## 练习题

1. [LeetCode 206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)
2. [LeetCode 141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)
3. [LeetCode 21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
4. [LeetCode 19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

## 总结

- 链表通过指针连接节点
- 插入删除 O(1)，查找 O(n)
- 常用技巧：快慢指针、虚拟头节点
- 竞赛中 vector 更常用
- 理解链表有助于理解其他数据结构
