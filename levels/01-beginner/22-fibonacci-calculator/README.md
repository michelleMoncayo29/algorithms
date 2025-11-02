# Ejercicio 22: Calculadora de Fibonacci

## Descripción

Este ejercicio te introduce a la secuencia de Fibonacci, una de las secuencias matemáticas más famosas en programación. La secuencia aparece naturalmente en biología, arte, arquitectura y algoritmos de optimización.

## Objetivos de Aprendizaje

- Comprender la secuencia de Fibonacci y su definición recursiva
- Implementar cálculos iterativos y recursivos
- Aprender a generar secuencias numéricas
- Optimizar algoritmos repetitivos
- Trabajar con propiedades matemáticas

## Conceptos Clave

### ¿Qué es la Secuencia de Fibonacci?

La secuencia de Fibonacci es una serie de números donde cada número es la suma de los dos números anteriores.

**Definición:**
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) para n > 1

**Primeros 15 números:**
```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377
```

### Propiedades Importantes

1. **Crecimiento exponencial**: Aproximadamente φⁿ (número áureo)
2. **En la naturaleza**: Pétalos de flores, conchas espirales, ramas de árboles
3. **En programación**: Sucesión clásica de ejemplos algorítmicos
4. **Optimización**: Requiere memoización para recursión eficiente

## Funciones a Implementar

### 1. `fibonacci(n)`

Calcula el n-ésimo número de Fibonacci.

**Parámetros:**
- `n` (number): Posición en la secuencia (0-based)

**Retorna:** El n-ésimo número de Fibonacci (number) o `null` si es inválido

**Ejemplo:**
```javascript
fibonacci(0)    // 0
fibonacci(1)    // 1
fibonacci(5)    // 5
fibonacci(10)   // 55
fibonacci(20)   // 6765
```

**Secuencia de índices:**
```
F(0)=0  F(1)=1  F(2)=1  F(3)=2  F(4)=3  F(5)=5  F(6)=8  F(7)=13
F(8)=21  F(9)=34  F(10)=55 ...
```

### 2. `fibonacciSequence(n)`

Genera los primeros n números de la secuencia.

**Parámetros:**
- `n` (number): Cantidad de números a generar

**Retorna:** Array con los primeros n Fibonacci (Array) o `null` si es inválido

**Ejemplo:**
```javascript
fibonacciSequence(1)   // [0]
fibonacciSequence(5)   // [0, 1, 1, 2, 3]
fibonacciSequence(10)  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### 3. `isFibonacci(num)`

Verifica si un número pertenece a la secuencia de Fibonacci.

**Parámetros:**
- `num` (number): Número a verificar

**Retorna:** `true` si es Fibonacci, `false` en caso contrario

**Ejemplo:**
```javascript
isFibonacci(0)   // true
isFibonacci(5)   // true
isFibonacci(4)   // false
isFibonacci(55)  // true
isFibonacci(10)  // false
```

**Números de Fibonacci comunes:**
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987...

### 4. `fibonacciSum(n)`

Calcula la suma de los primeros n números de Fibonacci.

**Parámetros:**
- `n` (number): Cantidad de números a sumar

**Retorna:** Suma de los primeros n Fibonacci (number) o `null` si es inválido

**Ejemplo:**
```javascript
fibonacciSum(1)   // 0
fibonacciSum(2)   // 1 (0 + 1)
fibonacciSum(3)   // 2 (0 + 1 + 1)
fibonacciSum(5)   // 7 (0 + 1 + 1 + 2 + 3)
fibonacciSum(10)  // 88
```

### 5. `getFibonacciIndex(num)`

Encuentra el índice de un número en la secuencia de Fibonacci.

**Parámetros:**
- `num` (number): Número de Fibonacci

**Retorna:** Índice del número (number) o `null` si no es Fibonacci

**Ejemplo:**
```javascript
getFibonacciIndex(0)   // 0
getFibonacciIndex(5)   // 5
getFibonacciIndex(55)  // 10
getFibonacciIndex(4)   // null
```

**Nota:** Para números que aparecen múltiples veces en la secuencia (como 1), retorna el primer índice.

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Solo enteros no negativos**: No aceptar negativos ni decimales
2. **Números válidos**: Verificar que los parámetros sean números
3. **Tipos correctos**: Rechazar strings, null, undefined
4. **N > 0**: Para secuencias y sumas, n debe ser positivo

### Casos Edge

- **F(0) = 0**: Caso base especial
- **F(1) = 1**: Caso base especial
- **Números grandes**: 30+ pueden ser lentos con recursión simple
- **Números no Fibonacci**: Deben retornar false o null apropiadamente
- **Suma de 0 elementos**: Retornar null

## Ejemplos de Uso

### Ejemplo 1: Cálculo de Fibonacci Individual

```javascript
// Calcular números específicos
console.log(fibonacci(0));   // 0
console.log(fibonacci(5));   // 5
console.log(fibonacci(10));  // 55
console.log(fibonacci(20));  // 6765

// Secuencia parcial visualizada
for (let i = 0; i < 10; i++) {
    console.log(`F(${i}) = ${fibonacci(i)}`);
}
```

### Ejemplo 2: Generar Secuencia Completa

```javascript
const sequence = fibonacciSequence(15);
console.log('Primeros 15 Fibonacci:', sequence);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]
```

### Ejemplo 3: Verificar Números

```javascript
function checkFibonacciNumbers(numbers) {
    numbers.forEach(num => {
        console.log(`${num}: ${isFibonacci(num) ? 'es' : 'NO es'} Fibonacci`);
    });
}

checkFibonacciNumbers([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 0: es Fibonacci
// 1: es Fibonacci
// 2: NO es Fibonacci
// ...
```

### Ejemplo 4: Análisis de Secuencia

```javascript
function analyzeFibonacci(n) {
    const sequence = fibonacciSequence(n);
    const sum = fibonacciSum(n);
    
    console.log(`Secuencia: ${sequence.join(', ')}`);
    console.log(`Suma: ${sum}`);
    console.log(`Promedio: ${(sum / n).toFixed(2)}`);
}

analyzeFibonacci(10);
```

## Consejos para la Implementación

### 1. Enfoque Iterativo vs Recursivo

**Iterativo (recomendado para este ejercicio):**
```javascript
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}
```

**Recursivo (más elegante pero menos eficiente):**
```javascript
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

**Nota:** La recursión sin memoización es O(2ⁿ), extremadamente lento. La iteración es O(n).

### 2. Generar Secuencia Eficientemente

```javascript
function fibonacciSequence(n) {
    if (n <= 0) return null;
    
    const sequence = [];
    let prev = 0, curr = 1;
    
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            sequence.push(0);
        } else if (i === 1) {
            sequence.push(1);
        } else {
            const next = prev + curr;
            sequence.push(next);
            prev = curr;
            curr = next;
        }
    }
    
    return sequence;
}
```

### 3. Verificar si es Fibonacci

```javascript
function isFibonacci(num) {
    if (num < 0) return false;
    if (num === 0 || num === 1) return true;
    
    let prev = 0, curr = 1;
    
    while (curr < num) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr === num;
}
```

### 4. Calcular Suma sin Almacenar Secuencia

```javascript
function fibonacciSum(n) {
    if (n <= 0) return null;
    
    let sum = 0;
    let prev = 0, curr = 1;
    
    for (let i = 0; i < n; i++) {
        sum += (i === 0 ? 0 : i === 1 ? 1 : prev + curr);
        
        if (i >= 2) {
            const next = prev + curr;
            prev = curr;
            curr = next;
        }
    }
    
    return sum;
}
```

### 5. Optimización: Memoización (Opcional)

Para mejorar rendimiento en cálculos repetidos:

```javascript
const memo = {};
function fibonacciMemoized(n) {
    if (n in memo) return memo[n];
    
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    memo[n] = fibonacciMemoized(n-1) + fibonacciMemoized(n-2);
    return memo[n];
}
```

## Aplicaciones en el Mundo Real

### Matemáticas y Ciencias

- **Número áureo**: La razón F(n+1)/F(n) converge a φ ≈ 1.618
- **Biología**: Patrones de crecimiento, conchas, plantas
- **Arte y Arquitectura**: Proporciones en diseño
- **Teoría de números**: Relaciones matemáticas profundas

### Programación

- **Algoritmos de búsqueda**: Árboles de Fibonacci
- **Optimización**: Problemas de secuencia y búsqueda
- **Recursión**: Ejemplo clásico de recursión y memoización
- **Pruebas de rendimiento**: Benchmarking de funciones

### Tecnología

- **Criptografía**: Algunos algoritmos de seguridad
- **Gráficos**: Spirales de Fibonacci
- **Análisis de datos**: Patrones temporales
- **Machine Learning**: Optimización de hiperparámetros

## Tabla de Referencia Rápida

| Índice | F(n) | Suma Acumulada | Es Fibonacci? |
|--------|------|----------------|---------------|
| 0 | 0 | 0 | Sí |
| 1 | 1 | 1 | Sí |
| 2 | 1 | 2 | Sí |
| 3 | 2 | 4 | No |
| 4 | 3 | 7 | No |
| 5 | 5 | 12 | Sí |
| 6 | 8 | 20 | No |
| 7 | 13 | 33 | No |
| 8 | 21 | 54 | No |
| 9 | 34 | 88 | No |
| 10 | 55 | 143 | Sí |
| 15 | 610 | 2583 | No |
| 20 | 6765 | 17710 | No |

## Preguntas de Reflexión

1. ¿Por qué la recursión simple es ineficiente para Fibonacci?
2. ¿Cuál es la complejidad temporal y espacial de cada enfoque?
3. ¿Qué es la memoización y cómo ayuda?
4. ¿Qué otras secuencias matemáticas conoces?
5. ¿Dónde has visto la secuencia de Fibonacci en la naturaleza?

## Recursos Adicionales

- [Secuencia de Fibonacci en Wikipedia](https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci)
- [Número áureo](https://es.wikipedia.org/wiki/N%C3%BAmero_%C3%A1ureo)
- [Recursión en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions#recursion)
- [Memoización en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions)
- [Matemáticas discretas](https://www.khanacademy.org/math/discrete-math)

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Recursión básica
- Secuencias matemáticas
- Optimización de algoritmos
- Propiedades numéricas
- Iteración y bucles
- Validación de datos

## Próximos Pasos

Después de completar este ejercicio, podrías intentar:
- Implementar memoización para optimizar recursión
- Crear visualizaciones gráficas de la secuencia
- Explorar otras secuencias (Lucas, Tribonacci)
- Analizar la relación con el número áureo
- Implementar versiones eficientes con matrices
- Estudiar aplicaciones en gráficos y diseño

