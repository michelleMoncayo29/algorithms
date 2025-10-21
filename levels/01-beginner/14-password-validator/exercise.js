/**
 * Validador de Contraseñas
 * 
 * Descripción: Valida si una contraseña cumple con los requisitos de seguridad básicos.
 * Dificultad: BEGINNER
 * 
 * @param {string} password - Contraseña a validar
 * @returns {Object} Objeto con información detallada sobre la validez
 * 
 * Ejemplo:
 * validatePassword("Password123!") // {isValid: true, length: true, hasUppercase: true, ...}
 */

function validatePassword(password) {
    // TODO: Implementar la solución aquí

    let count = 0;

    const result = {
        length: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isValid: false,
        score: count,
    };

    if (password.length >= 8) {
        result.length = true;
        count++;
    }

    if (/[A-Z]/.test(password)) {
        result.hasUppercase = true;
        count++;
    }

    if (/[a-z]/.test(password)) {
        result.hasLowercase = true;
        count++;
    }

    if (/[0-9]/.test(password)) {
        result.hasNumber = true;
        count++;
    }

    if (/[!@#$%^&*]/.test(password)) {
        result.hasSpecialChar = true;
        count++;
    }

    result.score = count;

    if (count >= 3) {
        result.isValid = true;
    }
    // Pista 1: Crea un objeto para almacenar los resultados de cada validación
    
    // Pista 2: Verifica la longitud mínima (>= 8 caracteres)
    
    // Pista 3: Verifica si tiene al menos una letra mayúscula (A-Z)
    
    // Pista 4: Verifica si tiene al menos una letra minúscula (a-z)
    
    // Pista 5: Verifica si tiene al menos un número (0-9)
    
    // Pista 6: Verifica si tiene al menos un carácter especial (!@#$%^&*)
    
    // Pista 7: Calcula el score sumando los criterios cumplidos (máximo 5)
    
    // Pista 8: Determina si es válida (todos los criterios cumplidos)
    
    return result;

    throw new Error('Función no implementada');
}

console.log(validatePassword("Password123!")); // {isValid: true, length: true, hasUppercase: true, hasLowercase: true, hasNumber: true, hasSpecialChar: true, score: 5}


module.exports = validatePassword;
