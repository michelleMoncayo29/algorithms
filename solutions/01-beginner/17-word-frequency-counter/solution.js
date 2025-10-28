/**
 * SOLUCIÓN: Contador de Frecuencia de Palabras
 * 
 * Esta es la solución completa para el ejercicio de contador de frecuencia de palabras.
 * Implementa todas las funciones requeridas con manejo robusto de casos edge y
 * algoritmos eficientes para procesamiento de texto.
 */

/**
 * Limpia el texto eliminando puntuación y normalizando espacios
 * @param {string} text - Texto a limpiar
 * @returns {string} Texto limpio
 */
function cleanText(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Eliminar puntuación y caracteres especiales
        .replace(/\s+/g, ' ')       // Normalizar espacios múltiples
        .trim();                   // Eliminar espacios al inicio y final
}

/**
 * Divide el texto en palabras válidas
 * @param {string} text - Texto a dividir
 * @returns {Array} Array de palabras válidas
 */
function splitIntoWords(text) {
    const cleanedText = cleanText(text);
    
    if (!cleanedText) {
        return [];
    }
    
    return cleanedText
        .split(' ')
        .filter(word => word.length >= 2)  // Mínimo 2 caracteres
        .filter(word => /^[a-z0-9]+$/i.test(word));  // Solo letras y números
}

/**
 * Cuenta la frecuencia de palabras en el texto
 * @param {string} text - Texto a analizar
 * @returns {Object} Objeto con palabras como claves y frecuencias como valores
 */
function countWordFrequency(text) {
    const words = splitIntoWords(text);
    const frequency = {};
    
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return frequency;
}

/**
 * Obtiene las palabras más frecuentes ordenadas por frecuencia
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {number} limit - Número máximo de palabras a retornar
 * @returns {Array} Array de objetos {word, frequency} ordenados por frecuencia
 */
function getTopWords(frequencyMap, limit = 10) {
    if (!frequencyMap || typeof frequencyMap !== 'object') {
        return [];
    }
    
    if (typeof limit !== 'number' || limit < 0) {
        limit = 10;
    }
    
    return Object.entries(frequencyMap)
        .map(([word, frequency]) => ({ word, frequency }))
        .sort((a, b) => {
            // Ordenar por frecuencia descendente
            if (b.frequency !== a.frequency) {
                return b.frequency - a.frequency;
            }
            // En caso de empate, ordenar alfabéticamente
            return a.word.localeCompare(b.word);
        })
        .slice(0, limit);
}

/**
 * Filtra palabras comunes del mapa de frecuencias
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {Array} commonWords - Array de palabras comunes a filtrar
 * @returns {Object} Nuevo mapa sin las palabras comunes
 */
function filterCommonWords(frequencyMap, commonWords = []) {
    if (!frequencyMap || typeof frequencyMap !== 'object') {
        return {};
    }
    
    if (!Array.isArray(commonWords)) {
        return frequencyMap;
    }
    
    const filtered = {};
    const commonWordsSet = new Set(commonWords.map(word => word.toLowerCase()));
    
    Object.entries(frequencyMap).forEach(([word, frequency]) => {
        if (!commonWordsSet.has(word.toLowerCase())) {
            filtered[word] = frequency;
        }
    });
    
    return filtered;
}

/**
 * Genera un reporte completo de análisis de palabras
 * @param {string} text - Texto a analizar
 * @param {Object} options - Opciones del reporte
 * @returns {Object} Reporte completo con estadísticas
 */
function generateWordReport(text, options = {}) {
    const {
        limit = 10,
        filterCommon = false,
        commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'a', 'an', 'this', 'that', 'these', 'those']
    } = options;
    
    // Contar frecuencia de todas las palabras
    const allWords = splitIntoWords(text);
    const frequencyMap = countWordFrequency(text);
    
    // Filtrar palabras comunes si se solicita
    let filteredMap = frequencyMap;
    let filteredWords = 0;
    
    if (filterCommon) {
        filteredMap = filterCommonWords(frequencyMap, commonWords);
        filteredWords = Object.keys(frequencyMap).length - Object.keys(filteredMap).length;
    }
    
    // Obtener palabras más frecuentes
    const topWords = getTopWords(filteredMap, limit);
    
    return {
        totalWords: allWords.length,
        uniqueWords: Object.keys(frequencyMap).length,
        topWords: topWords,
        filteredWords: filteredWords,
        averageFrequency: allWords.length > 0 ? (allWords.length / Object.keys(frequencyMap).length).toFixed(2) : 0
    };
}

// Versión extendida con funcionalidades adicionales
class WordFrequencyAnalyzer {
    constructor() {
        this.commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'a', 'an', 'this', 'that', 'these', 'those'];
        this.minWordLength = 2;
        this.maxWordLength = 50;
    }
    
    /**
     * Configura las palabras comunes personalizadas
     * @param {Array} words - Array de palabras comunes
     */
    setCommonWords(words) {
        if (Array.isArray(words)) {
            this.commonWords = words.map(word => word.toLowerCase());
        }
    }
    
    /**
     * Configura la longitud mínima de palabras
     * @param {number} length - Longitud mínima
     */
    setMinWordLength(length) {
        if (typeof length === 'number' && length > 0) {
            this.minWordLength = length;
        }
    }
    
    /**
     * Analiza texto con configuración personalizada
     * @param {string} text - Texto a analizar
     * @param {Object} options - Opciones de análisis
     * @returns {Object} Reporte detallado
     */
    analyze(text, options = {}) {
        const {
            includeNumbers = false,
            caseSensitive = false,
            customFilter = null
        } = options;
        
        let processedText = text;
        
        if (!caseSensitive) {
            processedText = processedText.toLowerCase();
        }
        
        // Limpiar texto
        processedText = processedText
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        // Dividir en palabras
        let words = processedText.split(' ');
        
        // Filtrar por longitud
        words = words.filter(word => 
            word.length >= this.minWordLength && 
            word.length <= this.maxWordLength
        );
        
        // Filtrar números si no se incluyen
        if (!includeNumbers) {
            words = words.filter(word => !/^\d+$/.test(word));
        }
        
        // Aplicar filtro personalizado
        if (typeof customFilter === 'function') {
            words = words.filter(customFilter);
        }
        
        // Contar frecuencias
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        return {
            words: words,
            frequency: frequency,
            totalWords: words.length,
            uniqueWords: Object.keys(frequency).length
        };
    }
    
    /**
     * Compara dos textos y encuentra diferencias
     * @param {string} text1 - Primer texto
     * @param {string} text2 - Segundo texto
     * @returns {Object} Comparación de textos
     */
    compareTexts(text1, text2) {
        const analysis1 = this.analyze(text1);
        const analysis2 = this.analyze(text2);
        
        const words1 = new Set(Object.keys(analysis1.frequency));
        const words2 = new Set(Object.keys(analysis2.frequency));
        
        const commonWords = [...words1].filter(word => words2.has(word));
        const uniqueToText1 = [...words1].filter(word => !words2.has(word));
        const uniqueToText2 = [...words2].filter(word => !words1.has(word));
        
        return {
            text1: analysis1,
            text2: analysis2,
            commonWords: commonWords,
            uniqueToText1: uniqueToText1,
            uniqueToText2: uniqueToText2,
            similarity: commonWords.length / Math.max(words1.size, words2.size)
        };
    }
}

// Versión optimizada para textos grandes
function countWordFrequencyOptimized(text) {
    if (!text || typeof text !== 'string') {
        return {};
    }
    
    // Usar Map para mejor rendimiento con textos grandes
    const frequencyMap = new Map();
    
    // Procesar texto en una sola pasada
    const words = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length >= 2 && /^[a-z0-9]+$/i.test(word));
    
    words.forEach(word => {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });
    
    // Convertir Map a Object para compatibilidad
    const result = {};
    frequencyMap.forEach((frequency, word) => {
        result[word] = frequency;
    });
    
    return result;
}

module.exports = {
    countWordFrequency,
    getTopWords,
    filterCommonWords,
    generateWordReport,
    cleanText,
    splitIntoWords,
    WordFrequencyAnalyzer,
    countWordFrequencyOptimized
};
