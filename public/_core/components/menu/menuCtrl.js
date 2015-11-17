app.controller('menuCtrl', function($scope, $ocLazyLoad, $http, $location, ngProgressLite,RestService) {




    $ocLazyLoad.load({
        serie: true, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            'assets/menu/js/scripts.js',
            'assets/menu/css/form-elements.css',
            'assets/menu/css/style.css'
        ]
    }).then(function() {
        ngProgressLite.done();

    });
    $scope.model = {
      idRestaurant: 1
    }
    $scope.init = function() {
        ngProgressLite.start();
        
        $scope.model.idRestaurant = RestService.getRestaurantId();
        
        $http.post('/api/ingredients/getingredients',$scope.model).success(function(data) {
          console.log(data);
            /*$scope.posts = data;
            console.log(data);*/
        });
        console.log("Ejecutado");
    };
    $scope.checkout = function() {
        console.log("Checking out your order");
    };
});
