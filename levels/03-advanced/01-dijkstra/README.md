# Dijkstra's Algorithm

**Dificultad:** ADVANCED  
**Categoría:** Grafos, Algoritmos de Caminos Más Cortos  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa el algoritmo de Dijkstra para encontrar el camino más corto desde un nodo origen a todos los demás nodos en un grafo ponderado dirigido.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el algoritmo de Dijkstra
- [ ] Aprender a trabajar con grafos y heaps
- [ ] Practicar algoritmos de caminos más cortos
- [ ] Comprender estructuras de datos avanzadas

## 📝 Enunciado

Implementa la función `dijkstra` que tome un grafo representado como lista de adyacencia, un nodo origen, y devuelva un array con las distancias más cortas desde el origen a todos los nodos.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
graph = {
  0: [
    [1, 4],
    [2, 1],
  ],
  1: [[3, 1]],
  2: [
    [1, 2],
    [3, 5],
  ],
  3: [],
};
start = (0)[
  // Output esperado
  (0, 3, 1, 4)
];

// Explicación
// Distancia de 0 a 0: 0
// Distancia de 0 a 1: 3 (0->2->1)
// Distancia de 0 a 2: 1 (0->2)
// Distancia de 0 a 3: 4 (0->2->1->3)
```

## 🔍 Casos de Prueba

| Grafo              | Origen | Output Esperado | Explicación         |
| ------------------ | ------ | --------------- | ------------------- |
| Grafo simple       | 0      | [0, 3, 1, 4]    | Caminos más cortos  |
| Grafo desconectado | 0      | [0, ∞, ∞, ∞]    | Nodos inalcanzables |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa un heap (cola de prioridad) para mantener los nodos ordenados por distancia.

</details>

<details>
<summary>💡 Pista 2</summary>

Mantén un array de distancias inicializado con infinito para todos los nodos excepto el origen.

</details>

<details>
<summary>💡 Pista 3</summary>

Para cada nodo visitado, relaja las aristas hacia sus vecinos si encuentra un camino más corto.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `dijkstra`
3. Ejecuta los tests: `npm test dijkstra`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- [Priority Queue Implementation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

---

**💡 Tip:** Dijkstra es fundamental en sistemas de navegación y redes. Es un algoritmo greedy que siempre toma la mejor decisión local.
