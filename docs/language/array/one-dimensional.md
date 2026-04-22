# 一维数组

<DifficultyBadge level="easy" />

## 数组基础

数组是存储**相同类型**数据的**连续内存空间**。

### 声明与初始化

```cpp
// 声明
int arr[5];  // 5 个整数的数组

// 初始化
int arr[5] = {1, 2, 3, 4, 5};

// 部分初始化（其余为 0）
int arr[5] = {1, 2};  // {1, 2, 0, 0, 0}

// 全部初始化为 0
int arr[5] = {0};  // {0, 0, 0, 0, 0}
int arr[5] = {};   // 同上

// 自动推断大小
int arr[] = {1, 2, 3, 4, 5};  // 大小为 5
```

### 访问元素

```cpp
int arr[5] = {10, 20, 30, 40, 50};

cout << arr[0] << endl;  // 10（第一个元素）
cout << arr[4] << endl;  // 50（第五个元素）

arr[2] = 100;  // 修改第三个元素
cout << arr[2] << endl;  // 100
```

::: warning 注意
数组下标从 **0** 开始！`arr[5]` 有 5 个元素，下标是 0-4。
:::

## 遍历数组

### for 循环

```cpp
int arr[5] = {1, 2, 3, 4, 5};

for (int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
cout << endl;
```

### 范围 for（C++11）

```cpp
int arr[] = {1, 2, 3, 4, 5};

for (int x : arr) {
    cout << x << " ";
}
cout << endl;
```

## 数组输入输出

```cpp
int n, arr[100];
cin >> n;

// 输入
for (int i = 0; i < n; i++) {
    cin >> arr[i];
}

// 输出
for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}
cout << endl;
```

## 常见操作

### 1. 求和

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int sum = 0;

for (int i = 0; i < 5; i++) {
    sum += arr[i];
}

cout << sum << endl;  // 15
```

### 2. 找最大值

```cpp
int arr[5] = {3, 7, 2, 9, 5};
int max_val = arr[0];

for (int i = 1; i < 5; i++) {
    if (arr[i] > max_val) {
        max_val = arr[i];
    }
}

cout << max_val << endl;  // 9
```

### 3. 查找元素

```cpp
int arr[5] = {1, 3, 5, 7, 9};
int target = 5;
int index = -1;

for (int i = 0; i < 5; i++) {
    if (arr[i] == target) {
        index = i;
        break;
    }
}

if (index != -1) {
    cout << "找到了，下标为 " << index << endl;
} else {
    cout << "未找到" << endl;
}
```

### 4. 反转数组

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int n = 5;

for (int i = 0; i < n / 2; i++) {
    swap(arr[i], arr[n - 1 - i]);
}

// 结果：{5, 4, 3, 2, 1}
```

### 5. 复制数组

```cpp
int arr1[5] = {1, 2, 3, 4, 5};
int arr2[5];

for (int i = 0; i < 5; i++) {
    arr2[i] = arr1[i];
}

// 或使用 memcpy
memcpy(arr2, arr1, sizeof(arr1));
```

## 数组作为函数参数

```cpp
// 方法 1：传递数组和大小
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// 方法 2：传递引用（C++11）
void printArray(int (&arr)[5]) {
    for (int x : arr) {
        cout << x << " ";
    }
    cout << endl;
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr, 5);
    return 0;
}
```

## 常用算法

### 1. 冒泡排序

```cpp
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

### 2. 选择排序

```cpp
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr[i], arr[min_idx]);
    }
}
```

### 3. 使用 STL 排序

```cpp
#include <algorithm>

int arr[5] = {3, 1, 4, 1, 5};
sort(arr, arr + 5);  // 升序

// 降序
sort(arr, arr + 5, greater<int>());
```

## 竞赛常用技巧

### 1. 全局数组自动初始化为 0

```cpp
int arr[100000];  // 全局数组，自动初始化为 0

int main() {
    // arr 所有元素都是 0
    return 0;
}
```

### 2. memset 快速初始化

```cpp
#include <cstring>

int arr[100];
memset(arr, 0, sizeof(arr));   // 全部设为 0
memset(arr, -1, sizeof(arr));  // 全部设为 -1
```

::: warning 注意
`memset` 按字节设置，只能用于 0 和 -1！
:::

### 3. 前缀和

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int prefix[6] = {0};  // prefix[i] = arr[0] + ... + arr[i-1]

for (int i = 1; i <= 5; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
}

// 快速求区间和 [l, r]
int sum = prefix[r + 1] - prefix[l];
```

### 4. 差分数组

```cpp
int arr[100], diff[100];

// 构建差分数组
diff[0] = arr[0];
for (int i = 1; i < n; i++) {
    diff[i] = arr[i] - arr[i - 1];
}

// 区间 [l, r] 加上 x
diff[l] += x;
if (r + 1 < n) diff[r + 1] -= x;

// 还原数组
arr[0] = diff[0];
for (int i = 1; i < n; i++) {
    arr[i] = arr[i - 1] + diff[i];
}
```

## 常见错误

### 1. 数组越界

```cpp
int arr[5];
arr[5] = 10;  // 错误！下标应该是 0-4
```

### 2. 未初始化

```cpp
int arr[5];
cout << arr[0] << endl;  // 未初始化，值不确定
```

### 3. 数组大小必须是常量

```cpp
int n;
cin >> n;
int arr[n];  // 错误！C++ 标准不支持（部分编译器支持）

// 正确做法：
const int N = 100;
int arr[N];

// 或使用 vector
vector<int> arr(n);
```

## 练习题

### 练习 1：数组去重

输入 n 个整数，输出去重后的结果。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n, arr[100];
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    sort(arr, arr + n);
    
    int m = unique(arr, arr + n) - arr;
    
    for (int i = 0; i < m; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

</details>

### 练习 2：数组循环右移

将数组循环右移 k 位。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int n, k, arr[100];
    cin >> n >> k;
    
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    k %= n;  // 处理 k > n 的情况
    
    reverse(arr, arr + n);
    reverse(arr, arr + k);
    reverse(arr + k, arr + n);
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

</details>

## 总结

- 数组下标从 0 开始
- 注意数组越界
- 全局数组自动初始化为 0
- 使用 STL 算法简化操作
- 前缀和、差分是常用技巧
