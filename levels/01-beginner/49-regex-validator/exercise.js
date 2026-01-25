/**
 * Validador de Expresiones Regulares
 * 
 * Descripción: Valida si un texto coincide con un patrón de expresión regular específico.
 * Dificultad: BEGINNER
 * 
 * @param {string} text - Texto a validar
 * @param {string} patternType - Tipo de patrón a validar: 'email', 'phone', 'postalCode', 'url', 'date'
 * @returns {boolean} true si el texto coincide con el patrón, false en caso contrario
 * 
 * Ejemplo:
 * validateRegex("user@example.com", "email") // true
 * validateRegex("123-456-7890", "phone") // true
 * validateRegex("12345", "postalCode") // true
 */

function validateRegex(text, patternType) {
    // TODO: Implementar la solución aquí
    
    // Pista 1: Valida que text sea un string y patternType sea un string
    
    // Pista 2: Define los patrones regex para cada tipo:
    //   - email: debe contener @, dominio válido, etc.
    //   - phone: formato de teléfono (puede incluir guiones, espacios, paréntesis)
    //   - postalCode: código postal (5 dígitos o formato ZIP+4)
    //   - url: debe empezar con http:// o https://, dominio válido
    //   - date: formato de fecha (MM/DD/YYYY o DD/MM/YYYY)
    
    // Pista 3: Usa el método test() de la expresión regular para validar el texto
    
    // Pista 4: Retorna true si coincide, false si no coincide
    
    throw new Error('Función no implementada');
}

module.exports = validateRegex;

