/**
 * SOLUCIÓN: Convertidor de Temperaturas
 * 
 * Esta es la solución completa para el ejercicio de conversión de temperaturas.
 * La función convierte entre las escalas Celsius, Fahrenheit y Kelvin aplicando
 * las fórmulas matemáticas correctas y validando las entradas.
 * 
 * @param {number} temperature - La temperatura a convertir
 * @param {string} fromScale - Escala de origen ('celsius', 'fahrenheit', 'kelvin')
 * @param {string} toScale - Escala de destino ('celsius', 'fahrenheit', 'kelvin')
 * @returns {number|null} Temperatura convertida redondeada a 2 decimales, o null si es inválida
 */

function convertTemperature(temperature, fromScale, toScale) {
    // 1. Normalizar las escalas a minúsculas para comparaciones case-insensitive
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

// Versión alternativa más concisa usando un objeto de conversiones
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

// Versión con validación más estricta y manejo de errores
function convertTemperatureStrict(temperature, fromScale, toScale) {
    // Validar parámetros de entrada
    if (typeof temperature !== 'number' || isNaN(temperature)) {
        return null;
    }
    
    if (typeof fromScale !== 'string' || typeof toScale !== 'string') {
        return null;
    }
    
    // Normalizar escalas
    const from = fromScale.toLowerCase().trim();
    const to = toScale.toLowerCase().trim();
    
    // Validar escalas
    const validScales = ['celsius', 'fahrenheit', 'kelvin'];
    if (!validScales.includes(from) || !validScales.includes(to)) {
        return null;
    }
    
    // Si son iguales, retornar original
    if (from === to) {
        return Math.round(temperature * 100) / 100;
    }
    
    // Validar temperatura Kelvin (no puede ser negativa)
    if (from === 'kelvin' && temperature < 0) {
        return null;
    }
    
    // Convertir a Celsius
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
    
    // Convertir desde Celsius
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
    
    // Validar resultado final (Kelvin no puede ser negativo)
    if (to === 'kelvin' && result < 0) {
        return null;
    }
    
    return Math.round(result * 100) / 100;
}

module.exports = convertTemperature;
