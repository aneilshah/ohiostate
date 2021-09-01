import Controller from '@ember/controller';

export default Controller.extend({
  isAuthenticated: false,
  allowDelete: false,
  isAdmin: false,
  user: "<logged out>",
  actions: {
    menu() {
      this.transitionToRoute('navigate');
    },
    active() {
      this.transitionToRoute('active-by-team');
    },
    addPlayer() {
      this.transitionToRoute('add-player');
    },
    gotoPage(page) {
      this.transitionToRoute(page);
    },
    favorite() {
      alert("favorite pressed!");
    },
    more() {
      this.transitionToRoute('players');
    },
  }
});
