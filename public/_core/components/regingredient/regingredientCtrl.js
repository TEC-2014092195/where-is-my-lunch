imgsrc = "";
function ValidateFields() {
          var x = document.getElementById("ingredientName").value;
          if(x == null || x == '') {
            return false;
          } 
          x = document.getElementById("stocks").value;
          if(x == null || x == '') {
            return false;
          }
          x = document.getElementById("price").value;
          if(x == null || x == '') {
            return false;
          } 
          if(imgsrc == "" || imgsrc == null){
            return false;
          }
          return true;
        };


app.controller('regingredientCtrl', ['$scope','$http', '$location', function($scope,$ocLazyLoad, $http, $location) {
	$ocLazyLoad.load({
	    serie: true, //If true load your files in serie otherwise parallel.
	    cache: false, //reload when go back
	    files: [
	        'assets/regingredient/js/jquery.backstretch.min.js',
	        'assets/regingredient/js/jquery-1.11.1.min.js',
	        'assets/regingredient/js/placeholder.js',
	        'assets/regingredient/js/scripts.js',
	        'assets/regingredient/css/form-elements.css',
	        'assets/regingredient/css/style.css'
	    ]
	});
	var ingredient = {};

	$scope.init = function() {
	  console.log("Ejecutado");
	};

	$scope.registerIngredient = function(){
	if (ValidateFields()){
	  ingredient.ingredientName = $scope.ingredientName;
	  ingredient.photo = imgsrc;
	  ingredient.idRestaurant = 1; /*Id del restaurante seleccionado, guardado en el session storage*/
	  ingredient.stocks = $scope.stocks;
	  ingredient.price = $scope.price;
	  console.log(JSON.stringify(ingredient));
	  var $promise = $http.post('/api/ingredients/regingredient', ingredient);
	  $promise.then(function(msg) {
	      console.log(msg.data);
	  });
	  alert("Producto Registrado");
	  $location.path('/home');
	}
	else{
	  alert("Complete todos los espacios");
	}
		  
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

