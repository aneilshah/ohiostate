import DS from 'ember-data';
import { computed } from '@ember/object';
import {thisYear} from "../utils/functions";

export default DS.Model.extend({
  firstname: DS.attr(),
  lastname: DS.attr(),
  team: DS.attr(),
  draftpos: DS.attr(),
  draftround: DS.attr(),
  draftyear: DS.attr('number'),
  espnid: DS.attr(),
  nflid: DS.attr(),
  cbsid: DS.attr(),
  position: DS.attr(),
  rating: DS.attr(),
  earnings: DS.attr('number'),
  salary: DS.attr('number'),
  salarydb: DS.attr(),
  status: DS.attr(),
  rookieyear: DS.attr('number'),
  lastgame: DS.attr('number'),
  tdSeason: DS.attr('number'),
  tdCareer: DS.attr('number'),
  rushSeason: DS.attr('number'),
  rushCareer: DS.attr('number'),
  rcvSeason: DS.attr('number'),
  rcvCareer: DS.attr('number'),
  passSeason: DS.attr('number'),
  passCareer: DS.attr('number'),
  sackSeason: DS.attr('number'),
  sackCareer: DS.attr('number'),
  tackleSeason: DS.attr('number'),
  tackleCareer: DS.attr('number'),
  intSeason: DS.attr('number'),
  intCareer: DS.attr('number'),
  ffCareer: DS.attr('number'),
  pbCareer: DS.attr('number'),
  gamesStarted: DS.attr('number'),
  gamesPlayed: DS.attr('number'),
  game1: DS.attr(),
  game2: DS.attr(),
  game3: DS.attr(),
  game4: DS.attr(),
  game5: DS.attr(),
  game6: DS.attr(),
  game7: DS.attr(),
  game8: DS.attr(),
  game9: DS.attr(),
  game10: DS.attr(),
  game11: DS.attr(),
  game12: DS.attr(),
  game13: DS.attr(),
  game14: DS.attr(),
  game15: DS.attr(),
  game16: DS.attr(),
  wildcard: DS.attr(),
  round1: DS.attr(),
  round2: DS.attr(),
  superbowl: DS.attr(),
  comment: DS.attr(),
  years: computed('status','draftyear', 'lastgame', function() {
    if (this.get('status')==='CFL' || this.get('status')==='XFL' || this.get('status')==='PRACTICE SQUAD') {return 0;}
    else if (this.get('status')==='ACTIVE' || this.get('status')==='IR' || this.get('status')==='FREE AGENT') {
      return thisYear() - parseInt(this.get('draftyear'))+1;
    }
    else {return parseInt(this.get('lastgame'))-parseInt(this.get('draftyear'))+1;}
  }),
  yards: computed('rushCareer', 'rcvCareer', 'passCareer', function() {
    let passYrd = 0;
    if (!isNaN(parseInt(this.get('passCareer')))) {
      passYrd = parseInt(this.get('passCareer'));
    }  //needed when no pass stats available
    return parseInt(this.get('rushCareer')) + parseInt(this.get('rcvCareer')) + passYrd;
  }),
  defense: computed('position', function() {
    if (this.get('position')=== 'DL' || this.get('position')=== 'CB' || this.get('position')=== 'LB' || this.get('position')=== 'S') {return true;}
    else {return false;}
  }),
  offense: computed('position', function() {
    if (this.get('position')=== 'RB' || this.get('position')=== 'QB' || this.get('position')=== 'WR' || this.get('position')=== 'TE'|| this.get('position')=== 'OL') {return true;}
    else {return false;}
  }),
  spteam: computed('position', function() {
    if (this.get('position')=== 'K' || this.get('position')=== 'P' || this.get('position')=== 'KR' || this.get('position')=== 'LS') {return true;}
    else {return false;}
  }),
});

