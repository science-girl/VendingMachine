const isValidName = require('./Validation/isValidName');
const isValidPrice = require('./Validation/isValidPrice');

const DEFAULT_ITEM_NAME = 'default';
const DEFAULT_ITEM_PRICE = 0.0;

module.exports = class Item {
  // Constructor
  // @params string name is the item's name and double price is how much the item costs
  // @returns an item with given values otherwise default values for invalid inputs
  constructor(name, price) {
    this.name = isValidName(name) ? name : DEFAULT_ITEM_NAME;
    this.price = isValidPrice(price) ? price : DEFAULT_ITEM_PRICE;
  }

  // @params none
  // @returns string name of this item
  getName() {
    return this.name;
  }

  // @params none
  // @returns double price of this item
  getPrice() {
    return this.price;
  }

  // @params string name to set item
  // @returns true if the name is valid, and false otherwise
  setName(name) {
    if (isValidName(name)) {
      this.name = name;
      return true;
    }
    return false;
  }

  // @params double price to set item
  // @returns true if the price is valid, and false otherwise
  setPrice(price) {
    if (isValidPrice(price)) {
      this.price = price;
      return true;
    }
    return false;
  }
};
