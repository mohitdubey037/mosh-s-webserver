const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));  

app.get('', (req, res) => {
    res.render('index', {
        title: 'he is handsome',
        name: 'mohit dubey'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'mohit is great',
        name: 'mohit dubey'
    })
})

app.get('/web', (req, res) => {
    if (req.query.address) {
        return res.send({
            address: req.query.address,
            product: []
        })
    }
    else {
        return res.send({
            error: 'You must provide a search term'
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'dubey is great',
        name: 'mohit dubey'
    })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Andrew Mead',
       errorMessage: 'Help article Not Found'
   })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found'
    });
})

app.listen(4000, () => {
    console.log('Server is up on port 4000.');
})