/**
 * Calculadora de Estadísticas
 *
 * Descripción: Implementa funciones para analizar arrays de números con estadísticas básicas
 * y medidas de tendencia central. Este ejercicio cubre conceptos fundamentales de estadística
 * descriptiva aplicados a programación.
 * Dificultad: BEGINNER
 *
 * Funciones requeridas:
 * - calculateMean(numbers): Calcula la media aritmética
 * - calculateMedian(numbers): Calcula la mediana
 * - calculateMode(numbers): Calcula la moda
 * - calculateRange(numbers): Calcula el rango
 * - calculateStandardDeviation(numbers): Calcula la desviación estándar
 */

/**
 * Calcula la media aritmética de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Media aritmética o null si es inválido
 *
 * Ejemplos:
 * calculateMean([1, 2, 3, 4, 5]) → 3
 * calculateMean([10, 20, 30]) → 20
 * calculateMean([5, 5, 5, 5]) → 5
 */

function validateArrayNumbers(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (typeof element !== 'number') return false;
  }

  return true;
}

function calculateMean(numbers) {
  // TODO: Implementar cálculo de media
  // Pista 1: Validar que numbers sea un array válido
  // Pista 2: Verificar que el array no esté vacío
  // Pista 3: Verificar que todos los elementos sean números
  // Pista 4: Sumar todos los números usando reduce o bucle
  // Pista 5: Dividir la suma por la cantidad de elementos
  // Pista 6: Retornar null si hay error

  // throw new Error('Función calculateMean no implementada');
  if (!validateArrayNumbers(numbers)) {
    return null;
  }

  const sumTotal = numbers.reduce((acc, current) => {
    return acc + current;
  }, 0);

  const result = sumTotal / numbers.length;

  return result;
}

/**
 * Calcula la mediana de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Mediana o null si es inválido
 *
 * Ejemplos:
 * calculateMedian([1, 2, 3, 4, 5]) → 3
 * calculateMedian([1, 2, 3, 4]) → 2.5 (promedio de 2 y 3)
 * calculateMedian([5, 10, 15]) → 10
 */

// !REVISAR ESTO ME falta un test
function calculateMedian(numbers) {
  // TODO: Implementar cálculo de mediana
  // Pista 1: Validar que numbers sea un array válido
  // Pista 2: Verificar que el array no esté vacío
  // Pista 3: Ordenar el array de menor a mayor
  // Pista 4: Si la cantidad es impar, tomar el elemento del medio
  // Pista 5: Si la cantidad es par, promediar los dos elementos centrales
  // Pista 6: Retornar null si hay error

    if (!validateArrayNumbers(numbers)) {
        return null;
    }

    const lengthArray = numbers.length;

    const numbersSorted = numbers.sort((a, b) => a - b);
    // console.log(numbersSorted, 'array ordenado');

    let sum = numbersSorted[0];

    for (let i = 1; i < lengthArray; i++) {
        const element = numbersSorted[i];
        sum += element;
    }

    // Si es par
    if (lengthArray % 2 === 0) {
        const resultPar = sum / lengthArray;
        return resultPar;
    }
    
    // redondeamos hacia abajo
    const resultIn = Math.floor(sum / lengthArray);
    
    return resultIn;
}


/**
 * Calcula la moda de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {Array|null} Array con valores modales o null si es inválido
 *
 * Ejemplos:
 * calculateMode([1, 2, 2, 3]) → [2]
 * calculateMode([1, 1, 2, 2, 3]) → [1, 2]
 * calculateMode([1, 2, 3, 4]) → []
 */


function calculateMode(numbers) {
    // TODO: Implementar cálculo de moda
    // Pista 1: Validar que numbers sea un array válido
    // Pista 2: Contar frecuencia de cada número usando un objeto
    // Pista 3: Encontrar la frecuencia máxima
    // Pista 4: Retornar todos los números con frecuencia máxima
    // Pista 5: Si todos tienen frecuencia 1, retornar array vacío
    // Pista 6: Retornar null si hay error

    if (!validateArrayNumbers(numbers)) {
        return null;
    }

    const arrFrequency = [];
    const contadorObject = {};

    for (const number of numbers) {
        const clave = String(number);
        // Si la clave no existe, utiliza 0 como valor inicial; luego, suma 1.
        contadorObject[clave] = (contadorObject[clave] || 0) + 1;
    }
    console.log(contadorObject, 'objeto contador');

    // Convertimos esto en array de la cantidad de valores que se repiten
    const maxFrequency = Object.values(contadorObject);
    
    // Buscamos la frecuencia máxima
    const numberMaxFrequency = Math.max(...maxFrequency);

    if (numberMaxFrequency === 1) {
        return [];
    }

    // Iteramos sobre las claves (los números) del objeto de conteo
    for (const clave in contadorObject) {
        if (contadorObject[clave] === numberMaxFrequency) {
            // Convertimos la clave (que es un string) de vuelta a número antes de agregarlo
            arrFrequency.push(Number(clave));
        }
    }
    
    return arrFrequency.sort((a, b) => a - b);
}


/**
 * Calcula el rango de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Rango (max - min) o null si es inválido
 *
 * Ejemplos:
 * calculateRange([1, 2, 3, 4, 5]) → 4
 * calculateRange([10, 20, 30]) → 20
 * calculateRange([5, 5, 5]) → 0
 */
function calculateRange(numbers) {
  // TODO: Implementar cálculo de rango
  // Pista 1: Validar que numbers sea un array válido
  // Pista 2: Verificar que el array no esté vacío
  // Pista 3: Encontrar el valor mínimo del array
  // Pista 4: Encontrar el valor máximo del array
  // Pista 5: Retornar max - min
  // Pista 6: Retornar null si hay error

    if (!validateArrayNumbers(numbers)) {
        return null;
    }

    const numbersSorted = numbers.sort((a, b) => a - b);

    const minValue = numbersSorted[0];
    const maxValue = numbersSorted[numbersSorted.length - 1];

    const range = maxValue - minValue;

    return range;
}

/**
 * Calcula la desviación estándar de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Desviación estándar o null si es inválido
 *
 * Ejemplos:
 * calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]) ≈ 2
 * calculateStandardDeviation([1, 1, 1, 1]) → 0
 */
function calculateStandardDeviation(numbers) {
  // TODO: Implementar cálculo de desviación estándar
  // Pista 1: Validar que numbers sea un array válido
  // Pista 2: Calcular la media usando calculateMean()
  // Pista 3: Calcular la varianza: suma de (valor - media)² / cantidad
  // Pista 4: Raíz cuadrada de la varianza
  // Pista 5: Retornar null si hay error
  // Nota: Para números decimales, redondear es opcional

    const meanValue = calculateMean(numbers);
    return meanValue;
}
// console.log(calculateStandardDeviation([1, 1, 1, 1]));

module.exports = {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
  calculateStandardDeviation,
};
