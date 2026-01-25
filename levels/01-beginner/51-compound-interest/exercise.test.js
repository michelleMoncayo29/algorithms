const { calculateCompoundInterest, calculateFutureValueWithDeposits } = require('./exercise');

describe('Calculadora de Interés Compuesto', () => {
    describe('calculateCompoundInterest', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos - Verificación de funcionalidad principal', () => {
            test('debe calcular correctamente interés compuesto mensual por 5 años', () => {
                // Propósito: Verificar cálculo básico de interés compuesto mensual
                // Entrada: 1000, 0.05, 5, 12 - $1000 al 5% anual capitalizado mensualmente por 5 años
                // Esperado: ~1283.36
                const result = calculateCompoundInterest(1000, 0.05, 5, 12);
                expect(result).toBeCloseTo(1283.36, 2);
            });

            test('debe calcular correctamente interés compuesto anual por 10 años', () => {
                // Propósito: Verificar cálculo básico de interés compuesto anual
                // Entrada: 5000, 0.08, 10, 1 - $5000 al 8% anual capitalizado anualmente por 10 años
                // Esperado: ~10794.62
                const result = calculateCompoundInterest(5000, 0.08, 10, 1);
                expect(result).toBeCloseTo(10794.62, 2);
            });

            test('debe calcular correctamente interés compuesto diario', () => {
                // Propósito: Verificar cálculo con capitalización diaria
                // Entrada: 1000, 0.05, 1, 365 - $1000 al 5% anual capitalizado diariamente por 1 año
                // Esperado: ~1051.27
                const result = calculateCompoundInterest(1000, 0.05, 1, 365);
                expect(result).toBeCloseTo(1051.27, 2);
            });
        });

        // ===== CASOS EDGE Y LÍMITES =====
        describe('Casos edge y límites - Verificación de comportamientos extremos', () => {
            test('debe retornar el principal cuando la tasa es 0', () => {
                // Propósito: Verificar comportamiento cuando no hay interés
                // Entrada: 1000, 0, 5, 12 - Tasa de interés 0%
                // Esperado: 1000 (el principal sin cambios)
                const result = calculateCompoundInterest(1000, 0, 5, 12);
                expect(result).toBe(1000);
            });

            test('debe retornar el principal cuando el tiempo es 0', () => {
                // Propósito: Verificar comportamiento cuando no hay tiempo transcurrido
                // Entrada: 1000, 0.05, 0, 12 - Tiempo 0 años
                // Esperado: 1000 (el principal sin cambios)
                const result = calculateCompoundInterest(1000, 0.05, 0, 12);
                expect(result).toBe(1000);
            });

            test('debe manejar correctamente tasas de interés muy pequeñas', () => {
                // Propósito: Verificar comportamiento con tasas muy pequeñas
                // Entrada: 1000, 0.001, 10, 12 - Tasa del 0.1%
                // Esperado: ~1010.05
                const result = calculateCompoundInterest(1000, 0.001, 10, 12);
                expect(result).toBeCloseTo(1010.05, 2);
            });

            test('debe usar frecuencia de capitalización 1 por defecto', () => {
                // Propósito: Verificar que el parámetro opcional funciona correctamente
                // Entrada: 1000, 0.05, 5 - Sin especificar compoundFrequency
                // Esperado: Resultado con capitalización anual (frecuencia 1)
                const result = calculateCompoundInterest(1000, 0.05, 5);
                expect(result).toBeCloseTo(1276.28, 2);
            });
        });

        // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
        describe('Validación de inputs - Verificación de principio Fail Fast', () => {
            test('debe lanzar error cuando principal no es número', () => {
                expect(() => calculateCompoundInterest("1000", 0.05, 5, 12)).toThrow();
            });

            test('debe lanzar error cuando principal es negativo', () => {
                expect(() => calculateCompoundInterest(-1000, 0.05, 5, 12)).toThrow();
            });

            test('debe lanzar error cuando rate es negativo', () => {
                expect(() => calculateCompoundInterest(1000, -0.05, 5, 12)).toThrow();
            });

            test('debe lanzar error cuando time es negativo', () => {
                expect(() => calculateCompoundInterest(1000, 0.05, -5, 12)).toThrow();
            });

            test('debe lanzar error cuando compoundFrequency no es positivo', () => {
                expect(() => calculateCompoundInterest(1000, 0.05, 5, 0)).toThrow();
            });
        });

        // ===== TESTS DE PRECISIÓN =====
        describe('Precisión numérica - Verificación de manejo correcto de números', () => {
            test('debe manejar números de punto flotante con precisión adecuada', () => {
                const result = calculateCompoundInterest(1234.56, 0.0525, 7.5, 4);
                expect(result).toBeCloseTo(1856.23, 2);
            });
        });
    });

    describe('calculateFutureValueWithDeposits', () => {
        // ===== CASOS BÁSICOS =====
        describe('Casos básicos - Verificación de funcionalidad principal', () => {
            test('debe calcular correctamente valor futuro con depósito inicial y depósitos mensuales', () => {
                // Propósito: Verificar cálculo básico con depósitos periódicos
                // Entrada: 1000, 100, 0.05, 10 - $1000 inicial + $100 mensuales al 5% por 10 años
                // Esperado: ~16917.13
                const result = calculateFutureValueWithDeposits(1000, 100, 0.05, 10);
                expect(result).toBeCloseTo(16917.13, 2);
            });

            test('debe calcular correctamente cuando no hay depósito inicial', () => {
                // Propósito: Verificar cálculo solo con depósitos mensuales
                // Entrada: 0, 200, 0.06, 5 - Solo $200 mensuales al 6% por 5 años
                // Esperado: ~13954.01
                const result = calculateFutureValueWithDeposits(0, 200, 0.06, 5);
                expect(result).toBeCloseTo(13954.01, 2);
            });

            test('debe calcular correctamente cuando no hay depósitos mensuales', () => {
                // Propósito: Verificar cálculo solo con depósito inicial
                // Entrada: 5000, 0, 0.05, 10 - Solo $5000 inicial al 5% por 10 años
                // Esperado: ~8144.47
                const result = calculateFutureValueWithDeposits(5000, 0, 0.05, 10);
                expect(result).toBeCloseTo(8144.47, 2);
            });
        });

        // ===== CASOS EDGE Y LÍMITES =====
        describe('Casos edge y límites - Verificación de comportamientos extremos', () => {
            test('debe retornar solo depósitos cuando la tasa es 0', () => {
                // Propósito: Verificar comportamiento cuando no hay interés
                // Entrada: 1000, 100, 0, 10 - Tasa 0%
                // Esperado: 1000 + (100 * 12 * 10) = 13000
                const result = calculateFutureValueWithDeposits(1000, 100, 0, 10);
                expect(result).toBe(13000);
            });

            test('debe retornar solo el depósito inicial cuando el tiempo es 0', () => {
                // Propósito: Verificar comportamiento cuando no hay tiempo transcurrido
                // Entrada: 1000, 100, 0.05, 0 - Tiempo 0 años
                // Esperado: 1000 (solo el depósito inicial)
                const result = calculateFutureValueWithDeposits(1000, 100, 0.05, 0);
                expect(result).toBe(1000);
            });
        });

        // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
        describe('Validación de inputs - Verificación de principio Fail Fast', () => {
            test('debe lanzar error cuando initialDeposit es negativo', () => {
                expect(() => calculateFutureValueWithDeposits(-1000, 100, 0.05, 10)).toThrow();
            });

            test('debe lanzar error cuando monthlyDeposit es negativo', () => {
                expect(() => calculateFutureValueWithDeposits(1000, -100, 0.05, 10)).toThrow();
            });

            test('debe lanzar error cuando rate es negativo', () => {
                expect(() => calculateFutureValueWithDeposits(1000, 100, -0.05, 10)).toThrow();
            });

            test('debe lanzar error cuando years es negativo', () => {
                expect(() => calculateFutureValueWithDeposits(1000, 100, 0.05, -10)).toThrow();
            });
        });
    });
});

