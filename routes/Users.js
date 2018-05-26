var express = require('express');
var users = express.Router();
var database = require('../Database/database.js');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var token;

users.use(cors());

process.env.SECRET_KEY = "lbas";

users.post('/register', function(req, res){

	console.log("firstname is :", req.body.firstname);
	console.log("lastName is :", req.body.lastname);
	console.log("birthday is :", req.body.birthday);
	console.log("adress is :", req.body.adress);
	console.log("postal is :", req.body.postcode);
	console.log("city is :", req.body.city);
	console.log("mail is :", req.body.email);
	console.log("password is :", req.body.password);
	console.log("pseudo is :", req.body.pseudo);
	console.log("phone is :", req.body.phone);
	
	var today = new Date();
	var appData = {
		"error" : 1,
		"data" : ""
	};

	let payload = {
		firstName: req.body.firstname,
		lastname: req.body.lastname,
		birthday: req.body.birthday,
		address: req.body.adress,
		postal: req.body.postcode,
		city: req.body.city,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		username: req.body.pseudo
	};

	database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
            console.log("Le serveur ne s'est pas connecté sur la base de donnée MYSQL")
        } else {
        	console.log("Le serveur s'est bien connecté sur la base de donnée MYSQL");
            connection.query('INSERT INTO users SET ?', payload, function(err, rows, fields) {
            	console.log("Le serveur s'est bien connecté sur la base de donnée MYSQL")
                if (!err) {
                    appData.error = 0;
                    appData["data"] = "User registered successfully!";
                    res.status(201).json(appData);
                } else {
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

users.post('/login', function(req, res) {

    var appData = {};
    var email = req.body.email;
    var password = req.body.password;

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                            appData.error = 0;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

users.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token";
        res.status(403).json(appData);
    }
});

users.get('/getUsers', function(req, res) {

    var appData = {};

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT *FROM users', function(err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.status(200).json(appData);
                } else {
                    appData["data"] = "No data found";
                    res.status(204).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = users;