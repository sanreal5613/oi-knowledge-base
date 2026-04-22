# 输入输出详解

<DifficultyBadge level="easy" />

## 标准输入输出

C++ 使用 `cin` 和 `cout` 进行输入输出，需要包含 `<iostream>` 头文件。

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;       // 输入
    cout << n;      // 输出
    return 0;
}
```

## 输出（cout）

### 基本输出

```cpp
cout << 42;               // 输出整数
cout << 3.14;             // 输出浮点数
cout << "Hello";          // 输出字符串
cout << 'A';              // 输出字符
cout << true;             // 输出布尔值（1 或 0）
```

### 换行

```cpp
cout << "第一行" << endl;    // endl：换行并刷新缓冲区
cout << "第二行" << "\n";    // \n：只换行，速度更快
```

::: tip 竞赛技巧
在竞赛中，`"\n"` 比 `endl` 快，数据量大时推荐用 `"\n"`。
:::

### 连续输出

```cpp
int a = 1, b = 2, c = 3;
cout << a << " " << b << " " << c << "\n";
// 输出：1 2 3
```

### 格式化输出

```cpp
#include <iomanip>

double pi = 3.14159265;

// 设置小数位数
cout << fixed << setprecision(2) << pi << "\n";  // 3.14
cout << fixed << setprecision(4) << pi << "\n";  // 3.1416

// 设置输出宽度
cout << setw(10) << 42 << "\n";  // 右对齐，宽度 10

// 左对齐
cout << left << setw(10) << 42 << "\n";
```

## 输入（cin）

### 基本输入

```cpp
int n;
cin >> n;           // 读取整数

double x;
cin >> x;           // 读取浮点数

char c;
cin >> c;           // 读取字符（跳过空白）

string s;
cin >> s;           // 读取字符串（到空格为止）
```

### 读取多个值

```cpp
int a, b, c;
cin >> a >> b >> c;  // 用空格或换行分隔

// 输入：1 2 3
// 或：
// 1
// 2
// 3
```

### 读取一行

```cpp
string line;
getline(cin, line);  // 读取整行，包括空格

// 注意：cin >> 后使用 getline 需要先清除换行符
int n;
cin >> n;
cin.ignore();        // 清除换行符
getline(cin, line);
```

### 读取到 EOF

```cpp
int x;
while (cin >> x) {   // 读取直到文件结束
    // 处理 x
}
```

## 文件输入输出

竞赛中有时需要从文件读取数据：

```cpp
#include <cstdio>

int main() {
    freopen("input.txt", "r", stdin);   // 重定向输入
    freopen("output.txt", "w", stdout); // 重定向输出
    
    // 之后正常使用 cin/cout 即可
    int n;
    cin >> n;
    cout << n << "\n";
    
    return 0;
}
```

## printf / scanf（C 风格）

竞赛中也常用 C 风格的输入输出，速度更快：

```cpp
#include <cstdio>

int main() {
    int a, b;
    scanf("%d %d", &a, &b);    // 输入
    printf("%d\n", a + b);     // 输出
    return 0;
}
```

### 常用格式符

| 格式符 | 类型 | 说明 |
|--------|------|------|
| `%d` | int | 整数 |
| `%lld` | long long | 长整数 |
| `%f` | float | 单精度浮点 |
| `%lf` | double | 双精度浮点 |
| `%c` | char | 字符 |
| `%s` | char[] | 字符串 |

```cpp
int n = 42;
long long m = 1e18;
double pi = 3.14159;
char c = 'A';

printf("int: %d\n", n);
printf("long long: %lld\n", m);
printf("double: %.2f\n", pi);   // 保留 2 位小数
printf("char: %c\n", c);
```

## 加速输入输出

当数据量很大时，可以关闭同步加速：

```cpp
#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);  // 关闭 C/C++ 同步
    cin.tie(nullptr);              // 解除 cin 和 cout 的绑定
    
    // 注意：使用这两行后，不能混用 scanf/printf 和 cin/cout
    
    int n;
    cin >> n;
    cout << n << "\n";
    
    return 0;
}
```

::: tip 竞赛模板
这两行是竞赛中的标准操作，建议加入你的代码模板中。
:::

## 示例代码

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int a, b;
    cin >> a >> b;
    
    cout << "和: " << a + b << "\n";
    cout << "差: " << a - b << "\n";
    cout << "积: " << a * b << "\n";
    
    if (b != 0) {
        cout << fixed << setprecision(2);
        cout << "商: " << (double)a / b << "\n";
        cout << "余: " << a % b << "\n";
    }
    
    return 0;
}
```

::: tip 提示
复制上面的代码到本地编译器运行，输入两个数字（如 `10 3`）查看结果。
:::

## 常见问题

### 1. 输入字符串含空格

```cpp
string s;
getline(cin, s);  // 读取整行
```

### 2. 输出精度问题

```cpp
#include <iomanip>
cout << fixed << setprecision(6) << 3.14159265 << "\n";
// 输出：3.141593
```

### 3. 读取不定数量的输入

```cpp
int x, sum = 0;
while (cin >> x) {
    sum += x;
}
cout << sum << "\n";
```

## 总结

- `cin >> x`：读取输入，自动跳过空白
- `cout << x`：输出，`"\n"` 比 `endl` 快
- `getline(cin, s)`：读取整行
- `freopen`：重定向文件输入输出
- `ios::sync_with_stdio(false)` + `cin.tie(nullptr)`：加速输入输出
- 大量数据时考虑用 `scanf/printf`
