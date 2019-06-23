import DS from 'ember-data';

export default DS.Model.extend({
   airport: DS.attr(),
   backyard: DS.attr('boolean'),
   backyard17: DS.attr(),
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
   type: DS.attr(),
   year: DS.attr(),

});
