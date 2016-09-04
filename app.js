var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use("/", express.static(__dirname + '/public'));

var connection = require('./connection');
var routes = require('./routes');

var server = app.listen(process.env.PORT || 8000, function() {
   connection.init();
   routes.configure(app);
   console.log('Server listening on port ' + server.address().port);
});

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Credentials', true);
   next();
});
