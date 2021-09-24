const request = require('request')

const forecast = (latitude, longitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca5ab61f6ab7d86c927c6c5d657b8b5f&query='+longitude+','+latitude;
    request({url, json: true},(error, { body } ) => {
        if (error)
        {
            callback('Unable to connect to forecast services',undefined)
        }else if(body.error){
            callback('Unable to find forecast',undefined)
        }else{
            const temperature = body.current.temperature;
            const rainChance = body.current.precip;
            const humidity = body.current.humidity;
            callback(undefined, {
                temperature: temperature,
                rainChance: rainChance,
                humidity: humidity
            })
        }
    })
}

module.exports = forecast;