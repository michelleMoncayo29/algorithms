const {
  decimalToBinary,
  binaryToDecimal,
  decimalToHex,
  hexToDecimal,
  validateNumberInBase,
} = require('./exercise');
// } = require('../../../solutions/01-beginner/21-number-system-converter/solution');

describe('Conversor de Sistemas Numéricos', () => {
  // Tests para decimalToBinary
  describe('decimalToBinary', () => {
    test('debe convertir 0 a binario', () => {
      expect(decimalToBinary(0)).toBe('0');
    });

    test('debe convertir números pequeños a binario', () => {
      expect(decimalToBinary(1)).toBe('1');
      expect(decimalToBinary(2)).toBe('10');
      expect(decimalToBinary(3)).toBe('11');
      expect(decimalToBinary(4)).toBe('100');
    });

    test('debe convertir números medios a binario', () => {
      expect(decimalToBinary(5)).toBe('101');
      expect(decimalToBinary(10)).toBe('1010');
      expect(decimalToBinary(15)).toBe('1111');
      expect(decimalToBinary(16)).toBe('10000');
    });

    test('debe convertir números grandes a binario', () => {
      expect(decimalToBinary(255)).toBe('11111111');
      expect(decimalToBinary(256)).toBe('100000000');
      expect(decimalToBinary(1024)).toBe('10000000000');
    });

    test('debe convertir números con múltiples bits a 1', () => {
      expect(decimalToBinary(31)).toBe('11111'); // todos los bits a 1
      expect(decimalToBinary(63)).toBe('111111');
      expect(decimalToBinary(127)).toBe('1111111');
    });

    test('debe manejar números negativos', () => {
      expect(decimalToBinary(-5)).toBeNull();
      expect(decimalToBinary(-1)).toBeNull();
    });

    test('debe manejar números decimales', () => {
      expect(decimalToBinary(5.5)).toBeNull();
      expect(decimalToBinary(10.2)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(decimalToBinary('5')).toBeNull();
      expect(decimalToBinary(null)).toBeNull();
      expect(decimalToBinary(undefined)).toBeNull();
    });
  });

  // Tests para binaryToDecimal
  describe('binaryToDecimal', () => {
    test('debe convertir 0 de binario a decimal', () => {
      expect(binaryToDecimal('0')).toBe(0);
    });

    test('debe convertir números binarios pequeños a decimal', () => {
      expect(binaryToDecimal('1')).toBe(1);
      expect(binaryToDecimal('10')).toBe(2);
      expect(binaryToDecimal('11')).toBe(3);
      expect(binaryToDecimal('100')).toBe(4);
    });

    test('debe convertir números binarios medios a decimal', () => {
      expect(binaryToDecimal('101')).toBe(5);
      expect(binaryToDecimal('1010')).toBe(10);
      expect(binaryToDecimal('1111')).toBe(15);
      expect(binaryToDecimal('10000')).toBe(16);
    });

    test('debe convertir números binarios grandes a decimal', () => {
      expect(binaryToDecimal('11111111')).toBe(255);
      expect(binaryToDecimal('100000000')).toBe(256);
      expect(binaryToDecimal('10000000000')).toBe(1024);
    });

    test('debe convertir números con todos los bits a 1', () => {
      expect(binaryToDecimal('11111')).toBe(31);
      expect(binaryToDecimal('111111')).toBe(63);
      expect(binaryToDecimal('1111111')).toBe(127);
    });

    test('debe manejar strings binarios inválidos con caracteres extra', () => {
      expect(binaryToDecimal('1012')).toBeNull();
      expect(binaryToDecimal('101a')).toBeNull();
      expect(binaryToDecimal('12')).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(binaryToDecimal('')).toBeNull();
      expect(binaryToDecimal(null)).toBeNull();
      expect(binaryToDecimal(undefined)).toBeNull();
      expect(binaryToDecimal(101)).toBeNull();
    });

    test('debe manejar strings con espacios', () => {
      expect(binaryToDecimal('  101  ')).toBeNull();
    });
  });

  // Tests para decimalToHex
  describe('decimalToHex', () => {
    test('debe convertir 0 a hexadecimal', () => {
      expect(decimalToHex(0)).toBe('0');
    });

    test('debe convertir números menores a 10 a hexadecimal', () => {
      expect(decimalToHex(1)).toBe('1');
      expect(decimalToHex(9)).toBe('9');
    });

    test('debe convertir números 10-15 a letras', () => {
      expect(decimalToHex(10)).toBe('A');
      expect(decimalToHex(11)).toBe('B');
      expect(decimalToHex(12)).toBe('C');
      expect(decimalToHex(13)).toBe('D');
      expect(decimalToHex(14)).toBe('E');
      expect(decimalToHex(15)).toBe('F');
    });

    test('debe convertir números medios a hexadecimal', () => {
      expect(decimalToHex(16)).toBe('10');
      expect(decimalToHex(255)).toBe('FF');
      expect(decimalToHex(256)).toBe('100');
    });

    test('debe convertir números grandes a hexadecimal', () => {
      expect(decimalToHex(4095)).toBe('FFF');
      expect(decimalToHex(4096)).toBe('1000');
      expect(decimalToHex(65535)).toBe('FFFF');
    });

    test('debe manejar números negativos', () => {
      expect(decimalToHex(-10)).toBeNull();
      expect(decimalToHex(-1)).toBeNull();
    });

    test('debe manejar números decimales', () => {
      expect(decimalToHex(10.5)).toBeNull();
      expect(decimalToHex(15.9)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(decimalToHex('10')).toBeNull();
      expect(decimalToHex(null)).toBeNull();
      expect(decimalToHex(undefined)).toBeNull();
    });
  });

  // Tests para hexToDecimal
  describe('hexToDecimal', () => {
    test('debe convertir 0 de hexadecimal a decimal', () => {
      expect(hexToDecimal('0')).toBe(0);
    });

    test('debe convertir números menores a 10 a decimal', () => {
      expect(hexToDecimal('1')).toBe(1);
      expect(hexToDecimal('9')).toBe(9);
    });

    test('debe convertir letras A-F a decimal', () => {
      expect(hexToDecimal('A')).toBe(10);
      expect(hexToDecimal('B')).toBe(11);
      expect(hexToDecimal('C')).toBe(12);
      expect(hexToDecimal('D')).toBe(13);
      expect(hexToDecimal('E')).toBe(14);
      expect(hexToDecimal('F')).toBe(15);
    });

    test('debe convertir mayúsculas y minúsculas', () => {
      expect(hexToDecimal('a')).toBe(10);
      expect(hexToDecimal('f')).toBe(15);
      expect(hexToDecimal('Ab')).toBe(171);
    });

    test('debe convertir números medios a decimal', () => {
      expect(hexToDecimal('10')).toBe(16);
      expect(hexToDecimal('FF')).toBe(255);
      expect(hexToDecimal('100')).toBe(256);
    });

    test('debe convertir números grandes a decimal', () => {
      expect(hexToDecimal('FFF')).toBe(4095);
      expect(hexToDecimal('1000')).toBe(4096);
      expect(hexToDecimal('FFFF')).toBe(65535);
    });

    test('debe manejar strings hexadecimales inválidos', () => {
      expect(hexToDecimal('GH')).toBeNull();
      expect(hexToDecimal('XYZ')).toBeNull();
      expect(hexToDecimal('G')).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(hexToDecimal('')).toBeNull();
      expect(hexToDecimal(null)).toBeNull();
      expect(hexToDecimal(undefined)).toBeNull();
      expect(hexToDecimal(255)).toBeNull();
    });

    test('debe manejar strings con espacios', () => {
      expect(hexToDecimal('  FF  ')).toBeNull();
    });
  });

  // Tests para validateNumberInBase
  describe('validateNumberInBase', () => {
    test('debe validar números binarios correctamente', () => {
      expect(validateNumberInBase('0', 2)).toBe(true);
      expect(validateNumberInBase('1', 2)).toBe(true);
      expect(validateNumberInBase('101010', 2)).toBe(true);
    });

    test('debe rechazar números binarios inválidos', () => {
      expect(validateNumberInBase('2', 2)).toBe(false);
      expect(validateNumberInBase('1012', 2)).toBe(false);
      expect(validateNumberInBase('abc', 2)).toBe(false);
    });

    test('debe validar números octales correctamente', () => {
      expect(validateNumberInBase('0', 8)).toBe(true);
      expect(validateNumberInBase('7', 8)).toBe(true);
      expect(validateNumberInBase('123', 8)).toBe(true);
    });

    test('debe rechazar números octales inválidos', () => {
      expect(validateNumberInBase('8', 8)).toBe(false);
      expect(validateNumberInBase('78', 8)).toBe(false);
      expect(validateNumberInBase('abc', 8)).toBe(false);
    });

    test('debe validar números decimales correctamente', () => {
      expect(validateNumberInBase('0', 10)).toBe(true);
      expect(validateNumberInBase('9', 10)).toBe(true);
      expect(validateNumberInBase('123', 10)).toBe(true);
    });

    test('debe rechazar números decimales inválidos', () => {
      expect(validateNumberInBase('A', 10)).toBe(false);
      expect(validateNumberInBase('12a', 10)).toBe(false);
    });

    test('debe validar números hexadecimales correctamente', () => {
      expect(validateNumberInBase('0', 16)).toBe(true);
      expect(validateNumberInBase('9', 16)).toBe(true);
      expect(validateNumberInBase('A', 16)).toBe(true);
      expect(validateNumberInBase('F', 16)).toBe(true);
      expect(validateNumberInBase('a', 16)).toBe(true);
      expect(validateNumberInBase('f', 16)).toBe(true);
      expect(validateNumberInBase('123', 16)).toBe(true);
      expect(validateNumberInBase('ABC', 16)).toBe(true);
    });

    test('debe rechazar números hexadecimales inválidos', () => {
      expect(validateNumberInBase('G', 16)).toBe(false);
      expect(validateNumberInBase('XYZ', 16)).toBe(false);
      expect(validateNumberInBase('12G', 16)).toBe(false);
    });

    test('debe rechazar bases inválidas', () => {
      expect(validateNumberInBase('123', 3)).toBe(false);
      expect(validateNumberInBase('123', 7)).toBe(false);
      expect(validateNumberInBase('123', 17)).toBe(false);
    });

    test('debe manejar entrada inválida', () => {
      expect(validateNumberInBase(null, 2)).toBe(false);
      expect(validateNumberInBase(undefined, 2)).toBe(false);
      expect(validateNumberInBase('123', null)).toBe(false);
      expect(validateNumberInBase(123, 2)).toBe(false);
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe convertir ida y vuelta decimal ↔ binario', () => {
      const testCases = [0, 1, 5, 10, 15, 255, 1024];
      
      testCases.forEach(decimal => {
        const binary = decimalToBinary(decimal);
        const result = binaryToDecimal(binary);
        expect(result).toBe(decimal);
      });
    });

    test('debe convertir ida y vuelta decimal ↔ hexadecimal', () => {
      const testCases = [0, 1, 10, 15, 255, 256, 4095];
      
      testCases.forEach(decimal => {
        const hex = decimalToHex(decimal);
        const result = hexToDecimal(hex);
        expect(result).toBe(decimal);
      });
    });

    test('debe validar y convertir números correctamente', () => {
      // Binario válido
      expect(validateNumberInBase('1010', 2)).toBe(true);
      expect(binaryToDecimal('1010')).toBe(10);
      
      // Hexadecimal válido
      expect(validateNumberInBase('FF', 16)).toBe(true);
      expect(hexToDecimal('FF')).toBe(255);
      
      // Número inválido
      expect(validateNumberInBase('12G', 16)).toBe(false);
      expect(hexToDecimal('12G')).toBeNull();
    });

    test('debe manejar conversiones complejas', () => {
      // Convertir 255 a todas las bases
      expect(decimalToBinary(255)).toBe('11111111');
      expect(decimalToHex(255)).toBe('FF');
      
      // Verificar validación
      expect(validateNumberInBase('11111111', 2)).toBe(true);
      expect(validateNumberInBase('FF', 16)).toBe(true);
      
      // Convertir de vuelta
      expect(binaryToDecimal('11111111')).toBe(255);
      expect(hexToDecimal('FF')).toBe(255);
    });

    test('debe manejar casos edge consistentemente', () => {
      // 0 debe funcionar en todas las conversiones
      expect(decimalToBinary(0)).toBe('0');
      expect(decimalToHex(0)).toBe('0');
      expect(binaryToDecimal('0')).toBe(0);
      expect(hexToDecimal('0')).toBe(0);
      expect(validateNumberInBase('0', 2)).toBe(true);
      expect(validateNumberInBase('0', 16)).toBe(true);
      
      // 1 debe funcionar en todas las conversiones
      expect(decimalToBinary(1)).toBe('1');
      expect(decimalToHex(1)).toBe('1');
      expect(binaryToDecimal('1')).toBe(1);
      expect(hexToDecimal('1')).toBe(1);
    });
  });
});

