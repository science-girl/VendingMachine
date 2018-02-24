const Coin = require('./Coin');

// Constants
const DEFAULT_COIN_QUANTITY = 0;

module.exports = class CoinBank {
  // Constructor
  // @params: none
  // @returns: a bank object consisting of a CoinBank:
  // - {bank: {<coin_name>: {coin: <Coin>}, ...}
  constructor(array) {
    this.bank = {};
    if (array) {
      array.forEach((denomination) => {
        this.bank[denomination.name] = new Coin(denomination.value, DEFAULT_COIN_QUANTITY);
      });
    }
  }

  // @params: none
  // @returns: the CoinBank object
  getCoinBank() {
    return this.bank;
  }

  // @params: string coinName to update by int numberOfCoins
  // @returns: true if the deposit was successful and false otherwise
  depositCoin(coinName, numberOfCoins) {
    if (this.isCoinInBank(coinName)) {
      return this.bank[coinName].increaseQuantity(numberOfCoins);
    }
    return false;
  }

  // @params: string coinName to withdraw and the int numberOfCoins to withdraw
  // @returns: true if the withdrawal was successful and false otherwise
  withdrawCoin(coinName, numberOfCoins) {
    if (this.isCoinInBank(coinName)) {
      return this.bank[coinName].decreaseQuantity(numberOfCoins);
    }
    return false;
  }

  // @params: string coinName
  // @returns: the balance of the given string coinName, otherwise false
  getCoinBalance(coinName) {
    if (this.isCoinInBank(coinName)) {
      return this.bank[coinName].getQuantity() * this.bank[coinName].getValue();
    }
    return false;
  }

  // @params: string coinName
  // @returns: the int numberOfCoins available for the given coinName,
  // otherwise returns false
  getCoinNumber(coinName) {
    if (this.isCoinInBank(coinName)) {
      return this.bank[coinName].getQuantity();
    }
    return false;
  }

  // @params: none
  // @returns: the total balance of the coin bank
  getBalance() {
    return Object.keys(this.bank).reduce(
      (result, coin2) => (this.bank[coin2].getValue() * this.bank[coin2].getQuantity()) + result,
      0,
    );
  }

  // @params string coinName to check exists in bank
  // @returns true if the coin exists and false otherwise
  isCoinInBank(coinName) {
    return coinName in this.bank;
  }
};
