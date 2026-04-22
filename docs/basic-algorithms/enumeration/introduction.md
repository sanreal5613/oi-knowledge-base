# 枚举算法

<DifficultyBadge level="easy" />

## 什么是枚举？

枚举（Brute Force）是最基本的算法思想：**列举所有可能的情况**，逐一检查是否满足条件。

### 枚举的特点

- ✅ 思路简单，容易实现
- ✅ 一定能找到答案（如果存在）
- ❌ 效率较低，适合数据量小的情况

## 基本枚举

### 1. 枚举单个变量

找出 1-100 中所有能被 3 和 5 整除的数：

```cpp
for (int i = 1; i <= 100; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
        cout << i << " ";
    }
}
```

### 2. 枚举两个变量

找出所有满足 a + b = 10 的正整数对 (a, b)：

```cpp
for (int a = 1; a < 10; a++) {
    for (int b = 1; b < 10; b++) {
        if (a + b == 10) {
            cout << "(" << a << ", " << b << ")" << endl;
        }
    }
}
```

### 3. 枚举三个变量

找出所有满足 a² + b² = c² 的勾股数（a, b, c < 100）：

```cpp
for (int a = 1; a < 100; a++) {
    for (int b = a; b < 100; b++) {
        for (int c = b; c < 100; c++) {
            if (a * a + b * b == c * c) {
                cout << a << " " << b << " " << c << endl;
            }
        }
    }
}
```

## 枚举优化

### 1. 减少枚举范围

**问题**：找出 1-1000 中所有完全平方数。

❌ **未优化**：

```cpp
for (int i = 1; i <= 1000; i++) {
    int sqrt_i = sqrt(i);
    if (sqrt_i * sqrt_i == i) {
        cout << i << " ";
    }
}
```

✅ **优化后**：

```cpp
for (int i = 1; i * i <= 1000; i++) {
    cout << i * i << " ";
}
```

### 2. 剪枝

**问题**：找出所有满足 a + b + c = 100 的正整数解（a, b, c > 0）。

❌ **未优化**：

```cpp
for (int a = 1; a < 100; a++) {
    for (int b = 1; b < 100; b++) {
        for (int c = 1; c < 100; c++) {
            if (a + b + c == 100) {
                // ...
            }
        }
    }
}
```

✅ **优化后**：

```cpp
for (int a = 1; a < 99; a++) {
    for (int b = 1; b < 100 - a; b++) {
        int c = 100 - a - b;
        if (c > 0) {
            // ...
        }
    }
}
```

### 3. 对称性

**问题**：找出所有两数之和为 10 的正整数对。

❌ **未优化**：会输出 (1,9) 和 (9,1)

```cpp
for (int a = 1; a < 10; a++) {
    for (int b = 1; b < 10; b++) {
        if (a + b == 10) {
            cout << "(" << a << ", " << b << ")" << endl;
        }
    }
}
```

✅ **优化后**：利用对称性

```cpp
for (int a = 1; a < 10; a++) {
    int b = 10 - a;
    if (b > 0 && b < 10 && a <= b) {  // a <= b 避免重复
        cout << "(" << a << ", " << b << ")" << endl;
    }
}
```

## 经典例题

### 例题 1：百钱买百鸡

**问题**：公鸡 5 元一只，母鸡 3 元一只，小鸡 1 元三只。用 100 元买 100 只鸡，有多少种买法？

```cpp
#include <iostream>
using namespace std;

int main() {
    int count = 0;
    
    for (int x = 0; x <= 20; x++) {        // 公鸡最多 20 只
        for (int y = 0; y <= 33; y++) {    // 母鸡最多 33 只
            int z = 100 - x - y;           // 小鸡数量
            
            if (z >= 0 && z % 3 == 0 && 5 * x + 3 * y + z / 3 == 100) {
                cout << "公鸡: " << x << ", 母鸡: " << y << ", 小鸡: " << z << endl;
                count++;
            }
        }
    }
    
    cout << "共有 " << count << " 种买法" << endl;
    return 0;
}
```

### 例题 2：水仙花数

**问题**：找出所有三位数的水仙花数（各位数字立方和等于该数本身）。

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 100; i < 1000; i++) {
        int a = i / 100;        // 百位
        int b = (i / 10) % 10;  // 十位
        int c = i % 10;         // 个位
        
        if (a * a * a + b * b * b + c * c * c == i) {
            cout << i << endl;
        }
    }
    
    return 0;
}
```

### 例题 3：素数判断

**问题**：判断一个数是否为素数。

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    
    return true;
}
```

### 例题 4：分解质因数

**问题**：将一个正整数分解为质因数。

```cpp
void factorize(int n) {
    cout << n << " = ";
    
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            cout << i;
            n /= i;
            if (n > 1) cout << " × ";
        }
    }
    
    if (n > 1) cout << n;
    cout << endl;
}
```

## 枚举排列

### 全排列

```cpp
#include <algorithm>

int arr[] = {1, 2, 3};
int n = 3;

// 方法 1：使用 STL
sort(arr, arr + n);
do {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
} while (next_permutation(arr, arr + n));

// 方法 2：递归
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
        swap(arr[start], arr[i]);
    }
}
```

## 枚举子集

### 二进制枚举

```cpp
int arr[] = {1, 2, 3};
int n = 3;

// 枚举所有子集
for (int mask = 0; mask < (1 << n); mask++) {
    cout << "{ ";
    for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
            cout << arr[i] << " ";
        }
    }
    cout << "}" << endl;
}
```

## 练习题

1. [洛谷 P1008 三连击](https://www.luogu.com.cn/problem/P1008)
2. [洛谷 P1618 三连击（升级版）](https://www.luogu.com.cn/problem/P1618)
3. [洛谷 P2241 统计方形](https://www.luogu.com.cn/problem/P2241)
4. [洛谷 P1157 组合的输出](https://www.luogu.com.cn/problem/P1157)

## 总结

- 枚举是最基本的算法思想
- 关键是确定枚举范围和枚举顺序
- 优化技巧：
  - 减少枚举范围
  - 剪枝
  - 利用对称性
  - 提前终止
- 时间复杂度通常较高，适合小数据
- 很多高级算法都是在枚举基础上优化而来
