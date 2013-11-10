
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.homepage = function(req, res){
	res.render('homepage')
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