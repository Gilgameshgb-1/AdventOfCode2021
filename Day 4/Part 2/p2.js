const fileSystem = require("fs"); //Including file system library

function listToMatrix(list, elementsPerSubArray) {
  let matrix = new Array(),
    i,
    k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

function makeEmptyMatrix() {
  let matrixEmpty = new Array();
  for (let i = 0; i < 5; i++) {
    let temp = [0, 0, 0, 0, 0];
    matrixEmpty.push(temp);
  }
  return matrixEmpty;
}

const lines = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split("\n\r")
  .filter((x) => Boolean(x))
  .map((x) =>
    x
      .replace(/[\r\n ,]+/g, " ")
      .trim()
      .split(" ")
      .map((y) => parseInt(y))
  );

let [drawnNumbers, ...cards] = lines;

let arrMatrix = new Array();

let globalCardCount = 0;
let globalX = 0;

//-------------------------class-------------------------
class bingoCard {
  matrixVal;
  matrixHit;
  didItWin;
  constructor(mat) {
    this.matrixVal = mat;
    this.matrixHit = makeEmptyMatrix();
    this.didItWin = false;
  }
  getMatrixVal() {
    return this.matrixVal;
  }
  getMatrixHit() {
    return this.matrixHit;
  }
  showMatrixVal() {
    for (let i = 0; i < this.matrixVal.length; i++) {
      console.log(this.matrixVal[i]);
    }
  }
  checkForNumber(x, index) {
    if (this.didItWin != true) {
      for (let i = 0; i < this.matrixVal.length; i++) {
        for (let j = 0; j < this.matrixVal.length; j++) {
          if (x == this.matrixVal[i][j]) {
            this.matrixHit[i][j] = 1;
          }
        }
      }
      if (this.checkForBingo() == true) {
        this.didItWin = true;
        globalCardCount = index;
        globalX = x;
      }
    }
  }
  checkForBingoRow() {
    for (let i = 0; i < this.matrixHit.length; i++) {
      let flag = false;
      for (let j = 0; j < this.matrixHit.length - 1; j++) {
        if (
          this.matrixHit[i][j] == this.matrixHit[i][j + 1] &&
          this.matrixHit[i][j + 1] == 1 &&
          this.matrixHit[i][0] == this.matrixHit[i][j + 1]
        ) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag == true) {
        return true;
      }
    }
    return false;
  }
  checkForBingoColumn() {
    for (let i = 0; i < this.matrixHit.length; i++) {
      let flag = false;
      for (let j = 0; j < this.matrixHit.length - 1; j++) {
        if (
          this.matrixHit[j][i] == this.matrixHit[j + 1][i] &&
          this.matrixHit[j + 1][i] == 1 &&
          this.matrixHit[0][i] == this.matrixHit[j + 1][i]
        ) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag == true) {
        return true;
      }
    }
    return false;
  }
  checkForBingo() {
    return this.checkForBingoRow() || this.checkForBingoColumn();
  }
  sumOfRemains() {
    let sumOfRemains = 0;
    for (let i = 0; i < this.matrixVal.length; i++) {
      for (let j = 0; j < this.matrixVal.length; j++) {
        if (this.matrixHit[i][j] == 0) {
          sumOfRemains += this.matrixVal[i][j];
        }
      }
    }
    console.log("The final score is: ", sumOfRemains * globalX);
  }
}
//-------------------------class-------------------------

for (i = 0; i < cards.length; i++) {
  let card = new bingoCard(listToMatrix(cards[i], 5));
  arrMatrix.push(card);
}

for (let i = 0; i < drawnNumbers.length; i++) {
  let flag = false;
  for (let j = 0; j < arrMatrix.length; j++) {
    arrMatrix[j].checkForNumber(drawnNumbers[i], j);
  }
}

console.log("Last bingo reached, winning card: ", globalCardCount + 1);
arrMatrix[globalCardCount].sumOfRemains();
