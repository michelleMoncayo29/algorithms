const { pollUntil, pollUntilTimeout } = require('./exercise');

describe('Sistema de Polling/Verificación Periódica', () => {
    describe('pollUntil', () => {
        test('debe resolver cuando la condición se cumple', (done) => {
            let attempts = 0;
            pollUntil(() => {
                attempts++;
                return attempts >= 3;
            }, 10, 10).then(result => {
                expect(result.success).toBe(true);
                expect(result.attempts).toBe(3);
                done();
            });
        });

        test('debe rechazar cuando se alcanza maxAttempts', (done) => {
            pollUntil(() => false, 10, 3).catch(error => {
                expect(error.success).toBe(false);
                expect(error.attempts).toBe(3);
                done();
            });
        });

        test('debe lanzar error con parámetros inválidos', () => {
            expect(() => pollUntil(null, 100, 10)).toThrow();
            expect(() => pollUntil(() => true, 0, 10)).toThrow();
            expect(() => pollUntil(() => true, 100, 0)).toThrow();
        });
    });

    describe('pollUntilTimeout', () => {
        test('debe resolver cuando la condición se cumple antes del timeout', (done) => {
            let attempts = 0;
            pollUntilTimeout(() => {
                attempts++;
                return attempts >= 2;
            }, 10, 1000).then(result => {
                expect(result.success).toBe(true);
                expect(result.attempts).toBe(2);
                expect(result.elapsed).toBeLessThan(1000);
                done();
            });
        });

        test('debe rechazar cuando se alcanza el timeout', (done) => {
            pollUntilTimeout(() => false, 10, 50).catch(error => {
                expect(error.success).toBe(false);
                expect(error.elapsed).toBeGreaterThanOrEqual(50);
                done();
            });
        });
    });
});

