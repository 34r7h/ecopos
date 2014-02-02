angular.module('ecopos.shop').controller('CafeCtrl',function($scope, bins, payment, purchaseOrders, specialOrders, updateCart){
    $scope.bins = bins.test;
    $scope.payment = payment.test;
    $scope.purchaseOrders = purchaseOrders.test;
    $scope.specialOrders = specialOrders.test;
    $scope.updateCart = updateCart.test;


});