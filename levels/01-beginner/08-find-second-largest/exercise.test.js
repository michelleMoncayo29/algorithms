const findSecondLargest = require('./exercise');

describe('Find Second Largest', () => {
    
    test('debe encontrar el segundo más grande en array básico', () => {
        expect(findSecondLargest([3, 7, 2, 9, 1])).toBe(7);
        expect(findSecondLargest([1, 3, 2, 5, 4])).toBe(4);
        expect(findSecondLargest([10, 5, 8, 3, 6])).toBe(8);
    });

    test('debe manejar arrays con elementos repetidos', () => {
        expect(findSecondLargest([5, 5, 4, 2])).toBe(4);
        expect(findSecondLargest([2, 2, 1])).toBe(1);
        expect(findSecondLargest([10, 10, 10, 5])).toBe(5);
        expect(findSecondLargest([7, 7, 7, 3, 1])).toBe(3);
    });

    test('debe retornar null cuando todos los elementos son iguales', () => {
        expect(findSecondLargest([9, 9, 9])).toBe(null);
        expect(findSecondLargest([5, 5])).toBe(null);
        expect(findSecondLargest([0, 0, 0, 0])).toBe(null);
    });

    test('debe retornar null con menos de 2 elementos únicos', () => {
        expect(findSecondLargest([42])).toBe(null);
        expect(findSecondLargest([])).toBe(null);
    });

    test('debe manejar números negativos', () => {
        expect(findSecondLargest([-3, -7, -2, -9, -1])).toBe(-2);
        expect(findSecondLargest([-5, -1, -3])).toBe(-3);
        expect(findSecondLargest([0, -1, 5, 0, -3])).toBe(0);
    });

    test('debe manejar arrays de solo dos elementos', () => {
        expect(findSecondLargest([1, 2])).toBe(1);
        expect(findSecondLargest([5, 3])).toBe(3);
        expect(findSecondLargest([-2, -1])).toBe(-2);
    });

    test('debe manejar arrays con ceros', () => {
        expect(findSecondLargest([0, 1, 2])).toBe(1);
        expect(findSecondLargest([0, 0, 1])).toBe(0);
        expect(findSecondLargest([5, 0, 3])).toBe(3);
    });

    test('debe manejar arrays ordenados', () => {
        expect(findSecondLargest([1, 2, 3, 4, 5])).toBe(4);
        expect(findSecondLargest([5, 4, 3, 2, 1])).toBe(4);
        expect(findSecondLargest([1, 3, 5, 7, 9])).toBe(7);
    });

    test('debe manejar arrays con números grandes', () => {
        expect(findSecondLargest([1000, 500, 750])).toBe(750);
        expect(findSecondLargest([999, 1000, 998])).toBe(999);
    });

    test('casos edge adicionales', () => {
        // Array con máximo al inicio
        expect(findSecondLargest([9, 1, 2, 3])).toBe(3);
        
        // Array con máximo al final
        expect(findSecondLargest([1, 2, 3, 9])).toBe(3);
        
        // Array con máximo en el medio
        expect(findSecondLargest([1, 9, 3, 2])).toBe(3);
        
        // Array mixto positivo/negativo
        expect(findSecondLargest([-5, 3, -1, 7])).toBe(3);
    });
});
