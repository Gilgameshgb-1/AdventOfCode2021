const fileSystem = require("fs"); //Including file system library

const data = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split("\n");

let dataParsed = new Array();

for (let i = 0; i < data.length; i++) {
  dataParsed.push(data[i].trim());
}

let mat = new Array();

for (let i = 0; i < data.length; i++) {
  mat.push(dataParsed[i].split("").map((x) => parseInt(x)));
}
//Above is the code for reading in the input
//first we cover edges, then corners (only 4) then we cover the middle things, a bunch of ifs

let arrOfRisk = new Array();

for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i].length; j++) {
    if (i == 0 && j != 0 && j < mat[i].length - 1) {
      if (
        mat[i][j] < mat[i][j - 1] &&
        mat[i][j] < mat[i][j + 1] &&
        mat[i][j] < mat[i + 1][j]
      )
        arrOfRisk.push(mat[i][j]);
    } else if (j == 0 && i != 0 && i < mat.length - 1) {
      if (
        mat[i][j] < mat[i + 1][j] &&
        mat[i][j] < mat[i - 1][j] &&
        mat[i][j] < mat[i][j + 1]
      )
        arrOfRisk.push(mat[i][j]);
    } else if (i == mat.length - 1 && j != 0 && j < mat[i].length - 1) {
      if (
        mat[i][j] < mat[i][j - 1] &&
        mat[i][j] < mat[i][j + 1] &&
        mat[i][j] < mat[i - 1][j]
      )
        arrOfRisk.push(mat[i][j]);
    } else if (j == mat[i].length - 1 && i != 0 && i < mat.length - 1) {
      if (
        mat[i][j] < mat[i - 1][j] &&
        mat[i][j] < mat[i + 1][j] &&
        mat[i][j] < mat[i][j - 1]
      ) {
        arrOfRisk.push(mat[i][j]);
      }
    } else if (i == 0 && j == 0) {
      if (mat[i][j] < mat[1][0] && mat[i][j] < mat[0][1]) {
        arrOfRisk.push(mat[i][j]);
        //console.log("hit");
      }
    } else if (i == mat.length - 1 && j == 0) {
      if (
        mat[i][j] < mat[mat.length - 2][0] &&
        mat[i][j] < mat[mat.length - 1][1]
      ) {
        arrOfRisk.push(mat[i][j]);
        //console.log("hit");
      }
    } else if (j == mat[i].length - 1 && i == 0) {
      if (
        mat[i][j] < mat[0][mat[i].length - 2] &&
        mat[i][j] < mat[1][mat[i].length - 1]
      ) {
        arrOfRisk.push(mat[i][j]);
        //console.log("hit");
      }
    } else if (i == mat.length - 1 && j == mat[i].length - 1) {
      if (mat[i][j] < mat[i - 1][j] && mat[i][j] < mat[i][j - 1]) {
        arrOfRisk.push(mat[i][j]);
        //console.log("hit");
      }
    } else {
      if (
        mat[i][j] < mat[i + 1][j] &&
        mat[i][j] < mat[i][j + 1] &&
        mat[i][j] < mat[i][j - 1] &&
        mat[i][j] < mat[i - 1][j]
      ) {
        arrOfRisk.push(mat[i][j]);
        //console.log("hit");
      }
    }
  }
}

console.log(arrOfRisk);

for (let i = 0; i < arrOfRisk.length; i++) {
  arrOfRisk[i] += 1;
}

let sum = arrOfRisk.reduce((prev, curr) => prev + curr);
console.log(sum);
