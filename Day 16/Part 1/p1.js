const checkLet = function (char) {
  if (parseInt(char) >= 0 && parseInt(char) <= 9) return parseInt(char);
  else {
    if (char == "A") return 10;
    if (char == "B") return 11;
    if (char == "C") return 12;
    if (char == "D") return 13;
    if (char == "E") return 14;
    if (char == "F") return 15;
  }
};

const convToBin = function (hexNum) {
  let str = "";
  const lookUp = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    10: "1010",
    11: "1011",
    12: "1100",
    13: "1101",
    14: "1110",
    15: "1111",
  };
  for (let i = 0; i < hexNum.length; i++) {
    str += lookUp[checkLet(hexNum[i])];
  }
  return str;
};
//--------------------------------Conversion from hex to bin----------------------------------
const fileSystem = require("fs");
const { off } = require("process");

const data = fileSystem.readFileSync("data.txt", "utf8");

const binToDec = function (str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += Math.pow(2, str.length - i - 1) * str[i];
  }
  return sum;
};

const checkID = function (str) {
  return binToDec(str);
};

const checkTypeID = function (str) {
  return binToDec(str) == 4;
};
//-----------------------------------------------------------------------------
const typeFour = function (str, i) {
  let tmp = "";
  while (1) {
    if (str[i] == 0) {
      //tmp += str.substring(i + 1, i + 5);
      //console.log(tmp);
      //console.log(binToDec(tmp));
      return i + 5;
    } //return i;{
    else {
      //tmp += str.substring(i + 1, i + 5);
      i += 5;
    }
  }
};

let val = convToBin(data);

let i = 0;
let sumOfId = 0;
let index;
let numOfSubPack = 0;

while (1) {
  sumOfId += checkID(val.substring(i, i + 3));
  //console.log(checkID(val.substring(i, i + 3)));
  if (checkTypeID(val.substring(i + 3, i + 6))) {
    i = typeFour(val, i + 6);
  } else {
    i += 6;
    if (val[i] == 0) {
      numOfSubPack = convToBin(val.substring(i, i + 15));
      i += 16;
    } else {
      numOfSubPack = convToBin(val.substring(i, i + 11));
      i += 12;
    }
  }
  if (val.substring(i, i + 11).length < 11) break;
}

console.log(sumOfId);
