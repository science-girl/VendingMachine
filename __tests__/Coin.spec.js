const Coin = require("../src/Coin");
const DEFAULT_COIN_VALUE = { value: 0.01 };

describe("Coin tests", () => {
  let coin;
  let coinWithValue;
  beforeEach(() => {
    coin = new Coin();
    coinWithValue = new Coin(0.05);
  });
  describe("Successful Coin Transactions", () => {
    test("Create a coin with a value of 0.05", () => {
      expect(coinWithValue).toEqual({ value: 0.05 });
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
  });
});
