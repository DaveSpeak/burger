/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var string = require('string');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		for (var i=0;i<data.length;i++){
			var lastEat=hbsObject.burgers[i].tslast;
			var firstEat=hbsObject.burgers[i].tsinit;
			hbsObject.burgers[i].tslast=string(lastEat).left(16).s;
			hbsObject.burgers[i].tsinit=string(firstEat).left(16).s;
		}
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burger.create(['name', 'eaten'], [req.body.name, false], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	burger.update({ eaten: req.body.eaten }, condition, function () {
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/', function (req, res) {

	burger.delete(function () {
		res.redirect('/burgers');
	});
});


module.exports = router;
