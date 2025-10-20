# Validador de Contraseñas

**Dificultad:** BEGINNER  
**Categoría:** Strings, Validación, Lógica Condicional  
**Tiempo estimado:** 20-25 minutos

## 📋 Descripción

Crea una función que valide si una contraseña cumple con los requisitos de seguridad básicos.

La función debe verificar múltiples criterios y devolver un objeto con información detallada sobre qué requisitos se cumplen y cuáles no.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar validación de strings
- [ ] Aprender a usar lógica condicional compleja
- [ ] Entender el manejo de múltiples criterios de validación
- [ ] Desarrollar habilidades de análisis de datos
- [ ] Practicar el uso de objetos para estructurar respuestas

## 📝 Enunciado

Implementa la función `validatePassword` que tome una contraseña como parámetro y devuelva un objeto con información detallada sobre la validez de la contraseña.

**Criterios de validación:**
- **Longitud mínima**: Al menos 8 caracteres
- **Mayúsculas**: Al menos una letra mayúscula (A-Z)
- **Minúsculas**: Al menos una letra minúscula (a-z)
- **Números**: Al menos un dígito (0-9)
- **Caracteres especiales**: Al menos un carácter especial (!@#$%^&*)

**Estructura del objeto de respuesta:**
```javascript
{
  isValid: boolean,           // true si cumple todos los criterios
  length: boolean,            // cumple longitud mínima
  hasUppercase: boolean,      // tiene mayúsculas
  hasLowercase: boolean,      // tiene minúsculas
  hasNumbers: boolean,        // tiene números
  hasSpecialChars: boolean,   // tiene caracteres especiales
  score: number              // puntuación de 0 a 5
}
```

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
validatePassword("Password123!")

// Output esperado
{
  isValid: true,
  length: true,
  hasUppercase: true,
  hasLowercase: true,
  hasNumbers: true,
  hasSpecialChars: true,
  score: 5
}
```

### Ejemplo 2

```javascript
// Input
validatePassword("weak")

// Output esperado
{
  isValid: false,
  length: false,
  hasUppercase: false,
  hasLowercase: true,
  hasNumbers: false,
  hasSpecialChars: false,
  score: 1
}
```

## 🔍 Casos de Prueba

| Input | isValid | Score | Explicación |
|-------|---------|-------|-------------|
| "Password123!" | true | 5 | Cumple todos los criterios |
| "password123" | false | 3 | Falta mayúscula y carácter especial |
| "PASSWORD123!" | false | 4 | Falta minúscula |
| "Password!" | false | 4 | Falta número |
| "Password123" | false | 4 | Falta carácter especial |
| "Pass1!" | false | 4 | Falta longitud |
| "weak" | false | 1 | Solo tiene minúsculas |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Crea un objeto para almacenar los resultados de cada validación y calcula el score sumando los criterios cumplidos.

</details>

<details>
<summary>💡 Pista 2</summary>

Usa `password.length >= 8` para verificar la longitud mínima.

</details>

<details>
<summary>💡 Pista 3</summary>

Para verificar mayúsculas, minúsculas y números, puedes usar bucles para iterar sobre cada carácter.

</details>

<details>
<summary>💡 Pista 4</summary>

Para caracteres especiales, verifica si el carácter no es una letra ni un número.

</details>

<details>
<summary>💡 Pista 5</summary>

El score es la suma de todos los criterios cumplidos (máximo 5).

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `validatePassword`
3. Ejecuta los tests: `npm test password-validator`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN - String Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Password Security Best Practices](https://owasp.org/www-project-authentication-cheat-sheet/)

---

**💡 Tip:** Este ejercicio te ayudará a entender cómo implementar validaciones complejas y estructurar respuestas de manera clara, habilidades esenciales en desarrollo de software.
