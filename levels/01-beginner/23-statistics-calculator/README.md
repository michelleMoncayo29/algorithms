# Ejercicio 23: Calculadora de Estadísticas

## Descripción

Este ejercicio te introduce a la estadística descriptiva básica, un campo fundamental en análisis de datos, ciencia e ingeniería. Aprenderás a calcular medidas de tendencia central y dispersión para describir conjuntos de datos numéricos.

## Objetivos de Aprendizaje

- Comprender medidas de tendencia central (media, mediana, moda)
- Aprender sobre dispersión de datos (rango, desviación estándar)
- Implementar cálculos estadísticos básicos
- Manejar arrays y transformaciones de datos
- Validar y limpiar datos para análisis

## Conceptos Clave

### Estadística Descriptiva

La estadística descriptiva resume y describe las características principales de un conjunto de datos sin hacer inferencias sobre una población mayor.

**Medidas de tendencia central**: Describen dónde está el "centro" de los datos
**Medidas de dispersión**: Describen qué tan "dispersos" están los datos

### Medidas de Tendencia Central

#### Media Aritmética
- **Definición**: Suma de todos los valores dividida por la cantidad
- **Fórmula**: media = Σ(xi) / n
- **Propiedad**: Es sensible a valores extremos (outliers)
- **Ejemplo**: [1, 2, 3, 4, 5] → media = 3

#### Mediana
- **Definición**: Valor que separa la mitad superior e inferior de los datos
- **Propiedad**: No es afectada por valores extremos
- **Cálculo**: Ordenar datos y tomar el valor central
- **Ejemplo**: [1, 2, 3, 4, 5] → mediana = 3

#### Moda
- **Definición**: Valor que aparece con mayor frecuencia
- **Propiedad**: Puede haber múltiples modas o ninguna
- **Ejemplo**: [1, 2, 2, 3] → moda = 2

### Medidas de Dispersión

#### Rango
- **Definición**: Diferencia entre el valor máximo y mínimo
- **Propiedad**: Sensible a valores extremos
- **Ejemplo**: [1, 2, 3, 4, 5] → rango = 4

#### Desviación Estándar
- **Definición**: Mide cuánto se desvían los valores individuales de la media
- **Fórmula**: σ = √(Σ(xi - media)² / n)
- **Propiedad**: Misma unidad que los datos originales
- **Ejemplo**: Datos con mucha variabilidad tienen mayor desviación

## Funciones a Implementar

### 1. `calculateMean(numbers)`

Calcula la media aritmética de un array de números.

**Parámetros:**
- `numbers` (number[]): Array de números

**Retorna:** Media aritmética (number) o `null` si es inválido

**Ejemplo:**
```javascript
calculateMean([1, 2, 3, 4, 5])  // 3
calculateMean([10, 20, 30])     // 20
calculateMean([5, 5, 5, 5])     // 5
```

**Fórmula:** suma_total / cantidad_elementos

### 2. `calculateMedian(numbers)`

Calcula la mediana de un array de números.

**Parámetros:**
- `numbers` (number[]): Array de números

**Retorna:** Mediana (number) o `null` si es inválido

**Ejemplo:**
```javascript
calculateMedian([1, 2, 3, 4, 5])   // 3 (elemento central)
calculateMedian([1, 2, 3, 4])      // 2.5 (promedio de 2 y 3)
calculateMedian([5, 10, 15])       // 10
```

**Algoritmo:**
1. Ordenar el array
2. Si la cantidad es impar → elemento central
3. Si la cantidad es par → promedio de los dos centrales

### 3. `calculateMode(numbers)`

Calcula la moda de un array de números.

**Parámetros:**
- `numbers` (number[]): Array de números

**Retorna:** Array con valores modales (number[]) o `null` si es inválido

**Ejemplo:**
```javascript
calculateMode([1, 2, 2, 3])        // [2]
calculateMode([1, 1, 2, 2, 3])     // [1, 2]
calculateMode([1, 2, 3, 4, 5])     // [] (todos únicos)
```

**Nota:** Si todos los valores tienen frecuencia 1, retorna array vacío

### 4. `calculateRange(numbers)`

Calcula el rango de un array de números.

**Parámetros:**
- `numbers` (number[]): Array de números

**Retorna:** Rango (number) o `null` si es inválido

**Ejemplo:**
```javascript
calculateRange([1, 2, 3, 4, 5])    // 4 (5 - 1)
calculateRange([10, 20, 30])       // 20 (30 - 10)
calculateRange([5, 5, 5])          // 0
```

**Fórmula:** máximo - mínimo

### 5. `calculateStandardDeviation(numbers)`

Calcula la desviación estándar de un array de números.

**Parámetros:**
- `numbers` (number[]): Array de números

**Retorna:** Desviación estándar (number) o `null` si es inválido

**Ejemplo:**
```javascript
calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])  // ≈ 2
calculateStandardDeviation([1, 1, 1, 1])              // 0
```

**Fórmula:** σ = √(Σ(xi - media)² / n)

**Pasos:**
1. Calcular la media
2. Calcular la varianza: promedio de (valor - media)²
3. Raíz cuadrada de la varianza

## Casos Edge y Validaciones

### Validaciones Importantes

1. **Arrays vacíos**: Todas las funciones deben retornar `null`
2. **Tipos válidos**: Verificar que sea array y todos los elementos sean números
3. **NaN e Infinito**: Manejar números inválidos apropiadamente
4. **Ordenamiento**: Mediana requiere ordenar el array
5. **Números decimales**: Redondeo con `toBeCloseTo()` en tests

### Casos Edge

- **Array con un elemento**: Media = Mediana = ese elemento
- **Todos valores iguales**: Rango = 0, Desviación = 0
- **Números negativos**: Todas las estadísticas funcionan
- **Valores únicos**: Moda retorna array vacío
- **Mediana par**: Promedio de dos valores centrales

## Ejemplos de Uso

### Ejemplo 1: Análisis de Calificaciones

```javascript
const grades = [85, 90, 75, 80, 85, 90, 95, 70];

console.log('Media:', calculateMean(grades));      // 83.75
console.log('Mediana:', calculateMedian(grades));  // 85
console.log('Moda:', calculateMode(grades));       // [85, 90]
console.log('Rango:', calculateRange(grades));     // 25
```

### Ejemplo 2: Comparar Datos

```javascript
function compareDatasets(data1, data2) {
    const stats1 = {
        mean: calculateMean(data1),
        median: calculateMedian(data1),
        range: calculateRange(data1)
    };
    
    const stats2 = {
        mean: calculateMean(data2),
        median: calculateMedian(data2),
        range: calculateRange(data2)
    };
    
    return { data1: stats1, data2: stats2 };
}

const sales1 = [100, 200, 300];
const sales2 = [150, 150, 150];

console.log(compareDatasets(sales1, sales2));
```

### Ejemplo 3: Reporte Estadístico Completo

```javascript
function generateStatisticalReport(data) {
    return {
        dataset: data,
        mean: calculateMean(data),
        median: calculateMedian(data),
        mode: calculateMode(data),
        range: calculateRange(data),
        standardDeviation: calculateStandardDeviation(data)
    };
}

const heights = [160, 165, 170, 175, 180, 185];
const report = generateStatisticalReport(heights);
console.log(report);
```

### Ejemplo 4: Detectar Valores Atípicos

```javascript
function detectOutliers(data) {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data);
    const threshold = mean + (2 * stdDev); // 2 desviaciones estándar
    
    return data.filter(value => Math.abs(value - mean) > threshold);
}

const temperatures = [20, 21, 22, 23, 24, 100]; // 100 es outlier
console.log('Outliers:', detectOutliers(temperatures)); // [100]
```

## Consejos para la Implementación

### 1. Validación de Datos

```javascript
function isValidArray(numbers) {
    return Array.isArray(numbers) && 
           numbers.length > 0 && 
           numbers.every(num => typeof num === 'number' && !isNaN(num));
}
```

### 2. Cálculo de Media

```javascript
function calculateMean(numbers) {
    if (!isValidArray(numbers)) return null;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}
```

### 3. Cálculo de Mediana

```javascript
function calculateMedian(numbers) {
    if (!isValidArray(numbers)) return null;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    
    return sorted[mid];
}
```

### 4. Cálculo de Moda

```javascript
function calculateMode(numbers) {
    if (!isValidArray(numbers)) return null;
    
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    if (maxFreq === 1) return [];
    
    return Object.keys(frequency)
        .filter(num => frequency[num] === maxFreq)
        .map(parseFloat)
        .sort((a, b) => a - b);
}
```

### 5. Cálculo de Desviación Estándar

```javascript
function calculateStandardDeviation(numbers) {
    if (!isValidArray(numbers)) return null;
    
    const mean = calculateMean(numbers);
    const variance = numbers.reduce((acc, num) => {
        return acc + Math.pow(num - mean, 2);
    }, 0) / numbers.length;
    
    return Math.sqrt(variance);
}
```

## Aplicaciones en el Mundo Real

### Ciencia e Investigación

- **Análisis experimental**: Resumir resultados de experimentos
- **Mediciones**: Analizar precisión y variabilidad
- **Encuestas**: Describir respuestas de grupos

### Negocios y Economía

- **Ventas**: Analizar rendimiento de productos
- **Recursos humanos**: Calcular salarios promedios
- **Mercados**: Estudiar variabilidad de precios

### Tecnología

- **Performance**: Analizar tiempos de ejecución
- **Analytics**: Describir comportamiento de usuarios
- **Machine Learning**: Análisis exploratorio de datos

### Educación

- **Calificaciones**: Evaluar rendimiento académico
- **Evaluaciones**: Comparar grupos de estudiantes
- **Investigación**: Estadística educativa

## Tabla de Referencia Rápida

| Dato | Media | Mediana | Moda | Rango | Desv. Est. |
|------|-------|---------|------|-------|------------|
| [1,2,3,4,5] | 3 | 3 | [] | 4 | 1.41 |
| [1,2,2,3] | 2 | 2 | [2] | 2 | 0.71 |
| [10,20,30] | 20 | 20 | [] | 20 | 8.16 |
| [5,5,5,5] | 5 | 5 | [5] | 0 | 0 |

## Preguntas de Reflexión

1. ¿Cuándo usar media vs mediana?
2. ¿Por qué la desviación estándar es útil?
3. ¿Qué significa una moda múltiple?
4. ¿Cómo detectar outliers estadísticamente?
5. ¿Qué pasa si todos los datos son iguales?

## Recursos Adicionales

- [Estadística Descriptiva](https://es.wikipedia.org/wiki/Estad%C3%ADstica_descriptiva)
- [Medidas de Tendencia Central](https://www.khanacademy.org/math/statistics-probability)
- [JavaScript Array Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Math Object](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Reducción de Datos](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Dificultad: BEGINNER

Este ejercicio es perfecto para estudiantes que están aprendiendo:
- Medidas estadísticas básicas
- Operaciones con arrays
- Métodos de transformación (map, reduce, sort)
- Validación de datos
- Análisis de datos
- Aplicaciones prácticas

## Próximos Pasos

Después de completar este ejercicio, podrías intentar:
- Agregar percentiles y cuartiles
- Implementar detectores de outliers
- Crear visualizaciones de datos
- Añadir correlación entre variables
- Implementar tests de normalidad
- Explorar estadística inferencial

