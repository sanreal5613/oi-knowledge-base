# 选择排序

<DifficultyBadge level="easy" />

## 算法原理

选择排序每次从未排序部分**选择最小元素**，放到已排序部分的末尾。

<AlgorithmCard 
  title="选择排序"
  description="每次选择最小元素放到正确位置"
  timeComplexity="O(n²)"
  spaceComplexity="O(1)"
/>

## 图解演示

对数组 `[5, 3, 8, 4, 2]` 进行选择排序：

```
初始：[5, 3, 8, 4, 2]

第 1 轮：找到最小值 2，与第 1 个元素交换
[2, 3, 8, 4, 5]
 ↑ 已排序

第 2 轮：从剩余元素中找到最小值 3，已在正确位置
[2, 3, 8, 4, 5]
 ↑  ↑ 已排序

第 3 轮：从剩余元素中找到最小值 4，与第 3 个元素交换
[2, 3, 4, 8, 5]
 ↑  ↑  ↑ 已排序

第 4 轮：从剩余元素中找到最小值 5，与第 4 个元素交换
[2, 3, 4, 5, 8]
 ↑  ↑  ↑  ↑ 已排序

完成！
```

## 代码实现

```cpp
#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        
        // 找到未排序部分的最小值
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // 交换到正确位置
        if (min_idx != i) {
            swap(arr[i], arr[min_idx]);
        }
    }
}

int main() {
    int arr[] = {5, 3, 8, 4, 2};
    int n = 5;
    
    selectionSort(arr, n);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(n²)
- **平均情况**：O(n²)
- **最坏情况**：O(n²)

::: tip 注意
选择排序无论什么情况都是 O(n²)，因为每次都要遍历剩余元素。
:::

### 空间复杂度

- O(1) - 只需要常数额外空间

## 稳定性

选择排序是**不稳定排序**。

**反例**：
```
原数组：[5a, 8, 5b, 2]
第一轮：找到最小值 2，与 5a 交换
结果：[2, 8, 5b, 5a]  // 5a 和 5b 的相对位置改变了
```

## 优缺点

### 优点
- ✅ 代码简单
- ✅ 原地排序
- ✅ 交换次数少（最多 n-1 次）

### 缺点
- ❌ 效率低，O(n²) 时间复杂度
- ❌ 不稳定排序
- ❌ 无法提前终止

## 选择排序 vs 冒泡排序

| 特点 | 选择排序 | 冒泡排序 |
|------|---------|---------|
| 时间复杂度 | O(n²) | O(n²) |
| 稳定性 | 不稳定 | 稳定 |
| 交换次数 | O(n) | O(n²) |
| 比较次数 | O(n²) | O(n²) |
| 能否提前终止 | 否 | 是 |

## 应用场景

- 数据量很小
- 交换操作代价很高（选择排序交换次数少）

## 练习题

1. 实现降序选择排序
2. 找出数组中第 k 小的元素（使用选择排序思想）
3. 统计选择排序的比较次数和交换次数

<details>
<summary>练习 2 答案</summary>

```cpp
int findKthSmallest(int arr[], int n, int k) {
    for (int i = 0; i < k; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr[i], arr[min_idx]);
    }
    return arr[k - 1];
}
```

</details>

## 总结

- 选择排序每次选择最小元素放到正确位置
- 时间复杂度始终是 O(n²)
- 不稳定排序
- 交换次数少，适合交换代价高的场景
