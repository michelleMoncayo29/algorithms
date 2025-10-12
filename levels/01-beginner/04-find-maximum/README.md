# Find Maximum

**Dificultad:** BEGINNER  
**Categoría:** Arrays, Iteración  
**Tiempo estimado:** 10-15 minutos

## 📋 Descripción

Encuentra el número máximo en un array de números enteros. Este es un problema fundamental en programación que enseña conceptos básicos de iteración y comparación.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de iteración sobre arrays
- [ ] Aprender a mantener variables temporales durante bucles
- [ ] Practicar comparaciones entre números
- [ ] Comprender la importancia de casos edge

## 📝 Enunciado

Implementa la función `findMaximum` que tome un array de números enteros y devuelva el número más grande del array.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
[3, 7, 2, 9, 1];

// Output esperado
9;

// Explicación
// El número más grande en el array es 9
```

### Ejemplo 2

```javascript
// Input
[-3, -7, -2, -9, -1] -
  // Output esperado
  1;

// Explicación
// Entre números negativos, -1 es el más grande (menos negativo)
```

### Ejemplo 3

```javascript
// Input
[42];

// Output esperado
42;

// Explicación
// Con un solo elemento, ese elemento es el máximo
```

## 🔍 Casos de Prueba

| Input                | Output Esperado | Explicación                      |
| -------------------- | --------------- | -------------------------------- |
| [3, 7, 2, 9, 1]      | 9               | Array básico con máximo al final |
| [1, 5, 3, 9, 2]      | 9               | Array con máximo en el medio     |
| [42]                 | 42              | Array con un solo elemento       |
| [-3, -7, -2, -9, -1] | -1              | Array con números negativos      |
| [-3, 7, -2, 9, -1]   | 9               | Array mixto positivo/negativo    |
| [5, 5, 5, 5]         | 5               | Array con números repetidos      |
| [9, 7, 5, 3, 1]      | 9               | Array ordenado descendente       |
| [1, 3, 5, 7, 9]      | 9               | Array ordenado ascendente        |
| [0, -1, 5, 0, -3]    | 5               | Array con ceros                  |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Inicializa una variable para guardar el máximo encontrado. Puedes empezar con el primer elemento del array.

</details>

<details>
<summary>💡 Pista 2</summary>

Usa un bucle for para iterar sobre todos los elementos del array, comparando cada elemento con el máximo actual.

</details>

<details>
<summary>💡 Pista 3</summary>

Si encuentras un elemento mayor que el máximo actual, actualiza el máximo. Al final del bucle, devuelve el máximo.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `findMaximum`
3. Ejecuta los tests: `npm test find-maximum`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Array Methods en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Math.max() - Método alternativo](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)
- [For Loop Tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)

---

**💡 Tip:** Este es un problema fundamental que aparece en muchas variaciones. Una vez que lo domines, podrás adaptarlo para encontrar mínimos, segundos máximos, etc.
