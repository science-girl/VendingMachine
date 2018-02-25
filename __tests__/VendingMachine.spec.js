const VendingMachine = require('../src/VendingMachine');
const Coin = require('../src/Coin');
const emptyMachineData = require('../__mock__/VendingMachine/emptyMachineMockData');
const threeByThreeMachineData = require('../__mock__/VendingMachine/threeByThreeVendingMachineData');
const inventoryData = require('../__mock__/VendingMachine/vendingMachineObject');

describe('Vending Machine tests', () => {
  let vendingMachine;
  let coinArray;
  let emptyVendingMachine;
  beforeEach(() => {
    coinArray = [new Coin(2, 4), new Coin(0.5, 4), new Coin(0.1, 3)];
    emptyVendingMachine = new VendingMachine();
    vendingMachine = new VendingMachine(inventoryData);
  });
  describe('Successful Vending Machine Transactions', () => {
    test('Create a vending machine of 3 rows and 3 columns', () => {
      expect(vendingMachine).toEqual(threeByThreeMachineData);
    });
    test('Check if change machine can be refilled', () => {
      expect(vendingMachine.canRefillCoins(coinArray)).toEqual(true);
    });
    test('Get number of unique items in the vending machine', () => {
      expect().toEqual();
    });
    test('Get total number of items in the vending machine', () => {
      expect().toEqual();
    });
    test('Get balance of change in the vending machine', () => {
      expect().toEqual();
    });
    test('Purchase an item with exact change', () => {
      expect().toEqual();
    });
    test('Purchase an item with inexact change', () => {
      expect().toEqual();
    });
    test('Add a new item to the vending machine', () => {
      expect().toEqual();
    });
    test('Restock an item', () => {
      expect().toEqual();
    });
    test('Restock change', () => {
      expect().toEqual();
    });
    test('Swap an item in the vending machine for a new item', () => {
      expect().toEqual();
    });
    test('Remove an item in the vending machine', () => {
      expect().toEqual();
    });
    test('Print list of Inventory in the vending machine', () => {
      expect().toEqual();
    });
  });
  describe('Edge Case Vending Machine Transactions', () => {
    test('Create a vending machine with no dimensions or change', () => {
      expect(emptyVendingMachine).toEqual(emptyMachineData);
    });
    test('Create a vending machine without specifying initial amount of change available', () => {
      expect().toEqual();
    });
    test('Purchase an item that does not exist in the vending machine', () => {
      expect().toEqual();
    });
    test('Purchase an item that exists but that is not available', () => {
      expect().toEqual();
    });
    test('Purchase the last item', () => {
      expect().toEqual();
    });
    test('Purchase an item with inexact change when not enough return change exists', () => {
      expect().toEqual();
    });
    test('Restock an item when the item queue is full', () => {
      expect().toEqual();
    });
  });
});
