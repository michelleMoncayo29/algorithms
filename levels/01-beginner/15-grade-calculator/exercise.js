/**
 * Calculadora de Notas
 *
 * Descripción: Calcula el promedio de un conjunto de notas y determina la calificación correspondiente.
 * También valida que las notas estén en el rango válido (0-100).
 * Dificultad: BEGINNER
 *
 * @param {number[]} grades - Array de notas (0-100)
 * @returns {Object} Objeto con average, grade e isValid
 *
 * Ejemplo:
 * calculateGrade([85, 92, 78, 96]) // {average: 87.75, grade: 'B', isValid: true}
 */

function isValidGrade(grade) {
  let sum = grade[0];
  for (let i = 1; i < grade.length; i++) {
    const element = grade[i];
    sum += element;
  }

  let result = sum / grade.length;
  return result;
}

function isValid(notes) {
    for (const note of notes) {
        if (note < 0 || note > 100) {
            return false;
        }
    }

    return true;
}

console.log(isValid([0, 50, 100]));

function calculateGrade(grades) {
  // TODO: Implementar la solución aquí
  const result = {
    average: 0,
    grade: '',
    isValid: false,
  };

  if (!Array.isArray(grades) || grades.length === 0) {
    return { average: null, grade: null, isValid: false };
    }
    
    if (!isValid(grades)) {
        result.average = null;
        result.grade = null;
        result.isValid = false;

        return result;
    } else {       
        const average = isValidGrade(grades);
        result.average = average;
      
        switch (true) {
          case average >= 90 && average <= 100:
            result.grade = 'A';
            break;
          case average >= 80 && average < 90:
            result.grade = 'B';
            break;
          case average >= 70 && average < 80:
            result.grade = 'C';
            break;
          case average >= 60 && average < 70:
            result.grade = 'D';
            break;
          case average < 60:
            result.grade = 'F';
            break;
          default:
            result.grade = null;
        }
      
        if (average >= 0 || average <= 100) {
          result.isValid = true;
        }
      
        // Pista 1: Primero valida que el array no esté vacío
        // Pista 2: Valida que todas las notas estén en el rango 0-100
        // Pista 3: Calcula el promedio sumando todas las notas y dividiendo por la cantidad
        // Pista 4: Determina la calificación basada en el promedio:
        //          A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59
      
        return result;
    }

}
// console.log(calculateGrade([85, 105, 78])); 
console.log(calculateGrade([0, 50, 100])); 
module.exports = calculateGrade;
