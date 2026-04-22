# 条件语句

<DifficultyBadge level="easy" />

## if 语句

### 基本语法

```cpp
if (条件) {
    // 条件为真时执行
}
```

### 示例

```cpp
#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    
    if (score >= 60) {
        cout << "及格" << endl;
    }
    
    return 0;
}
```

## if-else 语句

```cpp
if (条件) {
    // 条件为真
} else {
    // 条件为假
}
```

### 示例

```cpp
int age;
cin >> age;

if (age >= 18) {
    cout << "成年人" << endl;
} else {
    cout << "未成年人" << endl;
}
```

## if-else if-else

```cpp
int score;
cin >> score;

if (score >= 90) {
    cout << "优秀" << endl;
} else if (score >= 80) {
    cout << "良好" << endl;
} else if (score >= 60) {
    cout << "及格" << endl;
} else {
    cout << "不及格" << endl;
}
```

## 嵌套 if

```cpp
int age, hasTicket;
cin >> age >> hasTicket;

if (hasTicket) {
    if (age < 12) {
        cout << "儿童票" << endl;
    } else {
        cout << "成人票" << endl;
    }
} else {
    cout << "请先购票" << endl;
}
```

## switch 语句

适合多个固定值的判断：

```cpp
int day;
cin >> day;

switch (day) {
    case 1:
        cout << "星期一" << endl;
        break;
    case 2:
        cout << "星期二" << endl;
        break;
    case 3:
        cout << "星期三" << endl;
        break;
    case 4:
        cout << "星期四" << endl;
        break;
    case 5:
        cout << "星期五" << endl;
        break;
    case 6:
    case 7:
        cout << "周末" << endl;
        break;
    default:
        cout << "无效输入" << endl;
}
```

::: warning 注意
每个 case 后面要加 `break`，否则会继续执行下一个 case（称为"穿透"）。
:::

## 三元运算符

简化的 if-else：

```cpp
int a = 10, b = 20;
int max = (a > b) ? a : b;  // 如果 a > b，则 max = a，否则 max = b

cout << max << endl;  // 20
```

## 常见技巧

### 1. 判断奇偶

```cpp
if (n % 2 == 0) {
    cout << "偶数" << endl;
} else {
    cout << "奇数" << endl;
}

// 或用位运算
if (n & 1) {
    cout << "奇数" << endl;
} else {
    cout << "偶数" << endl;
}
```

### 2. 判断闰年

```cpp
bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}
```

### 3. 求三个数的最大值

```cpp
int a, b, c;
cin >> a >> b >> c;

int max = a;
if (b > max) max = b;
if (c > max) max = c;

cout << max << endl;

// 或使用 STL
cout << max({a, b, c}) << endl;
```

## 练习题

### 练习 1：判断正负零

输入一个整数，判断是正数、负数还是零。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n > 0) {
        cout << "正数" << endl;
    } else if (n < 0) {
        cout << "负数" << endl;
    } else {
        cout << "零" << endl;
    }
    
    return 0;
}
```

</details>

### 练习 2：计算器

输入两个数和一个运算符（+、-、*、/），输出计算结果。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;
    cin >> a >> op >> b;
    
    switch (op) {
        case '+':
            cout << a + b << endl;
            break;
        case '-':
            cout << a - b << endl;
            break;
        case '*':
            cout << a * b << endl;
            break;
        case '/':
            if (b != 0) {
                cout << a / b << endl;
            } else {
                cout << "除数不能为0" << endl;
            }
            break;
        default:
            cout << "无效运算符" << endl;
    }
    
    return 0;
}
```

</details>

## 总结

- `if`：单条件判断
- `if-else`：二选一
- `if-else if-else`：多选一
- `switch`：固定值判断
- 三元运算符：简化的 if-else
- 注意 switch 的 break
