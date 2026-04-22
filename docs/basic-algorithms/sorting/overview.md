# 排序算法概述

<DifficultyBadge level="easy" />

## 什么是排序？

排序是将一组数据按照**特定顺序**（升序或降序）排列的过程。

### 排序的重要性

- 提高查找效率（二分查找需要有序数组）
- 数据可视化
- 算法基础（很多算法依赖排序）

## 常见排序算法

| 算法 | 时间复杂度（平均） | 时间复杂度（最坏） | 空间复杂度 | 稳定性 |
|------|-------------------|-------------------|-----------|--------|
| 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n²) | O(n²) | O(1) | 稳定 |
| 快速排序 | O(n log n) | O(n²) | O(log n) | 不稳定 |
| 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 |
| 堆排序 | O(n log n) | O(n log n) | O(1) | 不稳定 |

## 稳定性

**稳定排序**：相等元素的相对位置不变。

```
原数组：[3a, 2, 3b, 1]
稳定排序后：[1, 2, 3a, 3b]（3a 仍在 3b 前面）
不稳定排序后：[1, 2, 3b, 3a]（3a 和 3b 位置可能交换）
```

## 使用 STL 排序

C++ 提供了现成的排序函数：

```cpp
#include <algorithm>
using namespace std;

int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
int n = 8;

// 升序排序
sort(arr, arr + n);

// 降序排序
sort(arr, arr + n, greater<int>());

// 自定义比较函数
bool cmp(int a, int b) {
    return a > b;  // 降序
}
sort(arr, arr + n, cmp);

// Lambda 表达式
sort(arr, arr + n, [](int a, int b) {
    return a > b;
});
```

### vector 排序

```cpp
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end());
```

### 结构体排序

```cpp
struct Student {
    string name;
    int score;
};

bool cmp(Student a, Student b) {
    return a.score > b.score;  // 按分数降序
}

Student students[100];
sort(students, students + n, cmp);
```

## 部分排序

### nth_element

找到第 k 小的元素：

```cpp
int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
int n = 8;

nth_element(arr, arr + 3, arr + n);  // 第 4 小的元素放到 arr[3]
```

### partial_sort

部分排序：

```cpp
int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
int n = 8;

partial_sort(arr, arr + 3, arr + n);  // 前 3 个元素有序
```

## 稳定排序

```cpp
#include <algorithm>

int arr[] = {3, 1, 4, 1, 5};
stable_sort(arr, arr + 5);  // 稳定排序
```

## 排序算法选择

### 数据量小（n < 100）
- 任意排序算法都可以
- 推荐：插入排序（代码简单）

### 数据量中等（100 < n < 10⁶）
- 推荐：快速排序、归并排序
- 或直接用 `sort()`

### 数据量大（n > 10⁶）
- 推荐：`sort()`（高度优化）
- 或归并排序（稳定）

### 需要稳定排序
- 归并排序
- 或 `stable_sort()`

### 空间受限
- 堆排序
- 或快速排序

## 特殊排序

### 计数排序

适用于数据范围小的情况：

```cpp
void countingSort(int arr[], int n, int maxVal) {
    int count[maxVal + 1] = {0};
    
    // 统计每个数出现的次数
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    
    // 还原数组
    int index = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i]--) {
            arr[index++] = i;
        }
    }
}
```

**时间复杂度**：O(n + k)，k 是数据范围  
**空间复杂度**：O(k)

### 基数排序

按位排序，适用于整数：

```cpp
void radixSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        int output[n];
        int count[10] = {0};
        
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }
        
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
}
```

**时间复杂度**：O(d × (n + k))，d 是位数  
**空间复杂度**：O(n + k)

## 练习题

1. [洛谷 P1177 【模板】快速排序](https://www.luogu.com.cn/problem/P1177)
2. [洛谷 P1059 明明的随机数](https://www.luogu.com.cn/problem/P1059)
3. [洛谷 P1093 奖学金](https://www.luogu.com.cn/problem/P1093)

## 总结

- `sort()` 是最常用的排序函数
- 时间复杂度 O(n log n) 的算法：快排、归并、堆排序
- 时间复杂度 O(n²) 的算法：冒泡、选择、插入
- 稳定排序：归并、插入、冒泡
- 特殊情况：计数排序、基数排序

## 下一步

- [冒泡排序](/basic-algorithms/sorting/bubble)
- [选择排序](/basic-algorithms/sorting/selection)
- [插入排序](/basic-algorithms/sorting/insertion)
- [快速排序](/basic-algorithms/sorting/quick)
- [归并排序](/basic-algorithms/sorting/merge)
