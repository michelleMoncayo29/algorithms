/**
 * Ejercicio: Encontrar el Elemento Faltante
 *
 * Dado un array de números enteros del 1 al n (donde n es la longitud del array + 1)
 * con exactamente un número faltante, encuentra cuál número falta.
 *
 * @param {number[]} numbers - Array de números con un elemento faltante
 * @returns {number} - El número que falta en la secuencia
 *
 * Ejemplos:
 * findMissingElement([1, 2, 4, 5]) => 3
 * findMissingElement([1, 3, 4, 5, 6]) => 2
 * findMissingElement([2, 3, 4, 5, 6]) => 1
 * findMissingElement([1, 2, 3, 4, 6]) => 5
 *
 * Pista: Usa la fórmula de suma de progresión aritmética:
 * Suma esperada = n * (n + 1) / 2
 * donde n es el número más grande que debería estar presente
 */


function hasLessOne(numbers) {
  for (const num of numbers) {
    if (num < 1) {
      return true;
    }
  }

  return false;
}

function sortArray(numbers) {
  const newArray = numbers.sort((a, b) => a - b);

  return newArray;
}

function findMissingElement(numbers) {
  // TODO: Implementa la función aquí

  const orderedArr = sortArray(numbers);
  const n = orderedArr.length + 1;

  if (hasLessOne(orderedArr)) {

    let prevElement = orderedArr[0];

    for (let i = 1; i < orderedArr.length; i++) {
      const current = orderedArr[i];
      let secuens = prevElement + 1;

      if (secuens !== current) {
        return secuens;
      }

      prevElement = current;
      
    }

    
  } else {
    for (let i = 0; i < orderedArr.length; i++) {
      const element = orderedArr[i];
  
      if (element !== i + 1) {
        return i + 1;
      }
    }
  }


  return n;
  // Pista 1: Calcula la suma esperada de 1 a n
  // Pista 2: Calcula la suma real del array
  // Pista 3: La diferencia es el número faltante
}

console.log(findMissingElement([-1, 0, 1, 3]));

module.exports = findMissingElement;
