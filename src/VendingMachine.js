const CDNCoinBank = require('../src/CDNCoinBank');
const Inventory = require('../src/Inventory');
const Coin = require('../src/Coin');
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
        this.deposit(coin);
      });
      return true;
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

  // @params: Coin coin
  // @returns: true if the coin was deposited and false otherwise
  deposit(coin) {
    const denominations = this.changeMachine.getDenominations();
    let successfulDeposit;
    switch (coin.getValue()) {
      case denominations[0].value:
        successfulDeposit = this.changeMachine.increaseTwoDollarCoins(coin.getQuantity());
        break;
      case denominations[1].value:
        successfulDeposit = this.changeMachine.increaseOneDollarCoins(coin.getQuantity());
        break;
      case denominations[2].value:
        successfulDeposit = this.changeMachine.increaseQuarters(coin.getQuantity());
        break;
      case denominations[3].value:
        successfulDeposit = this.changeMachine.increaseDimes(coin.getQuantity());
        break;
      case denominations[4].value:
        successfulDeposit = this.changeMachine.increaseNickels(coin.getQuantity());
        break;
      default:
        successfulDeposit = false;
    }
    return successfulDeposit;
  }
};
