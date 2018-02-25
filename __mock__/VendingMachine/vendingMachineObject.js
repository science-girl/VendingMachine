const Item = require('../../src/Item');
const Inventory = require('../../src/Inventory');
const Row = require('../../src/Row');

const item1 = new Item('Pepsi', 2.5);
const item2 = new Item('Coke', 1.45);
const item3 = new Item('Pixie Stix', 0.5);
const item4 = new Item('Dr. Pepper', 2.45);
const item5 = new Item('Kit-Kats', 3.45);
const item6 = new Item('Fruit Leather', 2.75);
const item7 = new Item('Mars Bar', 5.45);
const item8 = new Item('Toblerone', 4.25);
const item9 = new Item('Twix', 2.75);
const rowA = new Row('A', [item1, item2, item3]);
const rowB = new Row('B', [item4, item5, item6]);
const rowC = new Row('C', [item7, item8, item9]);

module.exports = new Inventory([rowA, rowB, rowC]);
