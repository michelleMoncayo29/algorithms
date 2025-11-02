/**
 * SOLUCIÓN: Conversor de Sistemas Numéricos
 * 
 * ANÁLISIS DE COMPLEJIDAD:
 * - decimalToBinary: O(log n) tiempo, O(log n) espacio
 * - binaryToDecimal: O(n) tiempo, O(1) espacio
 * - decimalToHex: O(log n) tiempo, O(log n) espacio
 * - hexToDecimal: O(n) tiempo, O(1) espacio
 * - validateNumberInBase: O(n) tiempo, O(1) espacio
 */

/**
 * Convierte un número decimal a binario
 */
function decimalToBinary(decimal) {
    // Validar que decimal sea un número entero no negativo
    if (typeof decimal !== 'number' || decimal < 0 || !Number.isInteger(decimal)) {
        return null;
    }
    
    // Caso especial: 0
    if (decimal === 0) {
        return '0';
    }
    
    // Algoritmo de división repetida por 2
    let result = '';
    let num = decimal;
    
    while (num > 0) {
        result = (num % 2) + result;
        num = Math.floor(num / 2);
    }
    
    return result;
}

/**
 * Convierte un número binario a decimal
 */
function binaryToDecimal(binary) {
    // Validar que binary sea un string válido
    if (typeof binary !== 'string' || binary.length === 0) {
        return null;
    }
    
    // Validar que solo contenga 0s y 1s
    if (!/^[01]+$/.test(binary)) {
        return null;
    }
    
    // Algoritmo de posiciones: cada dígito vale 2^n
    let result = 0;
    const len = binary.length;
    
    for (let i = 0; i < len; i++) {
        const digit = binary[len - 1 - i]; // Leer de derecha a izquierda
        result += parseInt(digit) * Math.pow(2, i);
    }
    
    return result;
}

/**
 * Convierte un número decimal a hexadecimal
 */
function decimalToHex(decimal) {
    // Validar que decimal sea un número entero no negativo
    if (typeof decimal !== 'number' || decimal < 0 || !Number.isInteger(decimal)) {
        return null;
    }
    
    // Caso especial: 0
    if (decimal === 0) {
        return '0';
    }
    
    // Mapeo de dígitos a letras
    const hexChars = '0123456789ABCDEF';
    
    // Algoritmo de división repetida por 16
    let result = '';
    let num = decimal;
    
    while (num > 0) {
        result = hexChars[num % 16] + result;
        num = Math.floor(num / 16);
    }
    
    return result;
}

/**
 * Convierte un número hexadecimal a decimal
 */
function hexToDecimal(hex) {
    // Validar que hex sea un string válido
    if (typeof hex !== 'string' || hex.length === 0) {
        return null;
    }
    
    // Convertir a mayúsculas y validar formato
    const upperHex = hex.toUpperCase();
    if (!/^[0-9A-F]+$/.test(upperHex)) {
        return null;
    }
    
    // Mapeo de caracteres a valores
    const getHexValue = (char) => {
        if (char >= '0' && char <= '9') {
            return char.charCodeAt(0) - '0'.charCodeAt(0);
        } else {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
    };
    
    // Algoritmo de posiciones: cada dígito vale 16^n
    let result = 0;
    const len = upperHex.length;
    
    for (let i = 0; i < len; i++) {
        const char = upperHex[len - 1 - i]; // Leer de derecha a izquierda
        const value = getHexValue(char);
        result += value * Math.pow(16, i);
    }
    
    return result;
}

/**
 * Valida si un número es válido en una base numérica específica
 */
function validateNumberInBase(number, base) {
    // Validar que number sea string y base sea número válido
    if (typeof number !== 'string' || typeof base !== 'number' || !Number.isInteger(base)) {
        return false;
    }
    
    // Validar que base sea soportada (2, 8, 10, 16)
    const supportedBases = [2, 8, 10, 16];
    if (!supportedBases.includes(base)) {
        return false;
    }
    
    // Validar según la base
    const upperNumber = number.toUpperCase();
    
    switch (base) {
        case 2:
            // Base 2 (binario): solo 0-1
            return /^[01]+$/.test(upperNumber);
        
        case 8:
            // Base 8 (octal): solo 0-7
            return /^[0-7]+$/.test(upperNumber);
        
        case 10:
            // Base 10 (decimal): solo 0-9
            return /^[0-9]+$/.test(upperNumber);
        
        case 16:
            // Base 16 (hexadecimal): 0-9 y A-F
            return /^[0-9A-F]+$/.test(upperNumber);
        
        default:
            return false;
    }
}

module.exports = {
    decimalToBinary,
    binaryToDecimal,
    decimalToHex,
    hexToDecimal,
    validateNumberInBase
};

