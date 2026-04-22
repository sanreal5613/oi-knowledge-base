# 逆元

<DifficultyBadge level="medium" />

## 什么是逆元？

在模运算中，**a 的逆元**（记作 a⁻¹）是满足以下条件的数：

```
a × a⁻¹ ≡ 1 (mod p)
```

逆元存在的条件：**a 和 p 互质**（gcd(a, p) = 1）

## 逆元的应用

### 模意义下的除法

```cpp
// 普通除法
(a / b) % p

// 模意义下的除法（错误！）
(a % p) / (b % p)  // 错误！

// 正确做法：乘以逆元
(a % p) × inv(b) % p
```

## 求逆元的方法

### 1. 费马小定理（p 为质数）

```
如果 p 是质数，且 a 不是 p 的倍数：
a^(p-1) ≡ 1 (mod p)

所以：
a^(-1) ≡ a^(p-2) (mod p)
```

```cpp
const int MOD = 1e9 + 7;

long long quickPow(long long a, long long b) {
    long long res = 1;
    a %= MOD;
    while (b > 0) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

// 求逆元
long long inv(long long a) {
    return quickPow(a, MOD - 2);
}

int main() {
    cout << inv(2) << endl;  // 500000004
    cout << inv(3) << endl;  // 333333336
    
    // 验证：2 × 500000004 % MOD = 1
    cout << 2 * inv(2) % MOD << endl;  // 1
    
    return 0;
}
```

### 2. 扩展欧几里得算法

适用于 **p 不是质数** 的情况。

```cpp
// 扩展欧几里得
// 求 ax + by = gcd(a, b) 的解
long long exgcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    
    long long d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}

// 求逆元
long long inv(long long a, long long p) {
    long long x, y;
    long long d = exgcd(a, p, x, y);
    
    if (d != 1) return -1;  // 逆元不存在
    
    return (x % p + p) % p;
}

int main() {
    cout << inv(2, 7) << endl;   // 4（因为 2 × 4 = 8 ≡ 1 (mod 7)）
    cout << inv(3, 11) << endl;  // 4（因为 3 × 4 = 12 ≡ 1 (mod 11)）
    
    return 0;
}
```

### 3. 线性求逆元

预处理 1 到 n 的所有逆元，O(n)。

```cpp
const int MAXN = 1e6 + 5;
long long inv[MAXN];

void initInv(int n, int p) {
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (p - p / i) * inv[p % i] % p;
    }
}

int main() {
    initInv(1000000, MOD);
    
    cout << inv[2] << endl;  // 500000004
    cout << inv[3] << endl;  // 333333336
    
    return 0;
}
```

**原理**：
```
p = k × i + r，其中 k = p / i，r = p % i

k × i + r ≡ 0 (mod p)
k × i ≡ -r (mod p)
i^(-1) ≡ -k × r^(-1) (mod p)
i^(-1) ≡ -(p / i) × inv[p % i] (mod p)
```

## 经典应用

### 1. 组合数取模

```cpp
const int MAXN = 1e6 + 5;
long long fac[MAXN], invFac[MAXN];

void init(int n) {
    fac[0] = 1;
    for (int i = 1; i <= n; i++) {
        fac[i] = fac[i - 1] * i % MOD;
    }
    
    invFac[n] = quickPow(fac[n], MOD - 2);
    for (int i = n - 1; i >= 0; i--) {
        invFac[i] = invFac[i + 1] * (i + 1) % MOD;
    }
}

// C(n, m) = n! / (m! × (n-m)!)
long long C(int n, int m) {
    if (m < 0 || m > n) return 0;
    return fac[n] * invFac[m] % MOD * invFac[n - m] % MOD;
}
```

### 2. 模意义下的平均数

```cpp
// 求 (a + b) / 2 mod p
long long average(long long a, long long b) {
    return (a + b) % MOD * inv(2) % MOD;
}
```

### 3. 矩阵求逆

```cpp
// 2×2 矩阵求逆
// |a b|⁻¹     1    | d -b|
// |c d|   = ───── × |-c  a|
//           ad-bc

void matrixInv(long long a[2][2], long long res[2][2]) {
    long long det = (a[0][0] * a[1][1] - a[0][1] * a[1][0] + MOD) % MOD;
    long long detInv = inv(det);
    
    res[0][0] = a[1][1] * detInv % MOD;
    res[0][1] = (MOD - a[0][1]) * detInv % MOD;
    res[1][0] = (MOD - a[1][0]) * detInv % MOD;
    res[1][1] = a[0][0] * detInv % MOD;
}
```

## 练习题

1. [洛谷 P3811 【模板】乘法逆元](https://www.luogu.com.cn/problem/P3811)
2. [洛谷 P1082 同余方程](https://www.luogu.com.cn/problem/P1082)（扩展欧几里得）
3. [洛谷 P1495 中国剩余定理](https://www.luogu.com.cn/problem/P1495)

## 总结

- 逆元：a × a⁻¹ ≡ 1 (mod p)
- 费马小定理：a⁻¹ ≡ a^(p-2) (mod p)，p 为质数
- 扩展欧几里得：适用于任意 p
- 线性求逆元：O(n) 预处理
- 应用：组合数、模除法
