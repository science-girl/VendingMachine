const CoinBank = require('./CoinBank');

const DENOMINATIONS = [
  { name: 'TwoDollars', value: 2.0 },
  { name: 'OneDollar', value: 1.0 },
  { name: 'Quarter', value: 0.25 },
  { name: 'Dime', value: 0.1 },
  { name: 'Nickel', value: 0.05 },
];

module.exports = class CDNCoinBank {
  // Constructor
  // @params: none
  // @returns: a coinBank object consisting of a default CoinBank:
  // - TwoDollars($2.00), OneDollar($1.00), Quarters (0.25), Dimes (0.10), Nickels (0.05)
  // - {coinBank: {<coin_name>: {coin: <Coin>}, ...}
  constructor() {
    this.coinBank = new CoinBank(DENOMINATIONS);
    // console.log(this.coinBank);
  }

  // @params: none
  // @returns: int numberOfTwoDollar coins
  getNumberOfTwoDollarCoins() {
    return this.coinBank.getCoinNumber(DENOMINATIONS[0].name);
  }

  // @params: none
  // @returns: int numberOfOneDollar coins
  getNumberOfOneDollarCoins() {
    return this.coinBank.getCoinNumber(DENOMINATIONS[1].name);
  }

  // @params: none
  // @returns: int numberOfQuarter coins
  getNumberOfQuarterCoins() {
    return this.coinBank.getCoinNumber(DENOMINATIONS[2].name);
  }

  // @params: none
  // @returns: int numberOfDime coins
  getNumberOfDimeCoins() {
    return this.coinBank.getCoinNumber(DENOMINATIONS[3].name);
  }

  // @params: none
  // @returns: int numberOfNickel coins
  getNumberOfNickelCoins() {
    return this.coinBank.getCoinNumber(DENOMINATIONS[4].name);
  }

  // @params: int numberOfTwoDollarCoins
  // @returns: true if increased and false otherwise
  increaseTwoDollarCoins(numberOfTwoDollarCoins) {
    return this.coinBank.depositCoin(DENOMINATIONS[0].name, numberOfTwoDollarCoins);
  }
  // @params: int numberOfOneDollarCoins
  // @returns: true if increased and false otherwise
  increaseOneDollarCoins(numberOfOneDollarCoins) {
    return this.coinBank.depositCoin(DENOMINATIONS[1].name, numberOfOneDollarCoins);
  }
  // @params: int numberOfQuarters
  // @returns: true if increased and false otherwise
  increaseQuarters(numberOfQuarters) {
    return this.coinBank.depositCoin(DENOMINATIONS[2].name, numberOfQuarters);
  }
  // @params: int numberOfDimes
  // @returns: true if increased and false otherwise
  increaseDimes(numberOfDimes) {
    return this.coinBank.depositCoin(DENOMINATIONS[3].name, numberOfDimes);
  }
  // @params: int numberOfNickels
  // @returns: true if increased and false otherwise
  increaseNickels(numberOfNickels) {
    return this.coinBank.depositCoin(DENOMINATIONS[4].name, numberOfNickels);
  }
  // @params: int numberOfTwoDollarCoins
  // @returns: true if decreased and false otherwise
  decreaseTwoDollarCoins(numberOfTwoDollarCoins) {
    return this.coinBank.withdrawCoin(DENOMINATIONS[0].name, numberOfTwoDollarCoins);
  }
  // @params: int numberOfOneDollarCoins
  // @returns: true if decreased and false otherwise
  decreaseOneDollarCoins(numberOfOneDollarCoins) {
    return this.coinBank.withdrawCoin(DENOMINATIONS[1].name, numberOfOneDollarCoins);
  }
  // @params: int numberOfQuarters
  // @returns: true if decreased and false otherwise
  decreaseQuarters(numberOfQuarters) {
    return this.coinBank.withdrawCoin(DENOMINATIONS[2].name, numberOfQuarters);
  }
  // @params: int numberOfDimes
  // @returns: true if decreased and false otherwise
  decreaseDimes(numberOfDimes) {
    return this.coinBank.withdrawCoin(DENOMINATIONS[3].name, numberOfDimes);
  }
  // @params: int numberOfNickels
  // @returns: true if decreased and false otherwise
  decreaseNickels(numberOfNickels) {
    return this.coinBank.withdrawCoin(DENOMINATIONS[4].name, numberOfNickels);
  }

  // @params: none
  // @returns: the monetary two dollar balance
  getTwoDollarBalance() {
    return this.coinBank.getCoinBalance(DENOMINATIONS[0].name);
  }

  // @params: none
  // @returns: the monetary dollar balance
  getOneDollarBalance() {
    return this.coinBank.getCoinBalance(DENOMINATIONS[1].name);
  }

  // @params: none
  // @returns: the monetary quarter balance
  getQuarterBalance() {
    return this.coinBank.getCoinBalance(DENOMINATIONS[2].name);
  }
  // @params: none
  // @returns: the monetary dime balance
  getDimeBalance() {
    return this.coinBank.getCoinBalance(DENOMINATIONS[3].name);
  }

  // @params: none
  // @returns: the monetary nickel balance
  getNickelBalance() {
    return this.coinBank.getCoinBalance(DENOMINATIONS[4].name);
  }

  // @params: none
  // @returns: the denomination scheme this coin bank adheres to
  getDenominations() {
    return DENOMINATIONS;
  }

  // @params: Coin coin
  // @returns: true if the coin was deposited and false otherwise
  deposit(coin) {
    const denominations = DENOMINATIONS; // this.changeMachine.getDenominations();
    let successfulDeposit;
    switch (coin.getValue()) {
      case denominations[0].value:
        successfulDeposit = this.increaseTwoDollarCoins(coin.getQuantity());
        break;
      case denominations[1].value:
        successfulDeposit = this.increaseOneDollarCoins(coin.getQuantity());
        break;
      case denominations[2].value:
        successfulDeposit = this.increaseQuarters(coin.getQuantity());
        break;
      case denominations[3].value:
        successfulDeposit = this.increaseDimes(coin.getQuantity());
        break;
      case denominations[4].value:
        successfulDeposit = this.increaseNickels(coin.getQuantity());
        break;
      default:
        successfulDeposit = false;
    }
    return successfulDeposit;
  }

  // @params: none
  // @returns: the monetary balance of the coinBank
  getBalance() {
    return this.coinBank.getBalance();
  }
};
