# 动态规划

## 背景

先从一道题目开始~

如题  [triangle](https://leetcode-cn.com/problems/triangle/)

> 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

例如，给定三角形：

```text
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
```

自顶向下的最小路径和为  11（即，2 + 3 + 5 + 1 = 11）。

使用 DFS（遍历 或者 分治法）

遍历

![image.png](https://img.fuiboom.com/img/dp_triangle.png)

分治法

![image.png](https://img.fuiboom.com/img/dp_dc.png)

优化 DFS，缓存已经被计算的值（称为：记忆化搜索 本质上：动态规划）

![image.png](https://img.fuiboom.com/img/dp_memory_search.png)

动态规划就是把大问题变成小问题，并解决了小问题重复计算的方法称为动态规划

动态规划和 DFS 区别

- 二叉树 子问题是没有交集，所以大部分二叉树都用递归或者分治法，即 DFS，就可以解决
- 像 triangle 这种是有重复走的情况，**子问题是有交集**，所以可以用动态规划来解决

动态规划，自底向上

```javascript
var minimumTotal = function(triangle) {
  const len = triangle.length;
  if(len === 0) {
    return 0;
  }
  const dp = [...triangle[len - 1]];
  for(let i = len - 2; i >= 0; i--) {
    for(let j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }
  return dp[0];
};
```

动态规划，自顶向下

```javascript
// 测试用例：
// [
// [2],
// [3,4],
// [6,5,7],
// [4,1,8,3]
// ]
var minimumTotal = function(triangle) {
  const len = triangle.length;
  if(len === 0) {
    return 0;
  }
  const dp = [triangle[0][0]];
  for(let i = 1; i < len; i++) {
    const len2 = triangle[i].length;
    dp[len2 - 1] = dp[len2 - 2] + triangle[i][len2 - 1];
    for(let j = len2 - 2; j > 0; j--) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + triangle[i][j];
    }
    dp[0] += triangle[i][0];
  }
  return Math.min(...dp);
};
```

## 递归和动规关系

递归是一种程序的实现方式：函数的自我调用

```javascript
function(x) {
	...
	function(x-1);
	...
}
```

动态规划：是一种解决问 题的思想，大规模问题的结果，是由小规模问 题的结果运算得来的。动态规划可用递归来实现(Memorization Search)

## 使用场景

满足两个条件

- 满足以下条件之一
  - 求最大/最小值（Maximum/Minimum ）
  - 求是否可行（Yes/No ）
  - 求可行个数（Count(\*) ）
- 满足不能排序或者交换（Can not sort / swap ）

如题：[longest-consecutive-sequence](https://leetcode-cn.com/problems/longest-consecutive-sequence/)  位置可以交换，所以不用动态规划

## 四点要素

1. **状态 State**
   - 灵感，创造力，存储小规模问题的结果
2. 方程 Function
   - 状态之间的联系，怎么通过小的状态，来算大的状态
3. 初始化 Intialization
   - 最极限的小状态是什么, 起点
4. 答案 Answer
   - 最大的那个状态是什么，终点

## 常见四种类型

1. Matrix DP (10%)
1. Sequence (40%)
1. Two Sequences DP (40%)
1. Backpack (10%)

> 注意点
>
> - 贪心算法大多题目靠背答案，所以如果能用动态规划就尽量用动规，不用贪心算法

## 1、矩阵类型（10%）

### [minimum-path-sum](https://leetcode-cn.com/problems/minimum-path-sum/)

> 给定一个包含非负整数的  *m* x *n*  网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

思路：动态规划
1、state: f[x][y]从起点走到 x,y 的最短路径
2、function: f[x][y] = min(f[x-1][y], f[x][y-1]) + A[x][y]

```javascript
var minPathSum = function(grid) {
  if(!grid.length) {
    return 0;
  }
  const dp = [0];
  for(let j = 0; j < grid[0].length; j++) {
    dp[j + 1] = dp[j] + grid[0][j];
  }
  dp[0] = Infinity;
  for(let i = 1; i < grid.length; i++) {
    for(let j = 1; j <= grid[i].length; j++) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j - 1];
    }
  }
  return dp[grid[0].length];
};
```

### [unique-paths](https://leetcode-cn.com/problems/unique-paths/)

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
> 问总共有多少条不同的路径？

思路：动态规划
1、state: dp[i][j] 是到达 i, j 最多路径
2、function: dp[i][j] = dp[i-1][j] + dp[i][j-1]

```javascript
var uniquePaths = function(m, n) {
  const dp = Array(m + 1).fill(1);
  dp[0] = 0;
  for(let i = 1; i < n; i++) {
    for(let j = 1; j <= m; j++) {
      dp[j] = dp[j] + dp[j - 1];
    }
    console.log(dp);
  }
  return dp[m];
};
```

### [unique-paths-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

> 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
> 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
> 问总共有多少条不同的路径？
> 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

```javascript
var uniquePathsWithObstacles = function(obstacleGrid) {
  const len1 = obstacleGrid.length;
  if(!len1) {
    return 0;
  }
  const len2 = obstacleGrid[0].length;
  const dp = Array(len2).fill(0);
  dp[0] = 1;
  for(let i = 0; i < len1; i++) {
    dp[0] = obstacleGrid[i][0] === 1 ? 0 : dp[0];
    for(let j = 1; j < len2; j++) {
      dp[j] = obstacleGrid[i][j] === 1 ? 0 : dp[j] + dp[j - 1];
    }
  }
  return dp[len2 - 1];
};
```

## 2、序列类型（40%）

### [climbing-stairs](https://leetcode-cn.com/problems/climbing-stairs/)

> 假设你正在爬楼梯。需要  *n*  阶你才能到达楼顶。

```javascript
var climbStairs = function(n) {
  let dp0 = 1;
  let dp1 = 1;
  for(let i = 2; i <= n; i++) {
    const dp2 = dp0 + dp1;
    dp0 = dp1;
    dp1 = dp2;
  }
  return dp1;
};
```

### [jump-game](https://leetcode-cn.com/problems/jump-game/)

> 给定一个非负整数数组，你最初位于数组的第一个位置。
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
> 判断你是否能够到达最后一个位置。

```javascript
// 思路：看最后一跳
// 状态：f[i] 表示是否能从0跳到i
// 推导：f[i] = OR(f[j],j<i&&j能跳到i) 判断之前所有的点最后一跳是否能跳到当前点
// 初始化：f[0] = true
// 结果： f[n-1]
var canJump = function(nums) {
  const dp = [true];
  for(let i = 1; i < nums.length; i++) {
    dp[i] = false;
    for(let j = i - 1; j >= 0; j--) {
      if(dp[j] && j + nums[j] >= i) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[nums.length - 1];
}
```

### [jump-game-ii](https://leetcode-cn.com/problems/jump-game-ii/)

> 给定一个非负整数数组，你最初位于数组的第一个位置。
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
> 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

```javascript
// 状态：f[i] 表示从起点到当前位置最小次数
// 推导：f[i] = f[j],a[j]+j >=i,min(f[j]+1)
// 初始化：f[0] = 0
// 结果：f[n-1]
// v1动态规划（javascript超时 参考v2）
var jump = function(nums) {
  const dp = Array(nums.length).fill(Infinity);
  dp[0] = 0;
  for(let i = 1; i < nums.length; i++) {
    for(let j = 0; j < i; j++) {
      if(j + nums[j] >= i) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[nums.length - 1];
};
```

```javascript
// v2 动态规划+贪心优化
// 因为跳跃次数的结果集是单调递增的，所以贪心思路是正确的 
var jump = function(nums) {
  if(nums.length <= 1) {
    return 0;
  }
  let max_distance = nums[0];
  let step = 1;
  let i = 1;
  while(nums.length - 1 > max_distance) {
    let new_max = max_distance;
    while(i <= max_distance) {
      new_max = Math.max(new_max, i + nums[i]);
      i++;
    }
    step++;
    max_distance = new_max;
  }
  return step;
};
```

### [palindrome-partitioning-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)

> 给定一个字符串 _s_，将 _s_ 分割成一些子串，使每个子串都是回文串。
> 返回符合要求的最少分割次数。

```javascript
// state: f[i] "前i"个字符组成的子字符串需要最少几次cut(个数-1为索引)
// function: f[i] = MIN{f[j]+1}, j < i && [j+1 ~ i]这一段是一个回文串
// intialize: f[i] = i - 1 (f[0] = -1)
// answer: f[s.length()]
var minCut = function(s) {
  const dp = [-1, 0];
  const posMap = findPosMap(s);
  for(let i = 1; i < s.length; i++) {
    const dps = posMap[s[i]].filter(p => p <= i && isPalindrome(s, p, i)).map(p => dp[p]);
    dp[i + 1] = Math.min(...dps) + 1;
  }
  return dp[s.length];
};
function findPosMap(s) {
  const map = {};
  for(let i = 0; i < s.length; i++) {
    if(!map[s[i]]) {
      map[s[i]] = [];
    }
    map[s[i]].push(i);
  }
  return map;
}
function isPalindrome(s, start, end) {
  while(start < end) {
    if(s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}
```

注意点

- 判断回文字符串时，可以提前用动态规划算好，减少时间复杂度

### [longest-increasing-subsequence](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

> 给定一个无序的整数数组，找到其中最长上升子序列的长度。

```javascript
// f[i] 表示从0开始到i结尾的最长序列长度
// f[i] = max(f[j])+1 ,a[j]<a[i]
// f[0...n-1] = 1
// max(f[0]...f[n-1])
var lengthOfLIS = function(nums) {
  if(!nums.length) {
    return 0;
  }
  const dp = [];
  for(let i = 0; i < nums.length; i++) {
    let max = 0;
    for(let j = 0; j < i; j++) {
      if(nums[i] > nums[j] && max < dp[j]) {
        max = dp[j];
      }
    }
    dp[i] = max + 1;
  }
  return Math.max(...dp);
};
```

### [word-break](https://leetcode-cn.com/problems/word-break/)

> 给定一个**非空**字符串  *s*  和一个包含**非空**单词列表的字典  *wordDict*，判定  *s*  是否可以被空格拆分为一个或多个在字典中出现的单词。

```javascript
// f[i] 表示前i个字符是否可以被切分
// f[i] = f[j] && s[j+1~i] in wordDict
// f[0] = true
// return f[len]
var wordBreak = function(s, wordDict) {
  const dp = [true];
  for(let i = 1; i <= s.length; i++) {
    for(const word of wordDict) {
      const len = word.length;
      const prev = i - len;
      if(s[i - 1] === word[len - 1] && prev >= 0 && dp[prev] && word === s.slice(prev, i)) {
        dp[i] = true;
        break;
      }
    }
  }
  return !!dp[s.length];
}
```

小结

常见处理方式是给 0 位置占位，这样处理问题时一视同仁，初始化则在原来基础上 length+1，返回结果 f[n]

- 状态可以为前 i 个
- 初始化 length+1
- 取值 index=i-1
- 返回值：f[n]或者 f[m][n]

## Two Sequences DP（40%）

### [longest-common-subsequence](https://leetcode-cn.com/problems/longest-common-subsequence/)

> 给定两个字符串  text1 和  text2，返回这两个字符串的最长公共子序列。
> 一个字符串的   子序列   是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
> 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

```javascript
// dp[i][j] a前i个和b前j个字符最长公共子序列
// dp[m+1][n+1]
//   ' a d c e
// ' 0 0 0 0 0
// a 0 1 1 1 1
// c 0 1 1 2 1
var longestCommonSubsequence = function(text1, text2) {
  if(!text1 || !text2) {
    return 0;
  }
  const dp = Array.from({length: text1.length + 1}).map(() => [0]);
  dp[0] = Array(text2.length + 1).fill(0);
  for(let i = 0; i < text1.length; i++) {
    for(let j = 0; j < text2.length; j++) {
      if(text1[i] === text2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[text1.length][text2.length];
};
```

- 从 1 开始遍历到最大长度
- 索引需要减一

### [edit-distance](https://leetcode-cn.com/problems/edit-distance/)

> 给你两个单词  word1 和  word2，请你计算出将  word1  转换成  word2 所使用的最少操作数  
> 你可以对一个单词进行如下三种操作：
> 插入一个字符
> 删除一个字符
> 替换一个字符

思路：和上题很类似，相等则不需要操作，否则取删除、插入、替换最小操作次数的值+1

```javascript
// dp[i][j] 表示a字符串的前i个字符编辑为b字符串的前j个字符最少需要多少次操作
// dp[i][j] = OR(dp[i-1][j-1]，a[i]==b[j],min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1)
var minDistance = function(word1, word2) {
  const dp = Array.from({length: word1.length + 1}).map((v, i) => [i]);
  dp[0] = Array.from({length: word2.length + 1}).map((v, i) => i);

  for(let i = 1; i <= word1.length; i++) {
    for(let j = 1; j <= word2.length; j++) {
      if(word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  return dp[word1.length][word2.length];
};
```

说明

> 另外一种做法：MAXLEN(a,b)-LCS(a,b)

## 零钱和背包（10%）

### [coin-change](https://leetcode-cn.com/problems/coin-change/)

> 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回  -1。

思路：和其他 DP 不太一样，i 表示钱或者容量

```javascript
var coinChange = function(coins, amount) {
  const len = amount + 1;
  const dp = Array(len).fill(len);
  dp[0] = 0;
  for(let i = 1; i < len; i++) {
    for(const coin of coins) {
      if(i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}
```

注意

> dp[i-a[j]] 决策 a[j]是否参与

## 练习

Matrix DP (10%)

- [ ] [triangle](https://leetcode-cn.com/problems/triangle/)
- [ ] [minimum-path-sum](https://leetcode-cn.com/problems/minimum-path-sum/)
- [ ] [unique-paths](https://leetcode-cn.com/problems/unique-paths/)
- [ ] [unique-paths-ii](https://leetcode-cn.com/problems/unique-paths-ii/)

Sequence (40%)

- [ ] [climbing-stairs](https://leetcode-cn.com/problems/climbing-stairs/)
- [ ] [jump-game](https://leetcode-cn.com/problems/jump-game/)
- [ ] [jump-game-ii](https://leetcode-cn.com/problems/jump-game-ii/)
- [ ] [palindrome-partitioning-ii](https://leetcode-cn.com/problems/palindrome-partitioning-ii/)
- [ ] [longest-increasing-subsequence](https://leetcode-cn.com/problems/longest-increasing-subsequence/)
- [ ] [word-break](https://leetcode-cn.com/problems/word-break/)

Two Sequences DP (40%)

- [ ] [longest-common-subsequence](https://leetcode-cn.com/problems/longest-common-subsequence/)
- [ ] [edit-distance](https://leetcode-cn.com/problems/edit-distance/)

Backpack & Coin Change (10%)

- [ ] [coin-change](https://leetcode-cn.com/problems/coin-change/)
- [ ] [backpack](https://www.lintcode.com/problem/backpack/description)
- [ ] [backpack-ii](https://www.lintcode.com/problem/backpack-ii/description)
