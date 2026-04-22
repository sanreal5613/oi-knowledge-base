# 变量与数据类型

<DifficultyBadge level="easy" />

## 变量

变量是程序中用于存储数据的"容器"，每个变量都有名称和类型。

### 变量声明与初始化

```cpp
#include <iostream>
using namespace std;

int main() {
    int a;          // 声明整型变量
    int b = 10;     // 声明并初始化
    int c = a = 5;  // 连续赋值
    
    cout << b << endl;  // 输出 10
    return 0;
}
```

## 基本数据类型

| 类型 | 关键字 | 大小 | 范围 | 说明 |
|------|--------|------|------|------|
| 整型 | `int` | 4 字节 | -2,147,483,648 ~ 2,147,483,647 | 最常用 |
| 长整型 | `long long` | 8 字节 | -9.2×10¹⁸ ~ 9.2×10¹⁸ | 大数必用 |
| 单精度浮点 | `float` | 4 字节 | 约 7 位有效数字 | 精度较低 |
| 双精度浮点 | `double` | 8 字节 | 约 15 位有效数字 | 推荐使用 |
| 字符型 | `char` | 1 字节 | -128 ~ 127 | 存储单个字符 |
| 布尔型 | `bool` | 1 字节 | true / false | 逻辑判断 |

### 整型

```cpp
int a = 100;
long long b = 1000000000000LL;  // 注意加 LL 后缀

// 竞赛中常见的大数
// int 最大约 2×10^9
// long long 最大约 9.2×10^18
```

::: tip 竞赛技巧
当数据范围超过 2×10⁹ 时，必须使用 `long long`！忘记这一点是竞赛中最常见的错误之一。
:::

### 浮点型

```cpp
double pi = 3.14159265358979;
float f = 3.14f;  // float 需要加 f 后缀

// 浮点数比较不能用 ==，要用差值
double a = 0.1 + 0.2;
if (abs(a - 0.3) < 1e-9) {
    cout << "相等" << endl;
}
```

### 字符型

```cpp
char c = 'A';           // 单引号
char newline = '\n';    // 转义字符

// char 本质是整数，可以参与运算
cout << (int)'A' << endl;  // 输出 65
cout << (char)65 << endl;  // 输出 A

// 大小写转换
char lower = 'a' + ('A' - 'a');  // 不推荐
char upper = toupper('a');        // 推荐
```

### 布尔型

```cpp
bool flag = true;
bool ok = false;

// 任何非零值都是 true
bool b1 = (5 > 3);   // true
bool b2 = (1 == 2);  // false

cout << flag << endl;  // 输出 1（true）
cout << ok << endl;    // 输出 0（false）
```

## 常量

### const 常量

```cpp
const int MAX_N = 100005;
const double PI = 3.14159265358979;
const long long INF = 1e18;
```

### 宏定义

```cpp
#define MAXN 100005
#define INF 0x3f3f3f3f
```

::: tip 推荐使用 const
`const` 比 `#define` 更安全，有类型检查，推荐使用 `const`。
:::

## 类型转换

### 隐式转换

```cpp
int a = 3;
double b = a;       // int → double，自动转换
int c = 3.7;        // double → int，截断小数，c = 3
```

### 显式转换（强制转换）

```cpp
int a = 7, b = 2;
double result = (double)a / b;  // 3.5，而不是 3
cout << result << endl;

// 竞赛中常见写法
long long ans = (long long)a * b;  // 防止溢出
```

## 示例代码

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 2147483647;      // int 最大值
    long long b = 9223372036854775807LL;  // long long 最大值
    double pi = 3.14159265358979;
    char c = 'A';
    bool flag = true;
    
    cout << "int 最大值: " << a << endl;
    cout << "long long 最大值: " << b << endl;
    cout << "PI = " << pi << endl;
    cout << "字符: " << c << " (ASCII: " << (int)c << ")" << endl;
    cout << "bool: " << flag << endl;
    
    return 0;
}
```

## 竞赛常用技巧

### 1. 快速定义常用常量

```cpp
const int INF = 0x3f3f3f3f;       // 约 10^9，用于初始化最短路
const long long LLINF = 1e18;     // long long 无穷大
const int MOD = 1e9 + 7;          // 取模常数
const double EPS = 1e-9;          // 浮点精度
```

### 2. 类型别名

```cpp
typedef long long ll;
typedef unsigned long long ull;
typedef pair<int, int> pii;

// 使用
ll a = 1e18;
```

### 3. 整型溢出检测

```cpp
int a = 1e9, b = 1e9;
// 错误：int 溢出
int wrong = a * b;

// 正确：先转换为 long long
long long correct = (long long)a * b;
```

## 练习题

1. 定义变量存储你的年龄、身高（cm）、姓名首字母，并输出
2. 计算 `1000000000 × 1000000000` 的结果（注意溢出）
3. 将华氏温度 98.6°F 转换为摄氏温度（公式：C = (F-32) × 5/9）

<details>
<summary>练习 2 答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    long long a = 1000000000LL;
    long long b = 1000000000LL;
    long long result = a * b;
    cout << result << endl;  // 1000000000000000000
    return 0;
}
```

</details>

## 总结

- `int`：日常使用，范围约 ±2×10⁹
- `long long`：大数必用，范围约 ±9.2×10¹⁸
- `double`：浮点数，精度约 15 位
- `char`：字符，本质是整数
- `bool`：布尔值，true/false
- 注意**整型溢出**，这是竞赛中最常见的错误！
