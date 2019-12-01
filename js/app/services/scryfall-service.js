define(function () {
    var internals = {}; // internal state
    var externals = {}; // external api

    internals.api = 'https://api.scryfall.com/cards/search?q=';
    internals.random = 'https://api.scryfall.com/cards/random';

    internals.fetch = function (url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url
            })
                .done(resolve)
                .fail(reject);
        });
    }

    internals.getCards = function (results) {
        console.log(results);
        return results.data.map(function (card) {
            return {
                name: card.name,
                imgUrl: card.image_uris.art_crop,
                set: card.set_name,
                artist: card.artist
            };
        }).shift();
    }

    internals.getRandomCard = function (results) {
        return {
            name: results.name,
            imgUrl: results.image_uris.art_crop,
            set: results.set_name,
            artist: results.artist,
            colorIdentity: results.color_identity,
            setEmblem: internals.fetch(results.set_uri).icon_svg_uri
        };
    }

    internals.handleErrors = function () {
        return {
            name: '404 Elk',
            imgUrl: 'img/404_elk.png',
            set: 'HTTP Masters 25',
            artist: 'Annonymous'
        }
    }

    externals.randomCard = function () {

        return internals.fetch(internals.random)
            .then(internals.getRandomCard)
            .catch(internals.handleErrors);
    }

    externals.searchCard = function (event) {
        var search = event.target.value;

        if (!search) {
            return;
        }

        return internals.fetch(internals.api + search)
            .then(internals.getCards)
            .catch(internals.handleErrors);
    }

    return externals;
});
