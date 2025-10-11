/**
 * SOLUCIÓN: Fizz Buzz
 * 
 * ⚠️ ADVERTENCIA: Esta es una solución. No la mires hasta haber intentado resolver el problema.
 * 
 * Este archivo contiene la solución completa para el problema Fizz Buzz.
 * Incluye múltiples enfoques y optimizaciones.
 */

/**
 * SOLUCIÓN 1: Enfoque Clásico (Recomendado para principiantes)
 * 
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por cada número
 * - Espacio: O(n) - Array de resultado
 * 
 * Este es el enfoque más directo y fácil de entender.
 */
function fizzBuzzClassic(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            // Múltiplo de 3 y 5 (15 es el mínimo común múltiplo)
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            // Múltiplo de 3
            result.push("Fizz");
        } else if (i % 5 === 0) {
            // Múltiplo de 5
            result.push("Buzz");
        } else {
            // No es múltiplo de 3 ni 5
            result.push(i.toString());
        }
    }
    
    return result;
}

/**
 * SOLUCIÓN 2: Enfoque con String Concatenación
 * 
 * Complejidad:
 * - Tiempo: O(n)
 * - Espacio: O(n)
 * 
 * Este enfoque construye la respuesta concatenando strings.
 */
function fizzBuzzConcatenation(n) {
    const result = [];
    
    for (let i = 1; i <= n; i++) {
        let answer = "";
        
        if (i % 3 === 0) {
            answer += "Fizz";
        }
        if (i % 5 === 0) {
            answer += "Buzz";
        }
        if (answer === "") {
            answer = i.toString();
        }
        
        result.push(answer);
    }
    
    return result;
}

/**
 * SOLUCIÓN 3: Enfoque con Map (Más Escalable)
 * 
 * Complejidad:
 * - Tiempo: O(n)
 * - Espacio: O(n)
 * 
 * Este enfoque es más escalable si necesitas agregar más reglas.
 */
function fizzBuzzMap(n) {
    const result = [];
    const fizzBuzzMap = new Map([
        [3, "Fizz"],
        [5, "Buzz"]
    ]);
    
    for (let i = 1; i <= n; i++) {
        let answer = "";
        
        for (const [divisor, word] of fizzBuzzMap) {
            if (i % divisor === 0) {
                answer += word;
            }
        }
        
        if (answer === "") {
            answer = i.toString();
        }
        
        result.push(answer);
    }
    
    return result;
}

/**
 * SOLUCIÓN 4: Enfoque Funcional (Con Array Methods)
 * 
 * Complejidad:
 * - Tiempo: O(n)
 * - Espacio: O(n)
 * 
 * Este enfoque usa métodos funcionales de JavaScript.
 */
function fizzBuzzFunctional(n) {
    return Array.from({ length: n }, (_, i) => {
        const num = i + 1;
        
        if (num % 15 === 0) return "FizzBuzz";
        if (num % 3 === 0) return "Fizz";
        if (num % 5 === 0) return "Buzz";
        
        return num.toString();
    });
}

// Exportar la solución principal (clásica)
module.exports = fizzBuzzClassic;

/**
 * ANÁLISIS DETALLADO:
 * 
 * 1. ¿Por qué verificar FizzBuzz primero?
 *    - Los múltiplos de 15 también son múltiplos de 3 y 5
 *    - Si verificáramos solo Fizz o Buzz, perderíamos FizzBuzz
 *    - El orden de las condiciones es crucial
 * 
 * 2. ¿Por qué usar 15 en lugar de verificar ambos?
 *    - 15 = 3 × 5 (mínimo común múltiplo)
 *    - Es más eficiente hacer una sola verificación
 *    - Evita lógica redundante
 * 
 * 3. Ventajas de cada enfoque:
 *    - Clásico: Más fácil de entender, directo
 *    - Concatenación: Más flexible, fácil de extender
 *    - Map: Escalable para múltiples reglas
 *    - Funcional: Más "JavaScript moderno"
 * 
 * 4. Consideraciones de rendimiento:
 *    - Para n pequeño (< 1000), cualquier enfoque es aceptable
 *    - Para n grande, el enfoque clásico es ligeramente más rápido
 *    - El enfoque funcional puede ser más lento por overhead de métodos
 * 
 * 5. Casos edge importantes:
 *    - n = 0: Debe devolver array vacío
 *    - n = 1: Debe devolver ["1"]
 *    - n = 15: Debe incluir "FizzBuzz" en la posición 15
 */
