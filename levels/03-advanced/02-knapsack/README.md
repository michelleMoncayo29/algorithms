# Problema de la Mochila (Knapsack Problem)

**Dificultad:** ADVANCED  
**Categoría:** Programación Dinámica  
**Tiempo estimado:** 60-90 minutos

## 📋 Descripción

El problema de la mochila es uno de los problemas clásicos de optimización combinatoria. Dado un conjunto de elementos, cada uno con un peso y un valor, el objetivo es determinar qué elementos incluir en una mochila de capacidad limitada para maximizar el valor total, sin exceder la capacidad de peso.

Este ejercicio te permitirá implementar el algoritmo de la mochila 0/1 usando programación dinámica, incluyendo optimizaciones de espacio y reconstrucción de la solución.

## 🎯 Objetivos de Aprendizaje

- [ ] Comprender el concepto de programación dinámica
- [ ] Implementar el algoritmo de la mochila 0/1
- [ ] Optimizar el uso de memoria del algoritmo
- [ ] Reconstruir la solución óptima
- [ ] Analizar la complejidad temporal y espacial
- [ ] Entender cuándo usar programación dinámica

## 📝 Enunciado

Implementa tres versiones del algoritmo de la mochila:

### 1. `knapsack(weights, values, capacity)`

Implementación básica usando una tabla 2D de programación dinámica.

### 2. `knapsackOptimized(weights, values, capacity)`

Versión optimizada que usa solo O(capacity) espacio en lugar de O(n × capacity).

### 3. `knapsackItems(weights, values, capacity)`

Retorna los índices de los elementos que forman la solución óptima.

## 💡 Ejemplos

### Ejemplo 1 - Caso básico

```javascript
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;

// Resultado: 220 (elementos 1 y 2)
console.log(knapsack(weights, values, capacity));
console.log(knapsackItems(weights, values, capacity)); // [1, 2]
```

**Explicación:**

- Elemento 0: peso=10, valor=60
- Elemento 1: peso=20, valor=100
- Elemento 2: peso=30, valor=120
- Capacidad: 50
- Solución óptima: elementos 1 y 2 (peso total=50, valor total=220)

### Ejemplo 2 - Caso con restricción

```javascript
const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;

// Resultado: 9 (elementos 1 y 3)
console.log(knapsack(weights, values, capacity));
```

### Ejemplo 3 - Casos edge

```javascript
// Mochila vacía
knapsack([10, 20, 30], [60, 100, 120], 0); // 0

// Sin elementos
knapsack([], [], 10); // 0

// Un solo elemento
knapsack([5], [10], 10); // 10
```

## 🔍 Casos de Prueba

| Pesos        | Valores        | Capacidad | Resultado | Elementos Seleccionados |
| ------------ | -------------- | --------- | --------- | ----------------------- |
| [10, 20, 30] | [60, 100, 120] | 50        | 220       | [1, 2]                  |
| [1, 3, 4, 5] | [1, 4, 5, 7]   | 7         | 9         | [1, 3]                  |
| [1, 2, 3]    | [10, 20, 30]   | 10        | 60        | [0, 1, 2]               |
| [15, 20, 25] | [10, 20, 30]   | 10        | 0         | []                      |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 - Estructura de la tabla DP</summary>

Crea una tabla 2D donde `dp[i][w]` representa el valor máximo que se puede obtener usando los primeros `i` elementos con peso máximo `w`.

```javascript
// Casos base
dp[0][w] = 0; // Sin elementos
dp[i][0] = 0; // Sin capacidad

// Recurrencia
if (weights[i - 1] <= w) {
  dp[i][w] = Math.max(
    dp[i - 1][w], // No tomar el elemento
    dp[i - 1][w - weights[i - 1]] + values[i - 1] // Tomar el elemento
  );
} else {
  dp[i][w] = dp[i - 1][w]; // No se puede tomar
}
```

</details>

<details>
<summary>💡 Pista 2 - Optimización de espacio</summary>

En lugar de mantener toda la tabla, usa solo un array 1D. Recuerda iterar los pesos de forma descendente:

```javascript
for (let i = 0; i < weights.length; i++) {
  for (let w = capacity; w >= weights[i]; w--) {
    dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
  }
}
```

¿Por qué iterar hacia atrás? Para evitar usar valores ya modificados en la misma iteración.

</details>

<details>
<summary>💡 Pista 3 - Reconstrucción de la solución</summary>

Para encontrar qué elementos fueron seleccionados, recorre la tabla desde `dp[n][capacity]` hacia atrás:

```javascript
let i = n,
  w = capacity;
const selectedItems = [];

while (i > 0 && w > 0) {
  if (dp[i][w] !== dp[i - 1][w]) {
    selectedItems.push(i - 1);
    w -= weights[i - 1];
  }
  i--;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las tres funciones requeridas
3. Ejecuta los tests: `npm test 02-knapsack`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Problema de la Mochila - Wikipedia](https://es.wikipedia.org/wiki/Problema_de_la_mochila)
- [Visualización del Algoritmo de la Mochila](https://visualgo.net/es/knapsack)
- [Programación Dinámica - GeeksforGeeks](https://www.geeksforgeeks.org/dynamic-programming/)

## 🔄 Comparación de Complejidades

| Versión           | Tiempo | Espacio | Ventajas                                  |
| ----------------- | ------ | ------- | ----------------------------------------- |
| knapsack          | O(n×W) | O(n×W)  | Fácil de entender, permite reconstrucción |
| knapsackOptimized | O(n×W) | O(W)    | Menos memoria, mismo tiempo               |
| knapsackItems     | O(n×W) | O(n×W)  | Encuentra elementos específicos           |

**Donde n = número de elementos, W = capacidad**

## 💡 Aplicaciones del Problema de la Mochila

- **Optimización de recursos**: Asignación de presupuesto en proyectos
- **Compresión de datos**: Selección de elementos para máxima compresión
- **Criptografía**: Problemas de suma de subconjuntos
- **Logística**: Optimización de carga en transporte
- **Finanzas**: Selección de inversiones con restricciones

---

**💡 Tip:** El problema de la mochila es la base de muchos algoritmos de optimización. Dominar este problema te ayudará a reconocer cuándo aplicar programación dinámica en otros contextos.
