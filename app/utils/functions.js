export {nflPage, positions, properCase, ratings, thisYear, aneilRatings};


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

function aneilRatings() {
  return ['5-Favorite','4-Solid','3-Potential','2-Backup','1-Bench','0-TBD'];
}

function positions() {
  return ['RB','FB','QB','WR','TE','OL','DE','LB','CB','S','DL','K','P','KR','LS'];
}

function ratings() {
  return ['5-All Pro', '4-Star', '3-Starter','2-Backup', '1-Bench', '0-DNP'];
}
