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
  const clearWord = textLowerCase.replace(/[^\w\s-]/g, ''); //Elimina puntuación usando expresión regular

  const arrayWords = clearWord.split(' '); //Divide el texto en un array de palabras
  const filteredWords = arrayWords.filter(word => word.length >= 2); //Filtra palabras con al menos 2 caracteres
  const frequencyMap = filteredWords.reduce((acc, wordCurrent) => {
    if (/^[a-z0-9]+$/i.test(wordCurrent)) {
      if (acc[wordCurrent]) {
        acc[wordCurrent]++;
      } else {
        acc[wordCurrent] = 1;
      }
    }

    return acc;
  }, {});

  return frequencyMap;
}

const text = 'Hello world! Hello JavaScript.';
const result = countWordFrequency(text);

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
    const object = {
      word: arraySecond[0],
      frequency: arraySecond[1],
    };
    newArr.push(object);
  }

  newArr.sort((a, b) => {
    const nameA = a.word.toLowerCase(); // Convertir a minúsculas para ordenar sin distinguir mayúsculas
    const nameB = b.word.toLowerCase();

    if (nameA < nameB) {
      return -1; // a va antes que b
    }
    if (nameA > nameB) {
      return 1; // b va antes que a
    }
    return 0; // Son iguales
  });

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

function delectKeyObject(obj, arr) {
  const arrLowerCase = arr.map(text => {
    return text.toLocaleLowerCase();
  });

  const arrKeys = Object.keys(obj);
  const mutedArray = arrKeys.filter(element => {
    const textLower = element.toLowerCase();
    return !arrLowerCase.includes(textLower);
  });

  // console.log(mutedArray, '✅');

  const newObject = mutedArray.reduce((acc, element) => {
    acc[element] = obj[element];

    return acc;
  }, {});

  return newObject;
}

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
    return {};
  }

  return delectKeyObject(frequencyMap, commonWords);
}

const frequencyMap1 = {
  the: 5,
  and: 3,
  Programming: 2,
  javascript: 1,
};
const commonWords = ['the', 'And'];

// console.log(filterCommonWords(null, ['the']));
// console.log(!null);
// console.log(filterCommonWords(frequencyMap1, commonWords));

// Esto me debe preguntar que palabras existen en el array
function existsOnArr(item, arr) {
  for (const element of arr) {
    if (element === item) {
      return true;
    }
  }
  return false;
}

// Esto debe ser una función sobre eliminar las palabras que estan en commonWords.
function uniqueArr(arr, commonWords) {

  // Quitamos las palabras que son commonWords.
  const auxArr =  arr.filter(word => {
    return !commonWords.includes(word);
  });

  // Ahora sacamos los duplicados.
  const unifiqueArr = [];

  for (const first of auxArr) {
    if (!existsOnArr(first, unifiqueArr)) {
      unifiqueArr.push(first);
    }
  }

  return unifiqueArr;
}

// Debe crear el objeto con las palabras y sus frecuencias, teniendo su limite
function newObjet(arr, limit) {

  const arrNew = arr.reduce((acc, wordCurrent) => {
    if (acc[wordCurrent]) {
      acc[wordCurrent]++;
    } else {
      acc[wordCurrent] = 1;
    }

    return acc;
  }, {});

  return getTopWords(arrNew, limit);
}

/**
 * Genera un reporte completo de análisis de palabras
 * @param {string} text - Texto a analizar
 * @param {Object} options - Opciones del reporte
 * @returns {Object} Reporte completo con estadísticas
 */
function generateWordReport(text, options = {}) {
  // TODO: Implementar generación de reporte completo

  if (typeof text !== 'string' || typeof options !== 'object') {
    return null;
  }

  // Limpia el texto de caracteres no deseados
  const textWithoutCharacters = text.replace(/[^\w\s-]/g, '');
  // Array de palabras comunes a filtrar (QUITAR);
  const arrayCommonWord = options.commonWords ?? [];
  // Numero limite;
  const numberLimit = options.limit;

  // Array de palabras separadas por espacio;
  const stringArr = textWithoutCharacters.split(' ');
  // Longitud de la palabra
  const lengthArr = stringArr.length;

  // Unico array de palabras
  const newArr = uniqueArr(stringArr, arrayCommonWord);
  console.log(newArr, "✅✅✅✅");

  const result = {
    totalWords: lengthArr,
    uniqueWords: newArr.length, //longitud del array con palabras unicas
    topWords: newObjet(newArr, numberLimit),
    filteredWords: arrayCommonWord.length,
    averageFrequency: Math.floor(lengthArr / newArr.length),
  };
  return result;
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
