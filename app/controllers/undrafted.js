import { computed } from '@ember/object';
import Controller from '@ember/controller';
import {thisYear} from "../utils/functions";

export default Controller.extend({
    allowDelete: false,
    isAdmin: false,
    refresh: false,
    //---------------------------------------------
    // Properties for Dialog Editing
    showDlg: 'NONE',
    dlgData:'',
    dlgDropdown: null,
    dlgFirstname: '',
    dlgLastname: '',
    dlgPosition: '',
    selectedRecord: null,
    selectedData:'',
    title: '',

    //---------------------------------------------
    // Properties for updating data
    positionList: Object.freeze(['RB','FB','QB','WR','TE','OL','DE','LB','CB','S','DL','K','P','KR','LS']),
    //---------------------------------------------
    // Properties for sorts and filters
    posFilter: 'ALL',
    offFilter:'ALL',
    statusFilter: 'ACTIVE',
    sortBy: 'rookieyear',
    reverse: true,
    playerview:'INFO',
    statuses: Object.freeze(['ALL','ACTIVE','FREE AGENT / PS','CUT IN TRAINING CAMP','CUT IN PRESEASON',
        'MADE PRACTICE SQUAD', 'MADE TEAM!', 'TRIED OUT - NEVER SIGNED']),
    //----------------------------------------------
    filtered: computed('refresh', 'posFilter', 'statusFilter','sortBy', 'reverse', function () {
        let filter = this.get('model').sortBy(this.get('sortBy'));

        //reverse sort
        if (this.get('reverse')) {filter.reverse();}

        // Filter by Position
        if (this.get('posFilter') !== 'ALL') {
            filter = filter.filterBy('position', this.get('posFilter'));
        }

        // Filter by Status
        if (this.get('statusFilter') !== 'ALL') {
            filter = filter.filterBy('status', this.get('statusFilter'));
        }


        //Done sorting
        return filter;
    }),
    actions:{
        addNew(){
            this.set('showDlg','NEW');
        },
        addPlayer(){
            this.transitionToRoute('add-player');
        },
        delete(player){
            if (this.allowDelete) {
                player.deleteRecord();
                player.save();
                this.set('allowDelete', false);
            }
            //TODO: Add Notification if disbled
        },
        getIndex(){
            var max=0, idx;
            this.get('model').forEach(function(item){
                idx= parseInt(item.get('idx'));
                if (idx>max) {max=idx;}
                console.log(max);
            });
            //record.set('leadindex',newIdx);
            //record.save();
        },
        refresh(){
            this.toggleProperty('refresh');
        },
        sort(val){
            if (this.get('sortBy')===val){this.toggleProperty('reverse');}
            else {this.set('sortBy',val);}
        },
        toggleAll() {
            this.toggleProperty('viewAll');
        },
        toggleDelete() {
            this.toggleProperty('allowDelete');
        },
        viewPos(pos){
            this.set('posFilter',pos);
        },
        editDlg(val1,val2){
            //va1 = item, val2=data record
            if (val1==='comment'){
                this.set('title','Comment');
                this.set('showDlg','EDIT');
            }
            else if (val1==='comment') {

            }
            else if (val1==='position') {
                this.set('title','Position');
                this.set('dlgDropdown',this.get('positionList'));
                this.set('showDlg','DROPDOWN');
            }
            else if (val1==='rookieyear') {
                this.set('title','Rookie Year');
                this.set('showDlg','EDIT');
            }
            else if (val1==='status') {
                this.set('title','Status');
                this.set('dlgDropdown',this.get('statuses'));
                this.set('showDlg','DROPDOWN');
            }

            this.set('selectedData',val1);
            if (val1!==null || val1!==undefined) {this.set('dlgData',val2.get(val1));}
            else {this.set('dlgData','');}
            this.set('selectedRecord',val2);
        },
        saveDlgData(){
            let record = this.get('selectedRecord');
            if (record !== null) {
                console.log(record);
                record.set(this.get('selectedData'), this.get('dlgData'));
                record.save();
            }
            this.send('closeDlg');
        },
        saveNewPlayer(){
            //Create valid flag
            let isValid=true;
            let firstname=this.get('dlgFirstname');
            let lastname=this.get('dlgLastname');
            let position=this.get('dlgPosition');

            //check name
            if (firstname === '' || firstname===undefined) {
                firstname = 'ERROR';
                isValid=false;
                alert('Need First Name');
            }

            //check last name
            if (lastname === '' || lastname===undefined) {
                lastname = 'ERROR';
                isValid=false;
                alert('Need Last Name');
            }

            //check position
            if (position === '' || position===undefined) {
                position = 'ERROR';
                isValid=false;
                alert('Need Position');
            }

            // echo the function inputs
            console.log('firstname: '+firstname);
            console.log('lastname: '+lastname);
            console.log('position: '+position);

            // create new Player
            let newPlayer = this.store.createRecord('undraftedplayer', {
                id: firstname.toLowerCase()+'_'+lastname.toLowerCase(),
                firstname: firstname,
                lastname: lastname,
                position: position,
                rookieyear: thisYear(),
                status: '',
                comment: ''
            });
            if (isValid) {
                newPlayer.save().then(()=> {
                        console.log('New Player '+firstname+' '+lastname+' Saved');
                        this.send('closeDlg');
                    },
                    ()=> {
                        console.log('Save Failed');
                        alert("Save Failed");
                    });
            }
        },
        closeDlg(){
            this.set('showDlg','NONE');

            //Clear Selection Data
            this.set('selectedRecord',null);
            this.set('dlgFirstname','');
            this.set('dlgLastname','');
            this.set('dlgPosition','');

            //refresh model
            this.send('refresh');
        }
    }
});


