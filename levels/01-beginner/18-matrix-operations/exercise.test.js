const {
  createMatrix,
  getMatrixDimensions,
  getElement,
  setElement,
  addMatrices,
  multiplyMatrixByScalar,
  transposeMatrix,
  isSquareMatrix,
  getMatrixTrace,
// } = require('./exercise');
} = require('../../../solutions/01-beginner/18-matrix-operations/solution');

describe('Operaciones con Matrices', () => {
  // Tests para createMatrix
  describe('createMatrix', () => {
    test('debe crear una matriz con valores por defecto', () => {
      const matrix = createMatrix(2, 3, 0);
      
      expect(matrix).toEqual([
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });

    test('debe crear una matriz cuadrada', () => {
      const matrix = createMatrix(3, 3, 1);
      
      expect(matrix).toEqual([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]);
    });

    test('debe crear una matriz con valores personalizados', () => {
      const matrix = createMatrix(2, 2, 'x');
      
      expect(matrix).toEqual([
        ['x', 'x'],
        ['x', 'x']
      ]);
    });

    test('debe crear una matriz vacía', () => {
      const matrix = createMatrix(0, 0, 0);
      
      expect(matrix).toEqual([]);
    });

    test('debe manejar valores por defecto diferentes', () => {
      const matrix = createMatrix(1, 4, -1);
      
      expect(matrix).toEqual([[-1, -1, -1, -1]]);
    });

    test('debe rechazar dimensiones inválidas', () => {
      expect(() => createMatrix(-1, 2, 0)).toThrow();
      expect(() => createMatrix(2, -1, 0)).toThrow();
      expect(() => createMatrix('2', 3, 0)).toThrow();
      expect(() => createMatrix(2, '3', 0)).toThrow();
    });
  });

  // Tests para getMatrixDimensions
  describe('getMatrixDimensions', () => {
    test('debe obtener dimensiones de matriz válida', () => {
      const matrix = [[1, 2], [3, 4], [5, 6]];
      const dimensions = getMatrixDimensions(matrix);
      
      expect(dimensions).toEqual({ rows: 3, cols: 2 });
    });

    test('debe obtener dimensiones de matriz cuadrada', () => {
      const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const dimensions = getMatrixDimensions(matrix);
      
      expect(dimensions).toEqual({ rows: 3, cols: 3 });
    });

    test('debe manejar matriz vacía', () => {
      const matrix = [];
      const dimensions = getMatrixDimensions(matrix);
      
      expect(dimensions).toEqual({ rows: 0, cols: 0 });
    });

    test('debe manejar matriz con una fila', () => {
      const matrix = [[1, 2, 3, 4]];
      const dimensions = getMatrixDimensions(matrix);
      
      expect(dimensions).toEqual({ rows: 1, cols: 4 });
    });

    test('debe manejar matriz con una columna', () => {
      const matrix = [[1], [2], [3]];
      const dimensions = getMatrixDimensions(matrix);
      
      expect(dimensions).toEqual({ rows: 3, cols: 1 });
    });

    test('debe manejar matriz con filas de diferente longitud', () => {
      const matrix = [[1, 2], [3, 4, 5]];
      const dimensions = getMatrixDimensions(matrix);
      
      // Debería retornar null o manejar el error apropiadamente
      expect(dimensions).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(getMatrixDimensions(null)).toBeNull();
      expect(getMatrixDimensions(undefined)).toBeNull();
      expect(getMatrixDimensions('invalid')).toBeNull();
    });
  });

  // Tests para getElement
  describe('getElement', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    test('debe obtener elemento válido', () => {
      expect(getElement(matrix, 0, 0)).toBe(1);
      expect(getElement(matrix, 1, 2)).toBe(6);
      expect(getElement(matrix, 2, 1)).toBe(8);
    });

    test('debe manejar índices fuera de rango', () => {
      expect(getElement(matrix, -1, 0)).toBeUndefined();
      expect(getElement(matrix, 0, -1)).toBeUndefined();
      expect(getElement(matrix, 3, 0)).toBeUndefined();
      expect(getElement(matrix, 0, 3)).toBeUndefined();
    });

    test('debe manejar matriz inválida', () => {
      expect(getElement(null, 0, 0)).toBeUndefined();
      expect(getElement(undefined, 0, 0)).toBeUndefined();
      expect(getElement('invalid', 0, 0)).toBeUndefined();
    });

    test('debe manejar índices no numéricos', () => {
      expect(getElement(matrix, '0', 0)).toBeUndefined();
      expect(getElement(matrix, 0, '0')).toBeUndefined();
    });
  });

  // Tests para setElement
  describe('setElement', () => {
    test('debe establecer elemento válido', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = setElement(matrix, 0, 1, 99);
      
      expect(result).toBe(true);
      expect(matrix[0][1]).toBe(99);
    });

    test('debe manejar índices fuera de rango', () => {
      const matrix = [[1, 2], [3, 4]];
      
      expect(setElement(matrix, -1, 0, 99)).toBe(false);
      expect(setElement(matrix, 0, -1, 99)).toBe(false);
      expect(setElement(matrix, 2, 0, 99)).toBe(false);
      expect(setElement(matrix, 0, 2, 99)).toBe(false);
    });

    test('debe manejar matriz inválida', () => {
      expect(setElement(null, 0, 0, 99)).toBe(false);
      expect(setElement(undefined, 0, 0, 99)).toBe(false);
      expect(setElement('invalid', 0, 0, 99)).toBe(false);
    });

    test('debe manejar índices no numéricos', () => {
      const matrix = [[1, 2], [3, 4]];
      
      expect(setElement(matrix, '0', 0, 99)).toBe(false);
      expect(setElement(matrix, 0, '0', 99)).toBe(false);
    });
  });

  // Tests para addMatrices
  describe('addMatrices', () => {
    test('debe sumar matrices del mismo tamaño', () => {
      const matrix1 = [[1, 2], [3, 4]];
      const matrix2 = [[5, 6], [7, 8]];
      const result = addMatrices(matrix1, matrix2);
      
      expect(result).toEqual([[6, 8], [10, 12]]);
    });

    test('debe sumar matrices cuadradas', () => {
      const matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const matrix2 = [[9, 8, 7], [6, 5, 4], [3, 2, 1]];
      const result = addMatrices(matrix1, matrix2);
      
      expect(result).toEqual([[10, 10, 10], [10, 10, 10], [10, 10, 10]]);
    });

    test('debe manejar matrices de diferentes tamaños', () => {
      const matrix1 = [[1, 2], [3, 4]];
      const matrix2 = [[1, 2, 3], [4, 5, 6]];
      const result = addMatrices(matrix1, matrix2);
      
      expect(result).toBeNull();
    });

    test('debe manejar matrices inválidas', () => {
      const matrix1 = [[1, 2], [3, 4]];
      
      expect(addMatrices(null, matrix1)).toBeNull();
      expect(addMatrices(matrix1, null)).toBeNull();
      expect(addMatrices('invalid', matrix1)).toBeNull();
    });

    test('debe manejar matrices vacías', () => {
      const matrix1 = [];
      const matrix2 = [];
      const result = addMatrices(matrix1, matrix2);
      
      expect(result).toEqual([]);
    });
  });

  // Tests para multiplyMatrixByScalar
  describe('multiplyMatrixByScalar', () => {
    test('debe multiplicar matriz por escalar positivo', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = multiplyMatrixByScalar(matrix, 2);
      
      expect(result).toEqual([[2, 4], [6, 8]]);
    });

    test('debe multiplicar matriz por escalar negativo', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = multiplyMatrixByScalar(matrix, -1);
      
      expect(result).toEqual([[-1, -2], [-3, -4]]);
    });

    test('debe multiplicar matriz por cero', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = multiplyMatrixByScalar(matrix, 0);
      
      expect(result).toEqual([[0, 0], [0, 0]]);
    });

    test('debe multiplicar matriz por decimal', () => {
      const matrix = [[2, 4], [6, 8]];
      const result = multiplyMatrixByScalar(matrix, 0.5);
      
      expect(result).toEqual([[1, 2], [3, 4]]);
    });

    test('debe manejar matriz inválida', () => {
      expect(multiplyMatrixByScalar(null, 2)).toBeNull();
      expect(multiplyMatrixByScalar(undefined, 2)).toBeNull();
      expect(multiplyMatrixByScalar('invalid', 2)).toBeNull();
    });

    test('debe manejar escalar inválido', () => {
      const matrix = [[1, 2], [3, 4]];
      
      expect(multiplyMatrixByScalar(matrix, '2')).toBeNull();
      expect(multiplyMatrixByScalar(matrix, null)).toBeNull();
    });
  });

  // Tests para transposeMatrix
  describe('transposeMatrix', () => {
    test('debe transponer matriz rectangular', () => {
      const matrix = [[1, 2, 3], [4, 5, 6]];
      const result = transposeMatrix(matrix);
      
      expect(result).toEqual([[1, 4], [2, 5], [3, 6]]);
    });

    test('debe transponer matriz cuadrada', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = transposeMatrix(matrix);
      
      expect(result).toEqual([[1, 3], [2, 4]]);
    });

    test('debe transponer matriz de una fila', () => {
      const matrix = [[1, 2, 3, 4]];
      const result = transposeMatrix(matrix);
      
      expect(result).toEqual([[1], [2], [3], [4]]);
    });

    test('debe transponer matriz de una columna', () => {
      const matrix = [[1], [2], [3], [4]];
      const result = transposeMatrix(matrix);
      
      expect(result).toEqual([[1, 2, 3, 4]]);
    });

    test('debe manejar matriz vacía', () => {
      const matrix = [];
      const result = transposeMatrix(matrix);
      
      expect(result).toEqual([]);
    });

    test('debe manejar matriz inválida', () => {
      expect(transposeMatrix(null)).toBeNull();
      expect(transposeMatrix(undefined)).toBeNull();
      expect(transposeMatrix('invalid')).toBeNull();
    });
  });

  // Tests para isSquareMatrix
  describe('isSquareMatrix', () => {
    test('debe identificar matriz cuadrada', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = isSquareMatrix(matrix);
      
      expect(result).toBe(true);
    });

    test('debe identificar matriz no cuadrada', () => {
      const matrix = [[1, 2, 3], [4, 5, 6]];
      const result = isSquareMatrix(matrix);
      
      expect(result).toBe(false);
    });

    test('debe manejar matriz vacía', () => {
      const matrix = [];
      const result = isSquareMatrix(matrix);
      
      expect(result).toBe(true); // Matriz vacía se considera cuadrada (0x0)
    });

    test('debe manejar matriz de una fila', () => {
      const matrix = [[1, 2, 3]];
      const result = isSquareMatrix(matrix);
      
      expect(result).toBe(false);
    });

    test('debe manejar matriz de una columna', () => {
      const matrix = [[1], [2], [3]];
      const result = isSquareMatrix(matrix);
      
      expect(result).toBe(false);
    });

    test('debe manejar matriz inválida', () => {
      expect(isSquareMatrix(null)).toBe(false);
      expect(isSquareMatrix(undefined)).toBe(false);
      expect(isSquareMatrix('invalid')).toBe(false);
    });
  });

  // Tests para getMatrixTrace
  describe('getMatrixTrace', () => {
    test('debe calcular traza de matriz cuadrada', () => {
      const matrix = [[1, 2], [3, 4]];
      const result = getMatrixTrace(matrix);
      
      expect(result).toBe(5); // 1 + 4 = 5
    });

    test('debe calcular traza de matriz cuadrada 3x3', () => {
      const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const result = getMatrixTrace(matrix);
      
      expect(result).toBe(15); // 1 + 5 + 9 = 15
    });

    test('debe manejar matriz no cuadrada', () => {
      const matrix = [[1, 2, 3], [4, 5, 6]];
      const result = getMatrixTrace(matrix);
      
      expect(result).toBeNull();
    });

    test('debe manejar matriz vacía', () => {
      const matrix = [];
      const result = getMatrixTrace(matrix);
      
      expect(result).toBe(0); // Traza de matriz vacía es 0
    });

    test('debe manejar matriz de un elemento', () => {
      const matrix = [[42]];
      const result = getMatrixTrace(matrix);
      
      expect(result).toBe(42);
    });

    test('debe manejar matriz inválida', () => {
      expect(getMatrixTrace(null)).toBeNull();
      expect(getMatrixTrace(undefined)).toBeNull();
      expect(getMatrixTrace('invalid')).toBeNull();
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe realizar operaciones complejas con matrices', () => {
      // Crear dos matrices
      const matrix1 = createMatrix(2, 2, 1);
      const matrix2 = createMatrix(2, 2, 2);
      
      // Sumar matrices
      const sum = addMatrices(matrix1, matrix2);
      expect(sum).toEqual([[3, 3], [3, 3]]);
      
      // Multiplicar por escalar
      const scaled = multiplyMatrixByScalar(sum, 2);
      expect(scaled).toEqual([[6, 6], [6, 6]]);
      
      // Transponer
      const transposed = transposeMatrix(scaled);
      expect(transposed).toEqual([[6, 6], [6, 6]]);
      
      // Verificar que es cuadrada
      expect(isSquareMatrix(transposed)).toBe(true);
      
      // Calcular traza
      expect(getMatrixTrace(transposed)).toBe(12);
    });

    test('debe manejar flujo completo de operaciones', () => {
      // Crear matriz personalizada
      const matrix = createMatrix(3, 3, 0);
      
      // Establecer elementos
      setElement(matrix, 0, 0, 1);
      setElement(matrix, 1, 1, 2);
      setElement(matrix, 2, 2, 3);
      
      // Verificar elementos
      expect(getElement(matrix, 0, 0)).toBe(1);
      expect(getElement(matrix, 1, 1)).toBe(2);
      expect(getElement(matrix, 2, 2)).toBe(3);
      
      // Verificar dimensiones
      const dimensions = getMatrixDimensions(matrix);
      expect(dimensions).toEqual({ rows: 3, cols: 3 });
      
      // Verificar que es cuadrada
      expect(isSquareMatrix(matrix)).toBe(true);
      
      // Calcular traza
      expect(getMatrixTrace(matrix)).toBe(6);
    });

    test('debe manejar casos edge complejos', () => {
      // Matriz con valores negativos
      const matrix = [[-1, -2], [-3, -4]];
      
      // Sumar con matriz positiva
      const positive = [[1, 2], [3, 4]];
      const result = addMatrices(matrix, positive);
      expect(result).toEqual([[0, 0], [0, 0]]);
      
      // Multiplicar por escalar negativo
      const scaled = multiplyMatrixByScalar(result, -1);
      expect(scaled).toEqual([[-0, -0], [-0, -0]]);
      
      // Transponer matriz cero
      const transposed = transposeMatrix(scaled);
      expect(transposed).toEqual([[-0, -0], [-0, -0]]);
    });
  });
});
