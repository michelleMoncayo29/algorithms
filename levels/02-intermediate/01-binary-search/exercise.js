/**
 * Binary Search
 * 
 * Descripción: Implementa búsqueda binaria para encontrar un elemento en un array ordenado.
 * Dificultad: INTERMEDIATE
 * 
 * @param {number[]} nums - Array ordenado de números
 * @param {number} target - Elemento a buscar
 * @returns {number} Índice del elemento si se encuentra, -1 si no existe
 * 
 * Ejemplo:
 * binarySearch([-1, 0, 3, 5, 9, 12], 9) // 4
 */

function binarySearch(nums, target) {
    // TODO: Implementar la solución aquí
    
    // Pista: Usa dos punteros (left y right) y calcula el punto medio
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];

        if (element === target) {
            return index;
        }
        
    }

    return -1;
    
    throw new Error('Función no implementada');
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));
module.exports = binarySearch;