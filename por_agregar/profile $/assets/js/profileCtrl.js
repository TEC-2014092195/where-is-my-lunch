var app = angular.module("profile",[]);
app.controller('profileCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/profile').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.editProfile = function(){
  	console.log("Edit Profile");
  };
  $scope.goBack = function(){
  	console.log("Go Back");
  };
}]);