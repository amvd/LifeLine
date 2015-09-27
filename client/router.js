LifeLine.config(function($routeProvider){
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      title: "Home",
      controller: "homeController"
    })
    .when("/geo", {
      templateUrl: "partials/geo.html",
      title: "Geo Test",
      controller: "geoController"
    })
    .when("/chat", {
        templateUrl: "partials/chat.html",
        title: "Chat",
        controller: "chatController"
    })
    .when("/operatorChat", {
        templateUrl: "partials/operatorChat.html",
        title: "Operator Chat",
        controller: "operatorChatController"
    })
    .when("/operatorChating/:roomId", {
        templateUrl: "partials/operatorChating.html",
        title: "help",
        controller: "operatorChatingController"
    })
    .when("/doctors_test", {
      templateUrl: "partials/doctors_test.html",
      title: "Doctors Test",
      controller: "doctorController_test"
    })
    .when("/op", {
      templateUrl: "partials/op.html",
      title: "Operator Login",
      controller: "opController"
    })
    .when("/opDash", {
      templateUrl: "partials/opDash.html",
      title: "Operator Dashboard",
      controller: "opController"
    })
})
