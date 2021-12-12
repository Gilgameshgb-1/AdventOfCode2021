const fileSystem = require("fs"); //Including file system library

const data = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split("\n");

let arrGama = new Array();
let arrEps = new Array();

for (let i = 0; i < data[i].length - 1; i++) {
  let numOfOne = 0;
  let numOfZero = 0;
  for (let j = 0; j < data.length; j++) {
    if (data[j][i] == 1) numOfOne++;
    else numOfZero++;
  }
  if (numOfOne > numOfZero) {
    arrGama.push(1);
    arrEps.push(0);
  } else {
    arrGama.push(0);
    arrEps.push(1);
  }
}

console.log(arrGama);
console.log(arrEps);

function convertToDecimal(arr) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num += Math.pow(2, i) * arr[arr.length - i - 1];
    //console.log(num);
  }
  return num;
}

console.log("Value of the Gamma", convertToDecimal(arrGama));
console.log("Value of the Eps", convertToDecimal(arrEps));
console.log(
  "The product of these 2 values is: ",
  convertToDecimal(arrGama) * convertToDecimal(arrEps)
);
