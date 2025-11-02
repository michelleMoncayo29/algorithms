# Ejercicio 19: Calculadora de Factoriales

## Descripción

Este ejercicio te introduce al concepto matemático de factoriales usando JavaScript. Los factoriales son fundamentales en combinatoria, probabilidad y análisis de algoritmos.

## Objetivos de Aprendizaje

- Comprender el concepto matemático de factorial
- Implementar cálculos recursivos e iterativos
- Manejar validaciones y casos edge
- Aprender optimizaciones para operaciones matemáticas
- Trabajar con propiedades de números

## Conceptos Clave

### ¿Qué es un Factorial?

El factorial de un número entero no negativo `n` (escrito como `n!`) es el producto de todos los números positivos menores o iguales a `n`.

**Fórmula:**
```
n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1
```

**Casos especiales:**
- `0! = 1` (por definición)
- `1! = 1`

### Ejemplos

```javascript
5! = 5 × 4 × 3 × 2 × 1 = 120
7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5,040
10! = 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 3,628,800
```

### Propiedades Importantes

1. **Crecimiento exponencial**: Los factoriales crecen extremadamente rápido
2. **Ceros finales**: Cada potencia de 5 agrega ceros finales
3. **Número de dígitos**: Puede calcularse sin calcular el factorial completo
4. **Divisibilidad**: n! es divisible por todos los números de 1 a n

## Funciones a Implementar

### 1. `calculateFactorial(n)`

Calcula el factorial de un número entero no negativo.

**Parámetros:**
- `n` (number): Número cuyo factorial se desea calcular

**Retorna:** Factorial de n (number) o `null` si n es inválido

**Ejemplo:**
```javascript
calculateFactorial(5)  // 120
calculateFactorial(0)  // 1
calculateFactorial(7)  // 5040
```

**Restricciones:**
- `n` debe ser un número entero no negativo
- Retorna `null` para valores inválidos (negativos, decimales, no números)

### 2. `isFactorialOf(n, factorial)`

Verifica si un número dado es el factorial de otro número.

**Parámetros:**
- `n` (number): Número base
- `factorial` (number): Posible factorial de n

**Retorna:** `true` si `n! == factorial`, `false` en caso contrario

**Ejemplo:**
```javascript
isFactorialOf(5, 120)  // true (porque 5! = 120)
isFactorialOf(3, 6)    // true (porque 3! = 6)
isFactorialOf(4, 23)   // false (porque 4! = 24, no 23)
isFactorialOf(0, 1)    // true (porque 0! = 1)
```

### 3. `findFactorialDigits(n)`

Calcula el número de dígitos del factorial de n sin calcular el factorial completo (opcional: optimización).

**Parámetros:**
- `n` (number): Número cuyo factorial se analiza

**Retorna:** Número de dígitos de n! (number) o `null` si n es inválido

**Ejemplo:**
```javascript
findFactorialDigits(5)   // 3 (porque 120 tiene 3 dígitos)
findFactorialDigits(10)  // 7 (porque 3628800 tiene 7 dígitos)
findFactorialDigits(0)   // 1 (porque 1 tiene 1 dígito)
```

### 4. `factorialRange(start, end)`

Calcula los factoriales de todos los números en un rango inclusivo.

**Parámetros:**
- `start` (number): Número inicial del rango (incluido)
- `end` (number): Número final del rango (incluido)

**Retorna:** Array de objetos `{number, factorial}` o `null` si el rango es inválido

**Ejemplo:**
```javascript
factorialRange(0, 5)
// [
//   { number: 0, factorial: 1 },
//   { number: 1, factorial: 1 },
//   { number: 2, factorial: 2 },
//   { number: 3, factorial: 6 },
//   { number: 4, factorial: 24 },
//   { number: 5, factorial: 120 }
// ]

factorialRange(3, 7)
// [
//   { number: 3, factorial: 6 },
//   { number: 4, factorial: 24 },
//   { number: 5, factorial: 120 },
//   { number: 6, factorial: 720 },
//   { number: 7, factorial: 5040 }
// ]
```

**Restricciones:**
- `start` debe ser <= `end`
- Ambos deben ser números enteros no negativos
- Retorna `null` para rangos inválidos

### 5. `countTrailingZeros(n)`

Cuenta los ceros finales en el factorial de n usando una técnica optimizada.

**Parámetros:**
- `n` (number): Número cuyo factorial se analiza

**Retorna:** Número de ceros finales en n! (number) o `null` si n es inválido

**Ejemplo:**
```javascript
countTrailingZeros(5)   // 1 (porque 120 termina en 1 cero)
countTrailingZeros(10)  // 2 (porque 3628800 termina en 2 ceros)
countTrailingZeros(25)  // 6 (porque 25! termina en 6 ceros)
countTrailingZeros(0)   // 0
```

**Importante:** Para esta función, puedes optimizar usando el método de Legendre: contar potencias de 5 en n.

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Números no negativos**: Todos los `n` deben ser >= 0
2. **Enteros**: No se permiten decimales
3. **Tipos válidos**: Solo aceptar números
4. **Rangos válidos**: `start <= end` para `factorialRange`
5. **Casos base**: `0! = 1` y `1! = 1`

### Casos Edge

- **n = 0**: Retorna 1
- **n = 1**: Retorna 1
- **Números negativos**: Retorna `null` o `false`
- **Números decimales**: Retorna `null`
- **Tipos no numéricos**: Retorna `null` o `false`
- **Valores grandes**: Puede ser lento, pero debe funcionar

## Ejemplos de Uso

### Ejemplo 1: Cálculo Básico

```javascript
// Calcular factoriales individuales
console.log(calculateFactorial(5));   // 120
console.log(calculateFactorial(10));  // 3628800

// Verificar resultados
console.log(isFactorialOf(5, 120));   // true
console.log(isFactorialOf(5, 100));   // false
```

### Ejemplo 2: Análisis de Factoriales

```javascript
const n = 10;
const factorial = calculateFactorial(n);
const digits = findFactorialDigits(n);
const trailingZeros = countTrailingZeros(n);

console.log(`${n}! = ${factorial}`);
console.log(`Tiene ${digits} dígitos`);
console.log(`Tiene ${trailingZeros} ceros finales`);
```

### Ejemplo 3: Trabajar con Rangos

```javascript
// Obtener factoriales de 0 a 10
const results = factorialRange(0, 10);

results.forEach(({ number, factorial }) => {
    console.log(`${number}! = ${factorial}`);
});
```

### Ejemplo 4: Verificación y Validación

```javascript
// Verificar varios factoriales
const testCases = [
    { n: 0, expected: 1 },
    { n: 5, expected: 120 },
    { n: 7, expected: 5040 },
    { n: 10, expected: 3628800 }
];

testCases.forEach(({ n, expected }) => {
    const result = calculateFactorial(n);
    const isValid = isFactorialOf(n, expected);
    console.log(`${n}! = ${result}, valid: ${isValid}`);
});
```

## Consejos para la Implementación

### 1. Enfoques para `calculateFactorial`

**Opción A: Bucle iterativo (recomendado)**
```javascript
function calculateFactorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

**Opción B: Recursión**
```javascript
function calculateFactorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * calculateFactorial(n - 1);
}
```

### 2. Optimización: Ceros Finales

Para `countTrailingZeros`, no calcules el factorial completo. Usa el método de Legendre:

```javascript
// Los ceros finales dependen de factores 5 y 2
// Como hay más 2s que 5s, solo cuenta 5s
let count = 0;
for (let i = 5; i <= n; i *= 5) {
    count += Math.floor(n / i);
}
```

**Explicación:**
- 10! = 3628800 tiene 2 ceros porque tiene 2 factores de 5 (en 5 y 10)
- 25! tiene 6 ceros: uno de 5, 10, 15, 20, y dos de 25 (5²)

### 3. Validación Robusta

```javascript
// Validar número entero no negativo
if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    return null;
}
```

### 4. Reutilización de Código

Usa `calculateFactorial` en otras funciones para mantener consistencia y reducir duplicación.

### 5. Manejo de Errores

Siempre valida la entrada y retorna `null` o `false` para casos inválidos, nunca lances errores genéricos.

## Aplicaciones en el Mundo Real

### Matemáticas y Ciencias

- **Combinatoria**: Contar permutaciones y combinaciones
- **Probabilidad**: Calcular probabilidades complejas
- **Series de Taylor**: Expansiones matemáticas
- **Análisis estadístico**: Distribuciones y modelos

### Programación

- **Análisis de algoritmos**: Complejidad de algoritmos recursivos
- **Optimización**: Problemas de optimización combinatoria
- **Criptografía**: Algunos algoritmos de seguridad
- **Teoría de números**: Problemas de divisibilidad

### Ejemplos Prácticos

1. **Permutaciones**: `n!` es el número de formas de ordenar n elementos
2. **Combinaciones**: `C(n,k) = n! / (k! × (n-k)!)`
3. **Distribución de Poisson**: Usa factoriales en fórmulas de probabilidad
4. **Análisis de rendimiento**: Medir complejidad algorítmica

## Preguntas de Reflexión

1. ¿Por qué crecen tan rápido los factoriales?
2. ¿Cuál es la complejidad temporal y espacial de cada función?
3. ¿Cómo se podría optimizar `findFactorialDigits` sin calcular el factorial?
4. ¿Por qué usar el método de Legendre para contar ceros finales es más eficiente?
5. ¿En qué situaciones reales usarías estas funciones?

## Tabla de Referencia Rápida

| n | n! | Dígitos | Ceros Finales |
|---|----|---------| --------------|
| 0 | 1 | 1 | 0 |
| 1 | 1 | 1 | 0 |
| 2 | 2 | 1 | 0 |
| 3 | 6 | 1 | 0 |
| 4 | 24 | 2 | 0 |
| 5 | 120 | 3 | 1 |
| 6 | 720 | 3 | 1 |
| 7 | 5,040 | 4 | 1 |
| 8 | 40,320 | 5 | 1 |
| 9 | 362,880 | 6 | 1 |
| 10 | 3,628,800 | 7 | 2 |
| 15 | 1,307,674,368,000 | 13 | 3 |
| 20 | 2,432,902,008,176,640,000 | 19 | 4 |
| 25 | 15,511,210,043,330,985,984,000,000 | 26 | 6 |

## Recursos Adicionales

- [Factorial en Wikipedia](https://es.wikipedia.org/wiki/Factorial)
- [Método de Legendre](https://es.wikipedia.org/wiki/F%C3%B3rmula_de_Legendre)
- [JavaScript Number Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Combinatoria Básica](https://www.khanacademy.org/math/precalculus/prob-comb)
- [Big Number Library](https://github.com/MikeMcl/bignumber.js/) - Para factoriales extremadamente grandes

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Conceptos matemáticos básicos
- Funciones y recursión
- Validación de entrada
- Optimización de algoritmos
- Casos edge y manejo de errores
- Estructura de código modular

## Próximos Pasos

Después de completar este ejercicio, podrías intentar:
- Implementar factoriales con memoización
- Calcular factoriales usando BigInt para números muy grandes
- Optimizar `findFactorialDigits` con logaritmos
- Implementar funciones combinatorias (permutaciones, combinaciones)
- Explorar la distribución normal y series de Taylor

