const VendingMachine = require('../src/VendingMachine');
const emptyMachineData = require('../__mock__/emptyMachineMockData');
// const CDNCoinBank = require('../src/CDNCoinBank');
// const Inventory = require('../src/Inventory');

describe('Vending Machine tests', () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });
  describe('Successful Vending Machine Transactions', () => {
    test('Create a vending machine of 8 rows and 4 columns', () => {
      expect().toEqual();
    });
    test('Create a vending machine with a specific amount of change available', () => {
      expect().toEqual();
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
    test('Create a vending machine with no dimensions', () => {
      expect(vendingMachine).toEqual(emptyMachineData);
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
