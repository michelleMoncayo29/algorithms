/**
 * Find Maximum
 *
 * Descripción: Encuentra el número máximo en un array de números enteros
 * Dificultad: BEGINNER
 *
 * @param {number[]} nums - Array de números enteros
 * @returns {number} El número máximo del array
 *
 * Ejemplo:
 * findMaximum([3, 7, 2, 9, 1]) // retorna 9
 */

function findMaximum(nums) {
  // TODO: Implementar la solución aquí
  
  let numMax = 0;
  for (const element of nums) {

    if (element > numMax) {
      numMax = element;
    }
    // Pista: Puedes usar un bucle para iterar sobre el array y mantener
    // el valor máximo encontrado hasta el momento
  }
  
  return numMax;
  throw new Error('Función no implementada');
}

console.log(findMaximum([3, 7, 2, 9, 1])); // Debería retornar 9

module.exports = findMaximum;
