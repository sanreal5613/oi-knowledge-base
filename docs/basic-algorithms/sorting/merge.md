# 归并排序

<DifficultyBadge level="medium" />

## 算法原理

归并排序采用**分治思想**：

1. **分解**：将数组分成两半
2. **递归**：对两半分别排序
3. **合并**：将两个有序数组合并成一个有序数组

<AlgorithmCard 
  title="归并排序"
  description="分治算法，稳定的O(n log n)排序"
  timeComplexity="O(n log n)"
  spaceComplexity="O(n)"
/>

## 图解演示

对数组 `[38, 27, 43, 3, 9, 82, 10]` 进行归并排序：

```
分解过程：
[38, 27, 43, 3, 9, 82, 10]
         ↓
[38, 27, 43, 3] [9, 82, 10]
      ↓              ↓
[38, 27] [43, 3]  [9, 82] [10]
   ↓       ↓        ↓       ↓
[38] [27] [43] [3] [9] [82] [10]

合并过程：
[38] [27] → [27, 38]
[43] [3]  → [3, 43]
[27, 38] [3, 43] → [3, 27, 38, 43]

[9] [82] → [9, 82]
[9, 82] [10] → [9, 10, 82]

[3, 27, 38, 43] [9, 10, 82] → [3, 9, 10, 27, 38, 43, 82]
```

## 代码实现

```cpp
#include <iostream>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // 创建临时数组
    int L[n1], R[n2];
    
    // 复制数据到临时数组
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    // 合并两个有序数组
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    // 复制剩余元素
    while (i < n1) {
        arr[k++] = L[i++];
    }
    while (j < n2) {
        arr[k++] = R[j++];
    }
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);      // 排序左半部分
        mergeSort(arr, mid + 1, right); // 排序右半部分
        merge(arr, left, mid, right);   // 合并
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;
    
    mergeSort(arr, 0, n - 1);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

## 非递归实现

```cpp
void mergeSortIterative(int arr[], int n) {
    // 从小到大合并
    for (int size = 1; size < n; size *= 2) {
        for (int left = 0; left < n - 1; left += 2 * size) {
            int mid = min(left + size - 1, n - 1);
            int right = min(left + 2 * size - 1, n - 1);
            
            merge(arr, left, mid, right);
        }
    }
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(n log n)
- **平均情况**：O(n log n)
- **最坏情况**：O(n log n)

**分析**：
- 分解：log n 层
- 每层合并：O(n)
- 总时间：O(n log n)

### 空间复杂度

- O(n) - 需要额外数组存储临时数据

## 稳定性

归并排序是**稳定排序**。

## 优缺点

### 优点
- ✅ 时间复杂度稳定在 O(n log n)
- ✅ 稳定排序
- ✅ 适合外部排序（数据量大，内存放不下）
- ✅ 适合链表排序

### 缺点
- ❌ 需要 O(n) 额外空间
- ❌ 对小数组效率不如插入排序

## 优化技巧

### 1. 小数组用插入排序

```cpp
const int THRESHOLD = 10;

void mergeSort(int arr[], int left, int right) {
    if (right - left < THRESHOLD) {
        insertionSort(arr, left, right);
        return;
    }
    
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

### 2. 判断是否需要合并

```cpp
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        
        // 如果已经有序，不需要合并
        if (arr[mid] <= arr[mid + 1]) {
            return;
        }
        
        merge(arr, left, mid, right);
    }
}
```

## 应用场景

- 需要稳定排序
- 数据量大
- 外部排序（文件排序）
- 链表排序
- 求逆序对数量

## 求逆序对

归并排序可以高效求逆序对数量：

```cpp
long long mergeAndCount(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    long long count = 0;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
            count += (n1 - i);  // 逆序对数量
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    
    return count;
}

long long mergeSortAndCount(int arr[], int left, int right) {
    long long count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        count += mergeSortAndCount(arr, left, mid);
        count += mergeSortAndCount(arr, mid + 1, right);
        count += mergeAndCount(arr, left, mid, right);
    }
    return count;
}
```

## 练习题

1. [洛谷 P1177 【模板】快速排序](https://www.luogu.com.cn/problem/P1177)（用归并排序）
2. [洛谷 P1908 逆序对](https://www.luogu.com.cn/problem/P1908)
3. [LeetCode 912. 排序数组](https://leetcode.cn/problems/sort-an-array/)

## 总结

- 归并排序是稳定的 O(n log n) 排序算法
- 采用分治思想：分解、递归、合并
- 需要 O(n) 额外空间
- 适合大数据量和外部排序
- 可以用于求逆序对
