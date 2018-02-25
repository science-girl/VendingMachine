// @params: value to validate
// @returns: true if this value is valid and false otherwise
module.exports = value =>
  // a coin is valid if:
  // - the value exists
  // - it is an int or double
  // - it is more than 0
  !(!value || Number.isNaN(parseFloat(value)) || value < 0);
