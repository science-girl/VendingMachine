const Item = require('./Item');
const isValidName = require('./Validation/isValidName');
const isValidQuantity = require('./Validation/isValidQuantity');
const isValidItemIndex = require('./Validation/isValidItemIndex');

const ITEM_ACCESSOR = 'item';
const QUANTITY_ACCESSOR = 'quantity';
const DEFAULT_NAME = 'default';

module.exports = class Row {
  // Constructor
  // @params: string name for this row and itemArray populating this row
  // [<Item>, ... <Item>]
  // @returns: <name>: {[{item, quantity}, {item,quantity}, {item, quantity}]}
  constructor(name, itemArray) {
    const newRow = {};
    if (isValidName(name)) {
      this.rowName = name;
      if (itemArray) {
        // iterate through the array of items
        const rowArray = [];
        itemArray.forEach((item) => {
          const invItem = {};
          invItem[ITEM_ACCESSOR] = item;
          invItem[QUANTITY_ACCESSOR] = 0;
          rowArray.push(invItem);
        });
        newRow[name] = rowArray;
        this.row = newRow;
      }
    } else {
      this.rowName = DEFAULT_NAME;
      newRow[DEFAULT_NAME] = [];
      this.row = newRow;
    }
  }

  // @params: none
  // @returns: this row instance
  getRow() {
    return this.row;
  }

  // @params: none
  // @returns: the name of this row instance
  getRowName() {
    return this.rowName;
  }

  // @params: none
  // @returns: array of Items and quantities in this row
  getRowItems() {
    return this.row[this.rowName];
  }

  // @params: int itemIndex, int quantity to set
  // @returns: true if quantity was set and false otherwise
  setItemQuantity(itemIndex, quantity) {
    if (isValidItemIndex(itemIndex) && isValidQuantity(quantity)) {
      this.row[this.rowName][itemIndex].quantity = quantity;
      return true;
    }
    return false;
  }

  // @params: int itemIndex, int amtToIncrease
  // @returns: true if the item quantity was increased and false otherwise
  increaseItemQuantity(itemIndex, amtToIncrease) {
    if (isValidQuantity(amtToIncrease) && this.isWithinBounds(itemIndex)) {
      this.row[this.rowName][itemIndex].quantity += amtToIncrease;
      return true;
    }
    return false;
  }

  // @params: int itemIndex, int amtToIncrease
  // @returns: true if the item quantity was decreased and false otherwise
  decreaseItemQuantity(itemIndex, amtToDecrease) {
    if (
      isValidQuantity(amtToDecrease) &&
      this.isWithinBounds(itemIndex) &&
      this.row[this.rowName][itemIndex].quantity >= amtToDecrease
    ) {
      this.row[this.rowName][itemIndex].quantity -= amtToDecrease;
      return true;
    }
    return false;
  }

  // @params: int itemIndex to see quantity
  // @returns: int quantity of item at given itemIndex; -1 otherwise
  getItemQuantity(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      return this.row[this.rowName][itemIndex].quantity;
    }
    return -1;
  }

  // @params: int itemIndex
  // @returns: item name at given itemIndex; -1 otherwise
  getItemName(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      return this.row[this.rowName][itemIndex].item.name;
    }
    return -1;
  }

  // @params: int itemIndex
  // @returns: item at given itemIndex; -1 otherwise
  getItem(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      return this.row[this.rowName][itemIndex].item;
    }
    return -1;
  }

  // @params: int itemIndex
  // @returns: float price of the item at given itemIndex; -1 otherwise
  getItemPrice(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      return this.row[this.rowName][itemIndex].item.price;
    }
    return -1;
  }

  // @params:  Item item to insert into a row
  // @returns: true if the item was added and false otherwise
  addItem(item) {
    if (item instanceof Item) {
      this.row[this.rowName].push(item);
      return true;
    }
    return false;
  }

  // @params:  Item item to delete from the row
  // @returns: true if the item was removed and false otherwise
  removeItem(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      this.row[this.rowName].splice(itemIndex, 1);
      return true;
    }
    return false;
  }

  // @params: none
  // @returns: number of items in the row
  getNumberOfItemsInRow() {
    return this.row[this.rowName].length;
  }

  // @params: int itemIndex
  // @returns: true if the item quantity is 0 and false otherwise
  isOutOfStock(itemIndex) {
    if (this.isWithinBounds(itemIndex)) {
      return this.row[this.rowName][itemIndex].quantity === 0;
    }
    return false;
  }

  // @params: int itemIndex of item
  // @returns: true if the item is within bounds and false otherwise
  isWithinBounds(itemIndex) {
    return this.row && itemIndex < this.row[this.rowName].length;
  }
};
