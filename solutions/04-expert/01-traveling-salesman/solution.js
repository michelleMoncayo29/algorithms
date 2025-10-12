/**
 * SOLUCIÓN - Traveling Salesman Problem (TSP)
 *
 * Esta implementación incluye diferentes enfoques para resolver el TSP:
 * 1. Solución exacta usando programación dinámica (Held-Karp)
 * 2. Algoritmo de aproximación usando el árbol de expansión mínima
 * 3. Algoritmo heurístico usando el vecino más cercano
 */

/**
 * Solución exacta usando programación dinámica (Held-Karp)
 * Complejidad temporal: O(n² × 2^n)
 * Complejidad espacial: O(n × 2^n)
 */
function tsp(distances) {
  const n = distances.length;

  // Si solo hay una ciudad, la distancia es 0
  if (n <= 1) return 0;

  // Si hay dos ciudades, retornar la distancia entre ellas (ida y vuelta)
  if (n === 2) return distances[0][1] + distances[1][0];

  // dp[mask][i] = costo mínimo para visitar todas las ciudades en 'mask' terminando en ciudad 'i'
  const dp = new Array(1 << n)
    .fill(null)
    .map(() => new Array(n).fill(Infinity));

  // Caso base: empezar desde la ciudad 0
  dp[1][0] = 0;

  // Llenar la tabla DP
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let i = 0; i < n; i++) {
      // Si la ciudad i no está en el conjunto actual, continuar
      if (!(mask & (1 << i))) continue;

      // Intentar llegar a la ciudad i desde todas las ciudades posibles
      for (let j = 0; j < n; j++) {
        // Si j está en el conjunto y es diferente de i
        if (i !== j && mask & (1 << j)) {
          // Actualizar el costo mínimo
          const prevMask = mask ^ (1 << i);
          dp[mask][i] = Math.min(
            dp[mask][i],
            dp[prevMask][j] + distances[j][i]
          );
        }
      }
    }
  }

  // Encontrar el costo mínimo para visitar todas las ciudades y regresar al inicio
  const allCities = (1 << n) - 1;
  let minCost = Infinity;

  for (let i = 1; i < n; i++) {
    minCost = Math.min(minCost, dp[allCities][i] + distances[i][0]);
  }

  return minCost;
}

/**
 * Algoritmo de aproximación usando MST (Minimum Spanning Tree)
 * Complejidad temporal: O(n²)
 * Complejidad espacial: O(n)
 * Factor de aproximación: 2 (garantiza solución ≤ 2 × óptimo)
 */
function tspApproximation(distances) {
  const n = distances.length;

  if (n <= 1) return 0;
  if (n === 2) return distances[0][1] + distances[1][0];

  // Construir el MST usando el algoritmo de Prim
  const mst = primMST(distances);

  // Crear un tour DFS del MST
  const tour = dfsTour(mst, 0);

  // Calcular el costo del tour
  let cost = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    cost += distances[tour[i]][tour[i + 1]];
  }

  return cost;
}

/**
 * Algoritmo heurístico del vecino más cercano
 * Complejidad temporal: O(n²)
 * Complejidad espacial: O(n)
 */
function tspNearestNeighbor(distances) {
  const n = distances.length;

  if (n <= 1) return 0;
  if (n === 2) return distances[0][1] + distances[1][0];

  const visited = new Array(n).fill(false);
  const tour = [0]; // Empezar desde la ciudad 0
  visited[0] = true;

  let currentCity = 0;

  // Construir el tour ciudad por ciudad
  for (let i = 1; i < n; i++) {
    let nearestCity = -1;
    let minDistance = Infinity;

    // Encontrar la ciudad no visitada más cercana
    for (let j = 0; j < n; j++) {
      if (!visited[j] && distances[currentCity][j] < minDistance) {
        minDistance = distances[currentCity][j];
        nearestCity = j;
      }
    }

    tour.push(nearestCity);
    visited[nearestCity] = true;
    currentCity = nearestCity;
  }

  // Regresar a la ciudad inicial
  tour.push(0);

  // Calcular el costo total
  let cost = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    cost += distances[tour[i]][tour[i + 1]];
  }

  return cost;
}

/**
 * Algoritmo de Prim para construir MST
 * @param {number[][]} distances - Matriz de distancias
 * @returns {number[][]} - Lista de adyacencia del MST
 */
function primMST(distances) {
  const n = distances.length;
  const mst = new Array(n).fill(null).map(() => []);
  const visited = new Array(n).fill(false);
  const minDistance = new Array(n).fill(Infinity);
  const parent = new Array(n).fill(-1);

  // Empezar desde la ciudad 0
  minDistance[0] = 0;

  for (let count = 0; count < n - 1; count++) {
    // Encontrar la ciudad con menor distancia no visitada
    let u = -1;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && (u === -1 || minDistance[v] < minDistance[u])) {
        u = v;
      }
    }

    visited[u] = true;

    // Actualizar distancias de los vecinos
    for (let v = 0; v < n; v++) {
      if (!visited[v] && distances[u][v] < minDistance[v]) {
        parent[v] = u;
        minDistance[v] = distances[u][v];
      }
    }
  }

  // Construir la lista de adyacencia del MST
  for (let i = 1; i < n; i++) {
    mst[parent[i]].push(i);
    mst[i].push(parent[i]);
  }

  return mst;
}

/**
 * Tour DFS del MST
 * @param {number[][]} mst - Lista de adyacencia del MST
 * @param {number} start - Nodo de inicio
 * @returns {number[]} - Tour DFS
 */
function dfsTour(mst, start) {
  const tour = [];
  const visited = new Array(mst.length).fill(false);

  function dfs(node) {
    visited[node] = true;
    tour.push(node);

    for (const neighbor of mst[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  dfs(start);
  return tour;
}

/**
 * Algoritmo de optimización local 2-opt
 * @param {number[]} tour - Tour inicial
 * @param {number[][]} distances - Matriz de distancias
 * @returns {number[]} - Tour mejorado
 */
function twoOptOptimization(tour, distances) {
  const n = tour.length;
  let improved = true;
  let bestTour = [...tour];
  let bestCost = calculateTourCost(tour, distances);

  while (improved) {
    improved = false;

    for (let i = 1; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        // Crear nuevo tour intercambiando aristas
        const newTour = [...bestTour];
        reverseSegment(newTour, i, j);

        const newCost = calculateTourCost(newTour, distances);

        if (newCost < bestCost) {
          bestTour = newTour;
          bestCost = newCost;
          improved = true;
        }
      }
    }
  }

  return bestTour;
}

/**
 * Función auxiliar para invertir un segmento del tour
 * @param {number[]} tour - Tour a modificar
 * @param {number} i - Índice inicial
 * @param {number} j - Índice final
 */
function reverseSegment(tour, i, j) {
  while (i < j) {
    [tour[i], tour[j]] = [tour[j], tour[i]];
    i++;
    j--;
  }
}

/**
 * Calcular el costo de un tour
 * @param {number[]} tour - Tour
 * @param {number[][]} distances - Matriz de distancias
 * @returns {number} - Costo del tour
 */
function calculateTourCost(tour, distances) {
  let cost = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    cost += distances[tour[i]][tour[i + 1]];
  }
  return cost;
}

module.exports = tsp;
