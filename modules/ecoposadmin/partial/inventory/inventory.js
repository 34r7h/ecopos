angular.module('ecopos.admin').controller('InventoryCtrl',function($scope){

    this.inventory = {
        "Banana": {
            variations:{
                locallyGrown: {
                    stock: 200,
                    unit: "lbs",
                    price: 0.79,
                    suppliers:{
                        "Banana Manna":{
                            "Cost":0.20,
                            "Order Number": 34652
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    category: "Fruit",
                    taxRate:1
                }
            },
            tags: ["fruit", "potassium"],
            "Description":"Like avocado, only whiter and sweeter"

        },
        "Milk": {
            variations: {
                "1%": {
                    stock: 5,
                    ctType: "ltr",
                    price: 4,
                    suppliers:{
                        "Cow":{
                            "Cost":0.20,
                            "Order Number": 34652
                        },
                        "Goat":{
                            "Cost":4,
                            "Order Number": 064
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    tags: ["lactose", "grandma"],
                    category: "Dairy",
                    taxRate:1
                },
                "18%": {
                    stock: 9,
                    ctType: "ltr",
                    price: 5,
                    "Description":"Like avocado, only whiter and sweeter",
                    suppliers:{
                        "Cow":{
                            "Cost":0.20,
                            "Order Number": 54269
                        },
                        "Goat":{
                            "Cost":4,
                            "Order Number": 34652
                        }
                    },
                    autoOrder:50,
                    minOrder:250,
                    tags: ["lactose", "mom"],
                    category: "Dairy",
                    taxRate:1
                }
            },
            tags: ["lactose", "mom"],
            "Description":"Thin stuff"
        }
    };

});