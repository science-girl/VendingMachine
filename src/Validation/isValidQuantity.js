// @params integer quantity
// @returns true if quantity is a valid input and false otherwise
module.exports = quantity =>
  // a valid quantity:
  // - must exist
  // - be a positive integer
  // - be an integer
  !(quantity < 0 || !Number.isInteger(quantity));
