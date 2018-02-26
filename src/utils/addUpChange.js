const toFloatingPoint = require('./toFloatingPoint');
// @params: Coin coinArray to add
// @returns: the sum of the given coins
module.exports = coinArray =>
  coinArray.reduce((result, coin) => {
    const coinSum = coin.getValue() * coin.getQuantity();
    return toFloatingPoint(result + coinSum);
  }, 0);
