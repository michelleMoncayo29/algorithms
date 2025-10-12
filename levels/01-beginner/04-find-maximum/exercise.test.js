const findMaximum = require('./exercise');

describe('Find Maximum', () => {
  // Casos básicos
  test('debe encontrar el máximo en un array básico', () => {
    expect(findMaximum([3, 7, 2, 9, 1])).toBe(9);
  });

  test('debe manejar el caso de ejemplo del enunciado', () => {
    expect(findMaximum([1, 5, 3, 9, 2])).toBe(9);
  });

  // Casos edge
  test('debe manejar array con un solo elemento', () => {
    expect(findMaximum([42])).toBe(42);
  });

  test('debe manejar array con números negativos', () => {
    expect(findMaximum([-3, -7, -2, -9, -1])).toBe(-1);
  });

  test('debe manejar array con números positivos y negativos', () => {
    expect(findMaximum([-3, 7, -2, 9, -1])).toBe(9);
  });

  // Casos adicionales según el problema
  test('debe manejar números repetidos', () => {
    expect(findMaximum([5, 5, 5, 5])).toBe(5);
  });

  test('debe manejar array ordenado descendente', () => {
    expect(findMaximum([9, 7, 5, 3, 1])).toBe(9);
  });

  test('debe manejar array ordenado ascendente', () => {
    expect(findMaximum([1, 3, 5, 7, 9])).toBe(9);
  });

  test('debe manejar array con ceros', () => {
    expect(findMaximum([0, -1, 5, 0, -3])).toBe(5);
  });
});
