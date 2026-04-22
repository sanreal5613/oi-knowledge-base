# 二分查找

<DifficultyBadge level="easy" />

## 算法简介

二分查找（Binary Search）是一种在**有序数组**中查找特定元素的高效算法。

<AlgorithmCard 
  title="二分查找"
  description="在有序数组中快速定位目标元素的位置"
  timeComplexity="O(log n)"
  spaceComplexity="O(1)"
/>

## 算法原理

二分查找的核心思想是"分而治之"：

1. 从数组的中间元素开始比较
2. 如果目标值等于中间元素，查找成功
3. 如果目标值小于中间元素，在左半部分继续查找
4. 如果目标值大于中间元素，在右半部分继续查找
5. 重复上述过程，直到找到目标或确定不存在

### 图解演示

假设在数组 `[1, 3, 5, 7, 9, 11, 13, 15]` 中查找 `7`：

```
第 1 步：
[1, 3, 5, 7, 9, 11, 13, 15]
           ↑
        mid=9
7 < 9，在左半部分查找

第 2 步：
[1, 3, 5, 7]
     ↑
   mid=3
7 > 3，在右半部分查找

第 3 步：
[5, 7]
   ↑
 mid=7
找到目标！
```

## 代码实现

### 迭代版本（推荐）

```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // 防止溢出
        
        if (arr[mid] == target) {
            return mid;  // 找到目标，返回下标
        } else if (arr[mid] < target) {
            left = mid + 1;  // 在右半部分查找
        } else {
            right = mid - 1;  // 在左半部分查找
        }
    }
    
    return -1;  // 未找到，返回 -1
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int target = 7;
    
    int result = binarySearch(arr, target);
    
    if (result != -1) {
        cout << "找到目标，下标为: " << result << endl;
    } else {
        cout << "未找到目标" << endl;
    }
    
    return 0;
}
```

### 递归版本

```cpp
int binarySearchRecursive(vector<int>& arr, int target, int left, int right) {
    if (left > right) {
        return -1;  // 未找到
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
```

## 示例代码

```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int target;
    cin >> target;
    
    int result = binarySearch(arr, target);
    
    if (result != -1) {
        cout << "找到目标，下标为: " << result << endl;
    } else {
        cout << "未找到目标" << endl;
    }
    
    return 0;
}
```

::: tip 提示
复制代码到本地编译器运行，输入一个数字（如 `7`）测试查找功能。
:::

## 关键细节

### 1. 防止整数溢出

❌ **错误写法：**
```cpp
int mid = (left + right) / 2;  // 可能溢出
```

✅ **正确写法：**
```cpp
int mid = left + (right - left) / 2;
```

### 2. 循环条件

使用 `left <= right` 而不是 `left < right`：

```cpp
while (left <= right) {  // 注意是 <=
    // ...
}
```

### 3. 边界更新

```cpp
if (arr[mid] < target) {
    left = mid + 1;  // 注意是 mid + 1
} else {
    right = mid - 1;  // 注意是 mid - 1
}
```

## 变体问题

### 1. 查找第一个等于目标的位置

```cpp
int findFirst(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            right = mid - 1;  // 继续在左边找
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

### 2. 查找最后一个等于目标的位置

```cpp
int findLast(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;  // 继续在右边找
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
```

### 3. 查找第一个大于等于目标的位置

```cpp
int lowerBound(vector<int>& arr, int target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
```

## STL 实现

C++ STL 提供了现成的二分查找函数：

```cpp
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    
    // binary_search：判断是否存在
    bool found = binary_search(arr.begin(), arr.end(), 7);
    
    // lower_bound：第一个 >= target 的位置
    auto it1 = lower_bound(arr.begin(), arr.end(), 7);
    
    // upper_bound：第一个 > target 的位置
    auto it2 = upper_bound(arr.begin(), arr.end(), 7);
    
    return 0;
}
```

## 复杂度分析

### 时间复杂度

- **最好情况**：O(1) - 第一次就找到
- **最坏情况**：O(log n) - 需要查找到最后
- **平均情况**：O(log n)

### 空间复杂度

- **迭代版本**：O(1)
- **递归版本**：O(log n) - 递归调用栈

## 适用场景

✅ **适用：**
- 数组已排序
- 需要快速查找
- 数据量较大

❌ **不适用：**
- 数组未排序（需先排序）
- 频繁插入删除（考虑平衡树）
- 数据量很小（顺序查找更简单）

## 练习题

### 基础题

1. [洛谷 P2249 查找](https://www.luogu.com.cn/problem/P2249)
2. [LeetCode 704. 二分查找](https://leetcode.cn/problems/binary-search/)

### 进阶题

3. [洛谷 P1102 A-B 数对](https://www.luogu.com.cn/problem/P1102)
4. [LeetCode 34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

### 应用题

5. [洛谷 P1873 砍树](https://www.luogu.com.cn/problem/P1873)
6. [LeetCode 69. x 的平方根](https://leetcode.cn/problems/sqrtx/)

## 常见错误

### 1. 死循环

```cpp
// 错误：可能导致死循环
while (left < right) {
    int mid = (left + right) / 2;
    if (arr[mid] < target) {
        left = mid;  // 应该是 mid + 1
    } else {
        right = mid;
    }
}
```

### 2. 数组越界

```cpp
// 错误：right 初始化错误
int right = arr.size();  // 应该是 arr.size() - 1
```

### 3. 未考虑空数组

```cpp
if (arr.empty()) {
    return -1;  // 先判断数组是否为空
}
```

## 总结

二分查找是一个简单但强大的算法：

- ✅ 时间复杂度 O(log n)，非常高效
- ✅ 代码简洁，易于实现
- ✅ 应用广泛，是很多高级算法的基础
- ⚠️ 必须在有序数组中使用
- ⚠️ 需要注意边界条件

掌握二分查找是学习算法的重要一步！

## 相关内容

- [排序算法](/basic-algorithms/sorting/overview)
- [三分查找](/basic-algorithms/searching/ternary-search)
- [二分答案](/advanced-algorithms/search/binary-answer)
