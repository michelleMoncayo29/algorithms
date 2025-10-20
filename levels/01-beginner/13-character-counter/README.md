# Contador de Caracteres en Texto

**Dificultad:** BEGINNER  
**Categoría:** Strings, Objetos  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Crea una función que cuente cuántas veces aparece cada letra en un texto dado y devuelva un objeto con el conteo de cada carácter.

La función debe ignorar espacios, números y caracteres especiales, enfocándose solo en las letras del alfabeto.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar manipulación de strings
- [ ] Aprender a usar objetos como contadores
- [ ] Entender bucles y iteración sobre strings
- [ ] Desarrollar lógica para filtrar caracteres
- [ ] Practicar el uso de métodos de string (toLowerCase, charAt)

## 📝 Enunciado

Implementa la función `countCharacters` que tome un texto como parámetro y devuelva un objeto donde cada clave es una letra y cada valor es el número de veces que aparece esa letra en el texto.

**Consideraciones importantes:**
- Convierte todas las letras a minúsculas para un conteo uniforme
- Ignora espacios, números y caracteres especiales
- Solo cuenta letras del alfabeto (a-z)
- Si una letra no aparece, no debe incluirse en el resultado

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
countCharacters("Hola mundo")

// Output esperado
{
  h: 1,
  o: 2,
  l: 1,
  a: 1,
  m: 1,
  u: 1,
  n: 1,
  d: 1
}
```

### Ejemplo 2

```javascript
// Input
countCharacters("JavaScript")

// Output esperado
{
  j: 1,
  a: 2,
  v: 1,
  s: 1,
  c: 1,
  r: 1,
  i: 1,
  p: 1,
  t: 1
}
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| "Hola" | {h: 1, o: 1, l: 1, a: 1} | Conteo básico de letras |
| "aabbcc" | {a: 2, b: 2, c: 2} | Letras repetidas |
| "Hola 123 Mundo!" | {h: 1, o: 2, l: 1, a: 1, m: 1, u: 1, n: 1, d: 1} | Ignora números y símbolos |
| "" | {} | String vacío |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa `toLowerCase()` para convertir el texto a minúsculas y hacer el conteo uniforme.

</details>

<details>
<summary>💡 Pista 2</summary>

Crea un objeto vacío para almacenar los conteos y usa un bucle para iterar sobre cada carácter.

</details>

<details>
<summary>💡 Pista 3</summary>

Verifica si el carácter es una letra usando una condición como `char >= 'a' && char <= 'z'`.

</details>

<details>
<summary>💡 Pista 4</summary>

Si el carácter ya existe en el objeto, incrementa su valor. Si no, inicialízalo en 1.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `countCharacters`
3. Ejecuta los tests: `npm test character-counter`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN - String Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)
- [MDN - Objects](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

**💡 Tip:** Este ejercicio te ayudará a entender cómo manipular strings y usar objetos para almacenar datos estructurados, habilidades fundamentales en programación.
