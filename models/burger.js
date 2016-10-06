// This code was taken from the Cats app and modified
// include the object relational model functions from orm.js
var orm = require('../config/orm.js');
// the burger object holds all the functions that connect to the
// orm functions in orm.js
var burger = {
	// returns all rows in the 'burgers' table
	all: function (cb) {
		// accesses the '.all' function from orm returing 
		// all table rows from 'burgers'
		orm.all('burgers', function (res) {
			// return results (res) via the callback function
			cb(res);
		});
	},
	// accesses the '.create' function from orm - creates
	// a new 'burgers' table row
	create: function (cols, vals, cb) {
		orm.create('burgers', cols, vals, function (res) {
			// return results (res) via the callback function
			cb(res);
		});
	},
	// updates a 'burgers' table row with the header & value in 'objColVals',
	// and the identifier for the row in 'identifier'
	update: function (objColVals, identifier, cb) {
		orm.update('burgers', objColVals, identifier, function (res) {
			// return results (res) via the callback function
			cb(res);
		});
	},
	// clears the table 'burgers'
	delete: function (cb) {
		orm.delete('burgers',function (res) {
			// return results (res) via the callback function
			cb(res);
		});
	}
};
// export the burger object to be used by other files
module.exports = burger;
