const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectorypath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname ,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(publicDirectorypath));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res) => {
   res.render('index',{
       title: 'Weather App',
       name: 'Vardan'
   });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Vardan'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Vardan'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude, location} = {}) => {
        if (error)
        {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return console.log(error);
            }


            res.send({
                title:'Weather',
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    })

})

app.get('/products',(req,res) => {
    if (!req.query.search)
    {
       res.send({
           error: 'You must provide a search term'
       });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vardan',
        error: 'Help article not found'
    });
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vardan',
        error: '404 NOT FOUND'
    });
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
});