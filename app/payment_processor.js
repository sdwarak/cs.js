var orderedItemsModule = require('./ordered_items');
const utils_number = require('../utils/number');

class PaymentProcessor {

    constructor(){
        var orderedItems;
        var total;
        this.orderedItems = new orderedItemsModule.OrderedItems();
        this.total = 0;
    }

    purchase(item) {
        this.orderedItems.addItem(item);
    }

    cancelOrderedItem(item){
        this.orderedItems.removeItem(item);
    }

    showOrderedItems(){    
        this.orderedItems.getItems().forEach(ele => 
            console.log(`${ele.getName()}: $ ${ele.getPrice()}`)
        );
        console.log(`Your total with taxes is ${this.total}`);
        return this.orderedItems;
    }

    calculate(){
        let totalBeforeTax = 0;
        let isDiscount = false;
        this.orderedItems.getItems().forEach(ele => 
            totalBeforeTax += ele.getPrice()
        );
        this.orderedItems.getItems().every(ele => {
            if(ele.getCategory() == 'Sandwich'){
                isDiscount = true;
                return false;
            };
            return true;
        });
        if (totalBeforeTax>18){
            this.orderedItems.getItems().every(ele => {
                if(ele.getCategory() == 'Beverage'){
                    ele.setPrice(0);
                    return false;
                };
                return true;
            });   
        } else if (isDiscount) {
            this.orderedItems.getItems().every(ele => {
                if(ele.getCategory() == 'Beverage'){
                    // Give a 25 % discount
                    ele.setPrice(ele.getPrice()*0.75);
                    return false;
                };
                return true;
            });
        }
        this.orderedItems.getItems().forEach(ele => 
            this.total += ele.getPrice()*(1+ele.getTax())
        );
        this.total = this.total.toFixedDown(2);
        return this.total;
    }

    resetOrderedItems(){
        this.orderedItems = new orderedItemsModule.OrderedItems();
    }

    display(){
        console.log('\nGet a beverage at a discounted price when you order a sandwich.' +
          '\nIf the total is over 18 dollar get a beverage for free.' +
          '\nOffers cannot be combined.\n')
    }

}

module.exports = { PaymentProcessor }