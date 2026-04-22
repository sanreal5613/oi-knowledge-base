# 凸包

<DifficultyBadge level="medium" />

## 什么是凸包？

凸包（Convex Hull）是包含给定点集的最小凸多边形。

```
点集：           凸包：
  ·   ·            ·---·
 · · ·   →       /     \
  ·   ·         ·-------·
```

## 性质

- 凸包上的点都是点集中的点
- 凸包内任意两点的连线都在凸包内
- 凸包顶点数 ≤ n

## Graham 扫描法

### 思路

1. 找到最左下角的点作为起点
2. 按极角排序其他点
3. 用栈维护凸包，依次判断左转/右转

### 代码实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    double x, y;
    Point(double x = 0, double y = 0) : x(x), y(y) {}
    
    Point operator - (const Point& p) const {
        return Point(x - p.x, y - p.y);
    }
    
    double cross(const Point& p) const {
        return x * p.y - y * p.x;
    }
    
    double len2() const {
        return x * x + y * y;
    }
};

const double EPS = 1e-8;

Point start;  // 起点

// 极角排序比较器
bool polarCmp(Point a, Point b) {
    Point va = a - start;
    Point vb = b - start;
    double c = va.cross(vb);
    
    if (fabs(c) > EPS) return c > 0;  // 叉积 > 0，a 在 b 逆时针方向
    return va.len2() < vb.len2();      // 距离近的在前
}

// Graham 扫描法
vector<Point> convexHull(vector<Point>& points) {
    int n = points.size();
    if (n <= 1) return points;
    
    // 找最左下角的点
    int minIdx = 0;
    for (int i = 1; i < n; i++) {
        if (points[i].y < points[minIdx].y || 
            (points[i].y == points[minIdx].y && points[i].x < points[minIdx].x)) {
            minIdx = i;
        }
    }
    
    swap(points[0], points[minIdx]);
    start = points[0];
    
    // 按极角排序
    sort(points.begin() + 1, points.end(), polarCmp);
    
    // 构建凸包
    vector<Point> hull;
    hull.push_back(points[0]);
    hull.push_back(points[1]);
    
    for (int i = 2; i < n; i++) {
        while (hull.size() >= 2) {
            Point a = hull[hull.size() - 2];
            Point b = hull.back();
            Point c = points[i];
            
            // 判断转向：cross(AB, AC) <= 0 表示右转或共线，需要弹出
            if ((b - a).cross(c - a) <= EPS) {
                hull.pop_back();
            } else {
                break;
            }
        }
        hull.push_back(points[i]);
    }
    
    return hull;
}
```

## Andrew 算法（单调链）

### 思路

1. 按 x 坐标排序（x 相同按 y）
2. 分别构建下凸壳和上凸壳

### 代码实现

```cpp
vector<Point> andrew(vector<Point>& points) {
    int n = points.size();
    if (n <= 1) return points;
    
    // 按 x 排序，x 相同按 y
    sort(points.begin(), points.end(), [](Point a, Point b) {
        if (fabs(a.x - b.x) > EPS) return a.x < b.x;
        return a.y < b.y;
    });
    
    vector<Point> hull;
    
    // 下凸壳
    for (int i = 0; i < n; i++) {
        while (hull.size() >= 2) {
            Point a = hull[hull.size() - 2];
            Point b = hull.back();
            if ((b - a).cross(points[i] - a) <= EPS) {
                hull.pop_back();
            } else {
                break;
            }
        }
        hull.push_back(points[i]);
    }
    
    // 上凸壳
    int lowerSize = hull.size();
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() > lowerSize) {
            Point a = hull[hull.size() - 2];
            Point b = hull.back();
            if ((b - a).cross(points[i] - a) <= EPS) {
                hull.pop_back();
            } else {
                break;
            }
        }
        hull.push_back(points[i]);
    }
    
    // 去掉重复的第一个点
    hull.pop_back();
    
    return hull;
}
```

## 凸包周长与面积

```cpp
// 凸包周长
double hullPerimeter(vector<Point>& hull) {
    int n = hull.size();
    double perim = 0;
    
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        perim += sqrt((hull[i] - hull[j]).len2());
    }
    
    return perim;
}

// 凸包面积（叉积法）
double hullArea(vector<Point>& hull) {
    int n = hull.size();
    double area = 0;
    
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += hull[i].cross(hull[j]);
    }
    
    return fabs(area) / 2;
}
```

## 经典应用

### 1. 最小包围矩形

```cpp
// 旋转卡壳求最小面积矩形
// 略（见旋转卡壳章节）
```

### 2. 最远点对（直径）

```cpp
// 旋转卡壳求凸包直径（最远点对）
double rotatingCalipers(vector<Point>& hull) {
    int n = hull.size();
    if (n == 1) return 0;
    if (n == 2) return sqrt((hull[0] - hull[1]).len2());
    
    double maxDist = 0;
    int j = 1;
    
    for (int i = 0; i < n; i++) {
        int ni = (i + 1) % n;
        
        // 找到距离边 hull[i]-hull[ni] 最远的点
        while (true) {
            int nj = (j + 1) % n;
            double cur = fabs((hull[ni] - hull[i]).cross(hull[j] - hull[i]));
            double next = fabs((hull[ni] - hull[i]).cross(hull[nj] - hull[i]));
            
            if (next > cur) {
                j = nj;
            } else {
                break;
            }
        }
        
        // 更新最远距离
        double d1 = (hull[i] - hull[j]).len2();
        double d2 = (hull[ni] - hull[j]).len2();
        maxDist = max(maxDist, max(d1, d2));
    }
    
    return sqrt(maxDist);
}
```

## 练习题

1. [洛谷 P2742 【模板】凸包](https://www.luogu.com.cn/problem/P2742)
2. [洛谷 P3829 信用卡凸包](https://www.luogu.com.cn/problem/P3829)
3. [LeetCode 587. 安装栅栏](https://leetcode.cn/problems/erect-the-fence/)
4. [LeetCode 963. 最小面积矩形 II](https://leetcode.cn/problems/minimum-area-rectangle-ii/)

## 总结

- Graham 扫描：极角排序，O(n log n)
- Andrew 算法：x 坐标排序，常数更小
- 时间复杂度：O(n log n)
- 应用：最远点对、最小包围矩形
