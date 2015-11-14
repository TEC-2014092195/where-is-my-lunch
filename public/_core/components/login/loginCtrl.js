app.controller('loginCtrl', function($scope, $ocLazyLoad) {

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
        if ($scope.signupFrm.$valid) {
            console.log($scope.model);
        }
    }



});