app.controller('viewingredientCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
  $ocLazyLoad.load({
      serie: true, //If true load your files in serie otherwise parallel.
      cache: false, //reload when go back
      files: [
          'assets/viewingredient/js/jquery.backstretch.min.js',
          'assets/viewingredient/js/jquery-1.11.1.min.js',
          'assets/viewingredient/js/placeholder.js',
          'assets/viewingredient/js/scripts.js',
          'assets/viewingredient/css/form-elements.css',
          'assets/viewingredient/css/style.css'
      ]
  });

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