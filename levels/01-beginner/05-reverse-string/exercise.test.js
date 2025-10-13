const reverseString = require('./exercise');

describe('Reverse String', () => {
    // Casos básicos
    test('debe manejar el caso básico', () => {
        const input = ["h","e","l","l","o"];
        reverseString(input);
        expect(input).toEqual(["o","l","l","e","h"]);
    });

    test('debe manejar el caso de ejemplo del enunciado', () => {
        const input = ["H","a","n","n","a","h"];
        reverseString(input);
        expect(input).toEqual(["h","a","n","n","a","H"]);
    });

    // Casos edge
    test('debe manejar arrays vacíos', () => {
        const input = [];
        reverseString(input);
        expect(input).toEqual([]);
    });

    test('debe manejar casos con un solo elemento', () => {
        const input = ["A"];
        reverseString(input);
        expect(input).toEqual(["A"]);
    });

    test('debe manejar casos con dos elementos', () => {
        const input = ["a","b"];
        reverseString(input);
        expect(input).toEqual(["b","a"]);
    });

    // Casos adicionales según el problema
    test('debe manejar strings con caracteres especiales', () => {
        const input = ["1","2","3","@","#"];
        reverseString(input);
        expect(input).toEqual(["#","@","3","2","1"]);
    });

    test('debe manejar strings con espacios', () => {
        const input = ["H","e","l","l","o"," ","W","o","r","l","d"];
        reverseString(input);
        expect(input).toEqual(["d","l","r","o","W"," ","o","l","l","e","H"]);
    });

    test('debe manejar strings largos', () => {
        const input = ["a","b","c","d","e","f","g","h","i","j"];
        reverseString(input);
        expect(input).toEqual(["j","i","h","g","f","e","d","c","b","a"]);
    });

    test('debe manejar strings con caracteres repetidos', () => {
        const input = ["a","a","a","a","a"];
        reverseString(input);
        expect(input).toEqual(["a","a","a","a","a"]);
    });
});
