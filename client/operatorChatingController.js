LifeLine.controller("operatorChatingController", function($scope, $routeParams){

	console.log("HI")
	console.log($routeParams.roomId);
	var number = $routeParams.roomId

	var socket = io.connect();

	var operatorNumber = Math.floor(Math.random() * 1000000) + 1


	socket.on('connect', function () {
	  console.log('BROWSER::WE ARE USING SOCKETS!');
	  socket.emit('operator', number.slice(6, 26), operatorNumber)
	  socket.emit('user')
	//   socket.emit('newUser', usernameNumber)
	})

	sinchClient = new SinchClient({
		applicationKey: '52713b9b-5ece-46e5-bb3d-133fd4a7b792',
		capabilities: {messaging: true},
		startActiveConnection: true,
		//Note: For additional loging, please uncomment the three rows below
		onLogMessage: function(message) {
			console.log(message);
		}
	});

	/*** Name of session, can be anything. ***/
	var sessionName = 'sinchSession-' + sinchClient.applicationKey;

	var signUpObj = {};
	signUpObj.username = operatorNumber;
	signUpObj.password = "password";

	sinchClient.newUser(signUpObj, function(ticket) {
		//On success, start the client
		sinchClient.start(ticket, function() {
			global_username = signUpObj.username;
			//On success, show the UI
			// showUI();

			//Store session & manage in some way (optional)
			localStorage[sessionName] = JSON.stringify(sinchClient.getSession());
		}).fail(handleError);
	}).fail(handleError);

	/*** Send a new message ***/

	var messageClient = sinchClient.getMessageClient();

	$('form#newMessage').on('submit', function(event) {
		event.preventDefault();
		// clearError();
		console.log(number.slice(0, 6))
		var recipients = number.slice(0, 6);
		var text = $('input#message').val();
		$('input#message').val('');

		//Create new sinch-message, using messageClient
		var sinchMessage = messageClient.newMessage(recipients, text);
		console.log("Client Message: ", sinchMessage);
		//Send the sinchMessage
		messageClient.send(sinchMessage).fail(handleError);
	});

	$('form#newRecipient').on('submit', function(event) {
		event.preventDefault();

		$('form#newMessage').show();
		$('input#message').focus();
	});

	/*** Handle incoming messages ***/

	var eventListener = {
		onIncomingMessage: function(message) {
			$('div#chatArea').prepend('<div class="msgRow" id="'+message.messageId+'"></div><div class="clearfix"></div>');

			$('div.msgRow#'+message.messageId)
				.attr('class', global_username == message.senderId ? 'me' : 'other')
				.append([
					'<div id="from">'+message.senderId+' <span>'+message.timestamp.toLocaleTimeString()+(global_username == message.senderId ? ',' : '')+'</span></div>',
					'<div id="pointer"></div>',
					'<div id="textBody">'+message.textBody+'</div>',
					'<div class="recipients"></div>'
				]);
		}
	}

	messageClient.addEventListener(eventListener);


	/*** Handle delivery receipts ***/

	var eventListenerDelivery = {
		onMessageDelivered: function(messageDeliveryInfo) {
			//$('div#'+messageDeliveryInfo.messageId+' div.recipients').append(messageDeliveryInfo.recipientId + ' ');
			$('div#'+messageDeliveryInfo.messageId+' div.recipients').append('<img src="style/delivered_green.png" title="'+messageDeliveryInfo.recipientId+'">');
		}
	}

	messageClient.addEventListener(eventListenerDelivery);

	var handleError = function(error) {
	//Enable buttons
		console.log(error)
	}

	setTimeout(function(){ loging(); }, 5000)

	function loging() {
		console.log("running the function")
	}

});
