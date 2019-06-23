import DS from 'ember-data';

export default DS.Model.extend({
   airport: DS.attr(),
   city: DS.attr(),
   class: DS.attr(),
   comment: DS.attr(),
   dateAdded: DS.attr(),
   ident: DS.attr(),
   manufacturer: DS.attr(),
   model: DS.attr(),
   name: DS.attr(),
   photo: DS.attr(),
   street: DS.attr(),
   type: DS.attr(),
   year: DS.attr(),
});
