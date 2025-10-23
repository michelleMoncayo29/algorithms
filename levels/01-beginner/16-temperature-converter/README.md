# Convertidor de Temperaturas

**Dificultad:** BEGINNER  
**Categoría:** Matemáticas, Validación de Datos, Conversión de Unidades  
**Tiempo estimado:** 25-30 minutos

## 📋 Descripción

Crea un convertidor de temperaturas que permita convertir entre las tres escalas principales: Celsius, Fahrenheit y Kelvin. La función debe validar las entradas y aplicar las fórmulas matemáticas correctas para cada conversión.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender las fórmulas matemáticas para conversión de temperaturas
- [ ] Practicar implementación de funciones matemáticas
- [ ] Manejar validación de datos de entrada
- [ ] Trabajar con números decimales y redondeo
- [ ] Comprender diferentes sistemas de medición
- [ ] Implementar lógica condicional para múltiples casos

## 📝 Enunciado

Implementa la función `convertTemperature` que tome una temperatura, la escala de origen, la escala de destino, y devuelva la temperatura convertida redondeada a 2 decimales.

### Parámetros:
- `temperature`: Número - La temperatura a convertir
- `fromScale`: String - Escala de origen ('celsius', 'fahrenheit', 'kelvin')
- `toScale`: String - Escala de destino ('celsius', 'fahrenheit', 'kelvin')

### Retorno:
- Número redondeado a 2 decimales, o `null` si la conversión es inválida

## 🧮 Fórmulas Matemáticas

### Conversiones desde Celsius (°C)

#### Celsius a Fahrenheit
```
F = (C × 9/5) + 32
```
**Ejemplo:** 25°C = (25 × 9/5) + 32 = 45 + 32 = 77°F

#### Celsius a Kelvin
```
K = C + 273.15
```
**Ejemplo:** 25°C = 25 + 273.15 = 298.15K

### Conversiones desde Fahrenheit (°F)

#### Fahrenheit a Celsius
```
C = (F - 32) × 5/9
```
**Ejemplo:** 77°F = (77 - 32) × 5/9 = 45 × 5/9 = 25°C

#### Fahrenheit a Kelvin
```
K = (F - 32) × 5/9 + 273.15
```
**Ejemplo:** 77°F = (77 - 32) × 5/9 + 273.15 = 25 + 273.15 = 298.15K

### Conversiones desde Kelvin (K)

#### Kelvin a Celsius
```
C = K - 273.15
```
**Ejemplo:** 298.15K = 298.15 - 273.15 = 25°C

#### Kelvin a Fahrenheit
```
F = (K - 273.15) × 9/5 + 32
```
**Ejemplo:** 298.15K = (298.15 - 273.15) × 9/5 + 32 = 25 × 9/5 + 32 = 77°F

## 📊 Puntos de Referencia Importantes

| Temperatura | Celsius | Fahrenheit | Kelvin |
|-------------|---------|------------|--------|
| Cero absoluto | -273.15°C | -459.67°F | 0K |
| Punto de congelación del agua | 0°C | 32°F | 273.15K |
| Temperatura ambiente | 20°C | 68°F | 293.15K |
| Temperatura corporal | 37°C | 98.6°F | 310.15K |
| Punto de ebullición del agua | 100°C | 212°F | 373.15K |

## 💡 Ejemplos

### Ejemplo 1: Celsius a Fahrenheit

```javascript
// Input
convertTemperature(32, 'celsius', 'fahrenheit')

// Output esperado
89.6

// Cálculo: (32 × 9/5) + 32 = 57.6 + 32 = 89.6
```

### Ejemplo 2: Fahrenheit a Celsius

```javascript
// Input
convertTemperature(212, 'fahrenheit', 'celsius')

// Output esperado
100

// Cálculo: (212 - 32) × 5/9 = 180 × 5/9 = 100
```

### Ejemplo 3: Celsius a Kelvin

```javascript
// Input
convertTemperature(25, 'celsius', 'kelvin')

// Output esperado
298.15

// Cálculo: 25 + 273.15 = 298.15
```

### Ejemplo 4: Kelvin a Fahrenheit

```javascript
// Input
convertTemperature(310.15, 'kelvin', 'fahrenheit')

// Output esperado
98.6

// Cálculo: (310.15 - 273.15) × 9/5 + 32 = 37 × 9/5 + 32 = 66.6 + 32 = 98.6
```

## 🔍 Casos de Prueba

| Temperatura | Desde | Hacia | Output Esperado | Explicación |
|-------------|-------|-------|-----------------|-------------|
| 0 | celsius | fahrenheit | 32 | Punto de congelación |
| 100 | celsius | fahrenheit | 212 | Punto de ebullición |
| 32 | fahrenheit | celsius | 0 | Punto de congelación |
| 212 | fahrenheit | celsius | 100 | Punto de ebullición |
| 0 | celsius | kelvin | 273.15 | Cero Celsius a Kelvin |
| 273.15 | kelvin | celsius | 0 | Cero Kelvin a Celsius |
| 0 | kelvin | celsius | -273.15 | Cero absoluto |
| 25 | celsius | kelvin | 298.15 | Temperatura ambiente |
| 98.6 | fahrenheit | celsius | 37 | Temperatura corporal |
| 37 | celsius | fahrenheit | 98.6 | Temperatura corporal |
| 310.15 | kelvin | fahrenheit | 98.6 | Temperatura corporal |
| 98.6 | fahrenheit | kelvin | 310.15 | Temperatura corporal |

## ⚠️ Validaciones Requeridas

### Escalas Válidas
- `'celsius'`, `'fahrenheit'`, `'kelvin'` (case-insensitive)
- Cualquier otra escala debe retornar `null`

### Límites de Temperatura
- **Kelvin**: No puede ser negativo (mínimo 0K = cero absoluto)
- **Celsius y Fahrenheit**: No tienen límites teóricos, pero considera valores extremos

### Casos Especiales
- Si `fromScale` y `toScale` son iguales, retornar la temperatura original
- Si alguna escala es inválida, retornar `null`
- Si la temperatura en Kelvin es negativa, retornar `null`

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Primero normaliza las escalas a minúsculas para hacer comparaciones case-insensitive.

</details>

<details>
<summary>💡 Pista 2</summary>

Valida que las escalas sean válidas antes de hacer cualquier cálculo. Si no lo son, retorna `null`.

</details>

<details>
<summary>💡 Pista 3</summary>

Si las escalas de origen y destino son iguales, simplemente retorna la temperatura original.

</details>

<details>
<summary>💡 Pista 4</summary>

Para Kelvin, valida que la temperatura no sea negativa antes de hacer conversiones.

</details>

<details>
<summary>💡 Pista 5</summary>

Usa `Math.round()` con multiplicación para redondear a 2 decimales: `Math.round(result * 100) / 100`.

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `convertTemperature`
3. Ejecuta los tests: `npm test temperature-converter`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Escalas de temperatura - Wikipedia](https://es.wikipedia.org/wiki/Escala_de_temperatura)
- [Conversión de temperaturas - Calculadora](https://www.calculadora.com/temperatura/)
- [Math.round() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
- [Validación de strings en JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Validating_object_properties)

---

**💡 Tip:** Este ejercicio combina matemáticas aplicadas con programación. Las fórmulas de conversión son fundamentales en física y ciencias, y este ejercicio te ayudará a entender mejor los diferentes sistemas de medición de temperatura.
