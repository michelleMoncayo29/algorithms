const {
  fibonacci,
  fibonacciSequence,
  isFibonacci,
  fibonacciSum,
  getFibonacciIndex,
} = require('./exercise');
// } = require('../../../solutions/01-beginner/22-fibonacci-calculator/solution');

describe('Calculadora de Fibonacci', () => {
  // Tests para fibonacci
  describe('fibonacci', () => {
    test('debe calcular Fibonacci de 0', () => {
      expect(fibonacci(0)).toBe(0);
    });

    test('debe calcular Fibonacci de 1', () => {
      expect(fibonacci(1)).toBe(1);
    });

    test('debe calcular Fibonacci de números pequeños', () => {
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(3)).toBe(2);
      expect(fibonacci(4)).toBe(3);
      expect(fibonacci(5)).toBe(5);
      expect(fibonacci(6)).toBe(8);
    });

    test('debe calcular Fibonacci de números medios', () => {
      expect(fibonacci(10)).toBe(55);
      expect(fibonacci(15)).toBe(610);
      expect(fibonacci(20)).toBe(6765);
    });

    test('debe calcular Fibonacci de números más grandes', () => {
      expect(fibonacci(25)).toBe(75025);
      expect(fibonacci(30)).toBe(832040);
    });

    test('debe manejar números negativos', () => {
      expect(fibonacci(-1)).toBeNull();
      expect(fibonacci(-5)).toBeNull();
    });

    test('debe manejar números decimales', () => {
      expect(fibonacci(5.5)).toBeNull();
      expect(fibonacci(10.2)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(fibonacci('5')).toBeNull();
      expect(fibonacci(null)).toBeNull();
      expect(fibonacci(undefined)).toBeNull();
    });
  });

  // Tests para fibonacciSequence
  describe('fibonacciSequence', () => {
    test('debe generar secuencia de 1 número', () => {
      expect(fibonacciSequence(1)).toEqual([0]);
    });

    test('debe generar secuencia de 5 números', () => {
      expect(fibonacciSequence(5)).toEqual([0, 1, 1, 2, 3]);
    });

    test('debe generar secuencia de 10 números', () => {
      expect(fibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    test('debe generar secuencia de 2 números', () => {
      expect(fibonacciSequence(2)).toEqual([0, 1]);
    });

    test('debe generar secuencia de 3 números', () => {
      expect(fibonacciSequence(3)).toEqual([0, 1, 1]);
    });

    test('debe generar secuencias más largas', () => {
      expect(fibonacciSequence(15)).toEqual([
        0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377
      ]);
    });

    test('debe manejar n = 0', () => {
      expect(fibonacciSequence(0)).toBeNull();
    });

    test('debe manejar números negativos', () => {
      expect(fibonacciSequence(-5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(fibonacciSequence('5')).toBeNull();
      expect(fibonacciSequence(null)).toBeNull();
      expect(fibonacciSequence(undefined)).toBeNull();
    });
  });

  // Tests para isFibonacci
  describe('isFibonacci', () => {
    test('debe verificar que 0 es Fibonacci', () => {
      expect(isFibonacci(0)).toBe(true);
    });

    test('debe verificar que 1 es Fibonacci', () => {
      expect(isFibonacci(1)).toBe(true);
    });

    test('debe verificar números de Fibonacci correctos', () => {
      expect(isFibonacci(2)).toBe(true);
      expect(isFibonacci(3)).toBe(true);
      expect(isFibonacci(5)).toBe(true);
      expect(isFibonacci(8)).toBe(true);
      expect(isFibonacci(13)).toBe(true);
      expect(isFibonacci(21)).toBe(true);
      expect(isFibonacci(55)).toBe(true);
    });

    test('debe verificar números que NO son Fibonacci', () => {
      expect(isFibonacci(4)).toBe(false);
      expect(isFibonacci(6)).toBe(false);
      expect(isFibonacci(7)).toBe(false);
      expect(isFibonacci(9)).toBe(false);
      expect(isFibonacci(10)).toBe(false);
    });

    test('debe manejar números negativos', () => {
      expect(isFibonacci(-1)).toBe(false);
      expect(isFibonacci(-5)).toBe(false);
    });

    test('debe manejar números decimales', () => {
      expect(isFibonacci(5.5)).toBe(false);
      expect(isFibonacci(3.14)).toBe(false);
    });

    test('debe manejar entrada inválida', () => {
      expect(isFibonacci('5')).toBe(false);
      expect(isFibonacci(null)).toBe(false);
      expect(isFibonacci(undefined)).toBe(false);
    });
  });

  // Tests para fibonacciSum
  describe('fibonacciSum', () => {
    test('debe calcular suma de 1 número', () => {
      expect(fibonacciSum(1)).toBe(0);
    });

    test('debe calcular suma de 2 números', () => {
      expect(fibonacciSum(2)).toBe(1); // 0 + 1
    });

    test('debe calcular suma de 3 números', () => {
      expect(fibonacciSum(3)).toBe(2); // 0 + 1 + 1
    });

    test('debe calcular suma de 5 números', () => {
      expect(fibonacciSum(5)).toBe(7); // 0 + 1 + 1 + 2 + 3
    });

    test('debe calcular suma de 10 números', () => {
      expect(fibonacciSum(10)).toBe(88); // 0 + 1 + 1 + 2 + 3 + 5 + 8 + 13 + 21 + 34
    });

    test('debe calcular sumas más grandes', () => {
      expect(fibonacciSum(15)).toBe(986);
      expect(fibonacciSum(20)).toBe(10945);
    });

    test('debe manejar n = 0', () => {
      expect(fibonacciSum(0)).toBeNull();
    });

    test('debe manejar números negativos', () => {
      expect(fibonacciSum(-5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(fibonacciSum('5')).toBeNull();
      expect(fibonacciSum(null)).toBeNull();
      expect(fibonacciSum(undefined)).toBeNull();
    });
  });

  // Tests para getFibonacciIndex
  describe('getFibonacciIndex', () => {
    test('debe encontrar índice de 0', () => {
      expect(getFibonacciIndex(0)).toBe(0);
    });

    test('debe encontrar índice de 1', () => {
      expect(getFibonacciIndex(1)).toBe(1);
    });

    test('debe encontrar índices de números Fibonacci', () => {
      expect(getFibonacciIndex(2)).toBe(3);
      expect(getFibonacciIndex(3)).toBe(4);
      expect(getFibonacciIndex(5)).toBe(5);
      expect(getFibonacciIndex(8)).toBe(6);
      expect(getFibonacciIndex(13)).toBe(7);
      expect(getFibonacciIndex(55)).toBe(10);
    });

    test('debe retornar null para números que NO son Fibonacci', () => {
      expect(getFibonacciIndex(4)).toBeNull();
      expect(getFibonacciIndex(6)).toBeNull();
      expect(getFibonacciIndex(7)).toBeNull();
      expect(getFibonacciIndex(9)).toBeNull();
      expect(getFibonacciIndex(10)).toBeNull();
    });

    test('debe manejar números negativos', () => {
      expect(getFibonacciIndex(-1)).toBeNull();
      expect(getFibonacciIndex(-5)).toBeNull();
    });

    test('debe manejar números decimales', () => {
      expect(getFibonacciIndex(5.5)).toBeNull();
      expect(getFibonacciIndex(3.14)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(getFibonacciIndex('5')).toBeNull();
      expect(getFibonacciIndex(null)).toBeNull();
      expect(getFibonacciIndex(undefined)).toBeNull();
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe mantener consistencia entre funciones', () => {
      const n = 10;
      
      // Generar secuencia
      const sequence = fibonacciSequence(n);
      expect(sequence).toBeDefined();
      
      // Verificar que cada número es Fibonacci
      sequence.forEach(num => {
        expect(isFibonacci(num)).toBe(true);
      });
      
      // Verificar cálculo individual
      expect(fibonacci(n - 1)).toBe(sequence[sequence.length - 1]);
      
      // Verificar suma
      const sum = sequence.reduce((a, b) => a + b, 0);
      expect(fibonacciSum(n)).toBe(sum);
    });

    test('debe convertir entre índice y número correctamente', () => {
      const testCases = [
        { index: 0, number: 0 },
        { index: 1, number: 1 },
        { index: 5, number: 5 },
        { index: 10, number: 55 },
        { index: 15, number: 610 },
      ];
      
      testCases.forEach(({ index, number }) => {
        expect(fibonacci(index)).toBe(number);
        expect(getFibonacciIndex(number)).toBe(index);
      });
    });

    test('debe manejar casos edge consistentemente', () => {
      // 0 debe ser válido en todas las funciones
      expect(fibonacci(0)).toBe(0);
      expect(isFibonacci(0)).toBe(true);
      expect(getFibonacciIndex(0)).toBe(0);
      
      // 1 debe ser válido en todas las funciones
      expect(fibonacci(1)).toBe(1);
      expect(isFibonacci(1)).toBe(true);
      expect(getFibonacciIndex(1)).toBe(1);
    });

    test('debe validar secuencia completa vs cálculos individuales', () => {
      const n = 15;
      const sequence = fibonacciSequence(n);
      
      // Verificar que cada posición coincide
      for (let i = 0; i < n; i++) {
        expect(fibonacci(i)).toBe(sequence[i]);
      }
    });

    test('debe manejar flujo completo de verificación', () => {
      const numbers = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55];
      const notFibonacci = [4, 6, 7, 9, 10, 11, 12, 14, 15];
      
      numbers.forEach(num => {
        expect(isFibonacci(num)).toBe(true);
        expect(getFibonacciIndex(num)).not.toBeNull();
      });
      
      notFibonacci.forEach(num => {
        expect(isFibonacci(num)).toBe(false);
        expect(getFibonacciIndex(num)).toBeNull();
      });
    });
  });
});

