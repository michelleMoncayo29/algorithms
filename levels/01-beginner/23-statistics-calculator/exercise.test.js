const {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
  calculateStandardDeviation,
} = require('./exercise');
// } = require('../../../solutions/01-beginner/23-statistics-calculator/solution');

describe('Calculadora de Estadísticas', () => {
  // Tests para calculateMean
  describe('calculateMean', () => {
    test('debe calcular la media de números simples', () => {
      expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
      expect(calculateMean([10, 20, 30])).toBe(20);
    });

    test('debe calcular la media de números idénticos', () => {
      expect(calculateMean([5, 5, 5, 5])).toBe(5);
      expect(calculateMean([10, 10])).toBe(10);
    });

    test('debe calcular la media de un solo número', () => {
      expect(calculateMean([42])).toBe(42);
    });

    test('debe calcular la media con decimales', () => {
      expect(calculateMean([1, 2, 3])).toBe(2);
      expect(calculateMean([1, 3, 5])).toBeCloseTo(3, 5);
      expect(calculateMean([10, 20, 30, 40])).toBe(25);
    });

    test('debe calcular la media con números negativos', () => {
      expect(calculateMean([-5, 0, 5])).toBe(0);
      expect(calculateMean([-10, -20, -30])).toBe(-20);
    });

    test('debe manejar array vacío', () => {
      expect(calculateMean([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateMean(null)).toBeNull();
      expect(calculateMean(undefined)).toBeNull();
      expect(calculateMean('invalid')).toBeNull();
    });

    test('debe rechazar arrays con valores no numéricos', () => {
      expect(calculateMean([1, 2, '3'])).toBeNull();
      expect(calculateMean([1, null, 3])).toBeNull();
    });
  });

  // Tests para calculateMedian
  describe('calculateMedian', () => {
    test('debe calcular la mediana de array impar', () => {
      expect(calculateMedian([1, 2, 3, 4, 5])).toBe(3);
      expect(calculateMedian([5, 10, 15])).toBe(10);
      expect(calculateMedian([1, 1, 1, 2, 2])).toBe(1);
    });

    test('debe calcular la mediana de array par', () => {
      expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
      expect(calculateMedian([10, 20, 30, 40])).toBe(25);
      expect(calculateMedian([1, 1, 2, 2])).toBe(1.5);
    });

    test('debe calcular la mediana de un solo número', () => {
      expect(calculateMedian([42])).toBe(42);
    });

    test('debe ordenar números antes de calcular mediana', () => {
      expect(calculateMedian([5, 1, 3, 4, 2])).toBe(3);
      expect(calculateMedian([10, 1, 5])).toBe(5);
    });

    test('debe manejar números negativos', () => {
      expect(calculateMedian([-5, -3, -1, 0, 2])).toBe(-1);
      expect(calculateMedian([-10, 0, 10])).toBe(0);
    });

    test('debe manejar array vacío', () => {
      expect(calculateMedian([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateMedian(null)).toBeNull();
      expect(calculateMedian(undefined)).toBeNull();
      expect(calculateMedian('invalid')).toBeNull();
    });
  });

  // Tests para calculateMode
  describe('calculateMode', () => {
    test('debe calcular la moda de un solo valor más frecuente', () => {
      expect(calculateMode([1, 2, 2, 3])).toEqual([2]);
      expect(calculateMode([5, 10, 10, 10, 15])).toEqual([10]);
    });

    test('debe calcular la moda de múltiples valores con misma frecuencia', () => {
      expect(calculateMode([1, 1, 2, 2, 3])).toEqual([1, 2]);
      expect(calculateMode([1, 2, 3])).toEqual([]);
    });

    test('debe retornar array vacío cuando todos los valores son únicos', () => {
      expect(calculateMode([1, 2, 3, 4, 5])).toEqual([]);
      expect(calculateMode([10, 20, 30])).toEqual([]);
    });

    test('debe calcular la moda con un solo número', () => {
      expect(calculateMode([42])).toEqual([]);
    });

    test('debe calcular la moda con todos números iguales', () => {
      expect(calculateMode([5, 5, 5, 5])).toEqual([5]);
    });

    test('debe manejar números negativos', () => {
      expect(calculateMode([-5, -5, 0, 0, 5])).toEqual([-5, 0]);
    });

    test('debe manejar array vacío', () => {
      expect(calculateMode([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateMode(null)).toBeNull();
      expect(calculateMode(undefined)).toBeNull();
      expect(calculateMode('invalid')).toBeNull();
    });

    test('debe encontrar moda correctamente en arrays complejos', () => {
      expect(calculateMode([1, 1, 1, 2, 2, 3, 3, 3])).toEqual([1, 3]);
    });
  });

  // Tests para calculateRange
  describe('calculateRange', () => {
    test('debe calcular el rango de números simples', () => {
      expect(calculateRange([1, 2, 3, 4, 5])).toBe(4);
      expect(calculateRange([10, 20, 30])).toBe(20);
    });

    test('debe calcular el rango con todos números iguales', () => {
      expect(calculateRange([5, 5, 5])).toBe(0);
      expect(calculateRange([10])).toBe(0);
    });

    test('debe calcular el rango con un solo número', () => {
      expect(calculateRange([42])).toBe(0);
    });

    test('debe calcular el rango con números negativos', () => {
      expect(calculateRange([-5, 0, 5])).toBe(10);
      expect(calculateRange([-10, -20, -30])).toBe(20);
    });

    test('debe calcular el rango con números desordenados', () => {
      expect(calculateRange([5, 1, 10, 3, 7])).toBe(9);
    });

    test('debe manejar array vacío', () => {
      expect(calculateRange([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateRange(null)).toBeNull();
      expect(calculateRange(undefined)).toBeNull();
      expect(calculateRange('invalid')).toBeNull();
    });
  });

  // Tests para calculateStandardDeviation
  describe('calculateStandardDeviation', () => {
    test('debe calcular desviación estándar de conjunto simple', () => {
      const result = calculateStandardDeviation([1, 1, 1, 1]);
      expect(result).toBeCloseTo(0, 5);
    });

    test('debe calcular desviación estándar básica', () => {
      const result = calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(result).toBeCloseTo(2, 1);
    });

    test('debe calcular desviación estándar con un solo número', () => {
      expect(calculateStandardDeviation([42])).toBeCloseTo(0, 5);
    });

    test('debe calcular desviación estándar con todos iguales', () => {
      expect(calculateStandardDeviation([5, 5, 5, 5])).toBeCloseTo(0, 5);
    });

    test('debe manejar números negativos', () => {
      const result = calculateStandardDeviation([-2, 0, 2]);
      expect(result).toBeCloseTo(1.633, 1);
    });

    test('debe manejar array vacío', () => {
      expect(calculateStandardDeviation([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateStandardDeviation(null)).toBeNull();
      expect(calculateStandardDeviation(undefined)).toBeNull();
      expect(calculateStandardDeviation('invalid')).toBeNull();
    });

    test('debe calcular desviación estándar con decimales', () => {
      const result = calculateStandardDeviation([1, 2, 3]);
      expect(result).toBeCloseTo(0.816, 2);
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe analizar conjunto de datos completo', () => {
      const data = [2, 4, 4, 4, 5, 5, 7, 9];
      
      expect(calculateMean(data)).toBeCloseTo(5, 1);
      expect(calculateMedian(data)).toBe(4.5);
      expect(calculateMode(data)).toEqual([4]);
      expect(calculateRange(data)).toBe(7);
      expect(calculateStandardDeviation(data)).toBeCloseTo(2, 1);
    });

    test('debe manejar array con valores repetidos', () => {
      const data = [1, 1, 2, 2, 2, 3, 3];
      
      expect(calculateMean(data)).toBeCloseTo(2, 1);
      expect(calculateMedian(data)).toBe(2);
      expect(calculateMode(data)).toEqual([2]);
      expect(calculateRange(data)).toBe(2);
    });

    test('debe mantener consistencia entre funciones', () => {
      const data = [10, 20, 30, 40, 50];
      
      const mean = calculateMean(data);
      const median = calculateMedian(data);
      const range = calculateRange(data);
      
      expect(mean).toBe(30);
      expect(median).toBe(30);
      expect(range).toBe(40);
    });

    test('debe manejar casos edge consistentemente', () => {
      // Array con un solo elemento
      const single = [5];
      expect(calculateMean(single)).toBe(5);
      expect(calculateMedian(single)).toBe(5);
      expect(calculateMode(single)).toEqual([]);
      expect(calculateRange(single)).toBe(0);
      
      // Array con todos iguales
      const identical = [7, 7, 7];
      expect(calculateMean(identical)).toBe(7);
      expect(calculateMedian(identical)).toBe(7);
      expect(calculateMode(identical)).toEqual([7]);
      expect(calculateRange(identical)).toBe(0);
    });

    test('debe validar estadísticas de datos reales', () => {
      // Simular calificaciones
      const grades = [85, 90, 75, 80, 85, 90, 95, 70];
      
      const mean = calculateMean(grades);
      const median = calculateMedian(grades);
      const mode = calculateMode(grades);
      const range = calculateRange(grades);
      
      expect(mean).toBeCloseTo(83.75, 2);
      expect(median).toBe(85);
      expect(mode).toEqual([85, 90]);
      expect(range).toBe(25);
    });
  });
});

