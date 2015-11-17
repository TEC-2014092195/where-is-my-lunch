app.controller('loginCtrl', function($scope, $ocLazyLoad, $location, $http, ngProgressLite, AuthService) {

    $scope.init = function() {
        ngProgressLite.start();
    }
    $scope.init();
    ngProgressLite.done();
    /*$ocLazyLoad.load({
        serie: true, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            //'assets/login/js/jquery.backstretch.min.js',
            'assets/login/css/form-elements.css',
            'assets/login/css/style.css',
            'assets/login/js/scripts.js' //angular-form
        ]
    }).then(function() {
        ngProgressLite.done();
    });;*/

    $scope.login = function() {
        if ($scope.loginFrm.$valid) {
            var promise = AuthService.login($scope.model);
            promise.then(
                function(callback) {
                    // console.log(callback);
                    if (callback.data == "invalid") {
                        $.notify({
                            message: 'Invalid. Try Again.'
                        }, {
                            allow_dismiss: true,
                            delay: 400,
                            type: 'danger',
                            animate: {
                                enter: 'animated fadeInDown',
                                exit: 'animated fadeOutUp'
                            }
                        });

                    } else {
                        $location.path('main').replace();
                    }
                },
                function(errorCallback) {
                    console.log('Error: ', errorCallback);
                });
            /*$http.post('/api/users/login', $scope.model).then(function(message) {
                console.log();
                console.log(message);

                if (message.data == "invalid") {
                    $.notify({
                        message: 'Invalid. Try Again.'
                    }, {
                        allow_dismiss: true,
                        delay: 400,
                        type: 'danger',
                        animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        }
                    });

                } else {
                    $location.path('main').replace();
                }
                //console.log(data);
            });*/
        }
    }

    $scope.sign_up = function() {
        $location.path('/sign_up');
    }



});
