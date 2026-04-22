# 生成函数

<DifficultyBadge level="hard" />

## 什么是生成函数？

生成函数（Generating Function）是一种将序列编码为多项式（或幂级数）的方法，用于解决组合计数问题。

### 普通生成函数

对于序列 $a_0, a_1, a_2, ...$，其普通生成函数为：

$G(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + ... = \sum_{n=0}^{\infty} a_n x^n$

### 示例

| 序列 | 生成函数 |
|------|---------|
| 1, 1, 1, 1, ... | $\frac{1}{1-x}$ |
| 1, 2, 3, 4, ... | $\frac{1}{(1-x)^2}$ |
| 1, 0, 1, 0, ... | $\frac{1}{1-x^2}$ |
| $C_n^0, C_n^1, ..., C_n^n$ | $(1+x)^n$ |
| 斐波那契数列 | $\frac{x}{1-x-x^2}$ |

## 基本运算

### 加法

若 $A(x) = \sum a_n x^n$，$B(x) = \sum b_n x^n$，则：

$A(x) + B(x) = \sum (a_n + b_n) x^n$

### 乘法（卷积）

$A(x) \cdot B(x) = \sum_{n=0}^{\infty} \left(\sum_{k=0}^{n} a_k b_{n-k}\right) x^n$

卷积对应序列的**卷积**运算。

## 常用生成函数

### 基本序列

```
1, 1, 1, 1, ...     →  1/(1-x)
1, 2, 3, 4, ...     →  1/(1-x)^2
1, 4, 9, 16, ...    →  (1+x)/(1-x)^3
1, r, r^2, r^3, ... →  1/(1-rx)
```

### 组合数

```
C(n,0), C(n,1), ..., C(n,n)  →  (1+x)^n
C(n+k-1, k)                  →  1/(1-x)^n
```

## 应用

### 1. 整数拆分

```cpp
// 求 n 拆分成 1, 2, 3, ... 的和的方案数
// 生成函数：1/((1-x)(1-x^2)(1-x^3)...)

const int MAXN = 1005;
int dp[MAXN];

int partition(int n) {
    dp[0] = 1;
    
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j++) {
            dp[j] += dp[j - i];
        }
    }
    
    return dp[n];
}
```

### 2. 硬币问题

```cpp
// 有面值为 1, 2, 5 的硬币无限个
// 求组成金额 n 的方案数

int coinChange(int n) {
    vector<int> dp(n + 1);
    dp[0] = 1;
    
    int coins[] = {1, 2, 5};
    
    for (int c : coins) {
        for (int i = c; i <= n; i++) {
            dp[i] += dp[i - c];
        }
    }
    
    return dp[n];
}
```

### 3. 斐波那契数列

```cpp
// 斐波那契数列：F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}
// 生成函数：F(x) = x / (1 - x - x^2)

// 推导：
// F(x) = F_0 + F_1*x + F_2*x^2 + F_3*x^3 + ...
//      = 0 + x + (F_1+F_0)*x^2 + (F_2+F_1)*x^3 + ...
//      = x + x*(F_0 + F_1*x + ...) + x^2*(F_0 + F_1*x + ...)
//      = x + x*F(x) + x^2*F(x)
// F(x)*(1 - x - x^2) = x
// F(x) = x / (1 - x - x^2)
```

### 4. 卡特兰数

```cpp
// 卡特兰数的生成函数：C(x) = (1 - sqrt(1-4x)) / (2x)

// 推导：
// C_n = sum(C_i * C_{n-1-i})
// C(x) = 1 + x*C(x)^2
// 解得：C(x) = (1 - sqrt(1-4x)) / (2x)
```

## 指数生成函数

对于序列 $a_0, a_1, a_2, ...$，其指数生成函数为：

$
\hat{G}(x) = a_0 + a_1\frac{x}{1!} + a_2\frac{x^2}{2!} + a_3\frac{x^3}{3!} + ... = \sum_{n=0}^{\infty} a_n \frac{x^n}{n!}
$

### 应用：排列问题

```cpp
// n 个不同元素的排列数：n!
// 指数生成函数：sum(n! * x^n / n!) = sum(x^n) = 1/(1-x)
```

## 多项式乘法（FFT/NTT）

当需要快速计算卷积时，使用 FFT 或 NTT：

```cpp
// 多项式乘法：计算两个序列的卷积
// 使用 NTT（数论变换）

#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int MOD = 998244353;
const int G = 3;  // 原根

ll power(ll a, ll b) {
    ll res = 1;
    a %= MOD;
    while (b > 0) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

void ntt(vector<ll>& a, bool invert) {
    int n = a.size();
    
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) {
            j ^= bit;
        }
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    
    for (int len = 2; len <= n; len <<= 1) {
        ll wlen = power(G, (MOD - 1) / len);
        if (invert) wlen = power(wlen, MOD - 2);
        
        for (int i = 0; i < n; i += len) {
            ll w = 1;
            for (int j = 0; j < len / 2; j++) {
                ll u = a[i + j];
                ll v = a[i + j + len / 2] * w % MOD;
                a[i + j] = (u + v) % MOD;
                a[i + j + len / 2] = (u - v + MOD) % MOD;
                w = w * wlen % MOD;
            }
        }
    }
    
    if (invert) {
        ll n_inv = power(n, MOD - 2);
        for (ll& x : a) {
            x = x * n_inv % MOD;
        }
    }
}

vector<ll> multiply(vector<ll> a, vector<ll> b) {
    int n = 1;
    while (n < a.size() + b.size()) {
        n <<= 1;
    }
    
    a.resize(n);
    b.resize(n);
    
    ntt(a, false);
    ntt(b, false);
    
    for (int i = 0; i < n; i++) {
        a[i] = a[i] * b[i] % MOD;
    }
    
    ntt(a, true);
    
    return a;
}
```

## 练习题

1. [洛谷 P1303 A*B Problem](https://www.luogu.com.cn/problem/P1303)（FFT/NTT）
2. [洛谷 P3803 【模板】多项式乘法（FFT）](https://www.luogu.com.cn/problem/P3803)
3. [洛谷 P4721 【模板】分治 FFT](https://www.luogu.com.cn/problem/P4721)

## 总结

- 生成函数将序列编码为多项式
- 普通生成函数用于组合问题
- 指数生成函数用于排列问题
- 多项式乘法可用 FFT/NTT 加速
- 应用：整数拆分、硬币问题、递推关系求解
