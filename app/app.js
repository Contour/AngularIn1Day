var app = angular.module('angularIn1Day', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'cardController',
		templateUrl: './views/main.html'
  }).
  when('/card/:id', {
    controller: 'singleCardController',
		templateUrl: './views/card.html'
  }).
  otherwise({redirectTo: '/'});
}]);

app.controller('singleCardController', function($scope, $routeParams, cardService) {
    $scope.card = {};
    cardService.getCard($routeParams.id).then(function(response) {
        $scope.card = response.data;
    });
});


app.controller("cardController", function($scope, cardService, $location) {
    $scope.cards = [];
    cardService.getCards().then(function(response) {
        $scope.cards = response.data;
    });

    $scope.showDetails = function(id) {
        $location.path("/card/"+id);
    }
});

app.service("cardService", function($http) {
    this.getCards = function () {
        return $http.get("/cards");
    };

    this.getCard = function(id) {
        return $http.get("/card?id="+id);
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