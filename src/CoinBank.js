const Coin = require("./Coin");

// Constants
const TWO_DOLLAR_ACCESSOR = "TwoDollars";
const ONE_DOLLAR_ACCESSOR = "OneDollar";
const QUARTER_ACCESSOR = "Quarter";
const DIME_ACCESSOR = "Dime";
const NICKEL_ACCESSOR = "Nickel";
const DEFAULT_COIN_QUANTITY = 0;

module.exports = class CoinBank {
  // Constructor
  // @params: none
  // @returns: a bank object consisting of a default CoinBank:
  // - TwoDollars($2.00), OneDollar($1.00), Quarters (0.25), Dimes (0.10), Nickels (0.05)
  // - {bank: {<coin_name>: {coin: <Coin>}, ...}
  // TODO: accept an array of different Coin denominations which override the default config
  constructor() {
    this.bank = {};
    this.bank[TWO_DOLLAR_ACCESSOR] = new Coin(2.0, DEFAULT_COIN_QUANTITY);
    this.bank[ONE_DOLLAR_ACCESSOR] = new Coin(1.0, DEFAULT_COIN_QUANTITY);
    this.bank[QUARTER_ACCESSOR] = new Coin(0.25, DEFAULT_COIN_QUANTITY);
    this.bank[DIME_ACCESSOR] = new Coin(0.1, DEFAULT_COIN_QUANTITY);
    this.bank[NICKEL_ACCESSOR] = new Coin(0.05, DEFAULT_COIN_QUANTITY);
  }

  // @params: none
  // @returns: the CoinBank object
  getCoinBank() {
    return this.bank;
  }

  // @params: string coinName to update by int numberOfCoins
  // @returns: true if the deposit was successful and false otherwise
  depositCoin(coinName, numberOfCoins) {}

  // @params: string coinName to withdraw and the int numberOfCoins to withdraw
  // @returns: true if the withdrawal was successful and false otherwise
  withdrawCoin(coinName, numberOfCoins) {}

  // @params: string coinName
  // @returns: the balance of the given string coinName
  getCoinBalance(coinName) {}

  // @params: string coinName
  // @returns: the int numberOfCoins available for the given coinName
  getCoinNumber(coinName) {}

  // @params: none
  // @returns: the total balance of the coin banke
  getBalance() {}
};

// @params:
// @returns:
function isValidCoinName(coinName) {}
