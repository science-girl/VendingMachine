const CDNCoinBank = require('../src/CDNCoinBank');
const Inventory = require('../src/Inventory');

module.exports = class VendingMachine {
  // Constructor
  // @params:
  // @returns: a vendingMachine with given inventory and changeMachine
  constructor(inventoryArray, coinBank) {
    this.changeMachine = coinBank || new CDNCoinBank();
    this.vendingInventory = inventoryArray || new Inventory();
  }
};
