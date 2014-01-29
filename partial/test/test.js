angular.module('ecopos').controller('TestCtrl',function($scope, shopTest, resourcesTest, adminTest, commonTest){
    $scope.w = commonTest.test;
    $scope.x = shopTest.test;
    $scope.y = resourcesTest.test;
    $scope.z = adminTest.test;

});