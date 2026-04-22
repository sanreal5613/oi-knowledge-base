# 字典树 (Trie)

<DifficultyBadge level="medium" />

## 什么是字典树？

字典树（Trie），又称前缀树，是一种树形数据结构，用于高效地存储和检索字符串集合。

```
插入："cat", "car", "dog", "dot"

        root
       /    \
      c      d
     / \      \
    a   a      o
   /     \      \
  t       r      g
         /        \
        r          t
```

## 特点

- 根节点为空
- 每个节点代表一个字符
- 从根到某个节点的路径表示一个字符串前缀
- 通常用标记表示是否为单词结尾

## 节点定义

```cpp
struct TrieNode {
    TrieNode* children[26];  // 假设只包含小写字母
    bool isEnd;              // 是否为单词结尾
    int count;               // 经过该节点的单词数（可选）
    
    TrieNode() {
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
        isEnd = false;
        count = 0;
    }
};
```

## 基本操作

### 插入

```cpp
void insert(TrieNode* root, string word) {
    TrieNode* node = root;
    
    for (char c : word) {
        int index = c - 'a';
        
        if (!node->children[index]) {
            node->children[index] = new TrieNode();
        }
        
        node = node->children[index];
        node->count++;  // 记录经过该节点的单词数
    }
    
    node->isEnd = true;
}
```

### 查找

```cpp
bool search(TrieNode* root, string word) {
    TrieNode* node = root;
    
    for (char c : word) {
        int index = c - 'a';
        
        if (!node->children[index]) {
            return false;
        }
        
        node = node->children[index];
    }
    
    return node->isEnd;
}
```

### 前缀查找

```cpp
bool startsWith(TrieNode* root, string prefix) {
    TrieNode* node = root;
    
    for (char c : prefix) {
        int index = c - 'a';
        
        if (!node->children[index]) {
            return false;
        }
        
        node = node->children[index];
    }
    
    return true;
}
```

### 删除

```cpp
void remove(TrieNode* root, string word) {
    removeHelper(root, word, 0);
}

bool removeHelper(TrieNode* node, string& word, int index) {
    if (index == word.size()) {
        if (!node->isEnd) return false;  // 单词不存在
        node->isEnd = false;
        return isEmpty(node);  // 返回是否为空节点
    }
    
    int charIndex = word[index] - 'a';
    TrieNode* child = node->children[charIndex];
    
    if (!child) return false;
    
    bool shouldDeleteChild = removeHelper(child, word, index + 1);
    
    if (shouldDeleteChild) {
        delete child;
        node->children[charIndex] = nullptr;
        return isEmpty(node) && !node->isEnd;
    }
    
    return false;
}

bool isEmpty(TrieNode* node) {
    for (int i = 0; i < 26; i++) {
        if (node->children[i]) return false;
    }
    return true;
}
```

### 统计前缀单词数

```cpp
int countPrefix(TrieNode* root, string prefix) {
    TrieNode* node = root;
    
    for (char c : prefix) {
        int index = c - 'a';
        
        if (!node->children[index]) {
            return 0;
        }
        
        node = node->children[index];
    }
    
    return node->count;
}
```

## 完整实现

```cpp
class Trie {
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (!node->children[index]) {
                node->children[index] = new TrieNode();
            }
            node = node->children[index];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (!node->children[index]) return false;
            node = node->children[index];
        }
        return node->isEnd;
    }
    
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int index = c - 'a';
            if (!node->children[index]) return false;
            node = node->children[index];
        }
        return true;
    }
};
```

## 经典应用

### 1. 单词替换

```cpp
string replaceWords(vector<string>& dictionary, string sentence) {
    TrieNode* root = new TrieNode();
    
    // 构建字典树
    for (string& word : dictionary) {
        insert(root, word);
    }
    
    stringstream ss(sentence);
    string word, result;
    
    while (ss >> word) {
        if (!result.empty()) result += " ";
        
        // 找最短前缀
        TrieNode* node = root;
        string prefix;
        bool found = false;
        
        for (char c : word) {
            int index = c - 'a';
            if (!node->children[index]) break;
            
            prefix += c;
            node = node->children[index];
            
            if (node->isEnd) {
                found = true;
                break;
            }
        }
        
        result += found ? prefix : word;
    }
    
    return result;
}
```

### 2. 最长公共前缀

```cpp
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    
    TrieNode* root = new TrieNode();
    
    // 插入所有单词
    for (string& s : strs) {
        insert(root, s);
    }
    
    // 找到第一个分叉点
    string prefix;
    TrieNode* node = root;
    
    while (true) {
        int childCount = 0;
        int childIndex = -1;
        
        for (int i = 0; i < 26; i++) {
            if (node->children[i]) {
                childCount++;
                childIndex = i;
            }
        }
        
        // 有多个子节点或到达单词结尾
        if (childCount != 1 || node->isEnd) break;
        
        prefix += 'a' + childIndex;
        node = node->children[childIndex];
    }
    
    return prefix;
}
```

### 3. 添加与搜索单词

```cpp
class WordDictionary {
    TrieNode* root;
    
public:
    WordDictionary() {
        root = new TrieNode();
    }
    
    void addWord(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (!node->children[index]) {
                node->children[index] = new TrieNode();
            }
            node = node->children[index];
        }
        node->isEnd = true;
    }
    
    bool search(string word) {
        return searchHelper(root, word, 0);
    }
    
private:
    bool searchHelper(TrieNode* node, string& word, int index) {
        if (index == word.size()) {
            return node->isEnd;
        }
        
        char c = word[index];
        
        if (c == '.') {
            // 通配符，搜索所有子节点
            for (int i = 0; i < 26; i++) {
                if (node->children[i] && 
                    searchHelper(node->children[i], word, index + 1)) {
                    return true;
                }
            }
            return false;
        } else {
            int charIndex = c - 'a';
            if (!node->children[charIndex]) return false;
            return searchHelper(node->children[charIndex], word, index + 1);
        }
    }
};
```

### 4. 最大异或对

```cpp
// 给定数组，找两个数的最大异或值
struct TrieNode {
    TrieNode* children[2];
    TrieNode() {
        children[0] = children[1] = nullptr;
    }
};

int findMaximumXOR(vector<int>& nums) {
    TrieNode* root = new TrieNode();
    int maxXor = 0;
    
    for (int num : nums) {
        TrieNode* node = root;
        TrieNode* xorNode = root;
        int currentXor = 0;
        
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            
            // 插入
            if (!node->children[bit]) {
                node->children[bit] = new TrieNode();
            }
            node = node->children[bit];
            
            // 找最大异或：尽量走相反的位
            int want = 1 - bit;
            if (xorNode->children[want]) {
                currentXor |= (1 << i);
                xorNode = xorNode->children[want];
            } else {
                xorNode = xorNode->children[bit];
            }
        }
        
        maxXor = max(maxXor, currentXor);
    }
    
    return maxXor;
}
```

## 练习题

1. [LeetCode 208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)
2. [LeetCode 211. 添加与搜索单词](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)
3. [LeetCode 648. 单词替换](https://leetcode.cn/problems/replace-words/)
4. [LeetCode 14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)
5. [LeetCode 421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)
6. [LeetCode 212. 单词搜索 II](https://leetcode.cn/problems/word-search-ii/)

## 总结

- 字典树用于高效存储和检索字符串
- 时间复杂度：插入、查找、前缀查找都是 O(m)，m 为字符串长度
- 空间复杂度较高，但查询速度快
- 经典应用：前缀匹配、自动补全、单词搜索
