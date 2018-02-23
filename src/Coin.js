// TODO: figure out how to set these as protected variables
const MAX_COIN_VALUE = 2.0;
const MIN_COIN_VALUE = 0.05;

module.exports = class Coin {
  // Constructor
  // @params a int or double value indicating how much a coin is worth
  // @returns a coin with the given value or a default of 0.01 if no value given
  constructor(value) {
    if (isValidValue(value)) this.value = toFloatingPoint(value);
    else this.value = MIN_COIN_VALUE;
  }

  // @params: none
  // @ returns: the value of the coin
  getValue() {
    return this.value;
  }

  // @params: value
  // @returns: true if the value has been updated to the given amount and false otherwise
  setValue(value) {
    if (isValidValue(value)) {
      this.value = toFloatingPoint(value);
      return true;
    }
    return false;
  }
};

// @params: value to validate
// @returns: true if this value is valid and false otherwise
function isValidValue(value) {
  // a coin is valid if:
  // - the value exists
  // - it is an int or double
  // - it is more than 0
  // - it is less than the max amt
  return !(!value || isNaN(value) || value < 0 || value > MAX_COIN_VALUE);
}

// @params: value to change to a 2 point floating number
// @returns a 2 point floating number of the given value
function toFloatingPoint(value) {
  return Math.round(value * 100) / 100;
}
