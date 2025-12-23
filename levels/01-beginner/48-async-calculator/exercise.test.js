const {
    asyncAdd,
    asyncMultiply,
    asyncCalculate,
    asyncCalculateParallel,
    measureExecutionTime
} = require('./exercise');

describe('Calculadora Asíncrona con Operaciones Simuladas', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe sumar dos números asíncronamente', async () => {
            // Propósito: Verificar que asyncAdd suma correctamente después del delay
            // Entrada: asyncAdd(5, 3) - Sumar 5 + 3
            // Esperado: Debe retornar 8 después de ~200ms
            const startTime = Date.now();
            const result = await asyncAdd(5, 3);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe(8);
            expect(elapsed).toBeGreaterThanOrEqual(180);
            expect(elapsed).toBeLessThan(300);
        });

        test('debe multiplicar dos números asíncronamente', async () => {
            // Propósito: Verificar que asyncMultiply multiplica correctamente después del delay
            // Entrada: asyncMultiply(4, 7) - Multiplicar 4 × 7
            // Esperado: Debe retornar 28 después de ~300ms
            const startTime = Date.now();
            const result = await asyncMultiply(4, 7);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe(28);
            expect(elapsed).toBeGreaterThanOrEqual(250);
            expect(elapsed).toBeLessThan(400);
        });

        test('debe calcular operaciones secuencialmente', async () => {
            // Propósito: Verificar que asyncCalculate ejecuta operaciones en orden secuencial
            // Entrada: [{add, 5, 3}, {multiply, 8, 2}, {add, 16, 4}]
            // Esperado: Debe retornar 20 después de ~700ms (200+300+200)
            const operations = [
                { type: 'add', a: 5, b: 3 },
                { type: 'multiply', a: 8, b: 2 },
                { type: 'add', a: 16, b: 4 }
            ];

            const startTime = Date.now();
            const result = await asyncCalculate(operations);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe(20);
            expect(elapsed).toBeGreaterThanOrEqual(650);
            expect(elapsed).toBeLessThan(850);
        });

        test('debe calcular operaciones en paralelo', async () => {
            // Propósito: Verificar que asyncCalculateParallel ejecuta operaciones simultáneamente
            // Entrada: [{add, 1, 1}, {add, 2, 2}, {add, 3, 3}]
            // Esperado: Debe retornar 12 (2+4+6) después de ~200ms (no 600ms)
            const operations = [
                { type: 'add', a: 1, b: 1 },
                { type: 'add', a: 2, b: 2 },
                { type: 'add', a: 3, b: 3 }
            ];

            const startTime = Date.now();
            const result = await asyncCalculateParallel(operations);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe(12); // 2 + 4 + 6
            // Debe ser aproximadamente 200ms (no 600ms que sería secuencial)
            expect(elapsed).toBeLessThan(400);
        });

        test('debe medir tiempo de ejecución correctamente', async () => {
            // Propósito: Verificar que measureExecutionTime mide correctamente el tiempo
            // Entrada: Función que ejecuta asyncAdd y asyncMultiply
            // Esperado: Debe retornar tiempo aproximado de 500ms (200+300)
            const testFunction = async () => {
                await asyncAdd(1, 1);
                await asyncMultiply(2, 2);
            };

            const time = await measureExecutionTime(testFunction);

            expect(time).toBeGreaterThanOrEqual(450);
            expect(time).toBeLessThan(650);
        });

        test('debe manejar operaciones mixtas (add y multiply) en secuencial', async () => {
            // Propósito: Verificar que asyncCalculate maneja diferentes tipos de operaciones
            // Entrada: Operaciones con add y multiply mezcladas
            // Esperado: Debe ejecutarlas en orden y retornar resultado correcto
            const operations = [
                { type: 'multiply', a: 2, b: 3 },
                { type: 'add', a: 6, b: 4 },
                { type: 'multiply', a: 10, b: 2 }
            ];

            const result = await asyncCalculate(operations);
            expect(result).toBe(20); // (2*3) + 4 = 10, luego 10*2 = 20
        });

        test('debe manejar operaciones mixtas en paralelo', async () => {
            // Propósito: Verificar que asyncCalculateParallel maneja diferentes tipos
            // Entrada: Operaciones con add y multiply mezcladas
            // Esperado: Debe ejecutarlas en paralelo y sumar resultados
            const operations = [
                { type: 'multiply', a: 2, b: 3 }, // 6
                { type: 'add', a: 4, b: 5 },      // 9
                { type: 'multiply', a: 1, b: 2 } // 2
            ];

            const result = await asyncCalculateParallel(operations);
            expect(result).toBe(17); // 6 + 9 + 2
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe manejar números negativos', async () => {
            // Propósito: Verificar que las operaciones funcionan con números negativos
            // Entrada: asyncAdd(-5, 3) y asyncMultiply(-2, 4)
            // Esperado: Debe calcular correctamente
            expect(await asyncAdd(-5, 3)).toBe(-2);
            expect(await asyncMultiply(-2, 4)).toBe(-8);
        });

        test('debe manejar números decimales', async () => {
            // Propósito: Verificar que las operaciones funcionan con decimales
            // Entrada: asyncAdd(1.5, 2.5) y asyncMultiply(2.5, 3)
            // Esperado: Debe calcular correctamente
            expect(await asyncAdd(1.5, 2.5)).toBe(4);
            expect(await asyncMultiply(2.5, 3)).toBe(7.5);
        });

        test('debe manejar una sola operación en asyncCalculate', async () => {
            // Propósito: Verificar comportamiento con un solo elemento
            // Entrada: asyncCalculate([{add, 1, 1}])
            // Esperado: Debe retornar 2
            const result = await asyncCalculate([{ type: 'add', a: 1, b: 1 }]);
            expect(result).toBe(2);
        });

        test('debe manejar una sola operación en asyncCalculateParallel', async () => {
            // Propósito: Verificar comportamiento con un solo elemento
            // Entrada: asyncCalculateParallel([{add, 2, 3}])
            // Esperado: Debe retornar 5
            const result = await asyncCalculateParallel([{ type: 'add', a: 2, b: 3 }]);
            expect(result).toBe(5);
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error cuando a no es número en asyncAdd', async () => {
            // Propósito: Verificar validación de tipo numérico
            // Entrada: asyncAdd("5", 3) - String en lugar de número
            // Esperado: Error "First number must be a number"
            await expect(asyncAdd('5', 3)).rejects.toThrow('First number must be a number');
        });

        test('debe lanzar error cuando b no es número en asyncAdd', async () => {
            // Propósito: Verificar validación de segundo parámetro
            // Entrada: asyncAdd(5, "3") - String en lugar de número
            // Esperado: Error "Second number must be a number"
            await expect(asyncAdd(5, '3')).rejects.toThrow('Second number must be a number');
        });

        test('debe lanzar error cuando a no es número en asyncMultiply', async () => {
            // Propósito: Verificar validación en asyncMultiply
            // Entrada: asyncMultiply(null, 3)
            // Esperado: Error "First number must be a number"
            await expect(asyncMultiply(null, 3)).rejects.toThrow('First number must be a number');
        });

        test('debe lanzar error cuando operations no es array', async () => {
            // Propósito: Verificar validación de tipo array
            // Entrada: asyncCalculate("not an array")
            // Esperado: Error "Operations must be an array"
            await expect(asyncCalculate('not an array')).rejects.toThrow('Operations must be an array');
        });

        test('debe lanzar error cuando operations está vacío', async () => {
            // Propósito: Verificar validación de array no vacío
            // Entrada: asyncCalculate([])
            // Esperado: Error "Operations array cannot be empty"
            await expect(asyncCalculate([])).rejects.toThrow('Operations array cannot be empty');
        });

        test('debe lanzar error cuando operación no tiene type', async () => {
            // Propósito: Verificar validación de propiedades requeridas
            // Entrada: asyncCalculate([{a: 1, b: 2}]) - Sin type
            // Esperado: Error "Operation must have type, a, and b"
            await expect(asyncCalculate([{ a: 1, b: 2 }])).rejects.toThrow('Operation must have type, a, and b');
        });

        test('debe lanzar error cuando type es inválido', async () => {
            // Propósito: Verificar validación de tipo de operación
            // Entrada: asyncCalculate([{type: 'divide', a: 1, b: 2}])
            // Esperado: Error "Operation type must be \'add\' or \'multiply\'"
            await expect(asyncCalculate([{ type: 'divide', a: 1, b: 2 }])).rejects.toThrow("Operation type must be 'add' or 'multiply'");
        });

        test('debe lanzar error cuando asyncFn no es función', async () => {
            // Propósito: Verificar validación de tipo función
            // Entrada: measureExecutionTime("not a function")
            // Esperado: Error "Function must be a function"
            await expect(measureExecutionTime('not a function')).rejects.toThrow('Function must be a function');
        });
    });

    // ===== CASOS ADICIONALES =====
    describe('Casos adicionales', () => {
        test('debe demostrar que paralelo es más rápido que secuencial', async () => {
            // Propósito: Verificar que ejecución paralela es más rápida
            // Entrada: Mismas operaciones en secuencial y paralelo
            // Esperado: Paralelo debe ser significativamente más rápido
            const operations = [
                { type: 'add', a: 1, b: 1 },
                { type: 'add', a: 2, b: 2 },
                { type: 'add', a: 3, b: 3 }
            ];

            const tiempoSecuencial = await measureExecutionTime(() => asyncCalculate(operations));
            const tiempoParalelo = await measureExecutionTime(() => asyncCalculateParallel(operations));

            // Paralelo debe ser más rápido (aproximadamente 3 veces más rápido)
            expect(tiempoParalelo).toBeLessThan(tiempoSecuencial);
            expect(tiempoParalelo).toBeLessThan(400); // ~200ms
            expect(tiempoSecuencial).toBeGreaterThan(500); // ~600ms
        });

        test('debe manejar múltiples operaciones de multiplicación en paralelo', async () => {
            // Propósito: Verificar que operaciones más lentas también se ejecutan en paralelo
            // Entrada: Múltiples multiplicaciones (300ms cada una)
            // Esperado: Debe tomar ~300ms (no 900ms)
            const operations = [
                { type: 'multiply', a: 1, b: 2 },
                { type: 'multiply', a: 3, b: 4 },
                { type: 'multiply', a: 5, b: 6 }
            ];

            const startTime = Date.now();
            const result = await asyncCalculateParallel(operations);
            const endTime = Date.now();
            const elapsed = endTime - startTime;

            expect(result).toBe(44); // 2 + 12 + 30
            expect(elapsed).toBeLessThan(450); // Aproximadamente 300ms, no 900ms
        });

        test('debe mantener precisión con números grandes', async () => {
            // Propósito: Verificar que las operaciones funcionan con números grandes
            // Entrada: Números grandes en las operaciones
            // Esperado: Debe calcular correctamente sin perder precisión
            const result1 = await asyncAdd(1000000, 2000000);
            const result2 = await asyncMultiply(1000, 2000);

            expect(result1).toBe(3000000);
            expect(result2).toBe(2000000);
        });
    });
});

