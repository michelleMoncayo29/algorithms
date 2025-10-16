# Ejercicio 07: Suma de Números Pares

## Descripción

Crea una función que reciba un array de números y devuelva la suma de todos los números pares en el array.

## Objetivos de Aprendizaje

- Practicar iteración sobre arrays
- Aplicar operador módulo para identificar números pares
- Manejar casos edge (arrays vacíos, números negativos)
- Acumular valores en una variable

## Requisitos

- La función debe llamarse `sumEvenNumbers`
- Debe recibir un array de números como parámetro
- Debe devolver un número (la suma de los pares)
- Un número es par si `numero % 2 === 0`

## Ejemplos

```javascript
sumEvenNumbers([1, 2, 3, 4, 5])    // => 6 (2 + 4)
sumEvenNumbers([2, 4, 6, 8])       // => 20
sumEvenNumbers([1, 3, 5])          // => 0
sumEvenNumbers([])                 // => 0
sumEvenNumbers([-2, -4, 1, 3])     // => -6 (-2 + -4)
```

## Casos de Prueba

El ejercicio incluye los siguientes casos de prueba:

1. **Números pares positivos**: Arrays con números pares positivos
2. **Sin números pares**: Arrays con solo números impares
3. **Números negativos**: Arrays con números pares negativos
4. **Array vacío**: Manejo de arrays sin elementos
5. **Un solo elemento**: Arrays con un solo número
6. **Números cero**: Inclusión del número 0
7. **Números decimales**: Números decimales que son pares

## Pistas

- Usa un bucle `for` o `forEach` para iterar sobre el array
- Usa el operador módulo `%` para verificar si un número es par
- Inicializa una variable para acumular la suma
- Considera que números negativos también pueden ser pares

## Nivel de Dificultad

**Principiante** - Este ejercicio introduce conceptos básicos de iteración y operadores matemáticos.

## Tiempo Estimado

5-10 minutos para estudiantes principiantes.
