const countCharacters = require('./exercise');

describe('Contador de Caracteres en Texto', () => {
    // Casos básicos
    test('debe contar correctamente las letras en "Hola"', () => {
        const result = countCharacters("Hola");
        expect(result).toEqual({
            h: 1,
            o: 1,
            l: 1,
            a: 1
        });
    });

    test('debe contar correctamente las letras en "Hola mundo"', () => {
        const result = countCharacters("Hola mundo");
        expect(result).toEqual({
            h: 1,
            o: 2,
            l: 1,
            a: 1,
            m: 1,
            u: 1,
            n: 1,
            d: 1
        });
    });

    test('debe contar correctamente las letras en "JavaScript"', () => {
        const result = countCharacters("JavaScript");
        expect(result).toEqual({
            j: 1,
            a: 2,
            v: 1,
            s: 1,
            c: 1,
            r: 1,
            i: 1,
            p: 1,
            t: 1
        });
    });

    // Casos con letras repetidas
    test('debe manejar letras repetidas correctamente', () => {
        const result = countCharacters("aabbcc");
        expect(result).toEqual({
            a: 2,
            b: 2,
            c: 2
        });
    });

    test('debe manejar muchas repeticiones de la misma letra', () => {
        const result = countCharacters("aaaaa");
        expect(result).toEqual({
            a: 5
        });
    });

    // Casos edge
    test('debe ignorar números y caracteres especiales', () => {
        const result = countCharacters("Hola 123 Mundo!");
        expect(result).toEqual({
            h: 1,
            o: 2,
            l: 1,
            a: 1,
            m: 1,
            u: 1,
            n: 1,
            d: 1
        });
    });

    test('debe manejar string vacío', () => {
        const result = countCharacters("");
        expect(result).toEqual({});
    });

    test('debe manejar solo números y símbolos', () => {
        const result = countCharacters("123!@#$%");
        expect(result).toEqual({});
    });

    test('debe manejar solo espacios', () => {
        const result = countCharacters("   ");
        expect(result).toEqual({});
    });

    // Casos adicionales
    test('debe manejar texto con mayúsculas y minúsculas mezcladas', () => {
        const result = countCharacters("HeLLo WoRLd");
        expect(result).toEqual({
            h: 1,
            e: 1,
            l: 3,
            o: 2,
            w: 1,
            r: 1,
            d: 1
        });
    });

    test('debe manejar texto con acentos y caracteres especiales', () => {
        const result = countCharacters("Héllo Wörld");
        expect(result).toEqual({
            h: 1,
            l: 3,
            o: 1,
            w: 1,
            r: 1,
            d: 1
        });
    });

    test('debe manejar texto largo', () => {
        const result = countCharacters("programming is fun");
        expect(result).toEqual({
            p: 1,
            r: 2,
            o: 1,
            g: 2,
            a: 1,
            m: 2,
            i: 2,
            n: 2,
            s: 1,
            f: 1,
            u: 1
        });
    });
});
