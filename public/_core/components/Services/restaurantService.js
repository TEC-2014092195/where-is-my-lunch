app.factory('RestService', function($q,$log,$http) {
    var currentRestaurant = undefined;
    return {
        searchRest: function(model) {
            var deferred = $q.defer();
            
            $http.post('/api/spacial/infoRestaurant', model)
                .success(function(data) {
                    deferred.resolve(data);
                    currentRestaurant = data;
                    sessionStorage.restaurant = JSON.stringify(data);
                    
                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        },
        getRestaurantObject: function() {
            return JSON.parse(sessionStorage.restaurant);
        },
        getRestaurantId: function(){
            return JSON.parse(sessionStorage.restaurant).idRestaurant;
        }
    };
});