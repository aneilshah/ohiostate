import Controller from '@ember/controller';

export default Controller.extend({
    draftRound: Object.freeze([1,2,3,4,5,6,7,8,9,'UFA']),
    positionList: Object.freeze(['RB','FB','QB','WR','TE','OL','DL','LB','CB','S','K','P','KR','LS']),
    teamList: Object.freeze(['TBD','Bears','Bengals','Bills','Broncos','Browns','Bucaneers','Cardinals','Chargers','Chiefs','Colts','Cowboys',
        'Dolphins','Eagles','Falcons','Giants','Jaguars','Jets','Lions','Niners','Packers','Panthers','Patriots',
        'Rams','Raiders','Ravens','Redskins','Saints','Seahawks','Steelers','Texans','Titans','Vikings']),
    ratingList: Object.freeze(['TBD','5-All Pro', '4-Star', '3-Starter','2-Backup', '1-Bench', '0-DNP']),
    statusList: Object.freeze(['ACTIVE','FREE AGENT','IR','PRACTICE SQUAD','RETIRED']),
    position: '',
    firstname: '',
    lastname: '',
    status: 'ACTIVE',
    team: '',
    rating: 'TBD',
    round: '',
    actions: {
        create_new(firstname,lastname,position,team,rating,round,status){
            //Create valid flag
            let isValid=true;

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

            //check team
            if (team === '' || team===undefined) {
                team = 'TBD';
            }

            //check rating
            if (rating === '' || rating===undefined) {
                rating = 'TBD';
            }

            //check round
            if (round === '' || round === undefined) {
                round = 'ERROR';
                isValid=false;
                alert('Need Round');
            }



          // create new Player
            let newPlayer = this.store.createRecord('player', {
                id: firstname.toLowerCase()+'_'+lastname.toLowerCase(),
                firstname: firstname,
                lastname: lastname,
                status: status,
                draftpos: '>50',
                draftround: round,
                draftyear: 2021,
                espnid: '',
                nflid: '',
                cbsid: '',
                position: position,
                rating:rating,
                earnings: 0,
                salary: 0,
                salarydb: '',
                rookieyear: 2021,
                lastgame: 2099,
                team:team,
                gamesStarted: 0,
                gamesPlayed: 0,
                tdSeason: 0,
                tdCareer: 0,
                rushSeason: 0,
                rushCareer: 0,
                rcvSeason: 0,
                rcvCareer: 0,
                passSeason: 0,
                passCareer: 0,
                sackSeason: 0,
                sackCareer: 0,
                tackleSeason: 0,
                tackleCareer: 0,
                intSeason: 0,
                intCareer: 0,
                ffCareer: 0,
                pbCareer: 0,
                game1: '',
                game2: '',
                game3: '',
                game4: '',
                game5: '',
                game6: '',
                game7: '',
                game8: '',
                game9: '',
                game10: '',
                game11: '',
                game12: '',
                game13: '',
                game14: '',
                game15: '',
                game16: '',
                wildcard: '',
                round1: '',
                round2: '',
                superbowl: '',
                comment: ''
            });
            if (isValid) {
                newPlayer.save().then(()=> {
                        console.log('New Player '+firstname+' '+lastname+' Saved');
                        this.send('clear');
                        this.transitionToRoute('players');
                    },
                    ()=> {
                        console.log('Save Failed');
                        alert("Save Failed");
                    });
            }
        },
        clear() {
            this.set('position','');
            this.set('firstname','');
            this.set('lastname','');
            this.set('team','');
            this.set('rating','TBD');
            this.set('status','ACTIVE');
        },
        back(){
            this.transitionToRoute('players');
        }
    }
});

