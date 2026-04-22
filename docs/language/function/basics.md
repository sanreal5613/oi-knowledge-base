# 函数定义与调用

<DifficultyBadge level="easy" />

## 函数基础

函数是完成特定功能的代码块，可以重复调用。

### 函数定义

```cpp
返回类型 函数名(参数列表) {
    // 函数体
    return 返回值;
}
```

### 示例

```cpp
// 计算两数之和
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 5);
    cout << result << endl;  // 8
    return 0;
}
```

## 函数的组成

### 1. 返回类型

```cpp
int getMax(int a, int b) {
    return a > b ? a : b;
}

double getAverage(int a, int b) {
    return (a + b) / 2.0;
}

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// 无返回值
void printHello() {
    cout << "Hello!" << endl;
}
```

### 2. 参数列表

```cpp
// 无参数
void sayHello() {
    cout << "Hello!" << endl;
}

// 单个参数
void printNumber(int n) {
    cout << n << endl;
}

// 多个参数
int multiply(int a, int b) {
    return a * b;
}

// 默认参数
void greet(string name = "World") {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    greet();         // Hello, World!
    greet("Alice");  // Hello, Alice!
    return 0;
}
```

## 函数声明与定义

### 函数声明（前置声明）

```cpp
// 声明
int add(int a, int b);

int main() {
    cout << add(3, 5) << endl;
    return 0;
}

// 定义
int add(int a, int b) {
    return a + b;
}
```

## 值传递与引用传递

### 值传递

```cpp
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 1, y = 2;
    swap(x, y);
    cout << x << " " << y << endl;  // 1 2（未交换）
    return 0;
}
```

### 引用传递

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

### 指针传递

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

## 数组作为参数

```cpp
// 方法 1：传递数组和大小
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// 方法 2：传递引用
void fillArray(int (&arr)[5]) {
    for (int i = 0; i < 5; i++) {
        arr[i] = i;
    }
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr, 5);
    
    fillArray(arr);
    printArray(arr, 5);
    
    return 0;
}
```

## 函数重载

同名函数，不同参数：

```cpp
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << add(1, 2) << endl;        // 3
    cout << add(1.5, 2.5) << endl;    // 4.0
    cout << add(1, 2, 3) << endl;     // 6
    return 0;
}
```

## 内联函数

```cpp
inline int square(int x) {
    return x * x;
}

// 编译器会将函数调用替换为函数体，提高效率
```

## 常用数学函数

```cpp
#include <cmath>

abs(-5);       // 5（绝对值）
sqrt(16);      // 4（平方根）
pow(2, 3);     // 8（2 的 3 次方）
ceil(3.2);     // 4（向上取整）
floor(3.8);    // 3（向下取整）
round(3.5);    // 4（四舍五入）
max(3, 5);     // 5（最大值）
min(3, 5);     // 3（最小值）
```

## 竞赛常用函数

### 1. 快速幂

```cpp
long long quickPow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1) res *= a;
        a *= a;
        b >>= 1;
    }
    return res;
}
```

### 2. 最大公约数（GCD）

```cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

// 或使用 C++17 的 std::gcd
#include <numeric>
int g = gcd(12, 18);  // 6
```

### 3. 最小公倍数（LCM）

```cpp
int lcm(int a, int b) {
    return a / gcd(a, b) * b;  // 防止溢出
}
```

### 4. 判断质数

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}
```

### 5. 数字反转

```cpp
int reverse(int n) {
    int res = 0;
    while (n > 0) {
        res = res * 10 + n % 10;
        n /= 10;
    }
    return res;
}
```

## Lambda 表达式（C++11）

匿名函数，常用于 STL 算法：

```cpp
// 基本语法
auto add = [](int a, int b) {
    return a + b;
};

cout << add(3, 5) << endl;  // 8

// 用于排序
vector<int> v = {3, 1, 4, 1, 5};
sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;  // 降序
});
```

## 练习题

### 练习 1：阶乘函数

编写函数计算 n 的阶乘。

<details>
<summary>查看答案</summary>

```cpp
long long factorial(int n) {
    long long res = 1;
    for (int i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}
```

</details>

### 练习 2：斐波那契数列

编写函数返回第 n 项斐波那契数。

<details>
<summary>查看答案</summary>

```cpp
long long fib(int n) {
    if (n <= 2) return 1;
    long long a = 1, b = 1;
    for (int i = 3; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    return b;
}
```

</details>

### 练习 3：数组求和

编写函数计算数组所有元素的和。

<details>
<summary>查看答案</summary>

```cpp
int arraySum(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return sum;
}
```

</details>

## 总结

- 函数提高代码复用性
- 值传递不改变原变量，引用传递可以改变
- 数组作为参数时需要传递大小
- 函数重载：同名不同参
- 内联函数提高效率
- Lambda 表达式简化代码
