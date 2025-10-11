/**
 * SOLUCIÓN - Problema de la Mochila (Knapsack Problem)
 *
 * Esta implementación incluye tres versiones del algoritmo de la mochila 0/1:
 * 1. Versión básica con tabla 2D (O(n×W) tiempo y espacio)
 * 2. Versión optimizada con array 1D (O(n×W) tiempo, O(W) espacio)
 * 3. Reconstrucción de la solución óptima
 */

/**
 * Implementación básica del algoritmo de la mochila usando programación dinámica
 * Complejidad temporal: O(n × capacity)
 * Complejidad espacial: O(n × capacity)
 */
function knapsack(weights, values, capacity) {
  const n = weights.length;

  // Crear tabla 2D para programación dinámica
  // dp[i][w] = valor máximo usando los primeros i elementos con peso máximo w
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // Llenar la tabla DP
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Si el peso del elemento actual es mayor que w, no se puede incluir
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        // Tomar el máximo entre incluir o no incluir el elemento
        dp[i][w] = Math.max(
          dp[i - 1][w], // No incluir el elemento
          dp[i - 1][w - weights[i - 1]] + values[i - 1] // Incluir el elemento
        );
      }
    }
  }

  return dp[n][capacity];
}

/**
 * Versión optimizada que usa solo O(capacity) espacio
 * Complejidad temporal: O(n × capacity)
 * Complejidad espacial: O(capacity)
 */
function knapsackOptimized(weights, values, capacity) {
  // Usar solo un array 1D en lugar de tabla 2D
  const dp = Array(capacity + 1).fill(0);

  // Para cada elemento
  for (let i = 0; i < weights.length; i++) {
    // Iterar hacia atrás para evitar usar valores ya modificados
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(
        dp[w], // Valor actual
        dp[w - weights[i]] + values[i] // Valor incluyendo el elemento actual
      );
    }
  }

  return dp[capacity];
}

/**
 * Obtiene los elementos que forman la solución óptima
 * Complejidad temporal: O(n × capacity)
 * Complejidad espacial: O(n × capacity)
 */
function knapsackItems(weights, values, capacity) {
  const n = weights.length;

  // Crear tabla 2D para programación dinámica
  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // Llenar la tabla DP (mismo algoritmo que knapsack básico)
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }

  // Reconstruir la solución recorriendo la tabla hacia atrás
  const selectedItems = [];
  let i = n;
  let w = capacity;

  while (i > 0 && w > 0) {
    // Si el valor actual es diferente al valor sin el elemento actual,
    // significa que el elemento fue incluido
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(i - 1); // Añadir índice del elemento
      w -= weights[i - 1]; // Restar el peso del elemento
    }
    i--;
  }

  // Retornar en orden ascendente
  return selectedItems.sort((a, b) => a - b);
}

module.exports = { knapsack, knapsackOptimized, knapsackItems };
