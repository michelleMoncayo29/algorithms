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

function isValidLength(password) {
  return password.length >= 8;
}

function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

function hasLowercase(password) {
  return /[a-z]/.test(password);
}

function hasNumbers(password) {
  return /[0-9]/.test(password);
}

function hasSpecialChars(password) {
  return /[!@#$%^&*]/.test(password);
}

function validatePassword(password) {
  let count = 0;

  const result = {
    isValid: false,
    length: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSpecialChars: false,
    score: count,
  };

  if (isValidLength(password)) {
    result.length = true;
    count++;
  }

  if (hasUppercase(password)) {
    result.hasUppercase = true;
    count++;
  }

  if (hasLowercase(password)) {
    result.hasLowercase = true;
    count++;
  }

  if (hasNumbers(password)) {
    result.hasNumbers = true;
    count++;
  }

  if (hasSpecialChars(password)) {
    result.hasSpecialChars = true;
    count++;
  }

  result.score = count;

  if (count === 5) {
    result.isValid = true;
  }

  return result;
}

// console.log(validatePassword("Password123!"));
module.exports = validatePassword;
