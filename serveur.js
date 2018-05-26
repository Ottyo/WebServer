var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.use('/assets', express.static("assets"));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

var Users = require('./routes/Users');

app.use("/users", Users);

app.listen(port,function(){
    console.log("Server is running on port: "+port);
});

app.get('/', function(req, res){
	console.log("Request done.");
    res.render('register');
});


