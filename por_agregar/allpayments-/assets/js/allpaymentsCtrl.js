var app = angular.module("allpayments",[]);
app.controller('allpaymentsCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/allpayments').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
}]);