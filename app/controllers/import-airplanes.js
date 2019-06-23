import Controller from '@ember/controller';

export default Controller.extend({
   lastID: 0,
   importText: '',
   processed: '',
   allowSave: 0,
   actions: {
      last(){
         alert(getLastID(this));
      },
      back(){
         this.transitionToRoute('airplanes');
      },
      clear(){
         this.set('importText', ' ');
         this.set('processed', ' ');

      },
      checkID_server(idx){
         var x = 0;
         var self = this;
         let record = this.store.findRecord('airplane', idx).then((record, self) => {
            // Found Record
            //alert(record.get('ident'));
            self.set('last', 1);
         }).catch(() => {
            // No Record
            //alert('No Record');
            self.set('last', 0);
         });
         x = alert(this.get('last'));
         return x;
      },
      checkID(ident)
      {
         alert(identExists(this, ident));
      },
      import(data){
         var context = this;   //need to use this in inner functions
         this.set('processed', '');
         this.set('lastID', parseInt(getLastID(context)) + 1);

         //variables for airplane record
         var airplane_type = '';
         var airplane_class = '';
         var airplane_model = '';
         var ident = '';
         var color = '';
         var airport = '';
         var manufacturer = '';
         var year = '';
         var comment = '';

         // variables for import
         var lines = data.split('\n');
         var count = 1;
         var str = '';

         // Read each line and split CSV at the commas
         lines.forEach(function (line) {
            var d = line.split(',');  //data field
            var i = 0;  // data field count

            // Read the data [manufacturer,class,type,model,ident,year]
            d.forEach(function (item) {
               if (i === 0) {
                  manufacturer = properCase(item);
               }
               else if (i === 1) {
                  airplane_class = properCase(item);
               }
               else if (i === 2) {
                  airplane_type = item;
               }
               else if (i === 3) {
                  airplane_model = item;
               }
               else if (i === 4) {
                  ident = item;
               }
               else if (i === 5) {
                  year = item;
               }
               i++;
            });

            // Create Record if not matched
            if (!identExists(context, ident) && checkIdentFormat(ident)) {
               str = str + count + ". ADDED:" + ident + '|' + manufacturer + '|' +
                  airplane_class + '|' + airplane_type + '|' + airplane_model + '|' + year + '\n';
               count++;

               // Save to database if requested
               if (context.get('allowSave')) {
                  let newAirplane = context.store.createRecord('airplane', {
                     id: context.get('lastID'),
                     airport: airport,
                     backyard: false,
                     backyard17:'',
                     class: airplane_class,
                     color: color,
                     comment: comment,
                     dateAdded:'',
                     firstSeen: '',
                     ident: ident,
                     lastSeen: '',
                     manufacturer: manufacturer,
                     model: airplane_model,
                     photo: false,
                     registered: '',
                     type: airplane_type,
                     year: year,
                  });

                  context.set('lastID', parseInt(context.get('lastID') + 1));
                  newAirplane.save().then(() => {
                        console.log('New Airplane [' + ident + '] Saved');
                     },
                     () => {
                        console.log('Save Failed');
                        alert('Save Failed');
                     });
               }
            }

            // else reject record
            else {
               str = str + "REJECTED: " + ident + '\n';
            }
         });
         this.set('processed', str);
         this.set('allowSave', 0);
      },
   }
});

function identExists(context, ident) {
   var found = 0;
   let data = context.get('model');
   data.forEach(function (airplane) {
      if (ident.toLowerCase() === airplane.get('ident').toLowerCase()) {
         found = 1;
      }
   });
   return found;
}

function getLastID(context) {
   var id = 0;
   let data = context.get('model');
   data.forEach(function (airplane) {
      if (parseInt(airplane.get('id')) > id) {
         id = airplane.get('id');
      }
   });
   return id;
}

function checkIdentFormat(ident) {
   var isValid = 1;
   if (ident.length > 6) {
      isValid = 0;
   }
   if (ident.charAt(0).toLowerCase() !== 'n') {
      isValid = 0;
   }
   return isValid;
}

function properCase(str) {

   // 1. lower case the whole string
   str = str.toLowerCase();

   // 2.Split the string into an array of strings
   str = str.split(' ');

   // 3. Upper Case the pieces
   for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
   }

   // 4. Join and Return
   return str.join(' ');
}
