var app = angular.module('hyperApp', ['ngRoute','routeStyles']);
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/sign_up/sign_upView.html',
        css: '_core/components/sign_up/sign_upStyles.css'
    });

}]);
