# C++ 代码里的英文单词

<DifficultyBadge level="easy" />

## 写在前面

写C++代码就是写英文，这些单词天天见，必须认识！

---

## 一、头文件相关

| 单词 | 含义 | 示例 |
|------|------|------|
| `include` | 包含 | `#include <iostream>` |
| `iostream` | 输入输出流 | i-o-stream |
| `cstdio` | C标准输入输出 | C + stdio |
| `cstring` | C字符串 | C + string |
| `cmath` | C数学 | C + math |
| `algorithm` | 算法 | STL算法库 |
| `vector` | 向量 | 动态数组 |
| `queue` | 队列 | 先进先出 |
| `stack` | 栈 | 后进先出 |
| `map` | 映射 | 键值对 |
| `set` | 集合 | 去重有序 |
| `bits/stdc++.h` | 万能头 | 包含所有STL |

**记忆技巧：**
- `i` = input（输入）
- `o` = output（输出）
- `stream` = 流
- `c` 开头 = C语言兼容版本

---

## 二、命名空间

| 单词 | 含义 | 示例 |
|------|------|------|
| `using` | 使用 | `using namespace std;` |
| `namespace` | 命名空间 | 防止名字冲突 |
| `std` | 标准 | standard 的缩写 |

**为什么写这个？**
```cpp
// 不写using的话，每次都要加std::
std::cout << "hello";  // 麻烦

// 写了using就简单了
cout << "hello";       // 省事
```

---

## 三、主函数相关

| 单词 | 含义 | 示例 |
|------|------|------|
| `main` | 主要的 | 程序入口函数 |
| `return` | 返回 | `return 0;` |
| `void` | 空的 | 无返回值 |
| `int` | 整数 | 返回整数 |

**必须记住：**
```cpp
int main() {          // 主函数，程序从这里开始
    // 你的代码
    return 0;         // 返回0表示正常结束
}
```

---

## 四、输入输出

### C++风格

| 单词 | 含义 | 示例 |
|------|------|------|
| `cin` | C输入 | `cin >> a;` |
| `cout` | C输出 | `cout << a;` |
| `endl` | 结束行 | end line，换行 |

**记忆：**
- `cin` = c + in（输入进来）
- `cout` = c + out（输出出去）
- `>>` 指向变量 = 输入到变量
- `<<` 指向cout = 从变量输出

### C风格

| 单词 | 含义 | 示例 |
|------|------|------|
| `scanf` | 扫描格式化输入 | `scanf("%d", &a);` |
| `printf` | 打印格式化输出 | `printf("%d", a);` |
| `format` | 格式 | `%d`, `%lld` 等 |

**格式符：**
```cpp
%d      // decimal，整数
%lld    // long long decimal，长整数
%f      // float，浮点数
%c      // character，字符
%s      // string，字符串
```

---

## 五、数据类型

| 英文 | 含义 | 中文 | 范围 |
|------|------|------|------|
| `int` | integer | 整数 | -2×10⁹ ~ 2×10⁹ |
| `long long` | long long | 长整数 | -9×10¹⁸ ~ 9×10¹⁸ |
| `float` | float | 单精度浮点 | 小数 |
| `double` | double | 双精度浮点 | 更精确的小数 |
| `char` | character | 字符 | 单个字母 |
| `bool` | boolean | 布尔 | true/false |
| `string` | string | 字符串 | 一串字符 |
| `void` | void | 空 | 没有类型 |
| `auto` | auto | 自动 | 自动推断类型 |
| `const` | constant | 常量 | 不可修改 |

**竞赛常用：**
```cpp
int n;              // 计数、下标
long long sum;      // 求和（防溢出）
double avg;         // 平均值
char c;             // 读入字符
string s;           // 读入字符串
const int N = 1e5;  // 定义常量
```

---

## 六、控制结构

### 条件判断

| 英文 | 含义 | 示例 |
|------|------|------|
| `if` | 如果 | `if (a > b)` |
| `else` | 否则 | `else { ... }` |
| `switch` | 开关 | 多分支选择 |
| `case` | 情况 | `case 1:` |
| `default` | 默认 | 默认情况 |

### 循环

| 英文 | 含义 | 示例 |
|------|------|------|
| `for` | 对于 | `for (int i = 0; i < n; i++)` |
| `while` | 当...时 | `while (x > 0)` |
| `do` | 做 | `do { ... } while` |
| `break` | 打破 | 跳出循环 |
| `continue` | 继续 | 跳过本次循环 |

### 记忆技巧

```cpp
// for = 对于每一个
for (int i = 0; i < n; i++)  // 对于i从0到n-1

// while = 当...时候
while (x > 0)  // 当x大于0时，继续循环

// break = 打破循环
break;  // 直接跳出

// continue = 继续下一次
continue;  // 跳过这次，继续下次
```

---

## 七、函数相关

| 英文 | 含义 | 示例 |
|------|------|------|
| `function` | 函数 | 一段可复用的代码 |
| `void` | 无返回值 | `void print()` |
| `return` | 返回 | `return x;` |
| `parameter` | 参数 | 函数输入 |
| `argument` | 实参 | 调用时传入的值 |

**示例：**
```cpp
// int 是返回类型，add 是函数名，a和b是参数
int add(int a, int b) {
    return a + b;  // 返回a+b的结果
}
```

---

## 八、STL容器操作

| 英文 | 含义 | 用法 |
|------|------|------|
| `push` | 推入 | `push_back()`, `push()` |
| `pop` | 弹出 | `pop_back()`, `pop()` |
| `top` | 顶部 | 栈顶元素 |
| `front` | 前面 | 队首元素 |
| `back` | 后面 | 队尾/末尾 |
| `size` | 大小 | 元素个数 |
| `empty` | 空的 | 是否为空 |
| `clear` | 清空 | 删除所有元素 |
| `begin` | 开始 | 起始迭代器 |
| `end` | 结束 | 结束迭代器 |
| `insert` | 插入 | 在指定位置插入 |
| `erase` | 擦除 | 删除元素 |
| `find` | 查找 | 查找元素 |
| `sort` | 排序 | 从小到大排序 |
| `reverse` | 反转 | 倒过来 |

**记忆：**
- `push`/`pop` 是一对，推入/弹出
- `front`/`back` 是一对，前面/后面
- `begin`/`end` 是一对，开始/结束
- `insert`/`erase` 是一对，插入/删除

---

## 九、常用算法单词

| 英文 | 含义 | 中文 |
|------|------|------|
| `sort` | sort | 排序 |
| `max` | maximum | 最大值 |
| `min` | minimum | 最小值 |
| `swap` | swap | 交换 |
| `gcd` | greatest common divisor | 最大公约数 |
| `lcm` | least common multiple | 最小公倍数 |
| `abs` | absolute | 绝对值 |
| `sqrt` | square root | 平方根 |
| `pow` | power | 幂次 |
| `log` | logarithm | 对数 |

---

## 十、竞赛常见缩写

| 缩写 | 全称 | 中文 | 含义 |
|------|------|------|------|
| `AC` | Accepted | 通过 | 答案正确 |
| `WA` | Wrong Answer | 答案错误 | 输出不对 |
| `TLE` | Time Limit Exceeded | 超时 | 运行太慢 |
| `MLE` | Memory Limit Exceeded | 超内存 | 内存太大 |
| `RE` | Runtime Error | 运行错误 | 程序崩溃 |
| `CE` | Compile Error | 编译错误 | 语法错误 |
| `PE` | Presentation Error | 格式错误 | 多空格/换行 |

---

## 十一、完整代码对照

```cpp
#include <bits/stdc++.h>      // include = 包含，bits/stdc++.h = 万能头
using namespace std;           // using = 使用，namespace = 命名空间，std = 标准

int main() {                   // int = 整数，main = 主函数
    ios::sync_with_stdio(false);  // sync = 同步
    cin.tie(nullptr);             // tie = 绑定
    
    int n;                     // int = 整数类型，n = 变量名
    cin >> n;                  // cin = C输入，>> = 输入符号
    
    vector<int> a(n);          // vector = 向量/动态数组
    for (int i = 0; i < n; i++) {   // for = 循环，i = 下标
        cin >> a[i];           // 读入数组元素
    }
    
    sort(a.begin(), a.end());  // sort = 排序，begin = 开始，end = 结束
    
    for (int i = 0; i < n; i++) {
        cout << a[i] << " ";   // cout = C输出，<< = 输出符号
    }
    cout << endl;              // endl = end line，换行
    
    return 0;                  // return = 返回，0 = 正常结束
}
```

---

## 十二、必背单词表

### 第一级（必须会写）
```
include, using, namespace, std
int, long, long long, double, char, bool, void, const
main, return, if, else, for, while
break, continue, cin, cout, endl
```

### 第二级（必须认识）
```
iostream, cstdio, cstring, cmath, algorithm
vector, queue, stack, map, set, string
scanf, printf, auto, switch, case, default
true, false, sizeof, typedef, struct
```

### 第三级（经常见到）
```
template, typename, class, public, private
static, inline, extern, register, volatile
sizeof, typeid, nullptr, constexpr, decltype
```

---

## 十三、记忆口诀

```
包含头文件用 include
标准命名空间是 std
主函数入口叫 main
整数类型是 int

输入用 cin，输出用 cout
换行就用 endl
循环用 for 或 while
条件判断用 if else

数组用 vector，队列叫 queue
栈是 stack，映射是 map
排序用 sort，交换用 swap
最大 max，最小 min
```

---

> 💡 **提示**：这些单词不用刻意背，多写代码自然就记住了！
