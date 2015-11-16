var app = angular.module("allpayments",[]);
app.controller('allpaymentsCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/allpayments/js/jquery.backstretch.min.js',
          'assets/allpayments/js/jquery-1.11.1.min.js',
          'assets/allpayments/js/placeholder.js',
          'assets/allpayments/js/scripts.js',
          'assets/allpayments/css/form-elements.css',
          'assets/allpayments/css/style.css'
      ]
  });

  $scope.init = function() {
      $http.get('/api/allpayments').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
}]);