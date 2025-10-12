/**
 * SOLUCIÓN - Binary Search (Búsqueda Binaria)
 *
 * Esta implementación incluye diferentes variantes del algoritmo de búsqueda binaria:
 * 1. Búsqueda binaria básica
 * 2. Búsqueda binaria iterativa
 * 3. Búsqueda binaria con límites personalizados
 */

/**
 * Implementación básica de búsqueda binaria
 * Complejidad temporal: O(log n)
 * Complejidad espacial: O(log n) - recursión
 */
function binarySearch(nums, target) {
  return binarySearchHelper(nums, target, 0, nums.length - 1);
}

/**
 * Función auxiliar recursiva para búsqueda binaria
 * @param {number[]} nums - Array ordenado
 * @param {number} target - Elemento a buscar
 * @param {number} left - Índice izquierdo
 * @param {number} right - Índice derecho
 * @returns {number} - Índice del elemento o -1 si no se encuentra
 */
function binarySearchHelper(nums, target, left, right) {
  // Caso base: si left > right, el elemento no existe
  if (left > right) {
    return -1;
  }

  // Calcular el punto medio
  const mid = Math.floor((left + right) / 2);

  // Si encontramos el elemento, retornar su índice
  if (nums[mid] === target) {
    return mid;
  }

  // Si el elemento en el medio es mayor que el target,
  // buscar en la mitad izquierda
  if (nums[mid] > target) {
    return binarySearchHelper(nums, target, left, mid - 1);
  }

  // Si el elemento en el medio es menor que el target,
  // buscar en la mitad derecha
  return binarySearchHelper(nums, target, mid + 1, right);
}

/**
 * Implementación iterativa de búsqueda binaria
 * Complejidad temporal: O(log n)
 * Complejidad espacial: O(1)
 */
function binarySearchIterative(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

/**
 * Búsqueda binaria con límites personalizados
 * @param {number[]} nums - Array ordenado
 * @param {number} target - Elemento a buscar
 * @param {number} start - Índice de inicio
 * @param {number} end - Índice de fin
 * @returns {number} - Índice del elemento o -1 si no se encuentra
 */
function binarySearchInRange(nums, target, start, end) {
  let left = start;
  let right = end;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

/**
 * Búsqueda binaria que encuentra la primera ocurrencia
 * @param {number[]} nums - Array ordenado con duplicados
 * @param {number} target - Elemento a buscar
 * @returns {number} - Índice de la primera ocurrencia o -1 si no se encuentra
 */
function binarySearchFirst(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      right = mid - 1; // Continuar buscando a la izquierda
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

/**
 * Búsqueda binaria que encuentra la última ocurrencia
 * @param {number[]} nums - Array ordenado con duplicados
 * @param {number} target - Elemento a buscar
 * @returns {number} - Índice de la última ocurrencia o -1 si no se encuentra
 */
function binarySearchLast(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      left = mid + 1; // Continuar buscando a la derecha
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}

module.exports = binarySearch;
