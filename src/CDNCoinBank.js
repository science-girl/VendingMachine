const Coin = require("./Coin");
const CoinBank = require("./CoinBank");

const DENOMINATIONS = [
  { name: "TwoDollars", value: 2.0 },
  { name: "OneDollar", value: 1.0 },
  { name: "Quarter", value: 0.25 },
  { name: "Dime", value: 0.1 },
  { name: "Nickel", value: 0.05 }
];

module.exports = class CDNCoinBank {
  // Constructor
  // @params: none
  // @returns: a bank object consisting of a default CoinBank:
  // - TwoDollars($2.00), OneDollar($1.00), Quarters (0.25), Dimes (0.10), Nickels (0.05)
  // - {bank: {<coin_name>: {coin: <Coin>}, ...}
  constructor() {
    this.bank = new CoinBank(DENOMINATIONS);
    //console.log(this.bank);
  }

  // @params: none
  // @returns: int numberOfTwoDollar coins
  getNumberOfTwoDollarCoins() {
    return this.bank.getCoinNumber(DENOMINATIONS[0].name);
  }

  // @params: none
  // @returns: int numberOfOneDollar coins
  getNumberOfOneDollarCoins() {
    return this.bank.getCoinNumber(DENOMINATIONS[1].name);
  }

  // @params: none
  // @returns: int numberOfQuarter coins
  getNumberOfQuarterCoins() {
    return this.bank.getCoinNumber(DENOMINATIONS[2].name);
  }

  // @params: none
  // @returns: int numberOfDime coins
  getNumberOfDimeCoins() {
    return this.bank.getCoinNumber(DENOMINATIONS[3].name);
  }

  // @params: none
  // @returns: int numberOfNickel coins
  getNumberOfNickelCoins() {
    return this.bank.getCoinNumber(DENOMINATIONS[4].name);
  }

  // @params: int numberOfTwoDollarCoins
  // @returns: true if increased and false otherwise
  increaseTwoDollarCoins(numberOfTwoDollarCoins) {
    return this.bank.depositCoin(DENOMINATIONS[0].name, numberOfTwoDollarCoins);
  }
  // @params: int numberOfOneDollarCoins
  // @returns: true if increased and false otherwise
  increaseOneDollarCoins(numberOfOneDollarCoins) {
    return this.bank.depositCoin(DENOMINATIONS[1].name, numberOfOneDollarCoins);
  }
  // @params: int numberOfQuarters
  // @returns: true if increased and false otherwise
  increaseQuarters(numberOfQuarters) {
    return this.bank.depositCoin(DENOMINATIONS[2].name, numberOfQuarters);
  }
  // @params: int numberOfDimes
  // @returns: true if increased and false otherwise
  increaseDimes(numberOfDimes) {
    return this.bank.depositCoin(DENOMINATIONS[3].name, numberOfDimes);
  }
  // @params: int numberOfNickels
  // @returns: true if increased and false otherwise
  increaseNickels(numberOfNickels) {
    return this.bank.depositCoin(DENOMINATIONS[4].name, numberOfNickels);
  }
  // @params: int numberOfTwoDollarCoins
  // @returns: true if decreased and false otherwise
  decreaseTwoDollarCoins(numberOfTwoDollarCoins) {
    return this.bank.withdrawCoin(
      DENOMINATIONS[0].name,
      numberOfTwoDollarCoins
    );
  }
  // @params: int numberOfOneDollarCoins
  // @returns: true if decreased and false otherwise
  decreaseOneDollarCoins(numberOfOneDollarCoins) {
    return this.bank.withdrawCoin(
      DENOMINATIONS[1].name,
      numberOfOneDollarCoins
    );
  }
  // @params: int numberOfQuarters
  // @returns: true if decreased and false otherwise
  decreaseQuarters(numberOfQuarters) {
    return this.bank.withdrawCoin(DENOMINATIONS[2].name, numberOfQuarters);
  }
  // @params: int numberOfDimes
  // @returns: true if decreased and false otherwise
  decreaseDimes(numberOfDimes) {
    return this.bank.withdrawCoin(DENOMINATIONS[3].name, numberOfDimes);
  }
  // @params: int numberOfNickels
  // @returns: true if decreased and false otherwise
  decreaseNickels(numberOfNickels) {
    return this.bank.withdrawCoin(DENOMINATIONS[4].name, numberOfNickels);
  }

  // @params: none
  // @returns: the monetary two dollar balance
  getTwoDollarBalance() {
    return this.bank.getCoinBalance(DENOMINATIONS[0].name);
  }

  // @params: none
  // @returns: the monetary dollar balance
  getOneDollarBalance() {
    return this.bank.getCoinBalance(DENOMINATIONS[1].name);
  }

  // @params: none
  // @returns: the monetary quarter balance
  getQuarterBalance() {
    return this.bank.getCoinBalance(DENOMINATIONS[2].name);
  }
  // @params: none
  // @returns: the monetary dime balance
  getDimeBalance() {
    return this.bank.getCoinBalance(DENOMINATIONS[3].name);
  }

  // @params: none
  // @returns: the monetary nickel balance
  getNickelBalance() {
    return this.bank.getCoinBalance(DENOMINATIONS[4].name);
  }

  // @params: none
  // @returns: the monetary balance of the bank
  getBalance() {
    return this.bank.getBalance();
  }
};
