# 代码模板

<DifficultyBadge level="easy" />

## 竞赛常用模板

### 快速输入输出

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // 你的代码
    
    return 0;
}
```

### 常用宏定义

```cpp
#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define ull unsigned long long
#define pii pair<int, int>
#define pll pair<ll, ll>
#define vi vector<int>
#define vll vector<ll>
#define pb push_back
#define mp make_pair
#define fi first
#define se second
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define rep(i, a, b) for (int i = (a); i < (b); i++)
#define per(i, a, b) for (int i = (b) - 1; i >= (a); i--)

const int INF = 0x3f3f3f3f;
const ll LLINF = 0x3f3f3f3f3f3f3f3f3fLL;
const int MOD = 1e9 + 7;
```

### 快速幂

```cpp
ll quickPow(ll a, ll b, ll mod = MOD) {
    ll res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}
```

### GCD 和 LCM

```cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}

ll lcm(ll a, ll b) {
    return a / gcd(a, b) * b;
}
```

### 并查集

```cpp
struct UnionFind {
    vector<int> parent, rank_;
    
    UnionFind(int n) {
        parent.resize(n);
        rank_.resize(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank_[i] = 0;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
    
    void unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return;
        
        if (rank_[x] < rank_[y]) swap(x, y);
        parent[y] = x;
        if (rank_[x] == rank_[y]) rank_[x]++;
    }
    
    bool same(int x, int y) {
        return find(x) == find(y);
    }
};
```

### 树状数组

```cpp
struct Fenwick {
    vector<ll> tree;
    int n;
    
    Fenwick(int n) : n(n), tree(n + 1) {}
    
    int lowbit(int x) {
        return x & (-x);
    }
    
    void update(int pos, ll val) {
        for (int i = pos; i <= n; i += lowbit(i)) {
            tree[i] += val;
        }
    }
    
    ll query(int pos) {
        ll sum = 0;
        for (int i = pos; i > 0; i -= lowbit(i)) {
            sum += tree[i];
        }
        return sum;
    }
    
    ll queryRange(int l, int r) {
        return query(r) - query(l - 1);
    }
};
```

### 线段树

```cpp
struct SegmentTree {
    struct Node {
        ll sum, lazy;
    };
    
    vector<Node> tree;
    int n;
    
    SegmentTree(int n) : n(n), tree(n * 4) {}
    
    void pushDown(int node, int start, int end) {
        if (tree[node].lazy != 0) {
            int mid = (start + end) / 2;
            tree[node * 2].sum += tree[node].lazy * (mid - start + 1);
            tree[node * 2].lazy += tree[node].lazy;
            tree[node * 2 + 1].sum += tree[node].lazy * (end - mid);
            tree[node * 2 + 1].lazy += tree[node].lazy;
            tree[node].lazy = 0;
        }
    }
    
    void update(int node, int start, int end, int l, int r, ll val) {
        if (l <= start && end <= r) {
            tree[node].sum += val * (end - start + 1);
            tree[node].lazy += val;
            return;
        }
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        if (l <= mid) update(node * 2, start, mid, l, r, val);
        if (r > mid) update(node * 2 + 1, mid + 1, end, l, r, val);
        tree[node].sum = tree[node * 2].sum + tree[node * 2 + 1].sum;
    }
    
    ll query(int node, int start, int end, int l, int r) {
        if (l <= start && end <= r) return tree[node].sum;
        pushDown(node, start, end);
        int mid = (start + end) / 2;
        ll sum = 0;
        if (l <= mid) sum += query(node * 2, start, mid, l, r);
        if (r > mid) sum += query(node * 2 + 1, mid + 1, end, l, r);
        return sum;
    }
};
```

### Dijkstra

```cpp
vector<ll> dijkstra(int start, vector<vector<pair<int, ll>>>& graph) {
    int n = graph.size();
    vector<ll> dist(n, LLINF);
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}
```

### Kruskal

```cpp
struct Edge {
    int u, v;
    ll w;
    bool operator < (const Edge& other) const {
        return w < other.w;
    }
};

ll kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    UnionFind uf(n);
    
    ll total = 0;
    int count = 0;
    
    for (auto& e : edges) {
        if (!uf.same(e.u, e.v)) {
            uf.unite(e.u, e.v);
            total += e.w;
            count++;
            if (count == n - 1) break;
        }
    }
    
    return count == n - 1 ? total : -1;
}
```

### KMP

```cpp
vector<int> computeNext(string& pattern) {
    int m = pattern.size();
    vector<int> next(m, 0);
    
    int j = 0;
    for (int i = 1; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (pattern[i] == pattern[j]) {
            j++;
            next[i] = j;
        }
    }
    
    return next;
}

vector<int> kmpSearch(string& text, string& pattern) {
    vector<int> next = computeNext(pattern);
    vector<int> result;
    
    int j = 0;
    for (int i = 0; i < text.size(); i++) {
        while (j > 0 && text[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (text[i] == pattern[j]) j++;
        if (j == pattern.size()) {
            result.push_back(i - pattern.size() + 1);
            j = next[j - 1];
        }
    }
    
    return result;
}
```

### 素数筛

```cpp
const int MAXN = 1e7 + 5;
vector<int> primes;
bool is_composite[MAXN];

void sieve(int n) {
    for (int i = 2; i <= n; i++) {
        if (!is_composite[i]) {
            primes.push_back(i);
        }
        for (int j = 0; j < primes.size() && (ll)i * primes[j] <= n; j++) {
            is_composite[i * primes[j]] = true;
            if (i % primes[j] == 0) break;
        }
    }
}
```

### 01 背包

```cpp
int knapsack(int W, vector<int>& w, vector<int>& v) {
    int n = w.size();
    vector<int> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        for (int j = W; j >= w[i]; j--) {
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    
    return dp[W];
}
```

### LIS

```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}
```

### LCS

```cpp
int longestCommonSubsequence(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    
    return dp[m][n];
}
```

## 完整竞赛模板

```cpp
#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define ull unsigned long long
#define pii pair<int, int>
#define pll pair<ll, ll>
#define vi vector<int>
#define vll vector<ll>
#define pb push_back
#define mp make_pair
#define fi first
#define se second
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define rep(i, a, b) for (int i = (a); i < (b); i++)
#define per(i, a, b) for (int i = (b) - 1; i >= (a); i--)

const int INF = 0x3f3f3f3f;
const ll LLINF = 0x3f3f3f3f3f3f3f3f3fLL;
const int MOD = 1e9 + 7;

void solve() {
    // 解题代码
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int T = 1;
    // cin >> T;
    while (T--) {
        solve();
    }
    
    return 0;
}
```

## 总结

- 模板是竞赛的基础，要熟练掌握
- 建议整理自己的模板库
- 比赛前复习模板
- 理解模板的原理，不要死记硬背
