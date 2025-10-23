# Solución: Convertidor de Temperaturas

## 📋 Análisis del Problema

Este ejercicio requiere que implementemos una función que:
1. **Convierta** entre las tres escalas principales de temperatura
2. **Valide** las escalas de entrada y las temperaturas
3. **Aplique** las fórmulas matemáticas correctas
4. **Maneje** casos especiales como escalas iguales y Kelvin negativos

## 🧠 Estrategia de Solución

### Enfoque Principal
1. **Normalización**: Convertir escalas a minúsculas para comparaciones case-insensitive
2. **Validación**: Verificar que las escalas sean válidas
3. **Conversión intermedia**: Usar Celsius como escala intermedia
4. **Aplicación de fórmulas**: Implementar las fórmulas matemáticas correctas
5. **Redondeo**: Redondear el resultado a 2 decimales

### Complejidad
- **Tiempo**: O(1) - operaciones constantes independientes del tamaño de entrada
- **Espacio**: O(1) - solo variables constantes

## 💻 Solución Implementada

```javascript
function convertTemperature(temperature, fromScale, toScale) {
    // 1. Normalizar las escalas a minúsculas
    const from = fromScale.toLowerCase();
    const to = toScale.toLowerCase();
    
    // 2. Validar que las escalas sean válidas
    const validScales = ['celsius', 'fahrenheit', 'kelvin'];
    if (!validScales.includes(from) || !validScales.includes(to)) {
        return null;
    }
    
    // 3. Si las escalas son iguales, retornar la temperatura original
    if (from === to) {
        return Math.round(temperature * 100) / 100;
    }
    
    // 4. Validar temperatura Kelvin (no puede ser negativa)
    if (from === 'kelvin' && temperature < 0) {
        return null;
    }
    
    // 5. Convertir a Celsius como escala intermedia
    let celsius;
    switch (from) {
        case 'celsius':
            celsius = temperature;
            break;
        case 'fahrenheit':
            celsius = (temperature - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = temperature - 273.15;
            break;
    }
    
    // 6. Convertir desde Celsius a la escala destino
    let result;
    switch (to) {
        case 'celsius':
            result = celsius;
            break;
        case 'fahrenheit':
            result = (celsius * 9/5) + 32;
            break;
        case 'kelvin':
            result = celsius + 273.15;
            break;
    }
    
    // 7. Redondear a 2 decimales y retornar
    return Math.round(result * 100) / 100;
}
```

## 🔄 Versión Alternativa (Más Concisa)

```javascript
function convertTemperatureAlternative(temperature, fromScale, toScale) {
    // Normalizar escalas
    const from = fromScale.toLowerCase();
    const to = toScale.toLowerCase();
    
    // Validar escalas
    const validScales = ['celsius', 'fahrenheit', 'kelvin'];
    if (!validScales.includes(from) || !validScales.includes(to)) {
        return null;
    }
    
    // Si son iguales, retornar original
    if (from === to) {
        return Math.round(temperature * 100) / 100;
    }
    
    // Validar Kelvin negativo
    if (from === 'kelvin' && temperature < 0) {
        return null;
    }
    
    // Objeto con funciones de conversión a Celsius
    const toCelsius = {
        celsius: (temp) => temp,
        fahrenheit: (temp) => (temp - 32) * 5/9,
        kelvin: (temp) => temp - 273.15
    };
    
    // Objeto con funciones de conversión desde Celsius
    const fromCelsius = {
        celsius: (temp) => temp,
        fahrenheit: (temp) => (temp * 9/5) + 32,
        kelvin: (temp) => temp + 273.15
    };
    
    // Convertir: origen -> Celsius -> destino
    const celsius = toCelsius[from](temperature);
    const result = fromCelsius[to](celsius);
    
    return Math.round(result * 100) / 100;
}
```

## 🎯 Puntos Clave de la Solución

### 1. **Normalización de Escalas**
```javascript
const from = fromScale.toLowerCase();
const to = toScale.toLowerCase();
```
- Permite comparaciones case-insensitive
- Maneja 'CELSIUS', 'Celsius', 'celsius' de la misma manera

### 2. **Validación de Escalas**
```javascript
const validScales = ['celsius', 'fahrenheit', 'kelvin'];
if (!validScales.includes(from) || !validScales.includes(to)) {
    return null;
}
```
- Verifica que las escalas sean válidas antes de procesar
- Retorna `null` para escalas inválidas

### 3. **Conversión Intermedia a Celsius**
```javascript
let celsius;
switch (from) {
    case 'celsius':
        celsius = temperature;
        break;
    case 'fahrenheit':
        celsius = (temperature - 32) * 5/9;
        break;
    case 'kelvin':
        celsius = temperature - 273.15;
        break;
}
```
- Usa Celsius como escala intermedia
- Simplifica las conversiones a solo 6 fórmulas en lugar de 9

### 4. **Aplicación de Fórmulas Matemáticas**
```javascript
// Fórmulas implementadas:
// Celsius a Fahrenheit: F = (C × 9/5) + 32
// Fahrenheit a Celsius: C = (F - 32) × 5/9
// Celsius a Kelvin: K = C + 273.15
// Kelvin a Celsius: C = K - 273.15
```

### 5. **Redondeo a 2 Decimales**
```javascript
return Math.round(result * 100) / 100;
```
- Multiplica por 100, redondea, y divide por 100
- Asegura precisión de 2 decimales

## 🧪 Casos de Prueba Clave

### Conversiones Básicas
- `convertTemperature(32, 'celsius', 'fahrenheit')` → `89.6`
- `convertTemperature(212, 'fahrenheit', 'celsius')` → `100`
- `convertTemperature(25, 'celsius', 'kelvin')` → `298.15`

### Puntos de Referencia
- **Congelación del agua**: 0°C = 32°F = 273.15K
- **Ebullición del agua**: 100°C = 212°F = 373.15K
- **Temperatura corporal**: 37°C = 98.6°F = 310.15K

### Casos Edge
- **Escalas iguales**: `convertTemperature(25, 'celsius', 'celsius')` → `25`
- **Kelvin negativo**: `convertTemperature(-1, 'kelvin', 'celsius')` → `null`
- **Escalas inválidas**: `convertTemperature(25, 'invalid', 'fahrenheit')` → `null`

## 🚀 Optimizaciones Implementadas

### 1. **Conversión Intermedia**
- En lugar de 9 fórmulas directas, usamos 6 fórmulas (3 a Celsius + 3 desde Celsius)
- Reduce la complejidad y facilita el mantenimiento

### 2. **Validación Temprana**
- Verificamos escalas inválidas antes de hacer cálculos
- Validamos Kelvin negativo antes de procesar

### 3. **Manejo de Casos Especiales**
- Escalas iguales se manejan sin cálculos
- Redondeo consistente para todos los resultados

## 📚 Fórmulas Matemáticas Aplicadas

### Conversiones a Celsius (Escala Intermedia)
```javascript
// Desde Fahrenheit
celsius = (fahrenheit - 32) × 5/9

// Desde Kelvin  
celsius = kelvin - 273.15

// Desde Celsius (sin cambio)
celsius = celsius
```

### Conversiones desde Celsius
```javascript
// A Fahrenheit
fahrenheit = (celsius × 9/5) + 32

// A Kelvin
kelvin = celsius + 273.15

// A Celsius (sin cambio)
celsius = celsius
```

## 🎓 Conceptos Aplicados

1. **Matemáticas Aplicadas**: Fórmulas de conversión de temperatura
2. **Validación de Datos**: Verificación de escalas y rangos válidos
3. **Lógica Condicional**: Switch statements para diferentes casos
4. **Manejo de Strings**: Normalización y comparación case-insensitive
5. **Precisión Numérica**: Redondeo a decimales específicos
6. **Manejo de Errores**: Retorno de `null` para casos inválidos

## 🎓 Lecciones Aprendidas

- **Celsius como escala intermedia**: Simplifica las conversiones
- **Validación temprana**: Evita cálculos innecesarios
- **Normalización de entrada**: Mejora la robustez del código
- **Fórmulas matemáticas**: Aplicación práctica de física básica
- **Precisión numérica**: Importancia del redondeo en cálculos

---

**💡 Tip:** Esta solución demuestra cómo las matemáticas aplicadas se integran perfectamente con la programación. Las fórmulas de conversión de temperatura son fundamentales en física y ciencias, y este ejercicio ayuda a entender mejor los diferentes sistemas de medición.
