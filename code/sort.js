// 递归
// const merger = (arr1, arr2) => {
//   const m = arr1.length, n = arr2.length;
//   let i = 0, j = 0;
//   const result = [];
//   while(i < m && j < n) {
//     if(arr1[i] > arr2[j]) {
//       result.push(arr2[j++]);
//     } else {
//       result.push(arr1[i++]);
//     }
//   }
//   while(i < m) {
//     result.push(arr1[i++]);
//   }
//   while(j < n) {
//     result.push(arr2[j++]);
//   }
//   return result;
// }
// const mergeSort = arr => {
//   if(arr.length < 2) {
//     return arr;
//   }
//   const mid = Math.floor(arr.length / 2);
//   return merger(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
// }

// 迭代
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
console.log(mergeSort([5,3,6,7,2,1,4,3,9,0,7,4]));