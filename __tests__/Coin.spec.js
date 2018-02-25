const Coin = require('../src/Coin');

const DEFAULT_COIN_VALUE = { quantity: 0, value: 0.05 };

describe('Coin tests', () => {
  let coin;
  let coinWithValue;
  let coinWithQuantity;
  beforeEach(() => {
    coin = new Coin();
    coinWithValue = new Coin(0.1);
    coinWithQuantity = new Coin(0.1, 2);
  });
  describe('Successful Coin Transactions', () => {
    test('Create a coin with a value of 0.10 and no quantity given', () => {
      expect(coinWithValue).toEqual({ value: 0.1, quantity: 0 });
    });
    test('Create a coin with a value of 0.10 quantity given', () => {
      expect(coinWithQuantity).toEqual({ value: 0.1, quantity: 2 });
    });
    test('Get a coin with quantity given', () => {
      expect(coinWithQuantity.getQuantity()).toEqual(2);
    });
    test('Get a coin value', () => {
      expect(coinWithValue.getValue()).toEqual(0.1);
    });
    test('Set a coin value to 0.15', () => {
      expect(coin.setValue(0.15)).toEqual(true);
      expect(coin.getValue()).toEqual(0.15);
    });
    test('Set a coin quantity to 15', () => {
      expect(coin.setQuantity(15)).toEqual(true);
      expect(coin.getQuantity()).toEqual(15);
    });
    test('Increase a non-zero coin quantity by 5', () => {
      expect(coin.setQuantity(15)).toEqual(true);
      expect(coin.increaseQuantity(5)).toEqual(true);
      expect(coin.getQuantity()).toEqual(20);
    });
    test('Decrease a non-zero coin quantity by 5', () => {
      expect(coin.setQuantity(15)).toEqual(true);
      expect(coin.decreaseQuantity(5)).toEqual(true);
      expect(coin.getQuantity()).toEqual(10);
    });
  });

  describe('Edge Case Coin Transactions', () => {
    test('Create a coin with no value given', () => {
      expect(coin).toEqual(DEFAULT_COIN_VALUE);
    });
    test('Create a coin with a negative value', () => {
      const negCoin = new Coin(-0.3);
      expect(negCoin).toEqual(DEFAULT_COIN_VALUE);
    });
    test('Create a coin with more than 2 floating point values', () => {
      const floatCoin = new Coin(0.345);
      expect(floatCoin).toEqual({ value: 0.35, quantity: 0 });
    });
    test('Create a coin with a value greater than 2', () => {
      const dollar = new Coin(Coin.MAX_COIN_VALUE + 1);
      expect(dollar).toEqual(DEFAULT_COIN_VALUE);
    });
    test('Create a coin with a non-numeric value', () => {
      const nonNumericCoin = new Coin('a');
      expect(nonNumericCoin).toEqual(DEFAULT_COIN_VALUE);
    });
    test('Get a coin value with no set value', () => {
      expect(coin.getValue()).toEqual(0.05);
    });
    test('Set a coin value to a negative value', () => {
      expect(coin.setValue(-0.15)).toEqual(false);
      expect(coin.getValue()).toEqual(0.05);
    });
    test('Decrease a coin with 0 quantity by 5', () => {
      expect(coin.decreaseQuantity(5)).toEqual(false);
      expect(coin.getQuantity()).toEqual(0);
    });
    test('Get a coin quantity with no set value', () => {
      expect(coin.getQuantity()).toEqual(0);
    });
    test('Set a coin quantity to a negative value', () => {
      expect(coin.setQuantity(-0.15)).toEqual(false);
      expect(coin.getQuantity()).toEqual(0);
    });
  });
});
