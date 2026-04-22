# 二叉搜索树

<DifficultyBadge level="medium" />

## 什么是二叉搜索树？

二叉搜索树（BST, Binary Search Tree）是一种特殊的二叉树，满足：
- 左子树所有节点的值 < 根节点的值
- 右子树所有节点的值 > 根节点的值
- 左右子树也是二叉搜索树

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

## 性质

- 中序遍历结果是有序的（升序）
- 查找、插入、删除的时间复杂度：O(h)，h 为树高
- 平衡时 h = O(log n)，最坏情况 h = O(n)

## 基本操作

### 查找

```cpp
TreeNode* search(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    
    if (val < root->val) {
        return search(root->left, val);
    } else {
        return search(root->right, val);
    }
}

// 非递归版
TreeNode* searchIterative(TreeNode* root, int val) {
    while (root && root->val != val) {
        if (val < root->val) {
            root = root->left;
        } else {
            root = root->right;
        }
    }
    return root;
}
```

### 插入

```cpp
TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    
    if (val < root->val) {
        root->left = insert(root->left, val);
    } else if (val > root->val) {
        root->right = insert(root->right, val);
    }
    // 相等则不插入
    
    return root;
}
```

### 删除

删除操作最复杂，分三种情况：

```cpp
TreeNode* deleteNode(TreeNode* root, int val) {
    if (!root) return nullptr;
    
    if (val < root->val) {
        root->left = deleteNode(root->left, val);
    } else if (val > root->val) {
        root->right = deleteNode(root->right, val);
    } else {
        // 找到要删除的节点
        // 情况1：叶子节点或只有一个子节点
        if (!root->left) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        }
        if (!root->right) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }
        
        // 情况2：有两个子节点
        // 找到右子树的最小值（或左子树的最大值）
        TreeNode* minNode = findMin(root->right);
        root->val = minNode->val;
        root->right = deleteNode(root->right, minNode->val);
    }
    
    return root;
}

TreeNode* findMin(TreeNode* root) {
    while (root->left) {
        root = root->left;
    }
    return root;
}
```

### 查找最值

```cpp
// 最小值
TreeNode* findMin(TreeNode* root) {
    if (!root) return nullptr;
    while (root->left) {
        root = root->left;
    }
    return root;
}

// 最大值
TreeNode* findMax(TreeNode* root) {
    if (!root) return nullptr;
    while (root->right) {
        root = root->right;
    }
    return root;
}
```

### 查找前驱和后继

```cpp
// 中序前驱（小于当前值的最大值）
TreeNode* predecessor(TreeNode* root, int val) {
    TreeNode* pred = nullptr;
    
    while (root) {
        if (val <= root->val) {
            root = root->left;
        } else {
            pred = root;
            root = root->right;
        }
    }
    
    return pred;
}

// 中序后继（大于当前值的最小值）
TreeNode* successor(TreeNode* root, int val) {
    TreeNode* succ = nullptr;
    
    while (root) {
        if (val >= root->val) {
            root = root->right;
        } else {
            succ = root;
            root = root->left;
        }
    }
    
    return succ;
}
```

## 验证二叉搜索树

```cpp
bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}

bool validate(TreeNode* root, long minVal, long maxVal) {
    if (!root) return true;
    
    if (root->val <= minVal || root->val >= maxVal) {
        return false;
    }
    
    return validate(root->left, minVal, root->val) &&
           validate(root->right, root->val, maxVal);
}
```

## 第 K 小元素

```cpp
int kthSmallest(TreeNode* root, int k) {
    int count = 0;
    int result = 0;
    inorder(root, k, count, result);
    return result;
}

void inorder(TreeNode* root, int k, int& count, int& result) {
    if (!root) return;
    
    inorder(root->left, k, count, result);
    
    count++;
    if (count == k) {
        result = root->val;
        return;
    }
    
    inorder(root->right, k, count, result);
}
```

## 范围查询

```cpp
vector<int> rangeQuery(TreeNode* root, int low, int high) {
    vector<int> result;
    rangeQueryHelper(root, low, high, result);
    return result;
}

void rangeQueryHelper(TreeNode* root, int low, int high, vector<int>& result) {
    if (!root) return;
    
    if (root->val > low) {
        rangeQueryHelper(root->left, low, high, result);
    }
    
    if (root->val >= low && root->val <= high) {
        result.push_back(root->val);
    }
    
    if (root->val < high) {
        rangeQueryHelper(root->right, low, high, result);
    }
}
```

## 练习题

1. [LeetCode 700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)
2. [LeetCode 701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)
3. [LeetCode 450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)
4. [LeetCode 98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)
5. [LeetCode 230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)
6. [LeetCode 235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)

## 总结

- 二叉搜索树：左 < 根 < 右
- 中序遍历结果有序
- 查找、插入、删除：O(h)
- 需要平衡（AVL、红黑树）来保证 O(log n)
