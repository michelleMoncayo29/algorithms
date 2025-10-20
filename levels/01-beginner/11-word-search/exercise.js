/**
 * Ejercicio: Búsqueda de Palabras en Texto
 * 
 * Implementa un sistema de búsqueda de palabras en texto que cuenta
 * ocurrencias, maneja diferentes casos y proporciona estadísticas
 * de búsqueda.
 * 
 * Complejidad temporal: O(n*m) donde n es la longitud del texto y m la longitud de la palabra
 * Complejidad espacial: O(1) para la búsqueda básica
 */

/**
 * Busca una palabra en un texto y cuenta cuántas veces aparece
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} word - Palabra a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {number} - Número de veces que aparece la palabra
 */
function searchWord(text, word, caseSensitive = false) {
    // TODO: Implementar búsqueda de palabra
    // 
    // Pasos:
    // 1. Normalizar texto y palabra según caseSensitive
    // 2. Dividir el texto en palabras
    // 3. Contar cuántas veces aparece la palabra exacta
    // 4. Retornar el conteo
    // 
    // Pista: Usa split() para dividir el texto y filter() para contar
    
    throw new Error('Función no implementada');
}

/**
 * Busca una palabra en un texto y retorna información detallada
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} word - Palabra a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con información detallada de la búsqueda
 */
function searchWordDetailed(text, word, caseSensitive = false) {
    // TODO: Implementar búsqueda detallada
    // 
    // Retornar objeto con:
    // - count: número de ocurrencias
    // - positions: array con las posiciones donde aparece
    // - firstPosition: posición de la primera ocurrencia (-1 si no se encuentra)
    // - lastPosition: posición de la última ocurrencia (-1 si no se encuentra)
    // - wordLength: longitud de la palabra buscada
    // 
    // Pista: Usa indexOf() en un bucle para encontrar todas las posiciones
    
    throw new Error('Función no implementada');
}

/**
 * Busca múltiples palabras en un texto
 * 
 * @param {string} text - Texto donde buscar
 * @param {Array} words - Array de palabras a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con el conteo de cada palabra
 */
function searchMultipleWords(text, words, caseSensitive = false) {
    // TODO: Implementar búsqueda de múltiples palabras
    // 
    // Pasos:
    // 1. Crear un objeto para almacenar resultados
    // 2. Para cada palabra, usar searchWord() para contar
    // 3. Almacenar el resultado en el objeto
    // 4. Retornar el objeto con todos los conteos
    // 
    // Pista: Usa reduce() o forEach() para iterar sobre las palabras
    
    throw new Error('Función no implementada');
}

/**
 * Busca palabras que contengan un patrón específico
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} pattern - Patrón a buscar (puede contener * como comodín)
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Array} - Array de palabras que coinciden con el patrón
 */
function searchPattern(text, pattern, caseSensitive = false) {
    // TODO: Implementar búsqueda por patrón
    // 
    // Pasos:
    // 1. Convertir el patrón a expresión regular
    // 2. Dividir el texto en palabras
    // 3. Filtrar palabras que coincidan con el patrón
    // 4. Retornar array de palabras encontradas
    // 
    // Pista: Usa new RegExp() para crear la expresión regular
    
    throw new Error('Función no implementada');
}

/**
 * Encuentra la palabra más frecuente en un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con la palabra más frecuente y su conteo
 */
function findMostFrequentWord(text, caseSensitive = false) {
    // TODO: Implementar búsqueda de palabra más frecuente
    // 
    // Pasos:
    // 1. Dividir el texto en palabras
    // 2. Contar la frecuencia de cada palabra
    // 3. Encontrar la palabra con mayor frecuencia
    // 4. Retornar objeto con la palabra y su conteo
    // 
    // Pista: Usa reduce() para contar frecuencias y Object.entries() para encontrar el máximo
    
    throw new Error('Función no implementada');
}

/**
 * Genera estadísticas completas de un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con estadísticas del texto
 */
function generateTextStats(text, caseSensitive = false) {
    // TODO: Implementar generación de estadísticas
    // 
    // Retornar objeto con:
    // - totalWords: número total de palabras
    // - uniqueWords: número de palabras únicas
    // - mostFrequentWord: palabra más frecuente
    // - averageWordLength: longitud promedio de las palabras
    // - longestWord: palabra más larga
    // - shortestWord: palabra más corta
    // 
    // Pista: Combina las funciones anteriores para generar las estadísticas
    
    throw new Error('Función no implementada');
}

/**
 * Limpia y normaliza un texto para búsqueda
 * 
 * @param {string} text - Texto a limpiar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {string} - Texto limpio y normalizado
 */
function cleanText(text, caseSensitive = false) {
    // TODO: Implementar limpieza de texto
    // 
    // Pasos:
    // 1. Remover caracteres especiales (excepto espacios)
    // 2. Normalizar espacios múltiples a uno solo
    // 3. Aplicar caseSensitive según corresponda
    // 4. Retornar texto limpio
    // 
    // Pista: Usa replace() con expresiones regulares
    
    throw new Error('Función no implementada');
}

module.exports = {
    searchWord,
    searchWordDetailed,
    searchMultipleWords,
    searchPattern,
    findMostFrequentWord,
    generateTextStats,
    cleanText
};
