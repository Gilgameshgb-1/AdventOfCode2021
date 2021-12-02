const fileSystem = require("fs"); //Including file system library

const data = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split("\n");

// /console.log(data);

let Y = 0;
let X = 0;

let aim = 0;

for (let i = 0; i < data.length; i++) {
  if (data[i].includes("forward")) {
    let temp = parseInt(data[i].match(/\d+/)[0], 10);
    X += temp;
    Y += aim * temp;
  } else if (data[i].includes("down")) {
    aim += parseInt(data[i].match(/\d+/)[0], 10);
  } else if (data[i].includes("up")) {
    aim -= parseInt(data[i].match(/\d+/)[0], 10);
  }
}

console.log("Horizontal position: ", X);
console.log("Vertical position: ", Y);

console.log(
  "The product of the horizontal depth and the vertical depth is: ",
  X * Y
);
