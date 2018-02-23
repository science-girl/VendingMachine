const CoinBank = require("../src/CoinBank");

describe("CoinBank tests", () => {
  let bank;

  beforeEach(() => {
    bank = new CoinBank();
  });
  describe("Successful CoinBank Transactions", () => {
    test("Create a bank with equal balance for each denomination", () => {
      expect().toEqual();
    });
    test("Get bank balance with funds available", () => {
      expect().toEqual();
    });
    test("Deposit 5 two dollar coins", () => {
      expect().toEqual();
    });
    test("Deposit 5 dollar coins", () => {
      expect().toEqual();
    });
    test("Deposit 5 quarters", () => {
      expect().toEqual();
    });
    test("Deposit 5 dimes", () => {
      expect().toEqual();
    });
    test("Deposit 5 nickels", () => {
      expect().toEqual();
    });
    test("Withdraw 5 two dollar coins", () => {
      expect().toEqual();
    });
    test("Withdraw 5 dollar coins", () => {
      expect().toEqual();
    });
    test("Withdraw 5 quarters", () => {
      expect().toEqual();
    });
    test("Withdraw 5 dimes", () => {
      expect().toEqual();
    });
    test("Withdraw 5 nickels", () => {
      expect().toEqual();
    });
  });

  describe("Edge Case CoinBank Transactions", () => {
    test("Create an empty bank", () => {
      expect().toEqual();
    });
    test("Get bank balance with no funds available", () => {
      expect().toEqual();
    });
    test("Deposit a coin denomination that doesn't exist in the CoinBank", () => {
      expect().toEqual();
    });
    test("Deposit a negative amount", () => {
      expect().toEqual();
    });
    test("Withdraw 5 two dollar coins with no funds available", () => {
      expect().toEqual();
    });
    test("Withdraw 5 dollar coins with no funds available", () => {
      expect().toEqual();
    });
    test("Withdraw 5 quarters with no funds available", () => {
      expect().toEqual();
    });
    test("Withdraw 5 dimes with no funds available", () => {
      expect().toEqual();
    });
    test("Withdraw 5 nickels with no funds available", () => {
      expect().toEqual();
    });
  });
});
