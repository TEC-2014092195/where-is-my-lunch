var app = angular.module("viewingredient",[]);
app.controller('viewingredientCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/viewingredient').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.edit = function(){
  	console.log("Go to edit page");
  };
  $scope.delete = function(){
  	console.log("Delete this item");
  };
}]);