# Ejercicio 20: Calculadora de Notación Polaca Inversa (RPN)

## Descripción

Este ejercicio te introduce a la Notación Polaca Inversa (Reverse Polish Notation, RPN), un método de representar expresiones matemáticas donde los operadores van después de los operandos. Es un concepto fundamental en programación, especialmente en calculadoras y compiladores.

## Objetivos de Aprendizaje

- Comprender el concepto de Notación Polaca Inversa
- Implementar evaluación de expresiones usando stacks
- Manejar validación y parsing de expresiones
- Trabajar con operadores matemáticos básicos
- Aprender a manejar casos edge y errores

## Conceptos Clave

### ¿Qué es la Notación Polaca Inversa (RPN)?

La notación polaca inversa es un método de escribir expresiones matemáticas donde:
- Los operandos van primero
- Los operadores van después de sus operandos
- No se necesitan paréntesis debido al orden de evaluación

### Comparación: Notación Infija vs RPN

**Notación Infija (tradicional):**
```
3 + 4
(2 + 3) * 4
```

**Notación RPN:**
```
3 4 +
2 3 + 4 *
```

### Ventajas de RPN

1. **Sin paréntesis**: El orden de operaciones es inequívoco
2. **Eficiente**: Fácil de evaluar usando stacks
3. **Menos ambigüedad**: Una sola manera de interpretar
4. **Usada en**: Calculadoras HP, algunos compiladores, sistemas embebidos

### Cómo Funciona

La evaluación se realiza usando un **stack (pila)**:

1. Leer tokens de izquierda a derecha
2. Si es un número → agregarlo al stack
3. Si es un operador → tomar 2 números del stack, aplicar operación, devolver resultado al stack
4. Al final, queda 1 número en el stack (el resultado)

**Ejemplo paso a paso:**
```
Expresión: 3 4 + 2 *
Tokens:    3  4  +  2  *

Paso 1: Stack = [3]
Paso 2: Stack = [3, 4]
Paso 3: Aplicar +, Stack = [7]
Paso 4: Stack = [7, 2]
Paso 5: Aplicar *, Stack = [14]

Resultado: 14
```

## Funciones a Implementar

### 1. `calculateOperation(a, b, operator)`

Realiza una operación matemática entre dos números.

**Parámetros:**
- `a` (number): Primer operando
- `b` (number): Segundo operando
- `operator` (string): Operador (+, -, *, /)

**Retorna:** Resultado de la operación (number) o `null` si es inválida

**Ejemplo:**
```javascript
calculateOperation(3, 4, '+')  // 7
calculateOperation(10, 5, '-') // 5
calculateOperation(2, 3, '*')  // 6
calculateOperation(15, 3, '/') // 5
calculateOperation(10, 0, '/') // null (división por cero)
```

**Operadores soportados:**
- `+`: Suma
- `-`: Resta
- `*`: Multiplicación
- `/`: División

### 2. `tokenizeExpression(expression)`

Divide una expresión en tokens (números y operadores).

**Parámetros:**
- `expression` (string): Expresión a dividir

**Retorna:** Array de tokens (string[]) o `null` si es inválida

**Ejemplo:**
```javascript
tokenizeExpression('3 4 +')           // ['3', '4', '+']
tokenizeExpression('2 3 + 4 *')       // ['2', '3', '+', '4', '*']
tokenizeExpression('  10  5  -  ')    // ['10', '5', '-']
```

### 3. `stackToNumber(stack)`

Convierte el último elemento del stack a número.

**Parámetros:**
- `stack` (Array): Stack que contiene el resultado

**Retorna:** Número resultante (number) o `null` si el stack está vacío

**Ejemplo:**
```javascript
stackToNumber([7])           // 7
stackToNumber([3, 4, 7])     // 7 (toma el último)
stackToNumber([])            // null
```

### 4. `evaluateRPN(expression)`

Evalúa una expresión en notación polaca inversa.

**Parámetros:**
- `expression` (string): Expresión RPN a evaluar

**Retorna:** Resultado de la expresión (number) o `null` si es inválida

**Ejemplo:**
```javascript
evaluateRPN('3 4 +')         // 7
evaluateRPN('10 5 -')        // 5
evaluateRPN('2 3 + 4 *')     // 20
evaluateRPN('10 0 /')        // null (división por cero)
```

**Algoritmo:**
1. Dividir expresión en tokens
2. Inicializar stack vacío
3. Para cada token:
   - Si es número → push al stack
   - Si es operador → pop 2 números, calcular, push resultado
4. Retornar único número restante en stack

### 5. `isValidRPN(expression)`

Verifica si una expresión RPN es válida.

**Parámetros:**
- `expression` (string): Expresión RPN a verificar

**Retorna:** `true` si es válida, `false` en caso contrario

**Ejemplo:**
```javascript
isValidRPN('3 4 +')          // true
isValidRPN('2 3 + 4 *')      // true
isValidRPN('+ 3 4')          // false (operador primero)
isValidRPN('3 4')            // false (sin operador)
isValidRPN('3 +')            // false (operadores insuficientes)
```

**Reglas de validez:**
- Debe tener al menos 2 operandos y 1 operador
- Operadores nunca pueden ir al inicio
- Al evaluar completamente, debe quedar exactamente 1 operando

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Dividir por cero**: Retorna `null` en `calculateOperation`
2. **Stack insuficiente**: Retorna `null` si no hay suficientes operandos
3. **Operadores inválidos**: Rechaza operadores no soportados
4. **Tokens inválidos**: Maneja espacios extra, strings vacíos
5. **Tipos correctos**: Valida que los parámetros sean del tipo esperado

### Casos Edge

- **Espacios extra**: "  3  4  +  " debe funcionar
- **Números negativos**: "-5 3 +" debe evaluar correctamente
- **Divisiones decimales**: "7 2 /" debe retornar 3.5
- **Expresión vacía**: "" debe retornar null/false
- **Expresiones muy largas**: Múltiples operaciones encadenadas
- **Operadores al inicio**: "+ 3 4" es inválido
- **Demasiados operadores**: "3 4 + -" es inválido

## Ejemplos de Uso

### Ejemplo 1: Operaciones Básicas

```javascript
// Suma
console.log(evaluateRPN('3 4 +'));        // 7

// Resta
console.log(evaluateRPN('10 5 -'));       // 5

// Multiplicación
console.log(evaluateRPN('2 3 *'));        // 6

// División
console.log(evaluateRPN('15 3 /'));       // 5
```

### Ejemplo 2: Expresiones Complejas

```javascript
// Equivalente a: (2 + 3) * 4
console.log(evaluateRPN('2 3 + 4 *'));    // 20

// Equivalente a: ((1 + 2) * 3) - 4
console.log(evaluateRPN('1 2 + 3 * 4 -')); // 5

// Equivalente a: ((15 / 5) * 3) + 2
console.log(evaluateRPN('15 5 / 3 * 2 +')); // 11
```

### Ejemplo 3: Validación y Evaluación

```javascript
const expressions = [
    '3 4 +',
    '+ 3 4',
    '2 3 + 4 *',
    '10 5'
];

expressions.forEach(expr => {
    const isValid = isValidRPN(expr);
    console.log(`${expr}: ${isValid ? 'válida' : 'inválida'}`);
    
    if (isValid) {
        console.log(`Resultado: ${evaluateRPN(expr)}`);
    }
});
```

### Ejemplo 4: Análisis de Token

```javascript
const expr = '2 3 + 4 *';
const tokens = tokenizeExpression(expr);
console.log('Tokens:', tokens);           // ['2', '3', '+', '4', '*']

// Evaluar manualmente
const stack = [];
tokens.forEach(token => {
    if (!isNaN(token)) {
        stack.push(Number(token));
    } else {
        const b = stack.pop();
        const a = stack.pop();
        const result = calculateOperation(a, b, token);
        stack.push(result);
    }
});

console.log('Resultado:', stackToNumber(stack)); // 20
```

## Consejos para la Implementación

### 1. Enfoque para Evaluación RPN

```javascript
function evaluateRPN(expression) {
    // 1. Tokenizar
    const tokens = tokenizeExpression(expression);
    if (!tokens) return null;
    
    // 2. Stack
    const stack = [];
    
    // 3. Procesar tokens
    for (const token of tokens) {
        if (isNumber(token)) {
            stack.push(Number(token));
        } else {
            // Operador: pop 2, calcular, push resultado
            const b = stack.pop();
            const a = stack.pop();
            const result = calculateOperation(a, b, token);
            stack.push(result);
        }
    }
    
    // 4. Verificar resultado final
    return stack.length === 1 ? stack[0] : null;
}
```

### 2. Tokenización Robusta

```javascript
function tokenizeExpression(expression) {
    // Dividir por cualquier cantidad de espacios
    const tokens = expression.split(/\s+/);
    
    // Filtrar strings vacíos
    return tokens.filter(token => token.length > 0);
}
```

### 3. Validación de RPN

```javascript
function isValidRPN(expression) {
    const tokens = tokenizeExpression(expression);
    let operandCount = 0;
    
    for (const token of tokens) {
        if (isNumber(token)) {
            operandCount++;
        } else {
            // Operador necesita 2 operandos
            if (operandCount < 2) return false;
            operandCount--; // Consume 2, produce 1
        }
    }
    
    // Debe quedar exactamente 1
    return operandCount === 1;
}
```

### 4. Manejo de Errores

```javascript
// Siempre validar entrada
if (typeof expression !== 'string') return null;

// Verificar división por cero
if (b === 0) return null;

// Verificar stack suficiente
if (stack.length < 2) return null;

// Verificar resultado final
if (stack.length !== 1) return null;
```

### 5. Detectar Números vs Operadores

```javascript
// Opción 1: Usar Number() y isNaN()
const number = Number(token);
if (!isNaN(number)) {
    // Es un número
}

// Opción 2: Regex
if (/^-?\d+(\.\d+)?$/.test(token)) {
    // Es un número
}
```

## Aplicaciones en el Mundo Real

### Calculadoras

- **Calculadoras HP**: Históricamente usan RPN
- **Calculadoras científicas**: Algunas modelos mantienen RPN como opción
- **Apps de calculadora**: Muchas apps ofrecen modo RPN

### Programación

- **Compiladores**: Evalúan expresiones usando conceptos similares
- **Interpretadores**: Parsing de expresiones matemáticas
- **Lenguajes funcionales**: Algunos usan notación de prefijo (similar)

### Sistemas Embebidos

- **Microcontroladores**: Evaluación eficiente de expresiones
- **IoT**: Procesamiento de datos de sensores
- **Calculadoras de bajo costo**: Implementación simple

### Casos de Uso Educativos

- **Algoritmos de parsing**: Aprender compiladores
- **Estructuras de datos**: Práctica con stacks
- **Preparación para entrevistas**: Preguntas comunes de algoritmos

## Conversión: Infija a RPN

### Algoritmo (usando stack)

Para convertir notación infija a RPN:

1. Leer token por token
2. Si es operando → escribir directamente
3. Si es operador → comparar precedencia con stack
4. Si es `(` → push al stack
5. Si es `)` → pop hasta encontrar `(`
6. Al final, pop todo del stack

**Ejemplo:**
```
Infija:  (2 + 3) * 4
RPN:     2 3 + 4 *
```

## Preguntas de Reflexión

1. ¿Por qué RPN no necesita paréntesis?
2. ¿Cuál es la complejidad temporal de `evaluateRPN`?
3. ¿Cómo manejarías operadores con diferente precedencia?
4. ¿Cuándo usarías RPN en lugar de notación infija?
5. ¿Qué estructura de datos se usa para evaluar RPN y por qué?

## Tabla de Referencia Rápida

| Notación Infija | Notación RPN | Resultado |
|----------------|--------------|-----------|
| 3 + 4 | 3 4 + | 7 |
| 10 - 5 | 10 5 - | 5 |
| 2 * 3 | 2 3 * | 6 |
| 15 / 3 | 15 3 / | 5 |
| (2 + 3) * 4 | 2 3 + 4 * | 20 |
| ((1 + 2) * 3) - 4 | 1 2 + 3 * 4 - | 5 |
| 15 / 5 * 3 + 2 | 15 5 / 3 * 2 + | 11 |

## Recursos Adicionales

- [Reverse Polish Notation en Wikipedia](https://en.wikipedia.org/wiki/Reverse_Polish_notation)
- [Stack Data Structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Number Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
- [Polish Notation en GeeksforGeeks](https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/)

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Estructuras de datos (stacks)
- Evaluación de expresiones
- Parsing y tokenización básica
- Validación de entrada
- Algoritmos simples
- Manejo de casos edge

## Próximos Pasos

Después de completar este ejercicio, podrías intentar:
- Implementar conversión de infija a RPN (Shunting Yard)
- Agregar más operadores (^, %, sqrt, etc.)
- Implementar calculadora con interfaz gráfica
- Añadir soporte para decimales y parentización
- Optimizar para expresiones muy largas
- Implementar eval() personalizado con precedencia

