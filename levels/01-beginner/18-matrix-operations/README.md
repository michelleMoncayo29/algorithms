# Ejercicio 18: Operaciones con Matrices

## Descripción

Este ejercicio te introduce al mundo de las operaciones con matrices usando JavaScript. Las matrices son estructuras de datos fundamentales en programación y matemáticas, representadas como arrays bidimensionales (array de arrays).

## Objetivos de Aprendizaje

- Comprender la estructura de matrices como arrays bidimensionales
- Implementar operaciones básicas con matrices
- Manejar validaciones y casos edge
- Trabajar con índices y dimensiones
- Aplicar conceptos matemáticos básicos

## Conceptos Clave

### ¿Qué es una Matriz?

Una matriz es una estructura rectangular de números organizados en filas y columnas. En JavaScript, la representamos como un array de arrays:

```javascript
// Matriz 2x3 (2 filas, 3 columnas)
const matrix = [
  [1, 2, 3],  // Fila 0
  [4, 5, 6]   // Fila 1
];
```

### Terminología Importante

- **Filas**: Las líneas horizontales (índice `i`)
- **Columnas**: Las líneas verticales (índice `j`)
- **Elemento**: Un valor específico en la posición `[i][j]`
- **Matriz cuadrada**: Matriz con igual número de filas y columnas
- **Diagonal principal**: Elementos donde `i === j`
- **Traza**: Suma de elementos en la diagonal principal
- **Transpuesta**: Matriz donde filas y columnas se intercambian

## Funciones a Implementar

### 1. `createMatrix(rows, cols, defaultValue)`

Crea una nueva matriz con las dimensiones especificadas.

**Parámetros:**
- `rows` (number): Número de filas
- `cols` (number): Número de columnas  
- `defaultValue` (*): Valor por defecto para llenar la matriz

**Retorna:** Array bidimensional

**Ejemplo:**
```javascript
const matrix = createMatrix(2, 3, 0);
// Resultado: [[0, 0, 0], [0, 0, 0]]
```

### 2. `getMatrixDimensions(matrix)`

Obtiene las dimensiones de una matriz.

**Parámetros:**
- `matrix` (Array): Matriz a analizar

**Retorna:** `{rows: number, cols: number}` o `null` si es inválida

**Ejemplo:**
```javascript
const matrix = [[1, 2], [3, 4], [5, 6]];
const dims = getMatrixDimensions(matrix);
// Resultado: {rows: 3, cols: 2}
```

### 3. `getElement(matrix, row, col)`

Obtiene un elemento específico de la matriz.

**Parámetros:**
- `matrix` (Array): Matriz
- `row` (number): Índice de la fila (0-based)
- `col` (number): Índice de la columna (0-based)

**Retorna:** El elemento o `undefined` si está fuera de rango

**Ejemplo:**
```javascript
const matrix = [[1, 2], [3, 4]];
const element = getElement(matrix, 1, 0);
// Resultado: 3
```

### 4. `setElement(matrix, row, col, value)`

Establece un elemento específico de la matriz.

**Parámetros:**
- `matrix` (Array): Matriz
- `row` (number): Índice de la fila (0-based)
- `col` (number): Índice de la columna (0-based)
- `value` (*): Valor a establecer

**Retorna:** `true` si se estableció, `false` si está fuera de rango

**Ejemplo:**
```javascript
const matrix = [[1, 2], [3, 4]];
const success = setElement(matrix, 0, 1, 99);
// Resultado: true, matrix ahora es [[1, 99], [3, 4]]
```

### 5. `addMatrices(matrix1, matrix2)`

Suma dos matrices del mismo tamaño.

**Parámetros:**
- `matrix1` (Array): Primera matriz
- `matrix2` (Array): Segunda matriz

**Retorna:** Matriz resultante o `null` si no se pueden sumar

**Ejemplo:**
```javascript
const matrix1 = [[1, 2], [3, 4]];
const matrix2 = [[5, 6], [7, 8]];
const result = addMatrices(matrix1, matrix2);
// Resultado: [[6, 8], [10, 12]]
```

### 6. `multiplyMatrixByScalar(matrix, scalar)`

Multiplica una matriz por un escalar.

**Parámetros:**
- `matrix` (Array): Matriz a multiplicar
- `scalar` (number): Escalar por el cual multiplicar

**Retorna:** Matriz resultante o `null` si la matriz no es válida

**Ejemplo:**
```javascript
const matrix = [[1, 2], [3, 4]];
const result = multiplyMatrixByScalar(matrix, 2);
// Resultado: [[2, 4], [6, 8]]
```

### 7. `transposeMatrix(matrix)`

Transpone una matriz (intercambia filas por columnas).

**Parámetros:**
- `matrix` (Array): Matriz a transponer

**Retorna:** Matriz transpuesta o `null` si la matriz no es válida

**Ejemplo:**
```javascript
const matrix = [[1, 2, 3], [4, 5, 6]];
const result = transposeMatrix(matrix);
// Resultado: [[1, 4], [2, 5], [3, 6]]
```

### 8. `isSquareMatrix(matrix)`

Verifica si una matriz es cuadrada.

**Parámetros:**
- `matrix` (Array): Matriz a verificar

**Retorna:** `true` si es cuadrada, `false` en caso contrario

**Ejemplo:**
```javascript
const squareMatrix = [[1, 2], [3, 4]];
const isSquare = isSquareMatrix(squareMatrix);
// Resultado: true
```

### 9. `getMatrixTrace(matrix)`

Calcula la traza de una matriz cuadrada.

**Parámetros:**
- `matrix` (Array): Matriz cuadrada

**Retorna:** Traza (number) o `null` si no es cuadrada

**Ejemplo:**
```javascript
const matrix = [[1, 2], [3, 4]];
const trace = getMatrixTrace(matrix);
// Resultado: 5 (1 + 4)
```

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Dimensiones válidas**: Verificar que `rows` y `cols` sean números positivos
2. **Índices válidos**: Verificar que los índices estén dentro del rango de la matriz
3. **Matrices válidas**: Verificar que el input sea un array bidimensional válido
4. **Compatibilidad de dimensiones**: Para suma, verificar que ambas matrices tengan las mismas dimensiones
5. **Matriz cuadrada**: Para traza, verificar que la matriz sea cuadrada

### Casos Edge

- **Matriz vacía**: `[]` (0x0)
- **Matriz de una fila**: `[[1, 2, 3]]` (1x3)
- **Matriz de una columna**: `[[1], [2], [3]]` (3x1)
- **Matrices con valores negativos**
- **Matrices con valores decimales**
- **Matrices con valores cero**

## Ejemplos de Uso

### Ejemplo 1: Crear y Manipular una Matriz

```javascript
// Crear matriz 3x3 con valores iniciales
const matrix = createMatrix(3, 3, 0);

// Establecer algunos valores
setElement(matrix, 0, 0, 1);
setElement(matrix, 1, 1, 2);
setElement(matrix, 2, 2, 3);

// Obtener dimensiones
const dims = getMatrixDimensions(matrix);
console.log(dims); // {rows: 3, cols: 3}

// Verificar si es cuadrada
console.log(isSquareMatrix(matrix)); // true

// Calcular traza
console.log(getMatrixTrace(matrix)); // 6
```

### Ejemplo 2: Operaciones con Matrices

```javascript
// Crear dos matrices
const matrix1 = [[1, 2], [3, 4]];
const matrix2 = [[5, 6], [7, 8]];

// Sumar matrices
const sum = addMatrices(matrix1, matrix2);
console.log(sum); // [[6, 8], [10, 12]]

// Multiplicar por escalar
const scaled = multiplyMatrixByScalar(sum, 2);
console.log(scaled); // [[12, 16], [20, 24]]

// Transponer
const transposed = transposeMatrix(scaled);
console.log(transposed); // [[12, 20], [16, 24]]
```

### Ejemplo 3: Análisis de Matriz

```javascript
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// Obtener información básica
const dims = getMatrixDimensions(matrix);
console.log(`Matriz ${dims.rows}x${dims.cols}`);

// Verificar propiedades
console.log('Es cuadrada:', isSquareMatrix(matrix));

if (isSquareMatrix(matrix)) {
  console.log('Traza:', getMatrixTrace(matrix));
}

// Acceder a elementos específicos
console.log('Elemento (1,1):', getElement(matrix, 1, 1));
```

## Consejos para la Implementación

### 1. Validación de Entrada
Siempre valida que los parámetros sean del tipo correcto y estén dentro de rangos válidos.

### 2. Manejo de Errores
Retorna valores apropiados (`null`, `undefined`, `false`) cuando las operaciones no pueden realizarse.

### 3. Inmutabilidad
Considera si las operaciones deben modificar la matriz original o crear una nueva.

### 4. Eficiencia
Para matrices grandes, considera la eficiencia de las operaciones.

### 5. Casos Edge
Maneja casos especiales como matrices vacías, de una fila/columna, etc.

## Aplicaciones en el Mundo Real

- **Gráficos por computadora**: Transformaciones 2D y 3D
- **Machine Learning**: Operaciones con datos multidimensionales
- **Simulaciones**: Modelado de sistemas físicos
- **Análisis de datos**: Procesamiento de datasets
- **Juegos**: Física y colisiones
- **Criptografía**: Algoritmos de encriptación

## Recursos Adicionales

- [Matrices en Wikipedia](https://es.wikipedia.org/wiki/Matriz_(matem%C3%A1ticas))
- [Array Methods en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Arrays bidimensionales
- Validación de datos
- Operaciones matemáticas básicas
- Manejo de casos edge
- Estructura de código modular
