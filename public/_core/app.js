var app = angular.module('wimlApp', ['ngRoute','routeStyles']);
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {

    /*$routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        css: '_core/components/home/homeStyles.css'
    });
    $routeProvider.when('/login', {
        templateUrl: '_core/components/login/loginView.html',
        css: '_core/components/login/loginStyles.css'
    });
    $routeProvider.when('/sign_up', {
        templateUrl: '_core/components/sign_up/sign_upView.html',
        css: '_core/components/sign_up/sign_upStyles.css'
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });*/
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);
