const Item = require("../src/Item");

describe("Item tests", () => {
  let item;
  beforeEach(() => {
    item = new Item();
  });
  describe("Successful Item Transactions", () => {
    test("Create an item with name 'Coke' and price $2.35", () => {
      const item1 = new Item("Coke", 2.35);
      expect(item1).toEqual({ name: "Coke", price: 2.35 });
    });
    test("Set an Item price to $1.50", () => {
      item.setPrice(1.5);
      expect(item.getPrice()).toEqual(1.5);
    });
    test("Set an Item name to 'Pepsi'", () => {
      item.setName("Pepsi");
      expect(item.getName()).toEqual("Pepsi");
    });
  });
  describe("Unsuccessful Item Transactions", () => {
    test("Create an item with no arguments", () => {
      const item1 = new Item();
      expect(item1).toEqual({ name: "default", price: 0.0 });
    });
    test("Create an item with no name and price -$2.35", () => {
      const item1 = new Item("", -2.35);
      expect(item1).toEqual({ name: "default", price: 0.0 });
    });
    test("Create an item with 'Pepsi' as name and price -$2.35", () => {
      const item1 = new Item("Pepsi", -2.35);
      expect(item1).toEqual({ name: "Pepsi", price: 0.0 });
    });
    test("Set an item price to -5", () => {
      item.setPrice(-5);
      expect(item.getPrice()).toEqual(0.0);
    });
    test("Set an Item name to the empty string", () => {
      item.setName("");
      expect(item.getName()).toEqual("default");
    });
  });
});
