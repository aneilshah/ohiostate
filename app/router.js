import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('airplanes');
  this.route('airport');
  this.route('airport-info');
  this.route('ann-arbor');
  this.route('brighton');
  this.route('canton');
  this.route('check-sightings');
  this.route('edit-airplane',{path: 'edit-airplane/:id'});
  this.route('export-airplanes');
  this.route('import-airplanes');
  this.route('index',{'path': '/'});
  this.route('jackson');
  this.route('michairplanes');
  this.route('navaids');
  this.route('new');
  this.route('oaklandsw');
  this.route('oakland');
  this.route('troy');
  this.route('willow');
});

export default Router;
