const {
  quickSort,
  quickSortInPlace,
  partition,
  quickSortRandom,
  quickSortMedianOfThree,
} = require('./exercise');

describe('Quick Sort (Ordenamiento Rápido)', () => {
  describe('quickSort - Implementación básica', () => {
    test('debe ordenar un array desordenado', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = quickSort(arr);

      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('debe manejar array ya ordenado', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = quickSort(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar array ordenado en orden descendente', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = quickSort(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar array vacío', () => {
      const arr = [];
      const result = quickSort(arr);

      expect(result).toEqual([]);
    });

    test('debe manejar array con un elemento', () => {
      const arr = [42];
      const result = quickSort(arr);

      expect(result).toEqual([42]);
    });

    test('debe manejar array con dos elementos', () => {
      const arr = [2, 1];
      const result = quickSort(arr);

      expect(result).toEqual([1, 2]);
    });

    test('debe manejar elementos duplicados', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = quickSort(arr);

      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    test('debe manejar números negativos', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6, -5];
      const result = quickSort(arr);

      expect(result).toEqual([-9, -6, -5, -5, -4, -3, -2, -1, -1]);
    });

    test('debe manejar números mixtos positivos y negativos', () => {
      const arr = [-3, 1, -4, 1, 5, -9, 2, -6, 5];
      const result = quickSort(arr);

      expect(result).toEqual([-9, -6, -4, -3, 1, 1, 2, 5, 5]);
    });

    test('debe manejar array con todos los elementos iguales', () => {
      const arr = [5, 5, 5, 5, 5];
      const result = quickSort(arr);

      expect(result).toEqual([5, 5, 5, 5, 5]);
    });
  });

  describe('quickSortInPlace - Implementación in-place', () => {
    test('debe ordenar el array original sin crear copias', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      quickSortInPlace(arr);

      expect(arr).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('debe manejar array con un elemento', () => {
      const arr = [42];
      quickSortInPlace(arr);

      expect(arr).toEqual([42]);
    });

    test('debe manejar array vacío', () => {
      const arr = [];
      quickSortInPlace(arr);

      expect(arr).toEqual([]);
    });

    test('debe manejar elementos duplicados', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      quickSortInPlace(arr);

      expect(arr).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });

    test('debe manejar array ya ordenado', () => {
      const arr = [1, 2, 3, 4, 5];
      quickSortInPlace(arr);

      expect(arr).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('partition - Función de particionamiento', () => {
    test('debe particionar correctamente un array simple', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6];
      const pivotIndex = partition(arr, 0, arr.length - 1);

      // Verificar que todos los elementos a la izquierda del pivote son menores o iguales
      for (let i = 0; i < pivotIndex; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[pivotIndex]);
      }

      // Verificar que todos los elementos a la derecha del pivote son mayores o iguales
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i]).toBeGreaterThanOrEqual(arr[pivotIndex]);
      }
    });

    test('debe manejar array con un elemento', () => {
      const arr = [42];
      const pivotIndex = partition(arr, 0, 0);

      expect(pivotIndex).toBe(0);
      expect(arr[0]).toBe(42);
    });

    test('debe manejar array con dos elementos', () => {
      const arr = [2, 1];
      const pivotIndex = partition(arr, 0, 1);

      expect(pivotIndex).toBe(1);
      expect(arr).toEqual([1, 2]);
    });

    test('debe manejar elementos duplicados', () => {
      const arr = [3, 3, 3, 3];
      const pivotIndex = partition(arr, 0, 3);

      expect(pivotIndex).toBeGreaterThanOrEqual(0);
      expect(pivotIndex).toBeLessThanOrEqual(3);
    });
  });

  describe('quickSortRandom - Quick Sort con pivote aleatorio', () => {
    test('debe ordenar correctamente un array', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = quickSortRandom(arr);

      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('debe manejar array ya ordenado', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = quickSortRandom(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar array ordenado en orden descendente', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = quickSortRandom(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar elementos duplicados', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = quickSortRandom(arr);

      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });
  });

  describe('quickSortMedianOfThree - Quick Sort con pivote mediano', () => {
    test('debe ordenar correctamente un array', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    test('debe manejar array ya ordenado eficientemente', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar array ordenado en orden descendente', () => {
      const arr = [5, 4, 3, 2, 1];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('debe manejar elementos duplicados', () => {
      const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([1, 1, 2, 3, 4, 5, 5, 6, 9]);
    });
  });

  describe('Casos límite y rendimiento', () => {
    test('debe manejar array muy grande', () => {
      const arr = Array.from({ length: 100 }, (_, i) =>
        Math.floor(Math.random() * 1000)
      );
      const sorted = [...arr].sort((a, b) => a - b);

      expect(quickSort(arr)).toEqual(sorted);
    });

    test('debe manejar números muy grandes', () => {
      const arr = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0];
      const result = quickSort(arr);

      expect(result).toEqual([
        Number.MIN_SAFE_INTEGER,
        0,
        Number.MAX_SAFE_INTEGER,
      ]);
    });

    test('debe manejar números decimales', () => {
      const arr = [3.14, 2.71, 1.41, 0.57, 2.23];
      const result = quickSort(arr);

      expect(result).toEqual([0.57, 1.41, 2.23, 2.71, 3.14]);
    });
  });

  describe('Consistencia entre implementaciones', () => {
    test('todas las implementaciones deben dar el mismo resultado', () => {
      const testCases = [
        [64, 34, 25, 12, 22, 11, 90],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [3, 1, 4, 1, 5, 9, 2, 6, 5],
        [-3, 1, -4, 1, 5, -9, 2, -6, 5],
      ];

      testCases.forEach(testCase => {
        const result1 = quickSort([...testCase]);
        const result2 = quickSortRandom([...testCase]);
        const result3 = quickSortMedianOfThree([...testCase]);

        expect(result1).toEqual(result2);
        expect(result2).toEqual(result3);
      });
    });
  });
});
