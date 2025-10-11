const { knapsack, knapsackOptimized, knapsackItems } = require('./exercise');

describe('Problema de la Mochila (Knapsack Problem)', () => {
  describe('knapsack - Implementación básica', () => {
    test('debe resolver el caso básico del ejemplo', () => {
      const weights = [10, 20, 30];
      const values = [60, 100, 120];
      const capacity = 50;

      expect(knapsack(weights, values, capacity)).toBe(220);
    });

    test('debe manejar mochila vacía', () => {
      const weights = [10, 20, 30];
      const values = [60, 100, 120];
      const capacity = 0;

      expect(knapsack(weights, values, capacity)).toBe(0);
    });

    test('debe manejar array de elementos vacío', () => {
      const weights = [];
      const values = [];
      const capacity = 10;

      expect(knapsack(weights, values, capacity)).toBe(0);
    });

    test('debe manejar un solo elemento que cabe', () => {
      const weights = [5];
      const values = [10];
      const capacity = 10;

      expect(knapsack(weights, values, capacity)).toBe(10);
    });

    test('debe manejar un solo elemento que no cabe', () => {
      const weights = [15];
      const values = [10];
      const capacity = 10;

      expect(knapsack(weights, values, capacity)).toBe(0);
    });

    test('debe resolver caso con todos los elementos', () => {
      const weights = [1, 2, 3];
      const values = [10, 20, 30];
      const capacity = 10;

      expect(knapsack(weights, values, capacity)).toBe(60);
    });

    test('debe resolver caso complejo', () => {
      const weights = [1, 3, 4, 5];
      const values = [1, 4, 5, 7];
      const capacity = 7;

      expect(knapsack(weights, values, capacity)).toBe(9);
    });

    test('debe manejar elementos con peso 0', () => {
      const weights = [0, 1, 2];
      const values = [5, 10, 15];
      const capacity = 2;

      expect(knapsack(weights, values, capacity)).toBe(30);
    });

    test('debe manejar elementos con valor 0', () => {
      const weights = [1, 2, 3];
      const values = [0, 10, 0];
      const capacity = 3;

      expect(knapsack(weights, values, capacity)).toBe(10);
    });
  });

  describe('knapsackOptimized - Versión optimizada', () => {
    test('debe dar el mismo resultado que la versión básica', () => {
      const weights = [10, 20, 30];
      const values = [60, 100, 120];
      const capacity = 50;

      const basicResult = knapsack(weights, values, capacity);
      const optimizedResult = knapsackOptimized(weights, values, capacity);

      expect(optimizedResult).toBe(basicResult);
    });

    test('debe manejar caso con elementos repetidos', () => {
      const weights = [1, 1, 2, 2];
      const values = [10, 15, 20, 25];
      const capacity = 3;

      expect(knapsackOptimized(weights, values, capacity)).toBe(40);
    });

    test('debe manejar capacidad muy grande', () => {
      const weights = [1, 2, 3, 4, 5];
      const values = [2, 3, 4, 5, 6];
      const capacity = 100;

      expect(knapsackOptimized(weights, values, capacity)).toBe(20);
    });

    test('debe manejar pesos muy grandes', () => {
      const weights = [100, 200, 300];
      const values = [1, 2, 3];
      const capacity = 150;

      expect(knapsackOptimized(weights, values, capacity)).toBe(1);
    });
  });

  describe('knapsackItems - Reconstrucción de solución', () => {
    test('debe retornar los índices correctos para el caso básico', () => {
      const weights = [10, 20, 30];
      const values = [60, 100, 120];
      const capacity = 50;

      const items = knapsackItems(weights, values, capacity);

      // Debería seleccionar elementos 1 y 2 (índices 1 y 2)
      expect(items).toEqual(expect.arrayContaining([1, 2]));
      expect(items).toHaveLength(2);
    });

    test('debe retornar array vacío para capacidad 0', () => {
      const weights = [10, 20, 30];
      const values = [60, 100, 120];
      const capacity = 0;

      const items = knapsackItems(weights, values, capacity);

      expect(items).toEqual([]);
    });

    test('debe retornar array vacío para elementos vacíos', () => {
      const weights = [];
      const values = [];
      const capacity = 10;

      const items = knapsackItems(weights, values, capacity);

      expect(items).toEqual([]);
    });

    test('debe retornar el índice correcto para un solo elemento', () => {
      const weights = [5];
      const values = [10];
      const capacity = 10;

      const items = knapsackItems(weights, values, capacity);

      expect(items).toEqual([0]);
    });

    test('debe retornar array vacío si ningún elemento cabe', () => {
      const weights = [15, 20, 25];
      const values = [10, 20, 30];
      const capacity = 10;

      const items = knapsackItems(weights, values, capacity);

      expect(items).toEqual([]);
    });

    test('debe verificar que los elementos seleccionados no excedan la capacidad', () => {
      const weights = [1, 3, 4, 5];
      const values = [1, 4, 5, 7];
      const capacity = 7;

      const items = knapsackItems(weights, values, capacity);

      const totalWeight = items.reduce((sum, index) => sum + weights[index], 0);
      expect(totalWeight).toBeLessThanOrEqual(capacity);
    });

    test('debe verificar que la solución sea óptima', () => {
      const weights = [2, 3, 4, 5];
      const values = [3, 4, 5, 6];
      const capacity = 8;

      const items = knapsackItems(weights, values, capacity);
      const totalValue = items.reduce((sum, index) => sum + values[index], 0);

      expect(totalValue).toBe(10); // Valor óptimo para este caso
    });
  });

  describe('Casos edge y límites', () => {
    test('debe manejar arrays con un solo elemento', () => {
      const weights = [42];
      const values = [100];
      const capacity = 50;

      expect(knapsack(weights, values, capacity)).toBe(100);
      expect(knapsackOptimized(weights, values, capacity)).toBe(100);
      expect(knapsackItems(weights, values, capacity)).toEqual([0]);
    });

    test('debe manejar elementos con valores negativos', () => {
      const weights = [1, 2, 3];
      const values = [-1, 5, -2];
      const capacity = 3;

      expect(knapsack(weights, values, capacity)).toBe(5);
      expect(knapsackOptimized(weights, values, capacity)).toBe(5);
    });

    test('debe manejar pesos iguales a la capacidad exacta', () => {
      const weights = [5, 5, 5];
      const values = [10, 20, 30];
      const capacity = 5;

      expect(knapsack(weights, values, capacity)).toBe(30);
    });
  });
});
