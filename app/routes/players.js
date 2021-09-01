import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('player');
  },
  beforeModel: function() {
    // setup Delete access
    this.controllerFor('players').set('isAdmin',this.controllerFor('application').get('isAdmin'));
  }
});

