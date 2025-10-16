const countVowels = require('./exercise');

describe('Count Vowels Exercise', () => {
    
    test('debe contar vocales en string minúscula', () => {
        expect(countVowels("hello")).toBe(2);
    });
    
    test('debe contar vocales en string mayúscula', () => {
        expect(countVowels("HELLO")).toBe(2);
    });
    
    test('debe contar vocales en string mixta', () => {
        expect(countVowels("Programming")).toBe(3);
    });
    
    test('debe retornar 0 para string sin vocales', () => {
        expect(countVowels("xyz")).toBe(0);
    });
    
    test('debe contar todas las vocales minúsculas', () => {
        expect(countVowels("aeiou")).toBe(5);
    });
    
    test('debe contar todas las vocales mayúsculas', () => {
        expect(countVowels("AEIOU")).toBe(5);
    });
    
    test('debe contar vocales mixtas', () => {
        expect(countVowels("aEiOu")).toBe(5);
    });
    
    test('debe contar una sola vocal', () => {
        expect(countVowels("a")).toBe(1);
    });
    
    test('debe retornar 0 para una consonante', () => {
        expect(countVowels("b")).toBe(0);
    });
    
    test('debe manejar string vacía', () => {
        expect(countVowels("")).toBe(0);
    });
    
    test('debe manejar string con números', () => {
        expect(countVowels("123")).toBe(0);
    });
    
    test('debe manejar string con espacios y signos', () => {
        expect(countVowels("Hello World!")).toBe(3);
    });
    
    test('debe manejar string con caracteres especiales', () => {
        expect(countVowels("h@ll0 w0rld!")).toBe(0);
    });
    
    test('debe manejar string larga', () => {
        expect(countVowels("supercalifragilisticexpialidocious")).toBe(16);
    });
    
    test('debe manejar solo consonantes', () => {
        expect(countVowels("bcdfg")).toBe(0);
    });
    
    test('debe manejar string con acentos (no son vocales para este ejercicio)', () => {
        expect(countVowels("áéíóú")).toBe(0);
    });
    
});
