# Fizz Buzz

**Dificultad:** BEGINNER  
**Categoría:** Lógica básica, Condicionales  
**Tiempo estimado:** 10-15 minutos

## 📋 Descripción

Implementa el juego clásico de Fizz Buzz. Para números del 1 al n, devuelve un array de strings donde:

- Para múltiplos de 3, usa "Fizz"
- Para múltiplos de 5, usa "Buzz"
- Para múltiplos de ambos 3 y 5, usa "FizzBuzz"
- Para cualquier otro número, usa el número como string

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar el uso de condicionales
- [ ] Entender el operador módulo (%)
- [ ] Aprender a manejar múltiples condiciones
- [ ] Practicar la conversión de tipos

## 📝 Enunciado

Implementa la función `fizzBuzz` que tome un número entero `n` y devuelva un array de strings siguiendo las reglas del juego Fizz Buzz.

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
n = (3)[
  // Output esperado
  ('1', '2', 'Fizz')
];

// Explicación
// 1 -> "1" (no es múltiplo de 3 ni 5)
// 2 -> "2" (no es múltiplo de 3 ni 5)
// 3 -> "Fizz" (múltiplo de 3)
```

### Ejemplo 2

```javascript
// Input
n = (15)[
  // Output esperado
  ('1',
  '2',
  'Fizz',
  '4',
  'Buzz',
  'Fizz',
  '7',
  '8',
  'Fizz',
  'Buzz',
  '11',
  'Fizz',
  '13',
  '14',
  'FizzBuzz')
];

// Explicación
// 15 -> "FizzBuzz" (múltiplo de 3 y 5)
```

## 🔍 Casos de Prueba

| Input | Output Esperado                                                                                         | Explicación             |
| ----- | ------------------------------------------------------------------------------------------------------- | ----------------------- |
| 1     | ["1"]                                                                                                   | Solo un número          |
| 3     | ["1", "2", "Fizz"]                                                                                      | Incluye primer Fizz     |
| 5     | ["1", "2", "Fizz", "4", "Buzz"]                                                                         | Incluye primer Buzz     |
| 15    | ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] | Incluye primer FizzBuzz |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa el operador módulo (%) para verificar si un número es múltiplo de otro.

</details>

<details>
<summary>💡 Pista 2</summary>

Recuerda que FizzBuzz (múltiplo de 3 y 5) debe verificarse antes que Fizz o Buzz individualmente.

</details>

<details>
<summary>💡 Pista 3</summary>

Usa un bucle for para iterar desde 1 hasta n, y convierte los números a string usando toString().

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `fizzBuzz`
3. Ejecuta los tests: `npm test fizz-buzz`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [LeetCode - Fizz Buzz](https://leetcode.com/problems/fizz-buzz/)
- [Operador Módulo en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)

---

**💡 Tip:** Este es un ejercicio clásico de entrevistas que evalúa tu comprensión de lógica básica y condicionales.
