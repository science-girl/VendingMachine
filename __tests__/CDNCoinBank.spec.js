const CDNCoinBank = require("../src/CDNCoinBank");
//
// NOTE: These tests only cover methods specific to CDNCoinBank, as
// CoinBank.spec.js uses as its test data the values for the CDNCoinBank
//
describe("Canadian CoinBank tests", () => {
  let bank;

  beforeEach(() => {
    bank = new CDNCoinBank();
  });
  describe("Successful Canadian CoinBank Transactions", () => {
    test("Create an empty bank", () => {
      expect().toEqual();
    });
  });

  describe("Edge Case Canadian CoinBank Transactions", () => {
    test("Get bank balance with no funds available", () => {
      expect().toEqual();
    });
  });
});
