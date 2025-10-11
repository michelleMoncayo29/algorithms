const binarySearch = require('./exercise');

describe('Binary Search', () => {
    // Casos básicos
    test('debe encontrar el elemento en el array', () => {
        expect(binarySearch([-1, 0, 3, 5, 9, 12], 9)).toBe(4);
    });

    test('debe devolver -1 si el elemento no existe', () => {
        expect(binarySearch([-1, 0, 3, 5, 9, 12], 2)).toBe(-1);
    });

    test('debe manejar array de un elemento', () => {
        expect(binarySearch([5], 5)).toBe(0);
        expect(binarySearch([5], -5)).toBe(-1);
    });

    // Casos edge
    test('debe manejar array de dos elementos', () => {
        expect(binarySearch([1, 2], 1)).toBe(0);
        expect(binarySearch([1, 2], 2)).toBe(1);
        expect(binarySearch([1, 2], 3)).toBe(-1);
    });

    test('debe manejar elemento al inicio del array', () => {
        expect(binarySearch([-1, 0, 3, 5, 9, 12], -1)).toBe(0);
    });

    test('debe manejar elemento al final del array', () => {
        expect(binarySearch([-1, 0, 3, 5, 9, 12], 12)).toBe(5);
    });

    // Casos adicionales
    test('debe manejar array con elementos duplicados', () => {
        expect(binarySearch([1, 2, 2, 2, 3], 2)).toBe(2);
    });

    test('debe manejar array con números negativos', () => {
        expect(binarySearch([-5, -3, -1, 0, 2, 4], -3)).toBe(1);
    });

    test('debe manejar array grande', () => {
        const largeArray = Array.from({ length: 1000 }, (_, i) => i);
        expect(binarySearch(largeArray, 500)).toBe(500);
        expect(binarySearch(largeArray, 1000)).toBe(-1);
    });
});
