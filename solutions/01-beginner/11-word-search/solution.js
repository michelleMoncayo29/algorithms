/**
 * Solución: Búsqueda de Palabras en Texto
 * 
 * Implementación completa de un sistema de búsqueda de palabras en texto
 * que incluye búsqueda básica, detallada, múltiple, por patrones, análisis
 * de frecuencia, generación de estadísticas y limpieza de texto.
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
    // Validar entrada
    if (!text || !word) {
        return 0;
    }
    
    // Limpiar y normalizar texto
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const cleanWord = cleanTextForSearch(word, caseSensitive);
    
    // Dividir texto en palabras
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    // Contar ocurrencias
    return words.filter(w => w === cleanWord).length;
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
    // Validar entrada
    if (!text || !word) {
        return {
            count: 0,
            positions: [],
            firstPosition: -1,
            lastPosition: -1,
            wordLength: word ? word.length : 0
        };
    }
    
    // Limpiar y normalizar texto
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const cleanWord = cleanTextForSearch(word, caseSensitive);
    
    // Dividir texto en palabras
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    // Encontrar posiciones
    const positions = [];
    words.forEach((w, index) => {
        if (w === cleanWord) {
            positions.push(index);
        }
    });
    
    return {
        count: positions.length,
        positions: positions,
        firstPosition: positions.length > 0 ? positions[0] : -1,
        lastPosition: positions.length > 0 ? positions[positions.length - 1] : -1,
        wordLength: cleanWord.length
    };
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
    // Validar entrada
    if (!text || !Array.isArray(words) || words.length === 0) {
        return {};
    }
    
    const results = {};
    
    // Buscar cada palabra
    words.forEach(word => {
        if (word && typeof word === 'string') {
            results[word] = searchWord(text, word, caseSensitive);
        }
    });
    
    return results;
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
    // Validar entrada
    if (!text || !pattern) {
        return [];
    }
    
    // Limpiar texto
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    // Convertir patrón a expresión regular
    const regexPattern = pattern
        .replace(/\*/g, '.*') // * se convierte en .*
        .replace(/\./g, '\\.'); // Escapar puntos literales
    
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`^${regexPattern}$`, flags);
    
    // Filtrar palabras que coincidan
    return words.filter(word => regex.test(word));
}

/**
 * Encuentra la palabra más frecuente en un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con la palabra más frecuente y su conteo
 */
function findMostFrequentWord(text, caseSensitive = false) {
    // Validar entrada
    if (!text) {
        return { word: '', count: 0 };
    }
    
    // Limpiar texto
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    if (words.length === 0) {
        return { word: '', count: 0 };
    }
    
    // Contar frecuencia de cada palabra
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Encontrar palabra más frecuente
    let mostFrequent = { word: '', count: 0 };
    Object.entries(wordCount).forEach(([word, count]) => {
        if (count > mostFrequent.count) {
            mostFrequent = { word, count };
        }
    });
    
    return mostFrequent;
}

/**
 * Genera estadísticas completas de un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con estadísticas del texto
 */
function generateTextStats(text, caseSensitive = false) {
    // Validar entrada
    if (!text) {
        return {
            totalWords: 0,
            uniqueWords: 0,
            mostFrequentWord: { word: '', count: 0 },
            averageWordLength: 0,
            longestWord: '',
            shortestWord: ''
        };
    }
    
    // Limpiar texto
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    if (words.length === 0) {
        return {
            totalWords: 0,
            uniqueWords: 0,
            mostFrequentWord: { word: '', count: 0 },
            averageWordLength: 0,
            longestWord: '',
            shortestWord: ''
        };
    }
    
    // Calcular estadísticas básicas
    const totalWords = words.length;
    const uniqueWords = new Set(words).size;
    
    // Encontrar palabra más frecuente
    const mostFrequentWord = findMostFrequentWord(text, caseSensitive);
    
    // Calcular longitud promedio
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = totalLength / totalWords;
    
    // Encontrar palabras más larga y más corta
    const longestWord = words.reduce((longest, word) => 
        word.length > longest.length ? word : longest, '');
    const shortestWord = words.reduce((shortest, word) => 
        word.length < shortest.length ? word : shortest, words[0]);
    
    return {
        totalWords,
        uniqueWords,
        mostFrequentWord,
        averageWordLength: Math.round(averageWordLength * 100) / 100,
        longestWord,
        shortestWord
    };
}

/**
 * Limpia y normaliza un texto para búsqueda
 * 
 * @param {string} text - Texto a limpiar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {string} - Texto limpio y normalizado
 */
function cleanText(text, caseSensitive = false) {
    if (!text) {
        return '';
    }
    
    let cleaned = text;
    
    // Remover caracteres especiales excepto espacios, letras, números y acentos
    cleaned = cleaned.replace(/[^\w\sáéíóúüñÁÉÍÓÚÜÑ]/g, ' ');
    
    // Normalizar espacios múltiples a uno solo
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // Trim espacios al inicio y final
    cleaned = cleaned.trim();
    
    // Aplicar caseSensitive
    if (!caseSensitive) {
        cleaned = cleaned.toLowerCase();
    }
    
    return cleaned;
}

/**
 * Función auxiliar para limpiar texto específicamente para búsqueda
 * 
 * @param {string} text - Texto a limpiar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {string} - Texto limpio para búsqueda
 */
function cleanTextForSearch(text, caseSensitive = false) {
    if (!text) {
        return '';
    }
    
    let cleaned = text;
    
    // Remover caracteres especiales excepto espacios, letras, números y acentos
    cleaned = cleaned.replace(/[^\w\sáéíóúüñÁÉÍÓÚÜÑ]/g, ' ');
    
    // Normalizar espacios múltiples a uno solo
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // Trim espacios al inicio y final
    cleaned = cleaned.trim();
    
    // Aplicar caseSensitive
    if (!caseSensitive) {
        cleaned = cleaned.toLowerCase();
    }
    
    return cleaned;
}

/**
 * Función auxiliar para validar entrada de texto
 * 
 * @param {string} text - Texto a validar
 * @returns {boolean} - Si el texto es válido
 */
function isValidText(text) {
    return typeof text === 'string' && text.trim().length > 0;
}

/**
 * Función auxiliar para validar entrada de palabra
 * 
 * @param {string} word - Palabra a validar
 * @returns {boolean} - Si la palabra es válida
 */
function isValidWord(word) {
    return typeof word === 'string' && word.trim().length > 0;
}

/**
 * Función auxiliar para obtener palabras únicas de un texto
 * 
 * @param {string} text - Texto a procesar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {Array} - Array de palabras únicas
 */
function getUniqueWords(text, caseSensitive = false) {
    if (!text) {
        return [];
    }
    
    const cleanText = cleanTextForSearch(text, caseSensitive);
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    
    return [...new Set(words)];
}

/**
 * Función auxiliar para obtener todas las palabras de un texto
 * 
 * @param {string} text - Texto a procesar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {Array} - Array de todas las palabras
 */
function getAllWords(text, caseSensitive = false) {
    if (!text) {
        return [];
    }
    
    const cleanText = cleanTextForSearch(text, caseSensitive);
    return cleanText.split(/\s+/).filter(w => w.length > 0);
}

/**
 * Función auxiliar para contar frecuencia de palabras
 * 
 * @param {string} text - Texto a procesar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {Object} - Objeto con frecuencia de cada palabra
 */
function getWordFrequency(text, caseSensitive = false) {
    if (!text) {
        return {};
    }
    
    const words = getAllWords(text, caseSensitive);
    const frequency = {};
    
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return frequency;
}

/**
 * Función auxiliar para obtener las N palabras más frecuentes
 * 
 * @param {string} text - Texto a procesar
 * @param {number} n - Número de palabras a retornar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {Array} - Array de objetos con palabra y frecuencia
 */
function getTopWords(text, n = 10, caseSensitive = false) {
    const frequency = getWordFrequency(text, caseSensitive);
    
    return Object.entries(frequency)
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, n);
}

module.exports = {
    searchWord,
    searchWordDetailed,
    searchMultipleWords,
    searchPattern,
    findMostFrequentWord,
    generateTextStats,
    cleanText,
    // Funciones auxiliares
    isValidText,
    isValidWord,
    getUniqueWords,
    getAllWords,
    getWordFrequency,
    getTopWords
};
