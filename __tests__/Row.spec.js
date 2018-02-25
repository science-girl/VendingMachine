const Row = require('../src/Row.js');
const Item = require('../src/Item');
const rowWithThreeItemsData = require('../__mock__/Row/rowWithThreeItemsData');
const rowWithFourItemsData = require('../__mock__/Row/rowWithFourItemsData');

describe('Row tests', () => {
  let row;
  let rowWithNoItems;
  let item1;
  let item2;
  let item3;
  let item4;
  beforeEach(() => {
    rowWithNoItems = new Row();
    item1 = new Item('Pepsi', 2.5);
    item2 = new Item('Coke', 1.45);
    item3 = new Item('Pixie Stix', 0.5);
    item4 = new Item('Dr. Pepper', 2.75);
    row = new Row('A', [item1, item2, item3]);
  });
  describe('Successful Row Transactions', () => {
    test('Create a row with 3 items', () => {
      expect(row.getRow()).toEqual(rowWithThreeItemsData);
    });
    test('Add item to a row', () => {
      expect(row.addItem(item4)).toEqual(true);
      expect(row.getRow()).toEqual(rowWithFourItemsData);
    });
    test('Add same item to a row', () => {
      expect(row.addItem(item4)).toEqual(true);
      expect(row.addItem(item4)).toEqual(true);
      expect(row.getNumberOfItemsInRow()).toEqual(5);
    });
    test('Remove item from a row', () => {
      expect(row.addItem(item4)).toEqual(true);
      expect(row.removeItem(3)).toEqual(true);
      expect(row.getRow()).toEqual(rowWithThreeItemsData);
    });
    test('Get all items in a row', () => {
      expect(row.getRowItems()).toEqual([
        { item: { name: 'Pepsi', price: 2.5 }, quantity: 0 },
        { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        { item: { name: 'Pixie Stix', price: 0.5 }, quantity: 0 },
      ]);
    });
    test('Increase item quantity', () => {
      expect(row.increaseItemQuantity(0, 2)).toEqual(true);
    });
    test('Increase item quantity when not zero', () => {
      expect(row.increaseItemQuantity(0, 2)).toEqual(true);
      expect(row.increaseItemQuantity(0, 5)).toEqual(true);
      expect(row.getItemQuantity(0)).toEqual(7);
    });
    test('Decrease item quantity', () => {
      expect(row.increaseItemQuantity(0, 2)).toEqual(true);
      expect(row.decreaseItemQuantity(0, 1)).toEqual(true);
      expect(row.getItemQuantity(0)).toEqual(1);
    });
    test('Get item quantity with a valid item index', () => {
      expect(row.getItemQuantity(0)).toEqual(0);
      expect(row.increaseItemQuantity(0, 2)).toEqual(true);
      expect(row.getItemQuantity(0)).toEqual(2);
    });
    test('Get item ', () => {
      expect(row.getItem(0)).toEqual({ name: 'Pepsi', price: 2.5 });
    });
    test('Get item price', () => {
      expect(row.getItemPrice(0)).toEqual(2.5);
    });
    test('Get item name with an item index', () => {
      expect(row.getItemName(0)).toEqual('Pepsi');
    });
    test('Get number of items in the row', () => {
      expect(row.getNumberOfItemsInRow()).toEqual(3);
    });
    test('Get name of the row', () => {
      expect(row.getRowName()).toEqual('A');
    });
    test('Is an item out of stock', () => {
      expect(row.isOutOfStock(0)).toEqual(true);
    });
  });
  describe('Edge Case Row Transactions', () => {
    test('Create a row with 0 items and no name', () => {
      expect(rowWithNoItems).toEqual({ row: { default: [] }, rowName: 'default' });
    });
    test('Add item to a row with no items', () => {
      expect(rowWithNoItems.addItem(item1)).toEqual(true);
    });
    test('Add item to a row with a non-item object', () => {
      expect(row.addItem('notAnItem')).toEqual(false);
    });
    test('Increase item quantity by a negative number', () => {
      expect(row.increaseItemQuantity(0, -2)).toEqual(false);
    });
    test('Increase item quantity with an out-of-bound item index', () => {
      expect(row.increaseItemQuantity(8, 3)).toEqual(false);
    });
    test('Decrease item quantity when quantity is 0', () => {
      expect(row.decreaseItemQuantity(0, 1)).toEqual(false);
      expect(row.getItemQuantity(0)).toEqual(0);
    });
    test('Decrease item quantity when quantity is a negative', () => {
      expect(row.increaseItemQuantity(0, 2)).toEqual(true);
      expect(row.decreaseItemQuantity(0, -1)).toEqual(false);
      expect(row.getItemQuantity(0)).toEqual(2);
    });
    test('Decrease item quantity with an out-of-bound item index', () => {
      expect(row.decreaseItemQuantity(8, 1)).toEqual(false);
    });
    test('Remove item with an out-of-bound item index', () => {
      expect(row.removeItem(8)).toEqual(false);
      expect(row.getRow()).toEqual(rowWithThreeItemsData);
    });
    test('Remove from row with no items', () => {
      expect(rowWithNoItems.removeItem(0)).toEqual(false);
    });
    test('Get item quantity with an out-of-bound item index', () => {
      expect(row.getItemQuantity(8)).toEqual(-1);
    });
    test('Get item price with an out-of-bound item index', () => {
      expect(row.getItemPrice(8)).toEqual(-1);
    });
    test('Get item name with an out-of-bound item index', () => {
      expect(row.getItemName(8)).toEqual(-1);
    });
  });
});
