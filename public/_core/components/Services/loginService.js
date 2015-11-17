app.factory('AuthService', function($q, $log, $http) {
    var currentUser = undefined;
    return {
        login: function(model) {
            var deferred = $q.defer();

            $http.post('/api/users/login', model)
                .success(function(data) {
                    deferred.resolve(data);
                    currentUser = data;
                    sessionStorage.user = JSON.stringify(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
            return deferred.promise;
        },
        logout: function() {
            currentUser = undefined;
        },
        isLoggedIn: function() {
            if (currentUser == undefined) {
                return false
            } else {
                return true
            }
        },
        getUser: function() {
            if (currentUser == undefined) {
                return JSON.parse(sessionStorage.user);
            } else {
                return currentUser;
            }

        }
    };
});
