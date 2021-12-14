const fileSystem = require("fs"); //Including file system library

const data = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split(",")
  .map((x) => parseInt(x));

let dataArray = new Array();
dataArray = data;

let counterOfEl = 0;

for (let j = 0; j < 80; j++) {
  counterOfEl = 0;
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i]--;
    if (dataArray[i] == -1) {
      dataArray[i] = 6;
      counterOfEl++;
    }
  }
  for (let z = 0; z < counterOfEl; z++) {
    dataArray.push(8);
  }
}

console.log("Amount of lanternfish after 80 days: ", dataArray.length);
