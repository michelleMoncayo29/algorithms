/**
 * Calculadora de Notación Polaca Inversa (RPN)
 *
 * Descripción: Implementa funciones para evaluar expresiones en notación polaca inversa (RPN).
 * La notación polaca inversa es un método de escribir expresiones matemáticas donde los operadores
 * van después de los operandos. Por ejemplo: "3 4 +" = 3 + 4 = 7
 * Dificultad: BEGINNER
 *
 * Funciones requeridas:
 * - evaluateRPN(expression): Evalúa una expresión RPN completa
 * - isValidRPN(expression): Verifica si una expresión RPN es válida
 * - calculateOperation(a, b, operator): Realiza una operación entre dos números
 * - tokenizeExpression(expression): Divide la expresión en tokens
 * - stackToNumber(stack): Convierte el resultado final del stack a número
 */

/**
 * Evalúa una expresión en notación polaca inversa
 * @param {string} expression - Expresión RPN a evaluar (ej: "3 4 +")
 * @returns {number|null} Resultado de la expresión o null si es inválida
 *
 * Ejemplos:
 * evaluateRPN("3 4 +") → 7
 * evaluateRPN("10 5 -") → 5
 * evaluateRPN("2 3 *") → 6
 * evaluateRPN("15 3 /") → 5
 * evaluateRPN("2 3 + 4 *") → 20
 */
function evaluateRPN(expression) {
  // TODO: Implementar evaluación de expresión RPN

  if (typeof expression !== 'string') {
    return null;
  }

  const arr = tokenizeExpression(expression);

  const stack = [];
  const arrSigno = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const pro = Number(element);
    if (!Number.isNaN(pro)) {
      stack.push(pro);
    } else {
      arrSigno.push(element);
    }
  }

  let count = stack[0];

  for (let o = 0; o < arrSigno.length; o++) {
    const operator = arrSigno[o];

    for (let n = 1; n < stack.length; n++) {
      const number = stack[n];
      const result = calculateOperation(count, number, operator);
      count = result;
    }
  }

  return count;

  // Pista 1: Validar que expression sea un string válido
  // Pista 2: Dividir la expresión en tokens usando tokenizeExpression
  // Pista 3: Usar un stack (array) para almacenar números
  // Pista 4: Iterar sobre los tokens
  // Pista 5: Si es un número, agregarlo al stack
  // Pista 6: Si es un operador, tomar los últimos 2 números del stack
  // Pista 7: Aplicar la operación usando calculateOperation
  // Pista 8: Retornar el resultado final o null si hay error
}
console.log(evaluateRPN('2 + 3'));

/**
 * Verifica si una expresión RPN es válida
 * @param {string} expression - Expresión RPN a verificar
 * @returns {boolean} true si la expresión es válida, false en caso contrario
 *
 * Ejemplos:
 * isValidRPN("3 4 +") → true
 * isValidRPN("+ 3 4") → false (operador antes de operandos)
 * isValidRPN("3 4") → false (sin operador)
 * isValidRPN("3 +") → false (no hay suficientes operandos)
 */
function isValidRPN(expression) {
  // TODO: Implementar validación de expresión RPN
  // Pista 1: Validar que expression sea un string válido
  // Pista 2: Dividir la expresión en tokens
  // Pista 3: Usar un contador para llevar cuenta de operandos
  // Pista 4: Para números, incrementar contador
  // Pista 5: Para operadores, verificar que haya al menos 2 operandos
  // Pista 6: Decrementar contador en 1 (operador consume 2, produce 1)
  // Pista 7: Al final, debe quedar exactamente 1 operando

  throw new Error('Función isValidRPN no implementada');
}

/**
 * Realiza una operación matemática entre dos números
 * @param {number} a - Primer operando
 * @param {number} b - Segundo operando
 * @param {string} operator - Operador (+, -, *, /)
 * @returns {number|null} Resultado de la operación o null si es inválida
 *
 * Ejemplos:
 * calculateOperation(3, 4, '+') → 7
 * calculateOperation(10, 5, '-') → 5
 * calculateOperation(2, 3, '*') → 6
 * calculateOperation(15, 3, '/') → 5
 */
function calculateOperation(a, b, operator) {
  /*
        Pista 1: Validar que a y b sean números
        Pista 2: Validar que operator sea un operador válido
        Pista 3: Usar switch o if-else para cada operador
        Pista 4: Para división, verificar división por cero
        Pista 5: Retornar null para operadores no soportados
    */

  if (typeof a !== 'number' || typeof b !== 'number') {
    return null;
  }

  const array = ['+', '-', '*', '/'];
  if (!array.includes(operator)) {
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
      if (b === 0) {
        return null;
      }
      return a / b;
    default:
      return null;
  }
}
// console.log(calculateOperation(5, 3, '+'));

/**
 * Divide una expresión en tokens (números y operadores)
 * @param {string} expression - Expresión a dividir
 * @returns {Array|null} Array de tokens o null si la expresión es inválida
 *
 * Ejemplos:
 * tokenizeExpression("3 4 +") → ['3', '4', '+']
 * tokenizeExpression("10 5 - 2 *") → ['10', '5', '-', '2', '*']
 */
function tokenizeExpression(expression) {
  // TODO: Implementar división en tokens
  /*
        Pista 1: Validar que expression sea un string válido
        Pista 2: Usar split para dividir por espacios
        Pista 3: Filtrar strings vacíos
        Pista 4: Retornar el array de tokens o null si está vacío
    */

  if (typeof expression != 'string') {
    return null;
  }

  const string = expression.replace(/\s+/g, ' ');
  const arr = string.split(' ');
  const result = arr.filter(token => token.length > 0);
  if (result.length === 0) {
    return null;
  }

  return result;
}

// console.log(tokenizeExpression('10 5 - 2 /'));

/**
 * Convierte el último elemento del stack a número
 * @param {Array} stack - Stack que contiene el resultado
 * @returns {number|null} Número resultante o null si el stack está vacío
 */
function stackToNumber(stack) {
  // TODO: Implementar conversión de stack a número
  // Pista 1: Validar que stack sea un array no vacío
  // Pista 2: Tomar el último elemento del stack
  // Pista 3: Convertir a número
  // Pista 4: Verificar que sea un número válido
  // Pista 5: Retornar null si hay error

  if (!Array.isArray(stack) || stack.length === 0) {
    return null;
  }

  const ultimated = stack[stack.length - 1];

  return ultimated;
}

// console.log(stackToNumber([7]));

module.exports = {
  evaluateRPN,
  isValidRPN,
  calculateOperation,
  tokenizeExpression,
  stackToNumber,
};
