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

app.directive("cardItem", function() {
    return {
        "type": "E",
        "templateUrl": "templates/card.html",
        "scope": {
            "item": "="
        },
        "link": function($scope, $element, $attrs) {
            console.log($scope.item);
        }
    }
})