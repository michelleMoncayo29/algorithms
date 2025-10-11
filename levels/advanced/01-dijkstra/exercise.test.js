const dijkstra = require('./exercise');

describe("Dijkstra's Algorithm", () => {
    // Casos básicos
    test('debe encontrar caminos más cortos en grafo simple', () => {
        const graph = {
            0: [[1, 4], [2, 1]],
            1: [[3, 1]],
            2: [[1, 2], [3, 5]],
            3: []
        };
        expect(dijkstra(graph, 0)).toEqual([0, 3, 1, 4]);
    });

    test('debe manejar grafo con un solo nodo', () => {
        const graph = { 0: [] };
        expect(dijkstra(graph, 0)).toEqual([0]);
    });

    test('debe manejar grafo lineal', () => {
        const graph = {
            0: [[1, 1]],
            1: [[2, 2]],
            2: []
        };
        expect(dijkstra(graph, 0)).toEqual([0, 1, 3]);
    });

    // Casos edge
    test('debe manejar grafo con aristas múltiples', () => {
        const graph = {
            0: [[1, 1], [2, 5]],
            1: [[2, 2], [3, 1]],
            2: [[3, 3]],
            3: []
        };
        expect(dijkstra(graph, 0)).toEqual([0, 1, 3, 2]);
    });

    test('debe manejar nodos no conectados', () => {
        const graph = {
            0: [[1, 1]],
            1: [],
            2: [[3, 1]],
            3: []
        };
        const result = dijkstra(graph, 0);
        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(Infinity);
        expect(result[3]).toBe(Infinity);
    });

    // Casos adicionales
    test('debe manejar grafo complejo', () => {
        const graph = {
            0: [[1, 2], [2, 6]],
            1: [[2, 3], [3, 5]],
            2: [[3, 1]],
            3: []
        };
        expect(dijkstra(graph, 0)).toEqual([0, 2, 5, 6]);
    });

    test('debe manejar grafo con pesos altos', () => {
        const graph = {
            0: [[1, 100], [2, 1]],
            1: [[3, 1]],
            2: [[1, 1], [3, 100]],
            3: []
        };
        expect(dijkstra(graph, 0)).toEqual([0, 2, 1, 3]);
    });
});
