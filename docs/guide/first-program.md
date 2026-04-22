# 第一个程序

让我们从经典的 "Hello, World!" 程序开始，学习 C++ 程序的基本结构。

## Hello, World!

### 代码示例

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

### 代码解析

让我们逐行分析这个程序：

#### 1. 头文件包含

```cpp
#include <iostream>
```

- `#include` 是预处理指令，用于包含头文件
- `<iostream>` 是输入输出流库，提供 `cin` 和 `cout` 功能
- 必须放在程序开头

#### 2. 命名空间

```cpp
using namespace std;
```

- `std` 是标准命名空间
- 使用后可以直接写 `cout`，否则需要写 `std::cout`
- 竞赛中通常都会使用这一行

#### 3. 主函数

```cpp
int main() {
    // 函数体
    return 0;
}
```

- `main()` 是程序的入口函数
- `int` 表示函数返回整数类型
- `return 0;` 表示程序正常结束
- 所有代码都写在 `main()` 函数中

#### 4. 输出语句

```cpp
cout << "Hello, World!" << endl;
```

- `cout` 是输出流对象
- `<<` 是输出运算符
- `"Hello, World!"` 是要输出的字符串
- `endl` 表示换行并刷新缓冲区

## 输入输出基础

### 输出多个值

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    double b = 3.14;
    string s = "OI";
    
    cout << "整数: " << a << endl;
    cout << "小数: " << b << endl;
    cout << "字符串: " << s << endl;
    
    return 0;
}
```

### 接收输入

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cout << "请输入两个整数: ";
    cin >> a >> b;
    
    cout << "两数之和: " << a + b << endl;
    
    return 0;
}
```

### 简单计算器

```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "和: " << a + b << endl;
    cout << "差: " << a - b << endl;
    cout << "积: " << a * b << endl;
    return 0;
}
```

::: tip 提示
你可以复制上面的代码到本地编译器运行，输入两个数字（如 `10 5`）查看结果。
:::

## 常见错误

### 1. 忘记包含头文件

❌ **错误代码：**

```cpp
int main() {
    cout << "Hello" << endl;  // 错误：cout 未定义
    return 0;
}
```

✅ **正确代码：**

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    return 0;
}
```

### 2. 忘记 return 0

虽然现代编译器会自动添加，但建议显式写出：

```cpp
int main() {
    cout << "Hello" << endl;
    return 0;  // 建议加上
}
```

### 3. 中文字符问题

```cpp
cout << "你好，世界！" << endl;  // 可能出现乱码
```

解决方法：
- 使用英文
- 或配置编译器字符集

### 4. 分号遗漏

```cpp
cout << "Hello" << endl  // 错误：缺少分号
```

## 练习题

### 练习 1：输出个人信息

编写程序，输出你的姓名、年龄和学校。

**期望输出：**
```
姓名: 张三
年龄: 15
学校: XX中学
```

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "姓名: 张三" << endl;
    cout << "年龄: 15" << endl;
    cout << "学校: XX中学" << endl;
    return 0;
}
```

</details>

### 练习 2：计算矩形面积

输入矩形的长和宽，输出面积。

**输入：**
```
5 3
```

**输出：**
```
15
```

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int length, width;
    cin >> length >> width;
    cout << length * width << endl;
    return 0;
}
```

</details>

### 练习 3：温度转换

输入摄氏温度，输出华氏温度。公式：F = C × 1.8 + 32

**输入：**
```
25
```

**输出：**
```
77
```

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    double celsius;
    cin >> celsius;
    double fahrenheit = celsius * 1.8 + 32;
    cout << fahrenheit << endl;
    return 0;
}
```

</details>

## 编程规范

### 1. 缩进

使用 4 个空格或 1 个 Tab 进行缩进：

```cpp
int main() {
    if (true) {
        cout << "缩进" << endl;
    }
    return 0;
}
```

### 2. 命名规范

- 变量名使用小写字母和下划线：`student_count`
- 常量使用大写字母：`MAX_SIZE`
- 函数名使用驼峰命名：`calculateSum()`

### 3. 注释

```cpp
// 单行注释

/*
 * 多行注释
 * 用于详细说明
 */

int main() {
    int n;  // 输入的数字
    cin >> n;
    return 0;
}
```

## 调试技巧

### 1. 输出调试信息

```cpp
int a = 10, b = 20;
cout << "Debug: a = " << a << ", b = " << b << endl;
```

### 2. 分步测试

将复杂程序分解为小步骤，逐步测试。

### 3. 检查边界条件

测试特殊情况：
- 最小值
- 最大值
- 零值
- 负数

## 下一步

- [了解在线评测系统](/guide/online-judge)
- [学习变量与数据类型](/language/syntax/variables)
- [学习运算符](/language/syntax/operators)

## 总结

本节学习了：

✅ C++ 程序的基本结构  
✅ 输入输出的基本用法  
✅ 常见错误及解决方法  
✅ 编程规范和调试技巧

继续加油！🚀
