var coffeeShopModule = require('../app/coffeeshop');

const coffeeshop = new coffeeShopModule.CoffeeShop();

test('it should display welcome message', () => {
  console.log = jest.fn();
  coffeeshop.display();
  expect(console.log.mock.calls[0][0]).toBe("Welcome to the coffeeshop!!!\n");
});

test('it should display the menu', () => {
    console.log = jest.fn();
    coffeeshop.showMenu();
    expect(console.log.mock.calls[0][0]).toMatch(/Menu:\n/);
});