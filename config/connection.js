// This code was taken from the cats app and modified
// require the 'mysql' npm package
var mysql = require('mysql');
// var connection sets up the mysql connection parameters
// either using Jawsdb for Heroku or localhost
if (process.env.JAWSDB_URL){
	connection=mysql.createConnection(process.env.JAWSDB_URL);
}else {
	var connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: '!!CRUMBLE!@8i6',
		database: 'burger_db'
	});
};
// connect with the mysql database
connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});
// export to allow other functions to use the connection
module.exports = connection;
