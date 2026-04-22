# algorithm 算法库

<DifficultyBadge level="easy" />

## 简介

C++ STL 的 `<algorithm>` 头文件提供了大量常用算法，熟练使用可以大幅提升编程效率。

```cpp
#include <algorithm>
using namespace std;
```

## 排序相关

### sort 排序

```cpp
int arr[] = {3, 1, 4, 1, 5, 9, 2, 6};
int n = 8;

sort(arr, arr + n);                          // 升序
sort(arr, arr + n, greater<int>());          // 降序
sort(arr, arr + n, [](int a, int b) {        // 自定义
    return a > b;
});

vector<int> v = {3, 1, 4};
sort(v.begin(), v.end());
```

### stable_sort 稳定排序

```cpp
stable_sort(arr, arr + n);  // 相等元素保持原顺序
```

### partial_sort 部分排序

```cpp
// 只排序前 k 个最小元素
partial_sort(arr, arr + 3, arr + n);
```

### nth_element 第 K 小

```cpp
// 找第 k 小的元素（下标 k-1），左边都 <= 它，右边都 >= 它
nth_element(arr, arr + k - 1, arr + n);
cout << arr[k - 1] << endl;
```

## 查找相关

### find 查找

```cpp
vector<int> v = {1, 2, 3, 4, 5};

auto it = find(v.begin(), v.end(), 3);
if (it != v.end()) {
    cout << "找到，位置: " << (it - v.begin()) << endl;
}
```

### binary_search 二分查找

```cpp
vector<int> v = {1, 2, 3, 4, 5};  // 必须有序

bool found = binary_search(v.begin(), v.end(), 3);  // true
```

### lower_bound / upper_bound

```cpp
vector<int> v = {1, 2, 2, 3, 4, 5};

// 第一个 >= 2 的位置
auto it1 = lower_bound(v.begin(), v.end(), 2);
cout << (it1 - v.begin()) << endl;  // 1

// 第一个 > 2 的位置
auto it2 = upper_bound(v.begin(), v.end(), 2);
cout << (it2 - v.begin()) << endl;  // 3

// 统计值为 2 的个数
int count = upper_bound(v.begin(), v.end(), 2) - lower_bound(v.begin(), v.end(), 2);
cout << count << endl;  // 2
```

### count / count_if

```cpp
vector<int> v = {1, 2, 2, 3, 2, 4};

int cnt = count(v.begin(), v.end(), 2);  // 3

int even = count_if(v.begin(), v.end(), [](int x) {
    return x % 2 == 0;
});  // 4
```

## 最大最小值

```cpp
vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

int max_val = *max_element(v.begin(), v.end());  // 9
int min_val = *min_element(v.begin(), v.end());  // 1

auto [min_it, max_it] = minmax_element(v.begin(), v.end());

int bigger = max(3, 5);   // 5
int smaller = min(3, 5);  // 3
```

## 修改操作

### fill 填充

```cpp
vector<int> v(10);
fill(v.begin(), v.end(), 0);    // 全部填 0
fill(v.begin(), v.begin() + 5, 1);  // 前 5 个填 1
```

### copy 复制

```cpp
vector<int> src = {1, 2, 3, 4, 5};
vector<int> dst(5);

copy(src.begin(), src.end(), dst.begin());
```

### reverse 反转

```cpp
vector<int> v = {1, 2, 3, 4, 5};
reverse(v.begin(), v.end());
// v = {5, 4, 3, 2, 1}

string s = "hello";
reverse(s.begin(), s.end());
// s = "olleh"
```

### rotate 旋转

```cpp
vector<int> v = {1, 2, 3, 4, 5};
rotate(v.begin(), v.begin() + 2, v.end());
// v = {3, 4, 5, 1, 2}（向左旋转 2 位）
```

### unique 去重

```cpp
vector<int> v = {1, 2, 2, 3, 3, 3, 4};
sort(v.begin(), v.end());

auto it = unique(v.begin(), v.end());
v.erase(it, v.end());
// v = {1, 2, 3, 4}
```

### replace 替换

```cpp
vector<int> v = {1, 2, 3, 2, 1};
replace(v.begin(), v.end(), 2, 10);
// v = {1, 10, 3, 10, 1}
```

## 排列相关

### next_permutation 下一个排列

```cpp
vector<int> v = {1, 2, 3};

do {
    for (int x : v) cout << x << " ";
    cout << endl;
} while (next_permutation(v.begin(), v.end()));
// 输出所有排列（按字典序）
```

### prev_permutation 上一个排列

```cpp
vector<int> v = {3, 2, 1};

do {
    for (int x : v) cout << x << " ";
    cout << endl;
} while (prev_permutation(v.begin(), v.end()));
```

## 数值算法

```cpp
#include <numeric>

vector<int> v = {1, 2, 3, 4, 5};

// 求和
int sum = accumulate(v.begin(), v.end(), 0);  // 15

// 前缀和
vector<int> prefix(6, 0);
partial_sum(v.begin(), v.end(), prefix.begin() + 1);
// prefix = {0, 1, 3, 6, 10, 15}

// 最大公约数（C++17）
int g = gcd(12, 18);  // 6
int l = lcm(4, 6);    // 12
```

## 集合操作

```cpp
vector<int> a = {1, 2, 3, 4, 5};
vector<int> b = {3, 4, 5, 6, 7};
vector<int> result;

// 交集
set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                 back_inserter(result));
// result = {3, 4, 5}

result.clear();

// 并集
set_union(a.begin(), a.end(), b.begin(), b.end(),
          back_inserter(result));
// result = {1, 2, 3, 4, 5, 6, 7}

result.clear();

// 差集
set_difference(a.begin(), a.end(), b.begin(), b.end(),
               back_inserter(result));
// result = {1, 2}
```

## 竞赛常用技巧

```cpp
// 离散化
vector<int> v = {100, 200, 50, 300, 50};
vector<int> sorted_v = v;
sort(sorted_v.begin(), sorted_v.end());
sorted_v.erase(unique(sorted_v.begin(), sorted_v.end()), sorted_v.end());

for (int& x : v) {
    x = lower_bound(sorted_v.begin(), sorted_v.end(), x) - sorted_v.begin();
}
// v = {1, 2, 0, 3, 0}（0-indexed）

// 去重计数
int unique_count = sorted_v.size();
```

## 练习题

1. 使用 `next_permutation` 枚举所有排列
2. 使用 `lower_bound` 统计数组中某个值的出现次数
3. 使用 `accumulate` 计算数组的乘积

<details>
<summary>练习 3 答案</summary>

```cpp
#include <numeric>
vector<int> v = {1, 2, 3, 4, 5};
long long product = accumulate(v.begin(), v.end(), 1LL, multiplies<long long>());
cout << product << endl;  // 120
```

</details>

## 总结

- `sort`：排序，O(n log n)
- `binary_search` / `lower_bound` / `upper_bound`：二分查找
- `find` / `count`：线性查找和计数
- `reverse` / `rotate` / `unique`：数组变换
- `next_permutation`：枚举排列
- `accumulate`：求和/乘积
- `max_element` / `min_element`：最大最小值
