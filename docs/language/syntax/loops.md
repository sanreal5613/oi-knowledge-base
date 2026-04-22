# 循环语句

<DifficultyBadge level="easy" />

## for 循环

### 基本语法

```cpp
for (初始化; 条件; 更新) {
    // 循环体
}
```

### 示例

```cpp
// 输出 1 到 10
for (int i = 1; i <= 10; i++) {
    cout << i << " ";
}
cout << endl;
```

### 执行流程

1. 执行初始化（`int i = 1`）
2. 判断条件（`i <= 10`）
3. 如果为真，执行循环体
4. 执行更新（`i++`）
5. 回到步骤 2

## while 循环

### 基本语法

```cpp
while (条件) {
    // 循环体
}
```

### 示例

```cpp
int i = 1;
while (i <= 10) {
    cout << i << " ";
    i++;
}
cout << endl;
```

## do-while 循环

先执行一次，再判断条件：

```cpp
int i = 1;
do {
    cout << i << " ";
    i++;
} while (i <= 10);
cout << endl;
```

::: tip 区别
`do-while` 至少执行一次，`while` 可能一次都不执行。
:::

## 循环控制

### break：跳出循环

```cpp
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // 遇到 5 就退出循环
    }
    cout << i << " ";
}
// 输出：1 2 3 4
```

### continue：跳过本次

```cpp
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数
    }
    cout << i << " ";
}
// 输出：1 3 5 7 9
```

## 嵌套循环

```cpp
// 打印乘法表
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        cout << j << "x" << i << "=" << i*j << " ";
    }
    cout << endl;
}
```

## 常见应用

### 1. 求和

```cpp
int n, sum = 0;
cin >> n;

for (int i = 1; i <= n; i++) {
    sum += i;
}

cout << sum << endl;
```

### 2. 求阶乘

```cpp
int n;
long long factorial = 1;
cin >> n;

for (int i = 1; i <= n; i++) {
    factorial *= i;
}

cout << factorial << endl;
```

### 3. 找最大值

```cpp
int n, max_val = -1e9;
cin >> n;

for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    if (x > max_val) {
        max_val = x;
    }
}

cout << max_val << endl;
```

### 4. 判断质数

```cpp
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
```

### 5. 最大公约数（GCD）

```cpp
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

## 范围 for 循环（C++11）

遍历数组或容器：

```cpp
int arr[] = {1, 2, 3, 4, 5};

// 遍历数组
for (int x : arr) {
    cout << x << " ";
}
cout << endl;

// 修改数组元素（需要引用）
for (int& x : arr) {
    x *= 2;
}
```

## 无限循环

```cpp
// 方法 1
while (true) {
    // ...
    if (条件) break;
}

// 方法 2
for (;;) {
    // ...
    if (条件) break;
}
```

## 常见错误

### 1. 死循环

```cpp
// 错误：忘记更新 i
int i = 0;
while (i < 10) {
    cout << i << endl;
    // 忘记 i++，导致死循环
}
```

### 2. 边界错误

```cpp
// 错误：多循环一次
for (int i = 0; i <= n; i++) {  // 应该是 i < n
    arr[i] = i;
}
```

### 3. 浮点数循环

```cpp
// 不推荐：浮点数精度问题
for (double x = 0; x != 1.0; x += 0.1) {
    cout << x << endl;
}

// 推荐：用整数控制
for (int i = 0; i < 10; i++) {
    double x = i * 0.1;
    cout << x << endl;
}
```

## 竞赛技巧

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

### 2. 枚举优化

```cpp
// 只枚举到 sqrt(n)
for (int i = 1; i * i <= n; i++) {
    if (n % i == 0) {
        // i 和 n/i 都是因子
    }
}
```

## 练习题

### 练习 1：输出 1-100 的奇数

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 100; i += 2) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}
```

</details>

### 练习 2：斐波那契数列

输出前 n 项斐波那契数列（1, 1, 2, 3, 5, 8, ...）

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    long long a = 1, b = 1;
    for (int i = 1; i <= n; i++) {
        cout << a << " ";
        long long c = a + b;
        a = b;
        b = c;
    }
    cout << endl;
    
    return 0;
}
```

</details>

### 练习 3：数字反转

输入一个整数，输出它的反转（如 123 → 321）

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, reversed = 0;
    cin >> n;
    
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    
    cout << reversed << endl;
    return 0;
}
```

</details>

## 总结

- `for`：知道循环次数时使用
- `while`：不确定循环次数时使用
- `do-while`：至少执行一次
- `break`：跳出循环
- `continue`：跳过本次循环
- 注意边界条件，避免死循环
