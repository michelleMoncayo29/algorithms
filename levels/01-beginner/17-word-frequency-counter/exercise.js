/**
 * Contador de Frecuencia de Palabras
 *
 * Descripción: Implementa funciones para analizar texto y contar la frecuencia de palabras.
 * El sistema debe limpiar texto, dividirlo en palabras válidas, contar frecuencias y generar reportes.
 * Dificultad: BEGINNER
 *
 * Funciones requeridas:
 * - countWordFrequency(text): Cuenta frecuencia de palabras
 * - getTopWords(frequencyMap, limit): Obtiene palabras más frecuentes
 * - filterCommonWords(frequencyMap, commonWords): Filtra palabras comunes
 * - generateWordReport(text, options): Genera reporte completo
 */

/**
 * Cuenta la frecuencia de palabras en el texto
 * @param {string} text - Texto a analizar
 * @returns {Object} Objeto con palabras como claves y frecuencias como valores
 */
function countWordFrequency(text) {
  // TODO: Implementar conteo de frecuencia de palabras
  const textLowerCase = text.toLowerCase(); //Convierte todo a minúsculas
  const clearWord = textLowerCase.replace(/[^\w\s]/g, ''); //Elimina puntuación usando expresión regular

  if (clearWord.trim() === '') {
    return {};
  }

  const arrayWords = clearWord.split(' '); //Divide el texto en un array de palabras
  const filteredWords = arrayWords.filter(word => word.length >= 2); //Filtra palabras con al menos 2 caracteres
  const frequencyMap = filteredWords.reduce((acc, wordCurrent) => {
    if (acc[wordCurrent]) {
      acc[wordCurrent]++;
    } else {
      acc[wordCurrent] = 1;
    }

    return acc;
  }, {});

  return frequencyMap;
}

const text = 'Hello world! Hello JavaScript.';
const result = countWordFrequency(text);
// console.log(result); // { hello: 2, world: 1, javascript: 1 }

/**
 * Obtiene las palabras más frecuentes ordenadas por frecuencia
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {number} limit - Número máximo de palabras a retornar
 * @returns {Array} Array de objetos {word, frequency} ordenados por frecuencia
 */
function getTopWords(frequencyMap, limit = 10) {
  // TODO: Implementar obtención de palabras más frecuentes

  if (!frequencyMap || typeof frequencyMap !== 'object') {
    return [];
  }

  if (typeof limit !== 'number' || limit < 0) {
    limit = 10;
  }

  const newArr = [];

  const entries = Object.entries(frequencyMap); // Convierte el objeto en un array de entradas

  for (const arraySecond of entries) {
    // console.log(arraySecond);
    const object = {
      word: arraySecond[0],
      frequency: arraySecond[1],
    };
    newArr.push(object);
  }

  const result = newArr.slice(0, limit);

  return result;
}

const frequencyMap = {
  hello: 3,
  world: 1,
  javascript: 2,
  programming: 1,
};

/**
 * Filtra palabras comunes del mapa de frecuencias
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {Array} commonWords - Array de palabras comunes a filtrar
 * @returns {Object} Nuevo mapa sin las palabras comunes
 */
function filterCommonWords(frequencyMap, commonWords = []) {
  if (
    !frequencyMap ||
    typeof frequencyMap !== 'object' ||
    !Array.isArray(commonWords)
  ) {
    return [];
  }

  const newObj = { ...frequencyMap };

  for (const item of commonWords) {
    let wordLowerCase = item.toLowerCase();
    console.log(newObj[wordLowerCase]);
    if (Object.hasOwn(frequencyMap, wordLowerCase)) {
      delete newObj[wordLowerCase]; //los corchete son para acceder dinamicamente
    }
  }

  return newObj;
  // TODO: Implementar filtrado de palabras comunes
  // Pista 1: Validar que frequencyMap sea un objeto válido
  // Pista 2: Validar que commonWords sea un array
  // Pista 3: Crear un nuevo objeto para el resultado
  // Pista 4: Iterar sobre las entradas del mapa de frecuencias
  // Pista 5: Verificar si cada palabra está en commonWords (case-insensitive)
  // Pista 6: Solo agregar palabras que NO estén en commonWords
  // Pista 7: Retornar el nuevo objeto filtrado

  throw new Error('Función filterCommonWords no implementada');
}

const frequencyMap1 = {
  the: 5,
  and: 3,
  programming: 2,
  javascript: 1,
};

const commonWords = ['the', 'and'];

// console.log(filterCommonWords(frequencyMap1, commonWords));

/**
 * Genera un reporte completo de análisis de palabras
 * @param {string} text - Texto a analizar
 * @param {Object} options - Opciones del reporte
 * @returns {Object} Reporte completo con estadísticas
 */

function existsOnArray(arr, searchItem) {
  for (const item of arr) {
    if (item === searchItem) {
      return true;
    }
  }

  return false;
}

function getUniqueArray(arr) {
  const uniqueArray = [];

  for (const item of arr) {
    if (!existsOnArray(uniqueArray, item)) {
      uniqueArray.push(item);
    }
  }

  return uniqueArray;
}

function generateWordReport(text, options = {}) {
  // TODO: Implementar generación de reporte completo

  if (typeof text !== 'string' || typeof options !== 'object') {
    return null;
  }

  const arrayCommonWord = options.commonWords;
  const numberLimit = options.limit;

  const stringArr = text.split(' ');
  const lengthArr = stringArr.length;

  const newArr = getUniqueArray(stringArr);

  const result = {
    totalWords: lengthArr,
  };

  console.log(result, newArr);
  // countWordFrequency(text)
  // Pista 1: Extraer opciones con valores por defecto (limit, filterCommon, commonWords)
  // Pista 2: Contar frecuencia de todas las palabras usando countWordFrequency()
  // Pista 3: Contar total de palabras y palabras únicas
  // Pista 4: Aplicar filtro de palabras comunes si filterCommon es true
  // Pista 5: Obtener palabras más frecuentes usando getTopWords()
  // Pista 6: Calcular estadísticas adicionales (palabras filtradas, frecuencia promedio)
  // Pista 7: Retornar objeto con todas las estadísticas

  // throw new Error('Función generateWordReport no implementada');
}

const text1 = 'JavaScript is great! Programming with JavaScript is fun.';
const report = generateWordReport(text1, {
  limit: 3,
  filterCommon: true,
  commonWords: ['is', 'with'],
});

console.log(report);

module.exports = {
  countWordFrequency,
  getTopWords,
  filterCommonWords,
  generateWordReport,
};
