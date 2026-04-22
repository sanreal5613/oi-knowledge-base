# 欧拉函数

<DifficultyBadge level="medium" />

## 什么是欧拉函数？

欧拉函数 $\varphi(n)$ 表示小于等于 $n$ 的正整数中与 $n$ **互质**的数的个数。

### 示例

- $\varphi(1) = 1$
- $\varphi(2) = 1$（只有 1）
- $\varphi(3) = 2$（1, 2）
- $\varphi(4) = 2$（1, 3）
- $\varphi(5) = 4$（1, 2, 3, 4）
- $\varphi(6) = 2$（1, 5）
- $\varphi(7) = 6$（1, 2, 3, 4, 5, 6）

## 性质

### 性质1：若 p 是质数

$$
\varphi(p) = p - 1
$$

### 性质2：若 p 是质数，k ≥ 1

$$
\varphi(p^k) = p^k - p^{k-1} = p^{k-1}(p-1)
$$

### 性质3：积性函数

若 $\gcd(a, b) = 1$，则：

$$
\varphi(ab) = \varphi(a) \cdot \varphi(b)
$$

### 性质4：一般公式

若 $n = p_1^{k_1} \cdot p_2^{k_2} \cdot ... \cdot p_m^{k_m}$，则：

$$
\varphi(n) = n \cdot \prod_{i=1}^{m} \left(1 - \frac{1}{p_i}\right)
$$

## 计算方法

### 单个数的欧拉函数

```cpp
// 计算单个数的欧拉函数
int euler(int n) {
    int result = n;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            // i 是质因子
            result = result / i * (i - 1);
            while (n % i == 0) {
                n /= i;
            }
        }
    }
    
    if (n > 1) {
        // n 是质数
        result = result / n * (n - 1);
    }
    
    return result;
}
```

### 线性筛求欧拉函数

```cpp
const int MAXN = 1e6 + 5;
int phi[MAXN];
int primes[MAXN], cnt;
bool isPrime[MAXN];

// 线性筛求 1~n 的欧拉函数
void eulerSieve(int n) {
    for (int i = 2; i <= n; i++) {
        isPrime[i] = true;
    }
    
    phi[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes[++cnt] = i;
            phi[i] = i - 1;  // 质数的欧拉函数
        }
        
        for (int j = 1; j <= cnt && i * primes[j] <= n; j++) {
            isPrime[i * primes[j]] = false;
            
            if (i % primes[j] == 0) {
                // primes[j] 是 i 的质因子
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            } else {
                phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            }
        }
    }
}
```

## 欧拉定理

若 $\gcd(a, n) = 1$，则：

$$
a^{\varphi(n)} \equiv 1 \pmod{n}
$$

### 费马小定理（特例）

若 $p$ 是质数，$\gcd(a, p) = 1$，则：

$$
a^{p-1} \equiv 1 \pmod{p}
$$

## 应用

### 1. 快速幂取模

```cpp
// 利用欧拉定理降幂
// a^b mod m，当 b 很大时
// 若 gcd(a, m) = 1，则 a^b ≡ a^(b mod φ(m)) (mod m)

long long powerMod(long long a, long long b, long long mod) {
    if (gcd(a, mod) == 1) {
        b = b % euler(mod) + euler(mod);  // 处理 b < φ(m) 的情况
    }
    return fastPow(a, b, mod);
}
```

### 2. 循环节问题

```cpp
// 求 a^b 的最后一位
// 即 a^b mod 10
// 由于 φ(10) = 4，所以 a^b ≡ a^(b mod 4 + 4) (mod 10)

int lastDigit(int a, int b) {
    if (b == 0) return 1;
    
    int phi = 4;  // φ(10) = 4
    int exp = b % phi;
    if (exp == 0) exp = phi;
    
    int result = 1;
    a = a % 10;
    
    for (int i = 0; i < exp; i++) {
        result = (result * a) % 10;
    }
    
    return result;
}
```

### 3. 互质对计数

```cpp
// 统计 1~n 中与 n 互质的数的个数
// 直接返回 φ(n)

// 统计 1~n 中与 m 互质的数的个数
int countCoprime(int n, int m) {
    // 容斥原理
    vector<int> primes;
    int temp = m;
    
    for (int i = 2; i * i <= temp; i++) {
        if (temp % i == 0) {
            primes.push_back(i);
            while (temp % i == 0) temp /= i;
        }
    }
    if (temp > 1) primes.push_back(temp);
    
    int result = 0;
    int k = primes.size();
    
    // 容斥
    for (int mask = 1; mask < (1 << k); mask++) {
        int bits = __builtin_popcount(mask);
        int mult = 1;
        
        for (int i = 0; i < k; i++) {
            if (mask & (1 << i)) {
                mult *= primes[i];
            }
        }
        
        if (bits % 2 == 1) {
            result += n / mult;
        } else {
            result -= n / mult;
        }
    }
    
    return n - result;
}
```

## 练习题

1. [洛谷 P5091 【模板】欧拉函数](https://www.luogu.com.cn/problem/P5091)
2. [洛谷 P2158 仪仗队](https://www.luogu.com.cn/problem/P2158)
3. [洛谷 P2303 求导](https://www.luogu.com.cn/problem/P2303)
4. [LeetCode 204. 计数质数](https://leetcode.cn/problems/count-primes/)

## 总结

- 欧拉函数 φ(n)：小于等于 n 且与 n 互质的数的个数
- 积性函数：φ(ab) = φ(a)φ(b)（当 gcd(a,b)=1）
- 欧拉定理：a^φ(n) ≡ 1 (mod n)
- 线性筛可在 O(n) 内求出 1~n 的所有欧拉函数值
