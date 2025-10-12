/**
 * SOLUCIÓN: Find Maximum
 *
 * ⚠️ ADVERTENCIA: Esta es una solución. No la mires hasta haber intentado resolver el problema.
 *
 * Este archivo contiene la solución completa para el problema Find Maximum.
 * Incluye múltiples enfoques con análisis de complejidad.
 */

/**
 * SOLUCIÓN 1: Iteración Básica (Recomendada para principiantes)
 *
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por el array
 * - Espacio: O(1) - Solo variables temporales
 *
 * Este es el enfoque más directo y fácil de entender.
 */
function findMaximumIterative(nums) {
  if (nums.length === 0) {
    throw new Error('Array vacío');
  }

  let max = nums[0]; // Inicializar con el primer elemento

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }

  return max;
}

/**
 * SOLUCIÓN 2: Usando Math.max() (Más concisa)
 *
 * Complejidad:
 * - Tiempo: O(n) - Internamente hace una pasada por el array
 * - Espacio: O(1) - Solo variables temporales
 *
 * Esta es la forma más elegante en JavaScript.
 */
function findMaximumMathMax(nums) {
  if (nums.length === 0) {
    throw new Error('Array vacío');
  }

  return Math.max(...nums);
}

/**
 * SOLUCIÓN 3: Usando reduce() (Funcional)
 *
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por el array
 * - Espacio: O(1) - Solo variables temporales
 *
 * Enfoque funcional usando el método reduce.
 */
function findMaximumReduce(nums) {
  if (nums.length === 0) {
    throw new Error('Array vacío');
  }

  return nums.reduce((max, current) => {
    return current > max ? current : max;
  }, nums[0]);
}

/**
 * SOLUCIÓN 4: Usando for...of (Moderno)
 *
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por el array
 * - Espacio: O(1) - Solo variables temporales
 *
 * Versión moderna usando for...of loop.
 */
function findMaximumForOf(nums) {
  if (nums.length === 0) {
    throw new Error('Array vacío');
  }

  let max = nums[0];

  for (const num of nums) {
    if (num > max) {
      max = num;
    }
  }

  return max;
}

// Exportar la solución principal (iterativa básica)
module.exports = findMaximumIterative;

/**
 * ANÁLISIS DETALLADO:
 *
 * 1. ¿Por qué inicializar con el primer elemento?
 *    - Garantiza que siempre tengamos un valor válido para comparar
 *    - Funciona correctamente con arrays de cualquier tamaño
 *    - Evita problemas con valores como -Infinity
 *
 * 2. ¿Por qué empezar el bucle desde i = 1?
 *    - Ya hemos usado nums[0] como valor inicial
 *    - Evita comparar el primer elemento consigo mismo
 *    - Es más eficiente
 *
 * 3. ¿Cómo manejar arrays vacíos?
 *    - Es importante validar la entrada
 *    - Podemos lanzar una excepción o devolver un valor especial
 *    - En este caso, lanzamos un error para ser explícitos
 *
 * 4. Comparación de enfoques:
 *    - Iterativo: Más claro para principiantes, control total
 *    - Math.max(): Más conciso, aprovecha optimizaciones nativas
 *    - Reduce: Enfoque funcional, composible
 *    - For...of: Sintaxis moderna, más legible
 *
 * 5. Casos edge importantes:
 *    - Arrays con un solo elemento
 *    - Arrays con números negativos
 *    - Arrays con números repetidos
 *    - Arrays muy grandes (considerar rendimiento)
 *
 * 6. Optimizaciones posibles:
 *    - Para arrays muy grandes, podríamos usar algoritmos paralelos
 *    - Para arrays ordenados, podríamos usar búsqueda binaria
 *    - Pero para este nivel, la iteración simple es perfecta
 */
