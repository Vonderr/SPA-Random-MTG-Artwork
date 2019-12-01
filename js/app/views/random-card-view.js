define(function() {
    var internals = {
        handlers: {},
        elements: {}
    };

    // Card Color map
    var externals = {};
    internals.elements.cardColors = {
        "": '#b3c4cb',
        "R": '#fe370f',
        "G": '#247c5f',
        "U": '#238cff',
        "B": '#3d3c42',
        "W": '#fbfcf7',
        "M": '#f5ce3a'
    }

    //Random Artwork Button html element
    internals.createRandomButton = function() {
        return '<button class="random-card">Click Me for Random MTG Artwork</button>';
    };

    //Create Card Display div and elements
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

    // Update Card Display with new info
    internals.renderCard = function(card) {
        if (internals.elements.cardDisplay) {
            $('div').remove('#cardDisplay');
        }


        var renderColor = (card.colorIdentity in internals.elements.cardColors) ?
                            internals.elements.cardColors[card.colorIdentity] :
                            internals.elements.cardColors['M'];

        internals.elements.cardDisplay = $(internals.createCardDisplay(card));
        internals.elements.card.append(internals.elements.cardDisplay);

        //$('#cardDisplay').css('background-color', );    TODO background color
        $('.bottom-text').css('background-image', 'url(https://img.scryfall.com/sets/' + card.setAbrev + '.svg');
        $('.border').css('box-shadow', '0 0 0 2px #171314, 0 0 0 5px ' + renderColor + ', -3px 3px 2px 5px #171314');
    };

    //Create and append buttons
    internals.renderButton = function() {
        if (internals.elements.button) {
            return;
        }

        internals.elements.button = $(internals.createRandombButton());
        internals.elements.button.click(internals.handlers['random-card']);
        internals.elements.app.append(internals.elements.button);
    };

    //Wire this view to its controller
    externals.bind = function(event, handler) {
        internals.handlers[event] = handler;
    };

    //Trigger update
    externals.render = function(card) {
        internals.elements.card = $('#card')
        internals.elements.app = $('#app');
        internals.renderButton();

        if (card) {
            internals.renderCard(card);
        }
    };

    return externals;
});
