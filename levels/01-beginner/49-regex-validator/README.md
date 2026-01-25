# Validador de Expresiones Regulares

**Dificultad:** BEGINNER  
**Categoría:** Strings, Validación, Expresiones Regulares  
**Tiempo estimado:** 30-45 minutos

## 📋 Descripción

Implementa una función que valida si un texto coincide con un patrón de expresión regular específico. Este ejercicio te introducirá al uso básico de expresiones regulares en JavaScript para validar formatos comunes como emails, teléfonos, códigos postales, URLs y fechas.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a crear y usar expresiones regulares básicas en JavaScript
- [ ] Entender cómo validar formatos de texto comunes
- [ ] Practicar el uso del método `test()` de expresiones regulares
- [ ] Aplicar validación de inputs (principio Fail Fast)

## 📝 Enunciado

Crea una función `validateRegex` que reciba dos parámetros:
- `text`: El texto a validar (string)
- `patternType`: El tipo de patrón a validar (string): 'email', 'phone', 'postalCode', 'url', o 'date'

La función debe:
1. Validar que ambos parámetros sean strings
2. Validar que `patternType` sea uno de los tipos permitidos
3. Usar una expresión regular apropiada según el tipo de patrón
4. Retornar `true` si el texto coincide con el patrón, `false` en caso contrario

### Patrones a implementar:

- **email**: Debe contener un @, caracteres antes del @, un dominio válido (ej: `user@example.com`)
- **phone**: Formato de teléfono que puede incluir guiones, espacios o paréntesis (ej: `123-456-7890`, `(123) 456-7890`, `123 456 7890`)
- **postalCode**: Código postal de 5 dígitos o formato ZIP+4 (ej: `12345`, `12345-6789`)
- **url**: URL válida que debe empezar con `http://` o `https://` y tener un dominio válido (ej: `https://example.com`)
- **date**: Fecha en formato MM/DD/YYYY o DD/MM/YYYY (ej: `12/25/2023`, `25/12/2023`)

## 💡 Ejemplos

### Ejemplo 1
```javascript
// Input
validateRegex("user@example.com", "email")

// Output esperado
true

// Explicación
El texto coincide con el patrón de email válido
```

### Ejemplo 2
```javascript
// Input
validateRegex("123-456-7890", "phone")

// Output esperado
true

// Explicación
El texto coincide con el patrón de teléfono válido
```

### Ejemplo 3
```javascript
// Input
validateRegex("invalid-email", "email")

// Output esperado
false

// Explicación
El texto no contiene @ ni tiene formato de email válido
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `validateRegex("test@example.com", "email")` | `true` | Email válido |
| `validateRegex("invalid", "email")` | `false` | No es un email válido |
| `validateRegex("123-456-7890", "phone")` | `true` | Teléfono con guiones |
| `validateRegex("(123) 456-7890", "phone")` | `true` | Teléfono con paréntesis |
| `validateRegex("12345", "postalCode")` | `true` | Código postal de 5 dígitos |
| `validateRegex("12345-6789", "postalCode")` | `true` | Código postal ZIP+4 |
| `validateRegex("https://example.com", "url")` | `true` | URL válida con https |
| `validateRegex("12/25/2023", "date")` | `true` | Fecha en formato MM/DD/YYYY |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Crea expresiones regulares usando la sintaxis `/patrón/flags`. Por ejemplo:
```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

</details>

<details>
<summary>💡 Pista 2</summary>

Usa el método `test()` de la expresión regular para verificar si el texto coincide:
```javascript
const pattern = /^[0-9]{5}$/;
const isValid = pattern.test(text);
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para validar múltiples formatos (como teléfono), puedes usar el operador `|` (OR) en la expresión regular:
```javascript
const phonePattern = /^(\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `validateRegex`
3. Ejecuta los tests: `npm test 49-regex-validator`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegExr - Herramienta para probar expresiones regulares](https://regexr.com/)
- [JavaScript.info: Expresiones Regulares](https://es.javascript.info/regexp-introduction)

---

**💡 Tip:** Las expresiones regulares pueden ser complejas al principio. Empieza con patrones simples y prueba cada uno con diferentes ejemplos antes de combinarlos.

