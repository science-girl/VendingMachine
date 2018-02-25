const CDNCoinBank = require('../src/CDNCoinBank');
const Inventory = require('../src/Inventory');
const Coin = require('../src/Coin');
const isValidQuantity = require('./Validation/isValidQuantity');

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
  // stockChangeMachine(coinArray) {
  // if (
  //   getCoinBalance(twoDollars) +
  //     getCoinBalance(dollars) +
  //     getCoinBalance(quarters) +
  //     getCoinBalance(dimes) +
  //     getCoinBalance(nickels) <
  //   this.getChangeDiffFromMax())
  // {
  //   this.changeMachine.increaseTwoDollarCoins(twoDollars);
  //   this.changeMachine.increaseOneDollarCoins(dollars);
  //   this.changeMachine.increaseQuarters(quarters);
  //   this.changeMachine.increaseDimes(dimes);
  //   this.changeMachine.increaseNickels(nickels);
  //   return true;
  // }
  //   return false;
  // }

  // @params: none
  // @returns: float diff between the maximum and actual balance
  getChangeDiffFromMax() {
    return MAX_CHANGE_BALANCE - this.changeMachine.getBalance();
  }

  // @params: coinArray of coins to add up
  // @returns: true if there is room to add more coins and false otherwise
  canRefillCoins(coinArray) {
    const sum = coinArray.reduce((result, coin) => {
      const coinSum = coin.getValue() * coin.getQuantity();
      return result + coinSum;
    }, 0);
    console.log(sum);
    console.log(this.getChangeDiffFromMax() - sum);
    return this.getChangeDiffFromMax() - sum > 0;
  }
};
