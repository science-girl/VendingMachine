const Coin = require("../src/Coin");
const DEFAULT_COIN_VALUE = { value: 0.05 };

describe("Coin tests", () => {
  let coin;
  let coinWithValue;
  beforeEach(() => {
    coin = new Coin();
    coinWithValue = new Coin(0.1);
  });
  describe("Successful Coin Transactions", () => {
    test("Create a coin with a value of 0.10", () => {
      expect(coinWithValue).toEqual({ value: 0.1 });
    });
    test("Get a coin value", () => {
      expect(coinWithValue.getValue()).toEqual(0.1);
    });
    test("Set a coin value to 0.15", () => {
      expect(coin.setValue(0.15)).toEqual(true);
      expect(coin.getValue()).toEqual(0.15);
    });
  });

  describe("Edge Case Coin Transactions", () => {
    test("Create a coin with no value given", () => {
      expect(coin).toEqual(DEFAULT_COIN_VALUE);
    });
    test("Create a coin with a negative value", () => {
      const negCoin = new Coin(-0.3);
      expect(negCoin).toEqual(DEFAULT_COIN_VALUE);
    });
    test("Create a coin with a value greater than 2", () => {
      const dollar = new Coin(Coin.MAX_COIN_VALUE + 1);
      expect(dollar).toEqual(DEFAULT_COIN_VALUE);
    });
    test("Create a coin with a non-numeric value", () => {
      const nonNumericCoin = new Coin("a");
      expect(nonNumericCoin).toEqual(DEFAULT_COIN_VALUE);
    });
    test("Get a coin value with no set value", () => {
      expect(coin.getValue()).toEqual(0.05);
    });
    test("Set a coin value to a negative value", () => {
      expect(coin.setValue(-0.15)).toEqual(false);
      expect(coin.getValue()).toEqual(0.05);
    });
  });
});
