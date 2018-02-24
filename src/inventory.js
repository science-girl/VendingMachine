const DEFAULT_QUANTITY_VALUE = 0;
const ITEM_ACCESSOR = 'item';
const QUANTITY_ACCESSOR = 'quantity';

// @params integer quantity
// @returns true if quantity is a valid input and false otherwise
function isValidQuantity(quantity) {
  // a valid quantity:
  // - must exist
  // - be a positive integer
  // - be an integer
  return !(!quantity || quantity < 0 || quantity % 1 !== 0);
}

// @params string name
// @returns true if name a valid input
function isValidName(name) {
  return !(!name || name === '');
}

module.exports = class Inventory {
  // Constructor
  // @params an empty array or an array of items
  // @returns an item with the given values
  constructor(arrayOfItems) {
    // {<item.name>: {item: <item>, quantity: <quantity>}, ...}
    this.inventory = {};
    if (arrayOfItems) {
      arrayOfItems.map((item) => {
        const key = Object.keys(item)[0];
        const newInventoryEntry = {};
        newInventoryEntry[ITEM_ACCESSOR] = item[key];
        newInventoryEntry[QUANTITY_ACCESSOR] = DEFAULT_QUANTITY_VALUE;
        this.inventory[key] = newInventoryEntry;
        return this.inventory[key];
      });
    }
  }

  // @params string entryName, an Item item and possible integer quantity to add to inventory
  // @returns true if added and false otherwise
  addEntry(entryName, item, quantity) {
    if (!(entryName in this.inventory) && isValidName(entryName)) {
      this.inventory[entryName] = item;
      this.inventory[QUANTITY_ACCESSOR] = isValidQuantity(quantity)
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
      return this.inventory[itemName].item.setPrice(newPrice);
    }
    return false;
  }

  // @params string itemName of Entry to update and string newName
  // @returns true if the update occurred and false otherwise
  updateName(itemName, newName) {
    if (this.isItemInInventory(itemName)) {
      this.inventory[newName] = this.inventory[itemName];
      delete this.inventory[itemName];
      return true;
    }
    return false;
  }

  // @params string itemName to increase and integer quantity
  // @returns returns true if quantity was increased and false if the quanity wasn't increased
  increaseQuantity(itemName, quantity) {
    if (isValidQuantity(quantity) && this.isItemInInventory(itemName)) {
      this.inventory[itemName].quantity = this.inventory[itemName].quantity + quantity;
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
      this.inventory[itemName].quantity = this.inventory[itemName].quantity - quantity;
      return true;
    }
    // else no change since the quantity given isn't valid
    return false;
  }

  // @params: none
  // @returns: the inventory
  getInventory() {
    return this.inventory;
  }

  // @params: string itemName
  // @returns: true if the item quantity is 0 and false otherwise
  isEmpty(itemName) {
    return !this.inventory[itemName].quantity;
  }

  // @params: string itemName of the item to retrive
  // @returns: the Item corresponding to the given Name and false if the item does not exist
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
