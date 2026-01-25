/**
 * Procesador de Tareas en Cola con Promesas
 *
 * Descripción: Procesa tareas en cola secuencialmente usando promesas, con límite de concurrencia.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Cola de tareas asíncronas
 * - Procesamiento secuencial vs paralelo
 * - Control de concurrencia
 * - Promise.all() y Promise.allSettled()
 */

/**
 * Procesa tareas en cola secuencialmente (una a la vez).
 * Cada tarea es una función que retorna una Promise.
 *
 * @param {Array<Function>} tasks - Array de funciones que retornan Promises
 * @returns {Promise<Array>} Promesa que se resuelve con array de resultados en orden
 *
 * Ejemplo:
 * processTasksSequentially([
 *   () => Promise.resolve(1),
 *   () => Promise.resolve(2),
 *   () => Promise.resolve(3)
 * ]).then(results => console.log(results)); // [1, 2, 3]
 *
 * TODO:
 * - Valida que tasks sea un array
 * - Valida que cada elemento sea una función
 * - Procesa tareas una por una (secuencialmente)
 * - Espera a que cada tarea termine antes de empezar la siguiente
 * - Retorna array de resultados en el mismo orden que las tareas
 */
function processTasksSequentially(tasks) {
    throw new Error('Function processTasksSequentially not implemented');
}

/**
 * Procesa tareas en paralelo (todas a la vez).
 *
 * @param {Array<Function>} tasks - Array de funciones que retornan Promises
 * @returns {Promise<Array>} Promesa que se resuelve con array de resultados
 *
 * TODO:
 * - Valida que tasks sea un array
 * - Valida que cada elemento sea una función
 * - Ejecuta todas las tareas en paralelo usando Promise.all()
 * - Retorna array de resultados en el mismo orden que las tareas
 */
function processTasksInParallel(tasks) {
    throw new Error('Function processTasksInParallel not implemented');
}

/**
 * Procesa tareas con límite de concurrencia (máximo N tareas a la vez).
 *
 * @param {Array<Function>} tasks - Array de funciones que retornan Promises
 * @param {number} concurrencyLimit - Número máximo de tareas a ejecutar simultáneamente (debe ser > 0)
 * @returns {Promise<Array>} Promesa que se resuelve con array de resultados
 *
 * Ejemplo:
 * processTasksWithConcurrency([
 *   () => delay(100).then(() => 1),
 *   () => delay(100).then(() => 2),
 *   () => delay(100).then(() => 3),
 *   () => delay(100).then(() => 4)
 * ], 2)
 * // Ejecuta máximo 2 tareas a la vez
 *
 * TODO:
 * - Valida que tasks sea un array
 * - Valida que concurrencyLimit sea un número positivo
 * - Procesa tareas con límite de concurrencia
 * - Cuando una tarea termina, inicia la siguiente
 * - Retorna array de resultados en el mismo orden que las tareas
 */
function processTasksWithConcurrency(tasks, concurrencyLimit) {
    throw new Error('Function processTasksWithConcurrency not implemented');
}

module.exports = {
    processTasksSequentially,
    processTasksInParallel,
    processTasksWithConcurrency
};

