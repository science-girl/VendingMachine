const Row = require('./Row');
const Item = require('./Item');
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
  // @returns: the Item corresponding to the given Name and false if the item does not exist
  getItem(rowName, itemIndex) {
    if (
      this.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      this.inventory[rowName].isWithinBounds(itemIndex)
    ) {
      return this.inventory[rowName].getItem(itemIndex);
    }
    return false;
  }

  // @params: string rowName, int itemIndex
  // @returns: true if successfully removed and false otherwise
  removeItem(rowName, itemIndex) {
    if (
      this.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      this.inventory[rowName].isWithinBounds(itemIndex)
    ) {
      return this.inventory[rowName].removeItem(itemIndex);
    }
    return false;
  }

  // @params: string rowName, Item item, int quantity
  // @returns: index of item if successfully added and -1 otherwise
  addItem(rowName, item, quantity) {
    if (this.isRowInInventory(rowName) && item instanceof Item && this.isRoomForMore(rowName)) {
      const itemIndex = this.inventory[rowName].addItem(item);
      this.inventory[rowName].setItemQuantity(itemIndex, quantity);
      return itemIndex;
    }
    return -1;
  }

  // @params: string rowName and int itemIndex of the item to retrive
  // @returns: the quantity corresponding to the given Name and -1 if the item does not exist
  getItemQuantity(rowName, itemIndex) {
    if (this.isRowInInventory(rowName) && isValidItemIndex(itemIndex)) {
      return this.inventory[rowName].getItemQuantity(itemIndex);
    }
    return -1;
  }

  // @params: string rowName and int itemIndex of the item to retrive
  // @returns: true if the quantity was set and false otherwise
  setItemQuantity(rowName, itemIndex, quantity) {
    if (this.isRowInInventory(rowName)) {
      return this.inventory[rowName].setItemQuantity(itemIndex, quantity);
    }
    return false;
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

  // @params: string rowName to determine if another item can be added
  // @returns: true if more items can be added and false if there is no room in the row
  isRoomForMore(rowName) {
    return this.inventory[rowName].getNumberOfItemsInRow() < this.getMaxRowSize();
  }
};
