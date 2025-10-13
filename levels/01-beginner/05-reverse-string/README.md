# Reverse String

**Dificultad:** BEGINNER  
**Categoría:** Strings, Arrays, Two Pointers  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Dado un array de caracteres, revierte el string en el lugar (in-place). Debes modificar el array directamente sin usar espacio adicional significativo.

Este es un problema fundamental que enseña manipulación de arrays y la técnica de dos punteros.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de reversión de strings
- [ ] Practicar manipulación de arrays
- [ ] Aprender la técnica de dos punteros
- [ ] Comprender el concepto de "in-place" algorithms

## 📝 Enunciado

Implementa la función `reverseString` que tome un array de caracteres y revierta el orden de los caracteres en el lugar.

**Restricciones:**
- Debes modificar el array directamente
- No puedes usar espacio adicional significativo
- La función no debe devolver nada (void)

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
["h","e","l","l","o"]

// Output esperado
["o","l","l","e","h"]

// Explicación
// Los caracteres se invierten de izquierda a derecha
```

### Ejemplo 2

```javascript
// Input
["H","a","n","n","a","h"]

// Output esperado
["h","a","n","n","a","H"]

// Explicación
// El string "Hannah" se convierte en "hannaH"
```

### Ejemplo 3

```javascript
// Input
["A"," ","m","a","n"]

// Output esperado
["n","a","m"," ","A"]

// Explicación
// Incluye espacios en la reversión
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| ["h","e","l","l","o"] | ["o","l","l","e","h"] | Caso básico |
| ["H","a","n","n","a","h"] | ["h","a","n","n","a","H"] | Con mayúsculas |
| ["A"] | ["A"] | Un solo carácter |
| [] | [] | Array vacío |
| ["a","b"] | ["b","a"] | Dos caracteres |
| ["1","2","3"] | ["3","2","1"] | Con números |
| ["H","e","l","l","o"," ","W","o","r","l","d"] | ["d","l","r","o","W"," ","o","l","l","e","H"] | Con espacios |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa la técnica de dos punteros: uno al inicio del array y otro al final.

</details>

<details>
<summary>💡 Pista 2</summary>

Intercambia los caracteres en las posiciones de los punteros y luego mueve los punteros hacia el centro.

</details>

<details>
<summary>💡 Pista 3</summary>

Continúa intercambiando hasta que los punteros se encuentren o se crucen.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `reverseString`
3. Ejecuta los tests: `npm test reverse-string`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [LeetCode - Reverse String](https://leetcode.com/problems/reverse-string/)
- [Two Pointers Technique](https://www.geeksforgeeks.org/two-pointers-technique/)
- [In-place Algorithm](https://en.wikipedia.org/wiki/In-place_algorithm)

---

**💡 Tip:** Este problema es perfecto para entender la técnica de dos punteros, que es fundamental en muchos algoritmos más avanzados.
