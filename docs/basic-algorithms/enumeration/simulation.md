# 模拟算法

<DifficultyBadge level="easy" />

## 什么是模拟？

模拟算法就是**按照题目描述的规则，一步一步地执行操作**，直接模拟问题的过程。

### 模拟的特点

- ✅ 思路直接，按题意实现
- ✅ 不需要复杂的算法思想
- ❌ 代码量可能较大
- ❌ 需要细心处理各种边界情况

## 经典例题

### 例题 1：日期计算

**问题**：给定一个日期，计算这一天是这一年的第几天。

```cpp
#include <iostream>
using namespace std;

bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int dayOfYear(int year, int month, int day) {
    int days[] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    
    if (isLeapYear(year)) {
        days[2] = 29;
    }
    
    int total = 0;
    for (int i = 1; i < month; i++) {
        total += days[i];
    }
    total += day;
    
    return total;
}

int main() {
    int year, month, day;
    cin >> year >> month >> day;
    
    cout << dayOfYear(year, month, day) << endl;
    
    return 0;
}
```

### 例题 2：蛇形矩阵

**问题**：生成 n×n 的蛇形矩阵。

```
1  2  3  4
8  7  6  5
9  10 11 12
16 15 14 13
```

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    int arr[100][100];
    int num = 1;
    
    for (int i = 0; i < n; i++) {
        if (i % 2 == 0) {
            // 偶数行从左到右
            for (int j = 0; j < n; j++) {
                arr[i][j] = num++;
            }
        } else {
            // 奇数行从右到左
            for (int j = n - 1; j >= 0; j--) {
                arr[i][j] = num++;
            }
        }
    }
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << arr[i][j];
            if (j < n - 1) cout << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```

### 例题 3：模拟走迷宫

**问题**：给定迷宫和指令序列（UDLR），模拟移动过程。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    char maze[100][100];
    for (int i = 0; i < n; i++) {
        cin >> maze[i];
    }
    
    int sx, sy;  // 起始位置
    cin >> sx >> sy;
    
    string commands;
    cin >> commands;
    
    int dx[] = {-1, 1, 0, 0};  // U D L R
    int dy[] = {0, 0, -1, 1};
    string dirs = "UDLR";
    
    int x = sx, y = sy;
    
    for (char c : commands) {
        int d = dirs.find(c);
        int nx = x + dx[d];
        int ny = y + dy[d];
        
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && maze[nx][ny] != '#') {
            x = nx;
            y = ny;
        }
    }
    
    cout << x << " " << y << endl;
    
    return 0;
}
```

### 例题 4：约瑟夫问题

**问题**：n 个人围成一圈，从第 1 个人开始报数，每报到 m 就淘汰，求最后剩下的人。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    
    vector<int> people;
    for (int i = 1; i <= n; i++) {
        people.push_back(i);
    }
    
    int current = 0;
    
    while (people.size() > 1) {
        current = (current + m - 1) % people.size();
        people.erase(people.begin() + current);
        if (current == people.size()) {
            current = 0;
        }
    }
    
    cout << people[0] << endl;
    
    return 0;
}
```

### 例题 5：模拟栈

**问题**：实现一个栈，支持 push、pop、top 操作。

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    int q;
    cin >> q;
    
    stack<int> st;
    
    while (q--) {
        string op;
        cin >> op;
        
        if (op == "push") {
            int x;
            cin >> x;
            st.push(x);
        } else if (op == "pop") {
            if (!st.empty()) {
                st.pop();
            }
        } else if (op == "top") {
            if (!st.empty()) {
                cout << st.top() << endl;
            }
        } else if (op == "empty") {
            cout << (st.empty() ? "YES" : "NO") << endl;
        }
    }
    
    return 0;
}
```

## 模拟技巧

### 1. 方向数组

```cpp
// 四个方向
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};
string dir[] = {"右", "左", "下", "上"};

// 八个方向
int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};
```

### 2. 边界检查

```cpp
bool inBounds(int x, int y, int n, int m) {
    return x >= 0 && x < n && y >= 0 && y < m;
}
```

### 3. 循环处理

```cpp
// 循环数组
int next = (current + 1) % n;
int prev = (current - 1 + n) % n;
```

### 4. 字符串处理

```cpp
// 按空格分割
stringstream ss(line);
string token;
while (ss >> token) {
    // 处理每个单词
}
```

## 常见模拟题型

1. **矩阵操作**：旋转、翻转、螺旋填充
2. **日期时间**：计算天数、星期几
3. **字符串处理**：格式转换、模式匹配
4. **游戏模拟**：棋盘游戏、迷宫
5. **数学运算**：高精度计算、进制转换

## 练习题

1. [洛谷 P1003 铺地毯](https://www.luogu.com.cn/problem/P1003)
2. [洛谷 P1067 多项式输出](https://www.luogu.com.cn/problem/P1067)
3. [洛谷 P1328 生活大爆炸版石头剪刀布](https://www.luogu.com.cn/problem/P1328)
4. [洛谷 P1563 玩具谜题](https://www.luogu.com.cn/problem/P1563)

## 总结

- 模拟算法直接按题意实现
- 关键是细心处理边界条件
- 方向数组是常用技巧
- 代码要清晰，分函数实现
- 多用 STL 简化代码
