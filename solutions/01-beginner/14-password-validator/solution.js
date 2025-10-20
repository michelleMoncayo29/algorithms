/**
 * SOLUCIÓN: Validador de Contraseñas
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function validatePassword(password) {
    // Verificar longitud mínima (8 caracteres)
    const length = password.length >= 8;
    
    // Verificar si tiene al menos una letra mayúscula
    let hasUppercase = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUppercase = true;
            break;
        }
    }
    
    // Verificar si tiene al menos una letra minúscula
    let hasLowercase = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'a' && password[i] <= 'z') {
            hasLowercase = true;
            break;
        }
    }
    
    // Verificar si tiene al menos un número
    let hasNumbers = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumbers = true;
            break;
        }
    }
    
    // Verificar si tiene al menos un carácter especial
    let hasSpecialChars = false;
    const specialChars = '!@#$%^&*';
    for (let i = 0; i < password.length; i++) {
        if (specialChars.includes(password[i])) {
            hasSpecialChars = true;
            break;
        }
    }
    
    // Calcular score (suma de criterios cumplidos)
    let score = 0;
    if (length) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;
    
    // Determinar si es válida (todos los criterios cumplidos)
    const isValid = length && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars;
    
    return {
        isValid,
        length,
        hasUppercase,
        hasLowercase,
        hasNumbers,
        hasSpecialChars,
        score
    };
}

module.exports = validatePassword;

// Ejemplo de uso:
// console.log(validatePassword("Password123!"));
// // Output: {isValid: true, length: true, hasUppercase: true, hasLowercase: true, hasNumbers: true, hasSpecialChars: true, score: 5}
//
// console.log(validatePassword("weak"));
// // Output: {isValid: false, length: false, hasUppercase: false, hasLowercase: true, hasNumbers: false, hasSpecialChars: false, score: 1}
