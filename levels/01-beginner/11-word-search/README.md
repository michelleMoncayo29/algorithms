# Búsqueda de Palabras en Texto

## 📚 Descripción

Este ejercicio implementa un **sistema de búsqueda de palabras en texto** que permite encontrar palabras específicas, contar ocurrencias, generar estadísticas y realizar búsquedas avanzadas con patrones. Es una herramienta fundamental para el procesamiento de texto y análisis de contenido.

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, serás capaz de:

- ✅ Buscar palabras específicas en texto
- ✅ Contar ocurrencias de palabras
- ✅ Manejar búsquedas sensibles a mayúsculas/minúsculas
- ✅ Realizar búsquedas con patrones y comodines
- ✅ Generar estadísticas de texto
- ✅ Limpiar y normalizar texto para búsqueda
- ✅ Trabajar con arrays y objetos en JavaScript

## 🔍 Funcionalidades Implementadas

### 1. Búsqueda Básica
Encuentra una palabra específica en un texto y cuenta cuántas veces aparece.

```javascript
const text = "El gato negro está en el jardín. El gato es muy inteligente.";
searchWord(text, "gato"); // Retorna: 2
```

### 2. Búsqueda Detallada
Proporciona información completa sobre las ocurrencias de una palabra.

```javascript
const result = searchWordDetailed(text, "gato");
// Retorna: {
//   count: 2,
//   positions: [0, 1],
//   firstPosition: 0,
//   lastPosition: 1,
//   wordLength: 4
// }
```

### 3. Búsqueda Múltiple
Busca varias palabras simultáneamente y retorna un conteo para cada una.

```javascript
const words = ["gato", "jardín", "negro"];
searchMultipleWords(text, words);
// Retorna: { gato: 2, jardín: 1, negro: 1 }
```

### 4. Búsqueda por Patrones
Busca palabras que coincidan con un patrón usando comodines.

```javascript
searchPattern(text, "ga*"); // Encuentra: ["gato"]
searchPattern(text, "*ín"); // Encuentra: ["jardín"]
searchPattern(text, "*at*"); // Encuentra: ["gato"]
```

### 5. Análisis de Frecuencia
Encuentra la palabra más frecuente en un texto.

```javascript
const result = findMostFrequentWord(text);
// Retorna: { word: "el", count: 3 }
```

### 6. Estadísticas de Texto
Genera estadísticas completas del texto analizado.

```javascript
const stats = generateTextStats(text);
// Retorna: {
//   totalWords: 12,
//   uniqueWords: 10,
//   mostFrequentWord: { word: "el", count: 3 },
//   averageWordLength: 4.2,
//   longestWord: "inteligente",
//   shortestWord: "el"
// }
```

### 7. Limpieza de Texto
Normaliza y limpia texto para búsquedas más precisas.

```javascript
const dirtyText = "¡Hola! ¿Cómo estás? Bien, gracias.";
cleanText(dirtyText); // Retorna: "Hola Cómo estás Bien gracias"
```

## 🧠 Conceptos Clave

### Manipulación de Strings
- **split()**: Divide texto en palabras
- **toLowerCase()**: Normaliza mayúsculas/minúsculas
- **replace()**: Limpia caracteres especiales
- **indexOf()**: Encuentra posiciones de palabras

### Arrays y Objetos
- **filter()**: Filtra elementos que cumplen condición
- **reduce()**: Acumula valores (conteos, sumas)
- **map()**: Transforma elementos del array
- **Object.entries()**: Convierte objeto a array de pares

### Expresiones Regulares
- **Comodines**: `*` para cualquier secuencia de caracteres
- **Limpieza**: Remover puntuación y caracteres especiales
- **Patrones**: Buscar palabras que coincidan con formato

## ⚡ Análisis de Complejidad

### Complejidad Temporal
- **Búsqueda básica**: O(n*m) donde n es longitud del texto y m longitud de la palabra
- **Búsqueda múltiple**: O(k*n*m) donde k es número de palabras a buscar
- **Estadísticas**: O(n) para procesar todo el texto
- **Limpieza**: O(n) para procesar cada carácter

### Complejidad Espacial
- **Búsqueda básica**: O(1) - solo variables temporales
- **Búsqueda detallada**: O(k) donde k es número de ocurrencias
- **Estadísticas**: O(w) donde w es número de palabras únicas

## 🛠️ Estructura del Ejercicio

### Funciones Principales

1. **`searchWord(text, word, caseSensitive)`**
   - Busca una palabra y cuenta ocurrencias
   - Maneja mayúsculas/minúsculas opcionalmente

2. **`searchWordDetailed(text, word, caseSensitive)`**
   - Búsqueda con información detallada
   - Retorna posiciones y estadísticas

3. **`searchMultipleWords(text, words, caseSensitive)`**
   - Busca múltiples palabras simultáneamente
   - Retorna objeto con conteos

4. **`searchPattern(text, pattern, caseSensitive)`**
   - Búsqueda con patrones y comodines
   - Usa expresiones regulares

5. **`findMostFrequentWord(text, caseSensitive)`**
   - Encuentra palabra más frecuente
   - Útil para análisis de contenido

6. **`generateTextStats(text, caseSensitive)`**
   - Genera estadísticas completas
   - Análisis profundo del texto

7. **`cleanText(text, caseSensitive)`**
   - Limpia y normaliza texto
   - Prepara texto para búsqueda

## 🧪 Casos de Prueba

El ejercicio incluye casos de prueba para:

- ✅ Búsqueda básica de palabras
- ✅ Manejo de mayúsculas/minúsculas
- ✅ Palabras que no existen
- ✅ Texto vacío y casos edge
- ✅ Búsqueda de palabras completas
- ✅ Manejo de puntuación
- ✅ Búsqueda detallada con posiciones
- ✅ Búsqueda múltiple
- ✅ Patrones con comodines
- ✅ Análisis de frecuencia
- ✅ Generación de estadísticas
- ✅ Limpieza de texto
- ✅ Caracteres especiales y acentos
- ✅ Texto con saltos de línea y tabs

## 🎓 Aplicaciones Reales

### Procesamiento de Texto
- **Buscadores**: Encontrar contenido en documentos
- **Editores**: Buscar y reemplazar texto
- **Análisis**: Contar palabras clave en artículos

### Análisis de Contenido
- **SEO**: Analizar densidad de palabras clave
- **Redes Sociales**: Monitorear menciones de marcas
- **Investigación**: Analizar patrones en textos

### Herramientas de Escritura
- **Contadores**: Estadísticas de palabras y caracteres
- **Corrección**: Detectar repeticiones excesivas
- **Optimización**: Mejorar legibilidad del texto

## 🚀 Ejercicios Adicionales

Una vez completado el ejercicio básico, puedes intentar:

1. **Implementar búsqueda fuzzy** (tolerante a errores)
2. **Agregar sinónimos** en la búsqueda
3. **Implementar búsqueda por frases** completas
4. **Crear índice invertido** para búsquedas rápidas
5. **Agregar highlighting** de resultados
6. **Implementar búsqueda en tiempo real**

## 📊 Métricas de Rendimiento

### Optimizaciones Implementadas
- **Limpieza previa**: Normalizar texto una sola vez
- **Búsqueda eficiente**: Usar métodos nativos de JavaScript
- **Caché de resultados**: Evitar recálculos innecesarios
- **Manejo de memoria**: Liberar recursos cuando sea posible

### Consideraciones de Escalabilidad
- Para textos muy grandes, usar procesamiento por chunks
- Implementar búsqueda asíncrona para no bloquear la UI
- Usar Web Workers para procesamiento en paralelo
- Considerar índices para búsquedas frecuentes

## 🔧 Consideraciones Técnicas

### Manejo de Caracteres Especiales
- **Acentos**: Preservar o normalizar según necesidad
- **Puntuación**: Remover o tratar como separadores
- **Espacios**: Normalizar múltiples espacios
- **Unicode**: Manejar caracteres internacionales

### Casos Edge
- **Texto vacío**: Retornar valores por defecto
- **Palabra vacía**: Validar entrada
- **Solo espacios**: Tratar como texto vacío
- **Caracteres especiales**: Limpiar apropiadamente

## 📖 Recursos Adicionales

- [String Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Regular Expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Text Processing - Wikipedia](https://en.wikipedia.org/wiki/Text_processing)

## 🎯 Casos de Uso del Ejercicio

### Ejemplo Básico
```javascript
const text = "El gato negro está en el jardín. El gato es muy inteligente.";
const count = searchWord(text, "gato"); // 2
const details = searchWordDetailed(text, "gato");
const stats = generateTextStats(text);
```

### Ejemplo Avanzado
```javascript
const words = ["gato", "jardín", "inteligente"];
const results = searchMultipleWords(text, words);
const pattern = searchPattern(text, "ga*"); // ["gato", "gato"]
const frequent = findMostFrequentWord(text);
```

### Flujo de Trabajo
1. **Limpiar texto** para normalizar formato
2. **Buscar palabras** específicas o patrones
3. **Analizar resultados** y generar estadísticas
4. **Presentar información** de manera estructurada

---

**¡Construye tu propio buscador de texto y domina la manipulación de strings en JavaScript! 🔍✨**
