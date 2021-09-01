import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
   firstname: DS.attr(),
   lastname: DS.attr(),
   rookieyear: DS.attr(),
   status: DS.attr(),
   position: DS.attr(),
   comment: DS.attr(),
   years: computed('rookieyear', function () {
      return 2021 - parseInt(this.get('rookieyear')) + 1;
   }),
});

