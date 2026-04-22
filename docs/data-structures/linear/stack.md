# 栈的应用

<DifficultyBadge level="easy" />

## 什么是栈？

栈（Stack）是一种**后进先出**（LIFO, Last In First Out）的线性数据结构。

```
入栈：1 → 2 → 3

栈顶
  3    ← 最后入栈，最先出栈
  2
  1
栈底
```

## 栈的基本操作

| 操作 | 说明 | 时间复杂度 |
|------|------|-----------|
| push | 入栈 | O(1) |
| pop | 出栈 | O(1) |
| top | 查看栈顶 | O(1) |
| empty | 判断是否为空 | O(1) |
| size | 获取大小 | O(1) |

## C++ 栈的实现

### 使用 STL stack

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    
    // 入栈
    st.push(1);
    st.push(2);
    st.push(3);
    
    // 查看栈顶
    cout << st.top() << endl;  // 3
    
    // 出栈
    st.pop();
    cout << st.top() << endl;  // 2
    
    // 判断空
    if (!st.empty()) {
        cout << "栈不为空" << endl;
    }
    
    // 大小
    cout << st.size() << endl;  // 2
    
    return 0;
}
```

### 数组模拟栈

```cpp
const int MAXN = 100005;
int stack[MAXN];
int top = -1;  // 栈顶指针

// 入栈
void push(int x) {
    stack[++top] = x;
}

// 出栈
void pop() {
    if (top >= 0) top--;
}

// 查看栈顶
int getTop() {
    return stack[top];
}

// 判断是否为空
bool empty() {
    return top == -1;
}
```

## 经典应用

### 1. 括号匹配

```cpp
bool isValid(string s) {
    stack<char> st;
    
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
            st.pop();
        }
    }
    
    return st.empty();
}
```

### 2. 表达式求值

```cpp
// 中缀表达式转后缀表达式（逆波兰表达式）
int evaluate(string s) {
    stack<int> nums;
    stack<char> ops;
    
    // 简化版：假设表达式已经是后缀表达式
    // 如："3 4 + 2 *"
    
    for (int i = 0; i < s.size(); i++) {
        if (isdigit(s[i])) {
            int num = 0;
            while (i < s.size() && isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
                i++;
            }
            nums.push(num);
            i--;
        } else if (s[i] == ' ') {
            continue;
        } else {
            int b = nums.top(); nums.pop();
            int a = nums.top(); nums.pop();
            
            if (s[i] == '+') nums.push(a + b);
            else if (s[i] == '-') nums.push(a - b);
            else if (s[i] == '*') nums.push(a * b);
            else if (s[i] == '/') nums.push(a / b);
        }
    }
    
    return nums.top();
}
```

### 3. 浏览器前进后退

```cpp
class BrowserHistory {
    stack<string> backStack;    // 后退栈
    stack<string> forwardStack; // 前进栈
    string current;
    
public:
    BrowserHistory(string homepage) {
        current = homepage;
    }
    
    void visit(string url) {
        backStack.push(current);
        current = url;
        // 清空前进栈
        while (!forwardStack.empty()) {
            forwardStack.pop();
        }
    }
    
    string back() {
        if (backStack.empty()) return current;
        forwardStack.push(current);
        current = backStack.top();
        backStack.pop();
        return current;
    }
    
    string forward() {
        if (forwardStack.empty()) return current;
        backStack.push(current);
        current = forwardStack.top();
        forwardStack.pop();
        return current;
    }
};
```

### 4. 递归转非递归

```cpp
// 递归版
void dfsRecursive(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfsRecursive(v);
        }
    }
}

// 栈实现非递归版
void dfsIterative(int start) {
    stack<int> st;
    st.push(start);
    
    while (!st.empty()) {
        int u = st.top();
        st.pop();
        
        if (visited[u]) continue;
        visited[u] = true;
        
        for (int i = adj[u].size() - 1; i >= 0; i--) {
            int v = adj[u][i];
            if (!visited[v]) {
                st.push(v);
            }
        }
    }
}
```

## 练习题

1. [LeetCode 20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
2. [LeetCode 155. 最小栈](https://leetcode.cn/problems/min-stack/)
3. [LeetCode 150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)
4. [洛谷 P1449 后缀表达式](https://www.luogu.com.cn/problem/P1449)

## 总结

- 栈是后进先出（LIFO）的数据结构
- 基本操作：push、pop、top 都是 O(1)
- 经典应用：括号匹配、表达式求值、递归模拟
- 竞赛中可用 STL stack 或数组模拟
