/**
 * Problema de la Mochila (Knapsack Problem)
 *
 * Descripción: Implementa el algoritmo de la mochila 0/1 usando programación dinámica
 * Dificultad: ADVANCED
 *
 * @param {number[]} weights - Array de pesos de los elementos
 * @param {number[]} values - Array de valores de los elementos
 * @param {number} capacity - Capacidad máxima de la mochila
 * @returns {number} - Valor máximo que se puede obtener
 *
 * Ejemplo:
 * knapsack([10, 20, 30], [60, 100, 120], 50) // 220
 */

function knapsack(weights, values, capacity) {
  // TODO: Implementar el algoritmo de la mochila 0/1

  // Pista: Usa una tabla 2D donde dp[i][w] representa el valor máximo
  // que se puede obtener con los primeros i elementos y peso máximo w

  // Casos base:
  // - Si no hay elementos (i=0) o no hay capacidad (w=0), el valor es 0
  // - Si el peso del elemento actual es mayor que w, no se puede incluir
  // - Si se puede incluir, toma el máximo entre incluirlo o no incluirlo

  throw new Error('Función knapsack no implementada');
}

/**
 * Versión optimizada con espacio O(capacity)
 * @param {number[]} weights - Array de pesos de los elementos
 * @param {number[]} values - Array de valores de los elementos
 * @param {number} capacity - Capacidad máxima de la mochila
 * @returns {number} - Valor máximo que se puede obtener
 */
function knapsackOptimized(weights, values, capacity) {
  // TODO: Implementar la versión optimizada con espacio O(capacity)

  // Pista: En lugar de usar una tabla 2D completa, usa solo un array 1D
  // Recuerda iterar los pesos de forma descendente para evitar sobrescribir
  // valores que aún necesitas en la misma iteración

  throw new Error('Función knapsackOptimized no implementada');
}

/**
 * Obtiene los elementos que forman la solución óptima
 * @param {number[]} weights - Array de pesos de los elementos
 * @param {number[]} values - Array de valores de los elementos
 * @param {number} capacity - Capacidad máxima de la mochila
 * @returns {number[]} - Índices de los elementos seleccionados
 */
function knapsackItems(weights, values, capacity) {
  // TODO: Implementar la reconstrucción de la solución

  // Pista: Primero calcula la tabla DP, luego reconstruye la solución
  // recorriendo la tabla desde el final hacia atrás

  throw new Error('Función knapsackItems no implementada');
}

module.exports = { knapsack, knapsackOptimized, knapsackItems };
