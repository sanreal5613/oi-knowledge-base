# 递归基础

<DifficultyBadge level="easy" />

## 什么是递归？

递归是函数**调用自身**的编程技术。

### 递归的两个要素

1. **递归终止条件（边界条件）**：什么时候停止
2. **递归关系**：如何将问题分解为更小的子问题

```cpp
void recursion(int n) {
    if (n == 0) return;  // 终止条件
    recursion(n - 1);    // 递归调用
}
```

## 经典例子

### 1. 阶乘

```
n! = n × (n-1)!
0! = 1（终止条件）
```

```cpp
long long factorial(int n) {
    if (n == 0) return 1;  // 终止条件
    return n * factorial(n - 1);  // 递归关系
}

// factorial(4) = 4 × factorial(3)
//              = 4 × 3 × factorial(2)
//              = 4 × 3 × 2 × factorial(1)
//              = 4 × 3 × 2 × 1 × factorial(0)
//              = 4 × 3 × 2 × 1 × 1 = 24
```

### 2. 斐波那契数列

```
fib(n) = fib(n-1) + fib(n-2)
fib(1) = fib(2) = 1（终止条件）
```

```cpp
long long fib(int n) {
    if (n <= 2) return 1;  // 终止条件
    return fib(n - 1) + fib(n - 2);  // 递归关系
}
```

::: warning 注意
上面的斐波那契递归有大量重复计算，效率很低！实际使用时应该用记忆化或循环。
:::

### 3. 汉诺塔

```cpp
// 将 n 个盘子从 from 移到 to，借助 via
void hanoi(int n, char from, char to, char via) {
    if (n == 1) {
        cout << "将盘子 1 从 " << from << " 移到 " << to << endl;
        return;
    }
    hanoi(n - 1, from, via, to);  // 将 n-1 个盘子移到辅助柱
    cout << "将盘子 " << n << " 从 " << from << " 移到 " << to << endl;
    hanoi(n - 1, via, to, from);  // 将 n-1 个盘子从辅助柱移到目标柱
}
```

## 递归的执行过程

以 `factorial(3)` 为例：

```
factorial(3)
├── 3 × factorial(2)
│   ├── 2 × factorial(1)
│   │   ├── 1 × factorial(0)
│   │   │   └── 返回 1
│   │   └── 返回 1 × 1 = 1
│   └── 返回 2 × 1 = 2
└── 返回 3 × 2 = 6
```

## 记忆化递归

避免重复计算：

```cpp
long long memo[100] = {0};  // 记忆数组

long long fib(int n) {
    if (n <= 2) return 1;
    if (memo[n]) return memo[n];  // 已计算过，直接返回
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}
```

## 常见递归应用

### 1. 幂运算

```cpp
long long power(long long a, int b) {
    if (b == 0) return 1;
    if (b % 2 == 0) {
        long long half = power(a, b / 2);
        return half * half;
    }
    return a * power(a, b - 1);
}
```

### 2. 二分查找（递归版）

```cpp
int binarySearch(int arr[], int left, int right, int target) {
    if (left > right) return -1;
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, mid + 1, right, target);
    return binarySearch(arr, left, mid - 1, target);
}
```

### 3. 归并排序

```cpp
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}
```

### 4. 全排列

```cpp
int arr[5] = {1, 2, 3};
int n = 3;

void permute(int arr[], int start, int n) {
    if (start == n) {
        for (int i = 0; i < n; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
        return;
    }
    
    for (int i = start; i < n; i++) {
        swap(arr[start], arr[i]);
        permute(arr, start + 1, n);
        swap(arr[start], arr[i]);  // 回溯
    }
}
```

### 5. 子集枚举

```cpp
int arr[3] = {1, 2, 3};
int n = 3;

void subsets(int arr[], int index, vector<int>& current, int n) {
    if (index == n) {
        for (int x : current) cout << x << " ";
        cout << endl;
        return;
    }
    
    // 不选 arr[index]
    subsets(arr, index + 1, current, n);
    
    // 选 arr[index]
    current.push_back(arr[index]);
    subsets(arr, index + 1, current, n);
    current.pop_back();  // 回溯
}
```

## 递归 vs 循环

| 特点 | 递归 | 循环 |
|------|------|------|
| 代码简洁性 | 通常更简洁 | 有时较复杂 |
| 效率 | 有函数调用开销 | 通常更快 |
| 空间 | 占用栈空间 | 占用较少 |
| 适用场景 | 树、图、分治 | 简单重复操作 |

## 常见错误

### 1. 缺少终止条件

```cpp
// 错误：无限递归
int factorial(int n) {
    return n * factorial(n - 1);  // 没有终止条件
}
```

### 2. 终止条件错误

```cpp
// 错误：终止条件不对
int factorial(int n) {
    if (n == 1) return 1;  // 缺少 n == 0 的情况
    return n * factorial(n - 1);
}
```

### 3. 栈溢出

```cpp
// 递归深度太大会导致栈溢出
// 一般递归深度不超过 10^4 ~ 10^5
```

## 练习题

### 练习 1：数字求和

递归计算 1 + 2 + ... + n 的和。

<details>
<summary>查看答案</summary>

```cpp
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
```

</details>

### 练习 2：字符串反转

递归反转字符串。

<details>
<summary>查看答案</summary>

```cpp
string reverse(string s) {
    if (s.length() <= 1) return s;
    return reverse(s.substr(1)) + s[0];
}
```

</details>

### 练习 3：二进制转十进制

递归将二进制字符串转为十进制数。

<details>
<summary>查看答案</summary>

```cpp
int binToDec(string s, int index) {
    if (index == s.length()) return 0;
    return (s[index] - '0') * (1 << (s.length() - 1 - index)) 
           + binToDec(s, index + 1);
}
```

</details>

## 总结

- 递归 = 终止条件 + 递归关系
- 记忆化避免重复计算
- 注意栈溢出（递归深度限制）
- 很多问题可以用递归和循环互相转换
- 树、图、分治等问题天然适合递归
