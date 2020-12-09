class Items {

    constructor({name,category,price}=item){   
        var name;
        var category;
        var price;
        this.name = name;
        this.category = category;
        this.price = price;
    }

    setName(name){
        this.name = name;
    }

    setPrice(price){
        this.price = price;
    }

    setCategory(category){
        this.category = category;
    }
  
    getName(){
        return this.name;
    }

    getPrice(){
        return this.price;
    }

    getCategory(){
        return this.category;
    }

    getTax(){
        // Taxes are in percentage
        if (this.category === "Beverage") {
            return 0.12;
        } else if (this.category === "Sandwich"){
            return 0.08;
        } else {
            return 0.10;
        }
    }

    display(){
        return `${this.name}, ${this.category} for $ ${this.price}`
    }
  
  }

  module.exports = { Items }