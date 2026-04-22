# 单调队列

<DifficultyBadge level="medium" />

## 什么是单调队列？

单调队列是一种特殊的队列，队列内元素保持**单调递增**或**单调递减**的顺序。通常使用双端队列（deque）实现。

```
单调递增队列（从队首到队尾递增）：
队首 → 1, 3, 5, 7 ← 队尾

单调递减队列（从队首到队尾递减）：
队首 → 7, 5, 3, 1 ← 队尾
```

## 核心思想

维护队列的单调性，同时支持滑动窗口。

```cpp
// 单调递减队列（维护窗口最大值）
for (int i = 0; i < n; i++) {
    // 1. 移除窗口外的元素
    if (!dq.empty() && dq.front() <= i - k) {
        dq.pop_front();
    }
    
    // 2. 保持单调性：移除所有小于当前元素的
    while (!dq.empty() && nums[dq.back()] <= nums[i]) {
        dq.pop_back();
    }
    
    // 3. 加入当前元素
    dq.push_back(i);
}
```

## 经典应用

### 1. 滑动窗口最大值

```cpp
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;  // 存储索引，保持递减
    
    for (int i = 0; i < nums.size(); i++) {
        // 移除窗口外的元素
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // 保持递减：移除所有小于等于当前元素的
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // 记录结果（窗口形成后）
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

### 2. 滑动窗口最小值

```cpp
vector<int> minSlidingWindow(vector<int>& nums, int k) {
    vector<int> result;
    deque<int> dq;  // 存储索引，保持递增
    
    for (int i = 0; i < nums.size(); i++) {
        // 移除窗口外的元素
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // 保持递增：移除所有大于等于当前元素的
        while (!dq.empty() && nums[dq.back()] >= nums[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        // 记录结果
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    
    return result;
}
```

### 3. 最大子数组和（限制长度）

```cpp
// 求长度不超过 k 的最大子数组和
int maxSubarraySum(vector<int>& nums, int k) {
    int n = nums.size();
    vector<long long> prefix(n + 1);
    
    // 前缀和
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    
    long long maxSum = nums[0];
    deque<int> dq;  // 存储前缀和索引，保持递增
    
    for (int i = 1; i <= n; i++) {
        // 移除窗口外的元素
        while (!dq.empty() && dq.front() < i - k) {
            dq.pop_front();
        }
        
        // 计算以 i-1 结尾的最大子数组和
        if (!dq.empty()) {
            maxSum = max(maxSum, prefix[i] - prefix[dq.front()]);
        }
        
        // 保持递增
        while (!dq.empty() && prefix[dq.back()] >= prefix[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
    }
    
    return maxSum;
}
```

### 4. 跳跃游戏

```cpp
// 跳跃游戏 VI：从 i 可以跳到 [i+1, i+k] 范围内，得分是 nums[j]
int maxResult(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> dp(n, INT_MIN);
    dp[0] = nums[0];
    
    deque<int> dq;  // 存储索引，dp值递减
    dq.push_back(0);
    
    for (int i = 1; i < n; i++) {
        // 移除窗口外的元素
        while (!dq.empty() && dq.front() < i - k) {
            dq.pop_front();
        }
        
        // 当前最大得分
        dp[i] = dp[dq.front()] + nums[i];
        
        // 保持递减
        while (!dq.empty() && dp[dq.back()] <= dp[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
    }
    
    return dp[n - 1];
}
```

## 单调队列模板

```cpp
// 单调递减队列（求滑动窗口最大值）
class MonotonicQueue {
    deque<int> dq;
    vector<int>& nums;
    
public:
    MonotonicQueue(vector<int>& nums) : nums(nums) {}
    
    void push(int i) {
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
    }
    
    void pop(int i) {
        if (!dq.empty() && dq.front() == i) {
            dq.pop_front();
        }
    }
    
    int max() {
        return nums[dq.front()];
    }
};
```

## 单调栈 vs 单调队列

| 特性 | 单调栈 | 单调队列 |
|------|--------|----------|
| 数据结构 | 栈 | 双端队列 |
| 操作端 | 单端 | 双端 |
| 主要应用 | 下一个更大/更小元素 | 滑动窗口最值 |
| 时间复杂度 | O(n) | O(n) |

## 练习题

1. [LeetCode 239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)
2. [LeetCode 1438. 绝对差不超过限制的最长子数组](https://leetcode.cn/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)
3. [LeetCode 1696. 跳跃游戏 VI](https://leetcode.cn/problems/jump-game-vi/)
4. [洛谷 P1886 滑动窗口](https://www.luogu.com.cn/problem/P1886)
5. [洛谷 P1440 求m区间内的最小值](https://www.luogu.com.cn/problem/P1440)

## 总结

- 单调队列使用双端队列维护单调性
- 经典应用：滑动窗口最大值/最小值
- 时间复杂度 O(n)，每个元素最多入队出队一次
- 与单调栈的区别：单调队列支持滑动窗口
