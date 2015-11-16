var app = angular.module("menu",[]);
app.controller('menuCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/menu').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.checkout = function(){
  	console.log("Checking out your order");
  };
}]);