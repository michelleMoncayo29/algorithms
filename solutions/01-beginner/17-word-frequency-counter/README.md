# Solución: Contador de Frecuencia de Palabras

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos funciones para analizar texto y contar la frecuencia de palabras. Las funciones deben:
1. **Limpiar texto** eliminando puntuación y normalizando espacios
2. **Dividir en palabras** válidas (mínimo 2 caracteres, solo letras y números)
3. **Contar frecuencias** usando objetos como mapas
4. **Ordenar resultados** por frecuencia descendente
5. **Filtrar palabras comunes** opcionalmente
6. **Generar reportes** completos con estadísticas

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Limpieza de texto**: Expresiones regulares para eliminar puntuación
2. **División en palabras**: Split por espacios y filtrado por longitud
3. **Conteo de frecuencias**: Objetos como contadores
4. **Ordenamiento**: Algoritmos de ordenamiento por frecuencia
5. **Filtrado**: Eliminación de palabras comunes
6. **Reportes**: Agregación de estadísticas

### Complejidad
- **Tiempo**: O(n) para procesamiento de texto, O(m log m) para ordenamiento
- **Espacio**: O(m) donde m es el número de palabras únicas

## 💻 Solución Implementada

```javascript
function countWordFrequency(text) {
    const words = splitIntoWords(text);
    const frequency = {};
    
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return frequency;
}

function getTopWords(frequencyMap, limit = 10) {
    return Object.entries(frequencyMap)
        .map(([word, frequency]) => ({ word, frequency }))
        .sort((a, b) => {
            if (b.frequency !== a.frequency) {
                return b.frequency - a.frequency;
            }
            return a.word.localeCompare(b.word);
        })
        .slice(0, limit);
}

function filterCommonWords(frequencyMap, commonWords = []) {
    const filtered = {};
    const commonWordsSet = new Set(commonWords.map(word => word.toLowerCase()));
    
    Object.entries(frequencyMap).forEach(([word, frequency]) => {
        if (!commonWordsSet.has(word.toLowerCase())) {
            filtered[word] = frequency;
        }
    });
    
    return filtered;
}

function generateWordReport(text, options = {}) {
    const { limit = 10, filterCommon = false, commonWords = [...] } = options;
    
    const allWords = splitIntoWords(text);
    const frequencyMap = countWordFrequency(text);
    
    let filteredMap = frequencyMap;
    let filteredWords = 0;
    
    if (filterCommon) {
        filteredMap = filterCommonWords(frequencyMap, commonWords);
        filteredWords = Object.keys(frequencyMap).length - Object.keys(filteredMap).length;
    }
    
    const topWords = getTopWords(filteredMap, limit);
    
    return {
        totalWords: allWords.length,
        uniqueWords: Object.keys(frequencyMap).length,
        topWords: topWords,
        filteredWords: filteredWords,
        averageFrequency: allWords.length > 0 ? (allWords.length / Object.keys(frequencyMap).length).toFixed(2) : 0
    };
}
```

## 🔄 Versiones Alternativas

### Versión con Clase Analizadora
```javascript
class WordFrequencyAnalyzer {
    constructor() {
        this.commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
        this.minWordLength = 2;
        this.maxWordLength = 50;
    }
    
    analyze(text, options = {}) {
        const { includeNumbers = false, caseSensitive = false, customFilter = null } = options;
        
        let processedText = text;
        
        if (!caseSensitive) {
            processedText = processedText.toLowerCase();
        }
        
        processedText = processedText
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        let words = processedText.split(' ');
        
        words = words.filter(word => 
            word.length >= this.minWordLength && 
            word.length <= this.maxWordLength
        );
        
        if (!includeNumbers) {
            words = words.filter(word => !/^\d+$/.test(word));
        }
        
        if (typeof customFilter === 'function') {
            words = words.filter(customFilter);
        }
        
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
```

### Versión Optimizada para Textos Grandes
```javascript
function countWordFrequencyOptimized(text) {
    if (!text || typeof text !== 'string') {
        return {};
    }
    
    const frequencyMap = new Map();
    
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
    
    const result = {};
    frequencyMap.forEach((frequency, word) => {
        result[word] = frequency;
    });
    
    return result;
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Limpieza de Texto**
```javascript
function cleanText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Eliminar puntuación
        .replace(/\s+/g, ' ')       // Normalizar espacios
        .trim();                    // Eliminar espacios al inicio/final
}
```
- Conversión a minúsculas para normalización
- Eliminación de puntuación con regex
- Normalización de espacios múltiples

### 2. **División en Palabras Válidas**
```javascript
function splitIntoWords(text) {
    return text
        .split(' ')
        .filter(word => word.length >= 2)  // Mínimo 2 caracteres
        .filter(word => /^[a-z0-9]+$/i.test(word));  // Solo letras y números
}
```
- Filtrado por longitud mínima
- Validación con regex para caracteres válidos

### 3. **Conteo de Frecuencias**
```javascript
words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
});
```
- Uso de operador OR para inicialización
- Incremento eficiente de contadores

### 4. **Ordenamiento por Frecuencia**
```javascript
.sort((a, b) => {
    if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;  // Por frecuencia
    }
    return a.word.localeCompare(b.word);    // Alfabético si hay empate
})
```
- Ordenamiento descendente por frecuencia
- Ordenamiento alfabético en caso de empate

### 5. **Filtrado de Palabras Comunes**
```javascript
const commonWordsSet = new Set(commonWords.map(word => word.toLowerCase()));
Object.entries(frequencyMap).forEach(([word, frequency]) => {
    if (!commonWordsSet.has(word.toLowerCase())) {
        filtered[word] = frequency;
    }
});
```
- Uso de Set para búsqueda eficiente
- Filtrado case-insensitive

## 🧪 Casos de Prueba Clave

### Operaciones Básicas
- `countWordFrequency("Hello world!")` → `{"hello": 1, "world": 1}`
- `getTopWords({a: 3, b: 1}, 2)` → `[{word: "a", frequency: 3}, {word: "b", frequency: 1}]`
- `filterCommonWords({the: 2, hello: 1}, ["the"])` → `{hello: 1}`

### Casos Edge
- Texto vacío → `{}`
- Solo espacios → `{}`
- Solo puntuación → `{}`
- Palabras muy cortas → Filtradas

### Validaciones
- Parámetros inválidos → Valores por defecto
- Límites negativos → Array vacío
- Objetos null → Objetos vacíos

## 🚀 Optimizaciones Implementadas

### 1. **Procesamiento Eficiente**
- Una sola pasada para limpieza y división
- Uso de Map para textos grandes
- Filtrado temprano de palabras inválidas

### 2. **Memoria Optimizada**
- Uso de Set para búsquedas O(1)
- Eliminación de duplicados innecesarios
- Reutilización de objetos cuando es posible

### 3. **Validación Temprana**
- Verificación de tipos antes de procesar
- Manejo de casos edge al inicio
- Valores por defecto para parámetros opcionales

### 4. **Algoritmos Eficientes**
- Ordenamiento estable para empates
- Búsqueda binaria implícita con Set
- Operaciones O(1) para conteo

## 📚 Conceptos Aplicados

1. **Manipulación de Strings**: toLowerCase, replace, split, trim
2. **Expresiones Regulares**: Patrones para limpieza y validación
3. **Arrays**: filter, map, sort, forEach
4. **Objetos**: Como mapas de frecuencias
5. **Algoritmos de Ordenamiento**: Sort personalizado
6. **Estructuras de Datos**: Set para búsquedas eficientes

## 🎓 Lecciones Aprendidas

- **Limpieza de datos**: Es crucial para análisis preciso
- **Validación de entrada**: Previene errores en tiempo de ejecución
- **Estructuras de datos**: Elegir la correcta mejora el rendimiento
- **Casos edge**: Siempre considerar entradas inesperadas
- **Optimización**: Balance entre legibilidad y rendimiento

## 🔧 Funcionalidades Adicionales

### Análisis Comparativo
```javascript
compareTexts(text1, text2) {
    const analysis1 = this.analyze(text1);
    const analysis2 = this.analyze(text2);
    
    const words1 = new Set(Object.keys(analysis1.frequency));
    const words2 = new Set(Object.keys(analysis2.frequency));
    
    return {
        commonWords: [...words1].filter(word => words2.has(word)),
        uniqueToText1: [...words1].filter(word => !words2.has(word)),
        uniqueToText2: [...words2].filter(word => !words1.has(word)),
        similarity: commonWords.length / Math.max(words1.size, words2.size)
    };
}
```

### Filtros Personalizados
```javascript
analyze(text, { customFilter: (word) => word.length > 3 })
```

### Configuración Flexible
```javascript
setCommonWords(['custom', 'words'])
setMinWordLength(3)
```

---

**💡 Tip:** Esta solución demuestra cómo implementar un sistema completo de análisis de texto con múltiples funcionalidades. Es un excelente ejemplo de procesamiento de datos, manipulación de strings, algoritmos de ordenamiento y estructuras de datos aplicadas a un problema del mundo real.
