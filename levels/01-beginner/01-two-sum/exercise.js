/**
 * Two Sum
 *
 * Descripción: Dado un array de enteros nums y un entero target, devuelve los índices de los dos números que suman target.
 * Dificultad: BEGINNER
 *
 * @param {number[]} nums - Array de números enteros
 * @param {number} target - Número objetivo
 * @returns {number[]} Array con los índices de los dos números que suman target
 *
 * Ejemplo:
 * twoSum([2, 7, 11, 15], 9) // [0, 1]
 */

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

console.log(twoSum([3, 2, 4], 6)); // [0, 1]

module.exports = twoSum;
