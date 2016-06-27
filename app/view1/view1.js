'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
  $scope.runCombat = function () {
    $scope.results = "";
    var pCurrent = $scope.pEndurance;
    var eCurrent = $scope.eEndurance;
    $scope.ratio = $scope.pCombat - $scope.eCombat;

    while (pCurrent > 0 && eCurrent > 0) {
      console.log("Player: " + pCurrent);
      console.log("Enemy: " + eCurrent);
      $scope.results+="You have " + pCurrent + " health. The enemy has " + eCurrent + " health.\n";
      var roll = Math.floor(Math.random() * 10);
      $scope.results+="You rolled a " + roll + "!\n"
      var result = lookupResult(roll, $scope.ratio);
      if (result[0]=='K') {
        $scope.results+="You instantly slay the enemy with a mighty blow!\n";
        eCurrent=0;
      } else {
        eCurrent-=result[0];
        $scope.results+="The enemy takes " + result[0] + " damage!\n"
      }
      if (result[1]=='K') {
        $scope.results+="The enemy snuffs out your pathetic life with a mighty blow!\n"
        pCurrent=0;
      } else {
        pCurrent-=result[1];
        $scope.results+="You take " + result[1] + " damage!\n"
      }
    }
    if (eCurrent <=0) {
      $scope.results+="The enemy has died.\n";
    }
    if (pCurrent <= 0) {
      $scope.results+="You have died.\n";
    } else {
      $scope.results+="You have survived combat with " + pCurrent + " health.";
    }
    
  }
  var lookupResult = function(roll, ratio){
    if (roll == 0) roll = 10;
    roll--;
    var column = (ratio / 2);
    if (column < 0) column = Math.floor(column);
    column = Math.ceil(column);
    column+=6;
    column=Math.min(Math.max(0,column),12);
    var table = [[[0 , 'K'],[0 , 'K'],[0 , 8],[0 , 6],[1 , 6],[2 , 5],[3 , 5],[4 , 5],[5 , 4],[6 , 4],[7 , 4],[8 , 3],[9 , 3]],
[[0 , 'K'],[0 , 8],[0 , 7],[1 , 6],[2 , 5],[3 , 5],[4 , 4],[5 , 4],[6 , 3],[7 , 3],[8 , 3],[9 , 3],[10 , 2]],
[[0 , 8],[0 , 7],[1 , 6],[2 , 5],[3 , 5],[4 , 4],[5 , 4],[6 , 3],[7 , 3],[8 , 3],[9 , 2],[10 , 2],[11 , 2]],
[[0 , 8],[1 , 7],[2 , 6],[3 , 5],[4 , 4],[5 , 4],[6 , 3],[7 , 3],[8 , 2],[9 , 2],[10 , 2],[11 , 2],[12 , 2]],
[[1 , 7],[2 , 6],[3 , 5],[4 , 4],[5 , 4],[6 , 3],[7 , 2],[8 , 2],[9 , 2],[10 , 2],[11 , 2],[12 , 2],[14 , 1]],
[[2 , 6],[3 , 6],[4 , 5],[5 , 4],[6 , 3],[7 , 2],[8 , 2],[9 , 2],[10 , 2],[11 , 1],[12 , 1],[14 , 1],[16 , 1]],
[[3 , 5],[4 , 5],[5 , 4],[6 , 3],[7 , 2],[8 , 2],[9 , 1],[10 , 1],[11 , 1],[12 , 0],[14 , 0],[16 , 0],[18 , 0]],
[[4 , 4],[5 , 4],[6 , 3],[7 , 2],[8 , 1],[9 , 1],[10 , 0],[11 , 0],[12 , 0],[14 , 0],[16 , 0],[18 , 0],['K' , 0]],
[[5 , 3],[6 , 3],[7 , 2],[8 , 0],[9 , 0],[10 , 0],[11 , 0],[12 , 0],[14 , 0],[16 , 0],[18 , 0],['K' , 0],['K' , 0]],
[[6 , 0],[7 , 0],[8 , 0],[9 , 0],[10 , 0],[11, 0],[12 , 0],[14 , 0],[16 , 0],[18 , 0],['K' , 0],['K' , 0],['K' , 0]]];
    console.log("row: " + roll);
    console.log("ratio: " + ratio);
    console.log("column: " + column);
    console.log("result: " + table[roll][column])
    return table[roll][column];
  };
});
