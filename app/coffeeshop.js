class CoffeeShop {

  constructor(items) {
    var items;
    if (items instanceof Array) {
        this.items = items;
    } else if (items){
        this.items = [items];
    } else {
      this.items = [];
    }
  }

  getItems(){
    return this.items;
  }

  addItem(item){
    this.items.push(item); 
  }

  removeItem(item){
    return this.list.filter(function(ele){ 
        return ele != item;
    });
  }

  display() {
    console.log("Welcome to the coffeeshop!!!\n");
  }

  showMenu(){
    console.log("Menu:\n");
    for (let i = 0; i < this.items.length; i++) {
      console.log(`${this.items[i].display()}`);
    }
  }

}

module.exports = { CoffeeShop }