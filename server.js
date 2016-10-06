// main server file - entry point into the app
// require 'express', 'body-parser', and 'method-override' npm packages
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// set var 'app' to express function
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// use body parser to parse urlencoded objects only
// creates a new 'body' object with has key:value
// pair which can be either a string or array (extended: false sets this condition)
app.use(bodyParser.urlencoded({
	extended: false
}));

// allow use of override to change methods:
// post allows ?_method=DELETE and ?_method=UPDATE
app.use(methodOverride('_method'));
// require 'express-handlebars'
var exphbs = require('express-handlebars');
// defines default layout in /views/layouts/main.handlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
// sets view engine to be 'handlebars'
app.set('view engine', 'handlebars');
// require controller functions in burgers_controller.js
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);
// set up the port and begin listening
var port = process.env.PORT || 3000;
app.listen(port);
