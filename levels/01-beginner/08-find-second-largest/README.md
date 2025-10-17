# Find Second Largest

**Dificultad:** BEGINNER  
**Categoría:** Arrays, Lógica de Comparación  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Encuentra el segundo número más grande en un array de números enteros. Este ejercicio enseña conceptos importantes sobre el seguimiento de múltiples valores y el manejo de casos edge.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de seguimiento de múltiples valores
- [ ] Practicar lógica de comparación compleja
- [ ] Aprender a manejar casos edge (arrays con elementos repetidos, menos de 2 elementos)
- [ ] Comprender la diferencia entre encontrar el máximo y el segundo máximo
- [ ] Practicar el manejo de valores especiales (null, undefined)

## 📝 Enunciado

Implementa la función `findSecondLargest` que tome un array de números enteros y devuelva el segundo número más grande del array.

**Restricciones:**
- Si el array tiene menos de 2 elementos únicos, devuelve `null`
- Si todos los elementos son iguales, devuelve `null`
- El array puede contener números negativos
- El array puede contener elementos repetidos

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
[3, 7, 2, 9, 1]

// Output esperado
7

// Explicación
// Los números ordenados: [9, 7, 3, 2, 1]
// El más grande es 9, el segundo más grande es 7
```

### Ejemplo 2

```javascript
// Input
[5, 5, 4, 2]

// Output esperado
4

// Explicación
// Los números únicos ordenados: [5, 4, 2]
// El más grande es 5, el segundo más grande es 4
```

### Ejemplo 3

```javascript
// Input
[9, 9, 9]

// Output esperado
null

// Explicación
// Todos los elementos son iguales, no hay segundo más grande
```

### Ejemplo 4

```javascript
// Input
[42]

// Output esperado
null

// Explicación
// Solo hay un elemento, no hay segundo más grande
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| [3, 7, 2, 9, 1] | 7 | Caso básico con segundo máximo |
| [5, 5, 4, 2] | 4 | Con elementos repetidos |
| [9, 9, 9] | null | Todos los elementos iguales |
| [42] | null | Solo un elemento |
| [] | null | Array vacío |
| [-3, -7, -2, -9, -1] | -2 | Con números negativos |
| [1, 2] | 1 | Solo dos elementos |
| [2, 2, 1] | 1 | Máximo repetido |
| [10, 10, 10, 5] | 5 | Múltiples máximos iguales |
| [0, -1, 5, 0, -3] | 0 | Con ceros |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Mantén dos variables: una para el número más grande y otra para el segundo más grande.

</details>

<details>
<summary>💡 Pista 2</summary>

Inicializa ambas variables con valores muy pequeños (como -Infinity) para manejar números negativos.

</details>

<details>
<summary>💡 Pista 3</summary>

Para cada número en el array:
- Si es mayor que el máximo actual, actualiza tanto el máximo como el segundo máximo
- Si es menor que el máximo pero mayor que el segundo máximo, actualiza solo el segundo máximo

</details>

<details>
<summary>💡 Pista 4</summary>

Al final, verifica si el segundo máximo sigue siendo -Infinity. Si es así, significa que no hay segundo máximo válido.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `findSecondLargest`
3. Ejecuta los tests: `npm test find-second-largest`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Finding Second Largest Element in Array](https://www.geeksforgeeks.org/find-second-largest-element-array/)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)

---

**💡 Tip:** Este ejercicio es excelente para practicar el seguimiento de múltiples valores durante una iteración, una habilidad muy útil en algoritmos más complejos.
