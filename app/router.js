import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('add-airplane');
  this.route('airplanes');
  this.route('airport');
  this.route('airport-info');
  this.route('ann-arbor');
  this.route('brighton');
  this.route('canton');
  this.route('dropdown');
  this.route('edit-airplane',{path: 'edit-airplane/:id'});
  this.route('edit-player',{path: 'edit-player/:id'});
  this.route('export-airplanes');
  this.route('import');
  this.route('import-airplanes');
  this.route('import-all');
  this.route('index',{'path': '/'});
  this.route('jackson');
  this.route('login');
  this.route('michairplanes');
  this.route('navaids');
  this.route('new');
  this.route('oaklandsw');
  this.route('oakland');
  this.route('players');
  this.route('troy');
  this.route('willow');
});

export default Router;
