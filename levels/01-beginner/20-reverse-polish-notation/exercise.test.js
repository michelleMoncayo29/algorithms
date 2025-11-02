const {
  evaluateRPN,
  isValidRPN,
  calculateOperation,
  tokenizeExpression,
  stackToNumber,
} = require('./exercise');
// } = require('../../../solutions/01-beginner/20-reverse-polish-notation/solution');

describe('Calculadora de Notación Polaca Inversa (RPN)', () => {
  // Tests para calculateOperation
  describe('calculateOperation', () => {
    test('debe sumar dos números correctamente', () => {
      expect(calculateOperation(3, 4, '+')).toBe(7);
      expect(calculateOperation(10, 15, '+')).toBe(25);
      expect(calculateOperation(-5, 10, '+')).toBe(5);
    });

    test('debe restar dos números correctamente', () => {
      expect(calculateOperation(10, 5, '-')).toBe(5);
      expect(calculateOperation(3, 7, '-')).toBe(-4);
      expect(calculateOperation(15, 10, '-')).toBe(5);
    });

    test('debe multiplicar dos números correctamente', () => {
      expect(calculateOperation(2, 3, '*')).toBe(6);
      expect(calculateOperation(5, 4, '*')).toBe(20);
      expect(calculateOperation(-2, 5, '*')).toBe(-10);
    });

    test('debe dividir dos números correctamente', () => {
      expect(calculateOperation(15, 3, '/')).toBe(5);
      expect(calculateOperation(20, 4, '/')).toBe(5);
      expect(calculateOperation(10, 2, '/')).toBe(5);
    });

    test('debe manejar división con decimales', () => {
      expect(calculateOperation(7, 2, '/')).toBe(3.5);
      expect(calculateOperation(9, 4, '/')).toBe(2.25);
    });

    test('debe retornar null en división por cero', () => {
      expect(calculateOperation(10, 0, '/')).toBeNull();
      expect(calculateOperation(5, 0, '/')).toBeNull();
    });

    test('debe retornar null para operadores inválidos', () => {
      expect(calculateOperation(5, 3, '%')).toBeNull();
      expect(calculateOperation(5, 3, '^')).toBeNull();
      expect(calculateOperation(5, 3, 'x')).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateOperation('5', 3, '+')).toBeNull();
      expect(calculateOperation(5, '3', '+')).toBeNull();
      expect(calculateOperation(null, 3, '+')).toBeNull();
      expect(calculateOperation(5, null, '+')).toBeNull();
    });
  });

  // Tests para tokenizeExpression
  describe('tokenizeExpression', () => {
    test('debe dividir expresión simple correctamente', () => {
      expect(tokenizeExpression('3 4 +')).toEqual(['3', '4', '+']);
      expect(tokenizeExpression('10 5 -')).toEqual(['10', '5', '-']);
    });

    test('debe dividir expresión con múltiples tokens', () => {
      expect(tokenizeExpression('2 3 + 4 *')).toEqual(['2', '3', '+', '4', '*']);
      expect(tokenizeExpression('10 5 - 2 /')).toEqual(['10', '5', '-', '2', '/']);
    });

    test('debe manejar expresiones con espacios extra', () => {
      expect(tokenizeExpression('  3  4  +  ')).toEqual(['3', '4', '+']);
      expect(tokenizeExpression('2  3  +  4  *')).toEqual(['2', '3', '+', '4', '*']);
    });

    test('debe manejar entrada inválida', () => {
      expect(tokenizeExpression('')).toBeNull();
      expect(tokenizeExpression('   ')).toBeNull();
      expect(tokenizeExpression(null)).toBeNull();
      expect(tokenizeExpression(undefined)).toBeNull();
    });
  });

  // Tests para stackToNumber
  describe('stackToNumber', () => {
    test('debe convertir stack con un número', () => {
      expect(stackToNumber([7])).toBe(7);
      expect(stackToNumber([25])).toBe(25);
      expect(stackToNumber([-5])).toBe(-5);
    });

    test('debe tomar el último elemento del stack', () => {
      expect(stackToNumber([3, 4, 7])).toBe(7);
      expect(stackToNumber([1, 2, 3, 4, 5])).toBe(5);
    });

    test('debe manejar números decimales', () => {
      expect(stackToNumber([3.5])).toBe(3.5);
      expect(stackToNumber([2.75])).toBe(2.75);
    });

    test('debe manejar stack vacío', () => {
      expect(stackToNumber([])).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(stackToNumber(null)).toBeNull();
      expect(stackToNumber(undefined)).toBeNull();
      expect(stackToNumber('invalid')).toBeNull();
    });
  });

  // Tests para evaluateRPN
  describe('evaluateRPN', () => {
    test('debe evaluar suma simple', () => {
      expect(evaluateRPN('3 4 +')).toBe(7);
      expect(evaluateRPN('10 5 +')).toBe(15);
    });

    test('debe evaluar resta simple', () => {
      expect(evaluateRPN('10 5 -')).toBe(5);
      expect(evaluateRPN('7 3 -')).toBe(4);
    });

    test('debe evaluar multiplicación simple', () => {
      expect(evaluateRPN('2 3 *')).toBe(6);
      expect(evaluateRPN('5 4 *')).toBe(20);
    });

    test('debe evaluar división simple', () => {
      expect(evaluateRPN('15 3 /')).toBe(5);
      expect(evaluateRPN('20 4 /')).toBe(5);
    });

    test('debe evaluar expresiones complejas', () => {
      expect(evaluateRPN('2 3 + 4 *')).toBe(20); // (2+3)*4 = 20
      expect(evaluateRPN('10 5 - 2 /')).toBe(2.5); // (10-5)/2 = 2.5
      expect(evaluateRPN('4 5 * 6 +')).toBe(26); // (4*5)+6 = 26
    });

    test('debe evaluar expresiones con múltiples operadores', () => {
      expect(evaluateRPN('1 2 + 3 * 4 -')).toBe(5); // ((1+2)*3)-4 = 5
      expect(evaluateRPN('15 5 / 3 * 2 +')).toBe(11); // ((15/5)*3)+2 = 11
    });

    test('debe manejar números negativos', () => {
      expect(evaluateRPN('-5 3 +')).toBe(-2);
      expect(evaluateRPN('10 -5 -')).toBe(15);
    });

    test('debe manejar división por cero', () => {
      expect(evaluateRPN('10 0 /')).toBeNull();
      expect(evaluateRPN('5 0 /')).toBeNull();
    });

    test('debe manejar expresiones inválidas (operador al inicio)', () => {
      expect(evaluateRPN('+ 3 4')).toBeNull();
      expect(evaluateRPN('- 10 5')).toBeNull();
    });

    test('debe manejar expresiones inválidas (sin operador)', () => {
      expect(evaluateRPN('3 4')).toBeNull();
      expect(evaluateRPN('10 5')).toBeNull();
    });

    test('debe manejar expresiones inválidas (operadores insuficientes)', () => {
      expect(evaluateRPN('3 +')).toBeNull();
      expect(evaluateRPN('10 5 + 2')).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(evaluateRPN('')).toBeNull();
      expect(evaluateRPN('   ')).toBeNull();
      expect(evaluateRPN(null)).toBeNull();
      expect(evaluateRPN(undefined)).toBeNull();
    });
  });

  // Tests para isValidRPN
  describe('isValidRPN', () => {
    test('debe validar expresiones RPN correctas simples', () => {
      expect(isValidRPN('3 4 +')).toBe(true);
      expect(isValidRPN('10 5 -')).toBe(true);
      expect(isValidRPN('2 3 *')).toBe(true);
      expect(isValidRPN('15 3 /')).toBe(true);
    });

    test('debe validar expresiones RPN correctas complejas', () => {
      expect(isValidRPN('2 3 + 4 *')).toBe(true);
      expect(isValidRPN('10 5 - 2 /')).toBe(true);
      expect(isValidRPN('1 2 + 3 * 4 -')).toBe(true);
    });

    test('debe rechazar expresiones con operador al inicio', () => {
      expect(isValidRPN('+ 3 4')).toBe(false);
      expect(isValidRPN('- 10 5')).toBe(false);
      expect(isValidRPN('* 2 3')).toBe(false);
    });

    test('debe rechazar expresiones sin operador', () => {
      expect(isValidRPN('3 4')).toBe(false);
      expect(isValidRPN('10 5')).toBe(false);
    });

    test('debe rechazar expresiones con operadores insuficientes', () => {
      expect(isValidRPN('3 +')).toBe(false);
      expect(isValidRPN('10 5 + 2')).toBe(false);
    });

    test('debe rechazar expresiones con demasiados operadores', () => {
      expect(isValidRPN('3 4 + -')).toBe(false);
      expect(isValidRPN('2 3 * /')).toBe(false);
    });

    test('debe manejar entrada inválida', () => {
      expect(isValidRPN('')).toBe(false);
      expect(isValidRPN('   ')).toBe(false);
      expect(isValidRPN(null)).toBe(false);
      expect(isValidRPN(undefined)).toBe(false);
    });

    test('debe validar expresiones con múltiples operaciones', () => {
      expect(isValidRPN('1 2 + 3 +')).toBe(true);
      expect(isValidRPN('4 2 * 8 *')).toBe(true);
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe integrar todas las funciones correctamente', () => {
      const expression = '2 3 + 4 *';
      
      // Verificar que es válida
      expect(isValidRPN(expression)).toBe(true);
      
      // Evaluar y verificar resultado
      const result = evaluateRPN(expression);
      expect(result).toBe(20);
    });

    test('debe manejar flujo completo de validación y evaluación', () => {
      const validExpression = '10 5 - 2 /';
      const invalidExpression = '10 5 - 2';
      
      // Validar
      expect(isValidRPN(validExpression)).toBe(true);
      expect(isValidRPN(invalidExpression)).toBe(false);
      
      // Evaluar
      expect(evaluateRPN(validExpression)).toBe(2.5);
      expect(evaluateRPN(invalidExpression)).toBeNull();
    });

    test('debe trabajar con casos edge complejos', () => {
      // Expresión con resultado negativo
      expect(evaluateRPN('3 5 -')).toBe(-2);
      expect(isValidRPN('3 5 -')).toBe(true);
      
      // Expresión con división decimal
      expect(evaluateRPN('7 2 /')).toBe(3.5);
      expect(isValidRPN('7 2 /')).toBe(true);
      
      // Expresión muy compleja
      expect(evaluateRPN('1 2 + 3 + 4 + 5 +')).toBe(15);
      expect(isValidRPN('1 2 + 3 + 4 + 5 +')).toBe(true);
    });

    test('debe validar consistencia entre isValidRPN y evaluateRPN', () => {
      const testExpressions = [
        '2 3 +',
        '10 5 -',
        '4 5 *',
        '15 3 /',
        '2 3 + 4 *',
        '1 2 + 3 * 4 -',
        '+ 3 4',
        '3 4',
        '3 +',
      ];
      
      testExpressions.forEach(expr => {
        const isValid = isValidRPN(expr);
        const result = evaluateRPN(expr);
        
        // Si es válida, debe tener resultado
        if (isValid) {
          expect(result).not.toBeNull();
        }
        // Si no es válida, el resultado debe ser null
        else {
          expect(result).toBeNull();
        }
      });
    });
  });
});

