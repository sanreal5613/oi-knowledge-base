# 贪心算法

<DifficultyBadge level="medium" />

## 什么是贪心？

贪心算法是**每一步都选择当前最优解**，希望最终得到全局最优解的算法。

```
贪心策略：
- 每一步做出局部最优选择
- 不回溯，不反悔
- 希望局部最优能导致全局最优
```

::: warning 注意
贪心**不一定**能得到全局最优解！需要证明正确性。
:::

## 贪心适用条件

### 1. 贪心选择性质

全局最优解可以通过局部最优选择达到。

### 2. 最优子结构

问题的最优解包含子问题的最优解。

## 经典问题

### 1. 活动选择问题

**问题**：给定 n 个活动的开始和结束时间，选择尽可能多的互不重叠的活动。

**贪心策略**：按结束时间排序，每次选择结束时间最早且不与已选活动重叠的活动。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Activity {
    int start, end;
    bool operator < (const Activity& other) const {
        return end < other.end;  // 按结束时间排序
    }
};

int maxActivities(vector<Activity>& activities) {
    sort(activities.begin(), activities.end());
    
    int count = 0;
    int lastEnd = -1;
    
    for (auto& act : activities) {
        if (act.start >= lastEnd) {
            count++;
            lastEnd = act.end;
        }
    }
    
    return count;
}

int main() {
    int n;
    cin >> n;
    
    vector<Activity> activities(n);
    for (int i = 0; i < n; i++) {
        cin >> activities[i].start >> activities[i].end;
    }
    
    cout << maxActivities(activities) << endl;
    
    return 0;
}
```

### 2. 区间调度问题

**问题**：选择最少数量的点，使得每个区间都包含至少一个点。

**贪心策略**：按右端点排序，每次选择当前区间的右端点，跳过所有包含该点的区间。

```cpp
int minPoints(vector<pair<int, int>>& intervals) {
    sort(intervals.begin(), intervals.end(), 
         [](auto& a, auto& b) { return a.second < b.second; });
    
    int count = 0;
    int lastPoint = -1e9;
    
    for (auto& [l, r] : intervals) {
        if (l > lastPoint) {
            count++;
            lastPoint = r;
        }
    }
    
    return count;
}
```

### 3. 分数背包问题

**问题**：物品可以分割，求背包能装的最大价值。

**贪心策略**：按单位重量价值排序，优先拿单位价值高的。

```cpp
struct Item {
    int weight, value;
    double unitValue;
};

double fractionalKnapsack(int W, vector<Item>& items) {
    for (auto& item : items) {
        item.unitValue = (double)item.value / item.weight;
    }
    
    sort(items.begin(), items.end(), 
         [](Item& a, Item& b) { return a.unitValue > b.unitValue; });
    
    double totalValue = 0;
    
    for (auto& item : items) {
        if (W >= item.weight) {
            totalValue += item.value;
            W -= item.weight;
        } else {
            totalValue += item.unitValue * W;
            break;
        }
    }
    
    return totalValue;
}
```

### 4. 哈夫曼编码

**问题**：构造最优前缀编码，使得编码总长度最短。

**贪心策略**：每次选择频率最小的两个节点合并。

```cpp
#include <queue>

int huffman(vector<int>& freq) {
    priority_queue<int, vector<int>, greater<int>> pq;
    
    for (int f : freq) {
        pq.push(f);
    }
    
    int total = 0;
    
    while (pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        
        total += a + b;
        pq.push(a + b);
    }
    
    return total;
}
```

### 5. 最小生成树（Kruskal）

**问题**：连接所有顶点的边权和最小的树。

**贪心策略**：每次选择权值最小且不会形成环的边。

见 [最小生成树](/advanced-algorithms/graph/mst)

### 6. 单源最短路（Dijkstra）

**问题**：求起点到其他所有点的最短路径。

**贪心策略**：每次选择距离起点最近的未确定最短路的点。

见 [最短路](/advanced-algorithms/graph/shortest-path)

### 7. 找零钱问题

**问题**：用最少数量的硬币凑出金额。

**贪心策略**：每次选择面值最大的硬币（仅当硬币面额合适时正确）。

```cpp
int minCoins(vector<int>& coins, int amount) {
    sort(coins.rbegin(), coins.rend());  // 从大到小排序
    
    int count = 0;
    for (int coin : coins) {
        count += amount / coin;
        amount %= coin;
    }
    
    return amount == 0 ? count : -1;
}

// 注意：只有特定面额（如 1, 5, 10, 50）时才正确
// 对于 1, 3, 4，凑 6，贪心：4+1+1=3个，最优：3+3=2个
```

## 贪心证明方法

### 1. 反证法

假设贪心不是最优的，推出矛盾。

### 2. 归纳法

证明贪心在每一步都保持最优子结构。

### 3. 交换论证

假设最优解和贪心解不同，通过交换使它们相同。

## 贪心 vs 动态规划

| 特点 | 贪心 | 动态规划 |
|------|------|---------|
| 选择 | 只选当前最优 | 考虑所有可能 |
| 回朔 | 不回溯 | 可以回溯 |
| 效率 | 高 | 较低 |
| 正确性 | 需要证明 | 通常正确 |
| 适用 | 特定问题 | 更广泛 |

## 贪心常见题型

### 1. 区间问题
- 活动选择
- 区间覆盖
- 区间调度

### 2. 排序问题
- 按某种规则排序后贪心

### 3. 选择问题
- 每次选最大/最小
- 每次选最早结束

### 4. 构造问题
- 哈夫曼编码
- 最优装载

## 练习题

1. [洛谷 P1803 凌乱的yyy / 线段覆盖](https://www.luogu.com.cn/problem/P1803)
2. [洛谷 P1080 国王游戏](https://www.luogu.com.cn/problem/P1080)
3. [洛谷 P1181 数列分段 Section I](https://www.luogu.com.cn/problem/P1181)
4. [LeetCode 455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)
5. [LeetCode 435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/)

## 总结

- 贪心：每一步选当前最优
- 关键是找到正确的贪心策略
- 需要证明正确性
- 常见策略：排序、选最大/最小、选最早结束
- 与 DP 的区别：贪心不回溯，DP 考虑所有可能
