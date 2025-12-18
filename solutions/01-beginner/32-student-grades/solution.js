/**
 * Solución: Sistema de Calificaciones para Estudiante
 * 
 * Esta implementación muestra cómo crear una clase Student que gestiona
 * calificaciones de múltiples materias usando objetos anidados y cálculos complejos.
 */

class Student {
    /**
     * Constructor de la clase Student
     * Traducción: Constructor de Estudiante
     *
     * Crea un nuevo estudiante con nombre e ID, y inicializa un objeto vacío
     * para almacenar las calificaciones por materia.
     */
    constructor(name, studentId) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Student name is required');
        }

        // Valida que el ID sea un string no vacío
        if (typeof studentId !== 'string' || studentId.trim().length === 0) {
            throw new Error('Student ID is required');
        }

        // Asigna los valores validados
        this.name = name.trim();
        this.studentId = studentId.trim();
        
        // Inicializa el objeto grades vacío
        this.grades = {};
    }

    /**
     * Agrega una calificación a una materia específica.
     * Traducción: Agregar Calificación
     *
     * Agrega una calificación al array de calificaciones de la materia especificada.
     * Si la materia no existe, crea un nuevo array para esa materia.
     */
    addGrade(subject, grade) {
        // Valida que el nombre de la materia sea un string no vacío
        if (typeof subject !== 'string' || subject.trim().length === 0) {
            throw new Error('Subject name is required');
        }

        // Valida que la calificación sea un número entre 0 y 100
        if (typeof grade !== 'number' || grade < 0 || grade > 100) {
            throw new Error('Grade must be a number between 0 and 100');
        }

        // Si la materia no existe, crea un array vacío para esa materia
        if (!this.grades[subject]) {
            this.grades[subject] = [];
        }

        // Agrega la calificación al array de esa materia
        this.grades[subject].push(grade);

        // Retorna el número total de calificaciones de esa materia
        return this.grades[subject].length;
    }

    /**
     * Calcula el promedio general de todas las calificaciones usando reduce().
     * Traducción: Obtener Promedio General
     *
     * Calcula el promedio de todas las calificaciones de todas las materias.
     */
    getAverage() {
        // Obtiene todos los arrays de calificaciones
        const allGradesArrays = Object.values(this.grades);
        
        // Si no hay calificaciones, retorna 0
        if (allGradesArrays.length === 0) {
            return 0;
        }

        // Aplana los arrays para tener un solo array con todas las calificaciones
        const allGrades = allGradesArrays.flat();

        // Si no hay calificaciones después de aplanar, retorna 0
        if (allGrades.length === 0) {
            return 0;
        }

        // Usa reduce() para sumar todas las calificaciones
        const sum = allGrades.reduce((acc, grade) => acc + grade, 0);

        // Calcula el promedio y lo formatea a 2 decimales
        const average = sum / allGrades.length;
        return parseFloat(average.toFixed(2));
    }

    /**
     * Calcula el promedio de una materia específica usando reduce().
     * Traducción: Obtener Promedio por Materia
     *
     * Calcula el promedio de las calificaciones de una materia específica.
     */
    getAverageBySubject(subject) {
        // Verifica si la materia existe
        if (!this.grades[subject] || this.grades[subject].length === 0) {
            return 0;
        }

        // Usa reduce() para sumar todas las calificaciones de esa materia
        const sum = this.grades[subject].reduce((acc, grade) => acc + grade, 0);

        // Calcula el promedio y lo formatea a 2 decimales
        const average = sum / this.grades[subject].length;
        return parseFloat(average.toFixed(2));
    }

    /**
     * Obtiene todas las calificaciones de una materia específica.
     * Traducción: Obtener Calificaciones por Materia
     *
     * Retorna un nuevo array con todas las calificaciones de la materia especificada.
     */
    getGradesBySubject(subject) {
        // Si la materia no existe, retorna un array vacío
        if (!this.grades[subject]) {
            return [];
        }

        // Retorna una copia del array para no mutar el original
        return [...this.grades[subject]];
    }

    /**
     * Determina si el estudiante ha aprobado basándose en su promedio general.
     * Traducción: Ha Aprobado
     *
     * Calcula el promedio general y lo compara con la nota mínima requerida.
     */
    hasPassed(minGrade = 70) {
        // Si no hay calificaciones, retorna false
        const allGradesArrays = Object.values(this.grades);
        if (allGradesArrays.length === 0 || allGradesArrays.flat().length === 0) {
            return false;
        }

        // Calcula el promedio general
        const average = this.getAverage();

        // Retorna true si el promedio es mayor o igual a minGrade
        return average >= minGrade;
    }

    /**
     * Obtiene la materia con el mejor promedio usando Object.keys().
     * Traducción: Obtener Mejor Materia
     *
     * Encuentra la materia que tiene el promedio más alto.
     */
    getBestSubject() {
        // Obtiene todas las materias usando Object.keys()
        const subjects = Object.keys(this.grades);

        // Si no hay materias, retorna null
        if (subjects.length === 0) {
            return null;
        }

        // Inicializa la mejor materia y su promedio
        let bestSubject = subjects[0];
        let bestAverage = this.getAverageBySubject(bestSubject);

        // Itera sobre las demás materias para encontrar la mejor
        for (let i = 1; i < subjects.length; i++) {
            const subject = subjects[i];
            const average = this.getAverageBySubject(subject);
            
            // Si esta materia tiene un promedio mayor, actualiza la mejor
            if (average > bestAverage) {
                bestSubject = subject;
                bestAverage = average;
            }
        }

        return bestSubject;
    }

    /**
     * Cuenta el número de materias distintas en las que el estudiante tiene calificaciones.
     * Traducción: Obtener Cantidad de Materias
     *
     * Retorna el número de materias diferentes que tienen al menos una calificación.
     */
    getSubjectCount() {
        // Usa Object.keys() para obtener todas las materias y retorna el número
        return Object.keys(this.grades).length;
    }
}

module.exports = {
    Student
};

