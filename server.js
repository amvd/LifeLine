var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

// require('./config/mongoose.js');
// require('./config/routes.js')(app);

var server = app.listen(8000, function(){
	console.log("Integrate winners on port 8000")
})
var io = require('socket.io').listen(server);

var connected = {};

io.sockets.on('connection', function(socket){
	console.log("SERVER::WE ARE USING SOCKETS!");
	console.log(socket.id);

	connected[socket.id] = true

	socket.on("user", function(){
		console.log("remove user ", connected)
		delete connected[socket.id]
		console.log("user removed ", connected)
	})

	socket.on("newUser", function(data){
		console.log(data)
		// console.log(socket.id)
		// console.log(data)
		// console.log("new suicidal human needs help")
		// io.sockets.emit("user", data)
		for (x in connected) {
			if (connected[x]) {
				io.sockets.connected[x].emit("help", data + socket.id)
				// connected[x] = false
				break
			}
		}
	})

	socket.on("operator", function(id, number){
		console.log("operator", id, number);
		io.sockets.connected[id].emit('operatorUser', number)
	})

	socket.on('disconnect', function() {
	   console.log('Got disconnect!');
	   console.log("before disconnect", connected)
	   delete connected[socket.id]
	   console.log("after disconnect", connected)
	});
	// socket.on("messageFromWeb", function(data){
	// 	io.sockets.emit('messageFromServerWeb', data)
	// })
})
