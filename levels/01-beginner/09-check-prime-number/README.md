# Check Prime Number

**Dificultad:** BEGINNER  
**Categoría:** Matemáticas, Algoritmos  
**Tiempo estimado:** 15-20 minutos

## 📋 Descripción

Determina si un número dado es primo. Un número primo es un número natural mayor que 1 que solo es divisible por 1 y por sí mismo.

Este ejercicio enseña conceptos matemáticos fundamentales y optimización de algoritmos.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender el concepto de números primos
- [ ] Aprender a verificar divisibilidad usando el operador módulo
- [ ] Practicar optimización de bucles (hasta √n)
- [ ] Manejar casos edge (0, 1, 2, números negativos)
- [ ] Comprender la diferencia entre algoritmos simples y optimizados

## 📝 Enunciado

Implementa la función `isPrime` que tome un número entero y devuelva `true` si es primo, `false` en caso contrario.

**Restricciones:**
- Un número primo debe ser mayor que 1
- Solo es divisible por 1 y por sí mismo
- Los números negativos, 0 y 1 no son primos
- El 2 es el único número primo par

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
17

// Output esperado
true

// Explicación
// 17 es divisible solo por 1 y 17
// No es divisible por ningún otro número
```

### Ejemplo 2

```javascript
// Input
15

// Output esperado
false

// Explicación
// 15 es divisible por 1, 3, 5 y 15
// Como tiene más de 2 divisores, no es primo
```

### Ejemplo 3

```javascript
// Input
2

// Output esperado
true

// Explicación
// 2 es el único número primo par
// Es divisible solo por 1 y 2
```

### Ejemplo 4

```javascript
// Input
1

// Output esperado
false

// Explicación
// 1 no se considera primo por definición
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| 17 | true | Número primo |
| 15 | false | Divisible por 3 y 5 |
| 2 | true | Único primo par |
| 1 | false | No es primo por definición |
| 0 | false | No es primo |
| -5 | false | Números negativos no son primos |
| 29 | true | Número primo |
| 25 | false | 5 × 5 = 25 |
| 97 | true | Número primo grande |
| 100 | false | Divisible por muchos números |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Primero verifica los casos edge: números menores o iguales a 1 no son primos.

</details>

<details>
<summary>💡 Pista 2</summary>

El número 2 es especial: es el único número primo par.

</details>

<details>
<summary>💡 Pista 3</summary>

Para números mayores que 2, verifica si son pares. Si son pares, no son primos.

</details>

<details>
<summary>💡 Pista 4</summary>

Para números impares, solo necesitas verificar divisores hasta la raíz cuadrada del número.

</details>

<details>
<summary>💡 Pista 5</summary>

Usa el operador módulo (%) para verificar si un número es divisible por otro.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `isPrime`
3. Ejecuta los tests: `npm test check-prime-number`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Números Primos - Wikipedia](https://es.wikipedia.org/wiki/N%C3%BAmero_primo)
- [Operador Módulo en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)
- [Math.sqrt() - Raíz Cuadrada](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)
- [Algoritmo de Prueba de Primalidad](https://es.wikipedia.org/wiki/Prueba_de_primalidad)

---

**💡 Tip:** Este ejercicio es perfecto para entender algoritmos matemáticos básicos y optimización. Una vez que lo domines, podrás adaptarlo para encontrar todos los primos en un rango.
