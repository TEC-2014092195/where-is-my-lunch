app.controller('menuCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/menu/js/jquery.backstretch.min.js',
          'assets/menu/js/jquery-1.11.1.min.js',
          'assets/menu/js/placeholder.js',
          'assets/menu/js/scripts.js',
          'assets/menu/css/form-elements.css',
          'assets/menu/css/style.css'
      ]
  });

  $scope.init = function() {
      $http.get('/api/menu').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.checkout = function(){
  	console.log("Checking out your order");
  };
}]);