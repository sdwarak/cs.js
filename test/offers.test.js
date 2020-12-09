var offers = require('../app/offers');
var orderedItemsModule = require('../app/ordered_items');
var itemModule = require('../app/items');

test('it should apply a discount', () => {
    let orderedItems = new orderedItemsModule.OrderedItems();
    item1 = new itemModule.Items({"name": "Hoagie",
                                    "price": 12.25,
                                    "category": "Sandwich"});
    item2 = new itemModule.Items({"name": "Americano",
                                    "price": 1.25,
                                    "category": "Beverage"},
   );
    orderedItems.addItem(item1);
    orderedItems.addItem(item2);
    orderedItems = offers.apply(orderedItems);
    let discountedItem = null;
    orderedItems.getItems().every(ele => {
        if(ele.getCategory() == "Beverage"){
            discountedItem = ele;
            return false;
        };
        return true;
    });
    expect(discountedItem.getPrice()).toBe(0.93);
});


test('it should give a beverage free of charge', () => {
    let orderedItems = new orderedItemsModule.OrderedItems();
    item1 = new itemModule.Items({"name": "Sourdough",
                                    "price": 18.00,
                                    "category": "Sandwich"});
    item2 = new itemModule.Items({"name": "Americano",
                                    "price": 1.25,
                                    "category": "Beverage"},
   );
    item3 = new itemModule.Items( {"name": "Cuban",
                                    "price": 1.75,
                                    "category": "Beverage"});  
    orderedItems.addItem(item1);
    orderedItems.addItem(item2);
    orderedItems.addItem(item3);
    orderedItems = offers.apply(orderedItems);
    let freeItem = null;
    orderedItems.getItems().every(ele => {
        if(ele.getCategory() == "Beverage"){
            freeItem = ele;
            return false;
        };
        return true;
    });
    expect(freeItem.getPrice()).toBe(0);
});