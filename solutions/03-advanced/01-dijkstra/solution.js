/**
 * SOLUCIÓN - Algoritmo de Dijkstra
 *
 * Esta implementación incluye diferentes variantes del algoritmo de Dijkstra:
 * 1. Implementación básica con array para el heap mínimo
 * 2. Implementación con heap binario optimizado
 * 3. Versión que retorna tanto distancias como caminos
 */

/**
 * Implementación básica del algoritmo de Dijkstra
 * Complejidad temporal: O((V + E) log V) donde V = vértices, E = aristas
 * Complejidad espacial: O(V)
 */
function dijkstra(graph, start) {
  const numNodes = Object.keys(graph).length;
  const distances = new Array(numNodes).fill(Infinity);
  const visited = new Array(numNodes).fill(false);

  // La distancia del nodo origen a sí mismo es 0
  distances[start] = 0;

  // Priority queue simple usando array
  const pq = [[start, 0]];

  while (pq.length > 0) {
    // Encontrar el nodo con menor distancia (simulando heap mínimo)
    let minIndex = 0;
    for (let i = 1; i < pq.length; i++) {
      if (pq[i][1] < pq[minIndex][1]) {
        minIndex = i;
      }
    }

    const [currentNode, currentDist] = pq.splice(minIndex, 1)[0];

    // Si ya visitamos este nodo, continuar
    if (visited[currentNode]) continue;

    visited[currentNode] = true;

    // Explorar todos los vecinos del nodo actual
    for (const [neighbor, weight] of graph[currentNode] || []) {
      if (!visited[neighbor]) {
        const newDist = currentDist + weight;

        // Si encontramos un camino más corto, actualizar
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.push([neighbor, newDist]);
        }
      }
    }
  }

  return distances;
}

/**
 * Implementación optimizada con heap binario
 * Complejidad temporal: O((V + E) log V)
 * Complejidad espacial: O(V)
 */
function dijkstraOptimized(graph, start) {
  const numNodes = Object.keys(graph).length;
  const distances = new Array(numNodes).fill(Infinity);
  const visited = new Array(numNodes).fill(false);

  distances[start] = 0;

  // Crear heap mínimo
  const minHeap = new MinHeap();
  minHeap.insert([start, 0]);

  while (!minHeap.isEmpty()) {
    const [currentNode, currentDist] = minHeap.extractMin();

    if (visited[currentNode]) continue;

    visited[currentNode] = true;

    for (const [neighbor, weight] of graph[currentNode] || []) {
      if (!visited[neighbor]) {
        const newDist = currentDist + weight;

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          minHeap.insert([neighbor, newDist]);
        }
      }
    }
  }

  return distances;
}

/**
 * Dijkstra que retorna tanto distancias como caminos
 * @param {Object} graph - Grafo representado como lista de adyacencia
 * @param {number} start - Nodo origen
 * @returns {Object} - Objeto con distancias y caminos
 */
function dijkstraWithPaths(graph, start) {
  const numNodes = Object.keys(graph).length;
  const distances = new Array(numNodes).fill(Infinity);
  const previous = new Array(numNodes).fill(null);
  const visited = new Array(numNodes).fill(false);

  distances[start] = 0;
  const pq = [[start, 0]];

  while (pq.length > 0) {
    // Encontrar nodo con menor distancia
    let minIndex = 0;
    for (let i = 1; i < pq.length; i++) {
      if (pq[i][1] < pq[minIndex][1]) {
        minIndex = i;
      }
    }

    const [currentNode, currentDist] = pq.splice(minIndex, 1)[0];

    if (visited[currentNode]) continue;

    visited[currentNode] = true;

    for (const [neighbor, weight] of graph[currentNode] || []) {
      if (!visited[neighbor]) {
        const newDist = currentDist + weight;

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;
          pq.push([neighbor, newDist]);
        }
      }
    }
  }

  return {
    distances,
    previous,
  };
}

/**
 * Función auxiliar para reconstruir el camino desde origen hasta destino
 * @param {number[]} previous - Array de nodos anteriores
 * @param {number} start - Nodo origen
 * @param {number} end - Nodo destino
 * @returns {number[]} - Camino desde origen hasta destino
 */
function reconstructPath(previous, start, end) {
  const path = [];
  let current = end;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path[0] === start ? path : [];
}

/**
 * Implementación de Heap Mínimo para optimizar Dijkstra
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex >= 0 && this.heap[index][1] < this.heap[parentIndex][1]) {
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;

    if (
      leftChild < this.heap.length &&
      this.heap[leftChild][1] < this.heap[smallest][1]
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild][1] < this.heap[smallest][1]
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.heapifyDown(smallest);
    }
  }
}

module.exports = dijkstra;
