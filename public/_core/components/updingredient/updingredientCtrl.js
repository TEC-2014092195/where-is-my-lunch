imgsrc = "";
app.controller('updingredientCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad,$http, $location) {
	$ocLazyLoad.load({
	    serie: true, //If true load your files in serie otherwise parallel.
	    cache: false, //reload when go back
	    files: [
	        'assets/updingredient/js/jquery.backstretch.min.js',
	        'assets/updingredient/js/jquery-1.11.1.min.js',
	        'assets/updingredient/js/placeholder.js',
	        'assets/updingredient/js/scripts.js',
	        'assets/updingredient/css/form-elements.css',
	        'assets/updingredient/css/style.css'
	    ]
	});
  var ingredient = {};

  $scope.init = function() {
      console.log("Ejecutado");
  };

  $scope.updateIngredient = function(){
      ingredient.ingredientName = $scope.ingredientName || null;
      ingredient.photo = imgsrc || null;
      ingredient.idRestaurant = 1; /*Id del restaurante seleccionado, guardado en el session storage*/
      ingredient.stocks = $scope.stocks || null;
      ingredient.price = $scope.price || null;
      console.log(JSON.stringify(ingredient));
      var $promise = $http.post('/api/updingredient/updingredient', ingredient);
      $promise.then(function(msg) {
          console.log(msg.data);
      });
      alert("Producto Actualizado");
      $location.path('/home');
  };

  $scope.goBack = function(){
  	  $location.path('/home');
  };

}]);

function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
        imgsrc = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
};

