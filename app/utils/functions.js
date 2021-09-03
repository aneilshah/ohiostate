export {nflPage, properCase, thisYear};


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

function thisYear(){
  var d = new Date();
  return d.getFullYear();
}

function nflPage(player){
  //https://www.nfl.com/players/justin-fields/
  let domain = 'http://www.nfl.com/players/'
  let page = '/stats/career';
  return domain+player+page;
}
