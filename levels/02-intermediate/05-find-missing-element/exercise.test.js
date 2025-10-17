const findMissingElement = require('./exercise');

describe('Encontrar el Elemento Faltante', () => {
    test('debe encontrar el elemento faltante en el medio', () => {
        expect(findMissingElement([1, 2, 4, 5])).toBe(3);
        expect(findMissingElement([1, 3, 4, 5, 6])).toBe(2);
        expect(findMissingElement([1, 2, 3, 5, 6, 7])).toBe(4);
    });

    test('debe encontrar el elemento faltante al inicio', () => {
        expect(findMissingElement([2, 3, 4, 5, 6])).toBe(1);
        expect(findMissingElement([2, 3, 4, 5])).toBe(1);
        expect(findMissingElement([3, 4, 5, 6, 7])).toBe(1);
    });

    test('debe encontrar el elemento faltante al final', () => {
        expect(findMissingElement([1, 2, 3, 4, 6])).toBe(5);
        expect(findMissingElement([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(10);
        expect(findMissingElement([1, 2, 3, 4])).toBe(5);
    });

    test('debe manejar arrays pequeños', () => {
        expect(findMissingElement([2])).toBe(1);
        expect(findMissingElement([1])).toBe(2);
        expect(findMissingElement([1, 3])).toBe(2);
    });

    test('debe manejar arrays más grandes', () => {
        expect(findMissingElement([1, 2, 3, 4, 5, 6, 7, 8, 10])).toBe(9);
        expect(findMissingElement([2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(1);
        expect(findMissingElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 11])).toBe(10);
    });

    test('debe manejar secuencias no ordenadas', () => {
        expect(findMissingElement([5, 1, 4, 2])).toBe(3);
        expect(findMissingElement([3, 1, 2, 5, 6])).toBe(4);
        expect(findMissingElement([6, 2, 4, 1, 3])).toBe(5);
    });

    test('debe manejar números negativos si están en secuencia', () => {
        expect(findMissingElement([-1, 0, 1, 3])).toBe(2);
        expect(findMissingElement([-2, -1, 0, 2])).toBe(1);
    });
});
