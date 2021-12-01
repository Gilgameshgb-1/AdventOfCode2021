const fileSystem = require('fs'); //Including file system library

const data = fileSystem.readFileSync('data.txt',{encoding: 'utf-8'}).split('\n').map(x => parseInt(x));//Loading data into array, taking it out by newline converting to Int

const newArr = [];

for(let i = 0; i < data.length; i++){
    let sum = 0;
    for(let j = i; j < i+3; j++){
        sum+=data[j];
    }
    newArr.push(sum);
}

let counter = 0;

for(let i = 1; i < newArr.length; i++){
    if (newArr[i-1] < newArr[i]) counter++;
}

console.log("Sum of three measurement sweep report: ",counter);