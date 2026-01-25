# Generador de Contraseñas Seguras

**Dificultad:** BEGINNER  
**Categoría:** Strings, Generación Aleatoria, Validación  
**Tiempo estimado:** 30-45 minutos

## 📋 Descripción

Implementa una función que genera contraseñas aleatorias seguras con criterios configurables. Este ejercicio te enseñará a trabajar con generación aleatoria, validación de parámetros, y manipulación de strings en JavaScript.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a generar valores aleatorios usando `Math.random()`
- [ ] Practicar validación de parámetros y opciones
- [ ] Entender cómo construir strings dinámicamente
- [ ] Aplicar el principio Fail Fast en validaciones

## 📝 Enunciado

Crea una función `generatePassword` que reciba dos parámetros:
- `length`: La longitud de la contraseña (número entre 8 y 128)
- `options`: Un objeto opcional con las siguientes propiedades booleanas:
  - `includeUppercase`: Si debe incluir letras mayúsculas (A-Z)
  - `includeLowercase`: Si debe incluir letras minúsculas (a-z)
  - `includeNumbers`: Si debe incluir números (0-9)
  - `includeSpecialChars`: Si debe incluir caracteres especiales (!@#$%^&*)

La función debe:
1. Validar que `length` sea un número entre 8 y 128
2. Validar que al menos una opción esté habilitada
3. Construir un conjunto de caracteres permitidos según las opciones
4. Generar una contraseña aleatoria de la longitud especificada
5. Asegurarse de que la contraseña incluya al menos un carácter de cada tipo habilitado
6. Retornar la contraseña generada

### Caracteres disponibles:
- **Mayúsculas**: A-Z (26 caracteres)
- **Minúsculas**: a-z (26 caracteres)
- **Números**: 0-9 (10 caracteres)
- **Especiales**: !@#$%^&* (8 caracteres)

## 💡 Ejemplos

### Ejemplo 1
```javascript
// Input
generatePassword(12, {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true
})

// Output esperado
"Kp9$mN2@xL4q" // (ejemplo, será diferente cada vez)

// Explicación
Genera una contraseña de 12 caracteres con todos los tipos de caracteres habilitados
```

### Ejemplo 2
```javascript
// Input
generatePassword(10, {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: false,
    includeSpecialChars: false
})

// Output esperado
"XyZaBcDeFg" // (ejemplo, será diferente cada vez)

// Explicación
Genera una contraseña de 10 caracteres solo con letras mayúsculas y minúsculas
```

### Ejemplo 3
```javascript
// Input
generatePassword(8, {
    includeUppercase: false,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: false
})

// Output esperado
"abc12345" // (ejemplo, será diferente cada vez)

// Explicación
Genera una contraseña de 8 caracteres solo con letras minúsculas y números
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `generatePassword(12, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true})` | String de 12 caracteres con todos los tipos | Contraseña completa |
| `generatePassword(10, {includeUppercase: true, includeLowercase: true})` | String de 10 caracteres solo con letras | Solo letras |
| `generatePassword(8, {includeNumbers: true})` | String de 8 caracteres solo con números | Solo números |
| `generatePassword(15)` | Error | Al menos una opción debe estar habilitada |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para generar un número aleatorio entre 0 y un máximo, usa:
```javascript
Math.floor(Math.random() * max);
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para obtener un carácter aleatorio de un string:
```javascript
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomChar = chars[Math.floor(Math.random() * chars.length)];
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para asegurarte de que la contraseña incluya al menos un carácter de cada tipo habilitado:
1. Primero genera un carácter de cada tipo habilitado
2. Luego completa el resto de la longitud con caracteres aleatorios de todos los tipos
3. Finalmente, mezcla todos los caracteres para que no estén en orden predecible

</details>

<details>
<summary>💡 Pista 4</summary>

Para mezclar un array de caracteres, puedes usar el algoritmo Fisher-Yates:
```javascript
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `generatePassword`
3. Ejecuta los tests: `npm test 50-password-generator`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Math.random()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [MDN: String](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Algoritmo Fisher-Yates para mezclar arrays](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

---

**💡 Tip:** Asegúrate de que la contraseña generada siempre incluya al menos un carácter de cada tipo habilitado para garantizar seguridad. Luego completa el resto con caracteres aleatorios y mezcla todo.

