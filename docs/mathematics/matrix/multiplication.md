# 矩阵乘法

<DifficultyBadge level="easy" />

## 什么是矩阵？

矩阵是一个由数字排列成的矩形阵列，有 m 行 n 列。

$$
A = \begin{bmatrix} a_{11} & a_{12} & ... & a_{1n} \\ a_{21} & a_{22} & ... & a_{2n} \\ ... & ... & ... & ... \\ a_{m1} & a_{m2} & ... & a_{mn} \end{bmatrix}
$$

## 矩阵乘法

若 $A$ 是 $m \times n$ 矩阵，$B$ 是 $n \times p$ 矩阵，则 $C = A \times B$ 是 $m \times p$ 矩阵：

$$C_{ij} = \sum_{k=1}^{n} A_{ik} \cdot B_{kj}$$

### 代码实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;
const int MOD = 1e9 + 7;

// 矩阵类型
typedef vector<vector<ll>> Matrix;

// 矩阵乘法 C = A * B
Matrix multiply(const Matrix& A, const Matrix& B) {
    int m = A.size();
    int n = A[0].size();
    int p = B[0].size();
    
    Matrix C(m, vector<ll>(p, 0));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < p; j++) {
            for (int k = 0; k < n; k++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
            }
        }
    }
    
    return C;
}

// 优化版（减少取模次数）
Matrix multiplyFast(const Matrix& A, const Matrix& B) {
    int m = A.size();
    int n = A[0].size();
    int p = B[0].size();
    
    Matrix C(m, vector<ll>(p, 0));
    
    for (int i = 0; i < m; i++) {
        for (int k = 0; k < n; k++) {
            if (A[i][k] == 0) continue;
            for (int j = 0; j < p; j++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
            }
        }
    }
    
    return C;
}
```

## 特殊矩阵

### 单位矩阵

```cpp
// n x n 单位矩阵
Matrix identity(int n) {
    Matrix I(n, vector<ll>(n, 0));
    for (int i = 0; i < n; i++) {
        I[i][i] = 1;
    }
    return I;
}
```

### 零矩阵

```cpp
// m x n 零矩阵
Matrix zero(int m, int n) {
    return Matrix(m, vector<ll>(n, 0));
}
```

## 矩阵加法

```cpp
Matrix add(const Matrix& A, const Matrix& B) {
    int m = A.size();
    int n = A[0].size();
    
    Matrix C(m, vector<ll>(n));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            C[i][j] = (A[i][j] + B[i][j]) % MOD;
        }
    }
    
    return C;
}
```

## 矩阵转置

```cpp
Matrix transpose(const Matrix& A) {
    int m = A.size();
    int n = A[0].size();
    
    Matrix B(n, vector<ll>(m));
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            B[j][i] = A[i][j];
        }
    }
    
    return B;
}
```

## 应用

### 1. 图的邻接矩阵

```cpp
// 邻接矩阵的 k 次幂表示长度为 k 的路径数
Matrix adj[1005][1005];

// 计算从 u 到 v 的长度为 k 的路径数
int countPaths(int u, int v, int k) {
    Matrix M = adj;
    Matrix result = identity(n);
    
    // 快速幂
    while (k > 0) {
        if (k & 1) result = multiply(result, M);
        M = multiply(M, M);
        k >>= 1;
    }
    
    return result[u][v];
}
```

### 2. 线性变换

```cpp
// 二维平面上的线性变换
// 旋转矩阵
Matrix rotation(double theta) {
    Matrix R(2, vector<ll>(2));
    R[0][0] = cos(theta);  R[0][1] = -sin(theta);
    R[1][0] = sin(theta);  R[1][1] = cos(theta);
    return R;
}

// 缩放矩阵
Matrix scaling(double sx, double sy) {
    Matrix S(2, vector<ll>(2));
    S[0][0] = sx;  S[0][1] = 0;
    S[1][0] = 0;   S[1][1] = sy;
    return S;
}
```

## 练习题

1. [洛谷 P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)
2. [LeetCode 311. 稀疏矩阵的乘法](https://leetcode.cn/problems/sparse-matrix-multiplication/)

## 总结

- 矩阵乘法：$C_{ij} = \sum_k A_{ik} \cdot B_{kj}$
- 时间复杂度：$O(n^3)$
- 不满足交换律：$AB \neq BA$
- 满足结合律：$(AB)C = A(BC)$
