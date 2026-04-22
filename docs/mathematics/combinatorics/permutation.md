# 排列组合

<DifficultyBadge level="medium" />

## 什么是排列组合？

**排列**和**组合**是计算选取元素方式的数学工具。

```
排列（Permutation）：考虑顺序
组合（Combination）：不考虑顺序

从 {A, B, C} 选 2 个：
排列：AB, AC, BA, BC, CA, CB（6种）
组合：AB, AC, BC（3种）
```

## 排列

### 定义

从 n 个不同元素中取出 m 个元素，按照一定顺序排成一列。

```
P(n, m) = n! / (n-m)!
        = n × (n-1) × ... × (n-m+1)
```

### 代码实现

```cpp
// 计算 P(n, m)
long long permutation(int n, int m) {
    long long res = 1;
    for (int i = 0; i < m; i++) {
        res *= (n - i);
    }
    return res;
}

// 示例
P(5, 3) = 5 × 4 × 3 = 60
```

## 组合

### 定义

从 n 个不同元素中取出 m 个元素，不考虑顺序。

```
C(n, m) = n! / (m! × (n-m)!)
        = P(n, m) / m!
        = n × (n-1) × ... × (n-m+1) / (1 × 2 × ... × m)
```

### 代码实现

```cpp
// 计算 C(n, m)
long long combination(int n, int m) {
    if (m > n) return 0;
    if (m == 0 || m == n) return 1;
    
    // 利用对称性：C(n, m) = C(n, n-m)
    if (m > n - m) m = n - m;
    
    long long res = 1;
    for (int i = 0; i < m; i++) {
        res = res * (n - i) / (i + 1);
    }
    return res;
}

// 示例
C(5, 3) = C(5, 2) = (5 × 4) / (1 × 2) = 10
```

## 阶乘预处理

### 预处理阶乘和逆阶乘

```cpp
const int MAXN = 1e6 + 5;
const int MOD = 1e9 + 7;

long long fac[MAXN], invFac[MAXN];

long long quickPow(long long a, long long b) {
    long long res = 1;
    while (b) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

void init() {
    fac[0] = 1;
    for (int i = 1; i < MAXN; i++) {
        fac[i] = fac[i - 1] * i % MOD;
    }
    
    invFac[MAXN - 1] = quickPow(fac[MAXN - 1], MOD - 2);
    for (int i = MAXN - 2; i >= 0; i--) {
        invFac[i] = invFac[i + 1] * (i + 1) % MOD;
    }
}

// C(n, m) = n! / (m! × (n-m)!)
long long C(int n, int m) {
    if (m > n || m < 0) return 0;
    return fac[n] * invFac[m] % MOD * invFac[n - m] % MOD;
}

// P(n, m) = n! / (n-m)!
long long P(int n, int m) {
    if (m > n || m < 0) return 0;
    return fac[n] * invFac[n - m] % MOD;
}
```

## 杨辉三角（帕斯卡三角形）

```
        1
      1   1
    1   2   1
  1   3   3   1
1   4   6   4   1
...

C[n][m] = C[n-1][m-1] + C[n-1][m]
```

```cpp
const int MAXN = 1005;

long long C[MAXN][MAXN];

void init() {
    for (int i = 0; i < MAXN; i++) {
        C[i][0] = C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
        }
    }
}
```

## 组合数性质

```cpp
// 1. C(n, m) = C(n, n-m)  对称性
C(5, 3) = C(5, 2) = 10

// 2. C(n, 0) = C(n, n) = 1
C(5, 0) = C(5, 5) = 1

// 3. C(n, m) = C(n-1, m-1) + C(n-1, m)  递推公式
C(5, 3) = C(4, 2) + C(4, 3) = 6 + 4 = 10

// 4. Σ C(n, i) = 2^n  二项式定理
C(3, 0) + C(3, 1) + C(3, 2) + C(3, 3) = 1 + 3 + 3 + 1 = 8 = 2^3

// 5. Σ i × C(n, i) = n × 2^(n-1)
```

## 经典应用

### 1. 路径计数

```cpp
// 从 (0, 0) 走到 (n, m)，只能向右或向上走
// 方案数 = C(n+m, n) = C(n+m, m)

int pathCount(int n, int m) {
    return C(n + m, n);
}

// 解释：总共走 n+m 步，选 n 步向右（或 m 步向上）
```

### 2. 卡特兰数

```cpp
// 卡特兰数：C(2n, n) / (n+1)
// 应用：括号匹配、二叉树计数、出栈序列

long long catalan(int n) {
    return C(2 * n, n) * quickPow(n + 1, MOD - 2) % MOD;
}

// 前几个卡特兰数：1, 2, 5, 14, 42, 132, 429...
```

### 3. 隔板法

```cpp
// n 个相同小球放入 m 个不同盒子，每个盒子至少一个
// 方案数 = C(n-1, m-1)

// n 个相同小球放入 m 个不同盒子，可以为空
// 方案数 = C(n+m-1, m-1)
```

### 4. 错排问题

```cpp
// n 个元素的排列，每个元素都不在原来的位置
// 错排数 D[n] = (n-1) × (D[n-1] + D[n-2])

long long derangement[MAXN];

void initDerangement() {
    derangement[0] = 1;
    derangement[1] = 0;
    for (int i = 2; i < MAXN; i++) {
        derangement[i] = (i - 1) * (derangement[i-1] + derangement[i-2]) % MOD;
    }
}

// 前几个错排数：1, 0, 1, 2, 9, 44, 265...
```

### 5. 二项式定理

```cpp
// (a + b)^n = Σ C(n, i) × a^i × b^(n-i)

// 应用：求 (1 + 1)^n = 2^n = Σ C(n, i)
//      (1 - 1)^n = 0 = Σ (-1)^i × C(n, i)
```

## 卢卡斯定理

用于计算 **C(n, m) mod p**，其中 p 是质数，n 和 m 很大。

```cpp
// Lucas定理：C(n, m) ≡ C(n/p, m/p) × C(n%p, m%p) (mod p)

long long lucas(long long n, long long m, int p) {
    if (m == 0) return 1;
    return C(n % p, m % p) * lucas(n / p, m / p, p) % p;
}
```

## 练习题

1. [洛谷 P3807 【模板】卢卡斯定理](https://www.luogu.com.cn/problem/P3807)
2. [洛谷 P1313 计算系数](https://www.luogu.com.cn/problem/P1313)
3. [洛谷 P2822 组合数问题](https://www.luogu.com.cn/problem/P2822)
4. [LeetCode 62. 不同路径](https://leetcode.cn/problems/unique-paths/)
5. [LeetCode 96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)（卡特兰数）

## 总结

- 排列 P(n, m)：考虑顺序，n!/(n-m)!
- 组合 C(n, m)：不考虑顺序，n!/(m!(n-m)!)
- 预处理阶乘：O(1) 查询组合数
- 杨辉三角：C[n][m] = C[n-1][m-1] + C[n-1][m]
- 卡特兰数：C(2n, n)/(n+1)
- 卢卡斯定理：大数组合数取模
