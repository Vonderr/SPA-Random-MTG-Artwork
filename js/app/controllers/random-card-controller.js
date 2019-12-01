define(['views/random-card-view', 'services/scryfall-service'], function(
    randomView,                                       //dependecies wiring
    scryfallService
) {
    var externals = {};
    var internals = {};

    externals.start = function() {                      //controller init
        internals.bindEventHandlers();
        randomView.render();
    };

    internals.bindEventHandlers = function() {          //bind viewer to this controller
        randomView.bind('random-card', internals.randomHandler);
    };

    internals.randomHandler = function() {            //rng > fetch #RNG film > update view with said film
        scryfallService.randomCard().then(randomView.render);
    };

    return externals;
});
