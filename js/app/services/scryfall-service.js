define(function () {
    // internal state
    var internals = {   
        api : 'https://api.scryfall.com/cards/search?q=',
        random = 'https://api.scryfall.com/cards/random',
    }; 
    // external api
    var externals = {}; 

    /**
     * Fetch from API
     * 
     * @param {String} url address to perform request
     * @returns {Promise} Json of API response
     */
    internals.fetch = function (url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url
            })
                .done(resolve)
                .fail(reject);
        });
    }

    /**
     * Process API response
     * 
     * @param {Promise} results API response
     * @returns {Array} DTO of response
     */
    internals.getCards = function (results) {
        return results.data.map(function (card) {
            return {
                name: card.name,
                imgUrl: card.image_uris.art_crop,
                set: card.set_name,
                artist: card.artist
            };
        });
    }

    /**
     * Process API response
     * 
     * @param {Promise} results API response
     * @returns {Array} DTO of response
     */
    internals.getRandomCard = function (results) {
        return {
            name: results.name,
            imgUrl: results.image_uris.art_crop,
            set: results.set_name,
            artist: results.artist,
            colorIdentity: results.color_identity,
            setAbrev: results.set
        };
    }

    /**
     * Break glass in case of fire
     */
    internals.handleErrors = function () {
        return {
            name: '404 Elk',
            imgUrl: 'img/404.png',
            set: 'HTTP Masters 25',
            artist: 'Annonymous'
        }
    }

    /**
     * Expose Fetch Random Card behaviour
     * 
     * Fetches Random Card from API
     * Processes reponse into DTO and returns it
     * Handle Errors if any occur
     */
    externals.randomCard = function () {
        return internals.fetch(internals.random)
            .then(internals.getRandomCard)
            .catch(internals.handleErrors);
    }

    /**
     * Expose Search Card behaviour
     * 
     * Fetches dataset correspondent to search query from API
     * Processes reponse into DTO and returns it
     * Handle Errors if any occur
     * 
     * @param {String} event search query parameters
     */
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
