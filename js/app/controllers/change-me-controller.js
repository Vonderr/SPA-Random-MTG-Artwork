define(['views/change-me-view', 'services/change-me-service'], function(
    changeMeView,                                       //dependecies wiring
    changeMeService
) {
    var externals = {};
    var internals = {};

    externals.start = function() {                      //controller init
        internals.bindEventHandlers();
        changeMeView.render();
    };

    internals.bindEventHandlers = function() {          //bind viewer to this controller
        changeMeView.bind('changeMe', internals.changeMeHandler);
    };

    internals.changeMeHandler = function() {            //rng > fetch #RNG film > update view with said film
        var filmIndex = Math.floor(Math.random() * 6);
        changeMeService.getFilm(filmIndex).then(changeMeView.render);
    };

    internals.searchHandler = function() {            //rng > fetch #RNG film > update view with said film
        var filmIndex = Math.floor(Math.random() * 6);
        changeMeService.getFilm(filmIndex).then(changeMeView.render);
    };

    return externals;
});
