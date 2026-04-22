# 最大公约数

<DifficultyBadge level="easy" />

## 什么是最大公约数？

**最大公约数**（Greatest Common Divisor，GCD）是能同时整除两个数的最大正整数。

```
GCD(12, 18) = 6
因为 6 是能同时整除 12 和 18 的最大数

12 的约数：1, 2, 3, 4, 6, 12
18 的约数：1, 2, 3, 6, 9, 18
公约数：1, 2, 3, 6
最大公约数：6
```

## 辗转相除法（欧几里得算法）

### 原理

```
GCD(a, b) = GCD(b, a % b)
直到 b = 0 时，GCD(a, 0) = a
```

### 代码实现

```cpp
// 递归版本
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 迭代版本
int gcd(int a, int b) {
    while (b) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

// C++17 内置函数
#include <numeric>
int g = gcd(12, 18);  // 6
```

### 示例

```cpp
GCD(48, 18)
= GCD(18, 48 % 18) = GCD(18, 12)
= GCD(12, 18 % 12) = GCD(12, 6)
= GCD(6, 12 % 6) = GCD(6, 0)
= 6
```

## 更相减损术

```cpp
int gcd(int a, int b) {
    while (a != b) {
        if (a > b) a -= b;
        else b -= a;
    }
    return a;
}
// 效率较低，不推荐
```

## 经典应用

### 1. 分数约分

```cpp
struct Fraction {
    int num, den;  // 分子，分母
    
    void reduce() {
        int g = gcd(num, den);
        num /= g;
        den /= g;
    }
};
```

### 2. 判断互质

```cpp
bool isCoprime(int a, int b) {
    return gcd(a, b) == 1;
}
```

### 3. 多个数的 GCD

```cpp
int gcdMultiple(vector<int>& nums) {
    int result = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        result = gcd(result, nums[i]);
        if (result == 1) break;  // 提前退出
    }
    return result;
}
```

## 练习题

1. [LeetCode 1979. 找出数组的最大公约数](https://leetcode.cn/problems/find-greatest-common-divisor-of-array/)
2. [洛谷 P1029 最大公约数和最小公倍数问题](https://www.luogu.com.cn/problem/P1029)

## 总结

- GCD(a, b) = GCD(b, a % b)
- 时间复杂度：O(log min(a, b))
- 应用：分数约分、判断互质
