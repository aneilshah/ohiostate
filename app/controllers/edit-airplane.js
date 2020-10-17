import Controller from '@ember/controller';

export default Controller.extend({
    idx:0,
    mfgList:Object.freeze([
        'Beechcraft','Cessna','Cirrus','Piper', 'Mooney',
        'Aeronca','American','Boeing','Champion','Eng  Research','Fairchild','Funk','Gevalt','Luscombe','Navion','Taylorcraft','Vans',
        'TBD']),
    classList:Object.freeze([
        'Single','Turbo','Twin','Learjet','Jet','Helicopter',
        'Biplane','Vintage','Military','Seaplane','Canard','EAA','Kitplane']),
    airportList:Object.freeze([
        'Canton','Oakland','Ann Arbor','Troy','Detroit','Willow Run','Jackson','Lansing','Brighton','Livingston',
        'Out of State','Ex Local','MI-Other',
        'TBD-MI','TBD']),
    colorList:Object.freeze([
        'White','Red','Blue','Green','Yellow','Orange','Purple','Beige','Black',
        'White/Red','White/Blue','White/Green',
        'Other']),
    actions:{
        save_data(val1, val2){
            //alert('val1:'+val1+' val2:'+val2)
            if (val2 !== null) {
                let record = this.get('model');
                console.log(record);
                record.set(val1, val2);
                record.save();
            }
        },
        back(){
            this.transitionToRoute('airplanes');
        },
        getID(){
            alert(this.get('model').get('id'));
        },
        next(){
            var idx = parseInt(this.get('model').get('id')) + 1;
            this.transitionToRoute('/edit-airplane/' + idx);
        },
        prev(){
            var idx = parseInt(this.get('model').get('id'));
            if (idx>1) {
                idx = idx - 1;
                this.transitionToRoute('/edit-airplane/' + idx);
            }
        },
        openWindow(id){
            //https://flightaware.com/resources/registration/N755PR
            window.open('https://flightaware.com/resources/registration/'+id);
        }
    }
});
