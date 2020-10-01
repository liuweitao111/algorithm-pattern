# 排序

## 常考排序

### 快速排序

```go
func QuickSort(nums []int) []int {
    // 思路：把一个数组分为左右两段，左段小于右段
    quickSort(nums, 0, len(nums)-1)
    return nums

}
// 原地交换，所以传入交换索引
func quickSort(nums []int, start, end int) {
    if start < end {
        // 分治法：divide
        pivot := partition(nums, start, end)
        quickSort(nums, 0, pivot-1)
        quickSort(nums, pivot+1, end)
    }
}
// 分区
func partition(nums []int, start, end int) int {
    // 选取最后一个元素作为基准pivot
    p := nums[end]
    i := start
    // 最后一个值就是基准所以不用比较
    for j := start; j < end; j++ {
        if nums[j] < p {
            swap(nums, i, j)
            i++
        }
    }
    // 把基准值换到中间
    swap(nums, i, end)
    return i
}
// 交换两个元素
func swap(nums []int, i, j int) {
    t := nums[i]
    nums[i] = nums[j]
    nums[j] = t
}
```

### 归并排序

递归版
```javascript
const merger = (arr1, arr2) => {
  const m = arr1.length, n = arr2.length;
  let i = 0, j = 0;
  const result = [];
  while(i < m && j < n) {
    if(arr1[i] > arr2[j]) {
      result.push(arr2[j++]);
    } else {
      result.push(arr1[i++]);
    }
  }
  while(i < m) {
    result.push(arr1[i++]);
  }
  while(j < n) {
    result.push(arr2[j++]);
  }
  return result;
}
const mergeSort = arr => {
  if(arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  return merger(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}
```

迭代版
```javascript
const mergeSort = arr => {
  const len = arr.length;
  for(let seg = 1; seg < len; seg *= 2) {
    let temp = [];
    for(let start = 0; start < len; start += seg * 2) {
      const mid = Math.min(start + seg, len);
      let start1 = start, start2 = mid;
      const end1 = mid, end2 = Math.min(start + seg * 2, len);
      let k = start1;
      while(start1 < end1 && start2 < end2) {
        temp[k++] = arr[start1] > arr[start2] ? arr[start2++] : arr[start1++];
      }
      while(start1 < end1) {
        temp[k++] = arr[start1++];
      }
      while(start2 < end2) {
        temp[k++] = arr[start2++];
      }
    }
    arr = temp;
  }
  return arr;
}
```
```go
func MergeSort(nums []int) []int {
    return mergeSort(nums)
}
func mergeSort(nums []int) []int {
    if len(nums) <= 1 {
        return nums
    }
    // 分治法：divide 分为两段
    mid := len(nums) / 2
    left := mergeSort(nums[:mid])
    right := mergeSort(nums[mid:])
    // 合并两段数据
    result := merge(left, right)
    return result
}
func merge(left, right []int) (result []int) {
    // 两边数组合并游标
    l := 0
    r := 0
    // 注意不能越界
    for l < len(left) && r < len(right) {
        // 谁小合并谁
        if left[l] > right[r] {
            result = append(result, right[r])
            r++
        } else {
            result = append(result, left[l])
            l++
        }
    }
    // 剩余部分合并
    result = append(result, left[l:]...)
    result = append(result, right[r:]...)
    return
}
```

### 堆排序

用数组表示的完美二叉树 complete binary tree

> 完美二叉树 VS 其他二叉树

![image.png](https://img.fuiboom.com/img/tree_type.png)

[动画展示](https://www.bilibili.com/video/av18980178/)

![image.png](https://img.fuiboom.com/img/heap.png)

核心代码

```go
package main

func HeapSort(a []int) []int {
    // 1、无序数组a
	// 2、将无序数组a构建为一个大根堆
	for i := len(a)/2 - 1; i >= 0; i-- {
		sink(a, i, len(a))
	}
	// 3、交换a[0]和a[len(a)-1]
	// 4、然后把前面这段数组继续下沉保持堆结构，如此循环即可
	for i := len(a) - 1; i >= 1; i-- {
		// 从后往前填充值
		swap(a, 0, i)
		// 前面的长度也减一
		sink(a, 0, i)
	}
	return a
}
func sink(a []int, i int, length int) {
	for {
		// 左节点索引(从0开始，所以左节点为i*2+1)
		l := i*2 + 1
		// 有节点索引
		r := i*2 + 2
		// idx保存根、左、右三者之间较大值的索引
		idx := i
		// 存在左节点，左节点值较大，则取左节点
		if l < length && a[l] > a[idx] {
			idx = l
		}
		// 存在有节点，且值较大，取右节点
		if r < length && a[r] > a[idx] {
			idx = r
		}
		// 如果根节点较大，则不用下沉
		if idx == i {
			break
		}
		// 如果根节点较小，则交换值，并继续下沉
		swap(a, i, idx)
		// 继续下沉idx节点
		i = idx
	}
}
func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}

```

## 参考

[十大经典排序](https://www.cnblogs.com/onepixel/p/7674659.html)

[二叉堆](https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/er-cha-dui-xiang-jie-shi-xian-you-xian-ji-dui-lie)

## 练习

- [ ] 手写快排、归并、堆排序
