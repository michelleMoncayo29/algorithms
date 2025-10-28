# Contador de Frecuencia de Palabras

**Dificultad:** BEGINNER  
**Categoría:** Strings, Arrays, Objetos, Algoritmos de Ordenamiento, Procesamiento de Texto  
**Tiempo estimado:** 25-30 minutos

## 📋 Descripción

Crea una función que analice texto y cuente la frecuencia de palabras. El sistema debe limpiar el texto, dividirlo en palabras válidas, contar las frecuencias y generar reportes ordenados por frecuencia.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar manipulación de strings y arrays
- [ ] Usar objetos como contadores/mapas
- [ ] Implementar algoritmos de ordenamiento básicos
- [ ] Trabajar con expresiones regulares simples
- [ ] Manejar casos edge en procesamiento de texto
- [ ] Aplicar técnicas de limpieza y normalización de datos

## 📝 Enunciado

Implementa las siguientes funciones para analizar la frecuencia de palabras en texto:

### Funciones Requeridas

#### 1. `countWordFrequency(text)`
- Analiza el texto y cuenta la frecuencia de cada palabra
- Limpia el texto (elimina puntuación, convierte a minúsculas)
- Retorna un objeto con palabras como claves y frecuencias como valores

#### 2. `getTopWords(frequencyMap, limit)`
- Obtiene las palabras más frecuentes del mapa de frecuencias
- Ordena por frecuencia descendente
- Retorna array de objetos `{word, frequency}` limitado por `limit`

#### 3. `filterCommonWords(frequencyMap, commonWords)`
- Filtra palabras comunes del mapa de frecuencias
- Retorna nuevo mapa sin las palabras comunes
- `commonWords` es un array de palabras a filtrar

#### 4. `generateWordReport(text, options)`
- Genera un reporte completo de análisis de palabras
- `options` puede incluir: `limit`, `filterCommon`, `commonWords`
- Retorna objeto con estadísticas y palabras más frecuentes

## 💡 Ejemplos

### Ejemplo 1: Contar Frecuencia Básica

```javascript
const text = "Hello world! Hello JavaScript. World is amazing.";
const frequency = countWordFrequency(text);

// Resultado:
{
  "hello": 2,
  "world": 2,
  "javascript": 1,
  "is": 1,
  "amazing": 1
}
```

### Ejemplo 2: Obtener Palabras Más Frecuentes

```javascript
const frequency = {
  "hello": 2,
  "world": 2,
  "javascript": 1,
  "is": 1,
  "amazing": 1
};

const topWords = getTopWords(frequency, 3);

// Resultado:
[
  { word: "hello", frequency: 2 },
  { word: "world", frequency: 2 },
  { word: "javascript", frequency: 1 }
]
```

### Ejemplo 3: Filtrar Palabras Comunes

```javascript
const frequency = {
  "the": 5,
  "and": 3,
  "programming": 2,
  "javascript": 1
};

const commonWords = ["the", "and"];
const filtered = filterCommonWords(frequency, commonWords);

// Resultado:
{
  "programming": 2,
  "javascript": 1
}
```

### Ejemplo 4: Generar Reporte Completo

```javascript
const text = "JavaScript is great! Programming with JavaScript is fun.";
const report = generateWordReport(text, {
  limit: 3,
  filterCommon: true,
  commonWords: ["is", "with"]
});

// Resultado:
{
  totalWords: 6,
  uniqueWords: 4,
  topWords: [
    { word: "javascript", frequency: 2 },
    { word: "programming", frequency: 1 },
    { word: "great", frequency: 1 }
  ],
  filteredWords: 2
}
```

## 🔍 Casos de Prueba

| Función | Parámetros | Resultado Esperado | Explicación |
|---------|------------|-------------------|-------------|
| countWordFrequency | "Hello world!" | `{"hello": 1, "world": 1}` | Texto básico con puntuación |
| countWordFrequency | "" | `{}` | Texto vacío |
| countWordFrequency | "   " | `{}` | Solo espacios |
| getTopWords | `{a: 3, b: 1, c: 2}`, 2 | `[{word: "a", freq: 3}, {word: "c", freq: 2}]` | Ordenamiento correcto |
| filterCommonWords | `{a: 1, b: 2}`, `["a"]` | `{b: 2}` | Filtrado correcto |
| generateWordReport | "a a b", `{limit: 1}` | `{totalWords: 3, uniqueWords: 2, topWords: [{word: "a", frequency: 2}]}` | Reporte completo |

## 📚 Reglas de Procesamiento

### Limpieza de Texto
- Convertir todo a minúsculas
- Eliminar puntuación: `.,!?;:"'()[]{}`
- Eliminar caracteres especiales excepto espacios y guiones
- Dividir por espacios en blanco

### Palabras Válidas
- Mínimo 2 caracteres de longitud
- Solo letras y números
- Sin espacios ni caracteres especiales

### Ordenamiento
- Por frecuencia descendente (mayor a menor)
- En caso de empate, ordenar alfabéticamente

## 🧮 Algoritmos de Procesamiento

### Limpieza de Texto
```javascript
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Eliminar puntuación
    .replace(/\s+/g, ' ')       // Normalizar espacios
    .trim();                    // Eliminar espacios al inicio/final
}
```

### División en Palabras
```javascript
function splitIntoWords(text) {
  return text
    .split(' ')
    .filter(word => word.length >= 2)  // Mínimo 2 caracteres
    .filter(word => /^[a-z0-9]+$/i.test(word));  // Solo letras y números
}
```

### Conteo de Frecuencias
```javascript
function countFrequencies(words) {
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  return frequency;
}
```

### Ordenamiento por Frecuencia
```javascript
function sortByFrequency(frequencyMap) {
  return Object.entries(frequencyMap)
    .sort(([a, freqA], [b, freqB]) => {
      if (freqB !== freqA) return freqB - freqA;  // Por frecuencia
      return a.localeCompare(b);                   // Alfabético si hay empate
    });
}
```

## ⚠️ Validaciones Requeridas

### Entrada de Texto
- Manejar texto vacío o null
- Manejar texto con solo espacios
- Manejar texto con solo puntuación
- Manejar texto muy largo

### Parámetros de Funciones
- `limit` debe ser número positivo
- `commonWords` debe ser array de strings
- Validar que `frequencyMap` sea objeto válido

### Casos Edge
- Palabras con caracteres especiales
- Palabras muy largas o muy cortas
- Texto con números mezclados
- Palabras repetidas consecutivamente

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa expresiones regulares para limpiar el texto. `replace(/[^\w\s-]/g, '')` elimina puntuación.

</details>

<details>
<summary>💡 Pista 2</summary>

Para contar frecuencias, usa un objeto donde las claves son las palabras y los valores son los conteos.

</details>

<details>
<summary>💡 Pista 3</summary>

Para ordenar por frecuencia, convierte el objeto a array con `Object.entries()` y usa `sort()`.

</details>

<details>
<summary>💡 Pista 4</summary>

Para filtrar palabras comunes, usa `delete` o crea un nuevo objeto sin esas claves.

</details>

<details>
<summary>💡 Pista 5</summary>

Recuerda manejar casos edge como texto vacío, solo espacios, o palabras muy cortas.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las funciones requeridas
3. Ejecuta los tests: `npm test word-frequency-counter`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [String Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Array Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Regular Expressions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Object Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

**💡 Tip:** Este ejercicio te ayudará a entender conceptos fundamentales de procesamiento de texto, manipulación de datos y algoritmos de ordenamiento aplicados a análisis de contenido.
