# Ejercicio 05: Encontrar el Elemento Faltante

## Descripción

Dado un array de números enteros del 1 al n (donde n es la longitud del array + 1) con exactamente un número faltante, encuentra cuál número falta en la secuencia.

## Objetivos de Aprendizaje

- Aplicar fórmulas matemáticas en programación
- Entender la suma de progresión aritmética
- Optimizar soluciones usando matemáticas en lugar de búsquedas
- Manejar arrays no ordenados

## Requisitos

- La función debe llamarse `findMissingElement`
- Debe recibir un array de números como parámetro
- Debe devolver el número faltante
- Debe funcionar con arrays ordenados y no ordenados
- Complejidad: O(n) tiempo, O(1) espacio

## Ejemplos

```javascript
findMissingElement([1, 2, 4, 5])        // => 3
findMissingElement([1, 3, 4, 5, 6])     // => 2
findMissingElement([2, 3, 4, 5, 6])     // => 1
findMissingElement([1, 2, 3, 4, 6])     // => 5
findMissingElement([5, 1, 4, 2])        // => 3 (no ordenado)
```

## Algoritmo Sugerido

### Enfoque Matemático (Recomendado)
1. Calcula la suma esperada usando la fórmula: `n * (n + 1) / 2`
2. Calcula la suma real de los elementos del array
3. La diferencia es el número faltante

### Ejemplo paso a paso:
```
Array: [1, 2, 4, 5]
n = 5 (longitud + 1)
Suma esperada = 5 * 6 / 2 = 15
Suma real = 1 + 2 + 4 + 5 = 12
Número faltante = 15 - 12 = 3
```

## Casos de Prueba

El ejercicio incluye los siguientes casos de prueba:

1. **Elemento faltante en el medio**: Arrays con el número faltante en posición intermedia
2. **Elemento faltante al inicio**: Arrays donde falta el primer número
3. **Elemento faltante al final**: Arrays donde falta el último número
4. **Arrays pequeños**: Arrays de 1-2 elementos
5. **Arrays grandes**: Arrays de 9-10 elementos
6. **Arrays no ordenados**: Arrays con elementos en orden aleatorio
7. **Números negativos**: Arrays que incluyen números negativos en secuencia

## Pistas

- Usa la fórmula de suma de progresión aritmética: `n * (n + 1) / 2`
- `n` es el número más grande que debería estar presente (longitud del array + 1)
- La diferencia entre la suma esperada y la suma real es el número faltante
- No necesitas ordenar el array

## Alternativas de Solución

### Enfoque con Set (menos eficiente)
```javascript
// O(n) tiempo, O(n) espacio
function findMissingElement(numbers) {
    const numSet = new Set(numbers);
    const n = numbers.length + 1;
    
    for (let i = 1; i <= n; i++) {
        if (!numSet.has(i)) {
            return i;
        }
    }
}
```

### Enfoque con Ordenamiento (menos eficiente)
```javascript
// O(n log n) tiempo, O(1) espacio
function findMissingElement(numbers) {
    numbers.sort((a, b) => a - b);
    
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return numbers.length + 1;
}
```

## Nivel de Dificultad

**Intermedio** - Este ejercicio combina programación con conceptos matemáticos y optimización de algoritmos.

## Tiempo Estimado

10-15 minutos para estudiantes de nivel intermedio.

## Conceptos Clave

- **Progresión aritmética**: Secuencia de números con diferencia constante
- **Optimización matemática**: Usar fórmulas para evitar iteraciones innecesarias
- **Complejidad algorítmica**: Entender la diferencia entre O(n) y O(n log n)
