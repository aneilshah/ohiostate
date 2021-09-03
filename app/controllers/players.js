import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import {aneilRatings, nflPage, positions, ratings, thisYear} from "../utils/functions";

export default Controller.extend({
    allowDelete: false,
    isAdmin: false,
    dateMin: 1900,
    dateMax: thisYear(),
    refresh: false,
    thisYear: thisYear(),
    //---------------------------------------------
    // Properties for Dialog Editing
    showDlg: 'NONE',
    dlgScrollTop:0,
    dlgData:'',
    dlgDropdown: null,
    dlgFirstname: '',
    dlgLastname: '',
    dlgPosition: '',
    dlgActive: false,
    selectedRecord: null,
    selectedData:'',
    title: '',

    //---------------------------------------------
    // Properties for updating data
    positionList: positions(),
    ratings: ratings(),
    //---------------------------------------------
    // Properties for sorts and filters
    posFilter: 'ALL',
    statusFilter:'ACTIVE',
    offFilter:'ALL',
    typeFilter:'ALL',
    injFilter:'ALL',
    actFilter:'ALL',
    ratingFilter:'ALL',
    aneilFilter: 'ALL',
    draftFilter:'ALL',
    sortBy: 'lastname',
    reverse: false,
    playerview:'INFO',
    sort: Object.freeze(['lastname','position','draftyear','years','team','status','rating',
        'earnings','round','tdCareer','gamesPlayed','yards','tackleCareer']),
    views: Object.freeze(['INFO','STATS','EARNINGS']),
    types: Object.freeze(['ALL','OFF','DEF','ST']),
    rating: ['ALL'].concat(ratings()),
    statuses: Object.freeze(['ALL','ACTIVE','FREE AGENT','RETIRED','IR','RESERVE','PRACTICE SQUAD','XFL','CFL']),
    drafts: Object.freeze(['ALL','DRAFTED','UNDRAFTED']),
    injs: Object.freeze(['ALL']),
    aneilRatings: aneilRatings(),
    aneilRatingList: ['ALL'].concat(aneilRatings()),

    //----------------------------------------------
    filtered: computed('refresh', 'posFilter', 'statusFilter', 'typeFilter', 'ratingFilter', 'draftFilter', 'sortBy', 'reverse', function () {
            var filter;

            filter = this.get('model').sortBy(this.get('sortBy'));

            //reverse sort
            if (this.get('reverse')) {filter=filter.reverse();}

            // Filter by Position
            if (this.get('posFilter') === 'ALL') {
            }
            else {
                filter = filter.filterBy('position', this.get('posFilter'));
            }

            // Filter by status
            if (this.get('statusFilter') === 'ALL') {
            }
            else {
                filter = filter.filterBy('status', this.get('statusFilter'));
            }

            // Filter by type
            if (this.get('typeFilter') === 'ALL') {}
            else if (this.get('typeFilter') === 'OFF') {
                filter = filter.rejectBy('position', 'DL');
                filter = filter.rejectBy('position', 'LB');
                filter = filter.rejectBy('position', 'S');
                filter = filter.rejectBy('position', 'CB');
                filter = filter.rejectBy('position', 'K');
                filter = filter.rejectBy('position', 'P');
                filter = filter.rejectBy('position', 'KR');
                filter = filter.rejectBy('position', 'LS');
            }

            else if (this.get('typeFilter') === 'DEF') {
                filter = filter.rejectBy('position', 'QB');
                filter = filter.rejectBy('position', 'RB');
                filter = filter.rejectBy('position', 'FB');
                filter = filter.rejectBy('position', 'WR');
                filter = filter.rejectBy('position', 'TE');
                filter = filter.rejectBy('position', 'OL');
                filter = filter.rejectBy('position', 'K');
                filter = filter.rejectBy('position', 'P');
                filter = filter.rejectBy('position', 'KR');
                filter = filter.rejectBy('position', 'LS');
            }

            else if (this.get('typeFilter') === 'ST') {
                filter = filter.rejectBy('position', 'QB');
                filter = filter.rejectBy('position', 'RB');
                filter = filter.rejectBy('position', 'FB');
                filter = filter.rejectBy('position', 'WR');
                filter = filter.rejectBy('position', 'TE');
                filter = filter.rejectBy('position', 'OL');
                filter = filter.rejectBy('position', 'DL');
                filter = filter.rejectBy('position', 'LB');
                filter = filter.rejectBy('position', 'CB');
                filter = filter.rejectBy('position', 'S');
            }

            // Filter by draft
            if (this.get('draftFilter') === 'ALL') {
            }
            else if (this.get('draftFilter') === 'DRAFTED') {
                filter = filter.rejectBy('draftround', 'UFA');
            }
            else if (this.get('draftFilter') === 'UNDRAFTED') {
                filter = filter.filterBy('draftround', 'UFA');
            }

            //Done sorting
            return {list:filter, count:filter.length};
        }),
    actions:{
        toggleAll() {
            this.toggleProperty('viewAll');
        },
        toggleDelete() {
            this.toggleProperty('allowDelete');
        },
        refresh(){
            this.toggleProperty('refresh');
        },
        sort(val){
            if (this.get('sortBy')===val){this.toggleProperty('reverse');}
            else {this.set('sortBy',val);}
        },
        addNew(){
            this.set('showDlg','NEW');
        },
        import(){
            this.transitionToRoute('import');
        },
        viewPos(pos){
            this.set('posFilter',pos);
        },
        viewType(type){
            this.set('typeFilter',type);
        },
        viewStatus(status){
            this.set('statusFilter',status);
        },
        viewAllDates(){
            this.set('dateMin',1900);
            this.set('dateMax',thisYear());
        },
        rev(){
            this.toggleProperty('reverse');
        },
        openWindow(id){
            //http://www.espn.com/nfl/player/stats/_/id/3051392/ezekiel-elliott
            window.open('http://www.espn.com/nfl/player/stats/_/id/'+id);
        },
        scrollTo(tag){
            $(window).scrollTop(tag);
        },
        espnpage(page){
            //http://www.espn.com/nfl/player/stats/_/id/3051392/ezekiel-elliott
            window.open('http://www.espn.com/nfl/player/stats/_/id/'+page);
        },
        news(player){
            //http://www.nfcom/player/joeybosa/2555249/profile
            window.open('http://www.google.com/search?q=NFL "'+player.get('firstname')+' '+player.get('lastname')+
            '"&tbm=nws&tbs=qdr:w');
        },
        nflpage(player){
          window.open(nflPage(player));
        },
        cbspage(page){
            //http://www.cbssports.com/fantasy/football/players/career-stats/2060764/joey-bosa/
            window.open('http://www.cbssports.com/fantasy/football/players/career-stats/'+page);
        },
        earnings(page){
            //http://www.spotrac.com/nfl/detroit-lions/taylor-decker-18964/cash-earnings/
            window.open('http://www.spotrac.com/nfl/'+page+"/cash-earnings/");
        },
        sortRB(){
            this.set('sortBy', 'yards');
            this.set('posFilter', 'RB');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortWR(){
            this.set('sortBy', 'yards');
            this.set('posFilter', 'WR');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortLB(){
            this.set('sortBy', 'tackleCareer');
            this.set('posFilter', 'LB');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortDL(){
            this.set('sortBy', 'tackleCareer');
            this.set('posFilter', 'DL');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortCB(){
            this.set('sortBy', 'tackleCareer');
            this.set('posFilter', 'CB');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortSF(){
            this.set('sortBy', 'tackleCareer');
            this.set('posFilter', 'S');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortQB(){
            this.set('sortBy', 'tdCareer');
            this.set('posFilter', 'QB');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortTE(){
            this.set('sortBy', 'yards');
            this.set('posFilter', 'TE');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        sortOL(){
            this.set('sortBy', 'gamesPlayed');
            this.set('posFilter', 'OL');
            this.set('reverse', true);
            this.set('playerview', 'STATS');
        },
        delete(player){
            if (this.allowDelete) {
                player.deleteRecord();
                player.save();
                this.set('allowDelete', false);
            }
            //TODO: Add Notification if disbled
        },
        addPlayer(){
            this.transitionToRoute('add-player');
        },
        getIndex(){
            // Code for metadata model
            //let meta=this.get('model.metadata');
            //let idx=meta.toArray()[0].get('leadindex');
            //let newIdx = parseInt(idx)+1;
            //console.log(idx+' '+newIdx);

            var max=0, idx;
            this.get('model').forEach(function(item){
                idx= parseInt(item.get('idx'));
                if (idx>max) {max=idx;}
                console.log(max);
            });
            //record.set('leadindex',newIdx);
            //record.save();
        },
        test(){
            //window.open('https://newton.newtonsoftware.com/candidate/8a7886f856fdfca601570c227c9f6f34');
            var date='10/12/2016';
            alert (day(date));

        },
        init(){
        },
        editDlg(val1,val2){
            //va1 = item, val2=data record
            if (val1==='comment'){
                this.set('title','Comment');
                this.set('showDlg','EDIT');
            }
            else if (val1==='comment') {

            }
            else if (val1==='position') {
                this.set('title','Position');
                this.set('dlgDropdown',this.get('positionList'));
                this.set('showDlg','DROPDOWN');
            }
            else if (val1==='rating') {
                this.set('title','Rating');
                this.set('dlgDropdown',this.get('ratings'));
                this.set('showDlg','DROPDOWN');
            }
            else if (val1==='aneilRating') {
              this.set('title','Aneil Rating');
              this.set('dlgDropdown',this.get('aneilRatingList'));
              this.set('showDlg','DROPDOWN');
            }
            this.set('selectedData',val1);
            this.set('selectedRecord',val2);
            this.set('dlgData',val2.get(val1));
            // Save screen position
            this.set('dlgScrollTop',$(window).scrollTop());
        },
        saveDlgData(){
            var self=this;
            let record = this.get('selectedRecord');
            if (record !== null) {
                console.log(record);
                record.set(this.get('selectedData'), this.get('dlgData'));
                record.save();
            }
            this.send('closeDlg');
            //refresh after delay
            later((function() {
                self.send('refresh');
            }), 400);
        },
        saveNewPlayer(){
            //let record = this.get('selectedRecord');
            //if (record !== null) {
            //console.log(record);
            //record.set(this.get('selectedData'), this.get('dlgData'));
            //record.save();
            //}
            alert('Save Not Implemented Yet');
            this.send('closeDlg');
        },
        closeDlg(){
            var self=this;
            this.set('showDlg','NONE');
            this.send('clearDlgData');
            later((function() {
                self.send('scrollTo',self.get('dlgScrollTop'));
            }), 200);
        },
        clearDlgData(){
            this.set('selectedRecord',null);
            this.set('selectedData','');
            this.set('dlgFirstname','');
            this.set('dlgLastname','');
            this.set('dlgPosition','');
        }
    }
});

function day(date){
    var numbers = date.match(/\d+/g);
    var yyyy=parseInt(numbers[2]);
    var mm=parseInt(numbers[0]);
    var dd=parseInt(numbers[1]);
    if (yyyy>2020 || yyyy<2000){yyyy=2000;}
    if (mm<1 || mm>12) {mm=0;}
    if (dd<1 || dd>31) {dd=0;}
    var day = yyyy*10000+mm*100+dd;
    return day;
}

function properCase(str){

    // 1. lower case the whole string
    str = str.toLowerCase();

    // 2.Split the string into an array of strings
    str = str.split(' ');

    // 3. Upper Case the pieces
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    // 4. Join and Return
    return str.join(' ');
}
