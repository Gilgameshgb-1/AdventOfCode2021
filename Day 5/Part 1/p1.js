const fs = require("fs");

const str = fs.readFileSync("data.txt", "utf8").split("\n");

let arrData = new Array();

for (let i = 0; i < str.length; i++) {
  arrData.push(
    str[i]
      .trim()
      .split("->")
      .map((x) => x.split(",").map((y) => parseInt(y)))
  );
} //loading the input, however we have to access stuff as arrData[row(0,max)][pair(0,1)][val(0,1)]

function makeEmptyMatrix() {
  let matrixEmpty = new Array();
  for (let i = 0; i < 1000; i++) {
    let temp = new Array(1000).fill(0);
    matrixEmpty.push(temp);
  }
  return matrixEmpty;
}

mat = makeEmptyMatrix();

let updateLines = function (x1, y1, x2, y2) {
  if (x1 == x2) {
    let min = Math.min(y1, y2);
    let max = Math.max(y1, y2);
    for (let i = min; i <= max; i++) {
      mat[x1][i]++;
    }
  } else if (y1 == y2) {
    let min = Math.min(x1, x2);
    let max = Math.max(x1, x2);
    for (let i = min; i <= max; i++) {
      mat[i][y1]++;
    }
  }
};

const countOccurences = function () {
  let c = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] >= 2) c++;
    }
  }
  return c;
};

for (let i = 0; i < arrData.length; i++) {
  x1 = arrData[i][0][0];
  x2 = arrData[i][1][0];
  y1 = arrData[i][0][1];
  y2 = arrData[i][1][1];
  updateLines(x1, y1, x2, y2);
}

console.log("Number of occurences: ", countOccurences());
