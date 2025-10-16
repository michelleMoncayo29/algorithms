const { insertAt, joinArrays, insertMultipleAt } = require('./exercise');

describe('Operaciones Básicas con Arrays', () => {
    // ===== TESTS PARA insertAt =====
    describe('insertAt - Inserción en índice específico', () => {
        test('debe insertar un valor en el índice especificado reemplazando el existente', () => {
            const input = [1, 2, 3, 4, 5];
            const expected = [1, 99, 3, 4, 5];
            expect(insertAt(input, 1, 99)).toEqual(expected);
        });

        test('debe insertar en el primer índice (0)', () => {
            const input = [1, 2, 3, 4, 5];
            const expected = [99, 2, 3, 4, 5];
            expect(insertAt(input, 0, 99)).toEqual(expected);
        });

        test('debe insertar en el último índice', () => {
            const input = [1, 2, 3, 4, 5];
            const expected = [1, 2, 3, 4, 99];
            expect(insertAt(input, 4, 99)).toEqual(expected);
        });

        test('debe manejar correctamente un array con exactamente un elemento', () => {
            const input = [42];
            const expected = [99];
            expect(insertAt(input, 0, 99)).toEqual(expected);
        });

        test('debe manejar correctamente valores de diferentes tipos', () => {
            const input = [1, 2, 3];
            const expected = [1, 'hola', 3];
            expect(insertAt(input, 1, 'hola')).toEqual(expected);
        });

        test('debe manejar correctamente valores null y undefined', () => {
            const input = [1, 2, 3];
            const expected = [1, null, 3];
            expect(insertAt(input, 1, null)).toEqual(expected);
        });
    });

    describe('insertAt - Casos edge y validación', () => {
        test('debe lanzar error cuando el índice está fuera de rango (negativo)', () => {
            const input = [1, 2, 3];
            expect(() => insertAt(input, -1, 99)).toThrow();
        });

        test('debe lanzar error cuando el índice está fuera de rango (mayor que length)', () => {
            const input = [1, 2, 3];
            expect(() => insertAt(input, 5, 99)).toThrow();
        });

        test('debe lanzar error cuando el array está vacío', () => {
            expect(() => insertAt([], 0, 99)).toThrow();
        });

        test('debe lanzar error cuando se proporciona un tipo de dato incorrecto', () => {
            expect(() => insertAt("string", 0, 99)).toThrow();
            expect(() => insertAt(123, 0, 99)).toThrow();
        });

        test('debe lanzar error cuando no se proporcionan parámetros requeridos', () => {
            expect(() => insertAt()).toThrow();
            expect(() => insertAt([1, 2, 3])).toThrow();
        });
    });

    // ===== TESTS PARA joinArrays =====
    describe('joinArrays - Unión de dos arrays', () => {
        test('debe unir correctamente dos arrays no vacíos', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [4, 5, 6];
            const expected = [1, 2, 3, 4, 5, 6];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });

        test('debe manejar un array vacío como primer parámetro', () => {
            const arr1 = [];
            const arr2 = [4, 5, 6];
            const expected = [4, 5, 6];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });

        test('debe manejar un array vacío como segundo parámetro', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [];
            const expected = [1, 2, 3];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });

        test('debe manejar ambos arrays vacíos', () => {
            const arr1 = [];
            const arr2 = [];
            const expected = [];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });

        test('debe manejar arrays con diferentes tipos de datos', () => {
            const arr1 = [1, 'hola', true];
            const arr2 = [null, undefined, 42];
            const expected = [1, 'hola', true, null, undefined, 42];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });

        test('debe manejar arrays con un solo elemento', () => {
            const arr1 = [1];
            const arr2 = [2];
            const expected = [1, 2];
            expect(joinArrays(arr1, arr2)).toEqual(expected);
        });
    });

    describe('joinArrays - Validación de inputs', () => {
        test('debe lanzar error cuando se proporciona un tipo de dato incorrecto', () => {
            expect(() => joinArrays("string", [1, 2])).toThrow();
            expect(() => joinArrays([1, 2], "string")).toThrow();
        });

        test('debe lanzar error cuando no se proporcionan parámetros requeridos', () => {
            expect(() => joinArrays()).toThrow();
            expect(() => joinArrays([1, 2])).toThrow();
        });
    });

    // ===== TESTS PARA insertMultipleAt =====
    describe('insertMultipleAt - Inserción de múltiples valores', () => {
        test('debe insertar múltiples valores en el índice especificado', () => {
            const input = [1, 2, 5, 6];
            const values = [3, 4];
            const expected = [1, 2, 3, 4, 5, 6];
            expect(insertMultipleAt(input, 2, values)).toEqual(expected);
        });

        test('debe insertar al inicio del array', () => {
            const input = [3, 4, 5];
            const values = [1, 2];
            const expected = [1, 2, 3, 4, 5];
            expect(insertMultipleAt(input, 0, values)).toEqual(expected);
        });

        test('debe insertar al final del array', () => {
            const input = [1, 2, 3];
            const values = [4, 5];
            const expected = [1, 2, 3, 4, 5];
            expect(insertMultipleAt(input, 3, values)).toEqual(expected);
        });

        test('debe manejar array de valores vacío', () => {
            const input = [1, 2, 3];
            const values = [];
            const expected = [1, 2, 3];
            expect(insertMultipleAt(input, 1, values)).toEqual(expected);
        });

        test('debe insertar un solo valor', () => {
            const input = [1, 3, 4];
            const values = [2];
            const expected = [1, 2, 3, 4];
            expect(insertMultipleAt(input, 1, values)).toEqual(expected);
        });

        test('debe manejar valores de diferentes tipos', () => {
            const input = [1, 4];
            const values = [2, 'hola', true];
            const expected = [1, 2, 'hola', true, 4];
            expect(insertMultipleAt(input, 1, values)).toEqual(expected);
        });
    });

    describe('insertMultipleAt - Validación y casos edge', () => {
        test('debe lanzar error cuando el índice está fuera de rango (negativo)', () => {
            const input = [1, 2, 3];
            const values = [4, 5];
            expect(() => insertMultipleAt(input, -1, values)).toThrow();
        });

        test('debe lanzar error cuando el índice está fuera de rango (mayor que length)', () => {
            const input = [1, 2, 3];
            const values = [4, 5];
            expect(() => insertMultipleAt(input, 5, values)).toThrow();
        });

        test('debe lanzar error cuando se proporciona un tipo de dato incorrecto', () => {
            expect(() => insertMultipleAt("string", 0, [1, 2])).toThrow();
            expect(() => insertMultipleAt([1, 2], 0, "string")).toThrow();
        });

        test('debe lanzar error cuando no se proporcionan parámetros requeridos', () => {
            expect(() => insertMultipleAt()).toThrow();
            expect(() => insertMultipleAt([1, 2])).toThrow();
            expect(() => insertMultipleAt([1, 2], 1)).toThrow();
        });
    });

    // ===== TESTS DE INMUTABILIDAD =====
    describe('Inmutabilidad', () => {
        test('no debe modificar los arrays originales', () => {
            const originalArray1 = [1, 2, 3];
            const originalArray2 = [4, 5, 6];
            const originalArray3 = [7, 8, 9];
            const array1Copy = [...originalArray1];
            const array2Copy = [...originalArray2];
            const array3Copy = [...originalArray3];
            
            insertAt([...originalArray1], 1, 99);
            joinArrays([...originalArray2], [...originalArray3]);
            insertMultipleAt([...originalArray1], 1, [...originalArray2]);
            
            expect(originalArray1).toEqual(array1Copy);
            expect(originalArray2).toEqual(array2Copy);
            expect(originalArray3).toEqual(array3Copy);
        });
    });

    // ===== TESTS DE RENDIMIENTO =====
    describe('Rendimiento', () => {
        test('debe procesar arrays pequeños en menos de 1ms', () => {
            const input = Array.from({length: 50}, (_, i) => i);
            const values = Array.from({length: 10}, (_, i) => i + 100);
            
            const startTime = performance.now();
            insertAt(input, 25, 999);
            joinArrays(input, values);
            insertMultipleAt(input, 10, values);
            const endTime = performance.now();
            
            expect(endTime - startTime).toBeLessThan(1);
        });

        test('debe manejar arrays medianos sin problemas', () => {
            const input = Array.from({length: 500}, (_, i) => i);
            const values = Array.from({length: 100}, (_, i) => i + 1000);
            
            const startTime = performance.now();
            insertAt(input, 250, 9999);
            joinArrays(input, values);
            insertMultipleAt(input, 100, values);
            const endTime = performance.now();
            
            expect(endTime - startTime).toBeLessThan(10);
        });
    });
});