const arrayContains = require("./arrayContains");

//if length is less than 3 - [1,2] return empty arr
function everyThird(data){
  if(data.length < 3){
    return [];
  }
  //start at index of 2 - third value, and 
  //go through the data taking every 3rd value
  for(let i = 2; i < data.length; i+=3){
    console.log(data[i]);
  }
}

//need index 2, 5, 8 for every thrid value


module.exports = everyThird(arrayContains);

