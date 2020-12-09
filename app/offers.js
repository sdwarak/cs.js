const display = () => {
    console.log('\nGet a beverage at a discounted price when you order a sandwich.' +
      '\nIf the total is over 18 dollar get a beverage for free.' +
      '\nOffers cannot be combined.\n')
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
            ele.setPrice(ele.getPrice()*(1-discount));
            return false;
        };
        return true;
    });
}

const apply = orderedItems => {
    let totalBeforeTax = 0;
    let isDiscount = false;
    totalBeforeTax = calculateTotalBeforeTaxes(orderedItems);
    isDiscount = setIsDiscountForACategory(orderedItems,'Sandwich');
    if (totalBeforeTax>18){
        setDiscountForCategory(orderedItems,'Beverage',1)
    } else if (isDiscount) {
        setDiscountForCategory(orderedItems,'Beverage',0.25)
    }
    return orderedItems;
}

module.exports = { apply, display }