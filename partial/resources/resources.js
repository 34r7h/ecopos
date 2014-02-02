angular.module('ecopos').controller('ResourcesCtrl',function($scope, deliveryFulfillment, deliveryRoute, editInfo, schedule){
    $scope.deliveryFulfillment = deliveryFulfillment.test;
    $scope.deliveryRoute = deliveryRoute.test;
    $scope.editInfo = editInfo.test;
    $scope.schedule = schedule.test;

});