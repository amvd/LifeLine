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
})
