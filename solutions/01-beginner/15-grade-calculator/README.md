# Solución: Calculadora de Notas

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos una función que:
1. **Valide** que las notas estén en el rango 0-100
2. **Calcule** el promedio de las notas
3. **Determine** la calificación correspondiente (A, B, C, D, F)
4. **Maneje** casos especiales como arrays vacíos

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Validación temprana**: Verificar casos edge primero
2. **Validación de datos**: Asegurar que todas las notas sean válidas
3. **Cálculo matemático**: Sumar y dividir para obtener el promedio
4. **Lógica condicional**: Usar if-else para determinar la calificación

### Complejidad
- **Tiempo**: O(n) - necesitamos recorrer el array una vez para validar y otra para sumar
- **Espacio**: O(1) - solo usamos variables constantes

## 💻 Solución Implementada

```javascript
function calculateGrade(grades) {
    // 1. Validar que el array no esté vacío
    if (!grades || grades.length === 0) {
        return {
            average: null,
            grade: null,
            isValid: false
        };
    }

    // 2. Validar que todas las notas estén en el rango válido (0-100)
    for (let i = 0; i < grades.length; i++) {
        if (grades[i] < 0 || grades[i] > 100) {
            return {
                average: null,
                grade: null,
                isValid: false
            };
        }
    }

    // 3. Calcular el promedio
    let sum = 0;
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i];
    }
    const average = sum / grades.length;

    // 4. Determinar la calificación basada en el promedio
    let grade;
    if (average >= 90) {
        grade = 'A';
    } else if (average >= 80) {
        grade = 'B';
    } else if (average >= 70) {
        grade = 'C';
    } else if (average >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // 5. Devolver el resultado
    return {
        average: average,
        grade: grade,
        isValid: true
    };
}
```

## 🔄 Versión Alternativa (Más Concisa)

```javascript
function calculateGradeAlternative(grades) {
    // Validar array vacío
    if (!grades || grades.length === 0) {
        return { average: null, grade: null, isValid: false };
    }

    // Validar que todas las notas estén en el rango válido
    const hasInvalidGrade = grades.some(grade => grade < 0 || grade > 100);
    if (hasInvalidGrade) {
        return { average: null, grade: null, isValid: false };
    }

    // Calcular promedio usando reduce
    const sum = grades.reduce((total, grade) => total + grade, 0);
    const average = sum / grades.length;

    // Determinar calificación
    const getGrade = (avg) => {
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        return 'F';
    };

    return {
        average: average,
        grade: getGrade(average),
        isValid: true
    };
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Validación Temprana**
```javascript
if (!grades || grades.length === 0) {
    return { average: null, grade: null, isValid: false };
}
```
- Verificamos primero los casos edge
- Retornamos inmediatamente si no hay datos válidos

### 2. **Validación de Rango**
```javascript
for (let i = 0; i < grades.length; i++) {
    if (grades[i] < 0 || grades[i] > 100) {
        return { average: null, grade: null, isValid: false };
    }
}
```
- Recorremos el array para validar cada nota
- Salimos inmediatamente si encontramos una nota inválida

### 3. **Cálculo del Promedio**
```javascript
let sum = 0;
for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
}
const average = sum / grades.length;
```
- Sumamos todas las notas
- Dividimos por la cantidad de notas

### 4. **Lógica de Calificación**
```javascript
if (average >= 90) {
    grade = 'A';
} else if (average >= 80) {
    grade = 'B';
} else if (average >= 70) {
    grade = 'C';
} else if (average >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}
```
- Usamos condiciones anidadas para determinar la calificación
- El orden es importante: verificamos de mayor a menor

## 🧪 Casos de Prueba Clave

### Casos Válidos
- `[85, 92, 78, 96]` → `{average: 87.75, grade: 'B', isValid: true}`
- `[95, 98, 92, 89]` → `{average: 93.5, grade: 'A', isValid: true}`
- `[45, 52, 38, 41]` → `{average: 44, grade: 'F', isValid: true}`

### Casos Inválidos
- `[85, 105, 78]` → `{average: null, grade: null, isValid: false}`
- `[85, -5, 78]` → `{average: null, grade: null, isValid: false}`
- `[]` → `{average: null, grade: null, isValid: false}`

### Casos Límite
- `[90, 90, 90, 90]` → `{average: 90, grade: 'A', isValid: true}`
- `[80, 80, 80, 80]` → `{average: 80, grade: 'B', isValid: true}`
- `[0, 50, 100]` → `{average: 50, grade: 'F', isValid: true}`

## 🚀 Optimizaciones Posibles

### 1. **Usar Métodos de Array**
```javascript
const sum = grades.reduce((total, grade) => total + grade, 0);
const hasInvalidGrade = grades.some(grade => grade < 0 || grade > 100);
```

### 2. **Función Helper para Calificación**
```javascript
const getGrade = (avg) => {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    return 'F';
};
```

### 3. **Validación en una Pasada**
```javascript
let sum = 0;
for (let i = 0; i < grades.length; i++) {
    if (grades[i] < 0 || grades[i] > 100) {
        return { average: null, grade: null, isValid: false };
    }
    sum += grades[i];
}
```

## 📚 Conceptos Aplicados

1. **Validación de Datos**: Verificar entrada antes de procesar
2. **Manejo de Casos Edge**: Arrays vacíos, valores inválidos
3. **Cálculos Matemáticos**: Suma y división para promedio
4. **Lógica Condicional**: If-else para determinar calificaciones
5. **Estructura de Datos**: Retornar objeto con múltiples propiedades
6. **Iteración**: Bucles for para recorrer arrays

## 🎓 Lecciones Aprendidas

- **Siempre validar entrada**: Es crucial verificar datos antes de procesarlos
- **Manejar casos edge**: Los arrays vacíos y valores inválidos son comunes
- **Estructura clara**: Retornar objetos con propiedades descriptivas
- **Código legible**: Comentarios y nombres de variables claros
- **Testing comprehensivo**: Cubrir todos los casos posibles

---

**💡 Tip:** Esta solución demuestra buenas prácticas de programación: validación temprana, manejo de errores, y código claro y mantenible.
