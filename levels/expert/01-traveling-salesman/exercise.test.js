const tsp = require('./exercise');

describe('Traveling Salesman Problem (TSP)', () => {
    // Casos básicos
    test('debe resolver TSP para 3 ciudades', () => {
        const distances = [
            [0, 10, 15],
            [10, 0, 35],
            [15, 35, 0]
        ];
        expect(tsp(distances)).toBe(60);
    });

    test('debe resolver TSP para 4 ciudades', () => {
        const distances = [
            [0, 10, 15, 20],
            [10, 0, 35, 25],
            [15, 35, 0, 30],
            [20, 25, 30, 0]
        ];
        expect(tsp(distances)).toBe(80);
    });

    test('debe manejar TSP simétrico', () => {
        const distances = [
            [0, 1, 2],
            [1, 0, 3],
            [2, 3, 0]
        ];
        expect(tsp(distances)).toBe(6);
    });

    // Casos edge
    test('debe manejar TSP mínimo (2 ciudades)', () => {
        const distances = [
            [0, 5],
            [5, 0]
        ];
        expect(tsp(distances)).toBe(10);
    });

    test('debe manejar distancias iguales', () => {
        const distances = [
            [0, 1, 1, 1],
            [1, 0, 1, 1],
            [1, 1, 0, 1],
            [1, 1, 1, 0]
        ];
        expect(tsp(distances)).toBe(4);
    });

    // Casos adicionales
    test('debe manejar TSP con distancias variables', () => {
        const distances = [
            [0, 2, 9, 10],
            [1, 0, 6, 4],
            [15, 7, 0, 8],
            [6, 3, 12, 0]
        ];
        expect(tsp(distances)).toBe(21);
    });

    test('debe manejar TSP con distancias grandes', () => {
        const distances = [
            [0, 100, 200, 300],
            [100, 0, 400, 500],
            [200, 400, 0, 600],
            [300, 500, 600, 0]
        ];
        expect(tsp(distances)).toBe(1400);
    });
});
