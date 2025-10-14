/**
 * Fizz Buzz
 * 
 * Descripción: Implementa el juego clásico de Fizz Buzz para números del 1 al n.
 * Dificultad: BEGINNER
 * 
 * @param {number} n - Número hasta el cual generar la secuencia
 * @returns {string[]} Array de strings con las reglas de Fizz Buzz
 * 
 * Ejemplo:
 * fizzBuzz(3) // ["1", "2", "Fizz"]
 */

function fizzBuzz(n) {
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }

    return result;
    // throw new Error('Función no implementada');
}

console.log(fizzBuzz(15));

module.exports = fizzBuzz;
