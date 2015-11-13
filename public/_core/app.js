var app = angular.module('wimlApp', ['ngRoute', 'oc.lazyLoad', 'jcs-autoValidate']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/login', {
        templateUrl: '_core/components/login/loginView.html',
        controller: 'loginCtrl'
    });
    /*$routeProvider.when('/sign_up', {
        templateUrl: '_core/components/sign_up/sign_upView.html',
        css: '_core/components/sign_up/sign_upStyles.css'
    });*/
    $routeProvider.otherwise({
        redirectTo: '/home'
    });


    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run([
    'bootstrap3ElementModifier',
    function(bootstrap3ElementModifier) {
        bootstrap3ElementModifier.enableValidationStateIcons(true);
    }
]);

/*app.run(['$rootScope', function ($rootScope) {

       //create a new instance
       new WOW().init();

    $rootScope.$on('$routeChangeSuccess', function (next, current) {
        //when the view changes sync wow
        new WOW().sync();
    });
}]);*/
