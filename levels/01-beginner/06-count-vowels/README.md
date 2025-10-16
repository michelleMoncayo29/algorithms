# Count Vowels

**Dificultad:** BEGINNER  
**Categoría:** Strings, Iteración, Condicionales  
**Tiempo estimado:** 10-15 minutos

## 📋 Descripción

Implementa una función que cuente el número de vocales (a, e, i, o, u) en una string dada. Las vocales pueden estar en mayúsculas o minúsculas.

Este ejercicio enseña conceptos fundamentales de manipulación de strings y uso de condicionales.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de iteración sobre strings
- [ ] Practicar el uso de condicionales
- [ ] Aprender a manejar diferentes casos (mayúsculas/minúsculas)
- [ ] Practicar conteo y acumulación de valores
- [ ] Comprender la conversión de strings

## 📝 Enunciado

Implementa la función `countVowels` que tome una string y devuelva el número total de vocales que contiene.

**Restricciones:**
- Considera tanto vocales en mayúsculas como minúsculas
- Solo cuenta las vocales: a, e, i, o, u (y sus equivalentes en mayúsculas)
- Ignora todos los demás caracteres

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
"hello"

// Output esperado
2

// Explicación
// "h" + "e" + "l" + "l" + "o"
// Solo "e" y "o" son vocales = 2 vocales
```

### Ejemplo 2

```javascript
// Input
"HELLO"

// Output esperado
2

// Explicación
// "H" + "E" + "L" + "L" + "O"
// Solo "E" y "O" son vocales = 2 vocales
```

### Ejemplo 3

```javascript
// Input
"Programming"

// Output esperado
3

// Explicación
// "P" + "r" + "o" + "g" + "r" + "a" + "m" + "m" + "i" + "n" + "g"
// Las vocales son: "o", "a", "i" = 3 vocales
```

### Ejemplo 4

```javascript
// Input
"xyz"

// Output esperado
0

// Explicación
// No contiene vocales
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| "hello" | 2 | Vocales: e, o |
| "HELLO" | 2 | Vocales: E, O |
| "Programming" | 3 | Vocales: o, a, i |
| "xyz" | 0 | Sin vocales |
| "aeiou" | 5 | Todas las vocales minúsculas |
| "AEIOU" | 5 | Todas las vocales mayúsculas |
| "aEiOu" | 5 | Vocales mixtas |
| "a" | 1 | Una sola vocal |
| "b" | 0 | Una consonante |
| "" | 0 | String vacía |
| "123" | 0 | Solo números |
| "Hello World!" | 3 | Con espacios y signos |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa un bucle for para iterar sobre cada carácter de la string.

</details>

<details>
<summary>💡 Pista 2</summary>

Convierte cada carácter a minúscula para hacer la comparación más fácil.

</details>

<details>
<summary>💡 Pista 3</summary>

Usa condicionales para verificar si el carácter es una vocal ('a', 'e', 'i', 'o', 'u').

</details>

<details>
<summary>💡 Pista 4</summary>

Mantén un contador que se incremente cada vez que encuentres una vocal.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `countVowels`
3. Ejecuta los tests: `npm test count-vowels`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [String Methods en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [For Loop Tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [Conditional Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

---

**💡 Tip:** Este ejercicio es perfecto para practicar la manipulación básica de strings y el uso de condicionales, habilidades fundamentales en programación.
