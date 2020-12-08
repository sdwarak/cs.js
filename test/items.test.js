var itemModule = require('../app/items');

test('it should be constructed using a constructor', () => {
    item = new itemModule.Items({"name": "Sourdough",
                                        "price": 18.00,
                                        "category": "Sandwich"});
    expect(item.getName()).toBe("Sourdough");
    expect(item.getPrice()).toBe(18.00);
    expect(item.getCategory()).toBe("Sandwich");
});

test('it should be able to get proper tax', () => {
    item = new itemModule.Items({"name": "Sourdough",
                                        "price": 18.00,
                                        "category": "Sandwich"});
    expect(item.getTax()).toBe(0.08);
    
});