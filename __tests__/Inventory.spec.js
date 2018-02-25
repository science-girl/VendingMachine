const Inventory = require('../src/Inventory');
const Item = require('../src/Item');
const Row = require('../src/Row');
const inventoryWithTwoRowsData = require('../__mock__/Inventory/inventoryWithTwoRowsData');
const inventoryWithThreeRowsData = require('../__mock__/Inventory/inventoryWithThreeRowsData');
// A: {[{item, quantity}, {item,quantity}, {item, quantity}]}
// B: {[{item, quantity}, {item,quantity}, {item, quantity}]}

describe('Iventory tests', () => {
  let inventory;
  let inventoryWithItems;
  let rowA;
  let rowB;
  let rowC;
  let item1;
  let item2;
  let item3;
  let item4;
  beforeEach(() => {
    item1 = new Item('Pepsi', 2.5);
    item2 = new Item('Coke', 1.45);
    item3 = new Item('Pixie Stix', 0.5);
    item4 = new Item('Dr. Pepper', 2.45);
    rowA = new Row('A', [item1, item2]);
    rowB = new Row('B', [item3, item4]);
    rowC = new Row('C', [item1, item3]);
    inventory = new Inventory();
    inventoryWithItems = new Inventory([rowA, rowB]);
  });
  describe('Successful Inventory Transactions', () => {
    test('Create an inventory with 2 items', () => {
      expect(inventoryWithItems).toEqual(inventoryWithTwoRowsData);
    });
    test('Add a row to inventory with 2 items', () => {
      expect(inventoryWithItems.addRow(rowC)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual(inventoryWithThreeRowsData);
    });
    test('Update price of a specific item in inventory', () => {
      expect(inventoryWithItems.updatePrice('A', 0, 3.0)).toEqual(true);
    });
    test('Get a specific item in inventory', () => {
      expect(inventoryWithItems.getItem('A', 0)).toEqual({ name: 'Pepsi', price: 2.5 });
    });
    test('Get a specific item quantity in inventory', () => {
      expect(inventoryWithItems.getItemQuantity('A', 0)).toEqual(0);
    });
    test('Remove a row from inventory', () => {
      expect(inventoryWithItems.addRow(rowC)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual(inventoryWithThreeRowsData);
      expect(inventoryWithItems.removeRow('C')).toEqual(true);
    });
    test('Increase an item in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('A', 0, 3)).toEqual(true);
    });
    test('Decrease an item in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('A', 0, 3)).toEqual(true);
      expect(inventoryWithItems.decreaseQuantity('A', 0, 2)).toEqual(true);
      expect(inventoryWithItems.getItemQuantity('A', 0)).toEqual(1);
    });
  });
  describe('Edge Case Inventory Transactions', () => {
    test('Create an inventory with 0 items', () => {
      expect(inventory).toEqual({ inventory: {}, maxRowSize: 100 });
    });
    test('Add a row to inventory with 0 items', () => {
      expect(inventory.addRow(rowC)).toEqual(true);
    });
    test('Add a row that already exists', () => {
      expect(inventoryWithItems.addRow(rowA)).toEqual(false);
    });
    test('Get an item in inventory with an invalid itemIndex', () => {
      expect(inventoryWithItems.getItem('A', -1)).toEqual({});
    });
    test('Get a specific item quantity with an invalid itemIndex', () => {
      expect(inventoryWithItems.getItemQuantity('A', 'a')).toEqual(-1);
    });
    test('Remove a row from inventory with 0 items', () => {
      expect(inventory.removeRow('C')).toEqual(false);
    });
    test('Remove a non-existent row from inventory', () => {
      expect(inventoryWithItems.removeRow('D')).toEqual(false);
    });
    test('Update price of a non-existent item in inventory', () => {
      expect(inventoryWithItems.updatePrice('D', 0, 3.0)).toEqual(false);
    });
    test('Increase a non-existent item in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('D', 0, 3.0)).toEqual(false);
    });
    test('Increase an item with a negative number in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('A', 0, -3)).toEqual(false);
    });
    test('Decrease an item with a negative number in inventory', () => {
      expect(inventoryWithItems.decreaseQuantity('A', 0, -3)).toEqual(false);
    });
    test('Decrease an item in inventory beyond quantity available', () => {
      expect(inventoryWithItems.increaseQuantity('A', 0, 3)).toEqual(true);
      expect(inventoryWithItems.decreaseQuantity('A', 0, 4)).toEqual(false);
      expect(inventoryWithItems.getItemQuantity('A', 0)).toEqual(3);
    });
  });
});
