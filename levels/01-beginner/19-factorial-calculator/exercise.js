/**
 * Calculadora de Factoriales
 *
 * Descripción: Implementa funciones para calcular, validar y analizar factoriales.
 * El factorial de un número n (escrito como n!) es el producto de todos los números positivos
 * menores o iguales a n. Por ejemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120
 * Dificultad: BEGINNER
 *
 * Funciones requeridas:
 * - calculateFactorial(n): Calcula el factorial de un número
 * - isFactorialOf(n, factorial): Verifica si un número es factorial de otro
 * - findFactorialDigits(n): Calcula el número de dígitos de n!
 * - factorialRange(start, end): Calcula factoriales en un rango
 * - countTrailingZeros(n): Cuenta ceros finales en n!
 */

/**
 * Calcula el factorial de un número n
 * @param {number} n - Número cuyo factorial se desea calcular
 * @returns {number|null} Factorial de n o null si n es inválido
 */
function calculateFactorial(n) {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    return null;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}
/**
 * Verifica si un número dado es el factorial de otro número
 * @param {number} n - Número a verificar
 * @param {number} factorial - Posible factorial de n
 * @returns {boolean} true si n! == factorial, false en caso contrario
 */
function isFactorialOf(n, factorial) {
  // Validar que ambos parámetros sean números
  if (typeof n !== 'number' || typeof factorial !== 'number' || n < 0) {
    return false;
  }
  
    const calculatedFactorial = calculateFactorial(n);
    // me da el numero factorial

  return calculatedFactorial === factorial;
}

/**
 * Calcula el número de dígitos del factorial de n
 * @param {number} n - Número cuyo factorial se analiza
 * @returns {number|null} Número de dígitos de n! o null si n es inválido
 */
function findFactorialDigits(n) {
  // TODO: Implementar conteo de dígitos del factorial
  if (typeof n !== 'number' || n < 0 ) {
    return null;
  }
 
  const calculatedFactorial = calculateFactorial(n);

  const digits = calculatedFactorial.toString().length;

  return digits;
}

/**
 * Calcula los factoriales de todos los números en un rango
 * @param {number} start - Número inicial del rango (incluido)
 * @param {number} end - Número final del rango (incluido)
 * @returns {Array|null} Array de objetos {number, factorial} o null si el rango es inválido
 */
function factorialRange(start, end) {
  // TODO: Implementar cálculo de factoriales en rango
  if (typeof start !== 'number' || typeof end !== 'number' || start < 0 || end < 0) {
    return null;
  }

  if (start > end) {
    return null;
  }

  const result = [];


  for (let i = start; i <= end; i++) {
    result.push({ number: i, factorial: calculateFactorial(i) });
  }

  return result;
}


/**
 * Cuenta los ceros finales en el factorial de n
 * @param {number} n - Número cuyo factorial se analiza
 * @returns {number|null} Número de ceros finales en n! o null si n es inválido
 */
function countTrailingZeros(n) {
  // TODO: Implementar conteo de ceros finales
  // Pista 1: Validar que n sea un número válido
  // Pista 2: Los ceros finales dependen del número de factores 5 y 2
  // Pista 3: Contar cuántas veces 5 divide n
  // Pista 4: Retornar null si n es inválido
  // Pista 5: Para números grandes, contar potencias de 5

  throw new Error('Función countTrailingZeros no implementada');
}

module.exports = {
  calculateFactorial,
  isFactorialOf,
  findFactorialDigits,
  factorialRange,
  countTrailingZeros,
};
