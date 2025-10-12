/**
 * SOLUCIÓN: Two Sum
 * 
 * ⚠️ ADVERTENCIA: Esta es una solución. No la mires hasta haber intentado resolver el problema.
 * 
 * Este archivo contiene la solución completa para el problema Two Sum.
 * Incluye múltiples enfoques con análisis de complejidad.
 */

/**
 * SOLUCIÓN 1: Hash Map (Recomendada)
 * 
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por el array
 * - Espacio: O(n) - Hash map para almacenar elementos
 * 
 * Este es el enfoque más eficiente para este problema.
 */
function twoSumHashMap(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Si encontramos el complemento, devolvemos los índices
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        // Guardamos el número actual con su índice
        numMap.set(nums[i], i);
    }
    
    // No debería llegar aquí según las restricciones del problema
    return [];
}

/**
 * SOLUCIÓN 2: Fuerza Bruta (Para comparación)
 * 
 * Complejidad:
 * - Tiempo: O(n²) - Dos bucles anidados
 * - Espacio: O(1) - Solo variables temporales
 * 
 * Este enfoque es menos eficiente pero más fácil de entender.
 */
function twoSumBruteForce(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return [];
}

/**
 * SOLUCIÓN 3: Con Objeto JavaScript (Alternativa)
 * 
 * Complejidad:
 * - Tiempo: O(n)
 * - Espacio: O(n)
 * 
 * Similar al hash map pero usando un objeto JavaScript.
 */
function twoSumObject(nums, target) {
    const numObj = {};
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (complement in numObj) {
            return [numObj[complement], i];
        }
        
        numObj[nums[i]] = i;
    }
    
    return [];
}

// Exportar la solución principal (hash map)
module.exports = twoSumHashMap;

/**
 * ANÁLISIS DETALLADO:
 * 
 * 1. ¿Por qué el hash map es más eficiente?
 *    - La búsqueda en hash map es O(1) en promedio
 *    - Solo necesitamos una pasada por el array
 *    - El trade-off es usar espacio extra para ganar tiempo
 * 
 * 2. ¿Por qué no usar fuerza bruta?
 *    - Para arrays grandes, O(n²) se vuelve muy lento
 *    - Con 10,000 elementos, fuerza bruta haría ~50 millones de operaciones
 *    - Hash map solo haría ~10,000 operaciones
 * 
 * 3. Consideraciones importantes:
 *    - El hash map maneja automáticamente elementos duplicados
 *    - Solo guardamos la primera ocurrencia de cada número
 *    - Esto es correcto porque necesitamos índices diferentes
 * 
 * 4. Casos edge cubiertos:
 *    - Arrays con elementos duplicados
 *    - Arrays con números negativos
 *    - Arrays con un solo par de elementos
 */
