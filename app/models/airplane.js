import DS from 'ember-data';

export default DS.Model.extend({
  airport: DS.attr(),
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

});
