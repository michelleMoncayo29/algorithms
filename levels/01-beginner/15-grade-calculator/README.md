# Calculadora de Notas

**Dificultad:** BEGINNER  
**Categoría:** Arrays, Matemáticas, Validación de Datos  
**Tiempo estimado:** 20-25 minutos

## 📋 Descripción

Crea una calculadora que determine el promedio de un conjunto de notas y la calificación correspondiente. La función debe validar que las notas estén en el rango válido (0-100) y manejar casos especiales como arrays vacíos.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar iteración sobre arrays
- [ ] Aprender a calcular promedios matemáticos
- [ ] Implementar lógica condicional para calificaciones
- [ ] Manejar validación de datos de entrada
- [ ] Trabajar con casos edge (arrays vacíos, valores inválidos)

## 📝 Enunciado

Implementa la función `calculateGrade` que tome un array de notas (números del 0 al 100) y devuelva un objeto con:
- `average`: El promedio de las notas
- `grade`: La calificación en letra (A, B, C, D, F)
- `isValid`: Si todas las notas son válidas (0-100)

### Sistema de Calificaciones:
- **A**: 90-100
- **B**: 80-89
- **C**: 70-79
- **D**: 60-69
- **F**: 0-59

## 💡 Ejemplos

### Ejemplo 1

```javascript
// Input
calculateGrade([85, 92, 78, 96])

// Output esperado
{
  average: 87.75,
  grade: 'B',
  isValid: true
}

// Explicación
// Promedio: (85 + 92 + 78 + 96) / 4 = 87.75
// 87.75 está en el rango 80-89, por lo tanto es 'B'
```

### Ejemplo 2

```javascript
// Input
calculateGrade([95, 98, 92, 89])

// Output esperado
{
  average: 93.5,
  grade: 'A',
  isValid: true
}

// Explicación
// Promedio: (95 + 98 + 92 + 89) / 4 = 93.5
// 93.5 está en el rango 90-100, por lo tanto es 'A'
```

### Ejemplo 3

```javascript
// Input
calculateGrade([45, 52, 38, 41])

// Output esperado
{
  average: 44,
  grade: 'F',
  isValid: true
}

// Explicación
// Promedio: (45 + 52 + 38 + 41) / 4 = 44
// 44 está en el rango 0-59, por lo tanto es 'F'
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| [85, 92, 78, 96] | {average: 87.75, grade: 'B', isValid: true} | Promedio 87.75 = B |
| [95, 98, 92, 89] | {average: 93.5, grade: 'A', isValid: true} | Promedio 93.5 = A |
| [45, 52, 38, 41] | {average: 44, grade: 'F', isValid: true} | Promedio 44 = F |
| [75, 82, 88, 91] | {average: 84, grade: 'B', isValid: true} | Promedio 84 = B |
| [65, 70, 68, 72] | {average: 68.75, grade: 'D', isValid: true} | Promedio 68.75 = D |
| [85, 105, 78] | {average: null, grade: null, isValid: false} | Nota inválida (105) |
| [85, -5, 78] | {average: null, grade: null, isValid: false} | Nota inválida (-5) |
| [] | {average: null, grade: null, isValid: false} | Array vacío |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Primero valida que todas las notas estén en el rango 0-100. Si alguna nota es inválida, devuelve `isValid: false`.

</details>

<details>
<summary>💡 Pista 2</summary>

Para calcular el promedio, suma todas las notas y divide por la cantidad de notas. Usa `reduce()` para sumar o un bucle `for`.

</details>

<details>
<summary>💡 Pista 3</summary>

Para determinar la calificación, usa una serie de condiciones `if-else` o un `switch` basado en el promedio calculado.

</details>

<details>
<summary>💡 Pista 4</summary>

Maneja el caso especial del array vacío al inicio de la función, antes de cualquier procesamiento.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `calculateGrade`
3. Ejecuta los tests: `npm test grade-calculator`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Array.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Validación de datos en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Validating_object_properties)
- [Operadores de comparación](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Comparison_operators)

---

**💡 Tip:** Este ejercicio combina varios conceptos fundamentales: validación de datos, cálculos matemáticos y lógica condicional. Es perfecto para practicar el pensamiento algorítmico básico.
