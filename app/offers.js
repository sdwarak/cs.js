const utils_number = require('../utils/number');

const days_of_week = [ 'Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const display = () => {
    console.log('\nGet a beverage at a discounted price when you order a sandwich.' +
      '\nIf the total is over 18 dollar get a beverage for free.' +
      '\nOffers cannot be combined.\n' + 
      '\nAn additional 5 percent discount all coffee powders on Wednesdays.\n');
}

const calculateTotalBeforeTaxes = (orderedItems) => {
    let totalBeforeTax = 0;
    orderedItems.getItems().forEach(ele => 
        totalBeforeTax += ele.getPrice()
    );
    return totalBeforeTax;
}

const setIsDiscountForACategory = (orderedItems,category) => {
    let isDiscount = false;
    orderedItems.getItems().every(ele => {
        if(ele.getCategory() == category){
            isDiscount = true;
            return false;
        };
        return true;
    });
    return isDiscount;
}

const setDiscountForCategory = (orderedItems,category,discount) => {
    orderedItems.getItems().every(ele => {
        if(ele.getCategory() == category){
            ele.setPrice((ele.getPrice()*(1-discount)).toFixedDown(2));
            return false;
        };
        return true;
    });
}

const discountForCatergoryOnADay = (orderedItems,category,discount,day) => {
    const today = new Date();
    if ( Array.prototype.indexOf.call(days_of_week, day) == today.getDay()) {
        orderedItems.getItems().forEach(ele => {
            if(ele.getCategory() == category){
                ele.setPrice((ele.getPrice()*(1-discount)).toFixedDown(2));
            };
        });
    }
}

var Offers = function() {
    this.rule = "";
};
 
Offers.prototype = {
    setStrategy: function(rule) {
        this.rule = rule;
    },
 
    calculate: function(orderedItems) {
        return this.rule.calculate(orderedItems);
    }
};
 
var OrderOver18Discount = function() {
    this.calculate = function(orderedItems) {
        if (calculateTotalBeforeTaxes(orderedItems)>18) {
            setDiscountForCategory(orderedItems,'Beverage',1);
        }
        return orderedItems;
    }
};
 
var SandwichDiscount = function() {
    this.calculate = function(orderedItems) {
        if (setIsDiscountForACategory(orderedItems,'Sandwich')) {
            setDiscountForCategory(orderedItems,'Beverage',0.25);
        }
        return orderedItems;
    }
};
 
var CoffeePowderDiscount = function() {
    this.calculate = function(orderedItems) {
        discountForCatergoryOnADay(orderedItems,'Coffee Powder',0.05, days_of_week[3]);
        return orderedItems;
    }
}; 

const rules = [new OrderOver18Discount(),
    new SandwichDiscount(),
    new CoffeePowderDiscount()]

const apply = orderedItems => {
    var offers = new Offers();
    orderedItems = rules.reduce((ol,rule) => {
                        offers.setStrategy(rule);
                        return offers.calculate(orderedItems);
                    },orderedItems);
    return orderedItems;
}

module.exports = { apply, display }