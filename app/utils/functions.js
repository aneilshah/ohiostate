export {addNewAirplane,clipText,dayValue, getDay, getMonth, getMonthName,
  getToday, getTodaySortable, getYear, getYesterday, properCase,
  refYear,setDlgEdit,setDlgEditDate, setDlgDropdown};

function addNewAirplane(context,ident,firstYear) {
  let success=false;
  if (isUniqueIdent(context,ident)) {
    let newAirplane = context.store.createRecord('airplane', {
      id: parseInt(getLastID(context)) + 1,
      airport: '',
      allYears: firstYear,
      backyard: false,
      class: '*New*',
      color: '',
      comment: '',
      dateAdded: getToday(),
      firstSeen: firstYear,
      ident: ident,
      lastSeen: firstYear,
      manufacturer: '',
      model: '',
      photo: '',
      registered: '',
      seenAirport: false,
      seenAirshow: false,
      seenBackyard: false,
      seenMI: false,
      seenOOS: false,
      type: '',
      year: '',
    });

    newAirplane.save().then(() => {
        console.log('New Airplane [' + ident + '] Saved');
        success=true;
      },
      () => {
        console.log('New Airplane Save Failed');
        alert('New Airplane Save Failed');
      });
  }
  return success;
}



function clipText(text, count) {
  let str = text.toString();
  str=str.replace('  ',' ');

  //let len = str.length;
  let truncLen = parseInt(count);
  return str.slice(0,truncLen);
}

function dayValue(date, isStandard=true){
  //return zero if invalid date
  if (date==='' || date===null || date===undefined) {return 0;}

  var yyyy,mm,dd;
  let numbers= date.match(/\d+/g);

  if (isStandard) // format mm/dd/yyyy
  {
    mm = parseInt(numbers[0]);
    dd = parseInt(numbers[1]);
  }
  else // format: yyyy-mm-dd
  {
    yyyy = parseInt(numbers[0]);
    mm = parseInt(numbers[1]);
    dd = parseInt(numbers[2]);
  }

  if (yyyy>15 && yyyy<25) {yyyy=yyyy+2000;}
  else if (yyyy>2020 || yyyy<2000){yyyy=2000;}

  //range checking
  if (mm<1 || mm>12) {mm=0;}
  if (dd<1 || dd>31) {dd=0;}

  let dateVal = (yyyy-2000)*372.0+mm*31.0+dd;
  dateVal = parseInt((dateVal*365.0)/372);
  return dateVal;
}

function refYear() {
  return '2020';
}

function getDay(date){
  //return zero if invalid date
  if (date==='' || date===null || date===undefined) {return 0;}
  let numbers = date.match(/\d+/g);
  return parseInt(numbers[1]);
}

function getMonth(date){
  //return zero if invalid date
  if (date==='' || date===null || date===undefined) {return 0;}
  let numbers = date.match(/\d+/g);
  return parseInt(numbers[0]);
}

function getYear(date){
  //return zero if invalid date
  if (date==='' || date===null || date===undefined) {return 0;}
  let numbers = date.match(/\d+/g);
  let yyyy=parseInt(numbers[2]);
  if (yyyy>15 && yyyy<25) {return yyyy+2000;}
  else if (yyyy<2025 && yyyy>2000){return yyyy;}
  else return 0;
}

function getMonthName(mth){
  let month=parseInt(mth);
  let lookup=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return lookup[month-1];
}

function getToday(zeroPadDate=false) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (zeroPadDate) {
    if (dd < 10) {dd = '0' + dd;}
    if (mm < 10) {mm = '0' + mm;}
  }

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function getYesterday(zeroPadDate=false) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd>1) dd--;

  if (zeroPadDate) {
    if (dd < 10) {dd = '0' + dd;}
    if (mm < 10) {mm = '0' + mm;}
  }

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function getTodaySortable() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {dd = '0' + dd;}
  if (mm < 10) {mm = '0' + mm;}

  today = yyyy + '_' + mm +'_' + dd;
  return today;
}

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

function setDlgEdit(self,title){
  self.set('title', title);
  self.set('showDlg', 'EDIT');
}

function setDlgEditDate(self,title){
  self.set('title', title);
  self.set('showDlg', 'EDIT_DATE');
}


function setDlgDropdown(self,title,list){
  self.set('title', title);
  self.set('dlgDropdown', self.get(list));
  self.set('showDlg', 'DROPDOWN');
}


// For Add new aiplane Function
function isUniqueIdent(context,ident){
  var isUnique = true;
  let data = context.get('model');
  data.forEach(function (airplane) {
    if (airplane.get('ident') === ident) {
      isUnique=false;
    }
  });

  if (!isUnique) {console.log('Duplicate Ident');}
  return isUnique;
}

function getLastID(context) {
  var id = 0;
  let data = context.get('model');
  data.forEach(function (airplane) {
    if (parseInt(airplane.get('id')) > id) {
      id = airplane.get('id');
    }
  });
  return id;
}
