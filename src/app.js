//core modules:
const path = require('path')

//npm modules
const express = require('express');
const hbs = require('hbs');

//utils modules
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname); // current path from wrapper function - to get to public use path core module
console.log(__filename);    // current file
console.log(path.join(__dirname, '../public'))

const app = express();  // create app by call express function
const port = process.env.PORT || 3000;  // this is only set on Heroku - thus specifies backup/default as the old 3000

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

//Setup handlebars and folders
app.set('view engine', 'hbs');
app.set('views', viewsDir)
hbs.registerPartials(partialsDir);

//set up static directory
app.use(express.static(publicDir) )// can customize server

// goal: we own app.com and we want to get to app.com/help and app.com/about

// get takes reqeust and response parms
app.get('', (req, res) => {     //renders handlebar template
    res.render('index', {
        title: 'Weather',
        name: 'kareed'
    })    

});

app.get('/about', (req, res) => {     //renders handlebar template
    res.render('about', {
        title: 'About',
        name: 'kareed'
    })    

});

app.get('/help', (req, res) => {     //renders handlebar template
    res.render('help', {
        title: 'Help',
        name: 'kareed',
        message: 'getting help'
    })    

});
// valid parm: address (required)
app.get('/weather', (req, res) => { // send to weather
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a search'
        })

    }
    var lat = undefined;
    var long = undefined;
    geoCode.geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });

    })
})
// valid parm: search (required), rating
app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })

    }
    console.log(req.query.search)
    if (req.query.rating)
    {
        console.log(req.query.rating)
    }
    res.send({
        products:[]
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found.',
        name: 'kareed'
    })    

});

app.get('*', (req, res) => {     //renders handlebar template
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'kareed'
    })    

});

// start server - keeps running until we stop it
app.listen(port, () => {     // usually dev port, 80 is http port - more later
    console.log('Server is up on port ' + port);
})   