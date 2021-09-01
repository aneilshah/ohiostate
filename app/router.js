import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('active-by-team');
  this.route('add-player');
  this.route('bowlgames');
  this.route('coaches');
  this.route('drafts');
  this.route('edit-player',{path: 'edit-player/:id'});
  this.route('greats');
  this.route('import');
  this.route('index',{'path': '/'});
  this.route('navigate');
  this.route('ncaalinks');
  this.route('nfllinks');
  this.route('players');
  this.route('psplayers');
  this.route('rosters');
  this.route('stats');
  this.route('timeline');
  this.route('undrafted');
});

export default Router;
