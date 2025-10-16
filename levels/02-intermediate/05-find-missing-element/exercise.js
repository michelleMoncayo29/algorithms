/**
 * Ejercicio: Encontrar el Elemento Faltante
 * 
 * Dado un array de números enteros del 1 al n (donde n es la longitud del array + 1)
 * con exactamente un número faltante, encuentra cuál número falta.
 * 
 * @param {number[]} numbers - Array de números con un elemento faltante
 * @returns {number} - El número que falta en la secuencia
 * 
 * Ejemplos:
 * findMissingElement([1, 2, 4, 5]) => 3
 * findMissingElement([1, 3, 4, 5, 6]) => 2
 * findMissingElement([2, 3, 4, 5, 6]) => 1
 * findMissingElement([1, 2, 3, 4, 6]) => 5
 * 
 * Pista: Usa la fórmula de suma de progresión aritmética:
 * Suma esperada = n * (n + 1) / 2
 * donde n es el número más grande que debería estar presente
 */

function findMissingElement(numbers) {
    // TODO: Implementa la función aquí
    // Pista 1: Calcula la suma esperada de 1 a n
    // Pista 2: Calcula la suma real del array
    // Pista 3: La diferencia es el número faltante
}

module.exports = findMissingElement;
