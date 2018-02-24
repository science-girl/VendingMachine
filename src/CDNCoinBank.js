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
    console.log(this.bank);
  }

  // @params: none
  // @returns: int numberOfTwoDollar coins
  getNumberOfTwoDollarCoins() {
    return this.bank.getQuantity(DENOMINATIONS[0].name);
  }

  // @params: none
  // @returns: int numberOfOneDollar coins
  getNumberOfOneDollarCoins() {
    return this.bank.getQuantity(DENOMINATIONS[1].name);
  }

  // @params: none
  // @returns: int numberOfQuarter coins
  getNumberOfQuarterCoins() {
    return this.bank.getQuantity(DENOMINATIONS[2].name);
  }

  // @params: none
  // @returns: int numberOfDime coins
  getNumberOfDimeCoins() {
    return this.bank.getQuantity(DENOMINATIONS[3].name);
  }

  // @params: none
  // @returns: int numberOfNickel coins
  getNumberOfNickelCoins() {
    return this.bank.getQuantity(DENOMINATIONS[4].name);
  }
};
