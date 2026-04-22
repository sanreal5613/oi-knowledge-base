# 基础几何

<DifficultyBadge level="easy" />

## 基础概念

### 点

```cpp
struct Point {
    double x, y;
    
    Point(double x = 0, double y = 0) : x(x), y(y) {}
    
    // 向量加法
    Point operator + (const Point& p) const {
        return Point(x + p.x, y + p.y);
    }
    
    // 向量减法
    Point operator - (const Point& p) const {
        return Point(x - p.x, y - p.y);
    }
    
    // 数乘
    Point operator * (double k) const {
        return Point(x * k, y * k);
    }
    
    // 点乘（内积）
    double dot(const Point& p) const {
        return x * p.x + y * p.y;
    }
    
    // 叉乘（外积）
    double cross(const Point& p) const {
        return x * p.y - y * p.x;
    }
    
    // 模长
    double len() const {
        return sqrt(x * x + y * y);
    }
    
    // 模长的平方
    double len2() const {
        return x * x + y * y;
    }
};
```

### 向量运算

```cpp
// 向量 AB
Point vec(Point a, Point b) {
    return b - a;
}

// 点积：a·b = |a||b|cosθ
// 几何意义：投影长度之积
double dot(Point a, Point b) {
    return a.x * b.x + a.y * b.y;
}

// 叉积：a×b = |a||b|sinθ
// 几何意义：平行四边形有向面积
double cross(Point a, Point b) {
    return a.x * b.y - a.y * b.x;
}

// 叉积的符号判断方向
// cross(AB, AC) > 0: C 在 AB 左侧（逆时针）
// cross(AB, AC) < 0: C 在 AB 右侧（顺时针）
// cross(AB, AC) = 0: A, B, C 共线
```

## 基本操作

### 1. 判断点在线段上

```cpp
bool onSegment(Point a, Point b, Point p) {
    // 共线且夹在中间
    return cross(b - a, p - a) == 0 &&  // 共线
           dot(p - a, p - b) <= 0;       // 夹在中间
}

// 带精度版本
const double EPS = 1e-8;

int dcmp(double x) {
    if (fabs(x) < EPS) return 0;
    return x < 0 ? -1 : 1;
}

bool onSegment(Point a, Point b, Point p) {
    return dcmp(cross(b - a, p - a)) == 0 && 
           dcmp(dot(p - a, p - b)) <= 0;
}
```

### 2. 判断线段相交

```cpp
// 快速排斥实验 + 跨立实验
bool segmentsIntersect(Point a1, Point a2, Point b1, Point b2) {
    // 快速排斥实验：判断两线段所在矩形是否相交
    if (max(a1.x, a2.x) < min(b1.x, b2.x) ||
        max(b1.x, b2.x) < min(a1.x, a2.x) ||
        max(a1.y, a2.y) < min(b1.y, b2.y) ||
        max(b1.y, b2.y) < min(a1.y, a2.y)) {
        return false;
    }
    
    // 跨立实验
    double c1 = cross(a2 - a1, b1 - a1);
    double c2 = cross(a2 - a1, b2 - a1);
    double c3 = cross(b2 - b1, a1 - b1);
    double c4 = cross(b2 - b1, a2 - b1);
    
    return dcmp(c1) * dcmp(c2) <= 0 && dcmp(c3) * dcmp(c4) <= 0;
}
```

### 3. 求直线交点

```cpp
// 求直线 p1p2 和 q1q2 的交点
Point lineIntersection(Point p1, Point p2, Point q1, Point q2) {
    Point u = p2 - p1;
    Point v = q2 - q1;
    Point w = p1 - q1;
    
    double t = cross(v, w) / cross(v, u);
    
    return p1 + u * t;
}
```

### 4. 点到直线距离

```cpp
// 点 p 到直线 AB 的距离
double pointToLine(Point a, Point b, Point p) {
    return fabs(cross(b - a, p - a)) / (b - a).len();
}
```

### 5. 点到线段距离

```cpp
// 点 p 到线段 AB 的距离
double pointToSegment(Point a, Point b, Point p) {
    if (dot(p - a, b - a) < 0) return (p - a).len();  // 垂足在 A 外侧
    if (dot(p - b, a - b) < 0) return (p - b).len();  // 垂足在 B 外侧
    return pointToLine(a, b, p);  // 垂足在线段上
}
```

### 6. 点在多边形内

```cpp
// 射线法：从点向右发射射线，统计与多边形边界的交点数
bool pointInPolygon(Point p, vector<Point>& poly) {
    int n = poly.size();
    bool inside = false;
    
    for (int i = 0, j = n - 1; i < n; j = i++) {
        // 点在边上
        if (onSegment(poly[i], poly[j], p)) return true;
        
        // 射线与边相交
        bool intersect = ((poly[i].y > p.y) != (poly[j].y > p.y)) &&
                         (p.x < (poly[j].x - poly[i].x) * (p.y - poly[i].y) / 
                                (poly[j].y - poly[i].y) + poly[i].x);
        
        if (intersect) inside = !inside;
    }
    
    return inside;
}
```

## 多边形面积

### 叉积法

```cpp
// 多边形面积（顶点按顺时针或逆时针给出）
double polygonArea(vector<Point>& p) {
    int n = p.size();
    double area = 0;
    
    for (int i = 0; i < n; i++) {
        int j = (i + 1) % n;
        area += cross(p[i], p[j]);
    }
    
    return fabs(area) / 2;
}
```

## 练习题

1. [洛谷 P1428 小鱼比可爱](https://www.luogu.com.cn/problem/P1428)
2. [洛谷 P3741 小果的键盘](https://www.luogu.com.cn/problem/P3741)
3. [LeetCode 223. 矩形面积](https://leetcode.cn/problems/rectangle-area/)
4. [LeetCode 587. 安装栅栏](https://leetcode.cn/problems/erect-the-fence/)

## 总结

- 点积：判断角度、投影
- 叉积：判断方向、求面积
- 叉积 > 0：左侧（逆时针）
- 叉积 < 0：右侧（顺时针）
- 叉积 = 0：共线
