var app = angular.module("regingredient",[]);
imgsrc = "";
app.controller('regingredientCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  $scope.init = function() {
      $http.get('/api/regingredient').success(function(data) { $scope.posts = data; console.log(data); });
      console.log("Ejecutado");
  };
  $scope.registerIngredient = function(){
  	  console.log("Reg Ingredient");
  };
  $scope.goBack = function(){
  	  console.log("Go Back");
  };
}]);
function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
        imgsrc = reader.result;
        console.log(imgsrc);
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
};

