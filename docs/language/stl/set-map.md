# set / map 集合与映射

<DifficultyBadge level="easy" />

## set 集合

`set` 是一个**有序**的、**不重复**的元素集合。

```cpp
#include <set>
using namespace std;

set<int> s;
```

### 基本操作

```cpp
set<int> s;

// 插入
s.insert(3);
s.insert(1);
s.insert(4);
s.insert(1);  // 重复，不会插入
// s = {1, 3, 4}（自动排序）

// 查找
if (s.count(3)) {
    cout << "3 在集合中" << endl;
}

auto it = s.find(3);
if (it != s.end()) {
    cout << "找到了: " << *it << endl;
}

// 删除
s.erase(3);
// s = {1, 4}

s.erase(s.begin());  // 删除最小元素
// s = {4}

// 大小
cout << s.size() << endl;   // 1
cout << s.empty() << endl;  // 0

// 清空
s.clear();
```

### 遍历

```cpp
set<int> s = {3, 1, 4, 1, 5, 9, 2, 6};

// 升序遍历
for (int x : s) {
    cout << x << " ";
}
// 输出：1 2 3 4 5 6 9

// 降序遍历
for (auto it = s.rbegin(); it != s.rend(); it++) {
    cout << *it << " ";
}
// 输出：9 6 5 4 3 2 1
```

### 常用操作

```cpp
set<int> s = {1, 2, 3, 4, 5};

// 下界：第一个 >= x 的元素
auto it1 = s.lower_bound(3);  // 指向 3
cout << *it1 << endl;  // 3

// 上界：第一个 > x 的元素
auto it2 = s.upper_bound(3);  // 指向 4
cout << *it2 << endl;  // 4

// 最小值和最大值
cout << *s.begin() << endl;  // 1
cout << *s.rbegin() << endl; // 5
```

## multiset 多重集合

允许重复元素：

```cpp
#include <set>

multiset<int> ms;

ms.insert(1);
ms.insert(1);
ms.insert(2);
// ms = {1, 1, 2}

// 删除所有值为 1 的元素
ms.erase(1);
// ms = {2}

// 只删除一个值为 1 的元素
auto it = ms.find(1);
if (it != ms.end()) {
    ms.erase(it);
}
```

## map 映射

`map` 是键值对的有序集合，键不重复。

```cpp
#include <map>

map<string, int> m;
```

### 基本操作

```cpp
map<string, int> m;

// 插入
m["apple"] = 5;
m["banana"] = 3;
m.insert({"cherry", 8});
m.insert(make_pair("date", 2));

// 访问
cout << m["apple"] << endl;  // 5
cout << m.at("banana") << endl;  // 3

// 查找
if (m.count("apple")) {
    cout << "apple 存在" << endl;
}

auto it = m.find("apple");
if (it != m.end()) {
    cout << it->first << ": " << it->second << endl;
}

// 删除
m.erase("apple");

// 大小
cout << m.size() << endl;
```

### 遍历

```cpp
map<string, int> m = {{"apple", 5}, {"banana", 3}, {"cherry", 8}};

// 按键升序遍历
for (auto& [key, value] : m) {
    cout << key << ": " << value << endl;
}

// 传统方式
for (auto it = m.begin(); it != m.end(); it++) {
    cout << it->first << ": " << it->second << endl;
}
```

### 常用操作

```cpp
map<string, int> m = {{"a", 1}, {"b", 2}, {"c", 3}};

// 下界和上界
auto it1 = m.lower_bound("b");  // 指向 "b"
auto it2 = m.upper_bound("b");  // 指向 "c"

// 统计单词频率
string word;
map<string, int> freq;
while (cin >> word) {
    freq[word]++;  // 不存在时自动初始化为 0
}
```

## multimap 多重映射

允许键重复：

```cpp
#include <map>

multimap<string, int> mm;

mm.insert({"a", 1});
mm.insert({"a", 2});
mm.insert({"b", 3});

// 查找所有键为 "a" 的元素
auto range = mm.equal_range("a");
for (auto it = range.first; it != range.second; it++) {
    cout << it->second << " ";  // 1 2
}
```

## unordered_set / unordered_map

**无序**版本，基于哈希表，查找更快：

```cpp
#include <unordered_set>
#include <unordered_map>

unordered_set<int> us;
unordered_map<string, int> um;

// 操作与 set/map 相同
us.insert(1);
um["key"] = 1;
```

| 特性 | set/map | unordered_set/map |
|------|---------|-------------------|
| 底层 | 红黑树 | 哈希表 |
| 有序 | 是 | 否 |
| 查找 | O(log n) | O(1) 平均 |
| 插入 | O(log n) | O(1) 平均 |
| 内存 | 较少 | 较多 |

## 实际应用

### 1. 统计词频

```cpp
map<string, int> freq;
string word;

while (cin >> word) {
    freq[word]++;
}

// 按频率排序
vector<pair<int, string>> sorted;
for (auto& [w, cnt] : freq) {
    sorted.push_back({cnt, w});
}
sort(sorted.rbegin(), sorted.rend());

for (auto& [cnt, w] : sorted) {
    cout << w << ": " << cnt << endl;
}
```

### 2. 两数之和

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        
        seen[nums[i]] = i;
    }
    
    return {};
}
```

### 3. 去重并排序

```cpp
vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6, 5};

set<int> s(nums.begin(), nums.end());
vector<int> result(s.begin(), s.end());

// result = {1, 2, 3, 4, 5, 6, 9}
```

### 4. 区间查询

```cpp
set<int> s = {1, 3, 5, 7, 9};

// 查询 [3, 7] 范围内的元素
auto left = s.lower_bound(3);
auto right = s.upper_bound(7);

for (auto it = left; it != right; it++) {
    cout << *it << " ";  // 3 5 7
}
```

## 练习题

1. [LeetCode 1. 两数之和](https://leetcode.cn/problems/two-sum/)
2. [LeetCode 349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)
3. [洛谷 P1102 A-B 数对](https://www.luogu.com.cn/problem/P1102)
4. [LeetCode 560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

## 总结

- `set`：有序不重复集合，O(log n) 操作
- `multiset`：有序可重复集合
- `map`：有序键值对，O(log n) 操作
- `multimap`：有序可重复键值对
- `unordered_set/map`：无序版本，O(1) 平均操作
- 常用操作：insert、erase、find、count、lower_bound、upper_bound
