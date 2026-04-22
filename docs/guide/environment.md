# 开发环境配置

在开始学习信奥之前,我们需要配置好 C++ 开发环境。本文将介绍几种常用的开发环境配置方法。

## Windows 系统

### 方案一：Dev-C++（推荐新手）

Dev-C++ 是一款轻量级的 C++ IDE，适合初学者使用。

#### 下载安装

1. 访问 [Dev-C++ 官网](https://sourceforge.net/projects/orwelldevcpp/)
2. 下载最新版本
3. 运行安装程序，按提示完成安装

#### 配置编译器

1. 打开 Dev-C++
2. 点击 `工具` → `编译选项`
3. 在 `代码生成/优化` 选项卡中：
   - 语言标准：选择 `ISO C++17`
   - 优化级别：选择 `O2`

#### 创建第一个程序

1. 点击 `文件` → `新建` → `源代码`
2. 输入以下代码：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, OI!" << endl;
    return 0;
}
```

3. 点击 `运行` → `编译运行`（或按 F11）

### 方案二：Visual Studio Code（推荐进阶）

VS Code 是一款强大的代码编辑器，配置灵活，插件丰富。

#### 安装步骤

1. **下载 VS Code**
   - 访问 [VS Code 官网](https://code.visualstudio.com/)
   - 下载并安装

2. **安装 MinGW-w64**
   - 访问 [MinGW-w64 下载页](https://sourceforge.net/projects/mingw-w64/)
   - 下载并安装
   - 将 MinGW 的 bin 目录添加到系统环境变量 PATH

3. **安装 VS Code 插件**
   - 打开 VS Code
   - 安装以下插件：
     - C/C++（Microsoft 官方）
     - Code Runner
     - C++ Intellisense

#### 配置编译环境

1. 创建工作文件夹，如 `D:\OI`
2. 用 VS Code 打开该文件夹
3. 创建 `.vscode` 文件夹
4. 在 `.vscode` 中创建以下配置文件：

**tasks.json**（编译配置）

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Compile",
            "type": "shell",
            "command": "g++",
            "args": [
                "-std=c++17",
                "-O2",
                "-Wall",
                "${file}",
                "-o",
                "${fileDirname}\\${fileBasenameNoExtension}.exe"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

**launch.json**（调试配置）

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C++ Debug",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "gdb",
            "miDebuggerPath": "gdb.exe",
            "preLaunchTask": "Compile"
        }
    ]
}
```

#### 使用方法

1. 创建 `.cpp` 文件
2. 编写代码
3. 按 `Ctrl + Shift + B` 编译
4. 按 `F5` 运行调试

### 方案三：CLion（专业开发）

CLion 是 JetBrains 出品的专业 C++ IDE。

#### 特点

- 智能代码补全
- 强大的调试功能
- 内置版本控制
- 需要付费（学生可免费）

#### 安装

1. 访问 [CLion 官网](https://www.jetbrains.com/clion/)
2. 下载并安装
3. 申请学生免费许可证

## macOS 系统

### 安装 Xcode Command Line Tools

```bash
xcode-select --install
```

### 使用 VS Code

配置方法与 Windows 类似，但编译命令需要调整：

```json
{
    "command": "g++",
    "args": [
        "-std=c++17",
        "-O2",
        "-Wall",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}"
    ]
}
```

## Linux 系统

### 安装 GCC

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install build-essential gdb
```

**Fedora:**

```bash
sudo dnf install gcc-c++ gdb
```

### 使用 VS Code

配置方法与 macOS 相同。

## 在线编译器（临时方案）

如果暂时无法配置本地环境，可以使用在线编译器：

- [洛谷 IDE](https://www.luogu.com.cn/ide)
- [C++ Shell](http://cpp.sh/)
- [OnlineGDB](https://www.onlinegdb.com/online_c++_compiler)
- [Compiler Explorer](https://godbolt.org/)

## 编译器选项说明

### 常用编译选项

```bash
g++ -std=c++17 -O2 -Wall -Wextra source.cpp -o output
```

- `-std=c++17`：使用 C++17 标准
- `-O2`：开启 O2 优化（竞赛常用）
- `-Wall`：显示所有警告
- `-Wextra`：显示额外警告
- `-o output`：指定输出文件名

### 调试选项

```bash
g++ -std=c++17 -g -Wall source.cpp -o output
```

- `-g`：生成调试信息

## 测试环境

创建测试文件 `test.cpp`：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};
    sort(nums.begin(), nums.end());
    
    cout << "排序后的数组: ";
    for (int x : nums) {
        cout << x << " ";
    }
    cout << endl;
    
    return 0;
}
```

编译运行：

```bash
g++ -std=c++17 -O2 test.cpp -o test
./test  # Linux/macOS
test.exe  # Windows
```

预期输出：

```
排序后的数组: 1 1 2 3 4 5 6 9
```

## 常见问题

### Q: 编译时出现 "g++ 不是内部或外部命令"

**A:** 说明 g++ 没有添加到系统环境变量。需要将 MinGW 的 bin 目录添加到 PATH。

### Q: 中文输出乱码

**A:** 在代码开头添加：

```cpp
#include <windows.h>
SetConsoleOutputCP(65001);  // 设置控制台为 UTF-8
```

或者在编译时指定：

```bash
g++ -fexec-charset=GBK source.cpp -o output
```

### Q: 如何使用文件输入输出？

**A:** 使用重定向：

```cpp
freopen("input.txt", "r", stdin);
freopen("output.txt", "w", stdout);
```

## 下一步

- [编写第一个程序](/guide/first-program)
- [了解在线评测系统](/guide/online-judge)
- [学习 C++ 基础语法](/language/syntax/variables)

## 推荐配置

| 阶段 | 推荐工具 | 理由 |
|------|---------|------|
| 入门 | Dev-C++ | 简单易用，开箱即用 |
| 提高 | VS Code | 轻量灵活，插件丰富 |
| 进阶 | CLion | 专业强大，智能补全 |
