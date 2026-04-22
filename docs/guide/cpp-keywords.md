# C++ 关键字

<DifficultyBadge level="easy" />

## C++98/03 关键字（63个）

| 关键字 | 含义 | 示例 |
|--------|------|------|
| `asm` | 汇编代码 | 嵌入汇编 |
| `auto` | 自动类型 | `auto x = 5;` |
| `bool` | 布尔类型 | `bool flag = true;` |
| `break` | 跳出循环 | `break;` |
| `case` | switch 分支 | `case 1:` |
| `catch` | 捕获异常 | `catch (exception e)` |
| `char` | 字符类型 | `char c = 'a';` |
| `class` | 类定义 | `class MyClass` |
| `const` | 常量 | `const int N = 100;` |
| `const_cast` | 常量转换 | `const_cast<int*>(p)` |
| `continue` | 继续循环 | `continue;` |
| `default` | 默认分支 | `default:` |
| `delete` | 释放内存 | `delete p;` |
| `do` | do-while 循环 | `do {...} while` |
| `double` | 双精度浮点 | `double x = 3.14;` |
| `dynamic_cast` | 动态转换 | `dynamic_cast<Derived*>(p)` |
| `else` | 否则 | `else {...}` |
| `enum` | 枚举 | `enum Color {RED, GREEN};` |
| `explicit` | 显式构造函数 | `explicit MyClass(int x)` |
| `export` | 导出模板 | 很少使用 |
| `extern` | 外部声明 | `extern int x;` |
| `false` | 假 | `bool flag = false;` |
| `float` | 单精度浮点 | `float x = 3.14f;` |
| `for` | for 循环 | `for (int i = 0; i < n; i++)` |
| `friend` | 友元 | `friend class B;` |
| `goto` | 跳转 | `goto label;` |
| `if` | 如果 | `if (x > 0)` |
| `inline` | 内联函数 | `inline int add(int a, int b)` |
| `int` | 整数 | `int x = 10;` |
| `long` | 长整型 | `long long x;` |
| `mutable` | 可变成员 | 即使在 const 对象中也可修改 |
| `namespace` | 命名空间 | `namespace std` |
| `new` | 分配内存 | `int* p = new int;` |
| `operator` | 运算符重载 | `operator+` |
| `private` | 私有 | `private:` |
| `protected` | 保护 | `protected:` |
| `public` | 公有 | `public:` |
| `register` | 寄存器变量 | 已废弃 |
| `reinterpret_cast` | 重新解释转换 | `reinterpret_cast<int*>(p)` |
| `return` | 返回 | `return 0;` |
| `short` | 短整型 | `short x;` |
| `signed` | 有符号 | `signed int x;` |
| `sizeof` | 大小 | `sizeof(int)` |
| `static` | 静态 | `static int x;` |
| `static_cast` | 静态转换 | `static_cast<int>(x)` |
| `struct` | 结构体 | `struct Point` |
| `switch` | 开关 | `switch (x)` |
| `template` | 模板 | `template <typename T>` |
| `this` | 当前对象指针 | `this->x` |
| `throw` | 抛出异常 | `throw exception;` |
| `true` | 真 | `bool flag = true;` |
| `try` | 尝试 | `try {...}` |
| `typedef` | 类型别名 | `typedef long long ll;` |
| `typeid` | 类型信息 | `typeid(x)` |
| `typename` | 类型名 | `typename T::iterator` |
| `union` | 联合体 | `union Data` |
| `unsigned` | 无符号 | `unsigned int x;` |
| `using` | 使用命名空间 | `using namespace std;` |
| `virtual` | 虚函数 | `virtual void func();` |
| `void` | 空类型 | `void func();` |
| `volatile` | 易变变量 | 防止优化 |
| `wchar_t` | 宽字符 | `wchar_t c;` |
| `while` | while 循环 | `while (x > 0)` |

## C++11 新增关键字（10个）

| 关键字 | 含义 | 示例 |
|--------|------|------|
| `alignas` | 对齐方式 | `alignas(16) char buffer[64];` |
| `alignof` | 获取对齐值 | `alignof(int)` |
| `char16_t` | 16位字符 | `char16_t c = u'a';` |
| `char32_t` | 32位字符 | `char32_t c = U'a';` |
| `constexpr` | 常量表达式 | `constexpr int N = 100;` |
| `decltype` | 类型推导 | `decltype(x) y;` |
| `noexcept` | 不抛出异常 | `void func() noexcept;` |
| `nullptr` | 空指针 | `int* p = nullptr;` |
| `static_assert` | 静态断言 | `static_assert(sizeof(int) == 4);` |
| `thread_local` | 线程局部存储 | `thread_local int x;` |

## C++20 新增关键字（若干）

| 关键字 | 含义 | 示例 |
|--------|------|------|
| `concept` | 概念 | 模板约束 |
| `consteval` | 常量求值 | 强制编译期求值 |
| `constinit` | 常量初始化 | 静态初始化 |
| `co_await` | 协程等待 | 异步编程 |
| `co_return` | 协程返回 | 异步编程 |
| `co_yield` | 协程产出 | 异步编程 |
| `requires` | 概念约束 | 模板约束 |

## 竞赛常用关键字

### 数据类型
```cpp
int          // 整数
long long    // 长整数
float        // 单精度浮点
double       // 双精度浮点
char         // 字符
bool         // 布尔
void         // 空类型
auto         // 自动类型推导
```

### 控制结构
```cpp
if / else    // 条件
switch / case / default  // 多分支
for / while / do-while   // 循环
break        // 跳出循环
continue     // 继续下一次循环
goto         // 跳转（不推荐）
return       // 返回
```

### 类和对象
```cpp
class        // 类
struct       // 结构体
public       // 公有
private      // 私有
protected    // 保护
virtual      // 虚函数
this         // 当前对象指针
new / delete // 动态内存
```

### 函数和变量
```cpp
const        // 常量
static       // 静态
inline       // 内联
extern       // 外部声明
typedef      // 类型别名
sizeof       // 大小
```

### 模板
```cpp
template     // 模板
typename     // 类型名
```

### 异常处理
```cpp
try / catch / throw  // 异常处理
```

### 类型转换
```cpp
static_cast      // 静态转换
dynamic_cast     // 动态转换
const_cast       // 常量转换
reinterpret_cast // 重新解释转换
```

### 命名空间
```cpp
namespace    // 命名空间
using        // 使用
```

## 关键字分类记忆

### 1. 数据类型（11个）
```
bool, char, int, float, double, void, wchar_t,
char16_t, char32_t, auto, decltype
```

### 2. 控制结构（12个）
```
if, else, switch, case, default,
for, while, do, break, continue, goto, return
```

### 3. 类和对象（9个）
```
class, struct, union, public, private, protected,
virtual, this, friend
```

### 4. 内存管理（2个）
```
new, delete
```

### 5. 函数修饰（4个）
```
inline, static, extern, const
```

### 6. 异常处理（3个）
```
try, catch, throw
```

### 7. 模板（2个）
```
template, typename
```

### 8. 命名空间（2个）
```
namespace, using
```

### 9. 类型转换（4个）
```
static_cast, dynamic_cast, const_cast, reinterpret_cast
```

### 10. 其他（14个）
```
true, false, sizeof, typedef, typeid,
alignas, alignof, constexpr, noexcept, nullptr,
static_assert, thread_local, volatile, asm
```

## 关键字注意事项

### 1. 不能作为标识符
```cpp
// 错误！不能用关键字作为变量名
int class = 10;      // 错误
int return = 5;      // 错误
int my_class = 10;   // 正确，加下划线
```

### 2. 区分大小写
```cpp
int INT = 10;        // 正确，INT 不是关键字
int Int = 10;        // 正确
int int = 10;        // 错误
```

### 3. 上下文关键字
```cpp
// override 和 final 是上下文关键字
// 在特定位置是关键字，其他位置可以作为标识符
void func() override;  // 关键字
int override = 10;      // 可以作为变量名（但不推荐）
```

## 竞赛中常用的

```cpp
// 数据类型
int, long long, double, char, bool, auto

// 控制结构
if, else, for, while, break, continue, return

// 类和结构体
class, struct, public, private

// 内存
new, delete

// 其他
const, static, inline, typedef, sizeof, namespace, using

// 类型转换
static_cast
```

## 总结

- C++98/03 有 63 个关键字
- C++11 新增 10 个关键字
- C++20 又新增若干关键字
- 关键字不能作为变量名、函数名等标识符
- 熟记常用关键字，提高代码阅读能力
