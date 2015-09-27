LifeLine.controller("chatController", function($scope){

	sinchClient = new SinchClient({
		applicationKey: '52713b9b-5ece-46e5-bb3d-133fd4a7b792',
		capabilities: {messaging: true},
		startActiveConnection: true,
		//Note: For additional loging, please uncomment the three rows below
		onLogMessage: function(message) {
			console.log(message);
		}
	});
});
