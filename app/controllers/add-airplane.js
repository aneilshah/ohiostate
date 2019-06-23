import Controller from '@ember/controller';

export default Controller.extend({
    last: 0,
    actions: {
        last(){
            let data = this.store.query('airplane', {limitToLast: 1 }).then(function(data) {
            alert(data.objectAt(0).get('id'));
            });
        },
        back(){
            this.transitionToRoute('airplanes');
        },
        add(ident){

        },
        checkID(ident){
            alert(identExists(this,ident));
        }
    }
});

function identExists(context,ident){
    var found=0;
    let data=context.get('model');
    data.forEach(function (airplane){
        if (ident.toLowerCase()===airplane.get('ident').toLowerCase()) {found=1;}
    });
    return found;
}
