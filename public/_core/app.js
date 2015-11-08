var app = angular.module('wimlApp', ['ngRoute', 'routeStyles', 'oc.lazyLoad']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        controller: 'homeCtrl',
        resolve: {
            loadModule: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'assets/home/css/animate.min.css',
                        'assets/home/css/creative.css',
                        'assets/home/js/jquery.easing.min.js',
                        'assets/home/js/jquery.fittext.js'
                    ]
                });
            }]
        }
    });
    /*$routeProvider.when('/login', {
        templateUrl: '_core/components/login/loginView.html',
        css: '_core/components/login/loginStyles.css'
    });
    $routeProvider.when('/sign_up', {
        templateUrl: '_core/components/sign_up/sign_upView.html',
        css: '_core/components/sign_up/sign_upStyles.css'
    });*/
    $routeProvider.otherwise({
        redirectTo: '/home'
    });

    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

/*app.run(['$rootScope', function ($rootScope) {

       //create a new instance
       new WOW().init();

    $rootScope.$on('$routeChangeSuccess', function (next, current) {
        //when the view changes sync wow
        new WOW().sync();
    });
}]);*/
