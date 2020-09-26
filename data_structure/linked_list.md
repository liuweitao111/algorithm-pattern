# 链表

## 基本技能

链表相关的核心点

- null/nil 异常处理
- dummy node 哑巴节点
- 快慢指针
- 插入一个节点到排序链表
- 从一个链表中移除一个节点
- 翻转链表
- 合并两个链表
- 找到链表的中间节点

## 常见题型

### [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

> 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

```javascript
var deleteDuplicates = function(head) {
  let current = head;
  while(current && current.next) {
    if(current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};
```

### [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

> 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中   没有重复出现的数字。

思路：链表头结点可能被删除，所以用 dummy node 辅助删除

```javascript
var deleteDuplicates = function(head) {
  const dummy = new ListNode(null);
  dummy.next = head;
  let curr = dummy;
  while(curr.next && curr.next.next) {
    if(curr.next.val === curr.next.next.val) {
      const rmVal = curr.next.val;
      while(curr.next && curr.next.val === rmVal) {
        curr.next = curr.next.next;
      }
    } else {
      curr = curr.next;
    }
  }
  return dummy.next;
};
```

注意点
• A->B->C 删除 B，A.next = C
• 删除用一个 Dummy Node 节点辅助（允许头节点可变）
• 访问 X.next 、X.value 一定要保证 X != null

### [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)

> 反转一个单链表。

思路：用一个 prev 节点保存向前指针，temp 保存向后的临时指针

```javascript
var reverseList = function(head) {
  let prev = null;
  while(head) {
    // 保存当前head.Next节点，防止重新赋值后被覆盖
    // 一轮之后状态：nil<-1 2->3->4
    //              prev   head
    const temp = head.next;
    head.next = prev;
    prev = head;
    head = temp;
  }
  return prev;
};
```

### [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

> 反转从位置  *m*  到  *n*  的链表。请使用一趟扫描完成反转。

思路：先遍历到 m 处，翻转，再拼接后续，注意指针处理

```javascript
var reverseBetween = function (head, m, n) {
  if (!head) {
    return head;
  }
  // 思路：先遍历到m处，翻转，再拼接后续，注意指针处理
  // 输入: 1->2->3->4->5->null, m = 2, n = 4
  const dummy = new ListNode(0);
  dummy.next = head;
  head = dummy;
  let i = 0;
  let pre;
  // 最开始：0->1->2->3->4->5->null
  while (i < m) {
    pre = head;
    head = head.next;
    i++;
  }
  // 遍历之后： 1(pre)->2(head)->3->4->5->null
  // i = 1
  let next;
  // 用于中间节点连接
  let mid = head;
  while (head !== null && i <= n) {
    // 第一次循环： 1 nil<-2 3->4->5->null
    const temp = head.next;
    head.next = next;
    next = head;
    head = temp;
    i++;
  }
  // 循环需要执行四次
  // 循环结束：1 null<-2<-3<-4 5(head)->null
  pre.next = next;
  mid.next = head;
  return dummy.next;
};
```

### [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

思路：通过 dummy node 链表，连接各个元素

```javascript
var mergeTwoLists = function(l1, l2) {
  const dummy = new ListNode();
  let head = dummy;
  while(l1 && l2) {
    if(l1.val < l2.val) {
      head.next = l1;
      head = head.next;
      l1 = l1.next;
    } else {
      head.next = l2;
      head = head.next;
      l2 = l2.next;
    }
  }
  head.next = l1 ? l1 : l2;
  return dummy.next;
};
```

### [partition-list](https://leetcode-cn.com/problems/partition-list/)

> 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于  *x*  的节点都在大于或等于  *x*  的节点之前。

思路：将大于 x 的节点，放到另外一个链表，最后连接这两个链表

```javascript
var partition = function(head, x) {
  const headDummy = new ListNode();
  const tailDummy = new ListNode();
  let headNode = headDummy;
  let tailNode = tailDummy;
  while(head) {
    if(head.val < x) {
      headNode.next = head;
      headNode = headNode.next;
    } else {
      tailNode.next = head;
      tailNode = tailNode.next;
    }
    head = head.next;
  }
  headNode.next = tailDummy.next;
  tailNode.next = null;
  return headDummy.next;
}
```

哑巴节点使用场景

> 当头节点不确定的时候，使用哑巴节点

### [sort-list](https://leetcode-cn.com/problems/sort-list/)

> 在  *O*(*n* log *n*) 时间复杂度和常数级空间复杂度下，对链表进行排序。

思路：归并排序，找中点和合并操作

迭代版
```javascript
var sortList = function(head) {
  let h = head;
  let length = 0;
  // 统计长度
  while(h !== null) {
    h = h.next;
    length++;
  }
  //设置头指针，保存head
  const root = new ListNode(); 
  root.next = head;
  // 依次增加归并排序归并的链表长度
  for(let seg = 1; seg < length; seg *= 2) {
    let temp = root;
    h = root.next;
    while(h !== null) {
      // 切割出第一段有序链表，链表的头部保存的到h1
      let i = seg;
      let h1 = h; 
      while(i > 0 && h !== null) {
        i--;
        h = h.next;
      }
      // 如果第一段的长度不足interval，则不需要合并，直接跳出
      if(i > 0) {
        break;
      }
      // 切割出第二段有序链表，链表的头部保存的到h2
      i = seg;
      let h2 = h; 
      while(i > 0 && h !== null) {
        i--;
        h = h.next;
      }
      let l1 = seg; // 第一段有序链表的长度
      let l2 = seg - i; // 第二段有序链表的长度
      // 合并两段有序链表
      while(l1 > 0 && l2 > 0) {
        if(h1.val < h2.val) {
          temp.next = h1;
          h1 = h1.next;
          l1--;
        } else {
          temp.next = h2;
          h2 = h2.next;
          l2--;
        }
        temp = temp.next;
      }
      temp.next = l1 === 0 ? h2 : h1;
      while(l1 > 0 || l2 > 0) {
        temp = temp.next;
        l1--;
        l2--;
      }
      temp.next = h;
    }
  }
  return root.next;
};
```
递归版
```javascript
const findMid = head => {
  let slow = head;
  let fast = head.next;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}
const merge = (l1, l2) => {
  const root = new ListNode();
  let next = root;
  while(l1 && l2) {
    if(l1.val < l2.val) {
      next.next = l1;
      l1 = l1.next;
    } else {
      next.next = l2;
      l2 = l2.next;
    }
    next = next.next;
  }
  next.next = l1 ? l1 : l2;
  return root.next;
}
const mergeSort = head => {
  if(!head || !head.next) {
    return head;
  }
  const mid = findMid(head);
  const tail = mid.next;
  mid.next = null;
  const result = merge(mergeSort(head), mergeSort(tail));
  return result;
}
var sortList = function(head) {
  return mergeSort(head);
};
```

注意点

- 快慢指针 判断 fast 及 fast.Next 是否为 nil 值
- 递归 mergeSort 需要断开中间节点
- 递归返回条件为 head 为 nil 或者 head.Next 为 nil

### [reorder-list](https://leetcode-cn.com/problems/reorder-list/)

> 给定一个单链表  *L*：*L*→*L*→…→*L\_\_n*→*L*
> 将其重新排列后变为： *L*→*L\_\_n*→*L*→*L\_\_n*→*L*→*L\_\_n*→…

思路：找到中点断开，翻转后面部分，然后合并前后两个链表

```javascript
var reorderList = function(head) {
  if(!head) {
    return;
  }
  // 寻找中点
  let fast = head.next;
  let slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let h = slow.next
  slow.next = null;
  // 翻转链表
  const h1 = new ListNode();
  while(h) {
    const tmp = h1.next;
    const next = h.next;
    h1.next = h;
    h1.next.next = tmp;
    h = next;
  }
  // 合并两个链表
  h = h1.next;
  while(head && h) {
    const tmp1 = head.next;
    const tmp2 = h.next;
    head.next = h;
    head.next.next = tmp1;
    head = tmp1;
    h = tmp2;
  }
};
```

### [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)

> 给定一个链表，判断链表中是否有环。

思路：快慢指针，快慢指针相同则有环，证明：如果有环每走一步快慢指针距离会减 1
![fast_slow_linked_list](https://img.fuiboom.com/img/fast_slow_linked_list.png)

```javascript
var hasCycle = function(head) {
  let fast = head;
  let slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if(fast === slow) {
      return true;
    }
  }
  return false;
};
```

### [linked-list-cycle-ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

> 给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  `null`。

思路：快慢指针，快慢相遇之后，慢指针回到头，快慢指针步调一致一起移动，相遇点即为入环点
![cycled_linked_list](https://img.fuiboom.com/img/cycled_linked_list.png)

```javascript
var detectCycle = function(head) {
  // 思路：快慢指针，快慢相遇之后，慢指针回到头，快慢指针步调一致一起移动，相遇点即为入环点
  if(!head) {
    return null;
  }
  let fast = head.next;
  let slow = head;
  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if(fast === slow) {
      // 慢指针重新从头开始移动，快指针从第一次相交点下一个节点开始移动
      fast = head
      slow = slow.next // 注意
      while(fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return slow;
    }
  }
  return null;
};
```

坑点

- 指针比较时直接比较对象，不要用值比较，链表中有可能存在重复值情况
- 第一次相交后，快指针需要从下一个节点开始和头指针一起匀速移动

另外一种方式是 fast=head,slow=head

```javascript
var detectCycle = function(head) {
    let pre = head;
    let fast = head;
    let slow = head;
    while(fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if(fast === slow) {
        while(pre !== slow) {
          pre = pre.next;
          slow = slow.next;
        }
        return slow;
      }
    }
    return null;
};
```

这两种方式不同点在于，**一般用 fast=head.next 较多**，因为这样可以知道中点的上一个节点，可以用来删除等操作。

- fast 如果初始化为 head.next 则中点在 slow.next
- fast 初始化为 head,则中点在 slow

### [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)

> 请判断一个链表是否为回文链表。

```javascript
var reverse = function(head) {
  const root = new ListNode();
  let n = head;
  while(n) {
    const tmp = n.next;
    n.next = root.next;
    root.next = n;
    n = tmp;
  }
  return root.next;
}

var isPalindrome = function(head) {
  let slow = head;
  let fast = head;

  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 翻转链表
  const middle = reverse(slow);
  let flag = true;
  let n1 = head; 
  let n2 = middle;
  while(n1 && n2) {
    if(n1.val !== n2.val) {
      flag = false;
      break;
    }
    n1 = n1.next;
    n2 = n2.next;
  }
  // 将链表翻转回去
  reverse(middle);
  return flag;
};
```

### [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

> 给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。
> 要求返回这个链表的 深拷贝。

思路： 1、在链表的每个节点后面添加一个克隆的节点 2、根据原来节点的random，为克隆节点添加random 3、分割链表
```javascript
var copyRandomList = function(head) {
  if(!head) {
    return head;
  }
  let prev = head;
  // Creating a new weaved list of original and copied nodes.
  while(prev) {
    // Cloned node
    const cloneNode = new Node(prev.val);
    // Inserting the cloned node just next to the original node.
    // If A->B->C is the original linked list,
    // Linked list after weaving cloned nodes would be A->A'->B->B'->C->C'
    cloneNode.next = prev.next;
    prev.next = cloneNode;
    prev = prev.next.next;
  }
  prev = head;
  // Now link the random pointers of the new nodes created.
  // Iterate the newly created list and use the original nodes' random pointers,
  // to assign references to random pointers for cloned nodes.
  while(prev) {
    prev.next.random = prev.random && prev.random.next;
    prev = prev.next.next;
  }
  prev = head;
  // Unweave the linked list to get back the original linked list and the cloned list.
  // i.e. A->A'->B->B'->C->C' would be broken to A->B->C and A'->B'->C'
  const cloneHead = new Node(); // A'->B'->C'
  let clonePrev = cloneHead;
  while(prev) {
    // Add cloned node to new linked list
    clonePrev.next = prev.next;
    // Delete cloned node pointers in original node
    prev.next = prev.next.next;
    
    prev = prev.next;
    clonePrev = clonePrev.next;
  }
  clonePrev.next = null;
  return cloneHead.next;
};
```

## 总结

链表必须要掌握的一些点，通过下面练习题，基本大部分的链表类的题目都是手到擒来~

- null/nil 异常处理
- dummy node 哑巴节点
- 快慢指针
- 插入一个节点到排序链表
- 从一个链表中移除一个节点
- 翻转链表
- 合并两个链表
- 找到链表的中间节点

## 练习

- [ ] [remove-duplicates-from-sorted-list](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)
- [ ] [remove-duplicates-from-sorted-list-ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)
- [ ] [reverse-linked-list](https://leetcode-cn.com/problems/reverse-linked-list/)
- [ ] [reverse-linked-list-ii](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
- [ ] [merge-two-sorted-lists](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [ ] [partition-list](https://leetcode-cn.com/problems/partition-list/)
- [ ] [sort-list](https://leetcode-cn.com/problems/sort-list/)
- [ ] [reorder-list](https://leetcode-cn.com/problems/reorder-list/)
- [ ] [linked-list-cycle](https://leetcode-cn.com/problems/linked-list-cycle/)
- [ ] [linked-list-cycle-ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
- [ ] [palindrome-linked-list](https://leetcode-cn.com/problems/palindrome-linked-list/)
- [ ] [copy-list-with-random-pointer](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)
