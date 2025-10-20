/**
 * SOLUCIÓN: Calculadora de Edad en Días
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function calculateAgeInDays(birthYear) {
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    
    // Si el año de nacimiento es mayor o igual al actual, devolver 0
    if (birthYear >= currentYear) {
        return 0;
    }
    
    let totalDays = 0;
    
    // Iterar desde el año de nacimiento hasta el año actual (exclusivo)
    for (let year = birthYear; year < currentYear; year++) {
        if (isLeapYear(year)) {
            totalDays += 366; // Año bisiesto tiene 366 días
        } else {
            totalDays += 365; // Año normal tiene 365 días
        }
    }
    
    return totalDays;
}

/**
 * Función auxiliar para determinar si un año es bisiesto
 * @param {number} year - Año a verificar
 * @returns {boolean} - true si es bisiesto, false si no
 */
function isLeapYear(year) {
    // Un año es bisiesto si:
    // 1. Es divisible por 4 Y no es divisible por 100, O
    // 2. Es divisible por 400
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

module.exports = calculateAgeInDays;

// Ejemplo de uso:
// console.log(calculateAgeInDays(1990)); // Aproximadamente 12410 días
// console.log(calculateAgeInDays(2000)); // Aproximadamente 8760 días
