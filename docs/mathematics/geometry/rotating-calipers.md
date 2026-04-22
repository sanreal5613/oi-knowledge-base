# 旋转卡壳

<DifficultyBadge level="hard" />

## 什么是旋转卡壳？

旋转卡壳（Rotating Calipers）是一种用于求解凸包相关问题的算法技巧，通过"旋转"一对平行线来高效地遍历凸包上的点。

```
      ·
     / \
    ·   ·
   /     \
  ·-------·  ← 一对平行线（卡壳）
   \     /
    ·---·
```

## 核心思想

1. 先求出凸包
2. 用一对平行线夹住凸包
3. 旋转平行线，依次处理每条边
4. 利用单调性，避免重复计算

## 经典应用

### 1. 凸包直径（最远点对）

```cpp
// 求点集中距离最远的两个点
double convexHullDiameter(vector<Point>& points) {
    // 先求凸包
    vector<Point> hull = convexHull(points);
    int n = hull.size();
    
    if (n == 1) return 0;
    if (n == 2) return dist(hull[0], hull[1]);
    
    double maxDist = 0;
    int j = 1;
    
    for (int i = 0; i < n; i++) {
        int ni = (i + 1) % n;
        
        // 找到距离边 hull[i]-hull[ni] 最远的点
        // 利用单调性：j 只会向前移动
        while (cross(hull[ni] - hull[i], hull[(j+1)%n] - hull[i]) > 
               cross(hull[ni] - hull[i], hull[j] - hull[i])) {
            j = (j + 1) % n;
        }
        
        // 更新答案
        maxDist = max(maxDist, dist2(hull[i], hull[j]));
        maxDist = max(maxDist, dist2(hull[ni], hull[j]));
    }
    
    return sqrt(maxDist);
}
```

### 2. 最小面积包围矩形

```cpp
// 求包含所有点的最小面积矩形
// 矩形的一条边与凸包的某条边重合

double minAreaRectangle(vector<Point>& points) {
    vector<Point> hull = convexHull(points);
    int n = hull.size();
    
    if (n <= 2) return 0;
    
    // 四个方向：底边、右边、顶边、左边
    int i = 0, j = 1, k = 2, l = 3;
    
    // 初始化：找到四个极值点
    // i: 最下面的点
    // j: 最右面的点
    // k: 最上面的点
    // l: 最左面的点
    
    double minArea = 1e18;
    
    for (int edge = 0; edge < n; edge++) {
        int next = (edge + 1) % n;
        Point edgeVec = hull[next] - hull[edge];
        
        // 旋转四个卡壳
        // 底边：edge -> next
        // 右边：j
        // 顶边：k
        // 左边：l
        
        // 更新 j：找到距离底边最远的点（高度最大）
        while (cross(edgeVec, hull[(j+1)%n] - hull[edge]) > 
               cross(edgeVec, hull[j] - hull[edge])) {
            j = (j + 1) % n;
        }
        
        // 更新 k：找到与底边平行的最远点
        while (dot(edgeVec, hull[(k+1)%n] - hull[edge]) > 
               dot(edgeVec, hull[k] - hull[edge])) {
            k = (k + 1) % n;
        }
        
        // 更新 l：找到与右边垂直的最远点
        while (cross(edgeVec, hull[(l+1)%n] - hull[edge]) < 
               cross(edgeVec, hull[l] - hull[edge])) {
            l = (l + 1) % n;
        }
        
        // 计算矩形面积
        double width = dot(edgeVec, hull[k] - hull[edge]) / edgeVec.len();
        double height = cross(edgeVec, hull[j] - hull[edge]) / edgeVec.len();
        
        minArea = min(minArea, width * height);
    }
    
    return minArea;
}
```

### 3. 凸包宽度

```cpp
// 求凸包的最小宽度（两条平行线之间的最小距离）
double convexHullWidth(vector<Point>& points) {
    vector<Point> hull = convexHull(points);
    int n = hull.size();
    
    if (n <= 2) return 0;
    
    double minWidth = 1e18;
    int j = 1;
    
    for (int i = 0; i < n; i++) {
        int ni = (i + 1) % n;
        
        // 找到距离边 hull[i]-hull[ni] 最远的点
        while (cross(hull[ni] - hull[i], hull[(j+1)%n] - hull[i]) > 
               cross(hull[ni] - hull[i], hull[j] - hull[i])) {
            j = (j + 1) % n;
        }
        
        // 计算距离
        double width = fabs(cross(hull[ni] - hull[i], hull[j] - hull[i])) 
                       / dist(hull[i], hull[ni]);
        
        minWidth = min(minWidth, width);
    }
    
    return minWidth;
}
```

### 4. 两凸包最近距离

```cpp
// 求两个凸包之间的最近距离
double minDistBetweenHulls(vector<Point>& hull1, vector<Point>& hull2) {
    int n = hull1.size(), m = hull2.size();
    
    // 找到 y 坐标最小的点
    int i = 0, j = 0;
    for (int k = 1; k < n; k++) {
        if (hull1[k].y < hull1[i].y) i = k;
    }
    for (int k = 1; k < m; k++) {
        if (hull2[k].y > hull2[j].y) j = k;
    }
    
    double minDist = 1e18;
    
    // 旋转卡壳
    for (int _ = 0; _ < n + m; _++) {
        int ni = (i + 1) % n;
        int nj = (j + 1) % m;
        
        // 计算当前边的夹角
        Point v1 = hull1[ni] - hull1[i];
        Point v2 = hull2[nj] - hull2[j];
        
        // 更新答案
        minDist = min(minDist, pointToSegment(hull1[i], hull1[ni], hull2[j]));
        minDist = min(minDist, pointToSegment(hull2[j], hull2[nj], hull1[i]));
        
        // 旋转
        double crossVal = cross(v1, v2);
        if (crossVal > 0) {
            i = ni;
        } else if (crossVal < 0) {
            j = nj;
        } else {
            i = ni;
            j = nj;
        }
    }
    
    return minDist;
}
```

## 时间复杂度分析

| 问题 | 时间复杂度 |
|------|-----------|
| 凸包直径 | O(n)（凸包后） |
| 最小包围矩形 | O(n)（凸包后） |
| 凸包宽度 | O(n)（凸包后） |
| 两凸包最近距离 | O(n + m) |

## 练习题

1. [洛谷 P1452 旋转卡壳](https://www.luogu.com.cn/problem/P1452)
2. [洛谷 P3187 凸包直径](https://www.luogu.com.cn/problem/P3187)
3. [HDU 3629 凸包宽度](http://acm.hdu.edu.cn/showproblem.php?pid=3629)
4. [POJ 3608 两凸包最近距离](http://poj.org/problem?id=3608)

## 总结

- 旋转卡壳用于凸包相关问题
- 核心：利用单调性，避免重复计算
- 通常需要先求凸包
- 时间复杂度：O(n)（凸包后）
- 经典应用：直径、最小矩形、宽度、最近距离
