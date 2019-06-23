import Controller from '@ember/controller';

export default Controller.extend({
  isAuthenticated: false,
  allowDelete: false,
  isAdmin: false,
  user: "<logged out>",
  actions: {
    menu(){
      this.transitionToRoute('airplanes');
    },
    login(){
      this.transitionToRoute('airplanes');
    },
    new(){
      this.transitionToRoute('new-airplane');
    },
    airplanes(){
      this.transitionToRoute('airplanes');
    },
     goto(link){
        this.transitionToRoute(link);
     },
    favorite(){
      alert("favorite pressed!");
    },
    more(){
      this.transitionToRoute('players');
    },
    logout(){
      this.set('isAuthenticated',false);
      this.set('isAdmin',false);
      this.transitionToRoute('login');
      this.set('user',"<logged out>");
    }
  }
});
