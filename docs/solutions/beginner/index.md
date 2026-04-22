# 入门题解

<DifficultyBadge level="easy" />

## 简介

本章节收录适合初学者的经典题目，帮助巩固基础知识。

## 题目列表

### 1. A+B Problem

**题目**：输入两个整数，输出它们的和。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
```

### 2. 求最大值

**题目**：输入三个整数，输出最大值。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << max({a, b, c}) << endl;
    return 0;
}
```

### 3. 判断奇偶

**题目**：输入一个整数，判断是奇数还是偶数。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << "偶数" << endl;
    } else {
        cout << "奇数" << endl;
    }
    return 0;
}
```

### 4. 求阶乘

**题目**：输入 n，输出 n!。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    long long result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    
    cout << result << endl;
    return 0;
}
```

### 5. 斐波那契数列

**题目**：输入 n，输出第 n 项斐波那契数。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    if (n <= 2) {
        cout << 1 << endl;
        return 0;
    }
    
    long long a = 1, b = 1, c;
    for (int i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    
    cout << b << endl;
    return 0;
}
```

### 6. 数组求和

**题目**：输入 n 个数，输出它们的和。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
    }
    
    cout << sum << endl;
    return 0;
}
```

### 7. 找最大值

**题目**：输入 n 个数，输出最大值。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int max_val = -1e9;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        max_val = max(max_val, x);
    }
    
    cout << max_val << endl;
    return 0;
}
```

### 8. 冒泡排序

**题目**：输入 n 个数，升序输出。

**代码**：

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[1005];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 9. 判断素数

**题目**：输入 n，判断是否为素数。

**代码**：

```cpp
#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;
    
    if (isPrime(n)) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    
    return 0;
}
```

### 10. 最大公约数

**题目**：输入两个数，输出最大公约数。

**代码**：

```cpp
#include <iostream>
using namespace std;

int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    return 0;
}
```

## 更多题目

- [洛谷 P1000 超级玛丽游戏](https://www.luogu.com.cn/problem/P1000)
- [洛谷 P1001 A+B Problem](https://www.luogu.com.cn/problem/P1001)
- [洛谷 P1421 小玉买文具](https://www.luogu.com.cn/problem/P1421)
- [洛谷 P1425 小鱼的游泳时间](https://www.luogu.com.cn/problem/P1425)

## 总结

入门题目主要考察：
- 基本输入输出
- 条件判断
- 循环结构
- 数组操作
- 简单算法

建议每道题都自己写一遍，加深理解。
