# 卡特兰数

<DifficultyBadge level="medium" />

## 什么是卡特兰数？

卡特兰数（Catalan Number）是一系列自然数，在组合数学中有广泛应用。

### 定义

第 $n$ 个卡特兰数：
$$C_n = \frac{1}{n+1}\binom{2n}{n} = \frac{(2n)!}{(n+1)!n!}$$

### 前几项

| n | $C_n$ |
|---|-------|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 14 |
| 5 | 42 |
| 6 | 132 |
| 7 | 429 |
| 8 | 1430 |
| 9 | 4862 |

## 递推公式

### 公式1
$$C_n = \frac{2(2n-1)}{n+1} C_{n-1}, \quad C_0 = 1$$

### 公式2
$$C_n = \sum_{i=0}^{n-1} C_i \cdot C_{n-1-i}$$

### 公式3
$$C_n = \binom{2n}{n} - \binom{2n}{n+1}$$

## 代码实现

### 递推计算

```cpp
const int MAXN = 1005;
const int MOD = 1e9 + 7;

long long catalan[MAXN];

void initCatalan(int n) {
    catalan[0] = 1;
    
    for (int i = 1; i <= n; i++) {
        // C_n = C_{n-1} * 2(2n-1) / (n+1)
        catalan[i] = catalan[i-1] * 2 * (2*i - 1) % MOD;
        catalan[i] = catalan[i] * modInverse(i + 1, MOD) % MOD;
    }
}
```

### 组合数计算

```cpp
long long catalan(int n) {
    // C_n = C(2n, n) / (n+1)
    return C(2*n, n) * modInverse(n + 1, MOD) % MOD;
}
```

### 高精度计算（小范围）

```cpp
// 当 n 较小（n <= 35）时，卡特兰数可用 long long 存储
long long catalanSmall(int n) {
    long long C[40][40] = {0};
    
    // 预处理组合数
    for (int i = 0; i <= 2*n; i++) {
        C[i][0] = C[i][i] = 1;
        for (int j = 1; j < i; j++) {
            C[i][j] = C[i-1][j-1] + C[i-1][j];
        }
    }
    
    return C[2*n][n] / (n + 1);
}
```

## 经典应用

### 1. 合法的括号序列

n 对括号的合法序列数 = $C_n$

```
n = 3 时，5 种合法序列：
((()))
(()())
(())()
()(())
()()()
```

### 2. 二叉树的形态数

n 个节点的不同二叉树形态数 = $C_n$

### 3. 出栈序列数

n 个元素入栈，不同的出栈序列数 = $C_n$

```cpp
// 示例：1, 2, 3 入栈
// 合法出栈序列（5种）：
// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 2 1
// 非法：3 1 2
```

### 4. 不交叉的弦

圆上 2n 个点，两两配对连弦，不相交的方案数 = $C_n$

### 5. 网格路径

从 (0,0) 走到 (n,n)，不越过对角线的路径数 = $C_n$

```cpp
// 总路径数：C(2n, n)
// 非法路径数：C(2n, n+1)（反射原理）
// 合法路径数：C(2n, n) - C(2n, n+1) = C_n
```

### 6. 凸多边形三角划分

n+2 边形的三角划分方案数 = $C_n$

### 7. 单调栈计数

n 个元素入栈，单调栈的不同状态数 = $C_n$

## 例题

### 例1：括号匹配

```cpp
// 求 n 对括号的合法序列数
int main() {
    int n;
    cin >> n;
    cout << catalan(n) << endl;
    return 0;
}
```

### 例2：出栈序列

```cpp
// 判断一个序列是否是合法的出栈序列
bool isValidPopSequence(vector<int>& push, vector<int>& pop) {
    stack<int> st;
    int j = 0;
    
    for (int x : push) {
        st.push(x);
        while (!st.empty() && st.top() == pop[j]) {
            st.pop();
            j++;
        }
    }
    
    return st.empty();
}
```

### 例3：网格路径

```cpp
// 从 (0,0) 到 (n,n)，只能向右或向上，不越过对角线的路径数
// 答案：卡特兰数 C_n

// 如果允许接触对角线但不能越过：
// 答案：C(2n, n) - C(2n, n-1) = C_n
```

### 例4：买票找零

```cpp
// 2n 个人排队买票，n 个人拿 5 元，n 个人拿 10 元
// 票价 5 元，售票员开始时没有钱
// 求能顺利找零的排队方案数
// 答案：卡特兰数 C_n

// 转化：5 元看作 '('，10 元看作 ')'
// 任何时候 ')' 的数量不能超过 '('
```

## 扩展：广义卡特兰数

### m 阶卡特兰数

$$C_n^{(m)} = \frac{1}{(m-1)n+1}\binom{mn}{n}$$

当 m=2 时，就是普通卡特兰数。

### 应用：m 叉树

n 个节点的 m 叉树形态数 = $C_n^{(m)}$

## 练习题

1. [洛谷 P1044 栈](https://www.luogu.com.cn/problem/P1044)
2. [洛谷 P3200 有趣的数列](https://www.luogu.com.cn/problem/P3200)
3. [LeetCode 96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)
4. [LeetCode 22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

## 总结

- 卡特兰数：$C_n = \frac{1}{n+1}\binom{2n}{n}$
- 递推：$C_n = \frac{2(2n-1)}{n+1}C_{n-1}$
- 应用：括号序列、二叉树、出栈序列、网格路径等
- 注意：当 n > 35 时，需要用高精度或大数运算
