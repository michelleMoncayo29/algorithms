/**
 * SOLUCIÓN: Calculadora de Fibonacci
 * 
 * ANÁLISIS DE COMPLEJIDAD:
 * - fibonacci: O(n) tiempo, O(1) espacio (iterativo)
 * - fibonacciSequence: O(n) tiempo, O(n) espacio
 * - isFibonacci: O(n) tiempo, O(1) espacio
 * - fibonacciSum: O(n) tiempo, O(1) espacio
 * - getFibonacciIndex: O(n) tiempo, O(1) espacio
 */

/**
 * Calcula el n-ésimo número de Fibonacci
 */
function fibonacci(n) {
    // Validar que n sea un entero no negativo
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Casos base
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Usar enfoque iterativo para evitar stack overflow
    let prev = 0;  // F(0)
    let curr = 1;  // F(1)
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

/**
 * Genera los primeros n números de la secuencia de Fibonacci
 */
function fibonacciSequence(n) {
    // Validar que n sea un número positivo
    if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Generar secuencia
    const sequence = [];
    
    if (n >= 1) sequence.push(0);
    if (n >= 2) sequence.push(1);
    
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    
    return sequence;
}

/**
 * Verifica si un número pertenece a la secuencia de Fibonacci
 */
function isFibonacci(num) {
    // Validar que num sea un número entero no negativo
    if (typeof num !== 'number' || num < 0 || !Number.isInteger(num)) {
        return false;
    }
    
    // Casos base
    if (num === 0 || num === 1) return true;
    
    // Generar secuencia hasta encontrar el número o superarlo
    let prev = 0;
    let curr = 1;
    
    while (curr < num) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr === num;
}

/**
 * Calcula la suma de los primeros n números de Fibonacci
 */
function fibonacciSum(n) {
    // Validar que n sea un número positivo
    if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
        return null;
    }
    
    // Calcular suma generando la secuencia
    let sum = 0;
    
    if (n >= 1) sum += 0;
    if (n >= 2) sum += 1;
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i < n; i++) {
        const next = prev + curr;
        sum += next;
        prev = curr;
        curr = next;
    }
    
    return sum;
}

/**
 * Encuentra el índice de un número en la secuencia de Fibonacci
 */
function getFibonacciIndex(num) {
    // Validar que num sea un número entero no negativo
    if (typeof num !== 'number' || num < 0 || !Number.isInteger(num)) {
        return null;
    }
    
    // Usar la función fibonacci para encontrar el índice por fuerza bruta
    // (alternativa más simple para BEGINNER)
    for (let i = 0; ; i++) {
        const fibValue = fibonacci(i);
        
        if (fibValue === num) {
            return i;
        }
        
        // Si ya pasamos el número, no es Fibonacci
        if (fibValue > num) {
            break;
        }
    }
    
    return null;
}

module.exports = {
    fibonacci,
    fibonacciSequence,
    isFibonacci,
    fibonacciSum,
    getFibonacciIndex
};

