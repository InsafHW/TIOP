const { getTriangleType, returnValues } = require('./triangle');

describe('getTriangleType function', () => {

  {
    // один параметр пустая строка
    test('If a parameter is empty string should return ERROR', () => {
      expect(getTriangleType('', 2, 3)).toBe(returnValues.ERROR)
      expect(getTriangleType(2, '', 3)).toBe(returnValues.ERROR)
      expect(getTriangleType(3, 2, '')).toBe(returnValues.ERROR)
    })
  }

  {
    // один параметр стринговый содержит и буквы
    test('If a parameter which is string contains something else that is not number should return ERROR', () => {
      expect(getTriangleType('4f', 3, 4)).toBe(returnValues.ERROR)
      expect(getTriangleType(3, '4f', 5)).toBe(returnValues.ERROR)
      expect(getTriangleType(3, 4, '5f')).toBe(returnValues.ERROR)
    })
  }

  {
    // Один параметр стринговый и не содержит буквы
    test('If a parameter which is string doesnt contains not number should return TYPE OF TRIANGLE', () => {
      expect(getTriangleType('4', 3, 2)).toBe(returnValues.REGULAR_TRIANGLE)
      expect(getTriangleType(4, '3', 2)).toBe(returnValues.REGULAR_TRIANGLE)
      expect(getTriangleType(4, 3, '2')).toBe(returnValues.REGULAR_TRIANGLE)
    })
  }

  {
    // один параметр равен 0
    test('If a parameter is equal to 0 should return NOT_TRIANGLE', () => {
      expect(getTriangleType(0, 2, 2)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(2, 0, 2)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(2, 2, 0)).toBe(returnValues.NOT_TRIANGLE)
    })
  }

  {
    // один параметр меньше 0
    test('If a parameter is less than 0 should return NOT_TRIANGLE', () => {
      expect(getTriangleType(-2, 2, 3)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(2, -2, 3)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(2, 2, -3)).toBe(returnValues.NOT_TRIANGLE)
    })
  }

  {
    // прямоугольный треугольник - обычный
    test('Right triangle is usual', () => {
      expect(getTriangleType(3, 4, 5)).toBe(returnValues.REGULAR_TRIANGLE)
    })
  }

  {
    // если сторона больше суммы двух других сторон
    test('If a side is greater than sum of two others should return NOT_TRIANGLE', () => {
      expect(getTriangleType(7, 2, 3)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(4, 10, 2)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType(2, 5, 10)).toBe(returnValues.NOT_TRIANGLE)
    })
  }

  {
    // если две стороны равны
    test('If two sides are equal should return ISOSCELES_TRIANGLE', () => {
      expect(getTriangleType(2, 2, 3)).toBe(returnValues.ISOSCELES_TRIANGLE)
      expect(getTriangleType(2, 3, 2)).toBe(returnValues.ISOSCELES_TRIANGLE)
      expect(getTriangleType(2, 4, 4)).toBe(returnValues.ISOSCELES_TRIANGLE)
    })
  }

  {
    // если все стороны равны
    test('If all sides are equal should return EQUILATERAL_TRIANGLE', () => {
      expect(getTriangleType(3, 3, 3)).toBe(returnValues.EQUILATERAL_TRIANGLE)
    })
  }

  {
    // если треугольник не равнободренный, не равносторонний, то он обычный
    test('If no one side is equal should return REGULAR_TRIANGLE', () => {
      expect(getTriangleType(7, 5, 6)).toBe(returnValues.REGULAR_TRIANGLE)
    })
  }

  {
    // если сторона больше допустимого значения
    test('If a side is greater than max number should return ERROR', () => {
      expect(getTriangleType(Number.POSITIVE_INFINITY + 5, Number.POSITIVE_INFINITY + 3, Number.POSITIVE_INFINITY + 4)).toBe(returnValues.ERROR)
    })
  }

  {
    // если сторона меньше минимального значения
    test('If a side is less than min number should return ERROR', () => {
      expect(getTriangleType(Number.NEGATIVE_INFINITY - 5, Number.NEGATIVE_INFINITY - 3, Number.NEGATIVE_INFINITY - 4)).toBe(returnValues.ERROR)
    })
  }

  {
    // проверка на нецелые числа
    test('If a side is not integer should work fine', () => {
      expect(getTriangleType(0.3, 0.1, 0.2)).toBe(returnValues.NOT_TRIANGLE)
      expect(getTriangleType('0.3', '0.4', '0.2')).toBe(returnValues.REGULAR_TRIANGLE)
      expect(getTriangleType(0.333, 0.333, 0.333)).toBe(returnValues.EQUILATERAL_TRIANGLE)
    })
  }

  {
    // проверка если не хватает параметров
    test('If not all parameter is passed should return ERROR', () => {
      expect(getTriangleType()).toBe(returnValues.ERROR)
      expect(getTriangleType(1)).toBe(returnValues.ERROR)
      expect(getTriangleType(1, 3)).toBe(returnValues.ERROR)
      expect(getTriangleType(1, 3, 8, 8)).toBe(returnValues.ERROR)
    })
  }

  {
    // проверка если передан пробел
    test('If space is passed should return ERROR', () => {
      expect(getTriangleType(' ', 2, 4)).toBe(returnValues.ERROR)
    })
  }

  {
    test('With e digits should work fine', () => {
      expect(getTriangleType(2e10, 2e12, 2e12)).toBe(returnValues.ISOSCELES_TRIANGLE)
    })
  }

  {
    // когда выраждается в линию
    test('When it comes to line should return NOT_TRIANGLE', () => {
      expect(getTriangleType(1, 2, 3)).toBe(returnValues.NOT_TRIANGLE)
    })
  }

  {
    // hex
    test('Hex should work fine', () => {
      expect(getTriangleType(0x20, 0x20, 0x20)).toBe(returnValues.EQUILATERAL_TRIANGLE)
    })
  }

  {
    //2
    test('Binary should work fine', () => {
      expect(getTriangleType( 0b1111, 0b1111, 0b1110)).toBe(returnValues.ISOSCELES_TRIANGLE)
    })
  }

  {
    //8
    test('Octal should work fine', () => {
      expect(getTriangleType(0o376, 0o377, 0o376)).toBe(returnValues.ISOSCELES_TRIANGLE)
    })
  }

  {
    // min triangle
    test('min triangle is', () => {
      expect(getTriangleType(0.1, 0.1, 0.1)).toBe(returnValues.EQUILATERAL_TRIANGLE)
    })
  }
})