# Binary Search

**Dificultad:** INTERMEDIATE  
**Categoría:** Búsqueda, Divide y Vencerás  
**Tiempo estimado:** 20-25 minutos

## 📋 Descripción

Implementa búsqueda binaria para encontrar un elemento en un array ordenado. La búsqueda binaria es un algoritmo eficiente que divide repetidamente a la mitad el espacio de búsqueda.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el algoritmo de búsqueda binaria
- [ ] Aprender la técnica divide y vencerás
- [ ] Practicar el manejo de índices en arrays
- [ ] Comprender la complejidad O(log n)

## 📝 Enunciado

Implementa la función `binarySearch` que tome un array ordenado y un elemento objetivo, y devuelva el índice del elemento si se encuentra, o -1 si no existe.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
((nums = [-1, 0, 3, 5, 9, 12]), (target = 9));

// Output esperado
4;

// Explicación
// El elemento 9 existe en el índice 4
```

### Ejemplo 2

```javascript
// Input
((nums = [-1, 0, 3, 5, 9, 12]),
  (target =
    2 -
    // Output esperado
    1));

// Explicación
// El elemento 2 no existe en el array
```

## 🔍 Casos de Prueba

| Array                | Target | Output Esperado | Explicación                             |
| -------------------- | ------ | --------------- | --------------------------------------- |
| [-1, 0, 3, 5, 9, 12] | 9      | 4               | Elemento encontrado                     |
| [-1, 0, 3, 5, 9, 12] | 2      | -1              | Elemento no encontrado                  |
| [5]                  | 5      | 0               | Array de un elemento                    |
| [5]                  | -5     | -1              | Elemento no encontrado en array pequeño |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Mantén dos punteros: left (inicio) y right (final) del array.

</details>

<details>
<summary>💡 Pista 2</summary>

Calcula el punto medio: mid = Math.floor((left + right) / 2).

</details>

<details>
<summary>💡 Pista 3</summary>

Compara el elemento en mid con el target y ajusta left o right según corresponda.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `binarySearch`
3. Ejecuta los tests: `npm test binary-search`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [LeetCode - Binary Search](https://leetcode.com/problems/binary-search/)
- [Binary Search Algorithm](https://www.geeksforgeeks.org/binary-search/)

---

**💡 Tip:** La búsqueda binaria es fundamental en muchos algoritmos y es mucho más eficiente que la búsqueda lineal para arrays ordenados.
