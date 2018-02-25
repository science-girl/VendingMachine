// const isValidQuantity = require('./Validation/isValidQuantity');
const CDNCoinBank = require('../src/CDNCoinBank');
const Inventory = require('../src/Inventory');
const toFloatingPoint = require('./Validation/toFloatingPoint');

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

  // @params: none
  // @returns: total number of items in the vending machine
  // getTotalNumberOfInventoryItems() {}

  // @params: string rowName, int itemIndex, array of Coin payment
  // @returns: true if the payment went through and false otherwise
  purchaseItem(rowName, itemIndex, coinArray) {
    const payment = this.addUpChange(coinArray);
    const itemPrice = this.vendingInventory.getItem(rowName, itemIndex).getPrice();
    // check if item is in inventory; check if payment is > price
    if (this.vendingInventory.getItemQuantity(rowName, itemIndex) > 1 && itemPrice <= payment) {
      // DONE IN CDN BANK check if change is required and whether the bank can dispense the change
      // if (payment - itemPrice > this.getChangeBalance()) {
      // TODO: increment coinbank with payment and dispense change

      // decrement item
      this.vendingInventory.decreaseItemQuantity(rowName, itemIndex, 1);

      return true;
      // }
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

  // @params: Coin coinArray to add
  // @returns: the sum of the given coins
  static addUpChange(coinArray) {
    return coinArray.reduce((result, coin) => {
      const coinSum = coin.getValue() * coin.getQuantity();
      return toFloatingPoint(result + coinSum);
    }, 0);
  }
};
