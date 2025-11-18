/**
 * Operaciones con Matrices
 *
 * Descripción: Implementa funciones para realizar operaciones básicas con matrices.
 * Las matrices se representan como arrays bidimensionales (array de arrays).
 * Dificultad: BEGINNER
 *
 * Funciones requeridas:
 * - createMatrix(rows, cols, defaultValue): Crea una matriz con valores por defecto
 * - getMatrixDimensions(matrix): Obtiene las dimensiones de una matriz
 * - getElement(matrix, row, col): Obtiene un elemento específico de la matriz
 * - setElement(matrix, row, col, value): Establece un elemento específico de la matriz
 * - addMatrices(matrix1, matrix2): Suma dos matrices
 * - multiplyMatrixByScalar(matrix, scalar): Multiplica una matriz por un escalar
 * - transposeMatrix(matrix): Transpone una matriz
 * - isSquareMatrix(matrix): Verifica si una matriz es cuadrada
 * - getMatrixTrace(matrix): Calcula la traza de una matriz cuadrada
 */

/**
 * Crea una matriz con las dimensiones especificadas y un valor por defecto
 * @param {number} rows - Número de filas
 * @param {number} cols - Número de columnas
 * @param {*} defaultValue - Valor por defecto para llenar la matriz
 * @returns {Array} Matriz creada
 */
function createMatrix(rows, cols, defaultValue = 0) {
  // TODO: Implementar creación de matriz
  // Pista 1: Validar que rows y cols sean números positivos
  if (
    typeof rows !== 'number' ||
    typeof cols !== 'number' ||
    rows <= 0 ||
    cols <= 0
  ) {
    console.log(rows, 'esto es console.log');

    return [];
  }

  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(defaultValue);
    }
    matrix.push(row);
  }

  return matrix;
}
const matrix = createMatrix(3, 3, 1);

/**
 * Obtiene las dimensiones de una matriz
 * @param {Array} matrix - Matriz a analizar
 * @returns {Object} Objeto con propiedades rows y cols
 */
function getMatrixDimensions(matrix) {
  // TODO: Implementar obtención de dimensiones

  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    !Array.isArray(matrix[0])
  ) {
    return {
      rows: 0,
      cols: 0,
    };
  }

  let row = matrix[0];
  for (let i = 1; i < matrix.length; i++) {
    let element = matrix[i];

    if (element.length !== row.length) {
      return null;
    }

    row = element;
  }

  const dimensiones = {
    rows: matrix.length,
    cols: matrix[0].length,
  };

  return dimensiones;
}
const dimensions = getMatrixDimensions([
  [1, 2],
  [3, 4, 5],
]);
/**
 * Obtiene un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @returns {*} Elemento en la posición especificada
 */
function getElement(matrix, row, col) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    !Array.isArray(matrix[0])
  ) {
    return undefined;
  }

  if (
    typeof row !== 'number' ||
    typeof col !== 'number' ||
    row < 0 ||
    col < 0
  ) {
    return undefined;
  }
  if (row >= matrix.length || col >= matrix[0].length) {
    return undefined;
  }
  return matrix[row][col];
}
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const getItem = getElement(arr, 3, 0);
/**
 * Establece un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @param {*} value - Valor a establecer
 * @returns {boolean} true si se estableció correctamente, false si no
 */
function setElement(matrix, row, col, value) {
	if (
		!Array.isArray(matrix) ||
		matrix.length === 0 ||
		!Array.isArray(matrix[0])
	) {
		return undefined;
	}

	if (
		Number(row) < 0 ||
		Number(col) < 0 ||
		typeof row !== 'number' ||
		typeof col !== 'number'
	) {
		return undefined;
	}

	matrix[row][col] = value;
	
	return matrix;
}
const matrix2 = [[1, 2], [3, 4]];
const resultSet = setElement(matrix2, 0, 1, 99);
console.log(resultSet);
/**
 * Suma dos matrices del mismo tamaño
 * @param {Array} matrix1 - Primera matriz
 * @param {Array} matrix2 - Segunda matriz
 * @returns {Array|null} Matriz resultante o null si no se pueden sumar
 */
function addMatrices(matrix1, matrix2) {
  // TODO: Implementar suma de matrices
  // Pista 1: Validar que ambas matrices sean arrays válidos
  // Pista 2: Verificar que ambas matrices tengan las mismas dimensiones
  // Pista 3: Crear una nueva matriz con las mismas dimensiones
  // Pista 4: Sumar elemento por elemento: result[i][j] = matrix1[i][j] + matrix2[i][j]
  // Pista 5: Retornar la matriz resultante o null si no se pueden sumar

  throw new Error('Función addMatrices no implementada');
}

/**
 * Multiplica una matriz por un escalar
 * @param {Array} matrix - Matriz a multiplicar
 * @param {number} scalar - Escalar por el cual multiplicar
 * @returns {Array|null} Matriz resultante o null si la matriz no es válida
 */
function multiplyMatrixByScalar(matrix, scalar) {
  // TODO: Implementar multiplicación por escalar
  // Pista 1: Validar que matrix sea un array válido
  // Pista 2: Validar que scalar sea un número
  // Pista 3: Crear una nueva matriz con las mismas dimensiones
  // Pista 4: Multiplicar cada elemento por el escalar: result[i][j] = matrix[i][j] * scalar
  // Pista 5: Retornar la matriz resultante o null si la matriz no es válida

  throw new Error('Función multiplyMatrixByScalar no implementada');
}

/**
 * Transpone una matriz (intercambia filas por columnas)
 * @param {Array} matrix - Matriz a transponer
 * @returns {Array|null} Matriz transpuesta o null si la matriz no es válida
 */
function transposeMatrix(matrix) {
  // TODO: Implementar transposición de matriz
  // Pista 1: Validar que matrix sea un array válido
  // Pista 2: Obtener las dimensiones de la matriz original
  // Pista 3: Crear una nueva matriz con dimensiones invertidas (cols x rows)
  // Pista 4: Copiar elementos: result[j][i] = matrix[i][j]
  // Pista 5: Retornar la matriz transpuesta o null si la matriz no es válida

  throw new Error('Función transposeMatrix no implementada');
}

/**
 * Verifica si una matriz es cuadrada (mismo número de filas y columnas)
 * @param {Array} matrix - Matriz a verificar
 * @returns {boolean} true si es cuadrada, false en caso contrario
 */
function isSquareMatrix(matrix) {
  // TODO: Implementar verificación de matriz cuadrada
  // Pista 1: Validar que matrix sea un array válido
  // Pista 2: Obtener las dimensiones de la matriz
  // Pista 3: Verificar que rows === cols
  // Pista 4: Retornar true si es cuadrada, false en caso contrario

  throw new Error('Función isSquareMatrix no implementada');
}

/**
 * Calcula la traza de una matriz cuadrada (suma de elementos en la diagonal principal)
 * @param {Array} matrix - Matriz cuadrada
 * @returns {number|null} Traza de la matriz o null si no es cuadrada
 */
function getMatrixTrace(matrix) {
  // TODO: Implementar cálculo de traza
  // Pista 1: Validar que matrix sea un array válido
  // Pista 2: Verificar que la matriz sea cuadrada usando isSquareMatrix
  // Pista 3: Sumar los elementos de la diagonal principal (matrix[i][i])
  // Pista 4: Retornar la suma o null si la matriz no es cuadrada

  throw new Error('Función getMatrixTrace no implementada');
}

module.exports = {
  createMatrix,
  getMatrixDimensions,
  getElement,
  setElement,
  addMatrices,
  multiplyMatrixByScalar,
  transposeMatrix,
  isSquareMatrix,
  getMatrixTrace,
};
