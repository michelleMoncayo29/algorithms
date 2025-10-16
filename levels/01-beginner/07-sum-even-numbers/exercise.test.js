const sumEvenNumbers = require('./exercise');

describe('Suma de Números Pares', () => {
  test('debe sumar números pares positivos', () => {
    expect(sumEvenNumbers([1, 2, 3, 4, 5])).toBe(6);
    expect(sumEvenNumbers([2, 4, 6, 8])).toBe(20);
    expect(sumEvenNumbers([10, 20, 30])).toBe(60);
  });

  test('debe retornar 0 cuando no hay números pares', () => {
    expect(sumEvenNumbers([1, 3, 5, 7])).toBe(0);
    expect(sumEvenNumbers([9, 11, 13])).toBe(0);
  });

  test('debe manejar números negativos pares', () => {
    expect(sumEvenNumbers([-2, -4, 1, 3])).toBe(-6);
    expect(sumEvenNumbers([-1, -2, -3, -4])).toBe(-6);
    expect(sumEvenNumbers([-10, 5, -8, 3])).toBe(-18);
  });

  test('debe manejar array vacío', () => {
    expect(sumEvenNumbers([])).toBe(0);
  });

  test('debe manejar array con un solo elemento', () => {
    expect(sumEvenNumbers([2])).toBe(2);
    expect(sumEvenNumbers([3])).toBe(0);
    expect(sumEvenNumbers([-4])).toBe(-4);
  });

  test('debe manejar números cero', () => {
    expect(sumEvenNumbers([0, 1, 2, 3])).toBe(2);
    expect(sumEvenNumbers([0, 0, 0])).toBe(0);
  });

  test('debe manejar números decimales pares', () => {
    expect(sumEvenNumbers([2.0, 4.0, 6.0])).toBe(12);
    expect(sumEvenNumbers([1.5, 2.0, 3.5, 4.0])).toBe(6);
  });
});
