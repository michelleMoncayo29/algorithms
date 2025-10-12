# Palindrome Check

**Dificultad:** BEGINNER  
**Categoría:** Strings, Two Pointers  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Determina si una string es un palíndromo. Un palíndromo es una palabra, frase, número u otra secuencia de caracteres que se lee igual hacia adelante y hacia atrás (ignorando espacios, puntuación y capitalización).

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de palíndromos
- [ ] Practicar manipulación de strings
- [ ] Aprender técnicas de validación de entrada
- [ ] Practicar el algoritmo de dos punteros

## 📝 Enunciado

Implementa la función `isPalindrome` que tome una string y devuelva `true` si es un palíndromo, `false` en caso contrario.

Para este ejercicio, considera solo caracteres alfanuméricos e ignora diferencias de capitalización.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
'A man a plan a canal Panama';

// Output esperado
true;

// Explicación
// Después de limpiar: "amanaplanacanalpanama"
// Se lee igual en ambas direcciones
```

### Ejemplo 2

```javascript
// Input
'race a car';

// Output esperado
false;

// Explicación
// Después de limpiar: "raceacar"
// No es un palíndromo
```

### Ejemplo 3

```javascript
// Input
'racecar';

// Output esperado
true;

// Explicación
// Es un palíndromo perfecto
```

## 🔍 Casos de Prueba

| Input                         | Output Esperado | Explicación               |
| ----------------------------- | --------------- | ------------------------- |
| "A man a plan a canal Panama" | true            | Palíndromo con espacios   |
| "race a car"                  | false           | No es palíndromo          |
| "racecar"                     | true            | Palíndromo simple         |
| "A"                           | true            | Un solo carácter          |
| ""                            | true            | String vacía              |
| "Madam"                       | true            | Palíndromo con mayúsculas |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Primero limpia la string removiendo caracteres no alfanuméricos y convirtiendo a minúsculas.

</details>

<details>
<summary>💡 Pista 2</summary>

Usa dos punteros: uno al inicio y otro al final de la string limpia.

</details>

<details>
<summary>💡 Pista 3</summary>

Compara los caracteres en las posiciones de los punteros y muévelos hacia el centro hasta que se encuentren.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `isPalindrome`
3. Ejecuta los tests: `npm test palindrome-check`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [LeetCode - Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
- [Two Pointers Technique](https://www.geeksforgeeks.org/two-pointers-technique/)

---

**💡 Tip:** Este problema es perfecto para practicar la técnica de dos punteros, muy útil en muchos algoritmos.
