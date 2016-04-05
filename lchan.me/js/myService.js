angular.module("myServices", [])
    .factory("myData", function($http) {
        return {
            getProfolios: function() {
                return $http.get("./js/profolio.json")
            },
            getJobDetails: function() {
                return $http.get("./js/jobs.json");

            }
        }
    })

    .factory("viewCounter", function($http, $cookies) {
        var factory = {};
        factory.updateView = function() {
            return $http({
                method: "POST",
                url: "./view-count.php",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            });
        };
        return factory;
    })
