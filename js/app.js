'use strict';
angular.module('app', ['ngRoute'])
.controller('mainController', function($scope, $http, $rootScope, $location){
  //default url location
  $location.path('/Alderweireld');
  //get the player's array from json
  var requestURL = 'data/player-stats.json';
  $http({
    url: requestURL,
    method: "GET"
  })
  // callback on success
  .then(function(res) {
     console.log(res.data.players);
     $rootScope.allPlayers = [];
     $rootScope.allPlayers = res.data.players;    
  },
  // on error
  function() {
    console.log("call fail");      
  }); 
})

.controller('statsController', function($scope, $http, $routeParams, $rootScope){
  //get players stats from array  - filter by player's name
  $scope.searchStats = $rootScope.allPlayers.filter(function( obj ) {
    return obj.player.name.last == $routeParams.last;
  })[0];
  // calculate passes per minute
  $scope.passPerMin = Math.round((($scope.searchStats.stats[7].value / ($scope.searchStats.stats[4].value + $scope.searchStats.stats[8].value + $scope.searchStats.stats[5].value)))*10)/10;
  //calculate shots per match
  $scope.shotsPerMatch = Math.round(($scope.searchStats.stats[6].value / ($scope.searchStats.stats[0].value + $scope.searchStats.stats[5].value))*100)/100;
})

// ROUTING base
.config(['$routeProvider',  function($routeProvider) {
  $routeProvider
  .when('/',   {templateUrl: 'index.html'})
  .when( '/:last', {templateUrl: 'templates/footballer.html', controller: 'statsController'})
  .otherwise({redirectTo: '/Alderweireld'});
}]);

