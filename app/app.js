var app = angular.module("angularIn1Day", []);

app.controller("cardController", function($scope, cardService) {
    $scope.cards = [];
    cardService.getCards().then(function(cards) {
        $scope.cards = cards;
    });
});

app.service("cardService", function($http) {
    this.getCards = function () {
        return $http.get("/getCards");
    }
});