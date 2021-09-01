export {properCase};


function properCase(str){
  // 1. lower case the whole string
  str = str.toLowerCase();

  // 2.Split the string into an array of strings
  str = str.split(' ');

  // 3. Upper Case the pieces
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }

  // 4. Join and Return
  return str.join(' ');
}

