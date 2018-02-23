const Item = require("./Item");
const DEFAULT_QUANTITY_VALUE = 0;

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
        newInventoryEntry["quantity"] = DEFAULT_QUANTITY_VALUE;
        this.inventory[item.name] = newInventoryEntry;
      });
    }
  }

  // @params Entry of an Item item and possible integer quantity to add to inventory
  // @returns true if added and false otherwise
  addEntry(item, quantity) {
    if (!(item.name in this.inventory)) {
      this.inventory[item.name] = item;
      this.inventory["quantity"] = isValidQuantity(quantity)
        ? quantity
        : DEFAULT_QUANTITY_VALUE;
      return true;
    }
    return false;
  }

  // @params Name of Entry to remove
  // @returns true if item was removed and false otherwise
  removeEntry(itemName) {
    if (itemName in this.inventory) {
      delete this.inventory[itemName];
      return true;
    }
    return false;
  }

  // @params Name of Entry to update and new price
  // @returns true if the price was updated for the item and false otherwise
  updatePrice(itemName, newPrice) {
    if (this.isItemInInventory(itemName)) {
      const item = this.inventory[itemName].item;
      return item.setPrice(newPrice);
    }
    return false;
  }

  // @params string itemName of Entry to update and string newName
  // @returns true if the update occurred and false otherwise
  updateName(itemName, newName) {
    if (this.isItemInInventory(itemName)) {
      const item = this.inventory[itemName].item;
      if (item.setName(newName)) {
        this.inventory[item.getName()] = this.inventory[itemName];
        delete this.inventory[itemName];
        return true;
      }
    }
    return false;
  }

  // @params string itemName to increase and integer quantity
  // @returns returns true if quantity was increased and false if the quanity wasn't increased
  increaseQuantity(itemName, quantity) {
    if (isValidQuantity(quantity) && this.isItemInInventory(itemName)) {
      this.inventory[itemName].quantity =
        this.inventory[itemName].quantity + quantity;
      return true;
    }
    // else no change since the quantity given isn't valid
    return false;
  }

  // @params string itemName to decrease and integer quantity
  // @returns returns true if quantity was decreased and false if the quanity wasn't increased
  decreaseQuantity(itemName, quantity) {
    if (
      isValidQuantity(quantity) &&
      this.isItemInInventory(itemName) &&
      this.inventory[itemName].quantity > quantity
    ) {
      this.inventory[itemName].quantity =
        this.inventory[itemName].quantity - quantity;
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

  // @params string itemName of the item to retrive
  // @returns the Item corresponding to the given Name and false if the item does not exist
  getItem(itemName) {
    if (this.isItemInInventory(itemName)) {
      return this.inventory[itemName].item;
    }
    return false;
  }

  // @params string itemName to check exists in inventory
  // @returns true if the item exists and false otherwise
  isItemInInventory(itemName) {
    return itemName in this.inventory;
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
