# 质数与筛法

<DifficultyBadge level="medium" />

## 质数基础

质数（素数）是**只能被 1 和自身整除**的大于 1 的整数。

```
质数：2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...
合数：4, 6, 8, 9, 10, 12, ...
特殊：1 既不是质数也不是合数
```

## 判断质数

### 朴素方法 O(n)

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### 优化方法 O(√n)

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

::: tip 为什么只枚举到 √n？
如果 n 有一个因子 d > √n，那么 n/d < √n 也是因子，所以只需枚举到 √n。
:::

## 埃拉托斯特尼筛法（埃氏筛）

求 1 到 n 内所有质数，时间复杂度 O(n log log n)。

### 算法思想

1. 从 2 开始，标记所有 2 的倍数为合数
2. 找下一个未标记的数（质数），标记其倍数
3. 重复直到 √n

```cpp
const int MAXN = 1e7 + 5;
bool is_composite[MAXN];  // is_composite[i] = true 表示 i 是合数
vector<int> primes;

void sieve(int n) {
    fill(is_composite, is_composite + n + 1, false);
    
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes.push_back(i);
            
            // 标记 i 的倍数
            for (long long j = (long long)i * i; j <= n; j += i) {
                is_composite[j] = true;
            }
        }
    }
}

int main() {
    sieve(1e6);
    cout << "1000000 以内有 " << primes.size() << " 个质数" << endl;
    return 0;
}
```

## 线性筛（欧拉筛）

时间复杂度严格 O(n)，每个合数只被筛一次。

```cpp
const int MAXN = 1e7 + 5;
bool is_composite[MAXN];
int primes[MAXN];
int prime_count = 0;

void linearSieve(int n) {
    fill(is_composite, is_composite + n + 1, false);
    
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes[prime_count++] = i;
        }
        
        for (int j = 0; j < prime_count && (long long)i * primes[j] <= n; j++) {
            is_composite[i * primes[j]] = true;
            
            if (i % primes[j] == 0) break;  // 关键！
        }
    }
}
```

::: tip 线性筛的关键
`if (i % primes[j] == 0) break;` 保证每个合数只被其最小质因子筛掉，从而实现线性时间。
:::

## 质因数分解

```cpp
void factorize(int n) {
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int cnt = 0;
            while (n % i == 0) {
                cnt++;
                n /= i;
            }
            cout << i << "^" << cnt << " ";
        }
    }
    if (n > 1) {
        cout << n << "^1";
    }
    cout << endl;
}

// 12 = 2^2 × 3^1
```

### 返回质因数列表

```cpp
vector<pair<int, int>> factorize(int n) {
    vector<pair<int, int>> factors;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            int cnt = 0;
            while (n % i == 0) {
                cnt++;
                n /= i;
            }
            factors.push_back({i, cnt});
        }
    }
    
    if (n > 1) {
        factors.push_back({n, 1});
    }
    
    return factors;
}
```

## 最大公约数（GCD）

```cpp
// 辗转相除法
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 迭代版本
int gcd(int a, int b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// C++17 内置
#include <numeric>
int g = gcd(12, 18);  // 6
```

## 最小公倍数（LCM）

```cpp
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 先除后乘，防止溢出
}

// C++17 内置
int l = lcm(4, 6);  // 12
```

## 欧拉函数

φ(n) = 小于等于 n 且与 n 互质的正整数个数。

```cpp
int phi(int n) {
    int result = n;
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0) {
                n /= i;
            }
            result -= result / i;
        }
    }
    
    if (n > 1) {
        result -= result / n;
    }
    
    return result;
}

// phi(12) = 4（1, 5, 7, 11 与 12 互质）
```

### 线性筛求欧拉函数

```cpp
int phi[MAXN];
int primes[MAXN];
bool is_composite[MAXN];
int prime_count = 0;

void eulerSieve(int n) {
    phi[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes[prime_count++] = i;
            phi[i] = i - 1;  // 质数的欧拉函数
        }
        
        for (int j = 0; j < prime_count && (long long)i * primes[j] <= n; j++) {
            is_composite[i * primes[j]] = true;
            
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            } else {
                phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            }
        }
    }
}
```

## 快速幂

```cpp
long long quickPow(long long a, long long b, long long mod) {
    long long result = 1;
    a %= mod;
    
    while (b > 0) {
        if (b & 1) {
            result = result * a % mod;
        }
        a = a * a % mod;
        b >>= 1;
    }
    
    return result;
}

// 2^10 mod 1000000007 = 1024
```

## 逆元

a 的逆元 a⁻¹ 满足 a × a⁻¹ ≡ 1 (mod p)。

```cpp
// 费马小定理：a^(p-1) ≡ 1 (mod p)，p 为质数
// 所以 a^(-1) ≡ a^(p-2) (mod p)

long long inv(long long a, long long p) {
    return quickPow(a, p - 2, p);
}

// 线性求逆元
int inv_arr[MAXN];
void linearInv(int n, int p) {
    inv_arr[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv_arr[i] = (long long)(p - p / i) * inv_arr[p % i] % p;
    }
}
```

## 练习题

1. [洛谷 P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)
2. [洛谷 P2158 仪仗队](https://www.luogu.com.cn/problem/P2158)（欧拉函数）
3. [洛谷 P1865 A % B Problem](https://www.luogu.com.cn/problem/P1865)
4. [LeetCode 204. 计数质数](https://leetcode.cn/problems/count-primes/)

## 总结

- 判断质数：O(√n)
- 埃氏筛：O(n log log n)
- 线性筛：O(n)，同时可求欧拉函数等
- GCD：辗转相除法，O(log n)
- LCM = a × b / GCD(a, b)
- 快速幂：O(log n)
- 逆元：费马小定理，O(log p)
