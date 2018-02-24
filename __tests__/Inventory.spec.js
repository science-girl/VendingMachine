const Inventory = require('../src/Inventory');
const Item = require('../src/Item');

const unchangedInventoryWithItems = {
  A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
  A1: {
    item: {
      name: 'Pepsi',
      price: 2.5,
    },
    quantity: 0,
  },
};

describe('Iventory tests', () => {
  let inventory;
  let inventoryWithItems;
  let item1;
  let item2;
  let item3;
  let item4;
  beforeEach(() => {
    inventory = new Inventory();
    item1 = new Item('Pepsi', 2.5);
    item2 = new Item('Coke', 1.45);
    item3 = new Item('Pixie Stix', 0.5);
    item4 = new Item('Dr. Pepper', 2.45);
    inventoryWithItems = new Inventory([{ A1: item1 }, { A2: item2 }]);
  });
  describe('Successful Inventory Transactions', () => {
    test('Create an inventory with 0 items', () => {
      expect(inventory).toEqual({ inventory: {} });
    });
    test('Create inventory with 4 items', () => {
      const inventory1 = new Inventory([
        { A1: item1 },
        { A2: item2 },
        { A3: item3 },
        { A4: item4 },
      ]);
      expect(inventory1).toEqual({
        inventory: {
          A1: { item: { name: 'Pepsi', price: 2.5 }, quantity: 0 },
          A2: {
            item: { name: 'Coke', price: 1.45 },
            quantity: 0,
          },
          A3: {
            item: {
              name: 'Pixie Stix',
              price: 0.5,
            },
            quantity: 0,
          },
          A4: { item: { name: 'Dr. Pepper', price: 2.45 }, quantity: 0 },
        },
      });
    });
    test('Add an item to inventory with quantity not defined', () => {
      inventory.addEntry('A1', item1);
      expect(inventory.getInventory()).toEqual({
        A1: { name: 'Pepsi', price: 2.5 },
        quantity: 0,
      });
    });
    test('Add an item to inventory with quantity defined', () => {
      expect(inventory.addEntry('A1', item1, 5)).toEqual(true);
      expect(inventory.getInventory()).toEqual({
        A1: { name: 'Pepsi', price: 2.5 },
        quantity: 5,
      });
    });
    test('Remove an item from inventory', () => {
      expect(inventoryWithItems.removeEntry('A2')).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        A1: {
          item: {
            name: 'Pepsi',
            price: 2.5,
          },
          quantity: 0,
        },
      });
    });
    test('Adjust the price of an item in inventory', () => {
      expect(inventoryWithItems.updatePrice('A1', 1.05)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        A1: {
          item: {
            name: 'Pepsi',
            price: 1.05,
          },
          quantity: 0,
        },
      });
    });
    test('Adjust the name of an item in inventory', () => {
      expect(inventoryWithItems.updateName('A1', 'A3')).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        A3: {
          item: {
            name: 'Pepsi',
            price: 2.5,
          },
          quantity: 0,
        },
      });
    });
    test('Increase the quantity of an item in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('A1', 3)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        A1: {
          item: {
            name: 'Pepsi',
            price: 2.5,
          },
          quantity: 3,
        },
      });
    });
    test('Get a listing of every item in inventory', () => {
      expect(inventoryWithItems.getInventory()).toEqual({
        A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        A1: {
          item: {
            name: 'Pepsi',
            price: 2.5,
          },
          quantity: 0,
        },
      });
    });
    test('Get a particular item in inventory', () => {
      const item = inventoryWithItems.getItem('A1');
      expect(item).toEqual(item1);
    });
    test('Test if an item with quantity 0 in inventory is empty', () => {
      expect(inventoryWithItems.isEmpty('A1')).toEqual(true);
    });
    test('Test if an item with quantity not 0 in inventory is empty', () => {
      expect(inventoryWithItems.increaseQuantity('A1', 3)).toEqual(true);
      expect(inventoryWithItems.isEmpty('A1')).toEqual(false);
    });
    test('Decrease the quantity of an item in inventory', () => {
      expect(inventoryWithItems.increaseQuantity('A1', 3)).toEqual(true);
      expect(inventoryWithItems.decreaseQuantity('A1', 2)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        A2: { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        A1: {
          item: {
            name: 'Pepsi',
            price: 2.5,
          },
          quantity: 1,
        },
      });
    });
  });
  describe('Edge Case Inventory Transactions', () => {
    test('Add an item to inventory that already exists', () => {
      expect(inventoryWithItems.addEntry('A1', item1)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Add an item to inventory with an invalid entry name', () => {
      expect(inventoryWithItems.addEntry('', item1)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Remove an item that does not exist from inventory', () => {
      expect(inventory.removeEntry('A1')).toEqual(false);
      expect(inventory.getInventory()).toEqual({});
    });
    test('Update the price of an item that does not exist in inventory', () => {
      expect(inventoryWithItems.updatePrice('A7', 2.59)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Update an item name that does not exist in inventory', () => {
      expect(inventoryWithItems.updateName('A8')).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Decrease an item quantity with a negative quantity', () => {
      expect(inventoryWithItems.decreaseQuantity('A1', -6)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Decrease an item quantity with a float quantity', () => {
      expect(inventoryWithItems.decreaseQuantity('A1', 6.5)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Decrease an item quantity with quantity of 0 in inventory', () => {
      expect(inventoryWithItems.decreaseQuantity('A1', 6)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test("Decrease an item quantity for an item that doesn't exist in inventory", () => {
      expect(inventoryWithItems.decreaseQuantity('A7', 2)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test("Increase an item quantity for an item that doesn't exist in inventory", () => {
      expect(inventoryWithItems.increaseQuantity('A7', 2)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
    test('Adjust the price of an item in inventory to -1.05', () => {
      expect(inventoryWithItems.updatePrice('A1', -1.05)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual(unchangedInventoryWithItems);
    });
  });
});
