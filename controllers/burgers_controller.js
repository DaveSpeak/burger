// This code was taken from the cats app and modified
// require express and string npm packages
// and burger.js links to the orm
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var string = require('string');

// redirects host '/' entry to '/burgers'
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

// on host '/burgers' load, accesses burger.all function
// which returns all rows of the 'burgers' table
router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		// hbsObject holds burgers data for rendering
		var hbsObject = { burgers: data };
		// loop thru object and truncate first entry timestamp
		// and 'last eaten' timestamp
		for (var i=0;i<data.length;i++){
			var lastEat=hbsObject.burgers[i].tslast;
			var firstEat=hbsObject.burgers[i].tsinit;
			hbsObject.burgers[i].tslast=string(lastEat).left(16).s;
			hbsObject.burgers[i].tsinit=string(firstEat).left(16).s;
		}
		// render hbsObject to the host using the 'index.handlebars' template
		res.render('index', hbsObject);
	});
});

// post new row to 'burgers' table 
router.post('/burgers/create', function (req, res) {
	// use 'burger' connection to orm to access database to create a new entry
	// give the name (req.body.name), and set it's value to 'false'- which means not eaten
	burger.create(['name', 'eaten'], [req.body.name, false], function () {
		//redirect to the main display page
		res.redirect('/burgers');
	});
});

// update information in a row in the 'burgers' table
router.put('/burgers/update/:id', function (req, res) {
	// set up the identifier for the row
	var identifier = 'id = ' + req.params.id;
	// update the entry using the 'burger' connection to the orm
	burger.update({ eaten: req.body.eaten }, identifier, function () {
		// redirect to the main display page
		res.redirect('/burgers');
	});
});

// clear all entries in the 'burgers' table
router.delete('/burgers/delete/', function (req, res) {
	// access the orm thru the 'burger' object
	burger.delete(function () {
		// redirect to the main display page
		res.redirect('/burgers');
	});
});


module.exports = router;
