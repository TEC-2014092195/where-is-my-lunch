var app = angular.module('wimlApp', ['ngRoute', 'oc.lazyLoad', 'jcs-autoValidate', 'ngProgress']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/home', {
        templateUrl: '_core/components/home/homeView.html',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/login', {
        templateUrl: '_core/components/login/loginView.html',
        controller: 'loginCtrl'
    });
    $routeProvider.when('/sign_up', {
        templateUrl: '_core/components/sign_up/sign_upView.html',
        controller: 'sign_upCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });


    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(function(bootstrap3ElementModifier) {
    bootstrap3ElementModifier.enableValidationStateIcons(true);

    // Do the same with $routeChangeError
});

app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        events: true
    });
}]);

function resolve(index, timeout) {
    return {
        data: function($q, $timeout) {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(console.log('Data resolve called ' + index));
            }, timeout);
            return deferred.promise;
        }
    };
}
