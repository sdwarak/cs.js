var orderedItemsModule = require('./ordered_items');
const offers = require('./offers');

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
        let offeredAppliedItems = offers.apply(this.orderedItems);
        offeredAppliedItems.getItems().forEach(ele => 
            this.total += ele.getPrice()*(1+ele.getTax())
        );
        this.total = this.total.toFixedDown(2);
        return this.total;
    }

    resetOrderedItems(){
        this.orderedItems = new orderedItemsModule.OrderedItems();
    }


}

module.exports = { PaymentProcessor }