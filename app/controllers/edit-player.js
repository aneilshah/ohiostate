import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/controller';

// TODO
// DEFAULT TO CURRENT YEAR
// LIST USES CURRENT YEAR
// EXPERIENCE USES CURRENT YEAR

export default Controller.extend({
  playerCtrl: inject('players'),
  playerData: computed.reads('playerCtrl.filtered'),
  positionList: Object.freeze(['RB','FB','QB','WR','TE','OL','DE','LB','CB','S','DL','K','P','KR','LS']),
  draftYear: Object.freeze([2022,2021,2020,2019, 2018,2017,2016,2015,2014,2013,2012,2011,2010,
                                2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,
                                1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,
                                1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,
                                1979,1978,1977,1976,1975,1974,1973,1972,1971,1970]),
  draftRound: Object.freeze([1,2,3,4,5,6,7,8,9,'UFA']),
  draftPos: Object.freeze([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
    33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,'>50','UFA']),
  ratings: Object.freeze(['5-All Pro', '4-Star', '3-Starter', '2-Backup', '1-Bench', '0-DNP']),
  teamList: Object.freeze(['Free Agent','Bears','Bengals','Bills','Broncos','Browns','Bucaneers','Cardinals','Chargers','Chiefs','Colts','Cowboys',
    'Dolphins','Eagles','Falcons','Giants','Jaguars','Jets','Lions','Niners','Packers','Panthers','Patriots',
    'Rams','Raiders','Ravens','Redskins','Saints','Seahawks','Steelers','Texans','Titans','Vikings']),
  statusList: Object.freeze(['ACTIVE','FREE AGENT','IR','PRACTICE SQUAD','RETIRED','XFL','CFL']),
  actions: {
    save_data(val1, val2){
      //alert('val1:'+val1+' val2:'+val2)
      if (val2 !== null) {
        let record = this.get('model');
        console.log(record);
        record.set(val1, val2);
        record.save();
        this.toggleProperty('playerCtrl.refresh');
      }
    },
    save_comment(val){
        let record = this.get('model');
        console.log(record);
        record.set('comment', val);
        record.save();
    },
    userCompany(){
      console.log('callback Company()');
    },
    salary(){
      //http://www.spotrac.com/nfl/detroit-lions/taylor-decker-18964/
      window.open('http://www.spotrac.com/nfl/'+this.get('model.salarydb'));
    },
    career(){
      //http://www.spotrac.com/nfl/detroit-lions/taylor-decker-18964/cash-earnings/
      window.open('http://www.spotrac.com/nfl/'+this.get('model.salarydb')+"/cash-earnings");
    },
    back(){
      this.transitionToRoute('players');
    },
    next(){
      let idx=this.get('model').get('id');
      let getNext = false;
      let self=this;
      let playerList=this.get('controllers.players.filtered.list');

      playerList.forEach(function (item) {
        if (getNext) {
          self.transitionToRoute('edit-player',item);
          getNext=false;
        }

        // find match
        if (item.get('id')===idx) {getNext=true;}
      });
    },
    prev(){
      let idx=this.get('model').get('id');
      let prevItem = '';
      let self=this;

      this.get('playerData').forEach(function (item) {
        // find match
        if (item.get('id')===idx) {
          if (prevItem !== null && prevItem!=="") {self.transitionToRoute('edit-player',prevItem);}
        }

        //save prev
        prevItem=item;
      });
    },
    espnpage(){
      //http://www.espn.com/nfl/player/stats/_/id/3051392/ezekiel-elliott
      window.open('http://www.espn.com/nfl/player/stats/_/id/'+this.get('model.espnid'));
    },
    nflpage(){
      //http://www.nfl.com/player/joeybosa/2555249/profile
      window.open('http://www.nfl.com/player/'+this.get('model.nflid')+'/profile');
    },
    cbspage(){
      //http://www.cbssports.com/fantasy/football/players/2060764/joey-bosa/
      window.open('http://www.cbssports.com/fantasy/football/players/'+this.get('model.cbsid'));
    },
  }
});


