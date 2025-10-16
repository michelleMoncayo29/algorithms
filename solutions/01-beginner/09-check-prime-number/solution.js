/**
 * Solución para verificar si un número es primo
 * 
 * @param {number} num - Número a verificar
 * @returns {boolean} - true si es primo, false en caso contrario
 * 
 * Complejidad de tiempo: O(√n)
 * Complejidad de espacio: O(1)
 */
function isPrime(num) {
    // Casos edge: números menores o iguales a 1 no son primos
    if (num <= 1) {
        return false;
    }
    
    // El 2 es el único número primo par
    if (num === 2) {
        return true;
    }
    
    // Todos los demás números pares no son primos
    if (num % 2 === 0) {
        return false;
    }
    
    // Para números impares, verificar divisores hasta √num
    // Solo necesitamos verificar números impares como divisores
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) {
            return false; // Encontramos un divisor, no es primo
        }
    }
    
    // Si llegamos aquí, no encontramos divisores, es primo
    return true;
}

module.exports = isPrime;

/* 
Explicación del algoritmo:

1. **Casos edge**: Números ≤ 1 no son primos por definición
2. **Caso especial**: El 2 es el único número primo par
3. **Optimización para pares**: Todos los demás números pares son compuestos
4. **Verificación optimizada**: Para números impares, solo verificamos divisores impares hasta √n
5. **Por qué hasta √n**: Si n tiene un divisor mayor que √n, entonces debe tener otro menor que √n

Optimizaciones implementadas:
- Verificación temprana de casos edge
- Salida temprana para números pares
- Iteración solo con números impares (i += 2)
- Límite superior de √n en lugar de n/2

Casos de prueba cubiertos:
- Números primos: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 97
- Números compuestos: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 25, 100
- Casos edge: 1, 0, números negativos
- Cuadrados perfectos: 4, 9, 16, 25, 36, 49, 64, 81, 100
- Números grandes: primos y compuestos
*/
