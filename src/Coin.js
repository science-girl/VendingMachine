const isValidQuantity = require('./Validation/isValidQuantity');
const isValidValue = require('./Validation/isValidValue');
const toFloatingPoint = require('./Validation/toFloatingPoint');
// TODO: figure out how to set these as protected variables
const MIN_COIN_VALUE = 0.05;

module.exports = class Coin {
  // Constructor
  // @params a int or double value indicating how much a coin is worth
  // @returns a coin with the given value or a default if no value given
  constructor(value, quantity) {
    this.value = isValidValue(value) ? toFloatingPoint(value) : MIN_COIN_VALUE;
    this.quantity = isValidQuantity(quantity) ? quantity : 0;
  }

  // @params: none
  // @returns: the value of the coin
  getValue() {
    return this.value;
  }

  // @params: none
  // @returns: the number of coins
  getQuantity() {
    return this.quantity;
  }

  // @params: integer quantity
  // @returns: true if the quantity was updated and false otherwise
  setQuantity(quantity) {
    if (isValidQuantity(quantity)) {
      this.quantity = quantity;
      return true;
    }
    return false;
  }

  // @params: integer quantity
  // @returns: true if the quantity was increased and false otherwise
  increaseQuantity(quantity) {
    if (isValidQuantity(quantity)) {
      this.quantity = this.quantity + quantity;
      return true;
    }
    return false;
  }

  // @params: integer quantity
  // @returns: true if the quantity was decreased and false otherwise
  decreaseQuantity(quantity) {
    if (isValidQuantity(quantity) && quantity <= this.quantity) {
      this.quantity = this.quantity - quantity;
      return true;
    }
    return false;
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
