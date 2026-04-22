# 区间问题

<DifficultyBadge level="medium" />

## 什么是区间问题？

区间问题是一类与**区间 [l, r]** 相关的算法题，常见的有区间覆盖、区间合并、区间调度等。

## 经典区间问题

### 1. 区间合并

**问题**：给定 n 个区间，合并所有重叠的区间。

**思路**：
1. 按左端点排序
2. 遍历区间，维护当前合并区间
3. 如果当前区间与下一个区间重叠，则合并

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<pair<int, int>> mergeIntervals(vector<pair<int, int>>& intervals) {
    if (intervals.empty()) return {};
    
    // 按左端点排序
    sort(intervals.begin(), intervals.end());
    
    vector<pair<int, int>> result;
    int left = intervals[0].first;
    int right = intervals[0].second;
    
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i].first <= right) {
            // 重叠，合并
            right = max(right, intervals[i].second);
        } else {
            // 不重叠，保存当前区间
            result.push_back({left, right});
            left = intervals[i].first;
            right = intervals[i].second;
        }
    }
    
    result.push_back({left, right});
    return result;
}

int main() {
    vector<pair<int, int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    auto merged = mergeIntervals(intervals);
    
    for (auto& [l, r] : merged) {
        cout << "[" << l << ", " << r << "] ";
    }
    // 输出：[1, 6] [8, 10] [15, 18]
    
    return 0;
}
```

### 2. 区间覆盖

**问题**：选择最少数量的点，使得每个区间都包含至少一个点。

**贪心策略**：按右端点排序，每次选择当前区间的右端点。

```cpp
int minPoints(vector<pair<int, int>>& intervals) {
    // 按右端点排序
    sort(intervals.begin(), intervals.end(), 
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 0;
    int lastPoint = -1e9;
    
    for (auto& [l, r] : intervals) {
        if (l > lastPoint) {
            // 当前点不在区间内，选新区间右端点
            count++;
            lastPoint = r;
        }
    }
    
    return count;
}
```

### 3. 活动选择问题

**问题**：选择尽可能多的互不重叠的活动。

**贪心策略**：按结束时间排序，每次选择结束最早且不与已选活动重叠的活动。

```cpp
struct Activity {
    int start, end;
};

int maxActivities(vector<Activity>& activities) {
    // 按结束时间排序
    sort(activities.begin(), activities.end(), 
         [](Activity& a, Activity& b) { return a.end < b.end; });
    
    int count = 1;
    int lastEnd = activities[0].end;
    
    for (int i = 1; i < activities.size(); i++) {
        if (activities[i].start >= lastEnd) {
            count++;
            lastEnd = activities[i].end;
        }
    }
    
    return count;
}
```

### 4. 区间调度问题

**问题**：给定多个区间，选择最大数量的互不重叠区间。

```cpp
int maxNonOverlapping(vector<pair<int, int>>& intervals) {
    // 按结束时间排序
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 0;
    int lastEnd = -1e9;
    
    for (auto& [l, r] : intervals) {
        if (l >= lastEnd) {
            count++;
            lastEnd = r;
        }
    }
    
    return count;
}
```

### 5. 区间最值查询（RMQ）

**问题**：多次查询区间的最大值/最小值。

**解法**：线段树、ST表、单调队列

```cpp
// ST表实现
const int MAXN = 1e5 + 5;
const int LOG = 20;

int st[MAXN][LOG];
int log2Arr[MAXN];

void initST(vector<int>& arr) {
    int n = arr.size();
    
    // 预处理log2
    log2Arr[1] = 0;
    for (int i = 2; i <= n; i++) {
        log2Arr[i] = log2Arr[i / 2] + 1;
    }
    
    // 初始化st表
    for (int i = 0; i < n; i++) {
        st[i][0] = arr[i];
    }
    
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 0; i + (1 << j) <= n; i++) {
            st[i][j] = max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }
}

int queryMax(int l, int r) {
    int j = log2Arr[r - l + 1];
    return max(st[l][j], st[r - (1 << j) + 1][j]);
}
```

## 区间问题技巧

### 1. 排序策略

| 问题 | 排序方式 |
|------|---------|
| 区间合并 | 按左端点 |
| 区间覆盖 | 按右端点 |
| 活动选择 | 按结束时间 |
| 区间调度 | 按结束时间 |

### 2. 常用套路

```cpp
// 区间排序
sort(intervals.begin(), intervals.end());  // 默认按first，再按second

// 遍历区间
for (auto& [l, r] : intervals) {
    // 处理区间 [l, r]
}

// 判断区间重叠
bool overlap(int l1, int r1, int l2, int r2) {
    return max(l1, l2) <= min(r1, r2);
}

// 合并两个区间
pair<int, int> merge(int l1, int r1, int l2, int r2) {
    return {min(l1, l2), max(r1, r2)};
}
```

## 练习题

1. [洛谷 P1803 凌乱的yyy / 线段覆盖](https://www.luogu.com.cn/problem/P1803)
2. [洛谷 P1080 国王游戏](https://www.luogu.com.cn/problem/P1080)
3. [LeetCode 56. 合并区间](https://leetcode.cn/problems/merge-intervals/)
4. [LeetCode 435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/)

## 总结

- 区间问题通常需要排序
- 贪心策略：按结束时间排序
- 常用技巧：区间合并、区间覆盖
- RMQ问题：ST表、线段树
