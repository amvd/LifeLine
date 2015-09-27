LifeLine.controller("doctorController_test", function($scope, doctorFactory_test){

  $scope.error = "";
  $scope.doctors = [];

  function setDoctors(doctors) {
    $scope.doctors = doctors;
  };

  function setDoctorsNumber(doctors) {
    $scope.doctorsNumber = doctors;
  };

  $scope.findDoctors = function() {
    function getDoctors(position){
      doctorFactory_test.getDoctors(position, setDoctors);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getDoctors);
    } else {
      $scope.error = "Geolocation is not supported by this browser.";
    };
  };

  $scope.findDoctorByNumber = function(number) {
    number = number.split("-").join("");

    if (number[0] == 1) {
      console.log("starts with 1");
      number = number.split("");
      number.shift();
      number = number.join("");
    }

    if (!isNaN(number) && number.length == 10) {
      doctorFactory_test.getDoctorByNumber(number, setDoctorsNumber);
    } else {
      $scope.error = "Not a valid phone number";
    }
  }
});

LifeLine.factory("doctorFactory_test", function($http) {

  return {
    getDoctors(position, setDoctors) {
      $http.get("https://api.betterdoctor.com/2015-01-27/doctors?specialty_uid=psychiatrist&location="+position.coords.latitude+"%2C"+position.coords.longitude+"%2C100&user_location="+position.coords.latitude+"%2C"+position.coords.longitude+"&skip=0&limit=12&user_key=ed8fd89765b2a3ebad0f2dfa790fe780")
        .success(function(results){
          var doctors = [];
          for (var i = 0; i < results.data.length; i++) {
            var profile = results.data[i].profile;
            var practice = results.data[i].practices[0];
            var phone = practice.phones.filter(function(number){ return number.type == "landline"});
            console.log("Number:",phone[0].number);
            doctors.push({
              name: profile.first_name + " " + profile.last_name,
              pic: profile.image_url,
              gender: profile.gender,
              city: practice.visit_address.city,
              phone: phone[0].number
            });
          };
          setDoctors(doctors);
        });
    },

    getDoctorByNumber(number, setDoctorsNumber) {
      $http.get("https://proapi.whitepages.com/2.1/phone.json?api_key=dec7732fb43ff30d5b02fb7305f5ac94&phone_number="+number).success(function(results){
        var doctors = [];
        var firstResult = results.results[0];
        var owners = firstResult.belongs_to;
        for (var i = 0; i < owners.length; i++) {
          doctors.push({
            name: owners[i].best_name || owners[i].name,
            gender: owners[i].gender || "Not Found",
            address: owners[i].locations[i].address,
            phone: owners[i].phones[i].phone_number
          });
        };
        setDoctorsNumber(doctors);
      });
    }
  }

});