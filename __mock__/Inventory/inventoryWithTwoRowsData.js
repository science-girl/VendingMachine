module.exports = {
  inventory: {
    A: {
      maxItemQuantity: 20,
      row: {
        A: [
          { item: { name: 'Pepsi', price: 2.5 }, quantity: 0 },
          { item: { name: 'Coke', price: 1.45 }, quantity: 0 },
        ],
      },
      rowName: 'A',
    },
    B: {
      maxItemQuantity: 20,
      row: {
        B: [
          {
            item: { name: 'Pixie Stix', price: 0.5 },
            quantity: 0,
          },
          { item: { name: 'Dr. Pepper', price: 2.45 }, quantity: 0 },
        ],
      },
      rowName: 'B',
    },
  },
  maxRowSize: 100,
};
