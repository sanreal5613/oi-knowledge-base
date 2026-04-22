# 数组基础

<DifficultyBadge level="easy" />

## 什么是数组？

数组是**最基础的数据结构**，用于存储相同类型的元素序列，元素在内存中**连续存储**。

```
数组：[10, 20, 30, 40, 50]
内存：连续存储
索引：  0   1   2   3   4
```

## C++ 数组

### 一维数组

```cpp
#include <iostream>
using namespace std;

int main() {
    // 方式1：声明并初始化
    int arr1[5] = {1, 2, 3, 4, 5};
    
    // 方式2：部分初始化，其余为0
    int arr2[5] = {1, 2};  // {1, 2, 0, 0, 0}
    
    // 方式3：自动推断大小
    int arr3[] = {1, 2, 3, 4, 5};  // 大小为5
    
    // 访问元素
    cout << arr1[0] << endl;  // 1
    cout << arr1[2] << endl;  // 3
    
    // 修改元素
    arr1[0] = 100;
    
    // 遍历数组
    for (int i = 0; i < 5; i++) {
        cout << arr1[i] << " ";
    }
    
    return 0;
}
```

### 二维数组

```cpp
int main() {
    // 声明二维数组
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    // 访问元素
    cout << matrix[1][2] << endl;  // 7
    
    // 遍历二维数组
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

## 数组的基本操作

### 1. 查找元素

```cpp
// 线性查找 O(n)
int find(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // 返回索引
        }
    }
    return -1;  // 未找到
}
```

### 2. 插入元素

```cpp
// 在位置 pos 插入元素（假设数组有足够空间）
void insert(int arr[], int& n, int pos, int val) {
    // 从后往前移动元素
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = val;
    n++;
}
```

### 3. 删除元素

```cpp
// 删除位置 pos 的元素
void remove(int arr[], int& n, int pos) {
    // 从前往后移动元素
    for (int i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
}
```

### 4. 反转数组

```cpp
void reverse(int arr[], int n) {
    for (int i = 0; i < n / 2; i++) {
        swap(arr[i], arr[n - 1 - i]);
    }
}
```

## 数组 vs vector

| 特性 | 数组 | vector |
|------|------|--------|
| 大小 | 固定 | 动态 |
| 内存 | 栈/堆 | 堆 |
| 越界检查 | 无 | at()有检查 |
| 灵活性 | 低 | 高 |
| 性能 | 略快 | 略慢 |

**竞赛建议**：优先使用 `vector`，除非有明确的性能需求。

## 竞赛常用技巧

### 1. 前缀和

```cpp
// 一维前缀和
int prefix[1005];

void buildPrefix(int arr[], int n) {
    prefix[0] = arr[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
}

// 查询区间 [l, r] 的和 O(1)
int query(int l, int r) {
    if (l == 0) return prefix[r];
    return prefix[r] - prefix[l - 1];
}
```

### 2. 差分数组

```cpp
// 差分数组用于区间修改
int diff[1005];

void buildDiff(int arr[], int n) {
    diff[0] = arr[0];
    for (int i = 1; i < n; i++) {
        diff[i] = arr[i] - arr[i - 1];
    }
}

// 区间 [l, r] 加 val
void rangeAdd(int l, int r, int val) {
    diff[l] += val;
    diff[r + 1] -= val;
}

// 还原数组
void restore(int arr[], int n) {
    arr[0] = diff[0];
    for (int i = 1; i < n; i++) {
        arr[i] = arr[i - 1] + diff[i];
    }
}
```

### 3. 二维前缀和

```cpp
int sum[1005][1005];

void build2DPrefix(int matrix[][1005], int n, int m) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            sum[i][j] = sum[i-1][j] + sum[i][j-1] 
                      - sum[i-1][j-1] + matrix[i][j];
        }
    }
}

// 查询子矩阵 [x1,y1] 到 [x2,y2] 的和
int query2D(int x1, int y1, int x2, int y2) {
    return sum[x2][y2] - sum[x1-1][y2] - sum[x2][y1-1] 
         + sum[x1-1][y1-1];
}
```

## 常见错误

### 1. 数组越界

```cpp
int arr[5] = {1, 2, 3, 4, 5};
cout << arr[5];  // ❌ 越界！有效索引是 0-4
```

### 2. 未初始化

```cpp
int arr[5];
cout << arr[0];  // ❌ 未初始化，值不确定
```

### 3. 数组作为函数参数会退化为指针

```cpp
void func(int arr[]) {  // 实际上是指针
    // sizeof(arr) 不是数组大小
}
```

## 练习题

1. [LeetCode 1. 两数之和](https://leetcode.cn/problems/two-sum/)
2. [LeetCode 53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)
3. [洛谷 P3397 地毯](https://www.luogu.com.cn/problem/P3397)（二维差分）
4. [洛谷 P1387 最大正方形](https://www.luogu.com.cn/problem/P1387)（二维前缀和）

## 总结

- 数组是最基础的数据结构，连续内存存储
- 支持 O(1) 随机访问
- 插入删除需要 O(n) 移动元素
- 前缀和、差分数组是竞赛常用技巧
- 竞赛中优先使用 `vector`
