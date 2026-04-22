# 字符数组与字符串

<DifficultyBadge level="easy" />

## 字符数组

字符数组是存储字符的数组，以 `'\0'`（空字符）结尾。

```cpp
char str[10] = "Hello";
// 实际存储：H e l l o \0 _ _ _ _

char str2[] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

### 输入输出

```cpp
char str[100];

// 输入（不含空格）
cin >> str;

// 输入整行（含空格）
cin.getline(str, 100);

// 输出
cout << str << endl;
printf("%s\n", str);
```

## string 类

C++ 的 `string` 类更方便，推荐使用：

```cpp
#include <string>
using namespace std;

string s = "Hello, World!";
```

### 基本操作

```cpp
string s = "Hello";

// 长度
cout << s.length() << endl;  // 5
cout << s.size() << endl;    // 5（同上）

// 访问字符
cout << s[0] << endl;   // H
cout << s.at(1) << endl;  // e

// 拼接
string s2 = s + " World";
s += " World";  // s = "Hello World"

// 比较（字典序）
string a = "abc", b = "abd";
if (a < b) cout << "a < b" << endl;
```

### 子串操作

```cpp
string s = "Hello, World!";

// 截取子串 substr(起始位置, 长度)
string sub = s.substr(7, 5);  // "World"

// 查找
int pos = s.find("World");  // 7
if (pos != string::npos) {
    cout << "找到了，位置：" << pos << endl;
}

// 查找字符
int pos2 = s.find('o');  // 4（第一个 o 的位置）

// 从后往前查找
int pos3 = s.rfind('o');  // 8（最后一个 o 的位置）
```

### 修改操作

```cpp
string s = "Hello, World!";

// 替换 replace(起始位置, 长度, 新字符串)
s.replace(7, 5, "OI");  // "Hello, OI!"

// 插入 insert(位置, 字符串)
s.insert(5, " Beautiful");  // "Hello Beautiful, OI!"

// 删除 erase(起始位置, 长度)
s.erase(5, 10);  // "Hello, OI!"

// 清空
s.clear();
cout << s.empty() << endl;  // 1（true）
```

### 输入输出

```cpp
string s;

// 输入（到空格为止）
cin >> s;

// 输入整行
getline(cin, s);

// 注意：cin >> 后使用 getline 需要先清除换行符
int n;
cin >> n;
cin.ignore();  // 清除换行符
getline(cin, s);
```

## 字符串与数字转换

```cpp
#include <string>
#include <sstream>

// 数字转字符串
int n = 42;
string s = to_string(n);  // "42"

// 字符串转数字
string str = "123";
int num = stoi(str);       // 123
long long ll = stoll(str); // 123
double d = stod("3.14");   // 3.14
```

## 常用字符函数

```cpp
#include <cctype>

char c = 'A';

isalpha(c);   // 是否是字母
isdigit(c);   // 是否是数字
isalnum(c);   // 是否是字母或数字
isupper(c);   // 是否是大写字母
islower(c);   // 是否是小写字母
isspace(c);   // 是否是空白字符

toupper(c);   // 转大写
tolower(c);   // 转小写
```

## 字符串算法

### 1. 反转字符串

```cpp
#include <algorithm>

string s = "Hello";
reverse(s.begin(), s.end());  // "olleH"
```

### 2. 排序字符串

```cpp
string s = "dcba";
sort(s.begin(), s.end());  // "abcd"
```

### 3. 统计字符出现次数

```cpp
string s = "hello world";
int count[256] = {0};

for (char c : s) {
    count[(int)c]++;
}

cout << "l 出现了 " << count['l'] << " 次" << endl;
```

### 4. 判断回文

```cpp
bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

### 5. 字符串分割

```cpp
#include <sstream>

string s = "a,b,c,d";
string token;
vector<string> tokens;
stringstream ss(s);

while (getline(ss, token, ',')) {
    tokens.push_back(token);
}
// tokens = {"a", "b", "c", "d"}
```

## 竞赛技巧

### 1. 字符与数字互转

```cpp
char c = '5';
int n = c - '0';  // 5

int n = 7;
char c = '0' + n;  // '7'

// 字母转数字（a=0, b=1, ...）
char c = 'c';
int n = c - 'a';  // 2
```

### 2. 大小写转换

```cpp
char c = 'a';
char upper = c - 32;     // 'A'（不推荐）
char upper2 = toupper(c); // 'A'（推荐）

// 大小写互转
c ^= 32;  // 位运算技巧
```

### 3. 字符串哈希

```cpp
long long hashStr(string s) {
    long long hash = 0;
    long long base = 31;
    long long mod = 1e9 + 7;
    
    for (char c : s) {
        hash = (hash * base + (c - 'a' + 1)) % mod;
    }
    
    return hash;
}
```

## 练习题

### 练习 1：统计单词数

输入一行字符串，统计其中单词的个数（单词之间用空格分隔）。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main() {
    string line, word;
    getline(cin, line);
    
    stringstream ss(line);
    int count = 0;
    
    while (ss >> word) {
        count++;
    }
    
    cout << count << endl;
    return 0;
}
```

</details>

### 练习 2：字符串压缩

将连续相同字符压缩（如 "aaabbc" → "a3b2c1"）。

<details>
<summary>查看答案</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    string result = "";
    int i = 0;
    
    while (i < s.length()) {
        char c = s[i];
        int count = 0;
        
        while (i < s.length() && s[i] == c) {
            count++;
            i++;
        }
        
        result += c;
        result += to_string(count);
    }
    
    cout << result << endl;
    return 0;
}
```

</details>

## 总结

- `string` 类比字符数组更方便
- 常用操作：`length()`、`substr()`、`find()`、`replace()`
- `getline()` 读取含空格的字符串
- 字符与数字互转：`c - '0'`、`'0' + n`
- `reverse()`、`sort()` 可直接用于 string
