# 快速排序

<DifficultyBadge level="medium" />

## 算法原理

快速排序采用**分治思想**：

1. 选择一个**基准元素**（pivot）
2. 将数组分为两部分：小于基准的和大于基准的
3. 递归地对两部分进行快速排序

<AlgorithmCard 
  title="快速排序"
  description="基于分治思想的高效排序算法"
  timeComplexity="O(n log n)"
  spaceComplexity="O(log n)"
/>

## 图解演示

对数组 `[3, 6, 8, 10, 1, 2, 1]` 进行快速排序：

```
选择基准：3
[3, 6, 8, 10, 1, 2, 1]
 ↑

分区后：
[1, 2, 1] 3 [6, 8, 10]
 左半部分  ↑  右半部分

递归排序左半部分 [1, 2, 1]：
选择基准：1
[1] 1 [2]

递归排序右半部分 [6, 8, 10]：
选择基准：6
[] 6 [8, 10]

最终结果：
[1, 1, 2, 3, 6, 8, 10]
```

## 代码实现

### 标准实现

```cpp
#include <iostream>
using namespace std;

int partition(int arr[], int left, int right) {
    int pivot = arr[right];  // 选择最右边的元素作为基准
    int i = left - 1;
    
    for (int j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[right]);
    return i + 1;
}

void quickSort(int arr[], int left, int right) {
    if (left < right) {
        int pi = partition(arr, left, right);
        quickSort(arr, left, pi - 1);
        quickSort(arr, pi + 1, right);
    }
}

int main() {
    int arr[] = {3, 6, 8, 10, 1, 2, 1};
    int n = 7;
    
    quickSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 三路快排（处理重复元素）

```cpp
void quickSort3Way(int arr[], int left, int right) {
    if (left >= right) return;
    
    int pivot = arr[left];
    int lt = left;      // arr[left+1...lt] < pivot
    int gt = right + 1; // arr[gt...right] > pivot
    int i = left + 1;   // arr[lt+1...i-1] == pivot
    
    while (i < gt) {
        if (arr[i] < pivot) {
            swap(arr[++lt], arr[i++]);
        } else if (arr[i] > pivot) {
            swap(arr[--gt], arr[i]);
        } else {
            i++;
        }
    }
    
    swap(arr[left], arr[lt]);
    
    quickSort3Way(arr, left, lt - 1);
    quickSort3Way(arr, gt, right);
}
```

## 优化技巧

### 1. 随机选择基准

避免最坏情况（已排序数组）：

```cpp
int partition(int arr[], int left, int right) {
    int randomIndex = left + rand() % (right - left + 1);
    swap(arr[randomIndex], arr[right]);
    
    // 后续代码同标准实现
    int pivot = arr[right];
    // ...
}
```

### 2. 小数组用插入排序

```cpp
const int THRESHOLD = 10;

void quickSort(int arr[], int left, int right) {
    if (right - left < THRESHOLD) {
        insertionSort(arr, left, right);
        return;
    }
    
    int pi = partition(arr, left, right);
    quickSort(arr, left, pi - 1);
    quickSort(arr, pi + 1, right);
}
```

### 3. 尾递归优化

```cpp
void quickSort(int arr[], int left, int right) {
    while (left < right) {
        int pi = partition(arr, left, right);
        
        // 先排序较小的部分
        if (pi - left < right - pi) {
            quickSort(arr, left, pi - 1);
            left = pi + 1;
        } else {
            quickSort(arr, pi + 1, right);
            right = pi - 1;
        }
    }
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(n log n) - 每次都平分
- **平均情况**：O(n log n)
- **最坏情况**：O(n²) - 每次只分出一个元素（已排序数组）

### 空间复杂度

- **递归栈**：O(log n) ~ O(n)

## 快排 vs 归并排序

| 特点 | 快速排序 | 归并排序 |
|------|---------|---------|
| 平均时间 | O(n log n) | O(n log n) |
| 最坏时间 | O(n²) | O(n log n) |
| 空间复杂度 | O(log n) | O(n) |
| 稳定性 | 不稳定 | 稳定 |
| 实际性能 | 通常更快 | 稳定但慢一些 |

## 应用场景

✅ **适用：**
- 一般排序场景
- 数据量大
- 不需要稳定排序

❌ **不适用：**
- 需要稳定排序
- 最坏情况不能接受 O(n²)

## 练习题

1. [洛谷 P1177 【模板】快速排序](https://www.luogu.com.cn/problem/P1177)
2. [LeetCode 912. 排序数组](https://leetcode.cn/problems/sort-an-array/)
3. [洛谷 P1923 求第 k 小的数](https://www.luogu.com.cn/problem/P1923)

## 扩展：快速选择

找第 k 小的元素（不需要完全排序）：

```cpp
int quickSelect(int arr[], int left, int right, int k) {
    if (left == right) return arr[left];
    
    int pi = partition(arr, left, right);
    
    if (k == pi) {
        return arr[k];
    } else if (k < pi) {
        return quickSelect(arr, left, pi - 1, k);
    } else {
        return quickSelect(arr, pi + 1, right, k);
    }
}

// 找第 k 小的元素（k 从 0 开始）
int findKthSmallest(int arr[], int n, int k) {
    return quickSelect(arr, 0, n - 1, k);
}
```

**时间复杂度**：平均 O(n)

## 总结

- 快速排序是最常用的排序算法之一
- 平均时间复杂度 O(n log n)
- 原地排序，空间复杂度 O(log n)
- 不稳定排序
- 随机化基准可以避免最坏情况
- 三路快排适合处理大量重复元素
