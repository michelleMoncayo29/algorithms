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
    // TODO: Implementar cálculo de factorial
    // Pista 1: Validar que n sea un número entero no negativo
    // Pista 2: 0! = 1 y 1! = 1 (casos base)
    // Pista 3: n! = n × (n-1)! (fórmula recursiva)
    // Pista 4: Puedes usar recursión o un bucle
    // Pista 5: Retornar null si n es negativo o no es entero
    
    throw new Error('Función calculateFactorial no implementada');
}

/**
 * Verifica si un número dado es el factorial de otro número
 * @param {number} n - Número a verificar
 * @param {number} factorial - Posible factorial de n
 * @returns {boolean} true si n! == factorial, false en caso contrario
 */
function isFactorialOf(n, factorial) {
    // TODO: Implementar verificación de factorial
    // Pista 1: Validar que ambos parámetros sean números
    // Pista 2: Calcular el factorial de n usando calculateFactorial
    // Pista 3: Comparar el resultado con el factorial dado
    // Pista 4: Retornar true si coinciden, false en caso contrario
    // Pista 5: Considerar casos edge (números negativos, números grandes)
    
    throw new Error('Función isFactorialOf no implementada');
}

/**
 * Calcula el número de dígitos del factorial de n
 * @param {number} n - Número cuyo factorial se analiza
 * @returns {number|null} Número de dígitos de n! o null si n es inválido
 */
function findFactorialDigits(n) {
    // TODO: Implementar conteo de dígitos del factorial
    // Pista 1: Validar que n sea un número válido
    // Pista 2: Calcular el factorial usando calculateFactorial
    // Pista 3: Convertir a string para contar dígitos
    // Pista 4: Retornar null si n es inválido
    // Pista 5: Considerar usar logaritmos para números muy grandes
    
    throw new Error('Función findFactorialDigits no implementada');
}

/**
 * Calcula los factoriales de todos los números en un rango
 * @param {number} start - Número inicial del rango (incluido)
 * @param {number} end - Número final del rango (incluido)
 * @returns {Array|null} Array de objetos {number, factorial} o null si el rango es inválido
 */
function factorialRange(start, end) {
    // TODO: Implementar cálculo de factoriales en rango
    // Pista 1: Validar que start y end sean números válidos
    // Pista 2: Validar que start <= end
    // Pista 3: Iterar desde start hasta end (incluyendo ambos)
    // Pista 4: Para cada número, calcular su factorial
    // Pista 5: Retornar array de objetos {number, factorial}
    // Pista 6: Retornar null si el rango es inválido
    
    throw new Error('Función factorialRange no implementada');
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
    countTrailingZeros
};

