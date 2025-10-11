const isPalindrome = require('./exercise');

describe('Palindrome Check', () => {
    // Casos básicos
    test('debe devolver true para palíndromo simple', () => {
        expect(isPalindrome("racecar")).toBe(true);
    });

    test('debe devolver false para string no palíndromo', () => {
        expect(isPalindrome("race a car")).toBe(false);
    });

    test('debe manejar palíndromo con espacios y mayúsculas', () => {
        expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    });

    // Casos edge
    test('debe manejar string vacía', () => {
        expect(isPalindrome("")).toBe(true);
    });

    test('debe manejar un solo carácter', () => {
        expect(isPalindrome("A")).toBe(true);
    });

    test('debe manejar string con solo caracteres especiales', () => {
        expect(isPalindrome(".,")).toBe(true);
    });

    test('debe manejar string con números', () => {
        expect(isPalindrome("A1B2B1A")).toBe(true);
    });

    // Casos adicionales
    test('debe manejar palíndromo con puntuación', () => {
        expect(isPalindrome("Madam, I'm Adam")).toBe(true);
    });

    test('debe manejar string mixta no palíndromo', () => {
        expect(isPalindrome("No 'x' in Nixon")).toBe(true);
    });

    test('debe manejar string muy corta', () => {
        expect(isPalindrome("ab")).toBe(false);
    });

    test('debe manejar palíndromo de números', () => {
        expect(isPalindrome("12321")).toBe(true);
    });
});
