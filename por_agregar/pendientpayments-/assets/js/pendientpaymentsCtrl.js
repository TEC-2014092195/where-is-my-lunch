var app = angular.module("pendientpayments",[]);
app.controller('pendientpaymentsCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
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