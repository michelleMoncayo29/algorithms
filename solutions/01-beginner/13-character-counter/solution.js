/**
 * SOLUCIÓN: Contador de Caracteres en Texto
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function countCharacters(text) {
    // Convertir el texto a minúsculas para un conteo uniforme
    const lowerText = text.toLowerCase();
    
    // Crear un objeto para almacenar los conteos
    const charCount = {};
    
    // Iterar sobre cada carácter del texto
    for (let i = 0; i < lowerText.length; i++) {
        const char = lowerText[i];
        
        // Verificar si el carácter es una letra del alfabeto
        if (char >= 'a' && char <= 'z') {
            // Si la letra ya existe en el objeto, incrementar su contador
            // Si no existe, inicializarlo en 1
            charCount[char] = (charCount[char] || 0) + 1;
        }
    }
    
    return charCount;
}

module.exports = countCharacters;

// Ejemplo de uso:
// console.log(countCharacters("Hola mundo"));
// // Output: {h: 1, o: 2, l: 1, a: 1, m: 1, u: 1, n: 1, d: 1}
//
// console.log(countCharacters("JavaScript"));
// // Output: {j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1}
