import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
   allowDelete: false,
   isAdmin: false,
   refresh: false,

   //----------------------------------------------
   filtered: computed('refresh', function () {
         let count=1;
         let lastTeam='';

         let filter = this.get('model').sortBy('team');
         filter=filter.filterBy('status','ACTIVE');
         filter=filter.rejectBy('team','Free Agent');

         filter.forEach( function(item){
            if (item.get('team')===lastTeam){
               count++;
            }
            else{count=1;}
            item.set('count',count);
            lastTeam=item.get('team');
         });

         //Done sorting
         return {list:filter, count:filter.length};
      }),
   actions:{
      openWindow(id){
         //http://www.espn.com/nfl/player/stats/_/id/3051392/ezekiel-elliott
         window.open('http://www.espn.com/nfl/player/stats/_/id/'+id);
      },
      espnpage(page){
         //http://www.espn.com/nfl/player/stats/_/id/3051392/ezekiel-elliott
         window.open('http://www.espn.com/nfl/player/stats/_/id/'+page);
      },
      nflpage(page){
         //http://www.nfl.com/player/joeybosa/2555249/profile
         window.open('http://www.nfl.com/player/'+page+'/profile');
      },
      cbspage(page){
         //http://www.cbssports.com/fantasy/football/players/2060764/joey-bosa/
         window.open('http://www.cbssports.com/fantasy/football/players/'+page);
      },
      earnings(page){
         //http://www.spotrac.com/nfl/detroit-lions/taylor-decker-18964/cash-earnings/
         window.open('http://www.spotrac.com/nfl/'+page+'/cash-earnings');
      },
   }
});
