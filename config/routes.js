var Controller = require('./../server/controllers/controller.js');

module.exports = function(app){
	app.post('/user/show', function(req, res){
		Controller.show(req, res);
	})
}
