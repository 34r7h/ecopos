angular.module('ecopos').controller('HeaderCtrl', function($scope, navigation, $firebase, Firebase){

    $scope.links = navigation;
    $scope.items = $firebase(new Firebase('https://ecopos.firebaseio.com/items'));

    $scope.addItem = function(){
        $scope.items.$add({test:"run"});
    };

    $scope.loseItem = function(){
        $scope.items.$remove("test");
    };

    $scope.loseAllItems = function(){
        $scope.items.$remove();
    };



});