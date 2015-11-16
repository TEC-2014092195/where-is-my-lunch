var app = angular.module("viewingredient",[]);
app.controller('viewingredientCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/viewingredient').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.edit = function(ingredient){
  	console.log("Go to edit page");
    var $promise = $http.post('/api/updingredient', ingredient);
        $promise.then(function(msg) {
          console.log(msg.data);
        });
    alert("Ingrediente Actualizado");
    location.reload();
  };
  $scope.delete = function(ingredient){
  	var id = ingredient.idIngredient;
    console.log("Deleting");
    var $promise = $http.post('/api/delingredient', id);
        $promise.then(function(msg) {
          console.log(msg.data);
        });
    alert("Ingrediente Borrado");
    location.reload();
  };
}]);