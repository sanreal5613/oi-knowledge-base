# 扩展欧几里得算法

<DifficultyBadge level="medium" />

## 什么是扩展欧几里得？

扩展欧几里得算法不仅能求出两个数的最大公约数，还能找到满足贝祖等式的一组整数解：

$$
ax + by = \gcd(a, b)
$$

## 贝祖定理

对于任意整数 a, b，存在整数 x, y，使得：

$$
ax + by = \gcd(a, b)
$$

## 算法推导

由欧几里得算法：

$$
\gcd(a, b) = \gcd(b, a \bmod b)
$$

假设我们已经求出：

$$
bx' + (a \bmod b)y' = \gcd(b, a \bmod b) = \gcd(a, b)
$$

因为 $a \bmod b = a - \lfloor a/b \rfloor \cdot b$，代入得：

$$
bx' + (a - \lfloor a/b \rfloor \cdot b)y' = \gcd(a, b)
$$

$$
ay' + b(x' - \lfloor a/b \rfloor \cdot y') = \gcd(a, b)
$$

所以：

$$
x = y', \quad y = x' - \lfloor a/b \rfloor \cdot y'
$$

## 代码实现

### 递归版

```cpp
// 返回 gcd(a, b)，同时求出 x, y 使得 ax + by = gcd(a, b)
int exgcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    
    int x1, y1;
    int g = exgcd(b, a % b, x1, y1);
    
    x = y1;
    y = x1 - (a / b) * y1;
    
    return g;
}
```

### 迭代版

```cpp
int exgcd(int a, int b, int& x, int& y) {
    x = 1, y = 0;
    int x1 = 0, y1 = 1;
    
    while (b) {
        int q = a / b;
        tie(x, x1) = make_pair(x1, x - q * x1);
        tie(y, y1) = make_pair(y1, y - q * y1);
        tie(a, b) = make_pair(b, a - q * b);
    }
    
    return a;
}
```

## 应用

### 1. 求乘法逆元

```cpp
// 求 a 在模 mod 下的逆元（a 和 mod 互质）
int modInverse(int a, int mod) {
    int x, y;
    int g = exgcd(a, mod, x, y);
    
    if (g != 1) return -1;  // 逆元不存在
    
    return (x % mod + mod) % mod;
}
```

### 2. 求解线性同余方程

```cpp
// 解 ax ≡ b (mod m)
// 返回最小非负解，无解返回 -1
int solveLinearCongruence(int a, int b, int m) {
    int x, y;
    int g = exgcd(a, m, x, y);
    
    if (b % g != 0) return -1;  // 无解
    
    x = (long long)x * (b / g) % m;
    return (x % m + m) % m;
}
```

### 3. 求解不定方程

```cpp
// 求 ax + by = c 的所有整数解
// 返回是否有解
bool solveDiophantine(int a, int b, int c, int& x0, int& y0) {
    int g = exgcd(a, b, x0, y0);
    
    if (c % g != 0) return false;  // 无解
    
    x0 *= c / g;
    y0 *= c / g;
    return true;
}

// 通解：
// x = x0 + (b/g) * t
// y = y0 - (a/g) * t
// 其中 t 为任意整数
```

### 4. 青蛙约会问题

```cpp
// 两只青蛙从 x, y 出发，每次跳 m, n 步，环长 L
// 求相遇时间：x + m*t ≡ y + n*t (mod L)
// 即 (m-n)*t ≡ y-x (mod L)

long long frogMeeting(long long x, long long y, long long m, long long n, long long L) {
    long long a = m - n;
    long long b = y - x;
    
    // 处理负数
    a = (a % L + L) % L;
    b = (b % L + L) % L;
    
    long long X, Y;
    long long g = exgcd(a, L, X, Y);
    
    if (b % g != 0) return -1;  // 无解
    
    X = (X % (L / g) + (L / g)) % (L / g);
    return (b / g * X) % (L / g);
}
```

## 练习题

1. [洛谷 P1082 同余方程](https://www.luogu.com.cn/problem/P1082)
2. [洛谷 P1516 青蛙的约会](https://www.luogu.com.cn/problem/P1516)
3. [LeetCode 365. 水壶问题](https://leetcode.cn/problems/water-and-jug-problem/)

## 总结

- 扩展欧几里得求 ax + by = gcd(a, b) 的解
- 时间复杂度：O(log min(a, b))
- 应用：求逆元、解同余方程、解不定方程
