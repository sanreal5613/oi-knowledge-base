# vector 动态数组

<DifficultyBadge level="easy" />

## 什么是 vector？

`vector` 是 C++ STL 中的**动态数组**，可以自动调整大小。

```cpp
#include <vector>
using namespace std;

vector<int> v;  // 创建一个空的 int 型 vector
```

## 基本操作

### 创建和初始化

```cpp
vector<int> v1;              // 空 vector
vector<int> v2(10);          // 10 个元素，默认值为 0
vector<int> v3(10, 5);       // 10 个元素，值都是 5
vector<int> v4 = {1, 2, 3};  // 初始化列表
vector<int> v5(v4);          // 复制 v4
```

### 添加元素

```cpp
vector<int> v;

v.push_back(1);   // 末尾添加元素
v.push_back(2);
v.push_back(3);
// v = {1, 2, 3}

v.insert(v.begin() + 1, 10);  // 在位置 1 插入 10
// v = {1, 10, 2, 3}
```

### 访问元素

```cpp
vector<int> v = {1, 2, 3, 4, 5};

cout << v[0] << endl;      // 1（不检查越界）
cout << v.at(0) << endl;   // 1（检查越界）

cout << v.front() << endl; // 1（第一个元素）
cout << v.back() << endl;  // 5（最后一个元素）
```

### 删除元素

```cpp
vector<int> v = {1, 2, 3, 4, 5};

v.pop_back();  // 删除最后一个元素
// v = {1, 2, 3, 4}

v.erase(v.begin() + 1);  // 删除位置 1 的元素
// v = {1, 3, 4}

v.erase(v.begin(), v.begin() + 2);  // 删除 [0, 2) 范围
// v = {4}

v.clear();  // 清空所有元素
```

### 大小和容量

```cpp
vector<int> v = {1, 2, 3};

cout << v.size() << endl;      // 3（元素个数）
cout << v.empty() << endl;     // 0（是否为空）
cout << v.capacity() << endl;  // 容量（可能大于 size）

v.resize(5);       // 调整大小为 5
v.resize(10, 0);   // 调整大小为 10，新元素值为 0
v.shrink_to_fit(); // 释放多余容量
```

## 遍历 vector

### 方法 1：下标访问

```cpp
vector<int> v = {1, 2, 3, 4, 5};

for (int i = 0; i < v.size(); i++) {
    cout << v[i] << " ";
}
cout << endl;
```

### 方法 2：迭代器

```cpp
for (vector<int>::iterator it = v.begin(); it != v.end(); it++) {
    cout << *it << " ";
}
cout << endl;
```

### 方法 3：范围 for（推荐）

```cpp
for (int x : v) {
    cout << x << " ";
}
cout << endl;

// 修改元素需要引用
for (int& x : v) {
    x *= 2;
}
```

## 常用算法

### 排序

```cpp
#include <algorithm>

vector<int> v = {3, 1, 4, 1, 5};

sort(v.begin(), v.end());  // 升序
// v = {1, 1, 3, 4, 5}

sort(v.begin(), v.end(), greater<int>());  // 降序
// v = {5, 4, 3, 1, 1}
```

### 查找

```cpp
vector<int> v = {1, 2, 3, 4, 5};

// 查找元素
auto it = find(v.begin(), v.end(), 3);
if (it != v.end()) {
    cout << "找到了，位置: " << (it - v.begin()) << endl;
}

// 二分查找（需要有序）
bool found = binary_search(v.begin(), v.end(), 3);
```

### 反转

```cpp
vector<int> v = {1, 2, 3, 4, 5};
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}
```

### 去重

```cpp
vector<int> v = {1, 2, 2, 3, 3, 3, 4};

sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
// v = {1, 2, 3, 4}
```

### 求和、最大最小值

```cpp
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};

int sum = accumulate(v.begin(), v.end(), 0);  // 15

int max_val = *max_element(v.begin(), v.end());  // 5
int min_val = *min_element(v.begin(), v.end());  // 1
```

## 二维 vector

```cpp
// 创建 n×m 的二维 vector
int n = 3, m = 4;
vector<vector<int>> v(n, vector<int>(m, 0));

// 访问元素
v[0][0] = 1;
v[1][2] = 5;

// 遍历
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        cout << v[i][j] << " ";
    }
    cout << endl;
}
```

## vector vs 数组

| 特点 | vector | 数组 |
|------|--------|------|
| 大小 | 动态 | 固定 |
| 越界检查 | at() 检查 | 不检查 |
| 传参 | 方便 | 需要传大小 |
| 性能 | 略慢 | 快 |
| STL 算法 | 支持 | 需要指针 |

## 常见错误

### 1. 下标越界

```cpp
vector<int> v(5);
v[10] = 1;  // 错误！越界
```

### 2. 迭代器失效

```cpp
vector<int> v = {1, 2, 3};
for (auto it = v.begin(); it != v.end(); it++) {
    v.push_back(4);  // 错误！迭代器可能失效
}
```

### 3. size() 返回无符号数

```cpp
vector<int> v;
for (int i = 0; i < v.size() - 1; i++) {  // 错误！size() 为 0 时溢出
    // ...
}

// 正确写法
for (int i = 0; i + 1 < v.size(); i++) {
    // ...
}
```

## 竞赛技巧

### 1. 快速输入

```cpp
int n;
cin >> n;
vector<int> v(n);
for (int& x : v) {
    cin >> x;
}
```

### 2. 二维 vector 作为邻接表

```cpp
int n, m;
cin >> n >> m;

vector<vector<int>> graph(n + 1);

for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    graph[u].push_back(v);
    graph[v].push_back(u);
}
```

### 3. 使用 emplace_back（C++11）

```cpp
vector<pair<int, int>> v;

v.push_back(make_pair(1, 2));  // 传统方法
v.emplace_back(1, 2);          // 更高效
```

## 练习题

1. 使用 vector 存储 n 个数，输出其中的最大值和最小值
2. 使用 vector 实现动态数组的插入和删除
3. 使用二维 vector 存储矩阵并进行转置

<details>
<summary>练习 1 答案</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<int> v(n);
    for (int& x : v) {
        cin >> x;
    }
    
    int max_val = *max_element(v.begin(), v.end());
    int min_val = *min_element(v.begin(), v.end());
    
    cout << "最大值: " << max_val << endl;
    cout << "最小值: " << min_val << endl;
    
    return 0;
}
```

</details>

## 总结

- vector 是动态数组，可以自动调整大小
- 常用操作：push_back、pop_back、size、clear
- 支持 STL 算法：sort、find、reverse 等
- 可以创建多维 vector
- 注意迭代器失效和下标越界
