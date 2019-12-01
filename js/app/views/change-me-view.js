define(function() {
    var internals = {
        handlers: {},
        elements: {}
    };

    var externals = {};

    internals.createSearch = function() {
        return '<p>Search Card name:\n<input id="search" type="text">\n</p>'
    };

    internals.createButton = function() {
        return '<button class="random-film">Click Me for Random MTG Artwork</button>';
    };

    internals.createFilmCard = function(film) {
        return (
            '<div>' +
            '<p><strong>Title: </strong>' +
            film.title +
            '</p>' +
            '<p><strong>Year: </strong>' +
            film.year +
            '</p>' +
            '<p><strong>Director: </strong>' +
            film.director +
            '</p>' +
            '<p><strong>IMDB rating: </strong>' +
            film.imdbRating +
            '</p>' +
            '</div>'
        );
    };

    internals.renderFilm = function(film) {
        if (internals.elements.filmCard) {
            internals.elements.filmCard.empty();
        }

        internals.elements.filmCard = $(internals.createFilmCard(film));
        internals.elements.app.append(internals.elements.filmCard);
    };

    internals.renderSearch = function() {
        if (internals.elements.search) {
            return;
        }

        internals.elements.search = $(internals.createSearch());
        internals.elements.search.change(internals.handlers['changeMe']);
        internals.elements.app.append(internals.elements.search);
    };

    internals.renderButton = function() {
        if (internals.elements.button) {
            return;
        }

        internals.elements.button = $(internals.createButton());
        internals.elements.button.click(internals.handlers['changeMe']);
        internals.elements.app.append(internals.elements.button);
    };

    externals.bind = function(event, handler) {
        internals.handlers[event] = handler;
    };

    externals.render = function(film) {
        internals.elements.app = $('#app');
        internals.renderSearch();
        internals.renderButton();

        if (film) {
            internals.renderFilm(film);
        }
    };

    return externals;
});
