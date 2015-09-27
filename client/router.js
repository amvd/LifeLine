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
    .when("/doctors_test", {
      templateUrl: "partials/doctors_test.html",
      title: "Doctors Test",
      controller: "doctorController_test"
    })
})