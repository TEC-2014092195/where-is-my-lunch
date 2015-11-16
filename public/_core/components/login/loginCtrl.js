app.controller('loginCtrl', function($scope, $ocLazyLoad,$location) {

    $ocLazyLoad.load({
        serie: true, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            'assets/login/js/jquery.backstretch.min.js',
            'assets/login/css/form-elements.css',
            'assets/login/css/style.css',
            'assets/login/js/scripts.js' //angular-form
        ]
    });

    $scope.submit = function() {
        if ($scope.loginFrm.$valid) {
            console.log($scope.model);
        }
    }
    $scope.sign_up = function(){
        $location.path('/sign_up');
    }



});