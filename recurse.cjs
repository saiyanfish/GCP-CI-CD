function recurse(num, total) {
  if (num === 0) return total;
  //   total += num;
  //   num -= 1;
  return recurse(num - 1, total + num);
}

console.log(recurse(10, 0));

const a = Array.from({ length: 15 }, (_, i) => {
  return 30 - i;
});
console.log(a);

console.log(a.reduce((ps, val) => ps + val, 0));
