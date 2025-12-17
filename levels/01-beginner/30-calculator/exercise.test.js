const { Calculator } = require('./exercise');

describe('Calculadora Científica Básica', () => {
    // ===== CASOS BÁSICOS - CONSTRUCTOR Y ESTADO INICIAL =====
    describe('Constructor y estado inicial', () => {
        test('crea una calculadora con valor inicial especificado', () => {
            // Este test verifica que el constructor asigna correctamente un valor inicial cuando se proporciona.
            // Se espera que al crear una calculadora con un valor inicial, ese valor se almacene en this.value.
            const calc = new Calculator(10);
            expect(calc.getValue()).toBe(10);
        });

        test('crea una calculadora con valor inicial 0 por defecto', () => {
            // Este test verifica que cuando no se proporciona un valor inicial, se usa 0 por defecto.
            // El comportamiento esperado es que la calculadora se inicialice con valor 0.
            const calc = new Calculator();
            expect(calc.getValue()).toBe(0);
        });

        test('getValue retorna el valor actual sin modificarlo', () => {
            // Este test verifica que getValue retorna el valor sin realizar modificaciones.
            // Se espera que múltiples llamadas a getValue retornen el mismo valor si no hay operaciones intermedias.
            const calc = new Calculator(5);
            expect(calc.getValue()).toBe(5);
            expect(calc.getValue()).toBe(5); // Debe retornar el mismo valor
        });
    });

    // ===== OPERACIONES BÁSICAS =====
    describe('Operaciones básicas', () => {
        test('add suma correctamente al valor acumulado', () => {
            // Este test verifica que add incrementa el valor acumulado sumando el número proporcionado.
            // Se espera que el valor interno se incremente y se retorne this para encadenamiento.
            const calc = new Calculator(10);
            const result = calc.add(5);
            expect(calc.getValue()).toBe(15);
            expect(result).toBe(calc); // Retorna this para encadenamiento
        });

        test('subtract resta correctamente del valor acumulado', () => {
            // Este test verifica que subtract decrementa el valor acumulado restando el número proporcionado.
            // Se espera que el valor interno se decremente y se retorne this para encadenamiento.
            const calc = new Calculator(10);
            const result = calc.subtract(3);
            expect(calc.getValue()).toBe(7);
            expect(result).toBe(calc); // Retorna this para encadenamiento
        });

        test('multiply multiplica correctamente el valor acumulado', () => {
            // Este test verifica que multiply multiplica el valor acumulado por el número proporcionado.
            // Se espera que el valor interno se multiplique y se retorne this para encadenamiento.
            const calc = new Calculator(5);
            const result = calc.multiply(3);
            expect(calc.getValue()).toBe(15);
            expect(result).toBe(calc); // Retorna this para encadenamiento
        });

        test('divide divide correctamente el valor acumulado', () => {
            // Este test verifica que divide divide el valor acumulado por el número proporcionado.
            // Se espera que el valor interno se divida y se retorne this para encadenamiento.
            const calc = new Calculator(20);
            const result = calc.divide(4);
            expect(calc.getValue()).toBe(5);
            expect(result).toBe(calc); // Retorna this para encadenamiento
        });
    });

    // ===== OPERACIONES MÚLTIPLES Y ENCADENAMIENTO =====
    describe('Operaciones múltiples y encadenamiento', () => {
        test('permite realizar múltiples operaciones consecutivas', () => {
            // Este test verifica que se pueden realizar varias operaciones seguidas y el estado se mantiene correctamente.
            // Se espera que cada operación modifique el valor acumulado basándose en el valor anterior.
            const calc = new Calculator(10);
            calc.add(5);        // 15
            calc.subtract(3);   // 12
            calc.multiply(2);   // 24
            calc.divide(4);     // 6
            expect(calc.getValue()).toBe(6);
        });

        test('permite encadenar operaciones usando los valores retornados', () => {
            // Este test verifica que los métodos retornan valores que permiten encadenamiento.
            // Se espera que cada método retorne el nuevo valor acumulado para permitir llamadas encadenadas.
            const calc = new Calculator();
            const result = calc.add(10).subtract(3).multiply(2).getValue();
            expect(result).toBe(14);
            expect(calc.getValue()).toBe(14);
        });

        test('clear resetea el valor a cero', () => {
            // Este test verifica que clear establece el valor acumulado en 0.
            // Se espera que después de clear, el valor sea 0 y se puedan realizar nuevas operaciones.
            const calc = new Calculator(100);
            calc.add(50);
            expect(calc.getValue()).toBe(150);
            
            const result = calc.clear();
            expect(result).toBe(calc); // Retorna this para encadenamiento
            expect(calc.getValue()).toBe(0);
            
            calc.add(25);
            expect(calc.getValue()).toBe(25);
        });
    });

    // ===== CASOS EDGE - NÚMEROS DECIMALES Y NEGATIVOS =====
    describe('Casos edge - Números decimales y negativos', () => {
        test('maneja correctamente números decimales en todas las operaciones', () => {
            // Este test verifica que todas las operaciones funcionan correctamente con números decimales.
            // Se espera que las operaciones mantengan la precisión decimal.
            const calc = new Calculator(10.5);
            calc.add(2.3);      // 12.8
            calc.subtract(1.2); // 11.6
            calc.multiply(2);   // 23.2
            calc.divide(4);     // 5.8
            expect(calc.getValue()).toBeCloseTo(5.8, 5);
        });

        test('maneja correctamente números negativos', () => {
            // Este test verifica que todas las operaciones funcionan correctamente con números negativos.
            // Se espera que las operaciones matemáticas funcionen correctamente con valores negativos.
            const calc = new Calculator(10);
            calc.add(-5);       // 5
            calc.multiply(-2);  // -10
            calc.subtract(-3);  // -7
            expect(calc.getValue()).toBe(-7);
        });

        test('permite comenzar con un valor negativo', () => {
            // Este test verifica que se puede crear una calculadora con un valor inicial negativo.
            // El comportamiento esperado es que el constructor acepte cualquier número como valor inicial.
            const calc = new Calculator(-10);
            expect(calc.getValue()).toBe(-10);
            
            calc.add(15);
            expect(calc.getValue()).toBe(5);
        });

        test('divide maneja correctamente resultados decimales', () => {
            // Este test verifica que la división puede producir resultados decimales correctamente.
            // Se espera que la división mantenga la precisión decimal.
            const calc = new Calculator(7);
            calc.divide(2);
            expect(calc.getValue()).toBe(3.5);
        });
    });

    // ===== VALIDACIÓN - DIVISIÓN POR CERO =====
    describe('Validación - División por cero', () => {
        test('lanza error cuando se intenta dividir por cero', () => {
            // Este test verifica que divide valida que el divisor no sea cero.
            // Se espera que lance un error con el mensaje exacto cuando se intenta dividir por cero.
            const calc = new Calculator(100);
            expect(() => calc.divide(0)).toThrow('Division by zero is not allowed');
        });

        test('el valor no cambia cuando se intenta dividir por cero', () => {
            // Este test verifica que cuando se lanza el error por división por cero, el valor acumulado no se modifica.
            // El comportamiento esperado es que el valor se mantenga igual si la operación falla.
            const calc = new Calculator(100);
            try {
                calc.divide(0);
            } catch (error) {
                // Error esperado
            }
            expect(calc.getValue()).toBe(100);
        });

        test('puede dividir por números negativos pequeños', () => {
            // Este test verifica que se puede dividir por números negativos muy pequeños.
            // El comportamiento esperado es que la división funcione normalmente con números negativos.
            const calc = new Calculator(100);
            calc.divide(-2);
            expect(calc.getValue()).toBe(-50);
        });
    });

    // ===== CASOS ESPECIALES =====
    describe('Casos especiales', () => {
        test('operaciones con cero como operando (excepto división)', () => {
            // Este test verifica que sumar, restar y multiplicar por cero funcionan correctamente.
            // Se espera que estas operaciones con cero funcionen sin problemas.
            const calc = new Calculator(10);
            calc.add(0);
            expect(calc.getValue()).toBe(10);
            
            calc.subtract(0);
            expect(calc.getValue()).toBe(10);
            
            calc.multiply(0);
            expect(calc.getValue()).toBe(0);
        });

        test('operaciones con el valor inicial en cero', () => {
            // Este test verifica que se pueden realizar operaciones cuando el valor inicial es cero.
            // El comportamiento esperado es que todas las operaciones funcionen correctamente desde cero.
            const calc = new Calculator(0);
            calc.add(5);        // 5
            calc.multiply(3);   // 15
            calc.subtract(10);  // 5
            calc.divide(1);     // 5
            expect(calc.getValue()).toBe(5);
        });

        test('clear permite empezar de nuevo después de operaciones', () => {
            // Este test verifica que clear funciona correctamente después de realizar múltiples operaciones.
            // Se espera que después de clear, se pueda continuar con nuevas operaciones normalmente.
            const calc = new Calculator(50);
            calc.add(25);
            calc.multiply(2);
            expect(calc.getValue()).toBe(150);
            
            calc.clear();
            expect(calc.getValue()).toBe(0);
            
            calc.add(100);
            calc.divide(2);
            expect(calc.getValue()).toBe(50);
        });

        test('getValue siempre retorna el estado actual', () => {
            // Este test verifica que getValue siempre refleja el estado más reciente después de cada operación.
            // Se espera que getValue retorne el valor actualizado después de cada modificación.
            const calc = new Calculator(10);
            expect(calc.getValue()).toBe(10);
            
            calc.add(5);
            expect(calc.getValue()).toBe(15);
            
            calc.multiply(2);
            expect(calc.getValue()).toBe(30);
            
            calc.clear();
            expect(calc.getValue()).toBe(0);
        });
    });

    // ===== CONSISTENCIA DEL ESTADO =====
    describe('Consistencia del estado', () => {
        test('el estado se mantiene consistente después de múltiples operaciones', () => {
            // Este test verifica que el estado interno se mantiene correcto después de varias operaciones combinadas.
            // Se espera que el valor acumulado siempre refleje correctamente todas las operaciones realizadas.
            const calc = new Calculator(100);
            
            // Realizar múltiples operaciones
            calc.add(50);       // 150
            calc.subtract(25);  // 125
            calc.multiply(2);   // 250
            calc.divide(5);     // 50
            
            expect(calc.getValue()).toBe(50);
            
            // Verificar que el estado persiste
            calc.add(10);
            expect(calc.getValue()).toBe(60);
        });

        test('las operaciones modifican el valor interno correctamente', () => {
            // Este test verifica que cada operación modifica this.value correctamente.
            // Se espera que los métodos modifiquen el estado interno y retornen el nuevo valor.
            const calc = new Calculator(0);
            
            calc.add(10);
            expect(calc.value).toBe(10);
            
            calc.subtract(3);
            expect(calc.value).toBe(7);
            
            calc.multiply(2);
            expect(calc.value).toBe(14);
            
            calc.divide(2);
            expect(calc.value).toBe(7);
        });
    });
});

