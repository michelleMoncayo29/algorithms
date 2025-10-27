/**
 * Convertidor de Temperaturas
 * 
 * Descripción: Convierte temperaturas entre las escalas Celsius, Fahrenheit y Kelvin.
 * Aplica las fórmulas matemáticas correctas y valida las entradas.
 * Dificultad: BEGINNER
 * 
 * @param {number} temperature - La temperatura a convertir
 * @param {string} fromScale - Escala de origen ('celsius', 'fahrenheit', 'kelvin')
 * @param {string} toScale - Escala de destino ('celsius', 'fahrenheit', 'kelvin')
 * @returns {number|null} Temperatura convertida redondeada a 2 decimales, o null si es inválida
 * 
 * Ejemplo:
 * convertTemperature(32, 'celsius', 'fahrenheit') // 89.6
 */

function convertTemperature(temperature, fromScale, toScale) {
    // TODO: Implementar la solución aquí

    const from = fromScale.toLocaleLowerCase();
    const to = toScale.toLocaleLowerCase();

    const validScales = ['celsius', 'fahrenheit', 'kelvin'];
    if (!validScales.includes(from) || !validScales.includes(to)) {
        return null;
    }

    if (from === to) {
        return temperature.toFixed(2);
    }
    
    if (from === 'kelvin' && temperature < 0) {
        return null;
    }
    
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
   
    
    // Pista 1: Normaliza las escalas a minúsculas para comparaciones case-insensitive
    // Pista 2: Valida que las escalas sean válidas ('celsius', 'fahrenheit', 'kelvin')
    // Pista 3: Si las escalas son iguales, retorna la temperatura original
    // Pista 4: Para Kelvin, valida que la temperatura no sea negativa
    // Pista 5: Aplica las fórmulas matemáticas correctas según la conversión:
    //          Celsius a Fahrenheit: F = (C × 9/5) + 32
    //          Fahrenheit a Celsius: C = (F - 32) × 5/9
    //          Celsius a Kelvin: K = C + 273.15
    //          Kelvin a Celsius: C = K - 273.15
    //          Fahrenheit a Kelvin: K = (F - 32) × 5/9 + 273.15
    //          Kelvin a Fahrenheit: F = (K - 273.15) × 9/5 + 32
    // Pista 6: Redondea el resultado a 2 decimales usando Math.round(result * 100) / 100
    
    throw new Error('Función no implementada');
}

console.log(convertTemperature(32, 'celsius', 'fahrenheit')) // 89.6)

module.exports = convertTemperature;
