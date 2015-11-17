var app = angular.module('wimlApp', ['ngRoute', 'oc.lazyLoad', 'jcs-autoValidate', 'ngProgressLite']);
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
    $routeProvider.when('/main', {
        templateUrl: '_core/components/main/mainView.html',
        controller: 'mainCtrl'
    });
    $routeProvider.when('/menu', {
        templateUrl: '_core/components/menu/menuView.html',
        controller: 'menuCtrl'
    });
    $routeProvider.when('/pendientpayments', {
        templateUrl: '_core/components/pendientpayments/pendientpaymentsView.html',
        controller: 'pendientpaymentsCtrl'
    });
    $routeProvider.when('/allpayments', {
        templateUrl: '_core/components/allpayments/allpaymentsView.html',
        controller: 'allpaymentsCtrl'
    });
    $routeProvider.when('/profile', {
        templateUrl: '_core/components/profile/profileView.html',
        controller: 'profileCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/home'
    });


    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

app.run(function(bootstrap3ElementModifier) {
    bootstrap3ElementModifier.enableValidationStateIcons(true);
});

app.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        events: true
    });
}]);

app.config(['ngProgressLiteProvider', function(ngProgressLiteProvider) {
    ngProgressLiteProvider.settings.speed = 1500;
}]);



/*function resolve(index, timeout) {
    return {
        data: function($q, $timeout) {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(console.log('Data resolve called ' + index));
            }, timeout);
            return deferred.promise;
        }
    };
}*/
