var orderedItemsModule = require('../app/ordered_items');


test('it should be initialized with an empty list', () => {
    orderedItem = new orderedItemsModule.OrderedItems();
    expect(orderedItem.getItems()).toStrictEqual([]);
});