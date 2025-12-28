/**
 * Generador de Contraseñas Seguras
 * 
 * Descripción: Genera contraseñas aleatorias seguras con criterios configurables.
 * Dificultad: BEGINNER
 * 
 * @param {number} length - Longitud de la contraseña (mínimo 8, máximo 128)
 * @param {Object} options - Opciones de configuración de la contraseña
 * @param {boolean} options.includeUppercase - Incluir letras mayúsculas (A-Z)
 * @param {boolean} options.includeLowercase - Incluir letras minúsculas (a-z)
 * @param {boolean} options.includeNumbers - Incluir números (0-9)
 * @param {boolean} options.includeSpecialChars - Incluir caracteres especiales (!@#$%^&*)
 * @returns {string} Contraseña generada aleatoriamente
 * 
 * Ejemplo:
 * generatePassword(12, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true})
 * // Retorna una contraseña de 12 caracteres con todos los tipos de caracteres
 */

function generatePassword(length, options = {}) {
    // TODO: Implementar la solución aquí
    
    // Pista 1: Valida que length sea un número entre 8 y 128
    
    // Pista 2: Valida que al menos una opción esté habilitada (includeUppercase, includeLowercase, includeNumbers, includeSpecialChars)
    
    // Pista 3: Define los conjuntos de caracteres disponibles:
    //   - Mayúsculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //   - Minúsculas: "abcdefghijklmnopqrstuvwxyz"
    //   - Números: "0123456789"
    //   - Especiales: "!@#$%^&*"
    
    // Pista 4: Construye un string con todos los caracteres permitidos según las opciones
    
    // Pista 5: Asegúrate de que la contraseña incluya al menos un carácter de cada tipo habilitado
    
    // Pista 6: Genera caracteres aleatorios usando Math.random() y el string de caracteres permitidos
    
    // Pista 7: Mezcla los caracteres para que no estén en orden predecible
    
    throw new Error('Función no implementada');
}

module.exports = generatePassword;

