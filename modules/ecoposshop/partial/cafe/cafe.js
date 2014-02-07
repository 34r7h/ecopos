angular.module('ecopos.shop').controller('CafeCtrl',function($scope, bins, payment, purchaseOrders, specialOrders, updateCart){
    $scope.bins = bins.test;
    $scope.payment = payment.test;
    $scope.purchaseOrders = purchaseOrders.test;
    $scope.specialOrders = specialOrders.test;
    $scope.updateCart = updateCart.test;

    this.items = {
        "Bambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Fambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Eambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Pambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        "Mambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        },
        " ambs": {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9PCJdr841neSEWlCMR9lGqHfpnXan6e_UumoV4lmF3ykoI9BlYA",
            desc: "Need a friend. Want one now? Your Bambs awaits",
            price: 29

        }
    };


});