app.controller('allpaymentsCtrl',function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          //'assets/allpayments/js/jquery.backstretch.min.js',
          //'assets/allpayments/js/jquery-1.11.1.min.js',
          'assets/allpayments/js/placeholder.js',
          'assets/allpayments/js/scripts.js',
          'assets/allpayments/css/form-elements.css',
          'assets/allpayments/css/style.css'
      ]
  });

  $scope.submitData = function() {
    payment = {};
    payment.ingredientName = $scope.ingredientName;
    payment.idRestaurant = parseInt($scope.idRestaurant) || undefined;
    payment.iniDate = $scope.iniDate || undefined;
    payment.finDate = $scope.finDate || undefined;
    console.log("Getting Data");
    var $promise = $http.post('/api/payments/consultingredient',payment);
        $promise.then(function(msg) {
          $scope.posts = msg.data;
          if(msg.data.lenght == 0){
            alert("No elements");
          }
          console.log(msg);
        });
  };
});