const CoinBank = require('../src/CoinBank');
// Constants
const TWO_DOLLAR_ACCESSOR = 'TwoDollars';
const ONE_DOLLAR_ACCESSOR = 'OneDollar';
const QUARTER_ACCESSOR = 'Quarter';
const DIME_ACCESSOR = 'Dime';
const NICKEL_ACCESSOR = 'Nickel';

const DENOMINATIONS = [
  { name: TWO_DOLLAR_ACCESSOR, value: 2.0 },
  { name: ONE_DOLLAR_ACCESSOR, value: 1.0 },
  { name: QUARTER_ACCESSOR, value: 0.25 },
  { name: DIME_ACCESSOR, value: 0.1 },
  { name: NICKEL_ACCESSOR, value: 0.05 },
];

const DEFAULT_BANK = {
  bank: {
    Dime: {
      quantity: 0,
      value: 0.1,
    },
    Nickel: {
      quantity: 0,
      value: 0.05,
    },
    OneDollar: {
      quantity: 0,
      value: 1,
    },
    Quarter: {
      quantity: 0,
      value: 0.25,
    },
    TwoDollars: {
      quantity: 0,
      value: 2,
    },
  },
};

describe('CoinBank tests', () => {
  let bank;

  beforeEach(() => {
    bank = new CoinBank(DENOMINATIONS);
  });
  describe('Successful CoinBank Transactions', () => {
    test('Create an empty bank', () => {
      expect(bank).toEqual(DEFAULT_BANK);
    });
    test('Is coin in inventory for coin that exists', () => {
      expect(bank.isCoinInBank(TWO_DOLLAR_ACCESSOR)).toEqual(true);
    });
    test('Get coin balance with funds available', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR, 4)).toEqual(true);
      expect(bank.getCoinBalance(TWO_DOLLAR_ACCESSOR)).toEqual(8.0);
    });
    test('Get number of coins with funds available', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR, 4)).toEqual(true);
      expect(bank.getCoinNumber(TWO_DOLLAR_ACCESSOR)).toEqual(4);
    });
    test('Get bank balance with funds available', () => {
      expect(bank.depositCoin(QUARTER_ACCESSOR, 4)).toEqual(true);
      expect(bank.depositCoin(ONE_DOLLAR_ACCESSOR, 4)).toEqual(true);
      expect(bank.getBalance()).toEqual(5);
    });
    test('Deposit 5 two dollar coins', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR, 5)).toEqual(true);
    });
    test('Deposit 5 dollar coins', () => {
      expect(bank.depositCoin(ONE_DOLLAR_ACCESSOR, 5)).toEqual(true);
    });
    test('Deposit 5 quarters', () => {
      expect(bank.depositCoin(QUARTER_ACCESSOR, 5)).toEqual(true);
    });
    test('Deposit 5 dimes', () => {
      expect(bank.depositCoin(DIME_ACCESSOR, 5)).toEqual(true);
    });
    test('Deposit 5 nickels', () => {
      expect(bank.depositCoin(NICKEL_ACCESSOR, 5)).toEqual(true);
    });
    test('Withdraw 5 two dollar coins', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR, 6)).toEqual(true);
      expect(bank.withdrawCoin(TWO_DOLLAR_ACCESSOR, 5)).toEqual(true);
      expect(bank.getCoinNumber(TWO_DOLLAR_ACCESSOR)).toEqual(1);
    });
    test('Withdraw 5 dollar coins', () => {
      expect(bank.depositCoin(ONE_DOLLAR_ACCESSOR, 6)).toEqual(true);
      expect(bank.withdrawCoin(ONE_DOLLAR_ACCESSOR, 5)).toEqual(true);
      expect(bank.getCoinNumber(ONE_DOLLAR_ACCESSOR)).toEqual(1);
    });
    test('Withdraw 5 quarters', () => {
      expect(bank.depositCoin(QUARTER_ACCESSOR, 6)).toEqual(true);
      expect(bank.withdrawCoin(QUARTER_ACCESSOR, 5)).toEqual(true);
      expect(bank.getCoinNumber(QUARTER_ACCESSOR)).toEqual(1);
    });
    test('Withdraw 5 dimes', () => {
      expect(bank.depositCoin(DIME_ACCESSOR, 6)).toEqual(true);
      expect(bank.withdrawCoin(DIME_ACCESSOR, 5)).toEqual(true);
      expect(bank.getCoinNumber(DIME_ACCESSOR)).toEqual(1);
    });
    test('Withdraw 5 nickels', () => {
      expect(bank.depositCoin(NICKEL_ACCESSOR, 6)).toEqual(true);
      expect(bank.withdrawCoin(NICKEL_ACCESSOR, 5)).toEqual(true);
      expect(bank.getCoinNumber(NICKEL_ACCESSOR)).toEqual(1);
    });
  });

  describe('Edge Case CoinBank Transactions', () => {
    test('Get bank balance with no funds available', () => {
      expect(bank.getBalance()).toEqual(0);
    });
    test('Is coin in inventory for coin that does not exist', () => {
      expect(bank.isCoinInBank('NotACoin')).toEqual(false);
    });
    test("Deposit a coin denomination that doesn't exist in the CoinBank", () => {
      expect(bank.depositCoin('NotACoin', 5)).toEqual(false);
    });
    test('Deposit a negative amount', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR, -5)).toEqual(false);
    });
    test('Deposit two dollar coins with no argument', () => {
      expect(bank.depositCoin(TWO_DOLLAR_ACCESSOR)).toEqual(false);
    });
    test('Get coin balance with no funds available', () => {
      expect(bank.getCoinBalance(TWO_DOLLAR_ACCESSOR)).toEqual(0);
    });
    test('Get coin balance for coin that does not exist', () => {
      expect(bank.getCoinBalance('NotACoin')).toEqual(false);
    });
    test("Withdraw a coin denomination that doesn't exist in the CoinBank", () => {
      expect(bank.withdrawCoin('NotACoin', 5)).toEqual(false);
    });
    test('Withdraw 5 two dollar coins with no funds available', () => {
      expect(bank.withdrawCoin(TWO_DOLLAR_ACCESSOR, 5)).toEqual(false);
    });
    test('Withdraw 5 dollar coins with no funds available', () => {
      expect(bank.withdrawCoin(ONE_DOLLAR_ACCESSOR, 5)).toEqual(false);
    });
    test('Withdraw 5 quarters with no funds available', () => {
      expect(bank.withdrawCoin(QUARTER_ACCESSOR, 5)).toEqual(false);
    });
    test('Withdraw 5 dimes with no funds available', () => {
      expect(bank.withdrawCoin(DIME_ACCESSOR, 5)).toEqual(false);
    });
    test('Withdraw 5 nickels with no funds available', () => {
      expect(bank.withdrawCoin(NICKEL_ACCESSOR, 5)).toEqual(false);
    });
  });
});
