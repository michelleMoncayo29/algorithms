# Calculadora de Interés Compuesto

**Dificultad:** BEGINNER  
**Categoría:** Matemáticas Financieras, Cálculos  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa funciones para calcular interés compuesto y valor futuro de inversiones. Este ejercicio te enseñará a trabajar con fórmulas financieras, cálculos matemáticos y validación de parámetros.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a implementar fórmulas financieras en JavaScript
- [ ] Practicar cálculos con decimales y precisión
- [ ] Entender el concepto de interés compuesto
- [ ] Aplicar validación de parámetros financieros

## 📝 Enunciado

Implementa dos funciones:

### 1. `calculateCompoundInterest`

Calcula el valor futuro de una inversión con interés compuesto.

**Parámetros:**
- `principal`: Capital inicial (número positivo)
- `rate`: Tasa de interés anual como decimal (ej: 0.05 para 5%)
- `time`: Tiempo en años (número positivo)
- `compoundFrequency`: Frecuencia de capitalización por año (1=anual, 12=mensual, 365=diario). Por defecto 1.

**Fórmula:**
```
A = P * (1 + r/n)^(n*t)
```
Donde:
- A = Monto final
- P = Principal (capital inicial)
- r = Tasa de interés anual
- n = Frecuencia de capitalización por año
- t = Tiempo en años

### 2. `calculateFutureValueWithDeposits`

Calcula el valor futuro de una inversión con depósito inicial y depósitos mensuales periódicos.

**Parámetros:**
- `initialDeposit`: Depósito inicial
- `monthlyDeposit`: Depósito mensual
- `rate`: Tasa de interés anual como decimal
- `years`: Número de años

**Fórmula:**
1. Valor futuro del depósito inicial: usa `calculateCompoundInterest`
2. Valor futuro de los depósitos mensuales:
   ```
   FV = PMT * (((1 + r/12)^(12*t) - 1) / (r/12))
   ```
3. Suma ambos valores

## 💡 Ejemplos

### Ejemplo 1
```javascript
// Input
calculateCompoundInterest(1000, 0.05, 5, 12)

// Output esperado
1283.36 (aproximadamente)

// Explicación
$1000 con interés del 5% anual capitalizado mensualmente por 5 años
```

### Ejemplo 2
```javascript
// Input
calculateCompoundInterest(5000, 0.08, 10, 1)

// Output esperado
10794.62 (aproximadamente)

// Explicación
$5000 con interés del 8% anual capitalizado anualmente por 10 años
```

### Ejemplo 3
```javascript
// Input
calculateFutureValueWithDeposits(1000, 100, 0.05, 10)

// Output esperado
16917.13 (aproximadamente)

// Explicación
$1000 inicial + $100 mensuales con interés del 5% anual por 10 años
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `calculateCompoundInterest(1000, 0.05, 5, 12)` | ~1283.36 | Interés mensual por 5 años |
| `calculateCompoundInterest(5000, 0.08, 10, 1)` | ~10794.62 | Interés anual por 10 años |
| `calculateFutureValueWithDeposits(1000, 100, 0.05, 10)` | ~16917.13 | Inversión con depósitos mensuales |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para calcular potencias, usa `Math.pow()`:
```javascript
const result = Math.pow(1 + rate / frequency, frequency * time);
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para redondear a 2 decimales:
```javascript
const rounded = Math.round(result * 100) / 100;
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para la fórmula de anualidad, asegúrate de manejar el caso cuando la tasa es 0:
```javascript
if (rate === 0) {
    return monthlyDeposit * 12 * years;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las funciones `calculateCompoundInterest` y `calculateFutureValueWithDeposits`
3. Ejecuta los tests: `npm test 51-compound-interest`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Math.pow()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)
- [Interés Compuesto - Wikipedia](https://es.wikipedia.org/wiki/Inter%C3%A9s_compuesto)
- [Valor Futuro de Anualidades](https://es.wikipedia.org/wiki/Anualidad)

---

**💡 Tip:** Presta atención a la precisión decimal. Los cálculos financieros requieren redondeo apropiado a 2 decimales para representar centavos correctamente.

