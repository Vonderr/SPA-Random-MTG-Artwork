define(function() {
    var internals = {
        handlers: {},
        elements: {}
    };

    var externals = {};

    internals.createSearch = function() {
        return '<p>Search Card name:\n<input id="search" type="text">\n</p>'
    };

    internals.createCardDisplay = function(card) {
        return (
            '<div id="cardDisplay">' +
            '<p class="name border">' +
            card.name +
            '</p>' +
            '<img class="image-frame border" src="' +
            card.imgUrl +
            '">' +
            '<div class="bottom-text border"><p class="fbi-left"><strong>Set: </strong>' +
            card.set +
            '</p>' +
            '<p class="fbi-right"><strong>Artist Name: </strong>' +
            card.artist +
            '</p></div>' +
            '</div>'
        );
    };

    internals.renderCard = function(card) {
        if (internals.elements.cardDisplay) {
            //internals.elements.cardDisplay.empty();
            $('div').remove('#cardDisplay');
        }

        var renderColor = (card.colorIdentity in internals.elements.cardColors) ?
                            internals.elements.cardColors[card.colorIdentity] :
                            internals.elements.cardColors['M'];

        internals.elements.cardDisplay = $(internals.createCardDisplay(card));
        internals.elements.card.append(internals.elements.cardDisplay);
        $('#cardDisplay').css('background-color', )
        $('.border').css('box-shadow', '0 0 0 2px #171314, 0 0 0 5px ' + renderColor + ', -3px 3px 2px 5px #171314');
    };

    internals.renderSearch = function() {
        if (internals.elements.search) {
            return;
        }

        internals.elements.search = $(internals.createSearch());
        internals.elements.search.change(internals.handlers['search-card']);
        internals.elements.app.append(internals.elements.search);
    };

    externals.bind = function(event, handler) {
        internals.handlers[event] = handler;
    };

    externals.render = function(card) {
        internals.elements.card = $('#card');
        internals.elements.app = $('#app');
        internals.renderSearch();

        if (card) {
            internals.renderCard(card);
        }
    };

    return externals;
});
