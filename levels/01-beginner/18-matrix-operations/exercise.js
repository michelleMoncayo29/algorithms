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
    typeof cols !== 'number' 
  ) {
    console.log(rows, 'esto es console.log');

    return [];
  }
  
  if (rows < 0 || cols < 0) {
    // throw new Error('Rows y cols deben ser números positivos');
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

  // throw new

  return matrix;
}
const matrix = createMatrix(-1, 2, 0);
console.log(matrix);

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
    return false;
  }

  if (
    Number(row) < 0 ||
    Number(col) < 0 ||
    typeof row !== 'number' ||
    typeof col !== 'number'
  ) {
    return false;
  }

  for (let i = 0; i < matrix.length; i++) {
    let element = matrix[i];
    let rowLength = element.length - 1;

    if (row > rowLength) {
      return false;
    }

    for (let j = 0; j < element.length; j++) {
      let colLength = element.length - 1;
      if (col > colLength) {
        return false;
      }
    }
  }

  matrix[row][col] = value;

  return true;
}
const matrix2 = [
  [1, 2],
  [3, 4],
];
const resultSet = setElement(matrix2, 0, 1, 99);
/**
 * Suma dos matrices del mismo tamaño
 * @param {Array} matrix1 - Primera matriz
 * @param {Array} matrix2 - Segunda matriz
 * @returns {Array|null} Matriz resultante o null si no se pueden sumar
 */
function addMatrices(matrix1, matrix2) {
  if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
    return null;
  }

  // revisar si las matrices tienen las mismas dimensiones
  if (matrix1.length !== matrix2.length) {
    for (let i = 0; i < matrix1.length; i++) {
      let mx1 = matrix1[i];
      let mx2 = matrix2[i];
      if (mx1.length !== mx2.length) {
        return null;
      }
    }
    return null;
  }

  const result = [];
  let matrixUni = matrix1.length;

  for (let i = 0; i < matrixUni; i++) {
    const rowM = matrix1[i];
    const row = [];
    for (let j = 0; j < rowM.length; j++) {
      row.push(matrix1[i][j] + matrix2[i][j]);
    }
    result.push(row);
  }

  return result;
}

const matrix3 = [
  [
    [1, 2],
    [3, 4],
  ],
];
const matrix4 = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
];
const result = addMatrices(matrix3, matrix4);
// console.log(result);

/**
 * Multiplica una matriz por un escalar
 * @param {Array} matrix - Matriz a multiplicar
 * @param {number} scalar - Escalar por el cual multiplicar
 * @returns {Array|null} Matriz resultante o null si la matriz no es válida
 */
function multiplyMatrixByScalar(matrix, scalar) {
  if (!Array.isArray(matrix) || typeof scalar !== 'number') {
    return null;
  }

  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    const arrValue = matrix[i];
    // console.log(arrValue, 'esto es arrValue');
    for (let j = 0; j < arrValue.length; j++) {
      row.push(arrValue[j] * scalar);
    }
    result.push(row);
  }
  return result;
}
const matrix5 = [
  [1, 2],
  [3, 4],
];
const result2 = multiplyMatrixByScalar(matrix5, 0);
/**
 * Transpone una matriz (intercambia filas por columnas)
 * @param {Array} matrix - Matriz a transponer
 * @returns {Array|null} Matriz transpuesta o null si la matriz no es válida
 */
function transposeMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return null;
  }

  const result = [];

  if (matrix.length === 0 || matrix[0].length === 0) {
    return result;
  }

  for (let i = 0; i < matrix[0].length; i++) {
    const row = [];

    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[j][i]);
    }
    result.push(row);
  }

  return result;
}
const matrix6 = [];
const result3 = transposeMatrix(matrix6);
// console.log(result3);

/**
 * Verifica si una matriz es cuadrada (mismo número de filas y columnas)
 * @param {Array} matrix - Matriz a verificar
 * @returns {boolean} true si es cuadrada, false en caso contrario
 */
function isSquareMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return false;
  }

  for (let i = 0; i < matrix.length; i++) {
    const arr = matrix[i];
    const arrLength = arr.length;

    if (matrix.length !== arrLength) {
      return false;
    }
  }

  return true;
}
const matrix7 = [
  [1, 2],
  [3, 4],
];
const result4 = isSquareMatrix(matrix7);

// console.log(result4);

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


  if (!isSquareMatrix(matrix)) {
    return null;
  }

  let line = 0;
  for (let i = 0; i < matrix.length; i++) {
    line += matrix[i][i];
  }

  return line;
}
const matrix8 = [
  [1, 2],
  [3, 4],
];
const result7 = getMatrixTrace(matrix8);
// console.log(result7);

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
