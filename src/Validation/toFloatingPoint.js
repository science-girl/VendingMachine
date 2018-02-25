module.exports =
  // @params: value to change to a 2 point floating number
  // @returns a 2 point floating number of the given value
  value => Math.round(value * 100) / 100;
