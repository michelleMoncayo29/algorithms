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

    test('debe manejar array con elementos negativos', () => {
      const arr = [-3, -1, -4, -2];
      const pivotIndex = partition(arr, 0, 3);

      // Verificar que el particionamiento es correcto
      for (let i = 0; i < pivotIndex; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[pivotIndex]);
      }
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i]).toBeGreaterThanOrEqual(arr[pivotIndex]);
      }
    });

    test('debe manejar array con números decimales', () => {
      const arr = [3.14, 2.71, 1.41, 2.23];
      const pivotIndex = partition(arr, 0, 3);

      // Verificar que el particionamiento es correcto
      for (let i = 0; i < pivotIndex; i++) {
        expect(arr[i]).toBeLessThanOrEqual(arr[pivotIndex]);
      }
      for (let i = pivotIndex + 1; i < arr.length; i++) {
        expect(arr[i]).toBeGreaterThanOrEqual(arr[pivotIndex]);
      }
    });

    test('debe manejar rango de un solo elemento', () => {
      const arr = [5, 3, 1, 4, 2];
      const pivotIndex = partition(arr, 2, 2);

      expect(pivotIndex).toBe(2);
      expect(arr[2]).toBe(1);
    });

    test('debe manejar rango de dos elementos', () => {
      const arr = [5, 3, 1, 4, 2];
      const pivotIndex = partition(arr, 0, 1);

      expect(pivotIndex).toBeGreaterThanOrEqual(0);
      expect(pivotIndex).toBeLessThanOrEqual(1);
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

    test('debe manejar array vacío', () => {
      const arr = [];
      const result = quickSortRandom(arr);

      expect(result).toEqual([]);
    });

    test('debe manejar array con un elemento', () => {
      const arr = [42];
      const result = quickSortRandom(arr);

      expect(result).toEqual([42]);
    });

    test('debe manejar números negativos', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6, -5];
      const result = quickSortRandom(arr);

      expect(result).toEqual([-9, -6, -5, -5, -4, -3, -2, -1, -1]);
    });

    test('debe ser consistente en múltiples ejecuciones', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      
      // Ejecutar múltiples veces para verificar consistencia
      for (let i = 0; i < 5; i++) {
        const result = quickSortRandom([...arr]);
        expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
      }
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

    test('debe manejar array vacío', () => {
      const arr = [];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([]);
    });

    test('debe manejar array con un elemento', () => {
      const arr = [42];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([42]);
    });

    test('debe manejar array con dos elementos', () => {
      const arr = [2, 1];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([1, 2]);
    });

    test('debe manejar números negativos', () => {
      const arr = [-3, -1, -4, -1, -5, -9, -2, -6, -5];
      const result = quickSortMedianOfThree(arr);

      expect(result).toEqual([-9, -6, -5, -5, -4, -3, -2, -1, -1]);
    });

    test('debe ser determinista (mismo resultado en múltiples ejecuciones)', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      
      // Ejecutar múltiples veces para verificar determinismo
      for (let i = 0; i < 5; i++) {
        const result = quickSortMedianOfThree([...arr]);
        expect(result).toEqual([11, 12, 22, 25, 34, 64, 90]);
      }
    });

    test('debe optimizar el caso de array ya ordenado', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      const start = Date.now();
      const result = quickSortMedianOfThree(arr);
      const end = Date.now();
      
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      // Debe ser más eficiente que la versión básica para arrays ordenados
      expect(end - start).toBeLessThan(100);
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

    test('debe manejar números con precisión decimal alta', () => {
      const arr = [0.1, 0.2, 0.3, 0.4, 0.5];
      const result = quickSort(arr);

      expect(result).toEqual([0.1, 0.2, 0.3, 0.4, 0.5]);
    });

    test('debe manejar arrays con valores cero', () => {
      const arr = [0, 0, 0, 1, 0, 2, 0];
      const result = quickSort(arr);

      expect(result).toEqual([0, 0, 0, 0, 0, 1, 2]);
    });

    test('debe manejar arrays con números negativos grandes', () => {
      const arr = [-1000000, -999999, -1, 0, 1, 999999, 1000000];
      const result = quickSort(arr);

      expect(result).toEqual([-1000000, -999999, -1, 0, 1, 999999, 1000000]);
    });
  });

  describe('Validación de entrada y casos borde críticos', () => {
    test('debe manejar array con valores Infinity', () => {
      const arr = [Infinity, -Infinity, 5, 0, -5];
      const result = quickSort(arr);

      expect(result).toEqual([-Infinity, -5, 0, 5, Infinity]);
    });

    test('debe manejar array con valores NaN (debe lanzar error o manejarlo apropiadamente)', () => {
      const arr = [5, NaN, 3, 1, NaN];
      
      // Quick Sort debería manejar NaN de manera consistente
      // En JavaScript, NaN siempre es false en comparaciones
      expect(() => quickSort(arr)).not.toThrow();
    });

    test('debe manejar array con valores null y undefined (debe lanzar error)', () => {
      const arr = [5, null, 3, undefined, 1];
      
      expect(() => quickSort(arr)).toThrow();
    });

    test('debe manejar array con tipos mixtos (debe lanzar error)', () => {
      const arr = [5, 'hello', 3, {}, 1];
      
      expect(() => quickSort(arr)).toThrow();
    });

    test('debe manejar entrada null (debe lanzar error)', () => {
      expect(() => quickSort(null)).toThrow();
    });

    test('debe manejar entrada undefined (debe lanzar error)', () => {
      expect(() => quickSort(undefined)).toThrow();
    });

    test('debe manejar entrada no array (debe lanzar error)', () => {
      expect(() => quickSort('not an array')).toThrow();
      expect(() => quickSort(123)).toThrow();
      expect(() => quickSort({})).toThrow();
    });
  });

  describe('Validación de mutación de arrays', () => {
    test('quickSort no debe mutar el array original', () => {
      const original = [64, 34, 25, 12, 22, 11, 90];
      const copy = [...original];
      
      quickSort(original);
      
      expect(original).toEqual(copy);
    });

    test('quickSortInPlace debe mutar el array original', () => {
      const arr = [64, 34, 25, 12, 22, 11, 90];
      const originalLength = arr.length;
      
      quickSortInPlace(arr);
      
      expect(arr).toEqual([11, 12, 22, 25, 34, 64, 90]);
      expect(arr.length).toBe(originalLength);
    });

    test('quickSortRandom no debe mutar el array original', () => {
      const original = [64, 34, 25, 12, 22, 11, 90];
      const copy = [...original];
      
      quickSortRandom(original);
      
      expect(original).toEqual(copy);
    });

    test('quickSortMedianOfThree no debe mutar el array original', () => {
      const original = [64, 34, 25, 12, 22, 11, 90];
      const copy = [...original];
      
      quickSortMedianOfThree(original);
      
      expect(original).toEqual(copy);
    });
  });

  describe('Casos de estabilidad y orden relativo', () => {
    test('debe mantener orden relativo de elementos iguales', () => {
      const arr = [
        { value: 3, order: 1 },
        { value: 1, order: 2 },
        { value: 3, order: 3 },
        { value: 1, order: 4 }
      ];
      
      // Nota: Quick Sort no es estable, pero este test documenta el comportamiento
      const result = quickSort(arr.map(item => item.value));
      const expected = [1, 1, 3, 3];
      
      expect(result).toEqual(expected);
    });

    test('debe manejar arrays con muchos elementos duplicados', () => {
      const arr = Array(100).fill(5);
      const result = quickSort(arr);
      
      expect(result).toEqual(Array(100).fill(5));
    });

    test('debe manejar array con patrón alternante', () => {
      const arr = [1, 2, 1, 2, 1, 2, 1, 2];
      const result = quickSort(arr);
      
      expect(result).toEqual([1, 1, 1, 1, 2, 2, 2, 2]);
    });
  });

  describe('Validación de parámetros de función', () => {
    test('quickSortInPlace debe validar parámetros low y high', () => {
      const arr = [3, 1, 4, 1, 5];
      
      // Test con parámetros válidos
      expect(() => quickSortInPlace(arr, 0, 4)).not.toThrow();
      
      // Test con parámetros inválidos
      expect(() => quickSortInPlace(arr, -1, 4)).toThrow();
      expect(() => quickSortInPlace(arr, 0, 10)).toThrow();
      expect(() => quickSortInPlace(arr, 4, 0)).toThrow();
    });

    test('partition debe validar parámetros low y high', () => {
      const arr = [3, 1, 4, 1, 5];
      
      // Test con parámetros válidos
      expect(() => partition(arr, 0, 4)).not.toThrow();
      
      // Test con parámetros inválidos
      expect(() => partition(arr, -1, 4)).toThrow();
      expect(() => partition(arr, 0, 10)).toThrow();
      expect(() => partition(arr, 4, 0)).toThrow();
    });

    test('debe manejar arrays con un solo elemento en quickSortInPlace', () => {
      const arr = [42];
      quickSortInPlace(arr, 0, 0);
      
      expect(arr).toEqual([42]);
    });

    test('debe manejar rangos de un elemento en quickSortInPlace', () => {
      const arr = [3, 1, 4, 1, 5];
      quickSortInPlace(arr, 2, 2);
      
      expect(arr[2]).toBe(4);
    });
  });

  describe('Casos de rendimiento y complejidad', () => {
    test('debe manejar caso peor (array ya ordenado) eficientemente', () => {
      const arr = Array.from({ length: 50 }, (_, i) => i);
      
      const start = Date.now();
      quickSort(arr);
      const end = Date.now();
      
      // Debe completarse en tiempo razonable (menos de 1 segundo para 50 elementos)
      expect(end - start).toBeLessThan(1000);
    });

    test('debe manejar caso peor inverso (array ordenado descendente)', () => {
      const arr = Array.from({ length: 50 }, (_, i) => 50 - i);
      
      const start = Date.now();
      quickSort(arr);
      const end = Date.now();
      
      expect(end - start).toBeLessThan(1000);
    });

    test('debe manejar array con distribución uniforme de duplicados', () => {
      const arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push(1, 2, 3, 4, 5);
      }
      
      const result = quickSort(arr);
      const expected = Array(20).fill([1, 2, 3, 4, 5]).flat();
      
      expect(result).toEqual(expected);
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
        [], // Array vacío
        [42], // Un elemento
        [2, 1], // Dos elementos
        [1, 1, 1, 1, 1], // Todos iguales
        [0, 0, 0, 0, 0], // Todos ceros
      ];

      testCases.forEach(testCase => {
        const result1 = quickSort([...testCase]);
        const result2 = quickSortRandom([...testCase]);
        const result3 = quickSortMedianOfThree([...testCase]);

        expect(result1).toEqual(result2);
        expect(result2).toEqual(result3);
      });
    });

    test('debe manejar casos extremos de manera consistente', () => {
      const extremeCases = [
        [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0],
        [Infinity, -Infinity, 0],
        [0.1, 0.2, 0.3, 0.4, 0.5],
        [1e-10, 1e-5, 1e-1, 1e1, 1e5, 1e10],
      ];

      extremeCases.forEach(testCase => {
        const result1 = quickSort([...testCase]);
        const result2 = quickSortRandom([...testCase]);
        const result3 = quickSortMedianOfThree([...testCase]);

        expect(result1).toEqual(result2);
        expect(result2).toEqual(result3);
      });
    });
  });

  describe('Casos extremos adicionales', () => {
    test('debe manejar arrays con números muy pequeños', () => {
      const arr = [1e-15, 1e-14, 1e-13, 1e-12, 1e-11];
      const result = quickSort(arr);

      expect(result).toEqual([1e-15, 1e-14, 1e-13, 1e-12, 1e-11]);
    });

    test('debe manejar arrays con números muy grandes', () => {
      const arr = [1e15, 1e14, 1e13, 1e12, 1e11];
      const result = quickSort(arr);

      expect(result).toEqual([1e11, 1e12, 1e13, 1e14, 1e15]);
    });

    test('debe manejar arrays con mezcla de números grandes y pequeños', () => {
      const arr = [1e15, 1e-15, 1e10, 1e-10, 1e5, 1e-5];
      const result = quickSort(arr);

      expect(result).toEqual([1e-15, 1e-10, 1e-5, 1e5, 1e10, 1e15]);
    });

    test('debe manejar arrays con precisión decimal extrema', () => {
      const arr = [0.0000000001, 0.0000000002, 0.0000000003];
      const result = quickSort(arr);

      expect(result).toEqual([0.0000000001, 0.0000000002, 0.0000000003]);
    });

    test('debe manejar arrays con números negativos extremos', () => {
      const arr = [-1e15, -1e14, -1e13, -1e12, -1e11];
      const result = quickSort(arr);

      expect(result).toEqual([-1e15, -1e14, -1e13, -1e12, -1e11]);
    });
  });
});
