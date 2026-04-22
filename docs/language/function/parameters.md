# 参数传递

<DifficultyBadge level="easy" />

## 值传递

函数参数默认是**值传递**，传递的是实参的**副本**。

```cpp
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y << endl;  // 1 2（没有交换）
    return 0;
}
```

::: warning 注意
值传递不会改变原变量的值！
:::

## 引用传递

使用 `&` 符号，传递的是**原变量的别名**。

```cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y << endl;  // 2 1（已交换）
    return 0;
}
```

## 指针传递

传递**地址**，通过地址修改原变量。

```cpp
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(&x, &y);
    cout << x << " " << y << endl;  // 2 1（已交换）
    return 0;
}
```

## 三种传递对比

| 传递方式 | 符号 | 是否修改原变量 | 效率 | 安全性 |
|---------|------|--------------|------|--------|
| 值传递 | 无 | ❌ | 低（复制） | 高 |
| 引用传递 | `&` | ✅ | 高 | 中 |
| 指针传递 | `*` | ✅ | 高 | 低 |

## 数组作为参数

### 一维数组

```cpp
// 方式1：传递数组和大小
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// 方式2：传递引用（固定大小）
void printArray(int (&arr)[5]) {
    for (int x : arr) {
        cout << x << " ";
    }
    cout << endl;
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr, 5);
    return 0;
}
```

### 二维数组

```cpp
// 方式1：指定第二维大小
void printMatrix(int arr[][4], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < 4; j++) {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}

// 方式2：使用vector
void printMatrix(vector<vector<int>>& arr) {
    for (auto& row : arr) {
        for (int x : row) {
            cout << x << " ";
        }
        cout << endl;
    }
}
```

## 结构体作为参数

```cpp
struct Point {
    int x, y;
};

// 值传递
void movePoint(Point p, int dx, int dy) {
    p.x += dx;
    p.y += dy;
}

// 引用传递
void movePoint(Point& p, int dx, int dy) {
    p.x += dx;
    p.y += dy;
}

int main() {
    Point p = {1, 2};
    movePoint(p, 3, 4);
    cout << p.x << " " << p.y << endl;  // 4 6
    return 0;
}
```

## const 引用

防止修改，提高效率：

```cpp
// 大对象传递，不修改，效率高
void print(const string& s) {
    cout << s << endl;
    // s += "!";  // 错误，不能修改
}

int main() {
    string str = "Hello";
    print(str);
    return 0;
}
```

## 默认参数

```cpp
void greet(string name = "World", int times = 1) {
    for (int i = 0; i < times; i++) {
        cout << "Hello, " << name << "!" << endl;
    }
}

int main() {
    greet();              // Hello, World!
    greet("Alice");       // Hello, Alice!
    greet("Bob", 3);      // Hello, Bob!（3次）
    return 0;
}
```

::: warning 注意
默认参数必须从右往左连续设置！
:::

## 可变参数

```cpp
#include <cstdarg>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    
    va_end(args);
    return total;
}

int main() {
    cout << sum(3, 1, 2, 3) << endl;  // 6
    cout << sum(5, 1, 2, 3, 4, 5) << endl;  // 15
    return 0;
}
```

## 竞赛常用技巧

```cpp
// 快速读入大数组
void readArray(vector<int>& arr, int n) {
    arr.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
}

// 返回多个值（使用引用）
void getMinMax(vector<int>& arr, int& minVal, int& maxVal) {
    minVal = *min_element(arr.begin(), arr.end());
    maxVal = *max_element(arr.begin(), arr.end());
}

int main() {
    vector<int> arr = {3, 1, 4, 1, 5};
    int minVal, maxVal;
    getMinMax(arr, minVal, maxVal);
    cout << minVal << " " << maxVal << endl;  // 1 5
    return 0;
}
```

## 总结

- 值传递：不改变原变量，传递副本
- 引用传递：改变原变量，效率高，推荐
- 指针传递：改变原变量，灵活但危险
- 数组传递：需要传递大小或使用引用
- const引用：大对象只读传递
- 默认参数：从右往左设置
