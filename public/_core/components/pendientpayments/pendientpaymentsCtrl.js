app.controller('pendientpaymentsCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/pendientpayments/js/jquery.backstretch.min.js',
          'assets/pendientpayments/js/jquery-1.11.1.min.js',
          'assets/pendientpayments/js/placeholder.js',
          'assets/pendientpayments/js/scripts.js',
          'assets/pendientpayments/css/form-elements.css',
          'assets/pendientpayments/css/style.css'
      ]
  });

  $scope.init = function() {
      $http.get('/api/pendientpayments').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.confirm = function(payment){
    var id = payment.idPayment;
  	console.log("Confirming the payment");
    var $promise = $http.post('/api/confpayment', id);
        $promise.then(function(msg) {
          console.log(msg.data);
        });
    alert("Pago Confirmado");
    location.reload();
  };
}]);