# 递归

## 介绍

将大问题转化为小问题，通过递归依次解决各个小问题

## 示例

[reverse-string](https://leetcode-cn.com/problems/reverse-string/)

> 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组  `char[]`  的形式给出。

```javascript
var reverseString = function(s) {
  const res = reverse(s, 0);
  for(let i = 0; i < res.length; i++) {
    s[i] = res[i];
  }
};
function reverse(s, i) {
  if(i === s.length) {
    return '';
  }
  return reverse(s, i + 1) + s[i];
}
```

[swap-nodes-in-pairs](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

> 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
> **你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

```javascript
// 思路：将链表翻转转化为一个子问题，然后通过递归方式依次解决
// 先翻转两个，然后将后面的节点继续这样翻转，然后将这些翻转后的节点连接起来
var swapPairs = function(head) {
  return helper(head);
}
function helper(head) {
  if(!head || !head.next) {
    return head;
  }
  const nextHead = head.next.next;
  const next = head.next;
  next.next = head;
  head.next = helper(nextHead);
  return next;
}
```

[unique-binary-search-trees-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

> 给定一个整数 n，生成所有由 1 ... n 为节点所组成的二叉搜索树。

```javascript
var generateTrees = function(n) {
  if(n === 0) {
    return [];
  }
  return generate(1, n);
};

function generate(start, end) {
  if(start > end) {
    return [null];
  }
  const res = [];
  for(let i = start; i <= end; i++) {
    const left = generate(start, i - 1);
    const right = generate(i + 1, end);
    for(let j = 0; j < left.length; j++) {
      for(let k = 0; k < right.length; k++) {
        res.push(new TreeNode(i, left[j], right[k]));
      }
    }
  }
  return res;
}
```

## 递归+备忘录

[fibonacci-number](https://leetcode-cn.com/problems/fibonacci-number/)

> 斐波那契数，通常用  F(n) 表示，形成的序列称为斐波那契数列。该数列由  0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
> F(0) = 0,   F(1) = 1
> F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
> 给定  N，计算  F(N)。

```javascript
const map = {};
var fib = function(N) {
  if(N < 2) {
    return N;
  }
  if(map[N]) {
    return map[N];
  }
  map[N] = fib(N - 1) + fib(N - 2);
  return map[N];
};
```

使用尾递归，可以很大程度上节约空间

```javascript
var fib = function(N) {
  return helper(N, 0, 1);
};
function helper(n, prev, curr) {
  if(n === 0) {
    return prev;
  }
  return helper(n - 1, curr, curr + prev);
}
```

## 练习

- [ ] [reverse-string](https://leetcode-cn.com/problems/reverse-string/)
- [ ] [swap-nodes-in-pairs](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
- [ ] [unique-binary-search-trees-ii](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)
- [ ] [fibonacci-number](https://leetcode-cn.com/problems/fibonacci-number/)
