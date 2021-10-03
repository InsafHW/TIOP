const FIXED_VALUE = 10

const ERROR = 'Неизвестная ошибка';
const NOT_TRIANGLE = 'Не треугольник';
const EQUILATERAL_TRIANGLE = 'Равносторонний';
const ISOSCELES_TRIANGLE = 'Равнобедреннный';
const REGULAR_TRIANGLE = 'Обычный';

function getNumberFromValue(val) {
  if (typeof val === 'string') {
    return Number(parseFloat(val).toFixed(FIXED_VALUE))
  }
  return Number(val.toFixed(FIXED_VALUE))
}

function isSideWrong(side) {
  if (typeof side === 'string') {
    side = side.replace(/\s/g, '')
    if (side === '') {
      return true
    }
  }
  if (isNaN(side)) {
    return true
  }
  side = getNumberFromValue(side)
  if (side >= Number.POSITIVE_INFINITY || side <= Number.NEGATIVE_INFINITY) {
    return true
  }
  return false
}

/**
 * @param {number|string} a
 * @param {number|string} b
 * @param {number|string} c
 * @return {string}
 */
function getTriangleType(a, b, c, ...args) {
  if (isSideWrong(a) || isSideWrong(b) || isSideWrong(c) || args.length) {
    return ERROR
  }
  a = getNumberFromValue(a)
  b = getNumberFromValue(b)
  c = getNumberFromValue(c)
  if (a >= Number(b + c).toFixed(FIXED_VALUE) || b >= Number(a + c).toFixed(FIXED_VALUE) || c >= Number(a + b).toFixed(FIXED_VALUE) || a <= 0 || b <= 0 || c <= 0) {
    return NOT_TRIANGLE;
  }
  if (a === b && a === c) {
    return EQUILATERAL_TRIANGLE;
  }
  if (a === b || b === c || a === c) {
    return ISOSCELES_TRIANGLE;
  }
  return REGULAR_TRIANGLE;
}

const returnValues = {
  ERROR,
  NOT_TRIANGLE,
  EQUILATERAL_TRIANGLE,
  ISOSCELES_TRIANGLE,
  REGULAR_TRIANGLE,
}

module.exports = { getTriangleType, returnValues };
