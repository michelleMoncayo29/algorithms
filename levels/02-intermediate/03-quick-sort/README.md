# Quick Sort (Ordenamiento Rápido)

**Dificultad:** INTERMEDIATE  
**Categoría:** Algoritmos de Ordenamiento  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Quick Sort es un algoritmo de ordenamiento eficiente que utiliza el paradigma "divide y vencerás". Es uno de los algoritmos de ordenamiento más utilizados debido a su excelente rendimiento promedio y su implementación in-place. Este ejercicio te permitirá implementar diferentes variantes del algoritmo, desde la versión básica hasta optimizaciones avanzadas.

## 🎯 Objetivos de Aprendizaje

- [ ] Comprender el paradigma "divide y vencerás"
- [ ] Implementar el algoritmo Quick Sort básico
- [ ] Entender el proceso de particionamiento
- [ ] Implementar variantes optimizadas del algoritmo
- [ ] Analizar la complejidad temporal en diferentes casos
- [ ] Comparar diferentes estrategias de selección de pivote

## 📝 Enunciado

Implementa cinco variantes del algoritmo Quick Sort:

### 1. `quickSort(arr)`

Implementación básica que crea nuevas copias del array en cada recursión.

### 2. `quickSortInPlace(arr, low, high)`

Versión in-place que modifica el array original sin crear copias adicionales.

### 3. `partition(arr, low, high)`

Función de particionamiento que reorganiza el array alrededor de un pivote.

### 4. `quickSortRandom(arr)`

Versión con selección aleatoria de pivote para mejorar el rendimiento promedio.

### 5. `quickSortMedianOfThree(arr)`

Versión que selecciona el mediano de tres elementos como pivote.

## 💡 Ejemplos

### Ejemplo 1 - Ordenamiento básico

```javascript
const arr = [64, 34, 25, 12, 22, 11, 90];

// Resultado: [11, 12, 22, 25, 34, 64, 90]
console.log(quickSort(arr));
```

### Ejemplo 2 - Ordenamiento in-place

```javascript
const arr = [64, 34, 25, 12, 22, 11, 90];

quickSortInPlace(arr);
console.log(arr); // [11, 12, 22, 25, 34, 64, 90]
```

### Ejemplo 3 - Particionamiento

```javascript
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const pivotIndex = partition(arr, 0, arr.length - 1);

console.log(arr); // Array reorganizado alrededor del pivote
console.log(pivotIndex); // Posición final del pivote
```

### Ejemplo 4 - Casos edge

```javascript
// Array vacío
quickSort([]); // []

// Un elemento
quickSort([42]); // [42]

// Ya ordenado
quickSort([1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
```

## 🔍 Casos de Prueba

| Input                           | Output                          | Descripción                |
| ------------------------------- | ------------------------------- | -------------------------- |
| [64, 34, 25, 12, 22, 11, 90]    | [11, 12, 22, 25, 34, 64, 90]    | Array desordenado          |
| [1, 2, 3, 4, 5]                 | [1, 2, 3, 4, 5]                 | Array ya ordenado          |
| [5, 4, 3, 2, 1]                 | [1, 2, 3, 4, 5]                 | Array ordenado descendente |
| [3, 1, 4, 1, 5, 9, 2, 6, 5]     | [1, 1, 2, 3, 4, 5, 5, 6, 9]     | Con duplicados             |
| [-3, 1, -4, 1, 5, -9, 2, -6, 5] | [-9, -6, -4, -3, 1, 1, 2, 5, 5] | Números negativos          |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 - Estructura básica de Quick Sort</summary>

Quick Sort sigue este patrón:

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0]; // Elegir pivote
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  const equal = arr.filter(x => x === pivot);

  return [...quickSort(left), ...equal, ...quickSort(right)];
}
```

Esta implementación es fácil de entender pero no es eficiente en espacio.

</details>

<details>
<summary>💡 Pista 2 - Particionamiento (Lomuto)</summary>

El esquema de particionamiento Lomuto:

```javascript
function partition(arr, low, high) {
  const pivot = arr[high]; // Elegir último elemento como pivote
  let i = low - 1; // Índice del elemento más pequeño

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambiar
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Colocar pivote
  return i + 1;
}
```

</details>

<details>
<summary>💡 Pista 3 - Quick Sort in-place</summary>

La versión in-place usa índices en lugar de crear subarrays:

```javascript
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
}
```

</details>

<details>
<summary>💡 Pista 4 - Pivote aleatorio</summary>

Para mejorar el rendimiento promedio, intercambia un elemento aleatorio con el último antes de particionar:

```javascript
function quickSortRandom(arr) {
  // Intercambiar elemento aleatorio con el último
  const randomIndex = Math.floor(Math.random() * arr.length);
  [arr[randomIndex], arr[arr.length - 1]] = [
    arr[arr.length - 1],
    arr[randomIndex],
  ];

  // Continuar con el algoritmo normal...
}
```

</details>

<details>
<summary>💡 Pista 5 - Mediano de tres</summary>

Selecciona el mediano entre el primer, medio y último elemento:

```javascript
function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);

  if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];

  return mid;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las cinco funciones requeridas
3. Ejecuta los tests: `npm test 03-quick-sort`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Quick Sort - Wikipedia](https://es.wikipedia.org/wiki/Quicksort)
- [Visualización de Quick Sort](https://visualgo.net/es/sorting)
- [Algoritmos de Ordenamiento - GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)

## 🔄 Comparación de Algoritmos de Ordenamiento

| Algoritmo      | Mejor Caso | Promedio   | Peor Caso  | Espacio  | Estable |
| -------------- | ---------- | ---------- | ---------- | -------- | ------- |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) | No      |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     | Sí      |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     | No      |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     | Sí      |

## 💡 Ventajas y Desventajas de Quick Sort

### ✅ Ventajas:

- Excelente rendimiento promedio: O(n log n)
- Ordenamiento in-place: O(log n) espacio adicional
- Implementación relativamente simple
- Buena localidad de referencia (cache-friendly)

### ❌ Desventajas:

- Peor caso O(n²) cuando el pivote es siempre el elemento más pequeño/grande
- No es estable (puede cambiar el orden relativo de elementos iguales)
- Rendimiento degradado en arrays con muchos elementos duplicados

## 🎯 Optimizaciones Comunes

1. **Pivote aleatorio**: Evita el peor caso en arrays ordenados
2. **Mediano de tres**: Selecciona un pivote más equilibrado
3. **Insertion Sort para arrays pequeños**: Mejora el rendimiento para n < 10
4. **Particionamiento de tres vías**: Eficiente para arrays con duplicados
5. **Iterativo en lugar de recursivo**: Evita el desbordamiento de pila

---

**💡 Tip:** Quick Sort es ideal para ordenar arrays grandes en memoria, pero considera Merge Sort si necesitas estabilidad o si tienes restricciones de memoria.
