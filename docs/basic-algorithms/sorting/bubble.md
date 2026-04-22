# 冒泡排序

<DifficultyBadge level="easy" />

## 算法原理

冒泡排序通过**重复遍历**数组，**比较相邻元素**，如果顺序错误就交换它们。

<AlgorithmCard 
  title="冒泡排序"
  description="通过相邻元素比较和交换实现排序"
  timeComplexity="O(n²)"
  spaceComplexity="O(1)"
/>

## 图解演示

对数组 `[5, 3, 8, 4, 2]` 进行冒泡排序：

```
第 1 轮：
[5, 3, 8, 4, 2]  比较 5 和 3，交换
[3, 5, 8, 4, 2]  比较 5 和 8，不交换
[3, 5, 8, 4, 2]  比较 8 和 4，交换
[3, 5, 4, 8, 2]  比较 8 和 2，交换
[3, 5, 4, 2, 8]  最大值 8 冒泡到最后

第 2 轮：
[3, 5, 4, 2, 8]  比较 3 和 5，不交换
[3, 5, 4, 2, 8]  比较 5 和 4，交换
[3, 4, 5, 2, 8]  比较 5 和 2，交换
[3, 4, 2, 5, 8]  第二大值 5 到位

第 3 轮：
[3, 4, 2, 5, 8]  比较 3 和 4，不交换
[3, 4, 2, 5, 8]  比较 4 和 2，交换
[3, 2, 4, 5, 8]  第三大值 4 到位

第 4 轮：
[3, 2, 4, 5, 8]  比较 3 和 2，交换
[2, 3, 4, 5, 8]  完成排序
```

## 代码实现

### 基础版本

```cpp
#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    int arr[] = {5, 3, 8, 4, 2};
    int n = 5;
    
    bubbleSort(arr, n);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 优化版本（提前终止）

如果某一轮没有发生交换，说明已经有序，可以提前结束：

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) break;  // 没有交换，已经有序
    }
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(n) - 数组已经有序，只需一轮
- **平均情况**：O(n²)
- **最坏情况**：O(n²) - 数组逆序

### 空间复杂度

- O(1) - 只需要常数额外空间

## 稳定性

冒泡排序是**稳定排序**，相等元素的相对位置不变。

## 优缺点

### 优点
- ✅ 代码简单，容易理解
- ✅ 稳定排序
- ✅ 原地排序（不需要额外空间）

### 缺点
- ❌ 效率低，O(n²) 时间复杂度
- ❌ 不适合大数据量

## 应用场景

- 数据量很小（n < 100）
- 教学演示
- 几乎已经有序的数组

## 练习题

1. 实现降序冒泡排序
2. 统计冒泡排序的交换次数
3. 使用冒泡排序找出数组中第 k 大的元素

<details>
<summary>练习 1 答案</summary>

```cpp
void bubbleSortDesc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {  // 改为 <
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

</details>

## 总结

- 冒泡排序通过相邻元素比较和交换实现排序
- 时间复杂度 O(n²)，适合小数据量
- 稳定排序，原地排序
- 可以通过标志位优化提前终止
