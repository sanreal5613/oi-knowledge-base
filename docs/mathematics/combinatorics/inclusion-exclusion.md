# 容斥原理

<DifficultyBadge level="medium" />

## 什么是容斥原理？

**容斥原理**（Inclusion-Exclusion Principle）用于计算多个集合的并集大小，通过**包含**和**排除**来避免重复计数。

```
|A ∪ B| = |A| + |B| - |A ∩ B|

解释：
- 先包含 A 和 B 的所有元素
- 再排除 A 和 B 的交集（被重复计算的部分）
```

## 两个集合

```
|A ∪ B| = |A| + |B| - |A ∩ B|

图示：
    A     B
   ┌───┐ ┌───┐
   │   │ │   │
   │ ┌─┼─┐   │
   │ │∩│ │   │
   │ └─┼─┘   │
   └───┘ └───┘

A ∪ B = A + B - A∩B
```

## 三个集合

```
|A ∪ B ∪ C| = |A| + |B| + |C|
              - |A ∩ B| - |A ∩ C| - |B ∩ C|
              + |A ∩ B ∩ C|

规律：
- 单个集合：加
- 两个集合交集：减
- 三个集合交集：加
- 符号：(-1)^(k+1)，k 是集合个数
```

## n 个集合的通用公式

```
|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| 
                       - Σ|Aᵢ ∩ A| 
                       + Σ|Aᵢ ∩ A ∩ A|
                       - ...
                       + (-1)^(n+1) |A₁ ∩ A₂ ∩ ... ∩ Aₙ|

符号规律：
- 奇数个集合：加
- 偶数个集合：减
```

## 代码实现

### 子集枚举实现

```cpp
#include <iostream>
using namespace std;

// n 个集合，求并集大小
// cnt[i]：第 i 个集合的元素个数
// intersection[mask]：mask 表示的集合的交集大小

long long inclusionExclusion(int n, long long cnt[], 
                            long long intersection[]) {
    long long result = 0;
    
    // 枚举所有非空子集
    for (int mask = 1; mask < (1 << n); mask++) {
        // 计算当前子集包含几个集合
        int bits = __builtin_popcount(mask);
        
        // 符号：奇数加，偶数减
        if (bits % 2 == 1) {
            result += intersection[mask];
        } else {
            result -= intersection[mask];
        }
    }
    
    return result;
}
```

## 经典应用

### 1. 能被整除的数的个数

**问题**：1 到 n 中，能被 a 或 b 整除的数有多少个？

```cpp
// |A| = n/a，能被 a 整除
// |B| = n/b，能被 b 整除
// |A ∩ B| = n/lcm(a,b)，能被 lcm(a,b) 整除

long long countDivisible(long long n, long long a, long long b) {
    long long countA = n / a;
    long long countB = n / b;
    long long countAB = n / lcm(a, b);
    
    return countA + countB - countAB;
}

// 示例：1-100中，能被3或5整除的数
// 100/3 = 33，100/5 = 20，100/15 = 6
// 答案 = 33 + 20 - 6 = 47
```

### 2. 能被多个数整除的个数

**问题**：1 到 n 中，能被 a₁, a₂, ..., aₖ 中至少一个整除的数有多少个？

```cpp
long long countDivisibleMultiple(long long n, vector<long long>& a) {
    int k = a.size();
    long long result = 0;
    
    // 枚举所有非空子集
    for (int mask = 1; mask < (1 << k); mask++) {
        long long lcmVal = 1;
        int bits = 0;
        
        for (int i = 0; i < k; i++) {
            if (mask >> i & 1) {
                bits++;
                lcmVal = lcm(lcmVal, a[i]);
                if (lcmVal > n) break;  // 优化
            }
        }
        
        if (lcmVal > n) continue;
        
        long long count = n / lcmVal;
        
        // 奇数加，偶数减
        if (bits % 2 == 1) {
            result += count;
        } else {
            result -= count;
        }
    }
    
    return result;
}
```

### 3. 与 n 互质的数的个数（欧拉函数）

```cpp
// φ(n) = n × Π(1 - 1/p)，p 是 n 的质因子

int eulerPhi(int n) {
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
        result = result / n * (n - 1);
    }
    
    return result;
}

// 容斥原理版本
int eulerPhiInclusion(int n) {
    // 先分解质因数
    vector<int> primes;
    int temp = n;
    for (int i = 2; i * i <= temp; i++) {
        if (temp % i == 0) {
            primes.push_back(i);
            while (temp % i == 0) {
                temp /= i;
            }
        }
    }
    if (temp > 1) primes.push_back(temp);
    
    // 容斥
    int k = primes.size();
    int result = 0;
    
    for (int mask = 1; mask < (1 << k); mask++) {
        int bits = __builtin_popcount(mask);
        int mul = 1;
        
        for (int i = 0; i < k; i++) {
            if (mask >> i & 1) {
                mul *= primes[i];
            }
        }
        
        if (bits % 2 == 1) {
            result += n / mul;
        } else {
            result -= n / mul;
        }
    }
    
    return n - result;  // 与 n 不互质的个数，所以用 n 减
}
```

### 4. 错排问题

**问题**：n 个元素的排列，每个元素都不在原来的位置。

```cpp
// D[n] = n! - C(n,1)×(n-1)! + C(n,2)×(n-2)! - ... + (-1)^n × C(n,n)×0!
//      = n! × (1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n!)

long long derangement(int n) {
    long long result = 0;
    long long fact = 1;
    
    for (int i = 0; i <= n; i++) {
        if (i > 0) fact *= i;
        
        long long term = fact;
        if (i % 2 == 1) term = -term;
        
        result += term;
    }
    
    return result;
}

// 递推公式更简单
// D[n] = (n-1) × (D[n-1] + D[n-2])
```

### 5. 染色问题

**问题**：用 m 种颜色给 n 个区域染色，相邻区域颜色不同。

```cpp
// 容斥原理：总方案数 - 至少一对相邻同色的方案数

long long colorCount(int n, int m, vector<pair<int,int>>& edges) {
    int k = edges.size();
    long long result = 0;
    
    // 枚举边的子集
    for (int mask = 0; mask < (1 << k); mask++) {
        // 计算连通块个数
        UnionFind uf(n);
        int components = n;
        
        for (int i = 0; i < k; i++) {
            if (mask >> i & 1) {
                auto [u, v] = edges[i];
                if (uf.unite(u, v)) {
                    components--;
                }
            }
        }
        
        long long ways = quickPow(m, components);
        int bits = __builtin_popcount(mask);
        
        if (bits % 2 == 0) {
            result += ways;
        } else {
            result -= ways;
        }
    }
    
    return result;
}
```

## 容斥原理技巧

### 1. 补集转化

```cpp
// 求「至少一个」的个数，转化为「总数 - 全不满足」
// 求「所有都满足」的个数，转化为「总数 - 至少一个不满足」

// 例：求与 n 互质的个数
// = n - 能被 n 的任一质因子整除的个数
```

### 2. 子集枚举

```cpp
// 枚举所有子集
for (int mask = 0; mask < (1 << n); mask++) {
    // mask 的第 i 位为 1 表示选中第 i 个集合
}

// 枚举非空子集
for (int mask = 1; mask < (1 << n); mask++) { ... }

// 枚举特定大小的子集
for (int mask = 0; mask < (1 << n); mask++) {
    if (__builtin_popcount(mask) == k) { ... }
}
```

### 3. 符号判断

```cpp
// 方法1：奇偶判断
if (bits % 2 == 1) ...  // 奇数加
else ...                // 偶数减

// 方法2：位运算
int sign = (bits % 2 == 1) ? 1 : -1;
result += sign * count;

// 方法3：直接计算
result += ((bits % 2 == 1) ? 1 : -1) * count;
```

## 练习题

1. [洛谷 P2567 幸运数字](https://www.luogu.com.cn/problem/P2567)（容斥 + 枚举）
2. [洛谷 P1450 硬币购物](https://www.luogu.com.cn/problem/P1450)（容斥原理）
3. [洛谷 P3197 越狱](https://www.luogu.com.cn/problem/P3197)（容斥原理）
4. [LeetCode 1782. 统计点对的数目](https://leetcode.cn/problems/count-pairs-of-nodes/)

## 总结

- 容斥原理：奇加偶减
- 公式：|A ∪ B| = |A| + |B| - |A ∩ B|
- 应用：计数问题、概率问题
- 技巧：补集转化、子集枚举
- 常与质因数分解、LCM 结合使用
