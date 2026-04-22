# KMP 算法

<DifficultyBadge level="hard" />

## 什么是 KMP？

KMP（Knuth-Morris-Pratt）是一种**字符串匹配**算法，用于在主串中查找子串的位置。

<AlgorithmCard 
  title="KMP 算法"
  description="高效的字符串匹配算法，避免重复比较"
  timeComplexity="O(n + m)"
  spaceComplexity="O(m)"
/>

## 朴素匹配的问题

```cpp
// 朴素匹配：O(n × m)
int naiveMatch(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    
    for (int i = 0; i <= n - m; i++) {
        int j = 0;
        while (j < m && text[i + j] == pattern[j]) {
            j++;
        }
        if (j == m) return i;  // 匹配成功
    }
    
    return -1;  // 未找到
}
```

**问题**：当匹配失败时，朴素算法会回溯到 i+1，导致重复比较。

## KMP 的核心思想

利用**已经匹配的部分信息**，避免重复比较。

```
text:    a b a b a b c a b c a b
pattern: a b a b a b c a
                ↑
              匹配失败

朴素：i 回溯到 2
KMP：利用已匹配的 "ababa"，知道 pattern 应该移动到 i=2 的位置
```

## 前缀函数（next 数组）

`next[i]` = pattern[0..i] 的最长相等真前缀和真后缀的长度。

```
pattern: a b a b a b c a
next:    0 0 1 2 3 4 0 1

解释：
- next[0] = 0（单个字符没有真前缀）
- next[1] = 0（"ab" 没有相等前后缀）
- next[2] = 1（"aba"，前缀 "a" = 后缀 "a"）
- next[3] = 2（"abab"，前缀 "ab" = 后缀 "ab"）
- next[4] = 3（"ababa"，前缀 "aba" = 后缀 "aba"）
- ...
```

### 计算 next 数组

```cpp
vector<int> computeNext(string& pattern) {
    int m = pattern.size();
    vector<int> next(m, 0);
    
    int j = 0;  // 前缀的末尾
    
    for (int i = 1; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) {
            j = next[j - 1];  // 回退
        }
        
        if (pattern[i] == pattern[j]) {
            j++;
            next[i] = j;
        }
    }
    
    return next;
}
```

## KMP 匹配

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> kmpSearch(string& text, string& pattern) {
    int n = text.size(), m = pattern.size();
    
    if (m == 0) return {0};
    
    // 计算 next 数组
    vector<int> next = computeNext(pattern);
    
    vector<int> result;
    int j = 0;  // pattern 中的位置
    
    for (int i = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) {
            j = next[j - 1];  // 回退
        }
        
        if (text[i] == pattern[j]) {
            j++;
        }
        
        if (j == m) {
            result.push_back(i - m + 1);  // 匹配成功
            j = next[j - 1];  // 继续匹配
        }
    }
    
    return result;
}

int main() {
    string text = "ababababcabab";
    string pattern = "ababca";
    
    vector<int> positions = kmpSearch(text, pattern);
    
    for (int pos : positions) {
        cout << "在位置 " << pos << " 找到匹配" << endl;
    }
    
    return 0;
}
```

## 完整代码

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class KMP {
    string pattern;
    vector<int> next;
    
public:
    KMP(string& p) : pattern(p) {
        buildNext();
    }
    
    void buildNext() {
        int m = pattern.size();
        next.resize(m, 0);
        
        int j = 0;
        for (int i = 1; i < m; i++) {
            while (j > 0 && pattern[i] != pattern[j]) {
                j = next[j - 1];
            }
            
            if (pattern[i] == pattern[j]) {
                j++;
                next[i] = j;
            }
        }
    }
    
    vector<int> search(string& text) {
        vector<int> result;
        int n = text.size(), m = pattern.size();
        int j = 0;
        
        for (int i = 0; i < n; i++) {
            while (j > 0 && text[i] != pattern[j]) {
                j = next[j - 1];
            }
            
            if (text[i] == pattern[j]) {
                j++;
            }
            
            if (j == m) {
                result.push_back(i - m + 1);
                j = next[j - 1];
            }
        }
        
        return result;
    }
};

int main() {
    string text, pattern;
    cin >> text >> pattern;
    
    KMP kmp(pattern);
    vector<int> positions = kmp.search(text);
    
    cout << "共找到 " << positions.size() << " 处匹配" << endl;
    for (int pos : positions) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}
```

## 复杂度分析

- **预处理**：O(m)
- **匹配**：O(n)
- **总时间**：O(n + m)
- **空间**：O(m)

## 应用

### 1. 统计出现次数

```cpp
int countOccurrences(string& text, string& pattern) {
    KMP kmp(pattern);
    return kmp.search(text).size();
}
```

### 2. 循环节

```cpp
int getPeriod(string& s) {
    int n = s.size();
    vector<int> next = computeNext(s);
    
    int len = n - next[n - 1];
    if (n % len == 0) {
        return len;  // 最小循环节长度
    }
    return n;  // 无循环节
}
```

### 3. 前缀函数的其他应用

```cpp
// 求每个前缀的最长 border
vector<int> getBorders(string& s) {
    vector<int> next = computeNext(s);
    return next;
}

// 求字符串的所有 border
void printAllBorders(string& s) {
    vector<int> next = computeNext(s);
    int n = s.size();
    
    int len = next[n - 1];
    while (len > 0) {
        cout << s.substr(0, len) << endl;
        len = next[len - 1];
    }
}
```

## 练习题

1. [洛谷 P3370 【模板】KMP](https://www.luogu.com.cn/problem/P3370)
2. [洛谷 P4391 无线传输](https://www.luogu.com.cn/problem/P4391)（循环节）
3. [LeetCode 28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)
4. [LeetCode 214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome/)

## 总结

- KMP 利用已匹配信息避免重复比较
- 核心是 next 数组（前缀函数）
- 时间复杂度 O(n + m)，远优于朴素的 O(n × m)
- 应用：字符串匹配、循环节、border
- 关键是理解 next 数组的含义和计算过程
