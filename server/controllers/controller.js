var mongoose = require('mongoose');
var Op = mongoose.model('Operator');

module.exports = (function(){
	return {
		login: function(req, res){
			Op.findOne({email: req.body.email}, function(err, result){
				if(err){
					res.json({err: "Invalid Credentials"});
				} else {
					res.json(result);
				}
			})
		}
	}
})();
