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
  
  if (!Array.isArray(arr) || isNaN(Number(index)) || isNaN(Number(value))) {
    throw new Error('Los parametros que recibi no son correctos');
  }

  if (index < 0 || index > arr.length || arr.length === 0) {
    throw new Error('Función no implementada');
  }

  const newArray = [...arr];

  for (let i = 0; i < newArray.length; i++) {
    if (i === index) {
      newArray[i] = value;
    }
  }

  return newArray;
  // Pista: Crea un nuevo array y copia los elementos del array original.
  // En el índice especificado, coloca el nuevo valor, reemplazando el valor existente.
  // Asegúrate de manejar índices fuera de rango
}

console.log(insertAt([1, 2, 3, 4], 1, 99)); // [1, 99, 3, 4]

/**
 * Función para unir dos arrays
 *
 * @param {any[]} arr1 - Primer array
 * @param {any[]} arr2 - Segundo array
 * @returns {any[]} Array resultante de unir ambos arrays
 */
function joinArrays(arr1, arr2) {
  // TODO: Implementar función para unir dos arrays
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Los parametros que recibi no son arrays');
  }
  const newArray = [...arr1, ...arr2];
  return newArray;
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

  if (!Array.isArray(arr) || isNaN(Number(index)) || !Array.isArray(values)) {
    throw new Error('Los parametros que recibi no son correctos');
  }

  if (index < 0 || index >= arr.length) {
    throw new Error('Función no implementada');
  }

  const newArray = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (i === index) {
      newArray.push(...values);
    }

    newArray.push(element);
  }

  return newArray;

  // Pista: Similar a insertAt pero en lugar de insertar un valor,
  // inserta todos los valores del array 'values' empezando desde el índice especificado.
  // Los valores existentes a partir del índice se desplazan hacia la derecha
}

const arr = [1, 2, 5, 6];
const values = [3, 4];

// Insertar [3, 4] en el índice 2
console.log(insertMultipleAt(arr, 2, values)); // [1, 2, 3, 4, 5, 6]

module.exports = {
  insertAt,
  joinArrays,
  insertMultipleAt,
};
