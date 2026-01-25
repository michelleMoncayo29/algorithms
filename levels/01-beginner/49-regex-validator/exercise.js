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
    if (typeof text !== 'string') {
        throw new Error('Text must be a string');
    }

    if (typeof patternType !== 'string') {
        throw new Error('Pattern type must be a string');
    }

    
    // Pista 2: Define los patrones regex para cada tipo:
    //   - email: debe contener @, dominio válido, etc.
    //   - phone: formato de teléfono (puede incluir guiones, espacios, paréntesis)
    //   - postalCode: código postal (5 dígitos o formato ZIP+4)
    //   - url: debe empezar con http:// o https://, dominio válido
    //   - date: formato de fecha (MM/DD/YYYY o DD/MM/YYYY)
    
    // Pista 3: Usa el método test() de la expresión regular para validar el texto
    
    // Pista 4: Retorna true si coincide, false si no coincide

    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\d{3}[-.\s]?|\(\d{3}\)\s?)\d{3}[-.\s]?\d{4}$/,
        postalCode: /^\d{5}(-\d{4})?$/,
        url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
        date: /^(\d{1,2}\/\d{1,2}\/\d{4})$/
    };

    // 3. Obtenemos el patrón solicitado
    const pattern = patterns[patternType];

    // 4. Si el patrón no existe, lanzamos el error con las opciones disponibles
    if (!pattern) {
        const validOptions = Object.keys(patterns).join(', ');
        throw new Error(`Invalid pattern type: ${patternType}. Use one of: ${validOptions}`);
    }

    // 5. Retornamos el resultado de la validación
    return pattern.test(text);
}

module.exports = validateRegex;

