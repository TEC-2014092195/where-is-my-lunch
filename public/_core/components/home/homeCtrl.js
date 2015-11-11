app.controller('homeCtrl', function($scope, $http, $location,$ocLazyLoad) {
    $ocLazyLoad.load('assets/home/js/creative.js');
});