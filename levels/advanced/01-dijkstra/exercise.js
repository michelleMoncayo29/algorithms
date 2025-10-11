/**
 * Dijkstra's Algorithm
 * 
 * Descripción: Implementa el algoritmo de Dijkstra para encontrar el camino más corto desde un nodo origen.
 * Dificultad: ADVANCED
 * 
 * @param {Object} graph - Grafo representado como lista de adyacencia {node: [[neighbor, weight], ...]}
 * @param {number} start - Nodo origen
 * @returns {number[]} Array con las distancias más cortas desde el origen a todos los nodos
 * 
 * Ejemplo:
 * dijkstra({0: [[1, 4], [2, 1]], 1: [[3, 1]], 2: [[1, 2], [3, 5]], 3: []}, 0) // [0, 3, 1, 4]
 */

function dijkstra(graph, start) {
    // TODO: Implementar la solución aquí
    
    // Pista: Usa un heap para mantener los nodos ordenados por distancia
    
    throw new Error('Función no implementada');
}

module.exports = dijkstra;
