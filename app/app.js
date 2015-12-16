var app = angular.module("angularIn1Day", []).config(function($sceProvider) {
    $sceProvider.enabled(false);
});

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

app.filter("highlight", function() {
    return function(stringElement, query) {
        if (stringElement && query && stringElement.indexOf(query) > -1) {
            return stringElement.replace(new RegExp(query, 'g'), "<span class='hl'>"+query+"</span>");
        } else {
            return stringElement;
        }
    }
});