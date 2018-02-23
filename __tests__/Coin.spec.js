const Coin = require("../src/Coin");

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
      expect(coin).toEqual({ value: 0.01 });
    });
  });
});
