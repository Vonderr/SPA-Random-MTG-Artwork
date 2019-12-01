/**
 * Router Module
 */
define(function() {
    var internals = {}; // internal module config and state vars
    var externals = {}; // module external api

    internals.routes = {
        // ChangeMe route
        search: {
            hash: '#search-card', // hash
            controller: 'search-card-controller' // controller
        },
        random: {
            hash: '#random-card',
            controller: 'random-card-controller'
        }
    };

    internals.defaultRoute = 'random';
    internals.currentHash = ''; // required to track hash changes

    internals.hashCheck = function() {
        if (window.location.hash === internals.currentHash) {
            return;
        }

        var routeName = Object.keys(internals.routes).find(function(name) {
            return window.location.hash === internals.routes[name].hash;
        });

        if (!routeName) {
            routeName = internals.defaultRoute;
            window.location.hash = internals.routes[internals.defaultRoute].hash;
        }

        internals.loadController(internals.routes[routeName].controller);
    };

    internals.loadController = function(controllerName) {
        internals.currentHash = window.location.hash;
        require(['controllers/' + controllerName], function(controller) {
            try {
                controller.start();
            } catch (err) {
                console.log(err.stack);
                window.location.hash = internals.routes[internals.defaultRoute].hash;
            }
        });
    };

    externals.start = function() {
        window.location.hash =
            window.location.hash || internals.routes[internals.defaultRoute].hash;

        setInterval(internals.hashCheck, 150);
    };

    return externals;
});
