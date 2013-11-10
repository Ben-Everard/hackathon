var express = require('express')
, mongoose = require('mongoose')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, User = require('./user_model');

var app = express();

// var connStr = 'mongodb://localhost:27017/charity';
// mongoose.connect(connStr, function(err) {
//     if (err) throw err;
//     console.log('Successfully connected to MongoDB');
// });


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


routes.postsignin = function(req, res){
  if(req.body.register === 'register'){
  // User.find({email: user.email}, function (err, docs){
    // req.user = docs[0];
    console.log('Help');
    // if (!req.user) {

      var registerUser = new User({
        email: req.body.email,
        password: req.body.password
        });
        registerUser.save(function(err) {
          if(err) throw err;
          console.log(registerUser);
          res.redirect('/');
        });
      }
}

app.get('/', routes.index);
app.get('/homepage',routes.homepage);
app.get('/borrowers', routes.borrowers);
app.get('/profile',routes.profile);
app.get('/register',routes.register);
app.post('/', routes.postsignin);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
