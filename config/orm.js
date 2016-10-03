/*
Here is the O.R.M. where you write functions that takes inputs and conditions and turn them into database commands like SQL.
*/
var connection = require('../config/connection.js');

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

function objToSql(ob) {
	// column1=value, column2=value2,...
	var arr = [];
	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}
	// console.log('arr.toString= '+arr.toString());
	return arr.toString();
}

var orm = {
	all: function (tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// vals is an array of values that we want to save to cols
		// cols are the columns we want to insert the values into
	create: function (table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString+=' (';
		queryString+=cols.toString();
		queryString+=') ';
		queryString+='VALUES (';
		queryString+=printQuestionMarks(vals.length);
		queryString+=') ';

		// console.log(queryString);

		connection.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// objColVals would be the columns and values that you want to update
		// an example of objColVals would be {name: panther, sleepy: true}
	update: function (table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;
		queryString+=' SET ';
		queryString+=objToSql(objColVals);
		queryString+=' WHERE ';
		queryString+=condition;

		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	delete: function (table, cb) {
		var queryString = 'TRUNCATE '+table;
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};

module.exports = orm;
