# 高斯消元

<DifficultyBadge level="hard" />

## 什么是高斯消元？

高斯消元（Gaussian Elimination）是求解线性方程组的经典算法，通过初等行变换将增广矩阵化为行阶梯形或行最简形。

$$
\begin{cases}
a_{11}x_1 + a_{12}x_2 + ... + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + ... + a_{2n}x_n = b_2 \\
... \\
a_{n1}x_1 + a_{n2}x_2 + ... + a_{nn}x_n = b_n
\end{cases}
$$

## 算法步骤

1. **前向消元**：将矩阵化为上三角形式
2. **回代求解**：从最后一行向前求解

## 代码实现

### 浮点数版本

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

const double EPS = 1e-8;

// 高斯消元求解 Ax = b
// A: n x n 系数矩阵
// b: n x 1 常数向量
// 返回是否有唯一解，解存储在 b 中
bool gauss(vector<vector<double>>& A, vector<double>& b) {
    int n = A.size();
    
    for (int i = 0; i < n; i++) {
        // 找主元（绝对值最大的）
        int maxRow = i;
        for (int j = i + 1; j < n; j++) {
            if (fabs(A[j][i]) > fabs(A[maxRow][i])) {
                maxRow = j;
            }
        }
        
        // 交换行
        if (maxRow != i) {
            swap(A[i], A[maxRow]);
            swap(b[i], b[maxRow]);
        }
        
        // 主元为 0，无解或无穷多解
        if (fabs(A[i][i]) < EPS) {
            return false;
        }
        
        // 消元
        for (int j = i + 1; j < n; j++) {
            double factor = A[j][i] / A[i][i];
            
            for (int k = i; k < n; k++) {
                A[j][k] -= factor * A[i][k];
            }
            
            b[j] -= factor * b[i];
        }
    }
    
    // 回代
    for (int i = n - 1; i >= 0; i--) {
        for (int j = i + 1; j < n; j++) {
            b[i] -= A[i][j] * b[j];
        }
        b[i] /= A[i][i];
    }
    
    return true;
}
```

### 模运算版本

```cpp
const int MOD = 1e9 + 7;

typedef long long ll;

ll power(ll a, ll b) {
    ll res = 1;
    a %= MOD;
    while (b > 0) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

ll inv(ll a) {
    return power(a, MOD - 2);
}

// 模意义下的高斯消元
bool gaussMod(vector<vector<ll>>& A, vector<ll>& b) {
    int n = A.size();
    
    for (int i = 0; i < n; i++) {
        // 找主元
        int maxRow = i;
        for (int j = i + 1; j < n; j++) {
            if (A[j][i] > A[maxRow][i]) {
                maxRow = j;
            }
        }
        
        if (maxRow != i) {
            swap(A[i], A[maxRow]);
            swap(b[i], b[maxRow]);
        }
        
        if (A[i][i] == 0) {
            return false;
        }
        
        // 消元
        ll invPivot = inv(A[i][i]);
        
        for (int j = i + 1; j < n; j++) {
            ll factor = A[j][i] * invPivot % MOD;
            
            for (int k = i; k < n; k++) {
                A[j][k] = (A[j][k] - factor * A[i][k] % MOD + MOD) % MOD;
            }
            
            b[j] = (b[j] - factor * b[i] % MOD + MOD) % MOD;
        }
    }
    
    // 回代
    for (int i = n - 1; i >= 0; i--) {
        ll invPivot = inv(A[i][i]);
        
        for (int j = i + 1; j < n; j++) {
            b[i] = (b[i] - A[i][j] * b[j] % MOD + MOD) % MOD;
        }
        
        b[i] = b[i] * invPivot % MOD;
    }
    
    return true;
}
```

## 判断解的情况

```cpp
// 增广矩阵的秩
int rankMatrix(vector<vector<double>>& A) {
    int n = A.size(), m = A[0].size();
    int r = 0;
    
    for (int c = 0; c < m && r < n; c++) {
        // 找主元
        int maxRow = r;
        for (int i = r + 1; i < n; i++) {
            if (fabs(A[i][c]) > fabs(A[maxRow][c])) {
                maxRow = i;
            }
        }
        
        if (fabs(A[maxRow][c]) < EPS) continue;
        
        swap(A[r], A[maxRow]);
        
        // 消元
        for (int i = r + 1; i < n; i++) {
            double factor = A[i][c] / A[r][c];
            for (int j = c; j < m; j++) {
                A[i][j] -= factor * A[r][j];
            }
        }
        
        r++;
    }
    
    return r;
}

// 判断解的情况
// rank(A) = rank([A|b]) = n: 唯一解
// rank(A) = rank([A|b]) < n: 无穷多解
// rank(A) < rank([A|b]): 无解
```

## 应用

### 1. 求解线性方程组

```cpp
int main() {
    int n;
    cin >> n;
    
    vector<vector<double>> A(n, vector<double>(n));
    vector<double> b(n);
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> A[i][j];
        }
        cin >> b[i];
    }
    
    if (gauss(A, b)) {
        for (int i = 0; i < n; i++) {
            printf("%.2f\n", b[i]);
        }
    } else {
        cout << "No Solution" << endl;
    }
    
    return 0;
}
```

### 2. 求矩阵的逆

```cpp
// 增广矩阵 [A | I] 经过高斯消元变为 [I | A^{-1}]
bool matrixInverse(vector<vector<double>>& A) {
    int n = A.size();
    
    // 构建增广矩阵 [A | I]
    vector<vector<double>> aug(n, vector<double>(2 * n));
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            aug[i][j] = A[i][j];
        }
        aug[i][n + i] = 1;
    }
    
    // 高斯消元
    for (int i = 0; i < n; i++) {
        // 找主元
        int maxRow = i;
        for (int j = i + 1; j < n; j++) {
            if (fabs(aug[j][i]) > fabs(aug[maxRow][i])) {
                maxRow = j;
            }
        }
        
        if (fabs(aug[maxRow][i]) < EPS) return false;
        
        swap(aug[i], aug[maxRow]);
        
        // 归一化
        double div = aug[i][i];
        for (int j = i; j < 2 * n; j++) {
            aug[i][j] /= div;
        }
        
        // 消元
        for (int j = 0; j < n; j++) {
            if (j == i) continue;
            
            double factor = aug[j][i];
            for (int k = i; k < 2 * n; k++) {
                aug[j][k] -= factor * aug[i][k];
            }
        }
    }
    
    // 提取逆矩阵
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            A[i][j] = aug[i][n + j];
        }
    }
    
    return true;
}
```

### 3. 计算行列式

```cpp
double determinant(vector<vector<double>> A) {
    int n = A.size();
    double det = 1;
    
    for (int i = 0; i < n; i++) {
        // 找主元
        int maxRow = i;
        for (int j = i + 1; j < n; j++) {
            if (fabs(A[j][i]) > fabs(A[maxRow][i])) {
                maxRow = j;
            }
        }
        
        if (fabs(A[maxRow][i]) < EPS) return 0;
        
        if (maxRow != i) {
            swap(A[i], A[maxRow]);
            det = -det;  // 交换行变号
        }
        
        det *= A[i][i];
        
        // 消元
        for (int j = i + 1; j < n; j++) {
            double factor = A[j][i] / A[i][i];
            for (int k = i; k < n; k++) {
                A[j][k] -= factor * A[i][k];
            }
        }
    }
    
    return det;
}
```

## 练习题

1. [洛谷 P3389 【模板】高斯消元法](https://www.luogu.com.cn/problem/P3389)
2. [洛谷 P2455 线性方程组](https://www.luogu.com.cn/problem/P2455)
3. [洛谷 P4111 小 Z 的房间](https://www.luogu.com.cn/problem/P4111)（矩阵树定理 + 高斯消元）

## 总结

- 高斯消元时间复杂度：$O(n^3)$
- 注意精度问题（浮点数）或取模（模运算）
- 应用：解方程组、求逆矩阵、计算行列式
- 主元选择：列主元或全主元消去法
