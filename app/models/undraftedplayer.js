import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    comment: DS.attr(),
    firstname: DS.attr(),
    lastname: DS.attr(),
    position: DS.attr(),
    rookieyear: DS.attr(),
    status: DS.attr(),
    years: computed('rookieyear', function() {
        return 2021 - parseInt(this.get('rookieyear'))+1;
    }),
});

