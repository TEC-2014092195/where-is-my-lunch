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
    var restaurant = sessionStorage.getItem(restaurant);
    var $promise = $http.post('/api/viewingredient/viewingredient', restaurant);
        $promise.then(function(msg) {
          console.log(msg.data);
          $scope.posts = msg.data;
        });
    console.log("Ejecutado");
  };

  $scope.edit = function(ingredient){
    sessionStorage.setItem('ingredient',ingredient);
    $location.path('/updingredient');
  	console.log("Go to edit page");
  };
  
  $scope.delete = function(ingredient){
    var restaurant = sessionStorage.getItem('restaurant');
    var obj = {};
    obj.idIngredient = ingredient.idIngredient;
    obj.idRestaurant = restaurant.idRestaurant;
    console.log("Deleting");
    var $promise = $http.post('/api/viewingredient/deleteingredient', obj);
        $promise.then(function(msg) {
          console.log(msg.data);
        });
    alert("Ingrediente Borrado");
    location.reload();
  };
}]);