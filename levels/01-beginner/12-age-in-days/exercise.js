/**
 * Calculadora de Edad en Días
 *
 * Descripción: Calcula cuántos días ha vivido una persona desde su nacimiento hasta hoy.
 * Dificultad: BEGINNER
 *
 * @param {number} birthYear - Año de nacimiento
 * @returns {number} Número total de días vividos
 *
 * Ejemplo:
 * calculateAgeInDays(1990) // Aproximadamente 12410 días (depende del año actual)
 */

// Determina si un año es bisiesto
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function calculateAgeInDays(birthYear) {
  const currentYear = new Date().getFullYear();
  let totalDays = 0;

  for (let year = birthYear; year < currentYear; year++) {
    if (isLeapYear(year)) {
      totalDays += 366;
    } else {
      totalDays += 365;
    }
  }

  return totalDays;
}

module.exports = calculateAgeInDays;
