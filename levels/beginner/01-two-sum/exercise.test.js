const twoSum = require('./exercise');

describe('Two Sum', () => {
    // Casos básicos
    test('debe encontrar los índices correctos para el ejemplo básico', () => {
        expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });

    test('debe manejar el segundo ejemplo', () => {
        expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    });

    // Casos edge
    test('debe manejar números duplicados', () => {
        expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });

    test('debe manejar números negativos', () => {
        expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
    });

    test('debe manejar números positivos y negativos', () => {
        expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
    });

    // Casos adicionales
    test('debe manejar array con muchos elementos', () => {
        expect(twoSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19)).toEqual([8, 9]);
    });

    test('debe manejar números grandes', () => {
        expect(twoSum([1000000000, 1000000000], 2000000000)).toEqual([0, 1]);
    });
});
