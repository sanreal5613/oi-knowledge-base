# stack 栈

<DifficultyBadge level="easy" />

## 什么是栈？

栈（Stack）是一种**后进先出**（LIFO - Last In First Out）的数据结构。

```
想象一摞盘子：
- 只能从顶部放入盘子（push）
- 只能从顶部取出盘子（pop）
- 最后放入的盘子最先被取出
```

```cpp
#include <stack>
using namespace std;

stack<int> st;
```

## 基本操作

```cpp
stack<int> st;

// 入栈
st.push(1);
st.push(2);
st.push(3);
// 栈：底 [1, 2, 3] 顶

// 访问栈顶
cout << st.top() << endl;  // 3

// 出栈
st.pop();  // 移除 3
// 栈：底 [1, 2] 顶

// 大小
cout << st.size() << endl;  // 2

// 是否为空
cout << st.empty() << endl;  // 0（false）
```

::: warning 注意
- `pop()` 不返回值，只删除栈顶元素
- 访问栈顶用 `top()`
- 空栈调用 `top()` 或 `pop()` 会出错
:::

## 遍历栈

栈不支持直接遍历，需要边弹出边访问：

```cpp
stack<int> st;
st.push(1);
st.push(2);
st.push(3);

// 遍历（会清空栈）
while (!st.empty()) {
    cout << st.top() << " ";
    st.pop();
}
// 输出：3 2 1
```

## 应用场景

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
            if ((c == ')' && top == '(') ||
                (c == ']' && top == '[') ||
                (c == '}' && top == '{')) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    
    return st.empty();
}

// isValid("()[]{}") → true
// isValid("([)]") → false
```

### 2. 表达式求值

**后缀表达式**（逆波兰表达式）：

```cpp
int evalRPN(vector<string>& tokens) {
    stack<int> st;
    
    for (string& token : tokens) {
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            
            if (token == "+") st.push(a + b);
            else if (token == "-") st.push(a - b);
            else if (token == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoi(token));
        }
    }
    
    return st.top();
}

// ["2", "1", "+", "3", "*"] → ((2 + 1) * 3) = 9
```

### 3. 函数调用栈

```cpp
void func3() { cout << "func3" << endl; }
void func2() { func3(); cout << "func2" << endl; }
void func1() { func2(); cout << "func1" << endl; }

// 调用 func1()
// 栈的变化：
// [] → [func1] → [func1, func2] → [func1, func2, func3]
// → [func1, func2] → [func1] → []
```

### 4. 浏览器前进后退

```cpp
class Browser {
    stack<string> backStack;
    stack<string> forwardStack;
    string current;
    
public:
    void visit(string url) {
        backStack.push(current);
        current = url;
        while (!forwardStack.empty()) {
            forwardStack.pop();  // 清空前进栈
        }
    }
    
    void back() {
        if (!backStack.empty()) {
            forwardStack.push(current);
            current = backStack.top();
            backStack.pop();
        }
    }
    
    void forward() {
        if (!forwardStack.empty()) {
            backStack.push(current);
            current = forwardStack.top();
            forwardStack.pop();
        }
    }
};
```

### 5. 单调栈

找每个元素右边第一个比它大的元素：

```cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // 存储下标
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}

// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]
```

## 手动实现栈

```cpp
class Stack {
    int arr[1000];
    int topIndex;
    
public:
    Stack() : topIndex(-1) {}
    
    void push(int x) {
        arr[++topIndex] = x;
    }
    
    void pop() {
        if (!empty()) {
            topIndex--;
        }
    }
    
    int top() {
        return arr[topIndex];
    }
    
    bool empty() {
        return topIndex == -1;
    }
    
    int size() {
        return topIndex + 1;
    }
};
```

## 练习题

1. [洛谷 P1449 后缀表达式](https://www.luogu.com.cn/problem/P1449)
2. [LeetCode 20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
3. [LeetCode 150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)
4. [LeetCode 739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)（单调栈）

## 总结

- 栈是后进先出（LIFO）的数据结构
- 主要操作：push、pop、top、empty、size
- 应用：括号匹配、表达式求值、函数调用、单调栈
- 空栈不能 pop 或 top
