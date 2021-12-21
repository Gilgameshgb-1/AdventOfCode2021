const fileSystem = require("fs");

const data = fileSystem
  .readFileSync("data.txt", "utf8")
  .split(",")
  .map((x) => parseInt(x));

data.sort(function (a, b) {
  return a - b;
});

let mean = parseInt(
  data.reduce(function (a, b) {
    return a + b;
  }) / data.length
);

let fuelPart2Sum = 0;

const sumOfNum = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

for (let i = 0; i < data.length; i++) {
  let fuel = 0;
  if (data[i] != mean) {
    fuel = sumOfNum(Math.abs(mean - data[i]));
  }
  fuelPart2Sum += fuel;
}

console.log("Part 2 of the solution: ", fuelPart2Sum);
//Our data is still unevenly distributed but since the amount of fuel increases linearly with the amount of steps it takes to reach
//the value we decided for it's far better to use the mean since it will be more accurate in this scenario.
