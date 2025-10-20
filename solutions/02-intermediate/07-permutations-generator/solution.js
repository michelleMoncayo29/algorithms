/**
 * SOLUCIÓN: Generador de Permutaciones
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function generatePermutations(arr) {
    // Caso base: array vacío
    if (arr.length === 0) {
        return [[]];
    }
    
    // Caso base: array con un elemento
    if (arr.length === 1) {
        return [arr];
    }
    
    const result = [];
    
    // Para cada elemento en el array
    for (let i = 0; i < arr.length; i++) {
        // Crear un nuevo array sin el elemento actual
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        
        // Generar todas las permutaciones del resto de elementos
        const permutationsOfRemaining = generatePermutations(remaining);
        
        // Agregar el elemento actual al principio de cada permutación
        for (const permutation of permutationsOfRemaining) {
            result.push([arr[i], ...permutation]);
        }
    }
    
    return result;
}

module.exports = generatePermutations;

// Ejemplo de uso:
// console.log(generatePermutations([1, 2, 3]));
// // Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
//
// console.log(generatePermutations(['a', 'b']));
// // Output: [['a', 'b'], ['b', 'a']]
//
// console.log(generatePermutations([]));
// // Output: [[]]

/**
 * ALTERNATIVA: Solución usando backtracking
 * 
 * Esta es una implementación alternativa que usa backtracking
 * para generar las permutaciones de manera más eficiente en memoria.
 */

function generatePermutationsBacktracking(arr) {
    const result = [];
    const current = [];
    const used = new Array(arr.length).fill(false);
    
    function backtrack() {
        // Si hemos usado todos los elementos, agregar la permutación actual
        if (current.length === arr.length) {
            result.push([...current]);
            return;
        }
        
        // Probar cada elemento disponible
        for (let i = 0; i < arr.length; i++) {
            if (!used[i]) {
                // Marcar el elemento como usado
                used[i] = true;
                current.push(arr[i]);
                
                // Recursión
                backtrack();
                
                // Backtrack: deshacer los cambios
                current.pop();
                used[i] = false;
            }
        }
    }
    
    backtrack();
    return result;
}

// Ambas soluciones son correctas y producen el mismo resultado
// La primera es más fácil de entender, la segunda es más eficiente en memoria
