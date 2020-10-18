import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  airport: DS.attr(),
  allYears: DS.attr(),
  backyard: DS.attr('boolean'),
  class: DS.attr(),
  color: DS.attr(),
  comment: DS.attr(),
  dateAdded: DS.attr(),
  firstSeen: DS.attr(),
  ident: DS.attr(),
  lastSeen: DS.attr(),
  manufacturer: DS.attr(),
  model: DS.attr(),
  photo: DS.attr(),
  registered: DS.attr(),
  seenAirport: DS.attr('boolean'),
  seenAirshow: DS.attr('boolean'),
  seenBackyard: DS.attr('boolean'),
  seenMI: DS.attr('boolean'),
  seenOOS: DS.attr('boolean'),
  type: DS.attr(),
  year: DS.attr(),
  dateAddedSort: computed('dateAdded', function() {
    return dayValue(this.get('dateAdded'));
  }),
  yearCount: computed('allYears', function() {
    let allYears =this.get('allYears');
    return allYears.split("|").length;
  }),

});

function dayValue(date){
  //return zero if invalid date
  if (date==='' || date===null || date===undefined) {return 0;}
  let numbers= date.match(/\d+/g);

  // format mm/dd/yyyy
  let mm = parseInt(numbers[0]);
  let dd = parseInt(numbers[1]);
  let yyyy = parseInt(numbers[2])

  if (yyyy>2020 || yyyy<2000) {yyyy=2000;}

  //range checking
  if (mm<1 || mm>12) {mm=0;}
  if (dd<1 || dd>31) {dd=0;}

  let dateVal = yyyy*372.0+mm*31.0+dd;
  dateVal = parseInt((dateVal*365.0)/372);
  return dateVal;
}
