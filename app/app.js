var app = angular.module("angularIn1Day", []);

app.controller("cardController", function($scope, cardService) {
    $scope.cards = [];
    cardService.getCards().then(function(response) {
        $scope.cards = response.data;
    });
});

app.service("cardService", function($http) {
    this.getCards = function () {
        return $http.get("/cards");
    }
});

app.filter("touppercase", function() {
    return function(element) {
        if (angular.isString(element)) {
            return element.toUpperCase();
        }

        return element;
    }
});