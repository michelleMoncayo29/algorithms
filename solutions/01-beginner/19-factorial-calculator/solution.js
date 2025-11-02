/**
 * SOLUCIÓN: Calculadora de Factoriales
 * 
 * ANÁLISIS DE COMPLEJIDAD:
 * - calculateFactorial: O(n) tiempo, O(1) espacio
 * - isFactorialOf: O(n) tiempo, O(1) espacio
 * - findFactorialDigits: O(n) tiempo, O(1) espacio
 * - factorialRange: O(n * (end - start)) tiempo, O(end - start) espacio
 * - countTrailingZeros: O(log(n)) tiempo, O(1) espacio
 */

/**
 * Calcula el factorial de un número n
 */
function calculateFactorial(n) {
    // Validar que n sea un número entero no negativo
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Casos base
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Calcular factorial usando bucle
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

/**
 * Verifica si un número dado es el factorial de otro número
 */
function isFactorialOf(n, factorial) {
    // Validar que ambos parámetros sean números
    if (typeof n !== 'number' || typeof factorial !== 'number') {
        return false;
    }
    
    // Si n es negativo o no es entero, retornar false
    if (n < 0 || !Number.isInteger(n)) {
        return false;
    }
    
    // Calcular el factorial de n y comparar
    const calculatedFactorial = calculateFactorial(n);
    
    // Si calculateFactorial retorna null, retornar false
    if (calculatedFactorial === null) {
        return false;
    }
    
    return calculatedFactorial === factorial;
}

/**
 * Calcula el número de dígitos del factorial de n
 */
function findFactorialDigits(n) {
    // Validar que n sea un número válido
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Calcular el factorial
    const factorial = calculateFactorial(n);
    
    // Si calculateFactorial retorna null, retornar null
    if (factorial === null) {
        return null;
    }
    
    // Convertir a string y contar dígitos
    return String(factorial).length;
}

/**
 * Calcula los factoriales de todos los números en un rango
 */
function factorialRange(start, end) {
    // Validar que start y end sean números válidos
    if (typeof start !== 'number' || typeof end !== 'number' || 
        !Number.isInteger(start) || !Number.isInteger(end)) {
        return null;
    }
    
    // Validar que start <= end
    if (start > end) {
        return null;
    }
    
    // Validar que ambos sean no negativos
    if (start < 0 || end < 0) {
        return null;
    }
    
    const result = [];
    
    // Iterar desde start hasta end (incluyendo ambos)
    for (let i = start; i <= end; i++) {
        const factorial = calculateFactorial(i);
        
        // Si calculateFactorial retorna null, retornar null
        if (factorial === null) {
            return null;
        }
        
        result.push({ number: i, factorial });
    }
    
    return result;
}

/**
 * Cuenta los ceros finales en el factorial de n
 */
function countTrailingZeros(n) {
    // Validar que n sea un número válido
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Los ceros finales en n! dependen del número de factores 5 y 2
    // Como siempre hay más 2s que 5s, solo necesitamos contar los 5s
    let count = 0;
    
    // Contar cuántas veces 5 divide n
    for (let i = 5; i <= n; i *= 5) {
        count += Math.floor(n / i);
    }
    
    return count;
}

module.exports = {
    calculateFactorial,
    isFactorialOf,
    findFactorialDigits,
    factorialRange,
    countTrailingZeros
};

