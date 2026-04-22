# 二叉树基础

<DifficultyBadge level="easy" />

## 什么是二叉树？

二叉树是每个节点最多有两个子节点的树形结构。

```
        1          ← 根节点
       / \
      2   3        ← 内部节点
     / \   \
    4   5   6      ← 叶子节点
```

## 基本概念

| 术语 | 说明 |
|------|------|
| 根节点 | 树的顶部节点，没有父节点 |
| 叶子节点 | 没有子节点的节点 |
| 内部节点 | 至少有一个子节点的节点 |
| 深度 | 从根到该节点的边数 |
| 高度 | 从该节点到最深叶子的边数 |
| 层数 | 深度 + 1 |

## 特殊二叉树

### 满二叉树

每个节点都有 0 或 2 个子节点。

```
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

### 完全二叉树

除了最后一层，其他层都是满的，最后一层节点靠左排列。

```
        1
       / \
      2   3
     / \ /
    4  5 6
```

## 二叉树的存储

### 链式存储

```cpp
struct TreeNode {
    int val;           // 节点值
    TreeNode* left;    // 左子节点
    TreeNode* right;   // 右子节点
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

### 数组存储（完全二叉树）

```cpp
// 对于节点 i：
// 左子节点：2*i + 1
// 右子节点：2*i + 2
// 父节点：(i-1)/2

int tree[1005];  // 数组存储

// 示例：
//      1
//     / \
//    2   3
//   / \   \
//  4   5   6
//
// 数组：[1, 2, 3, 4, 5, 6]
```

## 二叉树的遍历

### 前序遍历（根-左-右）

```cpp
// 递归版
void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";  // 访问根
    preorder(root->left);       // 遍历左子树
    preorder(root->right);      // 遍历右子树
}

// 非递归版
void preorderIterative(TreeNode* root) {
    if (!root) return;
    
    stack<TreeNode*> st;
    st.push(root);
    
    while (!st.empty()) {
        TreeNode* node = st.top();
        st.pop();
        cout << node->val << " ";
        
        // 先右后左，保证左子树先处理
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
}
```

### 中序遍历（左-根-右）

```cpp
// 递归版
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// 非递归版
void inorderIterative(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* cur = root;
    
    while (cur || !st.empty()) {
        while (cur) {
            st.push(cur);
            cur = cur->left;
        }
        
        cur = st.top();
        st.pop();
        cout << cur->val << " ";
        cur = cur->right;
    }
}
```

### 后序遍历（左-右-根）

```cpp
// 递归版
void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}

// 非递归版（使用两个栈）
void postorderIterative(TreeNode* root) {
    if (!root) return;
    
    stack<TreeNode*> st1, st2;
    st1.push(root);
    
    while (!st1.empty()) {
        TreeNode* node = st1.top();
        st1.pop();
        st2.push(node);
        
        if (node->left) st1.push(node->left);
        if (node->right) st1.push(node->right);
    }
    
    while (!st2.empty()) {
        cout << st2.top()->val << " ";
        st2.pop();
    }
}
```

### 层序遍历（BFS）

```cpp
void levelOrder(TreeNode* root) {
    if (!root) return;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        int levelSize = q.size();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = q.front();
            q.pop();
            cout << node->val << " ";
            
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        cout << endl;  // 每层换行
    }
}
```

## 二叉树的基本操作

### 求树的高度

```cpp
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}
```

### 求节点个数

```cpp
int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}
```

### 查找节点

```cpp
TreeNode* find(TreeNode* root, int val) {
    if (!root) return nullptr;
    if (root->val == val) return root;
    
    TreeNode* left = find(root->left, val);
    if (left) return left;
    
    return find(root->right, val);
}
```

### 判断是否为平衡二叉树

```cpp
bool isBalanced(TreeNode* root) {
    return checkHeight(root) != -1;
}

int checkHeight(TreeNode* root) {
    if (!root) return 0;
    
    int left = checkHeight(root->left);
    if (left == -1) return -1;
    
    int right = checkHeight(root->right);
    if (right == -1) return -1;
    
    if (abs(left - right) > 1) return -1;
    
    return 1 + max(left, right);
}
```

## 根据遍历序列重建二叉树

### 前序 + 中序

```cpp
TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    return build(preorder, 0, preorder.size() - 1, 
                 inorder, 0, inorder.size() - 1);
}

TreeNode* build(vector<int>& preorder, int preL, int preR,
                vector<int>& inorder, int inL, int inR) {
    if (preL > preR) return nullptr;
    
    int rootVal = preorder[preL];
    TreeNode* root = new TreeNode(rootVal);
    
    // 在中序中找到根的位置
    int rootIndex = inL;
    while (rootIndex <= inR && inorder[rootIndex] != rootVal) {
        rootIndex++;
    }
    
    int leftSize = rootIndex - inL;
    
    root->left = build(preorder, preL + 1, preL + leftSize,
                       inorder, inL, rootIndex - 1);
    root->right = build(preorder, preL + leftSize + 1, preR,
                        inorder, rootIndex + 1, inR);
    
    return root;
}
```

### 后序 + 中序

```cpp
TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
    return build(inorder, 0, inorder.size() - 1,
                 postorder, 0, postorder.size() - 1);
}

TreeNode* build(vector<int>& inorder, int inL, int inR,
                vector<int>& postorder, int postL, int postR) {
    if (postL > postR) return nullptr;
    
    int rootVal = postorder[postR];
    TreeNode* root = new TreeNode(rootVal);
    
    int rootIndex = inL;
    while (rootIndex <= inR && inorder[rootIndex] != rootVal) {
        rootIndex++;
    }
    
    int leftSize = rootIndex - inL;
    
    root->left = build(inorder, inL, rootIndex - 1,
                       postorder, postL, postL + leftSize - 1);
    root->right = build(inorder, rootIndex + 1, inR,
                        postorder, postL + leftSize, postR - 1);
    
    return root;
}
```

## 练习题

1. [LeetCode 144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
2. [LeetCode 94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
3. [LeetCode 145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)
4. [LeetCode 102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
5. [LeetCode 105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
6. [LeetCode 110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)
7. [LeetCode 104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

## 总结

- 二叉树每个节点最多有两个子节点
- 三种深度优先遍历：前序、中序、后序
- 一种广度优先遍历：层序
- 完全二叉树可以用数组存储
- 根据前序+中序或后序+中序可以重建二叉树
