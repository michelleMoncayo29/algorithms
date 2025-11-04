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
function getTopWords(frequencyMap, limit = 10, commonWords = []) {
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

  // const commonWords = ['is', 'with'];

  const orderArr = newArr.sort((a, b) => b.frequency - a.frequency);

  const filterArr = orderArr.filter(element => {
    const text = element.word;
    return !commonWords.includes(text);
  });

  const result = filterArr.slice(0, limit);

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

function existsOnArr(item, arr) {
  for (const element of arr) {
    if (element === item) {
      return true
    }
  }

  return false
}

function uniqueArr(arr) {
  const newArr = [];
  for (const first of arr) {
    if (!existsOnArr(first, newArr)) {
      newArr.push(first);
    }
  }

  return newArr;
}

function newObjet(arr, limit, commonWords) {
  const arrNew = arr.reduce((acc, wordCurrent) => {
    if (acc[wordCurrent]) {
      acc[wordCurrent]++;
    } else {
      acc[wordCurrent] = 1;
    }

    return acc;
  }, {});
  
  return getTopWords(arrNew, limit , commonWords);
}

function generateWordReport(text, options = {}) {
  // TODO: Implementar generación de reporte completo

  if (typeof text !== 'string' || typeof options !== 'object') {
    return null;
  }

  const arrayCommonWord = options.commonWords ?? [];
  const numberLimit = options.limit;

  const stringArr = text.split(' ');
  const lengthArr = stringArr.length;
  const newArr = uniqueArr(stringArr);
  
  const result = {
    totalWords: lengthArr,
    uniqueWords: newArr.length,
    topWords: newObjet(stringArr, numberLimit, arrayCommonWord),
    filteredWords: arrayCommonWord.length,
    averageFrequency: lengthArr / newArr.length,
  };
  return result;
}

const text1 = 'JavaScript is great! Programming with JavaScript is fun.';
const report = generateWordReport(text1, {
  limit: 4,
  filterCommon: true,
  commonWords: ['with'],
});

console.log(report);

module.exports = {
  countWordFrequency,
  getTopWords,
  filterCommonWords,
  generateWordReport,
};


console.log(generateWordReport('Hello world! Hello JavaScript.'));