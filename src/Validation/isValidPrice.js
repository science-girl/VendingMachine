module.exports = price =>
  // @params double price
  // @returns true if price a valid input

  !(!price || price < 0 || Number.isNaN(parseFloat(price)));

