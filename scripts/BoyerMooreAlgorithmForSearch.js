/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let n = haystack.length;
  let m = needle.length;
  function badCharHeuristic(string, size) {
    const badChar = new Array(256).fill(-1, 0, 256);
    for (let i = 0; i < size; i++) {
      badChar[string[i].charCodeAt()] = i;
    }
    return badChar;
  }
  const badChar = badCharHeuristic(needle, m);
  // 偏移量
  let s = 0;

  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && haystack[s + j] === needle[j]) {
      // 若相等，则指针继续向前比较
      j -= 1;
    }
    if (j < 0) {
      // j < 0说明字符串完全匹配，上面的while循环将j变成了-1，此时的s就是匹配到的位置
      console.log("Pattern occur at shift " + s);
      // 但还会有更多的匹配项，所以要继续向后移动
      s = s + (s + m < n ? m - badChar[haystack[s + m].charCodeAt()] : 1);
    } else {
      // j >= 0，说明不完全匹配或者不匹配，后移位数 = 坏字符在搜索词的位置 - 搜索词中的第一次出现坏字符的位置
      // 如果坏字符不包含在搜索词之中，则上一次出现位置为-1
      // 算法中，j 就是当前搜索到坏字符时搜索词的索引
      // haystack[s + j]为坏字符
      // badChar[haystack[s + j].charCodeAt()]可以判断坏字符是否在搜索词中，不在则返回-1，存在返回索引值
      // console.log(s + j);
      // console.log(haystack[s + j]);
      // console.log(badChar[haystack[s + j].charCodeAt()]);
      s += Math.max(1, j - badChar[haystack[s + j].charCodeAt()]);
    }
  }
  return -1;
};

const haystack = "heollllo";
const needle = "ll";
strStr(haystack, needle);
