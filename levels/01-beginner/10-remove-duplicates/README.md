# Remove Duplicates

**Dificultad:** BEGINNER  
**Categoría:** Arrays, Manipulación de Datos  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Elimina todos los elementos duplicados de un array de números, devolviendo un nuevo array con elementos únicos manteniendo el orden de aparición original.

Este ejercicio enseña manipulación de arrays, seguimiento de elementos vistos y diferentes enfoques algorítmicos.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender la manipulación de arrays sin modificar el original
- [ ] Aprender a usar estructuras de datos para seguimiento (Set, includes)
- [ ] Practicar el mantenimiento del orden de aparición
- [ ] Comprender diferentes enfoques algorítmicos (O(n²) vs O(n))
- [ ] Manejar casos edge (arrays vacíos, un solo elemento)

## 📝 Enunciado

Implementa la función `removeDuplicates` que tome un array de números y devuelva un nuevo array sin elementos duplicados, manteniendo el orden de aparición.

**Restricciones:**
- No modifiques el array original
- Mantén el orden de aparición de los elementos
- Devuelve un nuevo array
- Maneja números negativos y decimales

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
[1, 2, 2, 3, 4, 4, 5]

// Output esperado
[1, 2, 3, 4, 5]

// Explicación
// Se eliminan los duplicados: 2 y 4
// Se mantiene el orden de aparición
```

### Ejemplo 2

```javascript
// Input
[5, 5, 5, 5]

// Output esperado
[5]

// Explicación
// Solo queda un elemento después de eliminar duplicados
```

### Ejemplo 3

```javascript
// Input
[1, 2, 3]

// Output esperado
[1, 2, 3]

// Explicación
// No hay duplicados, el array permanece igual
```

### Ejemplo 4

```javascript
// Input
[]

// Output esperado
[]

// Explicación
// Array vacío permanece vacío
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| [1, 2, 2, 3, 4, 4, 5] | [1, 2, 3, 4, 5] | Duplicados en el medio |
| [5, 5, 5, 5] | [5] | Todos los elementos iguales |
| [1, 2, 3] | [1, 2, 3] | Sin duplicados |
| [] | [] | Array vacío |
| [42] | [42] | Un solo elemento |
| [1, 1, 2, 2, 3, 3] | [1, 2, 3] | Duplicados consecutivos |
| [1, 2, 1, 2, 1, 2] | [1, 2] | Duplicados no consecutivos |
| [-1, -1, 0, 1, 1] | [-1, 0, 1] | Con números negativos |
| [1.5, 1.5, 2.5] | [1.5, 2.5] | Con decimales |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Crea un nuevo array vacío para almacenar los elementos únicos.

</details>

<details>
<summary>💡 Pista 2</summary>

Itera sobre el array original y verifica si cada elemento ya existe en el nuevo array.

</details>

<details>
<summary>💡 Pista 3</summary>

Usa el método `includes()` para verificar si un elemento ya está en el array de resultados.

</details>

<details>
<summary>💡 Pista 4</summary>

Solo agrega el elemento al nuevo array si no está presente (usando `push()`).

</details>

<details>
<summary>💡 Pista 5 (Optimización)</summary>

Para una solución más eficiente, considera usar un `Set` para el seguimiento de elementos vistos.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `removeDuplicates`
3. Ejecuta los tests: `npm test remove-duplicates`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Array Methods en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Set Object en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [includes() Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [Removing Duplicates from Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

---

**💡 Tip:** Este ejercicio es perfecto para entender la diferencia entre diferentes enfoques algorítmicos. Puedes implementarlo de manera simple con `includes()` o de manera más eficiente con `Set`.
