#!/usr/bin/env node
const prompt = require('prompt-sync')({sigint: true});
const fs = require("fs");
const file = "data/items.json"
const utils_number = require('../utils/number');
var itemModule = require('../app/items');
var coffeeShopModule = require('../app/coffeeshop');
var paymentProcessorModule = require('../app/payment_processor');
var offers = require('../app/offers');

var payment_processor = new paymentProcessorModule.PaymentProcessor();

const readFile = fileName => {
    try {
      return JSON.parse(fs.readFileSync(fileName));
    } catch (e) {
      return [];
    }
};

var menu_items = []
file_items = readFile(file) ;
for (let i = 0; i < file_items.length; i++) {
    menu_items.push(new itemModule.Items(file_items[i]));
}

var coffeshop= new coffeeShopModule.CoffeeShop(menu_items);
coffeshop.display();
coffeshop.showMenu();
offers.display();

console.log("Hey, what do you like to Order?")
console.log("Seperate your answers by a comma.")
let items = prompt('>');
items = items.split(',');

coffeshop.getItems().filter(function(ele){ 
    for (let i = 0; i < items.length; i++) {
        if(ele.getName() == items[i]){
            params = {"name": ele.getName(),
                      "category": ele.getCategory(),
                      "price": ele.getPrice()}
            ele = new itemModule.Items(params);
            payment_processor.purchase(ele);
        }
    }
});

const total = payment_processor.calculate();
console.log(`\nYour total with taxes is ${total}\n`);
console.log("*** Receipt ***");
payment_processor.showOrderedItems();
payment_processor.resetOrderedItems();