const Item = require("./Item");

module.exports = class Inventory {
  // Constructor
  // @params an empty array or an array of items
  // @returns an item with the given values
  constructor(arrayOfItems) {
    // {<item.name>: {item: <item>, quantity: <quantity>}, ...}
    this.inventory = {};
    if (arrayOfItems) {
      arrayOfItems.map(item => {
        let newInventoryEntry = {};
        newInventoryEntry["item"] = item;
        newInventoryEntry["quantity"] = 0;
        this.inventory[item.name] = newInventoryEntry;
      });
    }
  }

  // @params Entry of an Item item and possible integer quantity to add to inventory
  // @returns none
  addEntry(item, quantity) {
    this.inventory[item.name] = item;
    this.inventory["quantity"] = isValidQuantity(quantity) ? quantity : 0;
  }

  // @params Name of Entry to remove
  // @returns none
  removeEntry(itemName) {
    delete this.inventory[itemName];
  }

  // @params Name of Entry to update and new price
  // @returns true if the price was updated for the item and false otherwise
  updatePrice(itemName, newPrice) {
    const item = this.inventory[itemName].item;
    return item.setPrice(newPrice);
  }

  // @params string itemName of Entry to update and string newName
  // @returns true if the update occurred and false otherwise
  updateName(itemName, newName) {
    const item = this.inventory[itemName].item;
    if (item.setName(newName)) {
      this.inventory[item.getName()] = this.inventory[itemName];
      delete this.inventory[itemName];
      return true;
    }
    return false;
  }

  // @params string itemName to increase and integer quantity
  // @returns returns true if quantity was increased and false if the quanity wasn't increased
  increaseQuantity(itemName, quantity) {
    if (isValidQuantity(quantity)) {
      this.inventory[itemName].quantity = quantity;
      return true;
    }
    // else no change since the quantity given isn't valid
    return false;
  }

  // @params none
  // @returns the inventory
  getInventory() {
    return this.inventory;
  }
};

// @params integer quantity
// @returns true if quantity is a valid input and false otherwise
function isValidQuantity(quantity) {
  // a valid quantity:
  // - must exist
  // - be a positive integer
  // - be an integer
  return !(!quantity || quantity < 0 || quantity % 1 !== 0);
}
