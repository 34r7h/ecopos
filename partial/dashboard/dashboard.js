angular.module('ecopos').controller('DashboardCtrl',function($scope, confirmPO, editCustomer, editEmployee, editStore, editSupplier, fairTrade, money){
    $scope.confirmPO = confirmPO.test;
    $scope.editCustomer = editCustomer.test;
    $scope.editEmployee = editEmployee.test;
    $scope.editStore = editStore.test;
    $scope.editSupplier = editSupplier.test;
    $scope.fairTrade = fairTrade.test;
    $scope.money = money.test;

});
