const fileSystem = require("fs"); //Including file system library

const data = fileSystem
  .readFileSync("data.txt", { encoding: "utf-8" })
  .split(",")
  .map((x) => parseInt(x));

let dataArray = new Array();
dataArray = data;
dataArray.sort();

let fishHistogram = new Array(9).fill(0);
for (let i = 0; i < data.length; i++) {
  fishHistogram[data[i]]++;
}

for (let i = 0; i < 256; i++) {
  let tmp0 = fishHistogram[0];
  let tmp1 = fishHistogram[1];
  let tmp2 = fishHistogram[2];
  let tmp3 = fishHistogram[3];
  let tmp4 = fishHistogram[4];
  let tmp5 = fishHistogram[5];
  let tmp6 = fishHistogram[6];
  let tmp7 = fishHistogram[7];
  let tmp8 = fishHistogram[8];
  fishHistogram[0] = tmp1;
  fishHistogram[1] = tmp2;
  fishHistogram[2] = tmp3;
  fishHistogram[3] = tmp4;
  fishHistogram[4] = tmp5;
  fishHistogram[5] = tmp6;
  fishHistogram[6] = tmp7 + tmp0;
  fishHistogram[7] = tmp8;
  fishHistogram[8] = tmp0;
}

let sum = 0;

for (let i = 0; i < fishHistogram.length; i++) {
  sum += fishHistogram[i];
}

console.log("Amount of lanternfish after 100 days: ", sum);
