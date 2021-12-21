const fileSystem = require("fs");

const data = fileSystem.readFileSync("data.txt", "utf8").split("\n");

let arrData = new Array();
let arrNotes = new Array();
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] == "|") {
      arrData.push(data[i].substring(j + 2).split(" "));
      arrNotes.push(data[i].substring(0, j - 1).split(" "));
    }
  }
}

for (let i = 0; i < arrData.length; i++) {
  arrData[i][3] = arrData[i][3].trim();
} //removing extra \r

var sortAlphabet = function (text) {
  return text.split("").sort().join("");
};

let c = 0;
let cmplSum = 0;
for (let i = 0; i < arrNotes.length; i++) {
  let arrOfDigitCodes = new Array(10).fill("");
  for (let j = 0; j < arrNotes[i].length; j++) {
    if (arrNotes[i][j].length == 2) {
      //one
      arrOfDigitCodes[1] = arrNotes[i][j];
    } else if (arrNotes[i][j].length == 4) {
      //four
      arrOfDigitCodes[4] = arrNotes[i][j];
    } else if (arrNotes[i][j].length == 3) {
      //seven
      arrOfDigitCodes[7] = arrNotes[i][j];
    } else if (arrNotes[i][j].length == 7) {
      //eight
      arrOfDigitCodes[8] = arrNotes[i][j];
    }
  }
  //lets first check the 5 digit things
  //lets first intersect 1,4
  let L = "";
  for (let p = 0; p < 4; p++) {
    if (!arrOfDigitCodes[1].includes(arrOfDigitCodes[4][p]))
      L += arrOfDigitCodes[4][p];
  } //This part definetely works
  //Now we search for 5 segment stuff
  let tempArr = new Array(); //we will keep our strings here
  for (let p = 0; p < arrNotes[i].length; p++) {
    if (arrNotes[i][p].length == 5) tempArr.push(arrNotes[i][p]);
  } //This also works
  //Now we can check for intersections
  for (let p = 0; p < tempArr.length; p++) {
    //first compare for L
    if (tempArr[p].includes(L[0]) && tempArr[p].includes(L[1])) {
      arrOfDigitCodes[5] = tempArr[p];
    }
  } //This recovers the number 5
  tempArr = tempArr.filter((e) => e !== arrOfDigitCodes[5]);
  for (let p = 0; p < tempArr.length; p++) {
    if (
      tempArr[p].includes(arrOfDigitCodes[1][0]) &&
      tempArr[p].includes(arrOfDigitCodes[1][1])
    ) {
      arrOfDigitCodes[3] = tempArr[p];
    } else {
      arrOfDigitCodes[2] = tempArr[p];
    }
  } //Seems okay thus far, we now have to solve for 6,9,0
  tempArr = [];
  for (let p = 0; p < arrNotes[i].length; p++) {
    if (arrNotes[i][p].length == 6) tempArr.push(arrNotes[i][p]);
  }
  for (let p = 0; p < tempArr.length; p++) {
    //first compare for L
    if (
      tempArr[p].includes(arrOfDigitCodes[4][0]) &&
      tempArr[p].includes(arrOfDigitCodes[4][1]) &&
      tempArr[p].includes(arrOfDigitCodes[4][2]) &&
      tempArr[p].includes(arrOfDigitCodes[4][3])
    )
      arrOfDigitCodes[9] = tempArr[p];
  } //We found 9
  tempArr = tempArr.filter((e) => e !== arrOfDigitCodes[9]);
  for (let p = 0; p < tempArr.length; p++) {
    if (tempArr[p].includes(L[0]) && tempArr[p].includes(L[1])) {
      arrOfDigitCodes[6] = tempArr[p];
    } else {
      arrOfDigitCodes[0] = tempArr[p];
    }
  }
  let sumTmp = 0;
  //need to sort both the input and the segments first
  for (let p = 0; p < arrOfDigitCodes.length; p++) {
    arrOfDigitCodes[p] = sortAlphabet(arrOfDigitCodes[p]);
  }
  for (let p = 0; p < arrData[i].length; p++) {
    arrData[i][p] = sortAlphabet(arrData[i][p]);
  }
  for (let p = 0; p < arrData[i].length; p++) {
    let tmpOperand = 0;
    for (let q = 0; q < arrOfDigitCodes.length; q++) {
      if (arrOfDigitCodes[q] == arrData[i][p]) {
        tmpOperand = q;
      }
    }
    sumTmp *= 10;
    sumTmp += tmpOperand;
  }
  cmplSum += sumTmp;
}
console.log("The full sum of all decoded numbers is: ", cmplSum);
