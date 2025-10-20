# Generador de Permutaciones

**Dificultad:** INTERMEDIATE  
**Categoría:** Recursión, Algoritmos Combinatorios, Backtracking  
**Tiempo estimado:** 30-40 minutos

## 📋 Descripción

Crea una función que genere todas las posibles permutaciones de los elementos de un array dado.

Una permutación es un arreglo de todos los elementos en un orden diferente. Para un array de n elementos, existen n! (n factorial) permutaciones posibles.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de permutaciones en matemáticas
- [ ] Aprender a implementar algoritmos recursivos
- [ ] Practicar técnicas de backtracking
- [ ] Desarrollar habilidades de pensamiento algorítmico
- [ ] Comprender la complejidad temporal de algoritmos combinatorios

## 📝 Enunciado

Implementa la función `generatePermutations` que tome un array como parámetro y devuelva un array de arrays, donde cada sub-array es una permutación diferente de los elementos originales.

**Consideraciones importantes:**
- El array de entrada puede contener elementos de cualquier tipo
- No debe haber permutaciones duplicadas en el resultado
- El orden de las permutaciones en el resultado no importa
- Si el array está vacío, devuelve un array con un array vacío
- Si el array tiene un elemento, devuelve un array con ese elemento

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
generatePermutations([1, 2, 3])

// Output esperado (orden puede variar)
[
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1]
]
```

### Ejemplo 2

```javascript
// Input
generatePermutations(['a', 'b'])

// Output esperado
[
  ['a', 'b'],
  ['b', 'a']
]
```

## 🔍 Casos de Prueba

| Input | Número de Permutaciones | Explicación |
|-------|------------------------|-------------|
| [] | 1 | Array vacío tiene 1 permutación (el array vacío) |
| [1] | 1 | Un elemento tiene 1 permutación |
| [1, 2] | 2 | Dos elementos tienen 2! = 2 permutaciones |
| [1, 2, 3] | 6 | Tres elementos tienen 3! = 6 permutaciones |
| [1, 2, 3, 4] | 24 | Cuatro elementos tienen 4! = 24 permutaciones |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Piensa en un enfoque recursivo: para cada elemento, genera todas las permutaciones del resto de elementos y luego agrega el elemento actual al principio.

</details>

<details>
<summary>💡 Pista 2</summary>

Usa backtracking: selecciona un elemento, genera permutaciones con los elementos restantes, y luego "deshaz" la selección para probar otros elementos.

</details>

<details>
<summary>💡 Pista 3</summary>

Para cada posición en la permutación, prueba cada elemento disponible que no haya sido usado aún.

</details>

<details>
<summary>💡 Pista 4</summary>

Mantén un array de elementos usados o un array de elementos disponibles para evitar duplicados.

</details>

<details>
<summary>💡 Pista 5</summary>

El caso base es cuando no quedan elementos por permutar (array vacío o un solo elemento).

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `generatePermutations`
3. Ejecuta los tests: `npm test permutations-generator`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Permutaciones - Wikipedia](https://es.wikipedia.org/wiki/Permutaci%C3%B3n)
- [Backtracking Algorithm](https://www.geeksforgeeks.org/backtracking-algorithms/)
- [Recursive Permutations](https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/)

## ⚠️ Consideraciones de Rendimiento

- **Complejidad temporal:** O(n! × n) donde n es el número de elementos
- **Complejidad espacial:** O(n! × n) para almacenar todas las permutaciones
- Para arrays grandes (>10 elementos), el número de permutaciones crece exponencialmente

---

**💡 Tip:** Este ejercicio te ayudará a entender algoritmos recursivos complejos y técnicas de backtracking, fundamentales para resolver problemas combinatorios.
