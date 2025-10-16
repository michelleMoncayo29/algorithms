/**
 * Operaciones Básicas con Arrays
 * 
 * Descripción: Implementa funciones para realizar operaciones básicas con arrays:
 * insertar valores en índices específicos reemplazando el valor existente y unir dos arrays.
 * Dificultad: INTERMEDIATE
 * 
 * @param {any[]} arr - Array base
 * @param {number} index - Índice donde insertar
 * @param {any} value - Valor a insertar
 * @returns {any[]} Nuevo array con el valor insertado
 * 
 * Ejemplo:
 * insertAt([1, 2, 3, 4], 1, 99) // [1, 99, 3, 4]
 */

function insertAt(arr, index, value) {
    // TODO: Implementar función para insertar un valor en un índice específico
    
    // Pista: Crea un nuevo array y copia los elementos del array original.
    // En el índice especificado, coloca el nuevo valor, reemplazando el valor existente.
    // Asegúrate de manejar índices fuera de rango
    
    throw new Error('Función no implementada');
}

/**
 * Función para unir dos arrays
 * 
 * @param {any[]} arr1 - Primer array
 * @param {any[]} arr2 - Segundo array
 * @returns {any[]} Array resultante de unir ambos arrays
 */
function joinArrays(arr1, arr2) {
    // TODO: Implementar función para unir dos arrays
    
    // Pista: Crea un nuevo array que contenga todos los elementos del primer array
    // seguidos de todos los elementos del segundo array.
    // Puedes usar el spread operator (...) o métodos como concat()
    
    throw new Error('Función no implementada');
}

/**
 * Función para insertar múltiples valores en un array
 * 
 * @param {any[]} arr - Array base
 * @param {number} index - Índice donde empezar a insertar
 * @param {any[]} values - Array de valores a insertar
 * @returns {any[]} Nuevo array con los valores insertados
 */
function insertMultipleAt(arr, index, values) {
    // TODO: Implementar función para insertar múltiples valores en un índice específico
    
    // Pista: Similar a insertAt pero en lugar de insertar un valor,
    // inserta todos los valores del array 'values' empezando desde el índice especificado.
    // Los valores existentes a partir del índice se desplazan hacia la derecha
    
    throw new Error('Función no implementada');
}

module.exports = {
    insertAt,
    joinArrays,
    insertMultipleAt
};