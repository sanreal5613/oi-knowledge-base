# 单调栈

<DifficultyBadge level="medium" />

## 什么是单调栈？

单调栈是一种特殊的栈，栈内元素保持**单调递增**或**单调递减**的顺序。

```
单调递增栈（从栈底到栈顶递增）：
栈底 → 1, 3, 5, 7 ← 栈顶

单调递减栈（从栈底到栈顶递减）：
栈底 → 7, 5, 3, 1 ← 栈顶
```

## 核心思想

维护栈的单调性，当新元素破坏单调性时，弹出栈顶元素。

```cpp
// 单调递增栈
for (int i = 0; i < n; i++) {
    while (!st.empty() && st.top() > arr[i]) {
        st.pop();  // 弹出破坏单调性的元素
    }
    st.push(arr[i]);
}
```

## 经典应用

### 1. 下一个更大元素

```cpp
vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;  // 存储索引
    
    for (int i = 0; i < n; i++) {
        // 当前元素比栈顶元素大，找到下一个更大元素
        while (!st.empty() && nums[st.top()] < nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}

// 示例：
// 输入: [2, 1, 2, 4, 3]
// 输出: [4, 2, 4, -1, -1]
```

### 2. 下一个更小元素

```cpp
vector<int> nextSmallerElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] > nums[i]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    
    return result;
}
```

### 3. 柱状图中最大的矩形

```cpp
int largestRectangleArea(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    int maxArea = 0;
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()];
            st.pop();
            
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        
        st.push(i);
    }
    
    return maxArea;
}
```

### 4. 接雨水

```cpp
int trap(vector<int>& height) {
    int n = height.size();
    if (n == 0) return 0;
    
    stack<int> st;
    int water = 0;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && height[st.top()] < height[i]) {
            int bottom = height[st.top()];
            st.pop();
            
            if (st.empty()) break;
            
            int left = st.top();
            int width = i - left - 1;
            int h = min(height[left], height[i]) - bottom;
            water += width * h;
        }
        
        st.push(i);
    }
    
    return water;
}
```

### 5. 每日温度

```cpp
vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> result(n, 0);
    stack<int> st;  // 存储索引
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && temperatures[st.top()] < temperatures[i]) {
            int prev = st.top();
            st.pop();
            result[prev] = i - prev;  // 天数差
        }
        st.push(i);
    }
    
    return result;
}
```

## 单调栈模板

```cpp
// 找到左边第一个比当前元素小的元素
vector<int> leftSmaller(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] >= nums[i]) {
            st.pop();
        }
        if (!st.empty()) {
            result[i] = nums[st.top()];
        }
        st.push(i);
    }
    
    return result;
}

// 找到右边第一个比当前元素小的元素
vector<int> rightSmaller(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;
    
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && nums[st.top()] >= nums[i]) {
            st.pop();
        }
        if (!st.empty()) {
            result[i] = nums[st.top()];
        }
        st.push(i);
    }
    
    return result;
}
```

## 练习题

1. [LeetCode 496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/)
2. [LeetCode 503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/)
3. [LeetCode 84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)
4. [LeetCode 42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)
5. [LeetCode 739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)
6. [洛谷 P1901 发射站](https://www.luogu.com.cn/problem/P1901)

## 总结

- 单调栈保持栈内元素单调性
- 常用于找"下一个更大/更小元素"问题
- 时间复杂度 O(n)，每个元素最多入栈出栈一次
- 经典题目：接雨水、最大矩形、每日温度
