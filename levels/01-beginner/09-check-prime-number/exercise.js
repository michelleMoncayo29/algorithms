/**
 * Verifica si un número es primo
 * 
 * @param {number} num - Número a verificar
 * @returns {boolean} - true si es primo, false en caso contrario
 * 
 * Ejemplos:
 * isPrime(17) => true
 * isPrime(15) => false
 * isPrime(2) => true
 * isPrime(1) => false
 */
function isPrime(num) {
    // TODO: Implementa la función aquí
    
    // Pista 1: Los números menores o iguales a 1 no son primos
    // Pista 2: El 2 es el único número primo par
    // Pista 3: Para números mayores que 2, si son pares no son primos
    // Pista 4: Para números impares, verifica divisores hasta √num
    // Pista 5: Usa el operador módulo (%) para verificar divisibilidad
    
    return false;
}

module.exports = isPrime;
