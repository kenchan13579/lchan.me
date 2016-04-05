angular.module("ken", ["ngAnimate", "ngCookies", "myFilters", "myServices", "myDirectives",
        "profolio"
    ])
    .controller("myCtrl", function($scope, $http, myData, $cookies) {
        // if ($cookies.get("view")) {
        //     $scope.views = $cookies.get("view");
        // } else {
        //     viewCounter.updateView().then(function(res) {
        //         $scope.views = res.data;
        //         $cookies.put("view", res.data);
        //     });
        // };
        $scope.getJob = function(name) {
            myData.getJobDetails()
                .then(function(res) {
                    $scope.jobDetail = res.data.Companies[name];
                    $scope.jobDetailPage = true;
                }, function(res) {
                    console.error("Data not found");
                });
        };
        $scope.toggleMenu = function() {
            $scope.menu = !$scope.menu;
            $scope.jobDetailPage = false;
            var profolioScope = angular.element(document.getElementById("profolio")).scope();
            profolioScope.profolioDetail.close();

        }

        $scope.showmore = function(i) {
            $scope.proficiencyCSS = {
                width: i + "%"
            };
            $scope.proficiencyPt = {
                left: (i - 5) + "%"
            };
        };
        $scope.clearBar = function() {
            $scope.proficiencyCSS = {
                width: "0%"
            };
            $scope.proficiencyPt = {
                left: "-5px"
            };
        }
        $scope.message = {
            "name": "",
            "email": "",
            "msg": ""
        };


        $scope.emailValidate = function() {

            if ($scope.message["email"] != "") {
                if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.exec($scope.message["email"])) {
                    $scope.invalidEmail = "";
                    return true;
                } else {
                    $scope.invalidEmail = "Invalid Email Address";
                    return false;
                }
            } else {
                return false;
            }
        };
        $scope.send = function() {
            // validate first
            $scope.errors = [];
            if ($scope.user) {

                return false;
            }

            $scope.loading = true;

            var state = true;
            var message = $scope.message;
            for (var attr in message) {
                if (attr === "email" && message[attr] != "") {
                    if (!$scope.emailValidate()) {
                        $scope.errors.push("Email is invalid");
                    }
                } else if (message[attr] === "" && state) {
                    $scope.errors.push("Required field is not filled.");
                    state = false;
                }
            }
            if (state && $scope.errors.length === 0) {
                $http({
                    method: "POST",
                    url: "./contact_handle.php",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    },
                    data: JSON.stringify($scope.message)
                }).then(function(response) {
                    $scope.loading = false;
                    $scope.result = response.data;
                    $scope.done = true;
                }, function(response) {
                    $scope.loading = false;
                    $scope.result = response.status;
                });
            } else {
                $scope.loading = false;
            }

        };

        $http.get("./js/skills.json")
            .then(function(res) {
                $scope.proficient = res.data.proficient;
                $scope.familiar = res.data.familiar;
                $scope.tools = res.data.tools;
            }, function(res) {
                console.error("!!");
            });


    });

setTimeout(function() {
    $(".spinner").remove();
}, 2000);
