const fileSystem = require('fs'); //Including file system library

const data = fileSystem.readFileSync('data.txt',{encoding: 'utf-8'}).split('\n').map(x => parseInt(x));//Loading data into array, taking it out by newline converting to Int

let counter = 0;

for(let i = 1; i < data.length; i++){
    if(data[i-1] < data[i]) counter++;
}

console.log("Sum of all measurements larger than the previous ones",counter);