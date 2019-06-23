import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        openWindow(url){
            //https://flightaware.com/resources/registration/N755PR
            window.open(url);
        }
    }
});
