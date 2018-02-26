const isValidItemIndex = require('./Validation/isValidItemIndex');
const isValidQuantity = require('./Validation/isValidQuantity');
const CDNCoinBank = require('../src/CDNCoinBank');
const Inventory = require('../src/Inventory');
const Item = require('./Item');
const Row = require('./Row');
const toFloatingPoint = require('./utils/toFloatingPoint');
const addUpChange = require('./utils/addUpChange');

const MAX_CHANGE_BALANCE = 500;

module.exports = class VendingMachine {
  // Constructor
  // @params: Inventory inventoryArray of items in vendingMachine, CDNCoinBank coinbank
  // @returns: a vendingMachine with given inventory and changeMachine
  constructor(inventoryArray, coinBank) {
    this.changeMachine = coinBank || new CDNCoinBank();
    this.vendingInventory = inventoryArray || new Inventory();
  }

  // @params: Coin array
  // @returns: true if the deposit was successful and false otherwise
  stockChangeMachine(coinArray) {
    if (this.canRefillCoins(coinArray)) {
      coinArray.forEach((coin) => {
        this.changeMachine.deposit(coin);
      });
      return true;
    }
    return false;
  }

  // @params: string rowName and int itemIndex to replace with
  // Item newItem and optional int quantity
  // @returns: true if the replacement was successful and false otherwise
  replaceItem(rowName, itemIndex, newItem, quantity) {
    if (
      this.vendingInventory.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      newItem instanceof Item
    ) {
      this.vendingInventory.updateName(rowName, itemIndex, newItem.getName());
      this.vendingInventory.updatePrice(rowName, itemIndex, newItem.getPrice());
      // check if quantity has been supplied:
      if (isValidQuantity(quantity)) {
        this.vendingInventory.setItemQuantity(rowName, itemIndex, quantity);
      } else {
        // set to 0 if not supplied
        this.vendingInventory.setItemQuantity(rowName, itemIndex, 0);
      }
      return true;
    }
    return false;
  }

  // @params: string rowName, int quantity
  // @returns: none.
  setQuantity(rowName, itemIndex, quantity) {
    if (isValidQuantity(quantity)) {
      this.vendingInventory.setItemQuantity(rowName, itemIndex, quantity);
      // set to quantity to 0 otherwise
    } else {
      this.vendingInventory.setItemQuantity(rowName, itemIndex, 0);
    }
  }

  // @params: string rowName, Item item, int quantity
  // @returns: itemIndex of the item if it was successfully inserted, -1 otherwise
  // - creates a new row if the given rowName does not exist
  addNewItem(rowName, newItem, quantity) {
    if (!(newItem instanceof Item)) return -1;
    // if the rowName is in inventory, add it to the end of the row
    if (this.vendingInventory.isRowInInventory(rowName)) {
      this.vendingInventory.getRow(rowName).addItem(newItem);
      this.setQuantity(
        rowName,
        this.vendingInventory.getRow(rowName).getNumberOfItemsInRow() - 1,
        quantity,
      );
      return this.vendingInventory.getRow(rowName).getNumberOfItemsInRow() - 1;
    }
    // if the rowName is not in inventory, create it; item will always be first element
    if (this.vendingInventory.addRow(new Row(rowName, [newItem]))) {
      this.vendingInventory.getRow(rowName).addItem(newItem);
      this.setQuantity(rowName, 0, quantity);
      return 0;
    }

    return -1;
  }

  // @params: string rowName, int itemIndex
  // @returns: true if the item has been successfully deleted and false otherwise
  unstockItem(rowName, itemIndex) {
    if (!this.vendingInventory.isRowInInventory(rowName)) return false;
    return this.vendingInventory.removeItem(rowName, itemIndex);
  }

  // @params: string rowName, int itemIndex, location of item and
  //  int quantity to increase inventory
  // @returns: true if the restock was successful and false otherwise
  restockItem(rowName, itemIndex, quantity) {
    return this.vendingInventory.increaseQuantity(rowName, itemIndex, quantity);
  }

  // @params: none
  // @returns: listing of items in inventory
  getInventory() {
    return this.vendingInventory.getInventory();
  }

  // @params: string rowName, int itemIndex
  // @returns: the name of the item, false otherwise
  getItemName(rowName, itemIndex) {
    if (
      this.vendingInventory.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      this.vendingInventory.getRow(rowName).isWithinBounds(itemIndex) &&
      this.vendingInventory.getItem(rowName, itemIndex) !== undefined
    ) {
      return this.vendingInventory.getItem(rowName, itemIndex).getName();
    }
    return false;
  }

  // @params: string rowName, int itemIndex
  // @returns: quantity of specific item in inventory, else -1
  getItemStock(rowName, itemIndex) {
    if (
      this.vendingInventory.isRowInInventory(rowName) &&
      isValidItemIndex(itemIndex) &&
      this.vendingInventory.getRow(rowName).isWithinBounds(itemIndex)
    ) {
      return this.vendingInventory.getItemQuantity(rowName, itemIndex);
    }
    return -1;
  }

  // @params: string rowName, int itemIndex, array of Coin payment
  // @returns: [Item item, Coin changeArray] if purchase went through and false otherwise
  purchaseItem(rowName, itemIndex, coinArray) {
    const payment = addUpChange(coinArray);
    if (
      payment === 0 ||
      !this.vendingInventory.isRowInInventory(rowName) ||
      !isValidItemIndex(itemIndex) ||
      !this.vendingInventory.getRow(rowName).isWithinBounds(itemIndex)
    ) {
      return false;
    }
    const itemPrice = this.vendingInventory.getItem(rowName, itemIndex).getPrice();
    // Best case scenario - no change needed
    if (itemPrice === payment && this.getItemStock(rowName, itemIndex) >= 1) {
      // deposit itemPrice
      coinArray.forEach(coin => this.changeMachine.deposit(coin));
      // decrement item
      const item = this.vendingInventory.getItem(rowName, itemIndex);
      this.vendingInventory.decreaseQuantity(rowName, itemIndex, 1);

      return [item, []];
    } else if (this.getItemStock(rowName, itemIndex) >= 1 && itemPrice < payment) {
      // check if item is in inventory; check if payment is > price
      // check that change can be dispensed before proceeding with rest of transaction
      // - add coinArray to balance and then subtract change required
      if (payment + this.changeMachine.getBalance() > payment - itemPrice) {
        // deposit itemPrice
        coinArray.forEach(coin => this.changeMachine.deposit(coin));
        // get change
        const change = this.changeMachine.getChange(payment - itemPrice);
        // if change is [], we know that there wasn't the right denomination of
        // change available so we should reverse the deposit and not vend an item

        if (change.length === 0) {
          coinArray.forEach(coin => this.changeMachine.withdraw(coin));
        } else {
          const item = this.vendingInventory.getItem(rowName, itemIndex);
          // decrement item
          this.vendingInventory.decreaseQuantity(rowName, itemIndex, 1);
          return [item, change];
        }
      }
      return false;
    }
    return false;
  }

  // @params: none
  // @returns: float diff between the maximum and actual balance
  getChangeDiffFromMax() {
    return MAX_CHANGE_BALANCE - this.changeMachine.getBalance();
  }

  // @params: none
  // @returns: the change balance of this vending machine
  getChangeBalance() {
    return this.changeMachine.getBalance();
  }

  // @params: coinArray of coins to add up
  // @returns: true if there is room to add more coins and false otherwise
  canRefillCoins(coinArray) {
    const sum = coinArray.reduce((result, coin) => {
      const coinSum = coin.getValue() * coin.getQuantity();
      return toFloatingPoint(result + coinSum);
    }, 0);

    return this.getChangeDiffFromMax() - sum > 0;
  }
};
