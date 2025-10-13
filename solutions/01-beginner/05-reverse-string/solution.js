/**
 * Reverse String - Solución
 * 
 * Implementación usando la técnica de dos punteros
 * Complejidad temporal: O(n)
 * Complejidad espacial: O(1)
 */

function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Intercambiar caracteres
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        
        // Mover punteros hacia el centro
        left++;
        right--;
    }
}

module.exports = reverseString;
