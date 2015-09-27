var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

require('./config/mongoose.js');
require('./config/routes.js')(app);

var server = app.listen(8000, function(){
	console.log("Integrate winners on port 8000")
})
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("SERVER::WE ARE USING SOCKETS!");
	console.log(socket.id);

	socket.on("newUserMessage", function(data){
		console.log(socket.id)
		console.log("new suicidal human needs help")
		io.sockets.emit("user", data)
	})
	// socket.on("messageFromWeb", function(data){
	// 	io.sockets.emit('messageFromServerWeb', data)
	// })
})
