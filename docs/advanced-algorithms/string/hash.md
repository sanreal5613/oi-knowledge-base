# 字符串哈希

<DifficultyBadge level="medium" />

## 什么是字符串哈希？

字符串哈希是将字符串映射为一个**整数**，使得不同的字符串尽可能有不同的哈希值，相同的字符串一定有相同的哈希值。

```
"abc" → 哈希值 12345
"abd" → 哈希值 67890
"abc" → 哈希值 12345（相同字符串，相同哈希值）
```

## 多项式哈希

将字符串看作一个 **B 进制数**，然后对 **MOD** 取模。

```
"abc" = 'a' × B² + 'b' × B¹ + 'c' × B⁰
       = 97 × B² + 98 × B¹ + 99 × B⁰
```

### 代码实现

```cpp
#include <iostream>
#include <string>
using namespace std;

typedef unsigned long long ull;

const int BASE = 131;      // 基数，通常取131或13331
const int MOD = 1e9 + 7;   // 模数

// 计算字符串哈希
ull getHash(string& s) {
    ull hash = 0;
    for (char c : s) {
        hash = hash * BASE + c;
        // hash = (hash * BASE + c) % MOD;  // 如果需要取模
    }
    return hash;
}

int main() {
    string s = "abc";
    cout << getHash(s) << endl;  // 输出哈希值
    
    return 0;
}
```

## 前缀哈希

预处理前缀哈希，O(1) 查询子串哈希。

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

typedef unsigned long long ull;

const int BASE = 131;
const int MAXN = 1e5 + 5;

ull base[MAXN];    // BASE的幂次
ull hash[MAXN];    // 前缀哈希

void init(string& s) {
    int n = s.size();
    
    // 预处理BASE的幂次
    base[0] = 1;
    for (int i = 1; i <= n; i++) {
        base[i] = base[i - 1] * BASE;
    }
    
    // 计算前缀哈希
    hash[0] = 0;
    for (int i = 1; i <= n; i++) {
        hash[i] = hash[i - 1] * BASE + s[i - 1];
    }
}

// 获取子串 [l, r] 的哈希值（1-indexed）
ull getSubHash(int l, int r) {
    return hash[r] - hash[l - 1] * base[r - l + 1];
}

int main() {
    string s = "abcabc";
    init(s);
    
    // 比较子串 "abc" 和 "abc"
    ull hash1 = getSubHash(1, 3);  // "abc"
    ull hash2 = getSubHash(4, 6);  // "abc"
    
    if (hash1 == hash2) {
        cout << "子串相等" << endl;
    }
    
    return 0;
}
```

## 双哈希

使用两个不同的 BASE 和 MOD，降低冲突概率。

```cpp
const int BASE1 = 131;
const int BASE2 = 13331;
const int MOD1 = 1e9 + 7;
const int MOD2 = 1e9 + 9;

pair<int, int> getHash(string& s) {
    int hash1 = 0, hash2 = 0;
    for (char c : s) {
        hash1 = (1LL * hash1 * BASE1 + c) % MOD1;
        hash2 = (1LL * hash2 * BASE2 + c) % MOD2;
    }
    return {hash1, hash2};
}
```

## 经典应用

### 1. 判断两个子串是否相等

```cpp
bool isEqual(int l1, int r1, int l2, int r2) {
    return getSubHash(l1, r1) == getSubHash(l2, r2);
}
```

### 2. 寻找重复子串

```cpp
// 判断是否存在长度为len的重复子串
bool hasDuplicate(int len, string& s) {
    unordered_set<ull> seen;
    
    for (int i = 1; i + len - 1 <= n; i++) {
        ull h = getSubHash(i, i + len - 1);
        if (seen.count(h)) {
            return true;
        }
        seen.insert(h);
    }
    
    return false;
}
```

### 3. 最长重复子串（二分 + 哈希）

```cpp
int longestDuplicateSubstring(string& s) {
    int n = s.size();
    int left = 1, right = n - 1;
    int ans = 0;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        
        if (hasDuplicate(mid, s)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return ans;
}
```

### 4. 字符串匹配（Rabin-Karp）

```cpp
vector<int> rabinKarp(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    vector<int> result;
    
    // 计算模式串哈希
    ull patternHash = getHash(pattern);
    
    // 计算文本串前缀哈希
    init(text);
    
    // 滑动窗口比较
    for (int i = 1; i + m - 1 <= n; i++) {
        if (getSubHash(i, i + m - 1) == patternHash) {
            result.push_back(i - 1);  // 0-indexed
        }
    }
    
    return result;
}
```

### 5. 回文串判断（双哈希）

```cpp
// 正序哈希和逆序哈希
ull hash1[MAXN], hash2[MAXN];

void initPalindrome(string& s) {
    int n = s.size();
    
    // 正序
    hash1[0] = 0;
    for (int i = 1; i <= n; i++) {
        hash1[i] = hash1[i - 1] * BASE + s[i - 1];
    }
    
    // 逆序
    hash2[0] = 0;
    for (int i = 1; i <= n; i++) {
        hash2[i] = hash2[i - 1] * BASE + s[n - i];
    }
}

// 判断 [l, r] 是否为回文
bool isPalindrome(int l, int r, int n) {
    // 正序 [l, r] 的哈希
    ull h1 = hash1[r] - hash1[l - 1] * base[r - l + 1];
    
    // 逆序 [n-r+1, n-l+1] 的哈希
    int rl = n - r + 1, rr = n - l + 1;
    ull h2 = hash2[rr] - hash2[rl - 1] * base[rr - rl + 1];
    
    return h1 == h2;
}
```

## 哈希冲突处理

### 1. 自然溢出（推荐）

```cpp
typedef unsigned long long ull;
// ull 溢出相当于对 2^64 取模
// 冲突概率极低
```

### 2. 双哈希

```cpp
// 两个不同的BASE和MOD
// 同时冲突的概率几乎为0
```

### 3. 取模哈希

```cpp
const int MOD = 1e9 + 7;  // 大质数
hash = (hash * BASE + c) % MOD;
```

## 注意事项

### 1. BASE 选择

```cpp
// 常用BASE值
const int BASE = 131;      // 一般字符串
const int BASE = 13331;    // 更保险
const int BASE = 91138233; // 大质数

// 避免BASE太小导致冲突
// 避免BASE是MOD的倍数
```

### 2. 字符处理

```cpp
// 可以减去'a'或'A'来缩小范围
hash = hash * BASE + (c - 'a' + 1);

// 或者直接用ASCII码
hash = hash * BASE + c;
```

### 3. 预处理

```cpp
// 一定要预处理BASE的幂次
// 否则每次计算子串哈希都是O(n)
```

## 练习题

1. [洛谷 P3370 【模板】字符串哈希](https://www.luogu.com.cn/problem/P3370)
2. [洛谷 P3398 哈希字符串](https://www.luogu.com.cn/problem/P3398)
3. [LeetCode 1044. 最长重复子串](https://leetcode.cn/problems/longest-duplicate-substring/)
4. [LeetCode 28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)（Rabin-Karp）

## 总结

- 字符串哈希：将字符串映射为整数
- 多项式哈希：hash = Σ s[i] × B^i
- 前缀哈希：O(1) 查询子串哈希
- 双哈希：降低冲突概率
- 应用：子串比较、重复子串、字符串匹配、回文判断
- 自然溢出（ull）最简单且冲突概率低
