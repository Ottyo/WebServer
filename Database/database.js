var mysql = require('mysql');

var connection = mysql.createConnection({
 host:"localhost",
 user:"root",
 password:"",
 database:"lbas",
 multipleStatements: true
});

module.exports.connection = connection;