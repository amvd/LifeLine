LifeLine.controller("operatorChatingController", function($scope, $routeParams){

	console.log("HI")
	console.log($routeParams.roomId);

	// $scope.percentage = "progress-bar-danger progress-bar"
	$scope.width = {'width': '50%'};
	// $scope.testing = "'width': '100%'"

	// $scope.feeling = "progress-bar-danger progress-bar";
	var scores = []

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
	signUpObj.username = "integrate6"; //operatorNumber //integrate
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
	// var testVar = 0
	$scope.happiness = 50;

	var eventListener = {
		onIncomingMessage: function(message) {
			$.get( "https://api.idolondemand.com/1/api/sync/analyzesentiment/v1?text= " + message.textBody + "cats&apikey=aaff2ad5-4351-43a9-a20c-44bc2919367f", function( data ) {

				scores.push(Math.floor(((data.aggregate.score + 1) / 2) * 100));
				console.log("response", percentage, data);

				var total = 0;
				for(var i = 0; i < scores.length; i++) {
				    total += scores[i];
				}
				var percentage = Math.floor(total / scores.length)

				// var percentage = avg
				// testVar = percentage

				// console.log("Percentage: ",$scope.happiness);
				$scope.happiness = percentage;
				$scope.$apply(function() {
					$scope.width = "{width: " +percentage + "%}";
					// $scope.bar = '<div class="progress-bar-success progress-bar" ng-style="{width: "'+ percentage +'%"}" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" id="emotion">'


				});
				console.log($scope.width)

				// if (percentage < 50) {
				// 	// $scope.width = JSON.stringify("{'width': '" + percentage +"%'}");
				// 	$scope.happiness = percentage;
				// 	console.log($scope.width);
				// 	$scope.$apply;
				// } else {
				// 	// $scope.width = JSON.stringify("{'width': '" + percentage +"%'}");
				// 	$scope.happiness = percentage;
				// 	console.log($scope.width);
				// 	$scope.$apply;
				// }
			});
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


});
