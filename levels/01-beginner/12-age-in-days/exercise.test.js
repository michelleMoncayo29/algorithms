const calculateAgeInDays = require('./exercise');

describe('Calculadora de Edad en Días', () => {
    // Función auxiliar para calcular días esperados
    function calculateExpectedDays(birthYear) {
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
    
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Casos básicos
    test('debe calcular correctamente la edad en días para nacimiento en 1990', () => {
        const result = calculateAgeInDays(1990);
        const expected = calculateExpectedDays(1990);
        expect(result).toBe(expected);
    });

    test('debe calcular correctamente la edad en días para nacimiento en 2000', () => {
        const result = calculateAgeInDays(2000);
        const expected = calculateExpectedDays(2000);
        expect(result).toBe(expected);
    });

    test('debe calcular correctamente la edad en días para nacimiento en 2010', () => {
        const result = calculateAgeInDays(2010);
        const expected = calculateExpectedDays(2010);
        expect(result).toBe(expected);
    });

    // Casos edge
    test('debe manejar nacimiento en año bisiesto', () => {
        const result = calculateAgeInDays(2000); // Año bisiesto
        const expected = calculateExpectedDays(2000);
        expect(result).toBe(expected);
    });

    test('debe manejar nacimiento en año no bisiesto', () => {
        const result = calculateAgeInDays(2001); // Año no bisiesto
        const expected = calculateExpectedDays(2001);
        expect(result).toBe(expected);
    });

    test('debe manejar nacimiento reciente', () => {
        const currentYear = new Date().getFullYear();
        const recentYear = currentYear - 2;
        const result = calculateAgeInDays(recentYear);
        const expected = calculateExpectedDays(recentYear);
        expect(result).toBe(expected);
    });

    // Casos adicionales
    test('debe manejar nacimiento hace muchos años', () => {
        const result = calculateAgeInDays(1950);
        const expected = calculateExpectedDays(1950);
        expect(result).toBe(expected);
    });

    test('debe devolver 0 para el año actual', () => {
        const currentYear = new Date().getFullYear();
        const result = calculateAgeInDays(currentYear);
        expect(result).toBe(0);
    });

    test('debe manejar años bisiestos especiales (divisibles por 100 pero no por 400)', () => {
        // 1900 no es bisiesto (divisible por 100 pero no por 400)
        const result = calculateAgeInDays(1900);
        const expected = calculateExpectedDays(1900);
        expect(result).toBe(expected);
    });

    test('debe manejar años bisiestos especiales (divisibles por 400)', () => {
        // 2000 es bisiesto (divisible por 400)
        const result = calculateAgeInDays(2000);
        const expected = calculateExpectedDays(2000);
        expect(result).toBe(expected);
    });
});
