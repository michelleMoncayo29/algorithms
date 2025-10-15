/**
 * Quick Sort (Ordenamiento Rápido)
 *
 * Descripción: Implementa el algoritmo de ordenamiento Quick Sort con diferentes estrategias de pivote
 * Dificultad: INTERMEDIATE
 *
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} - Array ordenado
 *
 * Ejemplo:
 * quickSort([64, 34, 25, 12, 22, 11, 90]) // [11, 12, 22, 25, 34, 64, 90]
 */

/**
 * Implementación básica de Quick Sort
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} - Array ordenado
 */
function quickSort(arr) {
  // TODO: Implementar Quick Sort básico

  // Pista: Usa recursión con la estrategia divide y vencerás
  // 1. Elegir un pivote (puede ser el primer, último o elemento medio)
  // 2. Particionar el array alrededor del pivote
  // 3. Ordenar recursivamente las dos mitades

  let array = [...arr]; // Crear una copia para no modificar el original

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

/**
 * Quick Sort con particionamiento in-place
 * @param {number[]} arr - Array a ordenar
 * @param {number} low - Índice inicial
 * @param {number} high - Índice final
 */
function quickSortInPlace(arr, high = arr.length - 1) {
  // TODO: Implementar Quick Sort in-place

  // Pista: Modifica el array original sin crear copias
  // Usa los índices low y high para definir el rango a ordenar
  // La función partition debe retornar la posición final del pivote
  // Crear una copia para no modificar el original

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < high; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // throw new Error('Función quickSortInPlace no implementada');
}

/**
 * Función de particionamiento (Lomuto partition scheme)
 * @param {number[]} arr - Array a particionar
 * @param {number} low - Índice inicial
 * @param {number} high - Índice final
 * @returns {number} - Índice final del pivote
 */

function getPivoteArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}
function cleanArr(arr){
  const ar = [...arr]
  for (let i = 0; i < ar.length; i++) {
    
    arr.pop();
  }
}
function partition(arrInput, low, high) {
  const arr = [...arrInput];
  cleanArr(arrInput);
  console.log(arrInput);
  // Pista:
  // 1. Elegir el último elemento como pivote
  // 2. Mantener un índice i que marca la posición del elemento más pequeño
  // 3. Recorrer el array y colocar elementos menores al pivote antes de i
  // 4. Intercambiar el pivote con el elemento en la posición i+1

  const pivot = [];
  const arraFinish = [];
  let inyectEjecuted = false;

  // Array para extraer el pivot
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (i >= low && i <= high) {
      pivot.push(element);
    }
  }

  const ordernPivot = getPivoteArray(pivot);
  
console.log({arrInput,high});
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (i >= low && i <= high) {
      if (!inyectEjecuted) {
 
        arrInput.push(...ordernPivot);
        inyectEjecuted = true;

      }
    } else {
      arrInput.push(element);
    }
    
  }
  
  return high;
}

const a = [3, 1, 4, 1, 5, 9, 2, 6]
console.log(partition(a, 0, a.length - 1));


/**
 * Quick Sort con selección de pivote aleatorio
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} - Array ordenado
 */
function quickSortRandom(arr) {
  // TODO: Implementar Quick Sort con pivote aleatorio

  // Pista: Antes de particionar, intercambia el último elemento
  // con un elemento aleatorio para mejorar el rendimiento promedio

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/**
 * Quick Sort con selección de pivote mediano de tres
 * @param {number[]} arr - Array a ordenar
 * @returns {number[]} - Array ordenado
 */
function quickSortMedianOfThree(arr) {
  // TODO: Implementar Quick Sort con pivote mediano de tres

  // Pista: Selecciona el mediano entre el primer, medio y último elemento
  // Esto ayuda a evitar el caso peor de O(n²) en arrays ya ordenados

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
  // throw new Error('Función quickSortMedianOfThree no implementada');
}

module.exports = {
  quickSort,
  quickSortInPlace,
  partition,
  quickSortRandom,
  quickSortMedianOfThree,
};
