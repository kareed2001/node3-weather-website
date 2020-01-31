const request = require('request');

const forecast = (latitude, longitude, callback) => {
    latLong = latitude + ',' + longitude;
    const parmIntro = '?';
    const weatherURI = 'https://api.darksky.net/forecast/efee7dd9815eb48696863639431c98f3/';
    const langLabel = 'lang=';
    const unitsLabel = 'units=';
    const url = weatherURI + latLong// + parmIntro + langLabel + 'fr';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.  Try again later.', undefined)
        } else if (body.error) {
            callback('Unable to identify location.  Try another search.', undefined)
        } else {
            console.log(body.daily.data[0], body.currently);
            callback(undefined, "Currently, it is " + body.currently.temperature  + " degrees and it feels like " 
                + body.currently.apparentTemperature + " with a high of "
                + body.daily.data[0].temperatureHigh + " and a low of " + body.daily.data[0].temperatureLow
                + ". There is a " + body.currently.precipProbability
                + "% change of rain. Visibility is " + body.currently.visibility 
                + ". Forecast: " + body.daily.data[0].summary);
        }

    });
}




module.exports =  forecast;
