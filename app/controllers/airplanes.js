import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({
  sortBy: 'manufacturer',
  refresh: false,
  reverse: false,
  //----------------------------------
  // for edit dialog
  showDlg: 'NONE',
  dlgData: '',
  dlgYear:'',
  dlgDropdown: null,
  dlgScrollTop: 0,
  selectedRecord: null,
  selectedData: '',
  title: '',
  //-----------------------------------
  // Filtering and sorting
  mfgList: [
    'ALL','Beech', 'Cessna', 'Cirrus', 'Mooney','Piper',
    'Aero','Aeronca', 'American', 'Bellanca', 'Boeing', 'Champion', 'Diamond','Eng Research', 'Extra',
    'Fairchild', 'Funk', 'Gevalt', 'Glasair','Lancair','Luscombe', 'Maule', 'Navion',
    'Pitts','Socata','Taylorcraft',
    'Kitfox','Rans','Vans', 'Homebuilt','TBD','Other'],
  classList: [
    'ALL','*New*','Single', 'Turbo', 'Twin', 'Learjet', 'Jet', 'Helicopter',
    'Biplane', 'Vintage', 'Military', 'Seaplane', 'Canard', 'EAA', 'Kitplane'],
  airportList: [
    '','ALL','Canton', 'Oakland', 'Ann Arbor', 'Troy', 'Detroit', 'Willow Run', 'Oakland SW','Jackson',
    'Lansing', 'Brighton', 'Livingston','Grosse Ile','Mason Jewett','Romeo',
    'CAP','Out of State', 'Ex Local', 'MI-Other','TBD'],
  colorList: [
    'ALL','White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Beige', 'Black',
    'White/Red', 'White/Blue', 'White/Green',
    'Other'],
  identList:['1','2','3','4','5','6','7','8','9'],
  backyardStatus: ['','YES'],
  yearList: ['','2019','2018','2017','2016','2015','2014','2013','2012','2011',
    '2010','2009','2008','2007','2006','2005'],
  photoStatus:['','*'],
  sortList: ['airport', 'class', 'ident', 'manufacturer', 'model', 'type', 'color', 'year'],
  filterIdent: true,
  mfgFilter: 'Cessna',
  airportFilter: 'ALL',
  colorFilter: 'ALL',
  classFilter: 'ALL',
  identFilter: 'N1',
  sorted: computed('refresh', 'reverse', 'model', 'sortBy', 'mfgFilter', 'airportFilter','identFilter','filterIdent',
    'colorFilter', 'classFilter', function () {
      let out = this.get('model');
      let count=0;
      let identMatch=this.get('identFilter');

      if (this.get('mfgFilter') !== 'ALL') {
        out = out.filterBy('manufacturer', this.get('mfgFilter'));
      }
      if (this.get('classFilter') !== 'ALL') {
        out = out.filterBy('class', this.get('classFilter'));
      }
      if (this.get('airportFilter') !== 'ALL') {
        out = out.filterBy('airport', this.get('airportFilter'));
      }
      if (this.get('colorFilter') !== 'ALL') {
        out = out.filterBy('color', this.get('colorFilter'));
      }
      if (this.get('filterIdent')){
        out=out.filter(item => item.get('ident').includes(identMatch));
      }

      out = out.sortBy(this.get('sortBy'));
      if (this.get('reverse')) {out = out.sortBy(this.get('sortBy')).reverse();}
      else {out = out.sortBy(this.get('sortBy'));}

      count=out.length;

      return {list:out, count:count};
    }),
  //--------------------------------------
  actions: {
    beech(){
      this.set('mfgFilter','Beech');
      this.set('classFilter','Single');
      this.set('filterIdent',false);
    },
    cessna(){
      this.set('mfgFilter','Cessna');
      this.set('classFilter','Single');
      this.set('filterIdent',true);
    },
    cirrus(){
      this.set('mfgFilter','Cirrus');
      this.set('classFilter','Single');
      this.set('filterIdent',false);
    },
    piper(){
      this.set('mfgFilter','Piper');
      this.set('classFilter','Single');
      this.set('filterIdent',true);
    },
    mooney(){
      this.set('mfgFilter','Mooney');
      this.set('classFilter','Single');
      this.set('filterIdent',false);
    },
    clearIdentList(){
      this.set('filterIdent',false);
    },
    copyToClip(plane){
      alert(plane.get('manufacturer')+' '+plane.get('model')+' '+plane.get('ident'));
    },
    createNew() {
      let ident='N'+this.get('dlgData');
      let firstYear=this.get('dlgYear');

      if (isUnique(this,ident)) {

        let newAirplane = this.store.createRecord('airplane', {
          id: parseInt(getLastID(this)) + 1,
          airport: '',
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
          seenMI:false,
          seenOOS:false,
          type: '',
          year: '',
        });

        newAirplane.save().then(() => {
            console.log('New Airplane [' + ident + '] Saved');
          },
          () => {
            console.log('Save Failed');
            alert('Save Failed');
          });
      }
      else
      {
        alert('Duplicate Aircraft');
      }
      this.set('showDlg', 'NONE');

      //Clear Selection Data
      this.set('selectedRecord', null);
      this.set('dlgData', '');
      this.set('selectedData', '');
    },
    delete(){
      let match=null;
      this.get('model').forEach(function (airplane) {
        if (airplane.get('ident') === 'DELETE') {
          match = airplane;
        }
      });

      if (match) {
        match.destroyRecord();
        alert('Deleted Record# '+match.get('id'));
      }
      else {alert('No airplanes deleted');}
    },
    filterIdents(){
      this.set('filterIdent',true);
    },
    identToClip(val){
      alert(val);
      return false;  //suppress context menu
    },
    import(){
      this.transitionToRoute('import-airplanes');
    },
    new(){
      this.transitionToRoute('add-airplane');
    },
    newDlg(){
      this.set('dlgYear','2019');
      this.set('showDlg', 'NEW');
    },
    openHist(id){
      //https://flightaware.com/live/flight/N6044L/history
      window.open('https://flightaware.com/live/flight/' + id +'/history');
    },
    openPhoto(id){
      //https://flightaware.com/photos/aircraft/N6044L
      window.open('https://flightaware.com/photos/aircraft/' + id);
    },
    openWindow(id){
      //https://flightaware.com/resources/registration/N755PR
      window.open('https://flightaware.com/resources/registration/' + id);
    },
    refresh(){
      this.toggleProperty('refresh');
    },
    reverseSort(){
      this.toggleProperty('reverse');
    },

    scrollTo(tag){
      $(window).scrollTop(tag);
    },
    setClass(newClass){
      this.set('classFilter',newClass);
      if (newClass==='*New*'){
        this.set('mfgFilter','ALL');
      }
    },
    setMfg(newMfg){
      this.set('mfgFilter',newMfg);
      if (newMfg==='ALL' || newMfg==='Cessna' || newMfg==='Piper'){
        this.set('filterIdent','True');
      }
      else {
        this.set('filterIdent',false);
      }
    },
    setIdentFilter(val){
      this.set('identFilter','N'+val);
    },
    showID(record){
      alert(record.get('id'));
    },
    showNew(){
      this.set('classFilter','*New*');
      this.set('mfgFilter','ALL');
    },
    sort(val){
      if (this.get('sortBy') === val) {
        this.toggleProperty('reverse');
      }
      else {
        this.set('sortBy', val);
      }
    },
    test(){
      let data = this.get('model');
      data.forEach(function (airplane) {
        //airplane.save();
      });
    },
    toggleAll() {
      this.toggleProperty('viewAll');
    },
    toggleDelete() {
      this.toggleProperty('allowDelete');
    },
    togglePhoto(record) {
      if (record.get('photo')==='*') {record.set('photo','');}
      else {record.set('photo','*');}
    },
    viewPos(pos){
      this.set('posFilter', pos);
    },
    viewStatus(status){
      this.set('statusFilter', status);
    },
    updateSort(val){
      if (val !== null) {
        this.set('sortBy', val);
      }
    },
    editDlg(val1, val2){
      //va1 = item, val2=data record
      if (val1 === 'comment') {
        this.set('title', 'Comment');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'ident') {
        this.set('title', 'Ident');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'model') {
        this.set('title', 'Model');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'registered') {
        this.set('title', 'Registered In:');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'type') {
        this.set('title', 'Type');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'year') {
        this.set('title', 'Year');
        this.set('showDlg', 'EDIT');
      }
      else if (val1 === 'airport') {
        this.set('title', 'Airport');
        this.set('dlgDropdown', this.get('airportList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'firstSeen') {
        this.set('title', 'First Seen');
        this.set('dlgDropdown', this.get('yearList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'lastSeen') {
        this.set('title', 'Last Seen');
        this.set('dlgDropdown', this.get('yearList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'class') {
        this.set('title', 'Class');
        this.set('dlgDropdown', this.get('classList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'color') {
        this.set('title', 'Color');
        this.set('dlgDropdown', this.get('colorList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'manufacturer') {
        this.set('title', 'Manufacturer');
        this.set('dlgDropdown', this.get('mfgList'));
        this.set('showDlg', 'DROPDOWN');
      }
      else if (val1 === 'photo') {
        this.set('title', 'Needs Photo?');
        this.set('dlgDropdown', this.get('photoStatus'));
        this.set('showDlg', 'DROPDOWN');
      }

      // special logic
      if (val1==='lastSeen' && (val2.get('lastSeen')==='' || val2.get('lastSeen')===null)) {
        this.set('dlgData', '2019');
      }
      else if (val1==='firstSeen' && (val2.get('firstSeen')==='' || val2.get('firstSeen')===null)) {
        this.set('dlgData', '2019');
      }
      else {
        this.set('dlgData', val2.get(val1));
      }

      // Set common data
      this.set('selectedData', val1);
      this.set('selectedRecord', val2);
      // Save screen position
      this.set('dlgScrollTop', $(window).scrollTop());
    },
    saveDlgData(){
      var self = this;
      let record = this.get('selectedRecord');
      if (record !== null) {
        console.log(record);
        record.set(this.get('selectedData'), this.get('dlgData'));

        //check for model update
        if (this.get('selectedData')==='model'){
          let result=checkModel(this.get('dlgData'));
          if (result.match===true){
            record.set('type',result.type);
            record.set('manufacturer',result.mfg);
          }
        }

        //Check for out of state
        if (this.get('selectedData')==='registered'){
          if (this.get('dlgData')==='CAP'){
            record.set('airport','CAP');
          }
          else if (this.get('dlgData').length===2){
            record.set('airport','Out of State');
          }
        }
        record.save();
      }
      //refresh after delay
      this.send('closeDlg');
      later((function () {
        self.send('refresh');
      }), 500);
    },
    closeDlg(){
      var self = this;
      this.set('showDlg', 'NONE');

      //Clear Selection Data
      this.set('selectedRecord', null);
      this.set('dlgData', '');
      this.set('selectedData', '');
      later((function () {
        self.send('scrollTo', self.get('dlgScrollTop'));
      }), 200);
    },
  }
});

function day(date) {
  var numbers = date.match(/\d+/g);
  var yyyy = parseInt(numbers[2]);
  var mm = parseInt(numbers[0]);
  var dd = parseInt(numbers[1]);
  if (yyyy > 2020 || yyyy < 2000) {
    yyyy = 2000;
  }
  if (mm < 1 || mm > 12) {
    mm = 0;
  }
  if (dd < 1 || dd > 31) {
    dd = 0;
  }
  var day = yyyy * 10000 + mm * 100 + dd;
  return day;
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

function isUnique(context,ident){
  var isUnique = true;
  let data = context.get('model');
  data.forEach(function (airplane) {
    if (airplane.get('ident') === ident) {
      isUnique=false;
    }
  });

  return isUnique;
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

function checkModel(model){
  if (model==='SR20') {return { match : true, mfg : 'Cirrus', type : 'SR20' };}
  else if (model==='SR22') {return { match : true, mfg : 'Cirrus', type : 'SR22' };}

  //Match Cessna
  else if (model.substr(0,3)==='120') {return { match : true, mfg : 'Cessna', type : '120' };}
  else if (model.substr(0,3)==='140') {return { match : true, mfg : 'Cessna', type : '140' };}
  else if (model.substr(0,3)==='150') {return { match : true, mfg : 'Cessna', type : '150' };}
  else if (model.substr(0,3)==='152') {return { match : true, mfg : 'Cessna', type : '152' };}
  else if (model.substr(0,3)==='162') {return { match : true, mfg : 'Cessna', type : '162' };}
  else if (model.substr(0,3)==='172') {return { match : true, mfg : 'Cessna', type : '172' };}
  else if (model.substr(0,3)==='177') {return { match : true, mfg : 'Cessna', type : '177' };}
  else if (model.substr(0,3)==='180') {return { match : true, mfg : 'Cessna', type : '180' };}
  else if (model.substr(0,3)==='182') {return { match : true, mfg : 'Cessna', type : '182' };}
  else if (model.substr(0,3)==='208') {return { match : true, mfg : 'Cessna', type : '208' };}
  else if (model.substr(0,3)==='210') {return { match : true, mfg : 'Cessna', type : '210' };}
  else if (model.substr(0,3)==='337') {return { match : true, mfg : 'Cessna', type : '337' };}

  //match Pipers
  else if (model.substr(0,5)==='PA-18') {return { match : true, mfg : 'Piper', type : 'PA18' };}
  else if (model.substr(0,5)==='PA-24') {return { match : true, mfg : 'Piper', type : 'PA24' };}
  else if (model.substr(0,5)==='PA-28') {return { match : true, mfg : 'Piper', type : 'PA28' };}
  else if (model.substr(0,5)==='PA-31') {return { match : true, mfg : 'Piper', type : 'PA31' };}
  else if (model.substr(0,5)==='PA-32') {return { match : true, mfg : 'Piper', type : 'PA32' };}
  else if (model.substr(0,5)==='PA-46') {return { match : true, mfg : 'Piper', type : 'PA46' };}

  else if (model.substr(0,4)==='PA18') {return { match : true, mfg : 'Piper', type : 'PA18' };}
  else if (model.substr(0,4)==='PA24') {return { match : true, mfg : 'Piper', type : 'PA24' };}
  else if (model.substr(0,4)==='PA28') {return { match : true, mfg : 'Piper', type : 'PA28' };}
  else if (model.substr(0,4)==='PA31') {return { match : true, mfg : 'Piper', type : 'PA31' };}
  else if (model.substr(0,4)==='PA32') {return { match : true, mfg : 'Piper', type : 'PA32' };}
  else if (model.substr(0,4)==='PA46') {return { match : true, mfg : 'Piper', type : 'PA46' };}

  //Match Diamond
  else if (model.substr(0,4)==='DA20') {return { match : true, mfg : 'Diamond', type : 'DA20' };}
  else if (model.substr(0,4)==='DA40') {return { match : true, mfg : 'Diamond', type : 'DA40' };}

  //Match Mooney
  else if (model.substr(0,3)==='M20') {return { match : true, mfg : 'Mooney', type : 'M20' };}

  //Match Socata
  else if (model.substr(0,3)==='TBM') {return { match : true, mfg : 'Socata', type : 'TBM' };}

  //Match Beech
  else if (model.substr(1,2)==='35') {return { match : true, mfg : 'Beech', type : '35' };}
  else if (model.substr(0,2)==='35') {return { match : true, mfg : 'Beech', type : '35' };}
  else if (model.substr(1,2)==='36') {return { match : true, mfg : 'Beech', type : '36' };}
  else if (model.substr(0,2)==='36') {return { match : true, mfg : 'Beech', type : '36' };}

  //else no match
  else return { match : false, mfg : '', type : '' };
}
