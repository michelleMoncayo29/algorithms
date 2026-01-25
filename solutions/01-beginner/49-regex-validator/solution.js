/**
 * SOLUCIÓN: Validador de Expresiones Regulares
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function validateRegex(text, patternType) {
    // Validar que text sea un string
    if (typeof text !== 'string') {
        throw new Error('Text must be a string');
    }

    // Validar que patternType sea un string
    if (typeof patternType !== 'string') {
        throw new Error('Pattern type must be a string');
    }

    // Definir patrones regex para cada tipo
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\d{3}[-.\s]?|\(\d{3}\)\s?)\d{3}[-.\s]?\d{4}$/,
        postalCode: /^\d{5}(-\d{4})?$/,
        url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
        date: /^(\d{1,2}\/\d{1,2}\/\d{4})$/
    };

    // Validar que patternType sea uno de los tipos permitidos
    if (!patterns.hasOwnProperty(patternType)) {
        throw new Error(`Invalid pattern type: ${patternType}. Must be one of: email, phone, postalCode, url, date`);
    }

    // Obtener el patrón correspondiente
    const pattern = patterns[patternType];

    // Usar el método test() de la expresión regular para validar el texto
    return pattern.test(text);
}

module.exports = validateRegex;

