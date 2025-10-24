/**
 * SOLUCIÓN: Calculadora de Notas
 * 
 * Esta es la solución completa para el ejercicio de calculadora de notas.
 * La función calcula el promedio de un conjunto de notas y determina la calificación correspondiente.
 * 
 * @param {number[]} grades - Array de notas (0-100)
 * @returns {Object} Objeto con average, grade e isValid
 */

function calculateGrade(grades) {
    // 1. Validar que el array no esté vacío
    if (!grades || grades.length === 0) {
        return {
            average: null,
            grade: null,
            isValid: false
        };
    }

    // 2. Validar que todas las notas estén en el rango válido (0-100)
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] < 0 || grades[i] > 100) {
            return {
                average: null,
                grade: null,
                isValid: false
            };
        }
    }

    // 3. Calcular el promedio
    // Sumamos todas las notas y dividimos por la cantidad
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }
    const average = sum / grades.length;

    // 4. Determinar la calificación basada en el promedio
    let grade;
    if (average >= 90) {
        grade = 'A';
    } else if (average >= 80) {
        grade = 'B';
    } else if (average >= 70) {
        grade = 'C';
    } else if (average >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // 5. Devolver el resultado
    return {
        average: average,
        grade: grade,
        isValid: true
    };
}

// Versión alternativa usando métodos de array (más concisa)
function calculateGradeAlternative(grades) {
    // Validar array vacío
    if (!grades || grades.length === 0) {
        return { average: null, grade: null, isValid: false };
    }

    // Validar que todas las notas estén en el rango válido
    const hasInvalidGrade = grades.some(grade => grade < 0 || grade > 100);
    if (hasInvalidGrade) {
        return { average: null, grade: null, isValid: false };
    }

    // Calcular promedio usando reduce
    const sum = grades.reduce((total, grade) => total + grade, 0);
    const average = sum / grades.length;

    // Determinar calificación
    const getGrade = (avg) => {
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        return 'F';
    };

    return {
        average: average,
        grade: getGrade(average),
        isValid: true
    };
}

module.exports = calculateGrade;
