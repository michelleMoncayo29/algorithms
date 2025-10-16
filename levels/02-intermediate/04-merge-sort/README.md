# Operaciones Básicas con Arrays

**Dificultad:** INTERMEDIATE  
**Categoría:** Manipulación de Arrays  
**Tiempo estimado:** 30-45 minutos

## 📋 Descripción

Este ejercicio te permite implementar funciones fundamentales para la manipulación de arrays: insertar valores en índices específicos reemplazando el valor existente, unir dos arrays, y insertar múltiples valores en una posición específica. Estas operaciones son la base para algoritmos más complejos y estructuras de datos.

## 🎯 Objetivos de Aprendizaje

- [ ] Dominar la manipulación básica de arrays
- [ ] Implementar inserción de valores en índices específicos
- [ ] Aprender a unir arrays de manera eficiente
- [ ] Entender la inserción de múltiples valores
- [ ] Manejar casos edge y validación de inputs
- [ ] Practicar el principio de inmutabilidad
- [ ] Analizar la complejidad de operaciones con arrays

## 📝 Enunciado

Implementa tres funciones esenciales para operaciones con arrays:

### 1. `insertAt(arr, index, value)`

Inserta un valor en un índice específico del array, reemplazando el valor existente en esa posición.

### 2. `joinArrays(arr1, arr2)`

Une dos arrays en uno solo, manteniendo el orden de los elementos.

### 3. `insertMultipleAt(arr, index, values)`

Inserta múltiples valores en un índice específico del array, desplazando los elementos existentes hacia la derecha.

## 💡 Ejemplos

### Ejemplo 1 - Inserción simple

```javascript
const arr = [1, 2, 3, 4, 5];

// Insertar 99 en el índice 1, reemplazando el 2
console.log(insertAt(arr, 1, 99)); // [1, 99, 3, 4, 5]
```

### Ejemplo 2 - Unión de arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Unir ambos arrays
console.log(joinArrays(arr1, arr2)); // [1, 2, 3, 4, 5, 6]
```

### Ejemplo 3 - Inserción múltiple

```javascript
const arr = [1, 2, 5, 6];
const values = [3, 4];

// Insertar [3, 4] en el índice 2
console.log(insertMultipleAt(arr, 2, values)); // [1, 2, 3, 4, 5, 6]
```

### Ejemplo 4 - Casos edge

```javascript
// Inserción en el primer índice
insertAt([1, 2, 3], 0, 99); // [99, 2, 3]

// Inserción en el último índice
insertAt([1, 2, 3], 2, 99); // [1, 2, 99]

// Arrays vacíos
joinArrays([], [1, 2, 3]); // [1, 2, 3]
joinArrays([1, 2, 3], []); // [1, 2, 3]

// Inserción al final
insertMultipleAt([1, 2, 3], 3, [4, 5]); // [1, 2, 3, 4, 5]
```

## 🔍 Casos de Prueba

| Función | Input | Parámetros | Output Esperado | Descripción |
|---------|-------|------------|-----------------|-------------|
| insertAt | [1, 2, 3, 4, 5] | index: 1, value: 99 | [1, 99, 3, 4, 5] | Inserción en el medio |
| insertAt | [1, 2, 3, 4, 5] | index: 0, value: 99 | [99, 2, 3, 4, 5] | Inserción al inicio |
| insertAt | [1, 2, 3, 4, 5] | index: 4, value: 99 | [1, 2, 3, 4, 99] | Inserción al final |
| joinArrays | [1, 2, 3], [4, 5, 6] | - | [1, 2, 3, 4, 5, 6] | Unión normal |
| joinArrays | [], [4, 5, 6] | - | [4, 5, 6] | Primer array vacío |
| joinArrays | [1, 2, 3], [] | - | [1, 2, 3] | Segundo array vacío |
| insertMultipleAt | [1, 2, 5, 6], [3, 4] | index: 2 | [1, 2, 3, 4, 5, 6] | Inserción múltiple |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 - insertAt</summary>

Para insertar en un índice específico:

```javascript
function insertAt(arr, index, value) {
  // Validar que el array no esté vacío y el índice esté en rango
  if (arr.length === 0 || index < 0 || index >= arr.length) {
    throw new Error('Índice fuera de rango');
  }
  
  // Crear una copia del array
  const result = [...arr];
  
  // Reemplazar el valor en el índice especificado
  result[index] = value;
  
  return result;
}
```

</details>

<details>
<summary>💡 Pista 2 - joinArrays</summary>

Para unir dos arrays:

```javascript
function joinArrays(arr1, arr2) {
  // Validar que ambos parámetros sean arrays
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Los parámetros deben ser arrays');
  }
  
  // Usar spread operator para unir los arrays
  return [...arr1, ...arr2];
  
  // Alternativa usando concat():
  // return arr1.concat(arr2);
}
```

</details>

<details>
<summary>💡 Pista 3 - insertMultipleAt</summary>

Para insertar múltiples valores:

```javascript
function insertMultipleAt(arr, index, values) {
  // Validar índices y tipos
  if (index < 0 || index > arr.length || !Array.isArray(values)) {
    throw new Error('Parámetros inválidos');
  }
  
  // Crear copia del array
  const result = [...arr];
  
  // Usar splice para insertar múltiples elementos
  result.splice(index, 0, ...values);
  
  return result;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las tres funciones requeridas
3. Ejecuta los tests: `npm test 04-merge-sort`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Array Methods - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Spread Operator - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Array Manipulation - JavaScript.info](https://javascript.info/array)

## 🔄 Comparación de Métodos

| Operación | Método Nativo | Complejidad | Inmutabilidad |
|-----------|---------------|-------------|---------------|
| Insertar en índice | `arr[index] = value` | O(1) | No (muta) |
| Unir arrays | `arr1.concat(arr2)` | O(n) | Sí |
| Insertar múltiple | `arr.splice(index, 0, ...values)` | O(n) | No (muta) |

## 💡 Ventajas de las Implementaciones Inmutables

### ✅ Ventajas:
- **Seguridad**: No modifica datos originales
- **Debugging**: Más fácil de rastrear cambios
- **Concurrencia**: Seguro para múltiples hilos
- **Funcional**: Compatible con programación funcional
- **Predecible**: Comportamiento consistente

### ❌ Desventajas:
- **Memoria**: Usa más espacio (crea copias)
- **Rendimiento**: Ligeramente más lento para operaciones simples

## 🎯 Casos de Uso Prácticos

### insertAt:
- **Formularios dinámicos**: Actualizar campos específicos
- **Editores de texto**: Reemplazar caracteres en posiciones
- **Juegos**: Actualizar estado de tableros

### joinArrays:
- **Concatenación de datos**: Unir resultados de APIs
- **Procesamiento de archivos**: Combinar contenido
- **Algoritmos de ordenamiento**: Merge en Merge Sort

### insertMultipleAt:
- **Editores**: Insertar bloques de texto
- **Procesamiento de imágenes**: Insertar píxeles
- **Análisis de datos**: Insertar rangos de valores

## 🔬 Análisis de Complejidad

### Complejidad Temporal:
- **insertAt**: O(n) - Crear copia del array
- **joinArrays**: O(n + m) - Donde n y m son las longitudes de los arrays
- **insertMultipleAt**: O(n + k) - Donde k es el número de valores a insertar

### Complejidad Espacial:
- **Todas las funciones**: O(n) - Crean nuevos arrays

### Optimizaciones Posibles:
1. **Para arrays grandes**: Usar métodos nativos cuando la mutación es aceptable
2. **Inserción frecuente**: Considerar estructuras de datos como listas enlazadas
3. **Unión múltiple**: Usar `Array.concat()` con múltiples argumentos

---

**💡 Tip:** Estas funciones son la base para algoritmos más complejos. Dominar la manipulación inmutable de arrays te preparará para trabajar con frameworks modernos como React, donde la inmutabilidad es fundamental.