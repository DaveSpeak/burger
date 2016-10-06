// This code was taken from the Cats app and modified
// functions in this file connect directly to the database being used
// in this case 'mysql' This file could be modified to use any other
// database without changing code in any other module
// include the mysql db connection thru connection.js
var connection = require('../config/connection.js');

// function returns a variable number of questinos marks in a string
// based on a number passed in (num)
function printQuestionMarks(num) {
	var arr = [];
// for loop adds (num) question marks to array
	for (var i = 0; i < num; i++) {
		arr.push('?');
	}
// return array
	return arr;
}

// returns  mysql query based on value of key in passed object
function objToSql(ob) {
	var arr = [];
	// using the key in ob, check if passed 
	// object has the specified property
	for (var key in ob) {
		// if ob has the specified property add it to arr
		// setting the value equal to the key's value in ob:
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}
	// return search term
	return arr;
}
// object relational model - map functions on to mysql calls (connection):
var orm = {
	//query the connected database for all values from a passec table
	all: function (tableInput, cb) {
		// queryString holds query for mysql:
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			// if error throw it
			if (err) throw err;
			// if no error call the callback function with the query results
			cb(result);
		});
	},
	// create a new database entry
	create: function (table, cols, vals, cb) {
		// queryString holds the text of the comand to insert
		// into the table passed to the function ('table')
		// using the column headers in 'cols' and the values in 'vals'
		var queryString = 'INSERT INTO ' + table;
		queryString+=' (';
		// make sure cols is a string
		queryString+=cols.toString();
		queryString+=') ';
		queryString+='VALUES (';
		// add the same number of question marks as there are values to pass
		// to mysql
		queryString+=printQuestionMarks(vals.length);
		queryString+=') ';
		// use the mysql connection to add to the table
		connection.query(queryString, vals, function (err, result) {
			// if error throw it
			if (err) throw err;
			// if no error use callback function to return query result
			// which is some kind of mysql object showing information
			// about the added row
			cb(result);
		});
	},
	// update the value of a passed table using a headers and values
	// from a passed object (objColVals), and an a key for the table row (identifier)
	update: function (table, objColVals, identifier, cb) {
		var queryString = 'UPDATE ' + table;
		queryString+=' SET ';
		// objToSql formats object value correctly for mysql query
		queryString+=objToSql(objColVals);
		queryString+=' WHERE ';
		queryString+=identifier;
		// use the mysql connection to update the table
		connection.query(queryString, function (err, result) {
			// if error throw it
			if (err) throw err;
			// if no error return result using the callback function
			cb(result);
		});
	},
	// clear all entries in a passed table and reset the counter (if it exists)
	delete: function (table, cb) {
		// queryString holds the mysql query text
		var queryString = 'TRUNCATE '+table;
		// use the mysql connection to clear the table
		connection.query(queryString, function (err, result) {
			// if error throw it
			if (err) throw err;
			// if no error return result using the callback function
			cb(result);
		});
	}
};
// make orm accessible to other files
module.exports = orm;
