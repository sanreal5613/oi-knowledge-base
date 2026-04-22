# 中国剩余定理

<DifficultyBadge level="hard" />

## 什么是中国剩余定理？

中国剩余定理（CRT, Chinese Remainder Theorem）用于求解一组同余方程：

```
x ≡ a1 (mod m1)
x ≡ a2 (mod m2)
...
x ≡ an (mod mn)
```

其中 m1, m2, ..., mn 两两互质。

## 定理内容

若 m1, m2, ..., mn 两两互质，则方程组有唯一解（模 M = m1 * m2 * ... * mn）：

```
x ≡ Σ(ai * Mi * Mi^(-1)) (mod M)
```

其中：
- M = m1 * m2 * ... * mn
- Mi = M / mi
- Mi^(-1) 是 Mi 在模 mi 下的逆元

## 代码实现

### 两两互质情况

```cpp
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;

// 扩展欧几里得
ll exgcd(ll a, ll b, ll& x, ll& y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    ll x1, y1;
    ll g = exgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

// 求逆元
ll modInverse(ll a, ll mod) {
    ll x, y;
    ll g = exgcd(a, mod, x, y);
    return (x % mod + mod) % mod;
}

// 中国剩余定理（两两互质）
ll crt(vector<ll>& a, vector<ll>& m) {
    int n = a.size();
    ll M = 1;
    
    for (ll mi : m) {
        M *= mi;
    }
    
    ll result = 0;
    
    for (int i = 0; i < n; i++) {
        ll Mi = M / m[i];
        ll ti = modInverse(Mi, m[i]);
        result = (result + a[i] * Mi % M * ti % M) % M;
    }
    
    return (result % M + M) % M;
}

int main() {
    // x ≡ 2 (mod 3)
    // x ≡ 3 (mod 5)
    // x ≡ 2 (mod 7)
    vector<ll> a = {2, 3, 2};
    vector<ll> m = {3, 5, 7};
    
    cout << crt(a, m) << endl;  // 输出 23
    
    return 0;
}
```

### 不互质情况（扩展CRT）

```cpp
// 扩展中国剩余定理（模数不互质）
// 合并两个同余方程
ll merge(ll a1, ll m1, ll a2, ll m2) {
    // x ≡ a1 (mod m1)
    // x ≡ a2 (mod m2)
    // 即 x = a1 + m1*k，代入第二个方程：
    // a1 + m1*k ≡ a2 (mod m2)
    // m1*k ≡ a2 - a1 (mod m2)
    
    ll x, y;
    ll g = exgcd(m1, m2, x, y);
    ll c = a2 - a1;
    
    if (c % g != 0) return -1;  // 无解
    
    // 特解
    x = (x % (m2 / g) + (m2 / g)) % (m2 / g);
    ll k = (c / g * x) % (m2 / g);
    
    // 合并后的新方程
    ll new_a = a1 + m1 * k;
    ll new_m = m1 / g * m2;
    
    return (new_a % new_m + new_m) % new_m;
}

// 扩展CRT
ll excrt(vector<ll>& a, vector<ll>& m) {
    int n = a.size();
    ll cur_a = a[0], cur_m = m[0];
    
    for (int i = 1; i < n; i++) {
        ll new_a = merge(cur_a, cur_m, a[i], m[i]);
        if (new_a == -1) return -1;  // 无解
        
        cur_m = cur_m / __gcd(cur_m, m[i]) * m[i];
        cur_a = new_a;
    }
    
    return cur_a;
}
```

## 经典应用

### 1. 韩信点兵

```cpp
// 韩信点兵：
// 三人同行七十稀，
// 五树梅花廿一枝，
// 七子团圆正半月，
// 除百零五便得知。

// 即：
// x ≡ a (mod 3)
// x ≡ b (mod 5)
// x ≡ c (mod 7)

// 口诀含义：
// 70 是 5*7 的倍数，且 70 ≡ 1 (mod 3)
// 21 是 3*7 的倍数，且 21 ≡ 1 (mod 5)
// 15 是 3*5 的倍数，且 15 ≡ 1 (mod 7)
// 105 = 3*5*7

ll hanxin(ll a, ll b, ll c) {
    return (70*a + 21*b + 15*c) % 105;
}
```

## 练习题

1. [洛谷 P3868 猜数字](https://www.luogu.com.cn/problem/P3868)
2. [洛谷 P4777 【模板】扩展中国剩余定理](https://www.luogu.com.cn/problem/P4777)
3. [LeetCode 1201. 丑数 III](https://leetcode.cn/problems/ugly-number-iii/)

## 总结

- CRT 用于求解同余方程组
- 模数两两互质时，有唯一解
- 模数不互质时，使用扩展 CRT
- 时间复杂度：O(n log M)
