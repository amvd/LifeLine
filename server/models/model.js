var mongoose = require('mongoose');

var operatorSchema = new mongoose.Schema({
	email: String,
	password: String
});

mongoose.model('Operator', operatorSchema);
