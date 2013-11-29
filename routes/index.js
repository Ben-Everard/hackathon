// var paypal = require('paypal-rest-sdk');
// var config = {};
var http = require('http');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.homepage = function(req, res){
	res.render('homepage',{kiva: list})
};

exports.borrowers = function(req, res){
	res.render('borrowers')
};

exports.profile = function(req, res){
	res.render('profile')
};

exports.register = function(req, res){
	res.render('register')
};

/*
 * GET PAYPAL SDK
 */

exports.init = function(c){
  config = c;
  paypal.configure(c.api);
}