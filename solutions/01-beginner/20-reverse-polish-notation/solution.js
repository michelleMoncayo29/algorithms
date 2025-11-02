/**
 * SOLUCIÓN: Calculadora de Notación Polaca Inversa (RPN)
 * 
 * ANÁLISIS DE COMPLEJIDAD:
 * - calculateOperation: O(1) tiempo, O(1) espacio
 * - tokenizeExpression: O(n) tiempo, O(n) espacio
 * - stackToNumber: O(1) tiempo, O(1) espacio
 * - evaluateRPN: O(n) tiempo, O(n) espacio
 * - isValidRPN: O(n) tiempo, O(1) espacio
 */

/**
 * Realiza una operación matemática entre dos números
 */
function calculateOperation(a, b, operator) {
    // Validar que a y b sean números
    if (typeof a !== 'number' || typeof b !== 'number') {
        return null;
    }
    
    // Validar que operator sea un operador válido
    const validOperators = ['+', '-', '*', '/'];
    if (!validOperators.includes(operator)) {
        return null;
    }
    
    // Realizar la operación según el operador
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            // Verificar división por cero
            if (b === 0) {
                return null;
            }
            return a / b;
        default:
            return null;
    }
}

/**
 * Divide una expresión en tokens (números y operadores)
 */
function tokenizeExpression(expression) {
    // Validar que expression sea un string válido
    if (typeof expression !== 'string') {
        return null;
    }
    
    // Dividir por espacios y filtrar strings vacíos
    const tokens = expression.split(/\s+/).filter(token => token.length > 0);
    
    // Retornar null si no hay tokens
    if (tokens.length === 0) {
        return null;
    }
    
    return tokens;
}

/**
 * Convierte el último elemento del stack a número
 */
function stackToNumber(stack) {
    // Validar que stack sea un array no vacío
    if (!Array.isArray(stack) || stack.length === 0) {
        return null;
    }
    
    // Tomar el último elemento del stack
    const value = stack[stack.length - 1];
    
    // Convertir a número
    const number = Number(value);
    
    // Verificar que sea un número válido
    if (isNaN(number)) {
        return null;
    }
    
    return number;
}

/**
 * Evalúa una expresión en notación polaca inversa
 */
function evaluateRPN(expression) {
    // Validar que expression sea un string válido
    if (typeof expression !== 'string') {
        return null;
    }
    
    // Dividir la expresión en tokens
    const tokens = tokenizeExpression(expression);
    if (tokens === null) {
        return null;
    }
    
    // Stack para almacenar números
    const stack = [];
    
    // Iterar sobre los tokens
    for (const token of tokens) {
        // Verificar si es un número
        const number = Number(token);
        
        if (!isNaN(number)) {
            // Es un número, agregarlo al stack
            stack.push(number);
        } else {
            // Es un operador
            // Verificar que haya al menos 2 números en el stack
            if (stack.length < 2) {
                return null;
            }
            
            // Tomar los últimos 2 números del stack
            const b = stack.pop();
            const a = stack.pop();
            
            // Realizar la operación
            const result = calculateOperation(a, b, token);
            
            // Si la operación falló, retornar null
            if (result === null) {
                return null;
            }
            
            // Agregar el resultado al stack
            stack.push(result);
        }
    }
    
    // Al final, debe quedar exactamente 1 número en el stack
    if (stack.length !== 1) {
        return null;
    }
    
    // Retornar el resultado
    return stackToNumber(stack);
}

/**
 * Verifica si una expresión RPN es válida
 */
function isValidRPN(expression) {
    // Validar que expression sea un string válido
    if (typeof expression !== 'string') {
        return false;
    }
    
    // Dividir la expresión en tokens
    const tokens = tokenizeExpression(expression);
    if (tokens === null) {
        return false;
    }
    
    // Contador de operandos en el stack
    let operandCount = 0;
    
    // Iterar sobre los tokens
    for (const token of tokens) {
        // Verificar si es un número
        const number = Number(token);
        
        if (!isNaN(number)) {
            // Es un operando, incrementar contador
            operandCount++;
        } else {
            // Es un operador
            // Verificar que haya al menos 2 operandos disponibles
            if (operandCount < 2) {
                return false;
            }
            
            // Decrementar contador en 1 (consume 2, produce 1)
            operandCount--;
        }
    }
    
    // Al final, debe quedar exactamente 1 operando
    return operandCount === 1;
}

module.exports = {
    evaluateRPN,
    isValidRPN,
    calculateOperation,
    tokenizeExpression,
    stackToNumber
};

