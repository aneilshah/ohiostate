import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        //return this.store.findAll('airplane');
        return this.store.query('airplane', {orderBy: 'manufacturer'});
    },
});
