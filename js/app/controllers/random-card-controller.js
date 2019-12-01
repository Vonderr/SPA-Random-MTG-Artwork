define(['views/random-card-view', 'services/scryfall-service'], function(
    randomView,                                       //dependecies wiring
    scryfallService
) {
    var externals = {};
    var internals = {};

    //controller init
    externals.start = function() {                      
        internals.bindEventHandlers();
        randomView.render();
    };

    //bind viewer to this controller
    internals.bindEventHandlers = function() {          
        randomView.bind('random-card', internals.randomHandler);
    };

    //execute api request to service and provide view with the results
    internals.randomHandler = function() {            
        scryfallService.randomCard().then(randomView.render);
    };

    return externals;
});
