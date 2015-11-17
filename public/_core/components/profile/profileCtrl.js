app.controller('profileCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/profile/js/jquery.backstretch.min.js',
          'assets/profile/js/jquery-1.11.1.min.js',
          'assets/profile/js/placeholder.js',
          'assets/profile/js/scripts.js',
          'assets/profile/css/form-elements.css',
          'assets/profile/css/style.css'
      ]
  });

  $scope.init = function() {
      $scope.post = sessionStorage.user;
  };
  $scope.editProfile = function(){
  	console.log("Edit Profile");
    $location.path('/editprofile');
  };
  $scope.goBack = function(){
  	console.log("Go Back");
    $location.path('/home');

  };
}]);