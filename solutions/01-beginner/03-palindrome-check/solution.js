/**
 * SOLUCIÓN: Palindrome Check
 * 
 * ⚠️ ADVERTENCIA: Esta es una solución. No la mires hasta haber intentado resolver el problema.
 * 
 * Este archivo contiene la solución completa para el problema Palindrome Check.
 * Incluye múltiples enfoques y optimizaciones.
 */

/**
 * SOLUCIÓN 1: Dos Punteros (Recomendada)
 * 
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por la string
 * - Espacio: O(1) - Solo variables temporales
 * 
 * Este es el enfoque más eficiente en espacio.
 */
function isPalindromeTwoPointers(s) {
    // Limpiar la string: solo caracteres alfanuméricos y convertir a minúsculas
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

/**
 * SOLUCIÓN 2: Comparación con String Reversa
 * 
 * Complejidad:
 * - Tiempo: O(n) - Limpiar + revertir + comparar
 * - Espacio: O(n) - String limpia + string reversa
 * 
 * Este enfoque es más fácil de entender pero usa más espacio.
 */
function isPalindromeReverse(s) {
    // Limpiar la string
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Crear la string reversa
    const reversed = cleaned.split('').reverse().join('');
    
    // Comparar
    return cleaned === reversed;
}

/**
 * SOLUCIÓN 3: Dos Punteros In-Place (Más Eficiente)
 * 
 * Complejidad:
 * - Tiempo: O(n) - Una pasada por la string
 * - Espacio: O(1) - Solo variables temporales
 * 
 * Este enfoque no crea una nueva string, es más eficiente.
 */
function isPalindromeInPlace(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Saltar caracteres no alfanuméricos desde la izquierda
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        
        // Saltar caracteres no alfanuméricos desde la derecha
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Comparar caracteres (convertir a minúsculas)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

/**
 * Función auxiliar para verificar si un carácter es alfanumérico
 */
function isAlphanumeric(char) {
    const code = char.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122)   // a-z
    );
}

/**
 * SOLUCIÓN 4: Recursiva (Para propósitos educativos)
 * 
 * Complejidad:
 * - Tiempo: O(n)
 * - Espacio: O(n) - Stack de recursión
 * 
 * Este enfoque es menos eficiente pero demuestra recursión.
 */
function isPalindromeRecursive(s) {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    function checkPalindrome(str, left, right) {
        if (left >= right) {
            return true;
        }
        
        if (str[left] !== str[right]) {
            return false;
        }
        
        return checkPalindrome(str, left + 1, right - 1);
    }
    
    return checkPalindrome(cleaned, 0, cleaned.length - 1);
}

// Exportar la solución principal (dos punteros)
module.exports = isPalindromeTwoPointers;

/**
 * ANÁLISIS DETALLADO:
 * 
 * 1. ¿Por qué limpiar la string?
 *    - Solo necesitamos caracteres alfanuméricos
 *    - Ignoramos espacios, puntuación y capitalización
 *    - Esto simplifica la comparación
 * 
 * 2. ¿Por qué dos punteros es más eficiente?
 *    - No necesitamos crear strings adicionales
 *    - Solo comparamos caracteres directamente
 *    - Terminamos tan pronto como encontramos una diferencia
 * 
 * 3. Ventajas de cada enfoque:
 *    - Dos punteros: Más eficiente en espacio, fácil de entender
 *    - String reversa: Más simple conceptualmente
 *    - In-place: Más eficiente, no crea strings adicionales
 *    - Recursiva: Demuestra conceptos de recursión
 * 
 * 4. Consideraciones importantes:
 *    - Casos edge: strings vacías, un solo carácter
 *    - Caracteres especiales: deben ser ignorados
 *    - Capitalización: "A" y "a" son equivalentes
 * 
 * 5. Optimizaciones adicionales:
 *    - Usar charCodeAt() para verificación alfanumérica
 *    - Terminar temprano si encontramos diferencia
 *    - Evitar crear strings innecesarias
 * 
 * 6. Casos de prueba importantes:
 *    - "A man a plan a canal Panama" → true
 *    - "race a car" → false
 *    - "racecar" → true
 *    - "" → true
 *    - ".," → true (solo caracteres especiales)
 */
