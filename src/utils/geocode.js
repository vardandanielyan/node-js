const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFyZGFueCIsImEiOiJja3Q4ZndtZHcxMXNxMnBuOXk3emxxcmZqIn0.bchPwoaqCeBSQ9if9cnwiQ&limit=1';
    request({url, json: true},(error, { body } = {}) => {
        if (error)
        {
            callback('Unable to connect to location services',undefined)
        }else if(!body.features.length){
            callback('Unable to find location',undefined)
        }else{
            const latitude = body.features[0].geometry.coordinates[0];
            const longitude = body.features[0].geometry.coordinates[1];
            const location = body.features[0].place_name;
            callback(undefined, {
                latitide: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode;