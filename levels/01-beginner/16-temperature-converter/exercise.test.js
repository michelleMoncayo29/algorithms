const convertTemperature = require('./exercise');

describe('Convertidor de Temperaturas', () => {
    // Casos básicos - ejemplos del enunciado
    test('debe convertir Celsius a Fahrenheit correctamente', () => {
        expect(convertTemperature(32, 'celsius', 'fahrenheit')).toBe(89.6);
        expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
        expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
    });

    test('debe convertir Fahrenheit a Celsius correctamente', () => {
        expect(convertTemperature(212, 'fahrenheit', 'celsius')).toBe(100);
        expect(convertTemperature(32, 'fahrenheit', 'celsius')).toBe(0);
        expect(convertTemperature(98.6, 'fahrenheit', 'celsius')).toBe(37);
    });

    test('debe convertir Celsius a Kelvin correctamente', () => {
        expect(convertTemperature(25, 'celsius', 'kelvin')).toBe(298.15);
        expect(convertTemperature(0, 'celsius', 'kelvin')).toBe(273.15);
        expect(convertTemperature(-273.15, 'celsius', 'kelvin')).toBe(0);
    });

    test('debe convertir Kelvin a Celsius correctamente', () => {
        expect(convertTemperature(298.15, 'kelvin', 'celsius')).toBe(25);
        expect(convertTemperature(273.15, 'kelvin', 'celsius')).toBe(0);
        expect(convertTemperature(0, 'kelvin', 'celsius')).toBe(-273.15);
    });

    test('debe convertir Fahrenheit a Kelvin correctamente', () => {
        expect(convertTemperature(77, 'fahrenheit', 'kelvin')).toBe(298.15);
        expect(convertTemperature(32, 'fahrenheit', 'kelvin')).toBe(273.15);
        expect(convertTemperature(98.6, 'fahrenheit', 'kelvin')).toBe(310.15);
    });

    test('debe convertir Kelvin a Fahrenheit correctamente', () => {
        expect(convertTemperature(298.15, 'kelvin', 'fahrenheit')).toBe(77);
        expect(convertTemperature(273.15, 'kelvin', 'fahrenheit')).toBe(32);
        expect(convertTemperature(310.15, 'kelvin', 'fahrenheit')).toBe(98.6);
    });

    // Casos con temperaturas de referencia importantes
    test('debe manejar punto de congelación del agua', () => {
        expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
        expect(convertTemperature(32, 'fahrenheit', 'celsius')).toBe(0);
        expect(convertTemperature(0, 'celsius', 'kelvin')).toBe(273.15);
        expect(convertTemperature(273.15, 'kelvin', 'celsius')).toBe(0);
    });

    test('debe manejar punto de ebullición del agua', () => {
        expect(convertTemperature(100, 'celsius', 'fahrenheit')).toBe(212);
        expect(convertTemperature(212, 'fahrenheit', 'celsius')).toBe(100);
        expect(convertTemperature(100, 'celsius', 'kelvin')).toBe(373.15);
        expect(convertTemperature(373.15, 'kelvin', 'celsius')).toBe(100);
    });

    test('debe manejar temperatura corporal humana', () => {
        expect(convertTemperature(37, 'celsius', 'fahrenheit')).toBe(98.6);
        expect(convertTemperature(98.6, 'fahrenheit', 'celsius')).toBe(37);
        expect(convertTemperature(37, 'celsius', 'kelvin')).toBe(310.15);
        expect(convertTemperature(310.15, 'kelvin', 'fahrenheit')).toBe(98.6);
    });

    test('debe manejar temperatura ambiente', () => {
        expect(convertTemperature(20, 'celsius', 'fahrenheit')).toBe(68);
        expect(convertTemperature(68, 'fahrenheit', 'celsius')).toBe(20);
        expect(convertTemperature(20, 'celsius', 'kelvin')).toBe(293.15);
        expect(convertTemperature(293.15, 'kelvin', 'celsius')).toBe(20);
    });

    // Casos edge - cero absoluto
    test('debe manejar cero absoluto', () => {
        expect(convertTemperature(-273.15, 'celsius', 'kelvin')).toBe(0);
        expect(convertTemperature(0, 'kelvin', 'celsius')).toBe(-273.15);
        expect(convertTemperature(-273.15, 'celsius', 'fahrenheit')).toBe(-459.67);
        expect(convertTemperature(-459.67, 'fahrenheit', 'celsius')).toBe(-273.15);
    });

    // Casos con decimales
    test('debe manejar temperaturas con decimales', () => {
        expect(convertTemperature(25.5, 'celsius', 'fahrenheit')).toBe(77.9);
        expect(convertTemperature(77.9, 'fahrenheit', 'celsius')).toBe(25.5);
        expect(convertTemperature(25.5, 'celsius', 'kelvin')).toBe(298.65);
        expect(convertTemperature(298.65, 'kelvin', 'celsius')).toBe(25.5);
    });

    // Casos con escalas iguales
    test('debe retornar la misma temperatura cuando las escalas son iguales', () => {
        expect(convertTemperature(25, 'celsius', 'celsius')).toBe(25);
        expect(convertTemperature(77, 'fahrenheit', 'fahrenheit')).toBe(77);
        expect(convertTemperature(298.15, 'kelvin', 'kelvin')).toBe(298.15);
    });

    // Casos con case-insensitive
    test('debe manejar escalas con diferentes casos', () => {
        expect(convertTemperature(25, 'CELSIUS', 'fahrenheit')).toBe(77);
        expect(convertTemperature(77, 'Fahrenheit', 'celsius')).toBe(25);
        expect(convertTemperature(298.15, 'kelvin', 'CELSIUS')).toBe(25);
        expect(convertTemperature(25, 'Celsius', 'KELVIN')).toBe(298.15);
    });

    // Casos de validación - escalas inválidas
    test('debe retornar null para escalas inválidas', () => {
        expect(convertTemperature(25, 'invalid', 'fahrenheit')).toBe(null);
        expect(convertTemperature(25, 'celsius', 'invalid')).toBe(null);
        expect(convertTemperature(25, 'invalid', 'invalid')).toBe(null);
        expect(convertTemperature(25, '', 'fahrenheit')).toBe(null);
        expect(convertTemperature(25, 'celsius', '')).toBe(null);
    });

    // Casos de validación - Kelvin negativo
    test('debe retornar null para temperaturas Kelvin negativas', () => {
        expect(convertTemperature(-1, 'kelvin', 'celsius')).toBe(null);
        expect(convertTemperature(-10, 'kelvin', 'fahrenheit')).toBe(null);
        expect(convertTemperature(-273.16, 'kelvin', 'celsius')).toBe(null);
    });

    // Casos con temperaturas extremas pero válidas
    test('debe manejar temperaturas extremas válidas', () => {
        expect(convertTemperature(1000, 'celsius', 'fahrenheit')).toBe(1832);
        expect(convertTemperature(1832, 'fahrenheit', 'celsius')).toBe(1000);
        expect(convertTemperature(1000, 'celsius', 'kelvin')).toBe(1273.15);
        expect(convertTemperature(1273.15, 'kelvin', 'celsius')).toBe(1000);
    });

    // Casos con redondeo
    test('debe redondear correctamente a 2 decimales', () => {
        expect(convertTemperature(33.333, 'celsius', 'fahrenheit')).toBe(92);
        expect(convertTemperature(92, 'fahrenheit', 'celsius')).toBe(33.33);
        expect(convertTemperature(33.333, 'celsius', 'kelvin')).toBe(306.48);
        expect(convertTemperature(306.483, 'kelvin', 'celsius')).toBe(33.33);
    });

    // Casos con valores cero
    test('debe manejar valores cero correctamente', () => {
        expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
        expect(convertTemperature(0, 'fahrenheit', 'celsius')).toBe(-17.78);
        expect(convertTemperature(0, 'celsius', 'kelvin')).toBe(273.15);
        expect(convertTemperature(0, 'kelvin', 'celsius')).toBe(-273.15);
    });

    // Casos con temperaturas negativas válidas
    test('debe manejar temperaturas negativas válidas', () => {
        expect(convertTemperature(-40, 'celsius', 'fahrenheit')).toBe(-40);
        expect(convertTemperature(-40, 'fahrenheit', 'celsius')).toBe(-40);
        expect(convertTemperature(-40, 'celsius', 'kelvin')).toBe(233.15);
        expect(convertTemperature(233.15, 'kelvin', 'celsius')).toBe(-40);
    });
});
