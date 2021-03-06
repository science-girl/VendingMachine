module.exports = {
  changeMachine: {
    coinBank: {
      bank: {
        Dime: { quantity: 0, value: 0.1 },
        Nickel: { quantity: 0, value: 0.05 },
        OneDollar: { quantity: 0, value: 1 },
        Quarter: { quantity: 0, value: 0.25 },
        TwoDollars: { quantity: 0, value: 2 },
      },
    },
  },
  maxChangeBalance: 500,
  vendingInventory: {
    inventory: {
      A: {
        maxItemQuantity: 20,
        row: {
          A: [
            {
              item: { name: 'Pepsi', price: 2.5 },
              quantity: 0,
            },
            { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
            {
              item: { name: 'Pixie Stix', price: 0.5 },
              quantity: 0,
            },
          ],
        },
        rowName: 'A',
      },
      B: {
        maxItemQuantity: 20,
        row: {
          B: [
            { item: { name: 'Dr. Pepper', price: 2.45 }, quantity: 0 },
            {
              item: {
                name: 'Kit-Kats',
                price: 3.45,
              },
              quantity: 0,
            },
            { item: { name: 'Fruit Leather', price: 2.75 }, quantity: 0 },
          ],
        },
        rowName: 'B',
      },
      C: {
        maxItemQuantity: 20,
        row: {
          C: [
            {
              item: { name: 'Mars Bar', price: 5.45 },
              quantity: 0,
            },
            { item: { name: 'Toblerone', price: 4.25 }, quantity: 3 },
            {
              item: {
                name: 'Twix',
                price: 2.75,
              },
              quantity: 0,
            },
          ],
        },
        rowName: 'C',
      },
    },
    maxRowSize: 100,
  },
};
