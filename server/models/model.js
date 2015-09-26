var mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
	title: String,
	description: String,
	name: String,
	checked: {type: Boolean, default: false}
});

mongoose.model('Model', modelSchema);
