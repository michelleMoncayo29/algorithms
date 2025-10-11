const fizzBuzz = require('./exercise');

describe('Fizz Buzz', () => {
    // Casos básicos
    test('debe manejar el caso con n = 1', () => {
        expect(fizzBuzz(1)).toEqual(["1"]);
    });

    test('debe manejar el caso con n = 3', () => {
        expect(fizzBuzz(3)).toEqual(["1", "2", "Fizz"]);
    });

    test('debe manejar el caso con n = 5', () => {
        expect(fizzBuzz(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
    });

    test('debe manejar el caso con n = 15', () => {
        expect(fizzBuzz(15)).toEqual([
            "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", 
            "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"
        ]);
    });

    // Casos edge
    test('debe manejar n = 0', () => {
        expect(fizzBuzz(0)).toEqual([]);
    });

    test('debe manejar números más grandes', () => {
        const result = fizzBuzz(20);
        expect(result[14]).toBe("FizzBuzz"); // 15
        expect(result[19]).toBe("Buzz"); // 20
    });

    // Casos adicionales
    test('debe verificar todos los Fizz correctos', () => {
        const result = fizzBuzz(30);
        expect(result[2]).toBe("Fizz"); // 3
        expect(result[5]).toBe("Fizz"); // 6
        expect(result[8]).toBe("Fizz"); // 9
    });

    test('debe verificar todos los Buzz correctos', () => {
        const result = fizzBuzz(25);
        expect(result[4]).toBe("Buzz"); // 5
        expect(result[9]).toBe("Buzz"); // 10
        expect(result[19]).toBe("Buzz"); // 20
    });
});
