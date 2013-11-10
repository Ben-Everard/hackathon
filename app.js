var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, User = require('./user_model')
// , payPal = require('./config.json')
, mongoose = require('mongoose');
// , fs = require('fs');

var app = express();

// try {
//   var configJSON = fs.readFileSync(__dirname + "/config.json");
//   var config = JSON.parse(configJSON.toString());
// } catch (e) {
//   console.error("File congfig.json not found or is invalid "+ e.message);
//   process.exit(1);
// }

// routes.init(config);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/homepage', routes.homepage);
app.get('/borrowers', routes.borrowers);
app.get('/profile',routes.profile);
app.get('/register',routes.register);
app.get('/homepage',routes.homepage)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
