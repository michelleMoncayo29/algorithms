const generatePermutations = require('./exercise');

describe('Generador de Permutaciones', () => {
    // Función auxiliar para verificar si dos arrays de permutaciones son equivalentes
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        
        // Convertir cada permutación a string para comparación
        const str1 = arr1.map(perm => JSON.stringify(perm)).sort();
        const str2 = arr2.map(perm => JSON.stringify(perm)).sort();
        
        return str1.every((str, index) => str === str2[index]);
    }

    // Casos básicos
    test('debe manejar array vacío', () => {
        const result = generatePermutations([]);
        expect(result).toEqual([[]]);
    });

    test('debe manejar array con un elemento', () => {
        const result = generatePermutations([1]);
        expect(result).toEqual([[1]]);
    });

    test('debe generar permutaciones para array de dos elementos', () => {
        const result = generatePermutations([1, 2]);
        const expected = [[1, 2], [2, 1]];
        expect(arraysEqual(result, expected)).toBe(true);
    });

    test('debe generar permutaciones para array de tres elementos', () => {
        const result = generatePermutations([1, 2, 3]);
        const expected = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1]
        ];
        expect(arraysEqual(result, expected)).toBe(true);
    });

    // Casos con diferentes tipos de datos
    test('debe manejar strings', () => {
        const result = generatePermutations(['a', 'b']);
        const expected = [['a', 'b'], ['b', 'a']];
        expect(arraysEqual(result, expected)).toBe(true);
    });

    test('debe manejar caracteres', () => {
        const result = generatePermutations(['x', 'y', 'z']);
        expect(result).toHaveLength(6); // 3! = 6
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(6);
    });

    test('debe manejar números negativos', () => {
        const result = generatePermutations([-1, 0, 1]);
        expect(result).toHaveLength(6); // 3! = 6
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(6);
    });

    // Casos edge
    test('debe manejar elementos duplicados correctamente', () => {
        const result = generatePermutations([1, 1]);
        const expected = [[1, 1], [1, 1]];
        expect(arraysEqual(result, expected)).toBe(true);
    });

    test('debe manejar array con elementos mixtos', () => {
        const result = generatePermutations([1, 'a', true]);
        expect(result).toHaveLength(6); // 3! = 6
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(6);
    });

    // Casos de rendimiento (arrays más grandes)
    test('debe generar permutaciones para array de 4 elementos', () => {
        const result = generatePermutations([1, 2, 3, 4]);
        expect(result).toHaveLength(24); // 4! = 24
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(24);
    });

    test('debe generar permutaciones para array de 5 elementos', () => {
        const result = generatePermutations([1, 2, 3, 4, 5]);
        expect(result).toHaveLength(120); // 5! = 120
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(120);
    });

    // Casos adicionales
    test('debe manejar array con un solo elemento repetido', () => {
        const result = generatePermutations([5, 5, 5]);
        expect(result).toHaveLength(6); // 3! = 6 (aunque son idénticas)
        // Todas las permutaciones deben ser [5, 5, 5]
        result.forEach(perm => {
            expect(perm).toEqual([5, 5, 5]);
        });
    });

    test('debe manejar array con elementos de diferentes tipos', () => {
        const result = generatePermutations([1, 'a', true]);
        expect(result).toHaveLength(6); // 3! = 6
        // Verificar que todas las permutaciones son únicas
        const uniquePerms = new Set(result.map(perm => JSON.stringify(perm)));
        expect(uniquePerms.size).toBe(6);
    });

    test('debe verificar que cada permutación contiene todos los elementos originales', () => {
        const input = [1, 2, 3, 4];
        const result = generatePermutations(input);
        
        result.forEach(permutation => {
            // Cada permutación debe tener la misma longitud
            expect(permutation).toHaveLength(input.length);
            
            // Cada permutación debe contener exactamente los mismos elementos
            const sortedInput = [...input].sort();
            const sortedPerm = [...permutation].sort();
            expect(sortedPerm).toEqual(sortedInput);
        });
    });
});
