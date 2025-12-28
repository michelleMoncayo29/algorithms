const generatePassword = require('./exercise');

describe('Generador de Contraseñas Seguras', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos - Verificación de funcionalidad principal', () => {
        test('debe generar una contraseña de la longitud especificada', () => {
            // Propósito: Verificar que la función genera contraseñas de la longitud correcta
            // Entrada: 12, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true}
            // Esperado: String de exactamente 12 caracteres
            const password = generatePassword(12, {
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: true
            });
            expect(password).toHaveLength(12);
        });

        test('debe generar contraseña con todos los tipos de caracteres cuando todas las opciones están habilitadas', () => {
            // Propósito: Verificar que la función incluye todos los tipos de caracteres cuando están habilitados
            // Entrada: 15, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true}
            // Esperado: Contraseña que contiene mayúsculas, minúsculas, números y caracteres especiales
            const password = generatePassword(15, {
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: true
            });
            
            expect(password.length).toBe(15);
            expect(password).toMatch(/[A-Z]/); // Al menos una mayúscula
            expect(password).toMatch(/[a-z]/); // Al menos una minúscula
            expect(password).toMatch(/[0-9]/); // Al menos un número
            expect(password).toMatch(/[!@#$%^&*]/); // Al menos un carácter especial
        });

        test('debe generar contraseña solo con letras cuando solo includeUppercase e includeLowercase están habilitados', () => {
            // Propósito: Verificar que la función genera contraseñas solo con letras cuando se especifica
            // Entrada: 10, {includeUppercase: true, includeLowercase: true, includeNumbers: false, includeSpecialChars: false}
            // Esperado: Contraseña que contiene solo letras mayúsculas y minúsculas
            const password = generatePassword(10, {
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: false,
                includeSpecialChars: false
            });
            
            expect(password.length).toBe(10);
            expect(password).toMatch(/[A-Z]/); // Al menos una mayúscula
            expect(password).toMatch(/[a-z]/); // Al menos una minúscula
            expect(password).toMatch(/^[A-Za-z]+$/); // Solo letras
        });

        test('debe generar contraseña solo con números cuando solo includeNumbers está habilitado', () => {
            // Propósito: Verificar que la función genera contraseñas solo con números cuando se especifica
            // Entrada: 8, {includeUppercase: false, includeLowercase: false, includeNumbers: true, includeSpecialChars: false}
            // Esperado: Contraseña que contiene solo números
            const password = generatePassword(8, {
                includeUppercase: false,
                includeLowercase: false,
                includeNumbers: true,
                includeSpecialChars: false
            });
            
            expect(password.length).toBe(8);
            expect(password).toMatch(/^[0-9]+$/); // Solo números
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites - Verificación de comportamientos extremos', () => {
        test('debe generar contraseña de longitud mínima (8 caracteres)', () => {
            // Propósito: Verificar comportamiento en la longitud mínima permitida
            // Entrada: 8, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true}
            // Esperado: Contraseña de exactamente 8 caracteres
            const password = generatePassword(8, {
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: true
            });
            expect(password.length).toBe(8);
        });

        test('debe generar contraseña de longitud máxima (128 caracteres)', () => {
            // Propósito: Verificar comportamiento en la longitud máxima permitida
            // Entrada: 128, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true}
            // Esperado: Contraseña de exactamente 128 caracteres
            const password = generatePassword(128, {
                includeUppercase: true,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: true
            });
            expect(password.length).toBe(128);
        });

        test('debe generar contraseñas diferentes en múltiples llamadas', () => {
            // Propósito: Verificar que las contraseñas generadas son aleatorias
            // Entrada: Múltiples llamadas con los mismos parámetros
            // Esperado: Las contraseñas deben ser diferentes (con alta probabilidad)
            const passwords = Array.from({length: 10}, () => 
                generatePassword(12, {
                    includeUppercase: true,
                    includeLowercase: true,
                    includeNumbers: true,
                    includeSpecialChars: true
                })
            );
            
            // Verificar que al menos dos contraseñas son diferentes
            const uniquePasswords = new Set(passwords);
            expect(uniquePasswords.size).toBeGreaterThan(1);
        });

        test('debe generar contraseña solo con minúsculas y números cuando se especifica', () => {
            // Propósito: Verificar que la función respeta las opciones específicas
            // Entrada: 10, {includeUppercase: false, includeLowercase: true, includeNumbers: true, includeSpecialChars: false}
            // Esperado: Contraseña que contiene solo minúsculas y números
            const password = generatePassword(10, {
                includeUppercase: false,
                includeLowercase: true,
                includeNumbers: true,
                includeSpecialChars: false
            });
            
            expect(password.length).toBe(10);
            expect(password).toMatch(/[a-z]/); // Al menos una minúscula
            expect(password).toMatch(/[0-9]/); // Al menos un número
            expect(password).toMatch(/^[a-z0-9]+$/); // Solo minúsculas y números
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs - Verificación de principio Fail Fast', () => {
        test('debe lanzar error cuando length no es un número', () => {
            // Propósito: Verificar que la función valida tipos de datos y falla rápidamente
            // Entrada: "12", {includeUppercase: true} - length no es número
            // Esperado: Error específico que debe lanzarse
            expect(() => generatePassword("12", {includeUppercase: true})).toThrow();
        });

        test('debe lanzar error cuando length es menor que 8', () => {
            // Propósito: Verificar validación de longitud mínima
            // Entrada: 7, {includeUppercase: true} - length menor que 8
            // Esperado: Error de longitud mínima
            expect(() => generatePassword(7, {includeUppercase: true})).toThrow();
        });

        test('debe lanzar error cuando length es mayor que 128', () => {
            // Propósito: Verificar validación de longitud máxima
            // Entrada: 129, {includeUppercase: true} - length mayor que 128
            // Esperado: Error de longitud máxima
            expect(() => generatePassword(129, {includeUppercase: true})).toThrow();
        });

        test('debe lanzar error cuando ninguna opción está habilitada', () => {
            // Propósito: Verificar validación de que al menos una opción debe estar habilitada
            // Entrada: 12, {includeUppercase: false, includeLowercase: false, includeNumbers: false, includeSpecialChars: false}
            // Esperado: Error de opciones inválidas
            expect(() => generatePassword(12, {
                includeUppercase: false,
                includeLowercase: false,
                includeNumbers: false,
                includeSpecialChars: false
            })).toThrow();
        });

        test('debe lanzar error cuando no se proporcionan opciones y no hay valores por defecto', () => {
            // Propósito: Verificar validación cuando no hay opciones habilitadas
            // Entrada: 12, {} - Sin opciones habilitadas
            // Esperado: Error de opciones inválidas
            expect(() => generatePassword(12, {})).toThrow();
        });

        test('debe lanzar error cuando length es null', () => {
            // Propósito: Verificar manejo de valores nulos
            // Entrada: null, {includeUppercase: true} - length es null
            // Esperado: Error específico
            expect(() => generatePassword(null, {includeUppercase: true})).toThrow();
        });

        test('debe lanzar error cuando length es undefined', () => {
            // Propósito: Verificar manejo de valores indefinidos
            // Entrada: undefined, {includeUppercase: true} - length es undefined
            // Esperado: Error específico
            expect(() => generatePassword(undefined, {includeUppercase: true})).toThrow();
        });
    });

    // ===== CASOS ADICIONALES Y ESPECIALES =====
    describe('Casos adicionales - Verificación de robustez y casos especiales', () => {
        test('debe generar contraseña solo con caracteres especiales cuando solo includeSpecialChars está habilitado', () => {
            // Propósito: Verificar funcionamiento con solo caracteres especiales
            // Entrada: 10, {includeUppercase: false, includeLowercase: false, includeNumbers: false, includeSpecialChars: true}
            // Esperado: Contraseña que contiene solo caracteres especiales
            const password = generatePassword(10, {
                includeUppercase: false,
                includeLowercase: false,
                includeNumbers: false,
                includeSpecialChars: true
            });
            
            expect(password.length).toBe(10);
            expect(password).toMatch(/^[!@#$%^&*]+$/); // Solo caracteres especiales
        });

        test('debe generar contraseña con mayúsculas y caracteres especiales cuando se especifica', () => {
            // Propósito: Verificar funcionamiento con combinación específica de opciones
            // Entrada: 12, {includeUppercase: true, includeLowercase: false, includeNumbers: false, includeSpecialChars: true}
            // Esperado: Contraseña que contiene solo mayúsculas y caracteres especiales
            const password = generatePassword(12, {
                includeUppercase: true,
                includeLowercase: false,
                includeNumbers: false,
                includeSpecialChars: true
            });
            
            expect(password.length).toBe(12);
            expect(password).toMatch(/[A-Z]/); // Al menos una mayúscula
            expect(password).toMatch(/[!@#$%^&*]/); // Al menos un carácter especial
            expect(password).toMatch(/^[A-Z!@#$%^&*]+$/); // Solo mayúsculas y especiales
        });

        test('debe manejar correctamente opciones con valores por defecto cuando options es undefined', () => {
            // Propósito: Verificar que la función maneja options undefined correctamente
            // Entrada: 12, undefined - options es undefined
            // Esperado: Error porque ninguna opción está habilitada
            expect(() => generatePassword(12, undefined)).toThrow();
        });

        test('debe generar contraseñas que siempre incluyen al menos un carácter de cada tipo habilitado', () => {
            // Propósito: Verificar que la contraseña garantiza al menos un carácter de cada tipo
            // Entrada: 8, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true}
            // Esperado: Contraseña que contiene al menos una mayúscula, minúscula, número y carácter especial
            for (let i = 0; i < 10; i++) {
                const password = generatePassword(8, {
                    includeUppercase: true,
                    includeLowercase: true,
                    includeNumbers: true,
                    includeSpecialChars: true
                });
                
                expect(password).toMatch(/[A-Z]/);
                expect(password).toMatch(/[a-z]/);
                expect(password).toMatch(/[0-9]/);
                expect(password).toMatch(/[!@#$%^&*]/);
            }
        });
    });

    // ===== TESTS DE INMUTABILIDAD =====
    describe('Inmutabilidad - Verificación de principio de no mutación de datos originales', () => {
        test('no debe modificar el objeto options original', () => {
            // Propósito: Verificar que la función no muta el objeto options de entrada
            // Entrada: 12, {includeUppercase: true, includeLowercase: true} - Objeto options
            // Esperado: El objeto options original debe permanecer exactamente igual después de la ejecución
            const originalOptions = {
                includeUppercase: true,
                includeLowercase: true
            };
            const optionsCopy = {...originalOptions}; // Crear copia para comparación
            
            generatePassword(12, originalOptions);
            
            // Verificar que el objeto original no ha sido modificado
            expect(originalOptions).toEqual(optionsCopy);
        });
    });

    // ===== TESTS DE ERRORES ESPECÍFICOS =====
    describe('Manejo de errores específicos - Verificación de mensajes y tipos de error apropiados', () => {
        test('debe lanzar error con mensaje descriptivo cuando length es inválido', () => {
            // Propósito: Verificar que los errores tienen mensajes claros y útiles
            // Entrada: 5, {includeUppercase: true} - length menor que 8
            // Esperado: Mensaje de error específico y descriptivo
            expect(() => generatePassword(5, {includeUppercase: true})).toThrow(/length|8|minimum/i);
        });

        test('debe lanzar error con mensaje descriptivo cuando ninguna opción está habilitada', () => {
            // Propósito: Verificar que los errores tienen mensajes claros para opciones inválidas
            // Entrada: 12, {} - Sin opciones habilitadas
            // Esperado: Mensaje de error específico y descriptivo
            expect(() => generatePassword(12, {})).toThrow(/option|enable|at least/i);
        });
    });
});

