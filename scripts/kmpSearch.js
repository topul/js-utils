/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let n = haystack.length;
  let m = needle.length;
  let i = 0;
  let j = 0;
  const next = ((s) => {
    const next = [-1];
    let i = 0;
    let j = -1;
    while (i < s.length) {
      if (j === -1 || s[i] === s[j]) {
        ++i;
        ++j;
        next[i] = j;
      } else {
        j = next[j];
      }
    }
    return next;
  })(needle);
  while (i < n && j < m) {
    if (j === -1 || haystack[i] === needle[j]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }
  if (j === m) {
    return i - j;
  } else {
    return -1;
  }
};

const haystack = "ababababca";
const needle = "bc";
console.log(strStr(haystack, needle));
