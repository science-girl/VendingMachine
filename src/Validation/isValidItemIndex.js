// @params integer itemIndex
// @returns true if quantity is a valid input and false otherwise
module.exports = itemIndex =>
  // a valid quantity:
  // - be a positive integer
  // - be an integer
  // - be a number
  !(itemIndex < 0 || itemIndex % 1 !== 0 || Number.isNaN(parseInt(itemIndex, 10)));
