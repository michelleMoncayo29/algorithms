/**
 * SOLUCIÓN: Operaciones con Matrices
 * 
 * Esta es la solución completa para el ejercicio de operaciones con matrices.
 * Implementa todas las funciones requeridas con manejo robusto de casos edge y
 * validaciones apropiadas.
 */

/**
 * Crea una matriz con las dimensiones especificadas y un valor por defecto
 * @param {number} rows - Número de filas
 * @param {number} cols - Número de columnas
 * @param {*} defaultValue - Valor por defecto para llenar la matriz
 * @returns {Array} Matriz creada
 */
function createMatrix(rows, cols, defaultValue = 0) {
    // Validar que rows y cols sean números positivos
    if (typeof rows !== 'number' || typeof cols !== 'number' || 
        rows < 0 || cols < 0 || !Number.isInteger(rows) || !Number.isInteger(cols)) {
        throw new Error('Las dimensiones deben ser números enteros no negativos');
    }
    
    // Crear matriz vacía si las dimensiones son 0
    if (rows === 0 || cols === 0) {
        return [];
    }
    
    // Crear matriz con valores por defecto
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

/**
 * Obtiene las dimensiones de una matriz
 * @param {Array} matrix - Matriz a analizar
 * @returns {Object|null} Objeto con propiedades rows y cols, o null si es inválida
 */
function getMatrixDimensions(matrix) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix)) {
        return null;
    }
    
    // Manejar matriz vacía
    if (matrix.length === 0) {
        return { rows: 0, cols: 0 };
    }
    
    // Verificar que todas las filas sean arrays
    for (let i = 0; i < matrix.length; i++) {
        if (!Array.isArray(matrix[i])) {
            return null;
        }
    }
    
    // Verificar que todas las filas tengan la misma longitud
    const cols = matrix[0].length;
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i].length !== cols) {
            return null;
        }
    }
    
    return { rows: matrix.length, cols: cols };
}

/**
 * Obtiene un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @returns {*} Elemento en la posición especificada
 */
function getElement(matrix, row, col) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return undefined;
    }
    
    // Validar que row y col sean números enteros
    if (typeof row !== 'number' || typeof col !== 'number' || 
        !Number.isInteger(row) || !Number.isInteger(col)) {
        return undefined;
    }
    
    // Validar que los índices estén dentro del rango
    if (row < 0 || col < 0 || row >= matrix.length) {
        return undefined;
    }
    
    // Validar que la fila sea un array y que col esté dentro del rango
    if (!Array.isArray(matrix[row]) || col >= matrix[row].length) {
        return undefined;
    }
    
    return matrix[row][col];
}

/**
 * Establece un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @param {*} value - Valor a establecer
 * @returns {boolean} true si se estableció correctamente, false si no
 */
function setElement(matrix, row, col, value) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return false;
    }
    
    // Validar que row y col sean números enteros
    if (typeof row !== 'number' || typeof col !== 'number' || 
        !Number.isInteger(row) || !Number.isInteger(col)) {
        return false;
    }
    
    // Validar que los índices estén dentro del rango
    if (row < 0 || col < 0 || row >= matrix.length) {
        return false;
    }
    
    // Validar que la fila sea un array y que col esté dentro del rango
    if (!Array.isArray(matrix[row]) || col >= matrix[row].length) {
        return false;
    }
    
    matrix[row][col] = value;
    return true;
}

/**
 * Suma dos matrices del mismo tamaño
 * @param {Array} matrix1 - Primera matriz
 * @param {Array} matrix2 - Segunda matriz
 * @returns {Array|null} Matriz resultante o null si no se pueden sumar
 */
function addMatrices(matrix1, matrix2) {
    // Validar que ambas matrices sean arrays válidos
    if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
        return null;
    }
    
    // Obtener dimensiones de ambas matrices
    const dims1 = getMatrixDimensions(matrix1);
    const dims2 = getMatrixDimensions(matrix2);
    
    // Verificar que ambas matrices sean válidas y tengan las mismas dimensiones
    if (!dims1 || !dims2 || dims1.rows !== dims2.rows || dims1.cols !== dims2.cols) {
        return null;
    }
    
    // Crear matriz resultante
    const result = [];
    for (let i = 0; i < dims1.rows; i++) {
        const row = [];
        for (let j = 0; j < dims1.cols; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
    }
    
    return result;
}

/**
 * Multiplica una matriz por un escalar
 * @param {Array} matrix - Matriz a multiplicar
 * @param {number} scalar - Escalar por el cual multiplicar
 * @returns {Array|null} Matriz resultante o null si la matriz no es válida
 */
function multiplyMatrixByScalar(matrix, scalar) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix)) {
        return null;
    }
    
    // Validar que scalar sea un número
    if (typeof scalar !== 'number') {
        return null;
    }
    
    // Obtener dimensiones de la matriz
    const dims = getMatrixDimensions(matrix);
    if (!dims) {
        return null;
    }
    
    // Crear matriz resultante
    const result = [];
    for (let i = 0; i < dims.rows; i++) {
        const row = [];
        for (let j = 0; j < dims.cols; j++) {
            row.push(matrix[i][j] * scalar);
        }
        result.push(row);
    }
    
    return result;
}

/**
 * Transpone una matriz (intercambia filas por columnas)
 * @param {Array} matrix - Matriz a transponer
 * @returns {Array|null} Matriz transpuesta o null si la matriz no es válida
 */
function transposeMatrix(matrix) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix)) {
        return null;
    }
    
    // Obtener dimensiones de la matriz
    const dims = getMatrixDimensions(matrix);
    if (!dims) {
        return null;
    }
    
    // Crear matriz transpuesta
    const result = [];
    for (let j = 0; j < dims.cols; j++) {
        const row = [];
        for (let i = 0; i < dims.rows; i++) {
            row.push(matrix[i][j]);
        }
        result.push(row);
    }
    
    return result;
}

/**
 * Verifica si una matriz es cuadrada (mismo número de filas y columnas)
 * @param {Array} matrix - Matriz a verificar
 * @returns {boolean} true si es cuadrada, false en caso contrario
 */
function isSquareMatrix(matrix) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix)) {
        return false;
    }
    
    // Obtener dimensiones de la matriz
    const dims = getMatrixDimensions(matrix);
    if (!dims) {
        return false;
    }
    
    // Verificar que rows === cols
    return dims.rows === dims.cols;
}

/**
 * Calcula la traza de una matriz cuadrada (suma de elementos en la diagonal principal)
 * @param {Array} matrix - Matriz cuadrada
 * @returns {number|null} Traza de la matriz o null si no es cuadrada
 */
function getMatrixTrace(matrix) {
    // Validar que matrix sea un array válido
    if (!Array.isArray(matrix)) {
        return null;
    }
    
    // Verificar que la matriz sea cuadrada
    if (!isSquareMatrix(matrix)) {
        return null;
    }
    
    // Calcular traza sumando elementos de la diagonal principal
    let trace = 0;
    for (let i = 0; i < matrix.length; i++) {
        trace += matrix[i][i];
    }
    
    return trace;
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
    getMatrixTrace
};
