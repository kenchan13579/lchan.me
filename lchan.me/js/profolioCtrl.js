"use strict";
var app = angular.module("profolio", []);
app.controller("profolioCtrl", function($scope, myData) {$scope.alert = function (){
                console.log("alert");
            };
    myData.getProfolios()
        .then(function(res) {
            $scope.profolios = res.data;
            $scope.profolioDetail = {
                isOpened: false,
                open: function(index) {
                    this.current = $scope.profolios[index];
                    this.setGalleryPic(0);
                    this.isOpened = true;
                },
                close: function() {
                    this.isOpened = false;
                },
                current: null,
                currentGalleryPic: null,
                setGalleryPic: function(index) {
                    this.currentGalleryPic = this.current.screenshot[index];
                },
                isCurrentPic: function(index) {
                    return this.currentGalleryPic === this.current.screenshot[index];
                },
            };

        });

});

app.directive("profolio", function() {
    return {
        restrict: 'E',
        templateUrl: "./partials/profolio.html",
        link: function(scope, ele, attr) {

        }
    }
})
