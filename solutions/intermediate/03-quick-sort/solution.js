/**
 * SOLUCIÓN - Quick Sort (Ordenamiento Rápido)
 *
 * Esta implementación incluye cinco variantes del algoritmo Quick Sort:
 * 1. Versión básica con copias (fácil de entender)
 * 2. Versión in-place (eficiente en memoria)
 * 3. Función de particionamiento Lomuto
 * 4. Versión con pivote aleatorio (mejor rendimiento promedio)
 * 5. Versión con mediano de tres (evita casos patológicos)
 */

/**
 * Implementación básica de Quick Sort
 * Complejidad temporal: O(n log n) promedio, O(n²) peor caso
 * Complejidad espacial: O(n) - crea copias en cada recursión
 */
function quickSort(arr) {
  // Caso base: arrays de 0 o 1 elemento ya están ordenados
  if (arr.length <= 1) {
    return arr;
  }

  // Elegir el primer elemento como pivote
  const pivot = arr[0];

  // Dividir el array en tres partes
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  const equal = arr.filter(x => x === pivot);

  // Combinar resultados recursivamente
  return [...quickSort(left), ...equal, ...quickSort(right)];
}

/**
 * Versión in-place de Quick Sort
 * Complejidad temporal: O(n log n) promedio, O(n²) peor caso
 * Complejidad espacial: O(log n) - solo espacio de pila de recursión
 */
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Particionar el array y obtener el índice del pivote
    const pivotIndex = partition(arr, low, high);

    // Ordenar recursivamente las dos mitades
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
}

/**
 * Función de particionamiento usando el esquema Lomuto
 * Complejidad temporal: O(n)
 * Complejidad espacial: O(1)
 */
function partition(arr, low, high) {
  // Elegir el último elemento como pivote
  const pivot = arr[high];

  // Índice del elemento más pequeño (inicialmente antes del primer elemento)
  let i = low - 1;

  // Recorrer el array desde low hasta high-1
  for (let j = low; j < high; j++) {
    // Si el elemento actual es menor o igual al pivote
    if (arr[j] <= pivot) {
      i++;
      // Intercambiar arr[i] y arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Intercambiar el pivote con el elemento en la posición i+1
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  // Retornar la posición final del pivote
  return i + 1;
}

/**
 * Quick Sort con selección aleatoria de pivote
 * Complejidad temporal: O(n log n) promedio
 * Complejidad espacial: O(log n)
 */
function quickSortRandom(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  // Seleccionar un índice aleatorio para el pivote
  const randomIndex = Math.floor(Math.random() * arr.length);

  // Intercambiar el elemento aleatorio con el último
  [arr[randomIndex], arr[arr.length - 1]] = [
    arr[arr.length - 1],
    arr[randomIndex],
  ];

  // Continuar con el algoritmo normal
  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x < pivot);
  const right = arr.slice(0, -1).filter(x => x > pivot);
  const equal = arr.filter(x => x === pivot);

  return [...quickSortRandom(left), ...equal, ...quickSortRandom(right)];
}

/**
 * Quick Sort con selección de pivote mediano de tres
 * Complejidad temporal: O(n log n) promedio
 * Complejidad espacial: O(log n)
 */
function quickSortMedianOfThree(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  // Seleccionar el mediano de tres elementos
  const pivotIndex = selectMedianOfThree(arr);

  // Intercambiar el mediano con el último elemento
  [arr[pivotIndex], arr[arr.length - 1]] = [
    arr[arr.length - 1],
    arr[pivotIndex],
  ];

  // Continuar con el algoritmo normal
  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x < pivot);
  const right = arr.slice(0, -1).filter(x => x > pivot);
  const equal = arr.filter(x => x === pivot);

  return [
    ...quickSortMedianOfThree(left),
    ...equal,
    ...quickSortMedianOfThree(right),
  ];
}

/**
 * Función auxiliar para seleccionar el mediano de tres elementos
 * @param {number[]} arr - Array del cual seleccionar el mediano
 * @returns {number} - Índice del elemento mediano
 */
function selectMedianOfThree(arr) {
  const first = 0;
  const last = arr.length - 1;
  const middle = Math.floor((first + last) / 2);

  // Encontrar el mediano entre arr[first], arr[middle] y arr[last]
  if (arr[first] <= arr[middle] && arr[middle] <= arr[last]) {
    return middle;
  } else if (arr[first] <= arr[last] && arr[last] <= arr[middle]) {
    return last;
  } else if (arr[middle] <= arr[first] && arr[first] <= arr[last]) {
    return first;
  } else if (arr[middle] <= arr[last] && arr[last] <= arr[first]) {
    return last;
  } else if (arr[last] <= arr[first] && arr[first] <= arr[middle]) {
    return first;
  } else {
    return middle;
  }
}

module.exports = {
  quickSort,
  quickSortInPlace,
  partition,
  quickSortRandom,
  quickSortMedianOfThree,
};
