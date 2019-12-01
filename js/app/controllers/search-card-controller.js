define(['views/search-card-view', 'services/scryfall-service'], function(
    searchView,                                       //dependecies wiring
    scryfallService
) {
    var externals = {};
    var internals = {};

    externals.start = function() {                      //controller init
        internals.bindEventHandlers();
        searchView.render();
    };

    internals.bindEventHandlers = function() {          //bind viewer to this controller
        searchView.bind('search-card', internals.searchHandler);
    };

    internals.searchHandler = function(event) {            //rng > fetch #RNG film > update view with said film
        scryfallService.searchCard(event).then(searchView.render);
    };

    return externals;
});
