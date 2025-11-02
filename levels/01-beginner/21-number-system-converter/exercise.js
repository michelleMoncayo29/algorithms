/**
 * Conversor de Sistemas Numéricos
 * 
 * Descripción: Implementa funciones para convertir números entre diferentes bases numéricas
 * (decimal, binario, hexadecimal, octal). Los sistemas numéricos son fundamentales
 * en programación y matemáticas.
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - decimalToBinary(decimal): Convierte decimal a binario
 * - binaryToDecimal(binary): Convierte binario a decimal
 * - decimalToHex(decimal): Convierte decimal a hexadecimal
 * - hexToDecimal(hex): Convierte hexadecimal a decimal
 * - validateNumberInBase(number, base): Valida número en una base específica
 */

/**
 * Convierte un número decimal a binario
 * @param {number} decimal - Número decimal a convertir
 * @returns {string|null} Número en binario o null si es inválido
 * 
 * Ejemplos:
 * decimalToBinary(5) → "101"
 * decimalToBinary(10) → "1010"
 * decimalToBinary(0) → "0"
 * decimalToBinary(255) → "11111111"
 */
function decimalToBinary(decimal) {
    // TODO: Implementar conversión decimal a binario
    // Pista 1: Validar que decimal sea un número entero no negativo
    // Pista 2: Caso especial: 0 debe retornar "0"
    // Pista 3: Usar el algoritmo de división repetida por 2
    // Pista 4: Tomar los restos y construir el número binario
    // Pista 5: El resultado se construye de derecha a izquierda
    // Pista 6: Retornar null si el número es inválido
    
    throw new Error('Función decimalToBinary no implementada');
}

/**
 * Convierte un número binario a decimal
 * @param {string} binary - Número binario a convertir
 * @returns {number|null} Número decimal o null si es inválido
 * 
 * Ejemplos:
 * binaryToDecimal("101") → 5
 * binaryToDecimal("1010") → 10
 * binaryToDecimal("0") → 0
 * binaryToDecimal("11111111") → 255
 */
function binaryToDecimal(binary) {
    // TODO: Implementar conversión binario a decimal
    // Pista 1: Validar que binary sea un string válido
    // Pista 2: Validar que solo contenga 0s y 1s
    // Pista 3: Usar el método de posiciones: cada dígito vale 2^n
    // Pista 4: Empezar desde la derecha (posición 0)
    // Pista 5: Sumar 2^posición * dígito para cada posición
    // Pista 6: Retornar null si el número es inválido
    
    throw new Error('Función binaryToDecimal no implementada');
}

/**
 * Convierte un número decimal a hexadecimal
 * @param {number} decimal - Número decimal a convertir
 * @returns {string|null} Número en hexadecimal o null si es inválido
 * 
 * Ejemplos:
 * decimalToHex(10) → "A"
 * decimalToHex(15) → "F"
 * decimalToHex(255) → "FF"
 * decimalToHex(0) → "0"
 */
function decimalToHex(decimal) {
    // TODO: Implementar conversión decimal a hexadecimal
    // Pista 1: Validar que decimal sea un número entero no negativo
    // Pista 2: Caso especial: 0 debe retornar "0"
    // Pista 3: Usar el algoritmo de división repetida por 16
    // Pista 4: Mapear dígitos mayores a 9 a letras A-F
    // Pista 5: 10→A, 11→B, 12→C, 13→D, 14→E, 15→F
    // Pista 6: Retornar null si el número es inválido
    
    throw new Error('Función decimalToHex no implementada');
}

/**
 * Convierte un número hexadecimal a decimal
 * @param {string} hex - Número hexadecimal a convertir
 * @returns {number|null} Número decimal o null si es inválido
 * 
 * Ejemplos:
 * hexToDecimal("A") → 10
 * hexToDecimal("F") → 15
 * hexToDecimal("FF") → 255
 * hexToDecimal("0") → 0
 */
function hexToDecimal(hex) {
    // TODO: Implementar conversión hexadecimal a decimal
    // Pista 1: Validar que hex sea un string válido
    // Pista 2: Validar que solo contenga 0-9 y A-F (case insensitive)
    // Pista 3: Mapear letras a valores: A→10, B→11, C→12, D→13, E→14, F→15
    // Pista 4: Usar el método de posiciones: cada dígito vale 16^n
    // Pista 5: Convertir cada dígito a su valor decimal
    // Pista 6: Sumar 16^posición * valor_dígito para cada posición
    // Pista 7: Retornar null si el número es inválido
    
    throw new Error('Función hexToDecimal no implementada');
}

/**
 * Valida si un número es válido en una base numérica específica
 * @param {string} number - Número a validar
 * @param {number} base - Base numérica (2, 8, 10, 16)
 * @returns {boolean} true si es válido, false en caso contrario
 * 
 * Ejemplos:
 * validateNumberInBase("101", 2) → true (binario válido)
 * validateNumberInBase("1012", 2) → false (tiene un 2)
 * validateNumberInBase("FF", 16) → true (hex válido)
 * validateNumberInBase("GH", 16) → false (G no es válido)
 */
function validateNumberInBase(number, base) {
    // TODO: Implementar validación de número en base
    // Pista 1: Validar que number sea string y base sea número válido
    // Pista 2: Validar que base sea 2, 8, 10 o 16
    // Pista 3: Para base 2: solo 0-1
    // Pista 4: Para base 8: solo 0-7
    // Pista 5: Para base 10: solo 0-9
    // Pista 6: Para base 16: 0-9 y A-F (case insensitive)
    // Pista 7: Retornar false si es inválido
    
    throw new Error('Función validateNumberInBase no implementada');
}

module.exports = {
    decimalToBinary,
    binaryToDecimal,
    decimalToHex,
    hexToDecimal,
    validateNumberInBase
};

