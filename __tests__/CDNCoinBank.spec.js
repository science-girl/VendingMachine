const CDNCoinBank = require('../src/CDNCoinBank');
const Coin = require('../src/Coin');
//
// NOTE: These tests only cover methods specific to CDNCoinBank, as
// CoinBank.spec.js uses as its test data the values for the CDNCoinBank
//
describe('Canadian CoinBank tests', () => {
  let bank;
  beforeEach(() => {
    bank = new CDNCoinBank();
  });
  describe('Successful Canadian CoinBank Transactions', () => {
    test('Increase Two Dollar Coins', () => {
      expect(bank.increaseTwoDollarCoins(4)).toEqual(true);
    });
    test('Increase One Dollar Coins', () => {
      expect(bank.increaseOneDollarCoins(4)).toEqual(true);
    });
    test('Increase Quarters', () => {
      expect(bank.increaseQuarters(4)).toEqual(true);
    });
    test('Increase Dimes', () => {
      expect(bank.increaseDimes(4)).toEqual(true);
    });
    test('Increase Nickels', () => {
      expect(bank.increaseNickels(4)).toEqual(true);
    });
    test('Decrease Two Dollar Coins', () => {
      expect(bank.increaseTwoDollarCoins(4)).toEqual(true);
      expect(bank.decreaseTwoDollarCoins(3)).toEqual(true);
    });
    test('Decrease One Dollar Coins', () => {
      expect(bank.increaseOneDollarCoins(4)).toEqual(true);
      expect(bank.decreaseOneDollarCoins(3)).toEqual(true);
    });
    test('Decrease Quarters', () => {
      expect(bank.increaseQuarters(4)).toEqual(true);
      expect(bank.decreaseQuarters(3)).toEqual(true);
    });
    test('Decrease Dimes', () => {
      expect(bank.increaseDimes(4)).toEqual(true);
      expect(bank.decreaseDimes(3)).toEqual(true);
    });
    test('Decrease Nickels', () => {
      expect(bank.increaseNickels(4)).toEqual(true);
      expect(bank.decreaseNickels(3)).toEqual(true);
    });
    test('Get number of two dollar coins', () => {
      expect(bank.increaseTwoDollarCoins(4)).toEqual(true);
      expect(bank.getNumberOfTwoDollarCoins()).toEqual(4);
    });
    test('Get number of one dollar coins', () => {
      expect(bank.increaseOneDollarCoins(4)).toEqual(true);
      expect(bank.getNumberOfOneDollarCoins()).toEqual(4);
    });
    test('Get number of quarters', () => {
      expect(bank.increaseQuarters(4)).toEqual(true);
      expect(bank.getNumberOfQuarterCoins()).toEqual(4);
    });
    test('Get number of dimes', () => {
      expect(bank.increaseDimes(4)).toEqual(true);
      expect(bank.getNumberOfDimeCoins()).toEqual(4);
    });
    test('Get number of nickels', () => {
      expect(bank.increaseNickels(4)).toEqual(true);
      expect(bank.getNumberOfNickelCoins()).toEqual(4);
    });

    test('Get balance of two dollar coins', () => {
      expect(bank.increaseTwoDollarCoins(4)).toEqual(true);
      expect(bank.getTwoDollarBalance()).toEqual(8);
    });
    test('Get balance of one dollar coins', () => {
      expect(bank.increaseOneDollarCoins(4)).toEqual(true);
      expect(bank.getOneDollarBalance()).toEqual(4);
    });
    test('Get balance of quarters', () => {
      expect(bank.increaseQuarters(4)).toEqual(true);
      expect(bank.getQuarterBalance()).toEqual(1);
    });
    test('Get balance of dimes', () => {
      expect(bank.increaseDimes(4)).toEqual(true);
      expect(bank.getDimeBalance()).toEqual(0.4);
    });
    test('Get balance of nickels', () => {
      expect(bank.increaseNickels(4)).toEqual(true);
      expect(bank.getNickelBalance()).toEqual(0.2);
    });
    test('Deposit a coin', () => {
      expect(bank.deposit(new Coin(2, 3))).toEqual(true);
    });
    test('Withdraw a coin when a balance exists', () => {
      // expect(bank.deposit(new Coin(2, 3))).toEqual(true);
    });
    test('Get Change', () => {
      expect(bank.increaseTwoDollarCoins(2)).toEqual(true);
      expect(bank.increaseQuarters(3)).toEqual(true);
      expect(bank.increaseDimes(5)).toEqual(true);
      expect(bank.getChange(2.35)).toEqual(true);
    });
  });

  describe('Edge Case Canadian CoinBank Transactions', () => {
    test('Get bank balance with no funds available', () => {
      expect(bank.getBalance()).toEqual(0);
    });
    test('Increase Two Dollar Coins with invalid input', () => {
      expect(bank.increaseTwoDollarCoins(-4)).toEqual(false);
    });
    test('Increase One Dollar Coins with invalid input', () => {
      expect(bank.increaseOneDollarCoins('b')).toEqual(false);
    });
    test('Increase Quarters with invalid input', () => {
      expect(bank.increaseQuarters(4.5)).toEqual(false);
    });
    test('Increase Dimes', () => {
      expect(bank.increaseDimes(-2.3)).toEqual(false);
    });
    test('Increase Nickels', () => {
      expect(bank.increaseNickels()).toEqual(false);
    });
    test('Decrease Two Dollar Coins', () => {
      expect(bank.increaseTwoDollarCoins(4)).toEqual(true);
      expect(bank.decreaseTwoDollarCoins(5)).toEqual(false);
    });
    test('Decrease One Dollar Coins', () => {
      expect(bank.increaseOneDollarCoins(4)).toEqual(true);
      expect(bank.decreaseOneDollarCoins(5)).toEqual(false);
    });
    test('Decrease Quarters', () => {
      expect(bank.increaseQuarters(4)).toEqual(true);
      expect(bank.decreaseQuarters(5)).toEqual(false);
    });
    test('Decrease Dimes', () => {
      expect(bank.increaseDimes(4)).toEqual(true);
      expect(bank.decreaseDimes(5)).toEqual(false);
    });
    test('Decrease Nickels', () => {
      expect(bank.increaseNickels(4)).toEqual(true);
      expect(bank.decreaseNickels(5)).toEqual(false);
    });
    test('Deposit a foreign coin', () => {
      expect(bank.deposit(new Coin(0.5, 3))).toEqual(false);
    });
    test('Get Change when not enough exists in the bank', () => {
      expect(bank.getChange(2.35)).toEqual(false);
    });
  });
});
