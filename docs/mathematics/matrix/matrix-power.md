# 矩阵快速幂

<DifficultyBadge level="medium" />

## 什么是矩阵快速幂？

矩阵快速幂是将快速幂算法应用于矩阵乘法，用于高效计算矩阵的高次幂。

$$A^n = A \times A \times ... \times A \text{（n 个 A）}$$

## 算法原理

与普通快速幂相同，利用：
- $A^{2k} = (A^k)^2$
- $A^{2k+1} = A^{2k} \times A$

时间复杂度：$O(n^3 \log k)$，其中 n 是矩阵大小。

## 代码实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;
const int MOD = 1e9 + 7;

typedef vector<vector<ll>> Matrix;

// 矩阵乘法
Matrix multiply(const Matrix& A, const Matrix& B) {
    int n = A.size();
    Matrix C(n, vector<ll>(n, 0));
    
    for (int i = 0; i < n; i++) {
        for (int k = 0; k < n; k++) {
            if (A[i][k] == 0) continue;
            for (int j = 0; j < n; j++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
            }
        }
    }
    
    return C;
}

// 矩阵快速幂
Matrix matrixPower(Matrix A, ll k) {
    int n = A.size();
    Matrix result(n, vector<ll>(n, 0));
    
    // 初始化单位矩阵
    for (int i = 0; i < n; i++) {
        result[i][i] = 1;
    }
    
    while (k > 0) {
        if (k & 1) {
            result = multiply(result, A);
        }
        A = multiply(A, A);
        k >>= 1;
    }
    
    return result;
}
```

## 经典应用

### 1. 斐波那契数列

```cpp
// F[n] = F[n-1] + F[n-2]
// 转移矩阵：
// [F[n]  ]   [1 1]   [F[n-1]]
// [F[n-1]] = [1 0] * [F[n-2]]

ll fibonacci(ll n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    
    Matrix A = {{1, 1}, {1, 0}};
    Matrix result = matrixPower(A, n - 1);
    
    // F[n] = result[0][0] * F[1] + result[0][1] * F[0]
    return result[0][0];
}
```

### 2. 广义斐波那契

```cpp
// F[n] = a*F[n-1] + b*F[n-2]
// 转移矩阵：
// [F[n]  ]   [a b]   [F[n-1]]
// [F[n-1]] = [1 0] * [F[n-2]]

ll generalizedFib(ll n, ll a, ll b, ll F0, ll F1) {
    if (n == 0) return F0;
    if (n == 1) return F1;
    
    Matrix A = {{a, b}, {1, 0}};
    Matrix result = matrixPower(A, n - 1);
    
    return (result[0][0] * F1 + result[0][1] * F0) % MOD;
}
```

### 3. 线性递推

```cpp
// F[n] = a1*F[n-1] + a2*F[n-2] + ... + ak*F[n-k]
// 
// 转移矩阵（k x k）：
// [F[n]  ]   [a1 a2 a3 ... ak]   [F[n-1]]
// [F[n-1]]   [1  0  0  ... 0 ]   [F[n-2]]
// [F[n-2]] = [0  1  0  ... 0 ] * [F[n-3]]
// [...   ]   [...          ]   [...   ]
// [F[n-k+1]] [0  0  0  ... 1 0]   [F[n-k]]

Matrix buildTransition(vector<ll>& coeff) {
    int k = coeff.size();
    Matrix A(k, vector<ll>(k, 0));
    
    // 第一行
    for (int j = 0; j < k; j++) {
        A[0][j] = coeff[j];
    }
    
    // 次对角线
    for (int i = 1; i < k; i++) {
        A[i][i-1] = 1;
    }
    
    return A;
}

ll linearRecurrence(ll n, vector<ll>& coeff, vector<ll>& init) {
    int k = coeff.size();
    
    if (n < k) return init[n];
    
    Matrix A = buildTransition(coeff);
    Matrix result = matrixPower(A, n - k + 1);
    
    // 计算 F[n]
    ll ans = 0;
    for (int j = 0; j < k; j++) {
        ans = (ans + result[0][j] * init[k - 1 - j]) % MOD;
    }
    
    return ans;
}
```

### 4. 图上路径计数

```cpp
// 邻接矩阵的 k 次幂：A^k[i][j] 表示从 i 到 j 长度为 k 的路径数

ll countPaths(vector<vector<int>>& adj, int u, int v, int k) {
    int n = adj.size();
    Matrix A(n, vector<ll>(n, 0));
    
    for (int i = 0; i < n; i++) {
        for (int j : adj[i]) {
            A[i][j] = 1;
        }
    }
    
    Matrix result = matrixPower(A, k);
    return result[u][v];
}
```

### 5. 矩阵加速 DP

```cpp
// 问题：有 n 个格子，每个格子可以涂红、绿、蓝三种颜色
// 要求相邻格子颜色不同，求方案数

// dp[i][0] = dp[i-1][1] + dp[i-1][2]  // 第 i 个涂红色
// dp[i][1] = dp[i-1][0] + dp[i-1][2]  // 第 i 个涂绿色
// dp[i][2] = dp[i-1][0] + dp[i-1][1]  // 第 i 个涂蓝色

// 转移矩阵：
// [0 1 1]
// [1 0 1]
// [1 1 0]

ll colorGrid(int n) {
    Matrix A = {{0, 1, 1}, {1, 0, 1}, {1, 1, 0}};
    Matrix result = matrixPower(A, n - 1);
    
    // 初始：dp[1][0] = dp[1][1] = dp[1][2] = 1
    ll ans = 0;
    for (int j = 0; j < 3; j++) {
        for (int k = 0; k < 3; k++) {
            ans = (ans + result[j][k]) % MOD;
        }
    }
    
    return ans;
}
```

## 练习题

1. [洛谷 P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)
2. [洛谷 P1962 斐波那契数列](https://www.luogu.com.cn/problem/P1962)
3. [洛谷 P1939 【模板】矩阵加速（数列）](https://www.luogu.com.cn/problem/P1939)
4. [洛谷 P1349 广义斐波那契数列](https://www.luogu.com.cn/problem/P1349)
5. [LeetCode 509. 斐波那契数](https://leetcode.cn/problems/fibonacci-number/)

## 总结

- 矩阵快速幂时间复杂度：$O(n^3 \log k)$
- 应用：递推加速、路径计数、DP 优化
- 关键是构造转移矩阵
- 注意初始条件的处理
