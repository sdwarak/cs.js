class OrderedItems {

    constructor(list) {
        var list;
        this.list = [];
    }

    getItems() {
        return this.list;
    }

    addItem(item) {
        this.list.push(item);
    }

    removeItem(item){
        return this.list.filter(function(ele){ 
            return ele != item;
        });
    }

}

module.exports = { OrderedItems }