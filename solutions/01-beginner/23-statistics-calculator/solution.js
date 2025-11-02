/**
 * SOLUCIÓN: Calculadora de Estadísticas
 * 
 * ANÁLISIS DE COMPLEJIDAD:
 * - calculateMean: O(n) tiempo, O(1) espacio
 * - calculateMedian: O(n log n) tiempo, O(n) espacio (por ordenamiento)
 * - calculateMode: O(n) tiempo, O(n) espacio
 * - calculateRange: O(n) tiempo, O(1) espacio
 * - calculateStandardDeviation: O(n) tiempo, O(1) espacio
 */

/**
 * Calcula la media aritmética de un array de números
 */
function calculateMean(numbers) {
    // Validar que numbers sea un array válido
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    // Verificar que todos los elementos sean números
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    }
    
    // Sumar todos los números
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    
    // Dividir por la cantidad de elementos
    return sum / numbers.length;
}

/**
 * Calcula la mediana de un array de números
 */
function calculateMedian(numbers) {
    // Validar que numbers sea un array válido
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    // Verificar que todos los elementos sean números
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    }
    
    // Crear copia y ordenar
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    // Si la cantidad es impar, retornar el elemento del medio
    if (sorted.length % 2 === 1) {
        return sorted[middle];
    }
    
    // Si es par, promediar los dos elementos centrales
    return (sorted[middle - 1] + sorted[middle]) / 2;
}

/**
 * Calcula la moda de un array de números
 */
function calculateMode(numbers) {
    // Validar que numbers sea un array válido
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    // Verificar que todos los elementos sean números
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    }
    
    // Contar frecuencia de cada número
    const frequency = {};
    
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    
    // Encontrar la frecuencia máxima
    const maxFrequency = Math.max(...Object.values(frequency));
    
    // Si todos tienen frecuencia 1, retornar array vacío
    if (maxFrequency === 1) {
        return [];
    }
    
    // Retornar todos los números con frecuencia máxima (ordenados)
    return Object.keys(frequency)
        .filter(num => frequency[num] === maxFrequency)
        .map(num => parseFloat(num))
        .sort((a, b) => a - b);
}

/**
 * Calcula el rango de un array de números
 */
function calculateRange(numbers) {
    // Validar que numbers sea un array válido
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    // Verificar que todos los elementos sean números
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    }
    
    // Encontrar mínimo y máximo
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    
    // Retornar diferencia
    return max - min;
}

/**
 * Calcula la desviación estándar de un array de números
 */
function calculateStandardDeviation(numbers) {
    // Validar que numbers sea un array válido
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    // Verificar que todos los elementos sean números
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        return null;
    }
    
    // Calcular la media
    const mean = calculateMean(numbers);
    
    // Calcular la varianza
    const variance = numbers.reduce((acc, num) => {
        return acc + Math.pow(num - mean, 2);
    }, 0) / numbers.length;
    
    // Retornar raíz cuadrada de la varianza
    return Math.sqrt(variance);
}

module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode,
    calculateRange,
    calculateStandardDeviation
};

