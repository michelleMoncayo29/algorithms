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
    
    // Pista 1: Crea un objeto para almacenar los resultados de cada validación
    
    // Pista 2: Verifica la longitud mínima (>= 8 caracteres)
    
    // Pista 3: Verifica si tiene al menos una letra mayúscula (A-Z)
    
    // Pista 4: Verifica si tiene al menos una letra minúscula (a-z)
    
    // Pista 5: Verifica si tiene al menos un número (0-9)
    
    // Pista 6: Verifica si tiene al menos un carácter especial (!@#$%^&*)
    
    // Pista 7: Calcula el score sumando los criterios cumplidos (máximo 5)
    
    // Pista 8: Determina si es válida (todos los criterios cumplidos)
    
    throw new Error('Función no implementada');
}

module.exports = validatePassword;
