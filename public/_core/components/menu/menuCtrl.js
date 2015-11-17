app.controller('menuCtrl', function($scope, $ocLazyLoad, $http, $location, ngProgressLite, RestService, $q, AuthService) {
    ngProgressLite.start();
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
        idRestaurant: 0,
        typePayment: "",
        idUser: 0
    }
    $scope.menus = {
        dishes: {
            ingredients: {

            }
        }
    }
    $scope.init = function() {
        $scope.model.idRestaurant = RestService.getRestaurantId();
        $scope.model.idUser = AuthService.getUser().idPerson;
        //getingredientsfromdishesbyrest
        $http.post('/api/dishes/getDishesFromRestaurant', $scope.model).success(function(data) {
            //console.log(data);
            //$scope.menus = data;
            //console.log(data);
        });
        //===============
        var first = $http.post("/api/dishes/getDishesFromRestaurant", $scope.model),
            second = $http.post("/api/ingredients/getingredientsbydishesbyrest", $scope.model);

        $q.all([first, second]).then(function(result) {
            var tmp = [];
            angular.forEach(result, function(response) {
                tmp.push(JSON.stringify(response.data));
            });
            return tmp;
        }).then(function(tmpResult) {
            /*console.log(JSON.parse(tmpResult[0]));
            console.log(JSON.parse(tmpResult[1]));*/
            $scope.menus.dishes = JSON.parse(tmpResult[0]);
            $scope.menus.dishes.ingredients = JSON.parse(tmpResult[1]);
            //$scope.combinedResult = tmpResult.join(",");
            ngProgressLite.done();
            //console.log(JSON.parse($scope.combinedResult));
        });
    };
    $scope.filterByDish = function(criteria) {
        return function(item) {
            return item.idDish == criteria;
        };
    };
    $scope.dishesToPay = [];


    $scope.model.typePayment = undefined;
    $scope.model.idPayment = undefined;

    $scope.checkout = function() {
        var quantity = 0;
        for (var i = 0; i < $scope.menus.dishes.length; i++) {
            quantity = $scope.menus.dishes[i].quantity
            if (quantity > 0) {
                $scope.dishesToPay.push($scope.menus.dishes[i]);
                console.log("dishesToPay------>", $scope.dishesToPay);
            }
        };
        if ($scope.dishesToPay.length != 0) {
            swal({
                title: 'Payment Method',
                text: 'Select your payment method',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Paying by credit card',
                cancelButtonText: 'Paying by cash',
                confirmButtonClass: 'confirm-class',
                cancelButtonClass: 'cancel-class',
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    swal.disableButtons();
                    $scope.model.typePayment = "credit"
                        //same
                    $http.post('/api/payments/newpayment', $scope.model).then(function(callback) {
                        $scope.model.idPayment = callback.data.generatedPay;
                        console.log("idPayment-----", $scope.model.idPayment);
                        $scope.model.dishes = $scope.dishesToPay;
                        $http.post('/api/payments/addDish', $scope.model).then(function(callback) {
                            console.log(callback);
                        });
                        //fnRecursive(0,$scope.dishesToPay.length);
                    });

                    setTimeout(function() {
                        swal("Transaction completed.");
                    }, 3000);

                } else {
                    swal.disableButtons();
                    $scope.model.typePayment = "cash"
                        //same
                    $http.post('/api/payments/newpayment', $scope.model).then(function(callback) {
                        $scope.model.idPayment = callback.data.generatedPay;
                        console.log("idPayment-----", $scope.model.idPayment);
                        $scope.model.dishes = $scope.dishesToPay;
                        $http.post('/api/payments/addDish', $scope.model).then(function(callback) {
                            console.log(callback);
                        });
                        //fnRecursive(0,$scope.dishesToPay.length);
                    });

                    setTimeout(function() {
                        swal('Transaction completed.');
                    }, 3000);
                }
            }); // end swal



            
        } //end if

    };

    function fnRecursive(i, n) {
        if (i < n) {
            $scope.model.idDish = $scope.dishesToPay[i].idDish;
            $scope.model.quantity = $scope.dishesToPay[i].quantity;
            $http.post('/api/payments/addDish', $scope.model).then(function(callback) {
                console.log(i+"--recursive",callback);
                if (i == (n - 1)) {
                    $http.post('/api/payments/completepayment', $scope.model).then(function(callback) {
                        console.log(callback);
                        $location.path("/main");
                    });
                }
            });
            i++;
            return fnRecursive(i, n);
        } else {
            return 0;
        }
    }
});
