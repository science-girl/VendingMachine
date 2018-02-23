const Inventory = require("../src/Inventory");
const Item = require("../src/Item");

describe("Iventory tests", () => {
  let inventory;
  let inventoryWithItems;
  let item1;
  let item2;
  let item3;
  let item4;
  beforeEach(() => {
    inventory = new Inventory();
    item1 = new Item("Pepsi", 2.5);
    item2 = new Item("Coke", 1.45);
    item3 = new Item("Pixie Stix", 0.5);
    item4 = new Item("Dr. Pepper", 2.45);
    inventoryWithItems = new Inventory([item1, item2]);
  });
  describe("Successful Inventory Transactions", () => {
    test("Create an inventory with 0 items", () => {
      expect(inventory).toEqual({ inventory: {} });
    });
    test("Create inventory with 4 items", () => {
      const inventory1 = new Inventory([item1, item2, item3, item4]);
      expect(inventory1).toEqual({
        inventory: {
          Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
          "Dr. Pepper": {
            item: { name: "Dr. Pepper", price: 2.45 },
            quantity: 0
          },
          Pepsi: { item: { name: "Pepsi", price: 2.5 }, quantity: 0 },
          "Pixie Stix": {
            item: { name: "Pixie Stix", price: 0.5 },
            quantity: 0
          }
        }
      });
    });
    test("Add an item to inventory with quantity not defined", () => {
      inventory.addEntry(item1);
      expect(inventory.getInventory()).toEqual({
        Pepsi: { name: "Pepsi", price: 2.5 },
        quantity: 0
      });
    });
    test("Add an item to inventory with quantity defined", () => {
      inventory.addEntry(item1, 5);
      expect(inventory.getInventory()).toEqual({
        Pepsi: { name: "Pepsi", price: 2.5 },
        quantity: 5
      });
    });
    test("Remove an item from inventory", () => {
      inventoryWithItems.removeEntry("Coke");
      expect(inventoryWithItems.getInventory()).toEqual({
        Pepsi: {
          item: {
            name: "Pepsi",
            price: 2.5
          },
          quantity: 0
        }
      });
    });
    test("Adjust the price of an item in inventory", () => {
      expect(inventoryWithItems.updatePrice("Pepsi", 1.05)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
        Pepsi: {
          item: {
            name: "Pepsi",
            price: 1.05
          },
          quantity: 0
        }
      });
    });
    test("Adjust the name of an item in inventory", () => {
      expect(inventoryWithItems.updateName("Pepsi", "Zima")).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
        Zima: {
          item: {
            name: "Zima",
            price: 2.5
          },
          quantity: 0
        }
      });
    });
    test("Increase the quantity of an item in inventory", () => {
      expect(inventoryWithItems.increaseQuantity("Pepsi", 3)).toEqual(true);
      expect(inventoryWithItems.getInventory()).toEqual({
        Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
        Pepsi: {
          item: {
            name: "Pepsi",
            price: 2.5
          },
          quantity: 3
        }
      });
    });
    test("Get a listing of every item in inventory", () => {
      expect(inventoryWithItems.getInventory()).toEqual({
        Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
        Pepsi: {
          item: {
            name: "Pepsi",
            price: 2.5
          },
          quantity: 0
        }
      });
    });
    test("Get a particular item in inventory", () => {
      expect().toEqual();
    });
    test("Decrease the quantity of an item in inventory", () => {
      expect().toEqual();
    });
  });
  describe("Edge Case Inventory Transactions", () => {
    test("Add an item to inventory that already exists", () => {
      expect().toEqual();
    });
    test("Remove an item from inventory that doesn't exist", () => {
      expect().toEqual();
    });
    test("Remove an item from an inventory of 0", () => {
      expect().toEqual();
    });
    test("Decrease an item quantity with quantity of 0 in inventory", () => {
      expect().toEqual();
    });
    test("Add an item quantity with quantity of 0 in inventory", () => {
      expect().toEqual();
    });
    test("Add an item quantity for an item that doesn't exist in inventory", () => {
      expect().toEqual();
    });
    test("Adjust the price of an item in inventory to -1.05", () => {
      expect(inventoryWithItems.updatePrice("Pepsi", -1.05)).toEqual(false);
      expect(inventoryWithItems.getInventory()).toEqual({
        Coke: { item: { name: "Coke", price: 1.45 }, quantity: 0 },
        Pepsi: {
          item: {
            name: "Pepsi",
            price: 2.5
          },
          quantity: 0
        }
      });
    });
  });
});
