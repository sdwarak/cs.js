const utils_number = require('../utils/number');

const days_of_week = [ 'Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]

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

const apply = orderedItems => {
    if (calculateTotalBeforeTaxes(orderedItems)>18){
        setDiscountForCategory(orderedItems,'Beverage',1);
    } else if (setIsDiscountForACategory(orderedItems,'Sandwich')) {
        setDiscountForCategory(orderedItems,'Beverage',0.25);
    }
    discountForCatergoryOnADay(orderedItems,'Coffee Powder',0.05, days_of_week[3]);
    return orderedItems;
}

module.exports = { apply, display }