app.controller('mainCtrl', function($ocLazyLoad, $scope, ngProgressLite, $rootScope, $http, $timeout, $location, RestService) {

    /*$timeout(function () {
        ngProgressLite.done();
    }, 2000);*/

    $scope.init = function() {
        ngProgressLite.start();
    }
    $scope.init()

    /*angular.element(document).ready(function() {
        
    });*/
    $scope.model = {
        idRestaurant: 0
    }

    $ocLazyLoad.load({
        serie: false, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            'assets/main/css/mainStyle.css',
            'assets/main/js/script.js'
        ]
    }).then(function() {
        ngProgressLite.done();
        //console.log(getRestaurantId());
        //$scope.collapseAction();
        for (var i = 0; i < 6; i++) {
            window.imagesR[i].bind("mouseenter touchenter", function() {
                this.width = 65;
                this.height = 65;
                canvas.redraw();
            }).bind("mouseleave touchleave", function() {
                this.width = 50;
                this.height = 50;
                canvas.redraw();
            }).bind("click tap", function() {
                $scope.model.idRestaurant = this.idRestaurant;
                $scope.getInfoRestaurant();
            });
        }
    });
    var indexColor = 0;
    $scope.getInfoRestaurant = function() {
        var promise = RestService.searchRest($scope.model);
        promise.then(
            function(callback) {
                $scope.collapseHide();
                indexColor = $scope.model.idRestaurant;

                if (indexColor == 1) {
                    indexColor = 2;
                } else if (indexColor == 2) {
                    indexColor = 1;
                }
                $timeout(function() {
                    $timeout(function() {
                        $scope.restaurant = callback;
                        console.log(callback);
                        $scope.restaurant.color = window.colorsDark[indexColor - 1];
                        console.log($scope.restaurant.color);
                        $scope.collapseShow();
                        //$scope.$apply();
                    }, 300);
                }, 300);
            },
            function(errorCallback) {
                console.log('failure loading movie', errorCallback);
            });
        $http.post('/api/spacial/infoRestaurant', $scope.model).then(function(callback) {

        });
    }
    var $active = false;
    $scope.collapseShow = function() {
        $("#collapseExample").collapse('show');
    }
    $scope.collapseHide = function() {
        $("#collapseExample").collapse('hide');
    }
    $scope.showMenu = function() {
        $location.path('/menu');
    }

});
