import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
   model() {
      return hash({
         photo: this.store.query('airplane', {orderBy: 'manufacturer'}),
         mich: this.store.query('michiganairplane', {orderBy: 'manufacturer'})
      });
   },
});
