const request = require('request');
var latLong = undefined;
const geoURI = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const extension = '.json';
const parmIntro = '?';
const conjuntion = '&'
const accessCode = 'access_token=pk.eyJ1Ijoia2ltYmVybHlyZWVkb2EiLCJhIjoiY2s1d2Z6cWNsMGJsOTNkcDF1NXZiOTNpcSJ9.evfOzKQaFArLif7QWRJyLA';
const limit = 'limt=1'

const geocode = (address, callback) => {
    var encodedLocation = encodeURIComponent(address);
    const url = geoURI + encodedLocation + extension + parmIntro + accessCode + conjuntion + limit;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service. Please try again later.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to recognize location.  Please try again.', undefined);
        } else {
            const lat = body.features[0].center[1];
            const long = body.features[0].center[0];
            callback(undefined, { 
                lat: body.features[0].center[1],
                long: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }

    });
}


module.exports = {
    geocode: geocode
}
