import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Controller.extend({
   sortBy: 'id',
   refresh: false,
   reverse: false,
   //----------------------------------
   // for edit dialog
   showDlg: 'NONE',
   dlgData: '',
   dlgDropdown: null,
   dlgScrollTop: 0,
   selectedRecord: null,
   selectedData: '',
   title: '',
   //-----------------------------------
   // Filtering and sorting
   mfgList: [
      'ALL','Beechcraft', 'Cessna', 'Cirrus', 'Piper', 'Mooney',
      'Aeronca', 'American', 'Boeing', 'Champion', 'Diamond','Eng  Research', 'Fairchild',
      'Funk', 'Gevalt', 'Luscombe', 'Maule','Navion', 'Taylorcraft', 'Vans',
      'TBD'],
   classList: [
      'ALL','Single', 'Turbo', 'Twin', 'Learjet', 'Jet', 'Helicopter',
      'Biplane', 'Vintage', 'Military', 'Seaplane', 'Canard', 'EAA', 'Kitplane'],
   airportList: [
      'ALL','Canton', 'Oakland', 'Ann Arbor', 'Troy', 'Detroit', 'Willow Run', 'Oakland SW','Jackson', 'Lansing', 'Brighton', 'Livingston',
      'Other State', 'Ex Local', 'MI-Other','TBD-MI', 'TBD'],
   sorted: computed('refresh', 'reverse', 'model', 'sortBy', 'mfgFilter', 'airportFilter',
      'colorFilter', 'classFilter', function () {
         let out = this.get('model.mich');
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
         out = out.sortBy(this.get('sortBy'));
         if (this.get('reverse')) {out = out.sortBy(this.get('sortBy')).reverse();}
         else {out = out.sortBy(this.get('sortBy'));}

         return out;
      }),
   sortList: ['id', 'ident', 'manufacturer', 'class', 'type', 'model', 'airport', 'color', 'year'],
   mfgFilter: 'ALL',
   airportFilter: 'ALL',
   colorFilter: 'ALL',
   classFilter: 'ALL',
   //--------------------------------------
   actions: {
      toggleAll() {
         this.toggleProperty('viewAll');
      },
      toggleDelete() {
         this.toggleProperty('allowDelete');
      },
      import(){
         this.transitionToRoute('import-airplanes');
      },
      new(){
         this.transitionToRoute('add-airplane');
      },

      refresh(){
         this.toggleProperty('refresh');
      },
      reverseSort(){
         this.toggleProperty('reverse');
      },
      sort(val){
         if (this.get('sortBy') === val) {
            this.toggleProperty('reverse');
         }
         else {
            this.set('sortBy', val);
         }
      },
      updateSort(val){
         if (val !== null) {
            this.set('sortBy', val);
         }
      },
      openWindow(id){
         //https://flightaware.com/resources/registration/N755PR
         window.open('https://flightaware.com/resources/registration/' + id);
      },
      openHist(id){
         //https://flightaware.com/live/flight/N6044L/history
         window.open('https://flightaware.com/live/flight/' + id +'/history');
      },
      delete(cand){
         if (this.allowDelete) {
            cand.deleteRecord();
            cand.save();
            this.set('allowDelete', false);
         }
         //TODO: Add Notification if disbled
      },
      scrollTo(tag){
         $(window).scrollTop(tag);
      },
      getIndex(){
         var max = 0, idx;
         this.get('model').forEach(function (item) {
            idx = parseInt(item.get('idx'));
            if (idx > max) {
               max = idx;
            }
            console.log(max);
         });
         //record.set('leadindex',newIdx);
         //record.save();
      },
      editDlg(val1, val2){
         //va1 = item, val2=data record
         if (val1 === 'comment') {
            this.set('title', 'Comment');
            this.set('showDlg', 'EDIT');
         }
         else if (val1 === 'city') {
            this.set('title', 'City');
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
         else if (val1 === 'class') {
            this.set('title', 'Class');
            this.set('dlgDropdown', this.get('classList'));
            this.set('showDlg', 'DROPDOWN');
         }
         else if (val1 === 'manufacturer') {
            this.set('title', 'Manufacturer');
            this.set('dlgDropdown', this.get('mfgList'));
            this.set('showDlg', 'DROPDOWN');
         }
         else if (val1 === 'airport') {
            this.set('title', 'Airport');
            this.set('dlgDropdown', this.get('airportList'));
            this.set('showDlg', 'DROPDOWN');
         }
         else if (val1 === 'color') {
            this.set('title', 'Color');
            this.set('dlgDropdown', this.get('colorList'));
            this.set('showDlg', 'DROPDOWN');
         }
         this.set('dlgData', val2.get(val1));
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
            record.save();
         }
         //refresh after delay
         later((function () {
            self.send('refresh');
         }), 400);

         this.send('closeDlg');
      },
      saveNew(){
         // Create New Record
         //TODO: Add logic here


         //Close Dialog
         this.send('closeDlg');
      },
      closeDlg(){
         var self = this;
         this.set('showDlg', 'NONE');

         //Clear Selecttion Data
         this.set('selectedRecord', null);
         this.set('dlgData', '');
         this.set('selectedData', '');
         later((function () {
            self.send('scrollTo', self.get('dlgScrollTop'));
         }), 200);
      },
      test(){
         //window.open('https://newton.newtonsoftware.com/candidate/8a7886f856fdfca601570c227c9f6f34');
         var date = '10/12/2016';
         alert(day(date));
      },
      checkPhoto(){
         let mdl = this.get('model.mich');
         let photo=this.get('model.photo');
         let count=0;
         mdl.forEach(function (item) {
            let ident = item.get('ident');
            {
               let found=0;
               photo.forEach(function (aircraft) {
                  if (aircraft.get('ident')===ident) {found=1;}
               });
               console.log(count+'. '+ident+' '+found);
               count++;
               if (found)
               item.set('photo','YES');
               item.save();
            }
         });
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
