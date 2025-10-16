/**
 * Operaciones Básicas con Arrays - SOLUCIÓN COMPLETA
 * 
 * Descripción: Implementación completa de funciones para manipulación básica de arrays
 * Dificultad: INTERMEDIATE
 */

/**
 * Inserta un valor en un índice específico del array, reemplazando el valor existente
 * 
 * @param {any[]} arr - Array base
 * @param {number} index - Índice donde insertar
 * @param {any} value - Valor a insertar
 * @returns {any[]} Nuevo array con el valor insertado
 */
function insertAt(arr, index, value) {
    // Validación de entrada
    if (!Array.isArray(arr)) {
        throw new Error('El primer parámetro debe ser un array');
    }
    
    if (typeof index !== 'number') {
        throw new Error('El índice debe ser un número');
    }
    
    if (index < 0 || index >= arr.length) {
        throw new Error('Índice fuera de rango');
    }
    
    // Crear una copia del array para mantener inmutabilidad
    const result = [...arr];
    
    // Reemplazar el valor en el índice especificado
    result[index] = value;
    
    return result;
}

/**
 * Une dos arrays en uno solo
 * 
 * @param {any[]} arr1 - Primer array
 * @param {any[]} arr2 - Segundo array
 * @returns {any[]} Array resultante de unir ambos arrays
 */
function joinArrays(arr1, arr2) {
    // Validación de entrada
    if (!Array.isArray(arr1)) {
        throw new Error('El primer parámetro debe ser un array');
    }
    
    if (!Array.isArray(arr2)) {
        throw new Error('El segundo parámetro debe ser un array');
    }
    
    // Usar spread operator para unir los arrays
    return [...arr1, ...arr2];
    
    // Alternativa usando concat():
    // return arr1.concat(arr2);
}

/**
 * Inserta múltiples valores en un índice específico del array
 * 
 * @param {any[]} arr - Array base
 * @param {number} index - Índice donde empezar a insertar
 * @param {any[]} values - Array de valores a insertar
 * @returns {any[]} Nuevo array con los valores insertados
 */
function insertMultipleAt(arr, index, values) {
    // Validación de entrada
    if (!Array.isArray(arr)) {
        throw new Error('El primer parámetro debe ser un array');
    }
    
    if (typeof index !== 'number') {
        throw new Error('El índice debe ser un número');
    }
    
    if (index < 0 || index > arr.length) {
        throw new Error('Índice fuera de rango');
    }
    
    if (!Array.isArray(values)) {
        throw new Error('El tercer parámetro debe ser un array');
    }
    
    // Crear una copia del array
    const result = [...arr];
    
    // Usar splice para insertar múltiples elementos
    // splice(index, 0, ...values) inserta los valores sin eliminar elementos existentes
    result.splice(index, 0, ...values);
    
    return result;
    
    // Alternativa manual (más didáctica):
    // const result = [];
    // 
    // // Copiar elementos antes del índice
    // for (let i = 0; i < index; i++) {
    //     result.push(arr[i]);
    // }
    // 
    // // Insertar los nuevos valores
    // for (let i = 0; i < values.length; i++) {
    //     result.push(values[i]);
    // }
    // 
    // // Copiar elementos después del índice
    // for (let i = index; i < arr.length; i++) {
    //     result.push(arr[i]);
    // }
    // 
    // return result;
}

// Exportar todas las funciones
module.exports = {
    insertAt,
    joinArrays,
    insertMultipleAt
};