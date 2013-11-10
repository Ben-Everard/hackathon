var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
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

// routes.hompage = function(req, res){
//   http.get('http://api.kivaws.org/v1/loans/newest.json',function(res) {
//     console.log("statusCode: ", res.statusCode);
//     console.log("headers: ", res.headers);
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });
// }


app.get('/', routes.index);
app.get('/homepage', express.bodyParser(), function(req, res){
  var url = 'http://api.kivaws.org/v1/loans/newest.json';

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var list = JSON.parse(body);
        for(var x in list.loans){
          app.locals({ 
            names: list.loans[x].name,
            use: list.loans[x].use,
            country: list.loans[x].location.country
            });
        }
        console.log(app.locals)
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});
    res.render("homepage.jade", {
        locals: {data: req.body, title: "Team Member Information"}
    });
});
app.get('/borrowers', routes.borrowers);
app.get('/profile',routes.profile);
app.get('/register',routes.register);
app.get('/homepage',routes.homepage)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
