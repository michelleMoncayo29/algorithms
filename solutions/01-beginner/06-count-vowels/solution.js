/**
 * Solución para el ejercicio Count Vowels
 * 
 * Esta implementación cuenta las vocales en una string utilizando
 * un enfoque iterativo simple y directo.
 */

/**
 * Cuenta el número de vocales en una string
 * @param {string} str - La string a analizar
 * @returns {number} - El número de vocales encontradas
 */
function countVowels(str) {
    let count = 0;
    
    // Itera sobre cada carácter de la string
    for (let i = 0; i < str.length; i++) {
        // Convierte el carácter a minúscula para facilitar la comparación
        const char = str[i].toLowerCase();
        
        // Verifica si el carácter es una vocal
        if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
            count++;
        }
    }
    
    return count;
}

module.exports = countVowels;

// Alternativa más concisa usando includes():
/*
function countVowels(str) {
    let count = 0;
    const vowels = 'aeiou';
    
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    
    return count;
}
*/

// Alternativa usando for...of:
/*
function countVowels(str) {
    let count = 0;
    const vowels = 'aeiou';
    
    for (const char of str) {
        if (vowels.includes(char.toLowerCase())) {
            count++;
        }
    }
    
    return count;
}
*/

// Alternativa funcional usando reduce():
/*
function countVowels(str) {
    const vowels = 'aeiou';
    return str.split('').reduce((count, char) => {
        return vowels.includes(char.toLowerCase()) ? count + 1 : count;
    }, 0);
}
*/
