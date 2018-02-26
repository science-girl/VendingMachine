const VendingMachine = require('../src/VendingMachine');
const Coin = require('../src/Coin');
const Item = require('../src/Item');
const emptyMachineData = require('../__mock__/VendingMachine/emptyMachineMockData');
const threeByThreeMachineData = require('../__mock__/VendingMachine/threeByThreeVendingMachineData');
const inventoryData = require('../__mock__/VendingMachine/vendingMachineObject');
const printInventoryData = require('../__mock__/VendingMachine/printInventoryData');
const inventoryAfterAdd = require('../__mock__/VendingMachine/inventoryAfterAdd');

describe('Vending Machine tests', () => {
  let vendingMachine;
  let purchaseVendingMachine;
  let coinArray;
  let largeCoinArray;
  let emptyVendingMachine;
  beforeEach(() => {
    coinArray = [new Coin(2, 4), new Coin(0.25, 8), new Coin(0.1, 3)];
    largeCoinArray = [new Coin(2, 500), new Coin(0.5, 4), new Coin(0.1, 3)];
    emptyVendingMachine = new VendingMachine();
    vendingMachine = new VendingMachine(inventoryData);
    purchaseVendingMachine = new VendingMachine(inventoryData);
  });
  describe('Successful Vending Machine Transactions', () => {
    test('Create a vending machine of 3 rows and 3 columns', () => {
      expect(vendingMachine).toEqual(threeByThreeMachineData);
    });
    test('Print list of Inventory in the vending machine', () => {
      expect(vendingMachine.getInventory()).toEqual(printInventoryData);
    });
    test('Check if change machine can be refilled', () => {
      expect(vendingMachine.canRefillCoins(coinArray)).toEqual(true);
    });
    test('Get balance of change in the vending machine', () => {
      expect(vendingMachine.getChangeBalance()).toEqual(0);
      expect(vendingMachine.stockChangeMachine([new Coin(2, 4)])).toEqual(true);
      expect(vendingMachine.getChangeBalance()).toEqual(8);
    });
    test('Purchase an item with exact change', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.restockItem('C', 1, 3)).toEqual(true);
      expect(purchaseVendingMachine.getItemStock('C', 1)).toEqual(3);
      expect(purchaseVendingMachine.purchaseItem('C', 1, payment)).toEqual([
        { name: 'Toblerone', price: 4.25 },
        [],
      ]);
      expect(purchaseVendingMachine.getItemStock('C', 1)).toEqual(2);
    });
    test('Purchase an item with inexact change (more than required) ie. $5.25 for $4.25 item', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(1, 1), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.getItemStock('C', 1)).toEqual(2);
      expect(purchaseVendingMachine.purchaseItem('C', 1, payment)).toEqual([
        { name: 'Toblerone', price: 4.25 },
        [{ quantity: 1, value: 1 }],
      ]);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(14.55);
      expect(purchaseVendingMachine.getItemStock('C', 1)).toEqual(1);
    });
    test('Restock an item', () => {
      expect(vendingMachine.restockItem('A', 0, 10)).toEqual(true);
    });
    test('Restock change', () => {
      expect(vendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(vendingMachine.getChangeBalance()).toEqual(10.3);
    });
    test('Get number of item in stock (0)', () => {
      expect(vendingMachine.getItemStock('A', 1)).toEqual(0);
    });
    test('Get name of item in stock', () => {
      expect(vendingMachine.getItemName('A', 1)).toEqual('Coke');
    });
    test('Get number of item in stock (> 0)', () => {
      expect(vendingMachine.getItemStock('A', 2)).toEqual(0);
      expect(vendingMachine.restockItem('A', 2, 3));
      expect(vendingMachine.getItemStock('A', 2)).toEqual(3);
    });
    test('Replace an item in the vending machine', () => {
      expect(vendingMachine.getItemStock('A', 2)).toEqual(3);
      expect(vendingMachine.replaceItem('A', 2, new Item('Licorice', 4.2), 4)).toEqual(true);
      expect(vendingMachine.getItemStock('A', 2)).toEqual(4);
      expect(vendingMachine.getItemName('A', 2)).toEqual('Licorice');
    });
    test('Add a new item to an existing row in the vending machine', () => {
      expect(vendingMachine.addNewItem('A', new Item('Kombucha', 4.2), 3)).toEqual(3);
      expect(vendingMachine.getInventory()).toEqual(inventoryAfterAdd);
    });
    test('Add a new item to an existing row in the vending machine with no quantity', () => {
      expect(vendingMachine.addNewItem('A', new Item('Seaweed', 4.2))).toEqual(4);
      expect(vendingMachine.getItemStock('A', 4)).toEqual(0);
    });
    test('Add a new item to a row that does not exist in the vending machine', () => {
      expect(vendingMachine.addNewItem('J', new Item('Cupcakes', 4.5), 3)).toEqual(0);
      expect(vendingMachine.getItemStock('J', 0)).toEqual(3);
    });
    test('Remove an item from the vending machine', () => {
      expect(vendingMachine.getItemStock('J', 0)).toEqual(3);
      expect(vendingMachine.unstockItem('J', 0)).toEqual(true);
      expect(vendingMachine.getItemName('J', 0)).toEqual(false);
    });
  });
  describe('Edge Case Vending Machine Transactions', () => {
    test('Create a vending machine with no dimensions or change', () => {
      expect(emptyVendingMachine).toEqual(emptyMachineData);
    });
    test('Create a vending machine without specifying initial amount of change available', () => {
      expect(emptyVendingMachine).toEqual(emptyMachineData);
    });
    test('Get name of item not in stock (invalid rowName)', () => {
      expect(vendingMachine.getItemName('Z', 1)).toEqual(false);
    });
    test('Get name of item not in stock (invalid itemIndex)', () => {
      expect(vendingMachine.getItemName('A', 27)).toEqual(false);
    });
    test('Get name of item not in stock (invalid itemIndex)', () => {
      expect(vendingMachine.getItemName('A', -1)).toEqual(false);
    });
    test('Replace an item not in stock (invalid itemIndex)', () => {
      expect(vendingMachine.replaceItem('A', -1, new Item('Licorice', 4.2), 4)).toEqual(false);
    });
    test('Replace an item not in stock (invalid rowName)', () => {
      expect(vendingMachine.replaceItem('Z', 1, new Item('Licorice', 4.2), 4)).toEqual(false);
    });
    test('Replace an item not in stock (invalid item)', () => {
      expect(vendingMachine.replaceItem('A', 1, 'NotAnItem', 4)).toEqual(false);
    });
    test('Replace an item in not in stock (invalid quantity)', () => {
      expect(vendingMachine.restockItem('A', 2, 6)).toEqual(true);
      expect(vendingMachine.getItemStock('A', 2)).toEqual(10);
      expect(vendingMachine.replaceItem('A', 2, new Item('Kombucha', 4.33), -5)).toEqual(true);
      expect(vendingMachine.getItemStock('A', 2)).toEqual(0);
      expect(vendingMachine.getItemName('A', 2)).toEqual('Kombucha');
    });
    test('Add a new item to an existing row in the vending machine with invalid quantity (negative)', () => {
      expect(vendingMachine.addNewItem('A', new Item('Pretzels', 4.2), -3)).toEqual(5);
      expect(vendingMachine.getItemStock('A', 5)).toEqual(0);
    });
    test('Add a new item to an existing row in the vending machine with invalid item', () => {
      expect(vendingMachine.addNewItem('A', 'NotAnItem', 3)).toEqual(-1);
    });
    test('Remove a non-existent item from the vending machine (invalid row)', () => {
      expect(vendingMachine.unstockItem('Z', 0)).toEqual(false);
    });
    test('Remove a non-existent item from the vending machine (invalid itemIndex)', () => {
      expect(vendingMachine.unstockItem('A', 200)).toEqual(false);
    });
    test('Purchase an item that does not exist in the vending machine (invalid row)', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.purchaseItem('Z', 1, payment)).toEqual(false);
    });
    test('Purchase an item that does not exist in the vending machine (invalid itemIndex)', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.purchaseItem('A', 26, payment)).toEqual(false);
    });
    test('Purchase an item that exists but that is not available', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.purchaseItem('A', 1, payment)).toEqual(false);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
    });
    test('Purchase the last item', () => {
      expect(purchaseVendingMachine.stockChangeMachine(coinArray)).toEqual(true);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(10.3);
      const payment = [new Coin(2, 2), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.restockItem('A', 1, 1)).toEqual(true);
      expect(purchaseVendingMachine.getItemStock('A', 1)).toEqual(1);

      expect(purchaseVendingMachine.purchaseItem('A', 1, payment)).toEqual([
        { name: 'Coke', price: 1.45 },
        [{ quantity: 1, value: 2 }, { quantity: 3, value: 0.25 }],
      ]);
      expect(purchaseVendingMachine.getItemStock('A', 1)).toEqual(0);
    });
    test('Purchase an item when not enough payment given (item is $1.45 and $1.25 is given)', () => {
      expect(purchaseVendingMachine.stockChangeMachine([new Coin(0.05, 1)])).toEqual(true);
      expect(purchaseVendingMachine.restockItem('A', 1, 5)).toEqual(true);
      const payment = [new Coin(1, 1), new Coin(0.25, 1)];
      expect(purchaseVendingMachine.purchaseItem('A', 1, payment)).toEqual(false);
    });
    test('Purchase an item when bank has enough for change, but not enough coins of the right denomination available', () => {
      expect(purchaseVendingMachine.stockChangeMachine([new Coin(0.1, 1)])).toEqual(true);
      expect(purchaseVendingMachine.getItemStock('A', 1)).toEqual(5);
      const payment = [new Coin(1, 1), new Coin(0.25, 2)];
      expect(purchaseVendingMachine.purchaseItem('A', 1, payment)).toEqual(false);
      expect(purchaseVendingMachine.getChangeBalance()).toEqual(0.1);
      expect(purchaseVendingMachine.getItemStock('A', 1)).toEqual(5);
    });
    test('Check if change machine can be refilled', () => {
      expect(vendingMachine.canRefillCoins(largeCoinArray)).toEqual(false);
    });
  });
});
