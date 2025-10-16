const isPrime = require('./exercise');

describe('Check Prime Number', () => {
    
    test('debe retornar true para números primos', () => {
        expect(isPrime(2)).toBe(true);
        expect(isPrime(3)).toBe(true);
        expect(isPrime(5)).toBe(true);
        expect(isPrime(7)).toBe(true);
        expect(isPrime(11)).toBe(true);
        expect(isPrime(13)).toBe(true);
        expect(isPrime(17)).toBe(true);
        expect(isPrime(19)).toBe(true);
        expect(isPrime(23)).toBe(true);
        expect(isPrime(29)).toBe(true);
        expect(isPrime(97)).toBe(true);
    });

    test('debe retornar false para números compuestos', () => {
        expect(isPrime(4)).toBe(false);
        expect(isPrime(6)).toBe(false);
        expect(isPrime(8)).toBe(false);
        expect(isPrime(9)).toBe(false);
        expect(isPrime(10)).toBe(false);
        expect(isPrime(12)).toBe(false);
        expect(isPrime(14)).toBe(false);
        expect(isPrime(15)).toBe(false);
        expect(isPrime(16)).toBe(false);
        expect(isPrime(18)).toBe(false);
        expect(isPrime(20)).toBe(false);
        expect(isPrime(25)).toBe(false);
        expect(isPrime(100)).toBe(false);
    });

    test('debe manejar casos edge especiales', () => {
        expect(isPrime(1)).toBe(false);
        expect(isPrime(0)).toBe(false);
        expect(isPrime(-5)).toBe(false);
        expect(isPrime(-17)).toBe(false);
    });

    test('debe manejar el 2 correctamente (único primo par)', () => {
        expect(isPrime(2)).toBe(true);
    });

    test('debe manejar números pares mayores que 2', () => {
        expect(isPrime(4)).toBe(false);
        expect(isPrime(6)).toBe(false);
        expect(isPrime(8)).toBe(false);
        expect(isPrime(10)).toBe(false);
        expect(isPrime(12)).toBe(false);
        expect(isPrime(100)).toBe(false);
    });

    test('debe manejar cuadrados perfectos', () => {
        expect(isPrime(4)).toBe(false);  // 2²
        expect(isPrime(9)).toBe(false);  // 3²
        expect(isPrime(16)).toBe(false); // 4²
        expect(isPrime(25)).toBe(false); // 5²
        expect(isPrime(36)).toBe(false); // 6²
        expect(isPrime(49)).toBe(false); // 7²
        expect(isPrime(64)).toBe(false); // 8²
        expect(isPrime(81)).toBe(false); // 9²
        expect(isPrime(100)).toBe(false); // 10²
    });

    test('debe manejar números primos grandes', () => {
        expect(isPrime(97)).toBe(true);
        expect(isPrime(101)).toBe(true);
        expect(isPrime(103)).toBe(true);
        expect(isPrime(107)).toBe(true);
        expect(isPrime(109)).toBe(true);
        expect(isPrime(113)).toBe(true);
    });

    test('debe manejar números compuestos grandes', () => {
        expect(isPrime(99)).toBe(false); // 9 × 11
        expect(isPrime(105)).toBe(false); // 3 × 5 × 7
        expect(isPrime(121)).toBe(false); // 11²
        expect(isPrime(143)).toBe(false); // 11 × 13
        expect(isPrime(169)).toBe(false); // 13²
    });

    test('debe manejar números con divisores pequeños', () => {
        expect(isPrime(21)).toBe(false); // 3 × 7
        expect(isPrime(27)).toBe(false); // 3³
        expect(isPrime(33)).toBe(false); // 3 × 11
        expect(isPrime(35)).toBe(false); // 5 × 7
        expect(isPrime(39)).toBe(false); // 3 × 13
        expect(isPrime(45)).toBe(false); // 3² × 5
        expect(isPrime(51)).toBe(false); // 3 × 17
        expect(isPrime(55)).toBe(false); // 5 × 11
        expect(isPrime(57)).toBe(false); // 3 × 19
        expect(isPrime(63)).toBe(false); // 3² × 7
    });

    test('casos edge adicionales', () => {
        // Números que son producto de dos primos
        expect(isPrime(6)).toBe(false);  // 2 × 3
        expect(isPrime(10)).toBe(false); // 2 × 5
        expect(isPrime(14)).toBe(false); // 2 × 7
        expect(isPrime(15)).toBe(false); // 3 × 5
        expect(isPrime(22)).toBe(false); // 2 × 11
        expect(isPrime(26)).toBe(false); // 2 × 13
        expect(isPrime(34)).toBe(false); // 2 × 17
        expect(isPrime(35)).toBe(false); // 5 × 7
        expect(isPrime(38)).toBe(false); // 2 × 19
        expect(isPrime(46)).toBe(false); // 2 × 23
        
        // Números que son potencias de primos
        expect(isPrime(8)).toBe(false);   // 2³
        expect(isPrime(27)).toBe(false);  // 3³
        expect(isPrime(32)).toBe(false);  // 2⁵
        expect(isPrime(125)).toBe(false); // 5³
    });
});
