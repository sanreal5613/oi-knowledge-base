# 二维数组

<DifficultyBadge level="easy" />

## 二维数组基础

二维数组可以看作"数组的数组"，常用于表示矩阵、表格、地图等。

### 声明与初始化

```cpp
// 声明 3 行 4 列的数组
int arr[3][4];

// 初始化
int arr[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 简化写法
int arr[3][4] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};

// 部分初始化
int arr[3][4] = {
    {1, 2},
    {5}
};  // 其余为 0

// 全部初始化为 0
int arr[3][4] = {0};
```

### 访问元素

```cpp
int arr[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

cout << arr[0][0] << endl;  // 1（第 1 行第 1 列）
cout << arr[1][2] << endl;  // 7（第 2 行第 3 列）
cout << arr[2][3] << endl;  // 12（第 3 行第 4 列）

arr[1][1] = 100;  // 修改元素
```

## 遍历二维数组

### 双重循环

```cpp
int arr[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 按行遍历
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        cout << arr[i][j] << " ";
    }
    cout << endl;
}
```

### 范围 for

```cpp
int arr[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

for (auto& row : arr) {
    for (int x : row) {
        cout << x << " ";
    }
    cout << endl;
}
```

## 输入输出

```cpp
int n, m, arr[100][100];
cin >> n >> m;

// 输入
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cin >> arr[i][j];
    }
}

// 输出
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cout << arr[i][j] << " ";
    }
    cout << endl;
}
```

## 常见操作

### 1. 矩阵转置

```cpp
int arr[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// 转置
for (int i = 0; i < 3; i++) {
    for (int j = i + 1; j < 3; j++) {
        swap(arr[i][j], arr[j][i]);
    }
}
```

### 2. 矩阵旋转 90°

```cpp
// 顺时针旋转 90°
void rotate90(int arr[][3], int n) {
    // 先转置
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(arr[i][j], arr[j][i]);
        }
    }
    
    // 再左右翻转
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            swap(arr[i][j], arr[i][n - 1 - j]);
        }
    }
}
```

### 3. 对角线遍历

```cpp
int arr[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// 主对角线
for (int i = 0; i < 3; i++) {
    cout << arr[i][i] << " ";
}
cout << endl;  // 1 5 9

// 副对角线
for (int i = 0; i < 3; i++) {
    cout << arr[i][3 - 1 - i] << " ";
}
cout << endl;  // 3 5 7
```

### 4. 螺旋遍历

```cpp
void spiralOrder(int arr[][4], int n, int m) {
    int top = 0, bottom = n - 1;
    int left = 0, right = m - 1;
    
    while (top <= bottom && left <= right) {
        // 上边
        for (int j = left; j <= right; j++) {
            cout << arr[top][j] << " ";
        }
        top++;
        
        // 右边
        for (int i = top; i <= bottom; i++) {
            cout << arr[i][right] << " ";
        }
        right--;
        
        // 下边
        if (top <= bottom) {
            for (int j = right; j >= left; j--) {
                cout << arr[bottom][j] << " ";
            }
            bottom--;
        }
        
        // 左边
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                cout << arr[i][left] << " ";
            }
            left++;
        }
    }
}
```

## 矩阵运算

### 1. 矩阵加法

```cpp
void matrixAdd(int a[][3], int b[][3], int c[][3], int n, int m) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            c[i][j] = a[i][j] + b[i][j];
        }
    }
}
```

### 2. 矩阵乘法

```cpp
// c = a × b
// a: n×m, b: m×p, c: n×p
void matrixMultiply(int a[][100], int b[][100], int c[][100], int n, int m, int p) {
    memset(c, 0, sizeof(c));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p; j++) {
            for (int k = 0; k < m; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}
```

## 常见应用

### 1. 地图/迷宫

```cpp
char maze[10][10] = {
    "##########",
    "#S.......#",
    "#.####...#",
    "#....#...#",
    "####.#.#.#",
    "#....#.#.#",
    "#.####.#.#",
    "#......#E#",
    "##########"
};

// S: 起点, E: 终点, #: 墙, .: 路
```

### 2. 杨辉三角

```cpp
int triangle[10][10];

void pascalTriangle(int n) {
    for (int i = 0; i < n; i++) {
        triangle[i][0] = triangle[i][i] = 1;
        for (int j = 1; j < i; j++) {
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
}
```

### 3. 二维前缀和

```cpp
int arr[100][100], prefix[101][101];

// 构建前缀和
void buildPrefix(int n, int m) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] 
                         - prefix[i-1][j-1] + arr[i-1][j-1];
        }
    }
}

// 查询子矩阵和 (x1,y1) 到 (x2,y2)
int querySum(int x1, int y1, int x2, int y2) {
    return prefix[x2+1][y2+1] - prefix[x1][y2+1] 
         - prefix[x2+1][y1] + prefix[x1][y1];
}
```

## 方向数组

用于上下左右移动：

```cpp
// 四个方向：上、右、下、左
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

// 或八个方向
int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};

// 使用
for (int i = 0; i < 4; i++) {
    int nx = x + dx[i];
    int ny = y + dy[i];
    if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        // 合法位置
    }
}
```

## 练习题

### 练习 1：矩阵对角线和

计算 n×n 矩阵的主对角线和副对角线的和。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, arr[100][100];
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> arr[i][j];
        }
    }
    
    int sum1 = 0, sum2 = 0;
    for (int i = 0; i < n; i++) {
        sum1 += arr[i][i];
        sum2 += arr[i][n - 1 - i];
    }
    
    cout << sum1 << " " << sum2 << endl;
    
    return 0;
}
```

</details>

### 练习 2：找鞍点

找出矩阵中的鞍点（该位置的元素在行上最大，在列上最小）。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, m, arr[100][100];
    cin >> n >> m;
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> arr[i][j];
        }
    }
    
    for (int i = 0; i < n; i++) {
        // 找该行最大值
        int max_col = 0;
        for (int j = 1; j < m; j++) {
            if (arr[i][j] > arr[i][max_col]) {
                max_col = j;
            }
        }
        
        // 检查是否是该列最小值
        bool is_saddle = true;
        for (int k = 0; k < n; k++) {
            if (arr[k][max_col] < arr[i][max_col]) {
                is_saddle = false;
                break;
            }
        }
        
        if (is_saddle) {
            cout << i << " " << max_col << " " << arr[i][max_col] << endl;
            return 0;
        }
    }
    
    cout << "NO" << endl;
    return 0;
}
```

</details>

## 总结

- 二维数组用于表示矩阵、地图等
- 下标从 [0][0] 开始
- 常用双重循环遍历
- 方向数组简化移动操作
- 二维前缀和加速区间查询
