const VendingMachine = require('../src/VendingMachine');
const Coin = require('../src/Coin');
const emptyMachineData = require('../__mock__/VendingMachine/emptyMachineMockData');
const threeByThreeMachineData = require('../__mock__/VendingMachine/threeByThreeVendingMachineData');
const inventoryData = require('../__mock__/VendingMachine/vendingMachineObject');
const printInventoryData = require('../__mock__/VendingMachine/printInventoryData');

describe('Vending Machine tests', () => {
  let vendingMachine;
  let coinArray;
  let largeCoinArray;
  let emptyVendingMachine;
  beforeEach(() => {
    coinArray = [new Coin(2, 4), new Coin(0.25, 8), new Coin(0.1, 3)];
    largeCoinArray = [new Coin(2, 500), new Coin(0.5, 4), new Coin(0.1, 3)];
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
    test('Get total number of items in the vending machine', () => {
      expect().toEqual();
    });
    test('Get balance of change in the vending machine', () => {
      expect(vendingMachine.getChangeBalance()).toEqual(0);
      // expect(vendingMachine.deposit(new Coin(2, 4))).toEqual(true);
      // expect(vendingMachine.getChangeBalance()).toEqual(8);
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
      expect(vendingMachine.restockItem('A', 0, 10)).toEqual(true);
    });
    test('Restock change', () => {
      expect(vendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(vendingMachine.getChangeBalance()).toEqual(10.3);
    });
    test('Swap an item in the vending machine for a new item', () => {
      expect().toEqual();
    });
    test('Remove an item in the vending machine', () => {
      expect().toEqual();
    });
    test('Print list of Inventory in the vending machine', () => {
      expect(vendingMachine.getInventory()).toEqual(printInventoryData);
    });
  });
  describe('Edge Case Vending Machine Transactions', () => {
    test('Create a vending machine with no dimensions or change', () => {
      expect(emptyVendingMachine).toEqual(emptyMachineData);
    });
    test('Create a vending machine without specifying initial amount of change available', () => {
      expect(emptyVendingMachine).toEqual(emptyMachineData);
    });
    test('Purchase an item that does not exist in the vending machine', () => {
      expect().toEqual();
    });
    test('Purchase an item that exists but that is not available', () => {
      expect().toEqual();
    });
    test('Purchase the last item in a row', () => {
      expect().toEqual();
    });
    test('Purchase an item with inexact change when not enough return change exists', () => {
      expect().toEqual();
    });
    test('Restock an item when the item queue is full', () => {
      expect().toEqual();
    });
    test('Check if change machine can be refilled', () => {
      expect(vendingMachine.canRefillCoins(largeCoinArray)).toEqual(false);
    });
  });
});
