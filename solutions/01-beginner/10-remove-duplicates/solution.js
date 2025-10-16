/**
 * Solución para eliminar duplicados de un array
 * 
 * @param {number[]} nums - Array de números
 * @returns {number[]} - Nuevo array sin duplicados
 * 
 * Complejidad de tiempo: O(n) con Set, O(n²) con includes
 * Complejidad de espacio: O(n)
 */
function removeDuplicates(nums) {
    // Solución optimizada usando Set
    const seen = new Set();
    const result = [];
    
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        
        // Si no hemos visto este elemento antes
        if (!seen.has(current)) {
            seen.add(current);    // Marcar como visto
            result.push(current); // Agregar al resultado
        }
    }
    
    return result;
}

module.exports = removeDuplicates;

/* 
Explicación del algoritmo:

1. **Estructura de datos**: Usamos un Set para seguimiento eficiente de elementos vistos
2. **Iteración**: Recorremos el array original una sola vez
3. **Verificación**: Para cada elemento, verificamos si ya lo hemos visto
4. **Agregación**: Solo agregamos elementos únicos al array resultado
5. **Orden**: Mantenemos el orden de aparición original

Ventajas de esta solución:
- Complejidad O(n) en tiempo (vs O(n²) con includes)
- Complejidad O(n) en espacio
- Mantiene el orden de aparición
- No modifica el array original

Alternativas de implementación:

// Solución simple con includes (O(n²))
function removeDuplicatesSimple(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (!result.includes(nums[i])) {
            result.push(nums[i]);
        }
    }
    return result;
}

// Solución con indexOf (O(n²))
function removeDuplicatesIndex(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (result.indexOf(nums[i]) === -1) {
            result.push(nums[i]);
        }
    }
    return result;
}

// Solución con filter e indexOf (O(n²))
function removeDuplicatesFilter(nums) {
    return nums.filter((num, index) => nums.indexOf(num) === index);
}

Casos de prueba cubiertos:
- Arrays con duplicados consecutivos y no consecutivos
- Arrays vacíos y con un solo elemento
- Arrays con todos los elementos iguales
- Arrays con números negativos y decimales
- Arrays largos con múltiples duplicados
- Preservación del orden de aparición
*/
