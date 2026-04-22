# 插入排序

<DifficultyBadge level="easy" />

## 算法原理

插入排序类似于**整理扑克牌**：每次取一张牌，插入到已排好序的牌中的正确位置。

<AlgorithmCard 
  title="插入排序"
  description="将元素插入到已排序部分的正确位置"
  timeComplexity="O(n²)"
  spaceComplexity="O(1)"
/>

## 图解演示

对数组 `[5, 3, 8, 4, 2]` 进行插入排序：

```
初始：[5 | 3, 8, 4, 2]  （| 左边是已排序部分）

第 1 步：取 3，插入到已排序部分
3 < 5，5 右移
[3, 5 | 8, 4, 2]

第 2 步：取 8，插入到已排序部分
8 > 5，不移动
[3, 5, 8 | 4, 2]

第 3 步：取 4，插入到已排序部分
4 < 8，8 右移
4 < 5，5 右移
4 > 3，停止
[3, 4, 5, 8 | 2]

第 4 步：取 2，插入到已排序部分
2 < 8，8 右移
2 < 5，5 右移
2 < 4，4 右移
2 < 3，3 右移
[2, 3, 4, 5, 8]  完成！
```

## 代码实现

### 基础版本

```cpp
#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];  // 当前要插入的元素
        int j = i - 1;
        
        // 将比 key 大的元素向右移动
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;  // 插入到正确位置
    }
}

int main() {
    int arr[] = {5, 3, 8, 4, 2};
    int n = 5;
    
    insertionSort(arr, n);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 二分插入排序（优化比较次数）

```cpp
void binaryInsertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int left = 0, right = i - 1;
        
        // 二分查找插入位置
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] > key) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // 移动元素
        for (int j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        
        arr[left] = key;
    }
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(n) - 数组已经有序
- **平均情况**：O(n²)
- **最坏情况**：O(n²) - 数组逆序

### 空间复杂度

- O(1) - 只需要常数额外空间

## 稳定性

插入排序是**稳定排序**，相等元素的相对位置不变。

## 优缺点

### 优点
- ✅ 稳定排序
- ✅ 原地排序
- ✅ 对几乎有序的数组效率高
- ✅ 适合小数据量
- ✅ 在线算法（可以边接收数据边排序）

### 缺点
- ❌ 效率低，O(n²) 时间复杂度
- ❌ 不适合大数据量

## 与其他排序比较

| 特点 | 插入排序 | 选择排序 | 冒泡排序 |
|------|---------|---------|---------|
| 最好时间 | O(n) | O(n²) | O(n) |
| 平均时间 | O(n²) | O(n²) | O(n²) |
| 稳定性 | 稳定 | 不稳定 | 稳定 |
| 适合场景 | 几乎有序 | 交换代价高 | 教学 |

## 应用场景

- 数据量很小（n < 50）
- 数据几乎已经有序
- 作为快速排序的补充（小数组用插入排序）

## 希尔排序（插入排序的改进）

希尔排序通过先排序间隔较大的元素，使数组"基本有序"，再用插入排序：

```cpp
void shellSort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int key = arr[i];
            int j = i - gap;
            
            while (j >= 0 && arr[j] > key) {
                arr[j + gap] = arr[j];
                j -= gap;
            }
            
            arr[j + gap] = key;
        }
    }
}
// 时间复杂度：O(n log² n) ~ O(n^1.5)
```

## 练习题

1. 实现降序插入排序
2. 使用插入排序对字符串数组排序
3. 实现链表的插入排序

<details>
<summary>练习 2 答案</summary>

```cpp
#include <iostream>
#include <string>
using namespace std;

void insertionSort(string arr[], int n) {
    for (int i = 1; i < n; i++) {
        string key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}

int main() {
    string arr[] = {"banana", "apple", "cherry", "date"};
    int n = 4;
    
    insertionSort(arr, n);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

</details>

## 总结

- 插入排序类似整理扑克牌
- 最好情况 O(n)，适合几乎有序的数组
- 稳定排序，原地排序
- 希尔排序是其改进版本
