import Controller from '@ember/controller';
import { computed } from '@ember/object';
import {
  addNewAirplane,
  checkIdentFormat,
  isUniqueIdent,
  refYear,
} from "../utils/functions";

export default Controller.extend({
  reviewText: '',
  processed: '',
  refresh: true,
  allowSave: false,
  isProcessed:false,
  identList:Object.freeze([]),
  newPlanes:Object.freeze([]),
  newForYear:Object.freeze([]),
  alreadyRecorded:Object.freeze([]),
  updatedNewForYear: computed('refresh', function() {
    return this.get('newForYear');
  }),
  updatedNewPlanes: computed('refresh', function() {
    return this.get('newPlanes');
  }),
  updatedAlreadyRecorded: computed('refresh', function() {
    return this.get('alreadyRecorded');
  }),

  actions: {
    addNewPlane(ident,index){
      addNewAirplane(this,ident,refYear());
      let list=this.get('newPlanes');
      list.splice(index,1);
      refresh(this);
    },
    last(){
      alert(getLastID(this));
    },
    back(){
      this.transitionToRoute('airplanes');
    },
    clear(){
      this.set('reviewText', '');
      this.set('isProcessed',false);
      this.set('identList',[]);
      this.set('newPlanes',[]);
      this.set('newForYear',[]);
      this.set('alreadyRecorded',[]);
    },
    checkID(ident)
    {
      alert(identExists(this, ident));
    },
    ignoreNewPlane(idx){
      let list=this.get('newPlanes');
      list.splice(idx,1);
      this.set('newPlanes',list);
      refresh(this);
    },
    ignoreNewView(idx){
      let list=this.get('newForYear');
      list.splice(idx,1);
      this.set('newForYear',list);
      refresh(this);
    },
    process() {
      // Clean list, remove duplicates, and put into an object
      let self=this;
      let identList = {};
      let reviewText = this.get('reviewText');
      let reviewList = reviewText.split(',');
      reviewList.forEach(function (ident) {
        let cleanIdent = ident.trim();
        if (identList[cleanIdent] === undefined) {
          identList[cleanIdent] = cleanIdent;
        }
      });

      // Bin by category
      let newPlanes=[];
      let newForYear=[];
      let alreadyRecorded=[];

      let keys = Object.keys(identList);
      keys.forEach(function (ident) {
        if (checkIdentFormat(ident)){
          //Check if it exists
          let result=isUniqueIdent(self,ident);
          if (result.isUnique) {
            newPlanes.push(ident);
            console.log('New Plane: '+ident);
          }

          else {  // plane exists
            if (result.record.lastSeen === refYear()){
              alreadyRecorded.push(result.record);
              console.log('Already Seen This Year: ' + result.record.ident + '  Last Seen: ' + result.record.lastSeen);
            } else {
              newForYear.push(result.record);
              console.log('New Sighting This Year: ' + result.record.ident + '  Last Seen: ' + result.record.lastSeen);
            }
          }
        }
      });
      this.set('newPlanes',newPlanes);
      this.set('alreadyRecorded',alreadyRecorded);
      this.set('newForYear',newForYear);
      this.set('isProcessed',true);
      refresh(this);
    },
    updateNewForYear(plane,index){
      plane.set('lastSeen',refYear());
      let allYears=plane.get('allYears');
      if (!allYears.includes(refYear())){
        allYears+='|'+refYear();
        plane.set('allYears',allYears);
      }
      plane.save();
      let list=this.get('newForYear');
      list.splice(index,1);
      refresh(this);
    }
  }
});

function identExists(context, ident) {
  var exists = false;
  let data = context.get('model');
  data.forEach(function (airplane) {
    if (ident.toLowerCase() === airplane.get('ident').toLowerCase()) {
      exists = true;
    }
  });
  return exists;
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



function refresh(context){
  context.toggleProperty('refresh');
}
