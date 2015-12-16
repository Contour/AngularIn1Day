'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'mainController',
    controllerAs: 'main',
		templateUrl: './views/main.html'
  }).
  when('/card/:id', {
    controller: 'cardController',
    controllerAs: 'single',
		templateUrl: './views/card.html'
  }).
  otherwise({redirectTo: '/'});
}]);

app.service('myService', function($http, $q, $filter) {
  var self = this;
  /**
   * @type {Array}
   */
  var cards;
  var getJSON = function() {
      return $http.get("LEA.json");
  }
  
  this.getCards = function() {
    var deffered = $q.defer();
    if (!cards) {
      getJSON().then(function(response) {
          cards = response.data.cards;
          deffered.resolve(cards);
      });
    } else {
      deffered.resolve(cards);
    }
    
    return deffered.promise;
  }
  
  this.getCardById = function(id) {
    var deffered = $q.defer();
    
    self.getCards().then(function(cards) {
        var card = $filter('filter')(cards, function(item) {
          return item.id == id;
        });
        
        // for (var i =0 ; i< cards.lenght; i++) {
        //   if (cards[i].id == id) {
        //     return cards[i]
        //   }
        // }
        
        deffered.resolve(card[0]);
    });
    
    return deffered.promise;
  }
});

app.controller('mainController', function($scope, myService, $location) {
    var self = this;
    this.cards = [];
    myService.getCards().then(function(cards) {
        self.cards = cards;
    });
    
    this.searchText = '';
    
    this.openDetail = function(id) {
      $location.path('/card/' + id);
    }
});

app.controller('cardController', function($scope, $routeParams, myService) {
    var self = this;
    this.card = {};
    myService.getCardById($routeParams.id).then(function(card) {
        self.card = card;
    });
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