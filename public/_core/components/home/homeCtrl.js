app.controller('homeCtrl', function($ocLazyLoad, ngProgressLite, $scope, $timeout, $location) {


    $scope.init = function() {
        ngProgressLite.start();
    }
    $scope.init()

    $ocLazyLoad.load({
        serie: true, //If true load your files in serie otherwise parallel.
        cache: false, //reload when go back
        files: [
            'assets/home/css/animate.min.css',
            'assets/home/css/creative.css',
            'assets/home/js/jquery.easing.min.js',
            'assets/home/js/jquery.fittext.js',
            'assets/home/js/creative.js'
        ]
    }).then(function() {
        ngProgressLite.done();

    });
    $scope.goLogin = function(){
        $location.path('/login');
        history.go(0);
    }
});
