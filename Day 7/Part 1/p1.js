const fileSystem = require("fs");

const data = fileSystem
  .readFileSync("data.txt", "utf8")
  .split(",")
  .map((x) => parseInt(x));

data.sort(function (a, b) {
  return a - b;
});

let median = data[parseInt((data.length - 1) / 2)];
let fuelSum = 0;

for (let i = 0; i < data.length; i++) {
  let fuel = 0;
  if (data[i] != median) fuel = Math.abs(median - data[i]);
  fuelSum += fuel;
}

console.log("Part 1 of the solution: ", fuelSum);
//The idea is that since after counting and showing all numbers in our data divided into categories (i divided them in categories of a 100)
//e.g. [0, 100] ; [100, 200]
//Since the large amount of outliers the best choice for choosing which will be the smallest use of fuel is definetely the median.
