const calculateGrade = require('./exercise');

describe('Calculadora de Notas', () => {
    // Casos básicos - ejemplos del enunciado
    test('debe calcular correctamente el promedio y calificación para notas válidas', () => {
        const result = calculateGrade([85, 92, 78, 96]);
        expect(result).toEqual({
            average: 87.75,
            grade: 'B',
            isValid: true
        });
    });

    test('debe devolver calificación A para promedio alto', () => {
        const result = calculateGrade([95, 98, 92, 89]);
        expect(result).toEqual({
            average: 93.5,
            grade: 'A',
            isValid: true
        });
    });

    test('debe devolver calificación F para promedio bajo', () => {
        const result = calculateGrade([45, 52, 38, 41]);
        expect(result).toEqual({
            average: 44,
            grade: 'F',
            isValid: true
        });
    });

    // Casos adicionales para diferentes calificaciones
    test('debe devolver calificación B para promedio 84', () => {
        const result = calculateGrade([75, 82, 88, 91]);
        expect(result).toEqual({
            average: 84,
            grade: 'B',
            isValid: true
        });
    });

    test('debe devolver calificación C para promedio 75', () => {
        const result = calculateGrade([70, 75, 80, 75]);
        expect(result).toEqual({
            average: 75,
            grade: 'C',
            isValid: true
        });
    });

    test('debe devolver calificación D para promedio 65', () => {
        const result = calculateGrade([65, 70, 68, 72]);
        expect(result).toEqual({
            average: 68.75,
            grade: 'D',
            isValid: true
        });
    });

    // Casos edge - límites de calificaciones
    test('debe devolver A para promedio exacto 90', () => {
        const result = calculateGrade([90, 90, 90, 90]);
        expect(result).toEqual({
            average: 90,
            grade: 'A',
            isValid: true
        });
    });

    test('debe devolver B para promedio exacto 80', () => {
        const result = calculateGrade([80, 80, 80, 80]);
        expect(result).toEqual({
            average: 80,
            grade: 'B',
            isValid: true
        });
    });

    test('debe devolver C para promedio exacto 70', () => {
        const result = calculateGrade([70, 70, 70, 70]);
        expect(result).toEqual({
            average: 70,
            grade: 'C',
            isValid: true
        });
    });

    test('debe devolver D para promedio exacto 60', () => {
        const result = calculateGrade([60, 60, 60, 60]);
        expect(result).toEqual({
            average: 60,
            grade: 'D',
            isValid: true
        });
    });

    test('debe devolver F para promedio exacto 59', () => {
        const result = calculateGrade([59, 59, 59, 59]);
        expect(result).toEqual({
            average: 59,
            grade: 'F',
            isValid: true
        });
    });

    // Casos edge - valores límite
    test('debe manejar nota mínima válida (0)', () => {
        const result = calculateGrade([0, 50, 100]);
        expect(result).toEqual({
            average: 50,
            grade: 'F',
            isValid: true
        });
    });

    test('debe manejar nota máxima válida (100)', () => {
        const result = calculateGrade([100, 50, 0]);
        expect(result).toEqual({
            average: 50,
            grade: 'F',
            isValid: true
        });
    });

    // Casos de validación - notas inválidas
    test('debe detectar nota mayor a 100 como inválida', () => {
        const result = calculateGrade([85, 105, 78]);
        expect(result).toEqual({
            average: null,
            grade: null,
            isValid: false
        });
    });

    test('debe detectar nota negativa como inválida', () => {
        const result = calculateGrade([85, -5, 78]);
        expect(result).toEqual({
            average: null,
            grade: null,
            isValid: false
        });
    });

    test('debe detectar múltiples notas inválidas', () => {
        const result = calculateGrade([85, 105, -5, 78]);
        expect(result).toEqual({
            average: null,
            grade: null,
            isValid: false
        });
    });

    // Casos edge - arrays especiales
    test('debe manejar array vacío', () => {
        const result = calculateGrade([]);
        expect(result).toEqual({
            average: null,
            grade: null,
            isValid: false
        });
    });

    test('debe manejar array con una sola nota válida', () => {
        const result = calculateGrade([85]);
        expect(result).toEqual({
            average: 85,
            grade: 'B',
            isValid: true
        });
    });

    test('debe manejar array con una sola nota inválida', () => {
        const result = calculateGrade([105]);
        expect(result).toEqual({
            average: null,
            grade: null,
            isValid: false
        });
    });

    // Casos adicionales para validar lógica
    test('debe calcular correctamente con decimales', () => {
        const result = calculateGrade([83, 87, 91, 79]);
        expect(result).toEqual({
            average: 85,
            grade: 'B',
            isValid: true
        });
    });

    test('debe manejar notas con decimales', () => {
        const result = calculateGrade([85.5, 92.3, 78.7, 96.1]);
        expect(result.average).toBeCloseTo(88.15, 2);
        expect(result.grade).toBe('B');
        expect(result.isValid).toBe(true);
    });
});
