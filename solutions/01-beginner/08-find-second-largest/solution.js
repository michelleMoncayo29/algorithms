/**
 * Solución para encontrar el segundo número más grande en un array
 * 
 * @param {number[]} nums - Array de números enteros
 * @returns {number|null} - El segundo número más grande o null si no existe
 * 
 * Complejidad de tiempo: O(n)
 * Complejidad de espacio: O(1)
 */
function findSecondLargest(nums) {
    // Casos edge: array vacío o con menos de 2 elementos
    if (nums.length < 2) {
        return null;
    }
    
    // Inicializar con valores muy pequeños para manejar números negativos
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    // Iterar sobre cada número en el array
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        
        // Si el número actual es mayor que el más grande
        if (current > largest) {
            // El actual más grande se convierte en el segundo más grande
            secondLargest = largest;
            // El número actual se convierte en el más grande
            largest = current;
        }
        // Si el número actual es menor que el más grande pero mayor que el segundo más grande
        else if (current > secondLargest && current < largest) {
            // Actualizar solo el segundo más grande
            secondLargest = current;
        }
    }
    
    // Si el segundo más grande sigue siendo -Infinity, significa que no existe
    if (secondLargest === -Infinity) {
        return null;
    }
    
    return secondLargest;
}

module.exports = findSecondLargest;

/* 
Explicación del algoritmo:

1. **Manejo de casos edge**: Verificamos si el array tiene menos de 2 elementos
2. **Inicialización**: Usamos -Infinity para manejar números negativos
3. **Iteración**: Para cada número:
   - Si es mayor que el máximo actual: actualizamos ambos valores
   - Si es menor que el máximo pero mayor que el segundo máximo: solo actualizamos el segundo
4. **Validación final**: Si el segundo máximo sigue siendo -Infinity, no existe

Casos de prueba cubiertos:
- Arrays básicos: [3, 7, 2, 9, 1] → 7
- Con repetidos: [5, 5, 4, 2] → 4  
- Todos iguales: [9, 9, 9] → null
- Menos de 2 elementos: [42] → null
- Números negativos: [-3, -7, -2, -9, -1] → -2
*/
