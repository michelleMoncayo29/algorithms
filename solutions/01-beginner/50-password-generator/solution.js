/**
 * SOLUCIÓN: Generador de Contraseñas Seguras
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function generatePassword(length, options = {}) {
    // Validar que length sea un número entre 8 y 128
    if (typeof length !== 'number' || !Number.isInteger(length) || length < 8 || length > 128) {
        throw new Error('Length must be an integer between 8 and 128');
    }

    // Extraer opciones con valores por defecto
    const {
        includeUppercase = false,
        includeLowercase = false,
        includeNumbers = false,
        includeSpecialChars = false
    } = options;

    // Validar que al menos una opción esté habilitada
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars) {
        throw new Error('At least one character type must be enabled');
    }

    // Definir los conjuntos de caracteres disponibles
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';

    // Construir el conjunto de caracteres permitidos según las opciones
    let allowedChars = '';
    if (includeUppercase) allowedChars += uppercase;
    if (includeLowercase) allowedChars += lowercase;
    if (includeNumbers) allowedChars += numbers;
    if (includeSpecialChars) allowedChars += specialChars;

    // Asegurar que la contraseña incluya al menos un carácter de cada tipo habilitado
    const password = [];
    
    if (includeUppercase) {
        password.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
    }
    if (includeLowercase) {
        password.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
    }
    if (includeNumbers) {
        password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (includeSpecialChars) {
        password.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
    }

    // Completar el resto de la longitud con caracteres aleatorios
    const remainingLength = length - password.length;
    for (let i = 0; i < remainingLength; i++) {
        password.push(allowedChars[Math.floor(Math.random() * allowedChars.length)]);
    }

    // Mezclar los caracteres para que no estén en orden predecible (Fisher-Yates)
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

module.exports = generatePassword;

