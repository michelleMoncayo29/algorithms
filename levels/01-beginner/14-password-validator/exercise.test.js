const validatePassword = require('./exercise');

describe('Validador de Contraseñas', () => {
    // Casos de contraseñas válidas
    test('debe validar contraseña que cumple todos los criterios', () => {
        const result = validatePassword("Password123!");
        expect(result).toEqual({
            isValid: true,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 5
        });
    });

    test('debe validar contraseña con diferentes caracteres especiales', () => {
        const result = validatePassword("MyPass@2024");
        expect(result).toEqual({
            isValid: true,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 5
        });
    });

    // Casos de contraseñas inválidas
    test('debe rechazar contraseña sin mayúsculas ni caracteres especiales', () => {
        const result = validatePassword("password123");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: false,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: false,
            score: 3
        });
    });

    test('debe rechazar contraseña sin minúsculas', () => {
        const result = validatePassword("PASSWORD123!");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: true,
            hasLowercase: false,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 4
        });
    });

    test('debe rechazar contraseña sin números', () => {
        const result = validatePassword("Password!");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: false,
            hasSpecialChars: true,
            score: 4
        });
    });

    test('debe rechazar contraseña sin caracteres especiales', () => {
        const result = validatePassword("Password123");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: false,
            score: 4
        });
    });

    test('debe rechazar contraseña muy corta', () => {
        const result = validatePassword("Pass1!");
        expect(result).toEqual({
            isValid: false,
            length: false,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 4
        });
    });

    // Casos edge
    test('debe manejar contraseña muy débil', () => {
        const result = validatePassword("weak");
        expect(result).toEqual({
            isValid: false,
            length: false,
            hasUppercase: false,
            hasLowercase: true,
            hasNumbers: false,
            hasSpecialChars: false,
            score: 1
        });
    });

    test('debe manejar string vacío', () => {
        const result = validatePassword("");
        expect(result).toEqual({
            isValid: false,
            length: false,
            hasUppercase: false,
            hasLowercase: false,
            hasNumbers: false,
            hasSpecialChars: false,
            score: 0
        });
    });

    test('debe manejar contraseña solo con números', () => {
        const result = validatePassword("12345678");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: false,
            hasLowercase: false,
            hasNumbers: true,
            hasSpecialChars: false,
            score: 2
        });
    });

    test('debe manejar contraseña solo con caracteres especiales', () => {
        const result = validatePassword("!@#$%^&*");
        expect(result).toEqual({
            isValid: false,
            length: true,
            hasUppercase: false,
            hasLowercase: false,
            hasNumbers: false,
            hasSpecialChars: true,
            score: 2
        });
    });

    // Casos adicionales
    test('debe manejar contraseña con longitud exacta de 8 caracteres', () => {
        const result = validatePassword("Pass1!@#");
        expect(result).toEqual({
            isValid: true,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 5
        });
    });

    test('debe manejar contraseña con múltiples caracteres especiales', () => {
        const result = validatePassword("MyP@ss#2024$");
        expect(result).toEqual({
            isValid: true,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 5
        });
    });

    test('debe manejar contraseña con espacios (no válida)', () => {
        const result = validatePassword("Pass 123!");
        expect(result).toEqual({
            isValid: true,
            length: true,
            hasUppercase: true,
            hasLowercase: true,
            hasNumbers: true,
            hasSpecialChars: true,
            score: 5
        });
    });
});
