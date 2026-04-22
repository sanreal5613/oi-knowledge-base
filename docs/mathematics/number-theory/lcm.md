# 最小公倍数

<DifficultyBadge level="easy" />

## 什么是最小公倍数？

**最小公倍数**（Least Common Multiple，LCM）是能同时被两个数整除的最小正整数。

```
LCM(4, 6) = 12
因为 12 是能同时被 4 和 6 整除的最小数

4 的倍数：4, 8, 12, 16, 20, 24, ...
6 的倍数：6, 12, 18, 24, 30, ...
公倍数：12, 24, 36, ...
最小公倍数：12
```

## 计算公式

```
LCM(a, b) = a × b / GCD(a, b)
```

**注意**：先除后乘，防止溢出

## 代码实现

```cpp
// 先求 GCD
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 计算 LCM
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

// C++17 内置函数
#include <numeric>
long long l = lcm(4, 6);  // 12
```

## 多个数的 LCM

```cpp
int lcmMultiple(vector<int>& nums) {
    long long result = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        result = lcm(result, nums[i]);
    }
    return result;
}
```

## 经典应用

### 1. 分数通分

```cpp
// 求两个分数的最小公分母
int commonDenominator(int a, int b) {
    return lcm(a, b);
}
```

### 2. 周期性事件

```cpp
// 问题：A 每 4 天来一次，B 每 6 天来一次
// 问：他们多少天后会再次同时出现？
// 答案：LCM(4, 6) = 12 天后
```

### 3. 同步问题

```cpp
// 三个齿轮分别有 8, 12, 20 个齿
// 问：转多少圈后三个齿轮的标记会再次对齐？
// 答案：LCM(8, 12, 20) = 120 齿 = 15, 10, 6 圈
```

## GCD 与 LCM 的关系

```
对于任意两个正整数 a, b：
GCD(a, b) × LCM(a, b) = a × b
```

## 练习题

1. [洛谷 P1029 最大公约数和最小公倍数问题](https://www.luogu.com.cn/problem/P1029)
2. [LeetCode 2478. 完美分割的方案数](https://leetcode.cn/problems/number-of-beautiful-partitions/)（涉及 LCM）

## 总结

- LCM(a, b) = a × b / GCD(a, b)
- 先除后乘，防止溢出
- 应用：分数通分、周期计算
