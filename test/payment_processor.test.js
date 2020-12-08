var itemModule = require('../app/items');
var paymentProcessorModule = require('../app/payment_processor');
var orderedItemsModule = require('../app/ordered_items');

test('it should be possible to purchase and add items to ordered list', () => {
    item = new itemModule.Items({"name": "Sourdough",
                                "price": 18.00,
                                "category": "Sandwich"});
    orderedItem = new orderedItemsModule.OrderedItems();
    orderedItem.addItem(item);
    payment_processor = new paymentProcessorModule.PaymentProcessor();     
    payment_processor.purchase(item);                          
    expect(payment_processor.showOrderedItems()).toStrictEqual(orderedItem);
});

test('it should be possible to calculate the score', () => {
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
    payment_processor = new paymentProcessorModule.PaymentProcessor();
    payment_processor.purchase(item1);    
    payment_processor.purchase(item2);                               
    payment_processor.purchase(item3);                                                          
    expect(payment_processor.calculate()).toBe(21.4);
});