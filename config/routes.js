var Controller = require('./../server/controllers/controller.js');

module.exports = function(app){
	app.post('/login', function(req, res){
		Controller.login(req, res);
	})
}
