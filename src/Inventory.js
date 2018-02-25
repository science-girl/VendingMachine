const Row = require('./Row');
const isValidPrice = require('./Validation/isValidPrice');
const isValidName = require('./Validation/isValidName');
const isValidItemIndex = require('./Validation/isValidItemIndex');
const isValidQuantity = require('./Validation/isValidQuantity');

const DEFAULT_MAX_ROW_SIZE = 100;

module.exports = class Inventory {
  // Constructor
  // @params no argument or an array of rows
  //       arrayOfRows:  [<Row>, ..., <Row>]
  //       int maxRowSize to specify maximum number or rows
  // @returns an item with the given values
  // {
  //   A: {[{item, quantity}, {item,quantity}, {item, quantity}]}
  //   B: {[{item, quantity}, {item,quantity}, {item, quantity}]}
  // ...
  //   N: {[{item, quantity}, {item,quantity}, {item, quantity}]}
  // }
  constructor(arrayOfRows, maxRowSize) {
    this.maxRowSize = maxRowSize && isValidQuantity(maxRowSize) ? maxRowSize : DEFAULT_MAX_ROW_SIZE;
    this.inventory = {};
    if (arrayOfRows) {
      // loop through arrayOfRows, get each row
      arrayOfRows.forEach((row) => {
        if (row instanceof Row) {
          this.inventory[row.getRowName()] = row;
        }
      });
    }
  }

  // @params: int maxRowSize
  // @returns: true if maxRowSize was set and false otherwise
  setMaxRowSize(maxRowSize) {
    if (isValidQuantity(maxRowSize)) {
      this.maxRowSize = maxRowSize;
      return true;
    }
    return false;
  }

  // @params: none
  // @returns: the maxRowSize set
  getMaxRowSize() {
    return this.maxRowSize;
  }

  // @params: none
  // @returns: all the rows in inventory
  getInventory() {
    return this.inventory;
  }

  // @params Row row to add to inventory
  // @returns true if added and false otherwise
  addRow(row) {
    if (row instanceof Row && !(row.getRowName() in this.inventory)) {
      this.inventory[row.getRowName()] = row;
      return true;
    }
    return false;
  }

  // @params string rowName to remove
  // @returns true if row was removed and false otherwise
  removeRow(rowName) {
    if (rowName in this.inventory) {
      delete this.inventory[rowName];
      return true;
    }
    return false;
  }

  // @params string rowName, int itemIndex to update and new float price
  // @returns true if the price was updated for the item and false otherwise
  updatePrice(rowName, itemIndex, newPrice) {
    if (this.isRowInInventory(rowName) && isValidPrice(newPrice)) {
      return this.inventory[rowName].getItem(itemIndex).setPrice(newPrice);
    }
    return false;
  }

  // @params string rowName, int itemIndex to update and string newName
  // @returns true if the update occurred and false otherwise
  updateName(rowName, itemIndex, newName) {
    if (this.isRowInInventory(rowName) && isValidName(newName) && isValidItemIndex(itemIndex)) {
      return this.inventory[rowName].getItem(itemIndex).setName(newName);
    }
    return false;
  }

  // @params string rowName, int itemIndex to increase and integer quantity
  // @returns returns true if quantity was increased and false if the quanity wasn't increased
  increaseQuantity(rowName, itemIndex, quantity) {
    if (
      isValidQuantity(quantity) &&
      isValidItemIndex(itemIndex) &&
      this.isRowInInventory(rowName)
    ) {
      return this.inventory[rowName].increaseItemQuantity(itemIndex, quantity);
    }
    // else no change since the quantity given isn't valid
    return false;
  }

  // @params string rowName, int itemIndex to decrease by integer quantity
  // @returns returns true if quantity was decreased and false if the quanity wasn't increased
  decreaseQuantity(rowName, itemIndex, quantity) {
    if (
      isValidQuantity(quantity) &&
      isValidItemIndex(itemIndex) &&
      this.isRowInInventory(rowName) &&
      this.inventory[rowName].getItemQuantity(itemIndex) >= quantity
    ) {
      return this.inventory[rowName].decreaseItemQuantity(itemIndex, quantity);
    }
    // else no change since the quantity given isn't valid
    return false;
  }

  // @params: string rowName and int itemIndex of the item to retrive
  // @returns: the Item corresponding to the given Name and {} if the item does not exist
  getItem(rowName, itemIndex) {
    if (
      this.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      this.inventory[rowName].isWithinBounds(itemIndex)
    ) {
      return this.inventory[rowName].getItem(itemIndex);
    }
    return {};
  }

  // @params: string rowName and int itemIndex of the item to retrive
  // @returns: the quantity corresponding to the given Name and -1 if the item does not exist
  getItemQuantity(rowName, itemIndex) {
    if (this.isRowInInventory(rowName) && isValidItemIndex(itemIndex)) {
      return this.inventory[rowName].getItemQuantity(itemIndex);
    }
    return -1;
  }

  // @params string rowName to check exists in inventory
  // @returns row if the row exists and false otherwise
  getRow(rowName) {
    return this.inventory[rowName];
  }

  // @params string rowName to check exists in inventory
  // @returns true if the row exists and false otherwise
  isRowInInventory(rowName) {
    return rowName in this.inventory;
  }
};
