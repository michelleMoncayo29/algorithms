const {
    simulateApiCall,
    retryOperation,
    withTimeout,
    fetchWithRetry,
    processMultipleRequests
} = require('./exercise');

// Helper function para crear delays en los tests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Simulador de Operaciones con Retry y Timeout', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos', () => {
        test('debe simular una llamada API con éxito cuando successRate es 1.0', async () => {
            // Propósito: Verificar que simulateApiCall puede tener éxito siempre
            // Entrada: simulateApiCall(1.0) - 100% de probabilidad de éxito
            // Esperado: Debe resolver siempre con "Success"
            const result = await simulateApiCall(1.0);
            expect(result).toBe('Success');
        });

        test('debe simular una llamada API que falla cuando successRate es 0.0', async () => {
            // Propósito: Verificar que simulateApiCall puede fallar siempre
            // Entrada: simulateApiCall(0.0) - 0% de probabilidad de éxito
            // Esperado: Debe rechazar siempre con error "API call failed"
            await expect(simulateApiCall(0.0)).rejects.toThrow('API call failed');
        });

        test('debe reintentar una operación que falla y luego tiene éxito', async () => {
            // Propósito: Verificar que retryOperation reintenta correctamente
            // Entrada: Operación que falla 2 veces y luego tiene éxito, maxRetries=5
            // Esperado: Debe retornar "Success" después de 3 intentos
            let attempts = 0;
            const flakyOperation = () => {
                attempts++;
                if (attempts < 3) {
                    return Promise.reject(new Error('Failed'));
                }
                return Promise.resolve('Success');
            };

            const result = await retryOperation(flakyOperation, 5);
            expect(result).toBe('Success');
            expect(attempts).toBe(3);
        });

        test('debe agregar timeout a una promesa que se completa a tiempo', async () => {
            // Propósito: Verificar que withTimeout permite promesas que se completan antes del timeout
            // Entrada: Promesa que se resuelve en 100ms con timeout de 500ms
            // Esperado: Debe resolver correctamente (la promesa termina antes del timeout)
            const fastPromise = new Promise(resolve => {
                setTimeout(() => resolve('Success'), 100);
            });
            const result = await withTimeout(fastPromise, 500);
            expect(result).toBe('Success');
        });

        test('debe rechazar una promesa que excede el timeout', async () => {
            // Propósito: Verificar que withTimeout rechaza promesas que tardan demasiado
            // Entrada: Promesa que se resuelve en 1000ms con timeout de 100ms
            // Esperado: Debe rechazar con error "Operation timed out"
            const slowPromise = new Promise(resolve => {
                setTimeout(() => resolve('Success'), 1000);
            });
            await expect(withTimeout(slowPromise, 100)).rejects.toThrow('Operation timed out');
        });

        test('debe combinar retry y timeout en fetchWithRetry', async () => {
            // Propósito: Verificar que fetchWithRetry combina correctamente retry y timeout
            // Entrada: fetchWithRetry("https://api.example.com", 3)
            // Esperado: Debe retornar "Data from [url]" si tiene éxito después de reintentos
            // Nota: Como simulateApiCall tiene 60% de éxito, puede necesitar varios intentos
            const result = await fetchWithRetry('https://api.example.com', 5);
            expect(result).toBe('Data from https://api.example.com');
        }, 10000); // Aumentar timeout del test porque puede tardar con reintentos

        test('debe procesar múltiples requests en paralelo', async () => {
            // Propósito: Verificar que processMultipleRequests procesa URLs en paralelo
            // Entrada: processMultipleRequests(["url1", "url2", "url3"])
            // Esperado: Debe retornar array con resultados exitosos (puede tener menos de 3 si algunos fallan)
            const urls = ['https://api1.com', 'https://api2.com', 'https://api3.com'];
            const results = await processMultipleRequests(urls);

            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(3);
            results.forEach(result => {
                expect(result).toMatch(/^Data from https:\/\/api\d\.com$/);
            });
        }, 15000);
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites', () => {
        test('debe manejar retryOperation con 0 reintentos', async () => {
            // Propósito: Verificar comportamiento con 0 reintentos
            // Entrada: Operación que falla, maxRetries=0
            // Esperado: Debe rechazar inmediatamente sin reintentar
            const failingOperation = () => Promise.reject(new Error('Failed'));
            await expect(retryOperation(failingOperation, 0)).rejects.toThrow('Failed');
        });

        test('debe manejar timeout de 0 milisegundos', async () => {
            // Propósito: Verificar comportamiento con timeout mínimo
            // Entrada: delay(100) con timeout de 0ms
            // Esperado: Debe rechazar inmediatamente con timeout
            const promise = delay(100);
            await expect(withTimeout(promise, 0)).rejects.toThrow('Timeout must be greater than 0');
        });

        test('debe manejar processMultipleRequests con un solo URL', async () => {
            // Propósito: Verificar comportamiento con un solo elemento
            // Entrada: processMultipleRequests(["single-url"])
            // Esperado: Debe retornar array con 0 o 1 elemento
            const results = await processMultipleRequests(['https://single.com']);
            expect(Array.isArray(results)).toBe(true);
            expect(results.length).toBeLessThanOrEqual(1);
        }, 10000);
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs', () => {
        test('debe lanzar error cuando successRate no es número', async () => {
            // Propósito: Verificar validación de tipo numérico
            // Entrada: simulateApiCall("0.8") - String en lugar de número
            // Esperado: Error "Success rate must be a number"
            await expect(simulateApiCall('0.8')).rejects.toThrow('Success rate must be a number');
        });

        test('debe lanzar error cuando successRate está fuera de rango', async () => {
            // Propósito: Verificar validación de rango [0, 1]
            // Entrada: simulateApiCall(1.5) - Valor mayor que 1
            // Esperado: Error "Success rate must be between 0 and 1"
            await expect(simulateApiCall(1.5)).rejects.toThrow('Success rate must be between 0 and 1');
            await expect(simulateApiCall(-0.1)).rejects.toThrow('Success rate must be between 0 and 1');
        });

        test('debe lanzar error cuando operation no es función', async () => {
            // Propósito: Verificar validación de tipo función
            // Entrada: retryOperation("not a function", 3)
            // Esperado: Error "Operation must be a function"
            await expect(retryOperation('not a function', 3)).rejects.toThrow('Operation must be a function');
        });

        test('debe lanzar error cuando maxRetries no es número', async () => {
            // Propósito: Verificar validación de tipo numérico en maxRetries
            // Entrada: retryOperation(() => Promise.resolve(), "3")
            // Esperado: Error "Max retries must be a number"
            await expect(retryOperation(() => Promise.resolve(), '3')).rejects.toThrow('Max retries must be a number');
        });

        test('debe lanzar error cuando maxRetries es negativo', async () => {
            // Propósito: Verificar validación de valor no negativo
            // Entrada: retryOperation(() => Promise.resolve(), -1)
            // Esperado: Error "Max retries must be greater than or equal to 0"
            await expect(retryOperation(() => Promise.resolve(), -1)).rejects.toThrow('Max retries must be greater than or equal to 0');
        });

        test('debe lanzar error cuando promise no es una promesa', async () => {
            // Propósito: Verificar validación de instancia de Promise
            // Entrada: withTimeout("not a promise", 1000)
            // Esperado: Error "Promise must be a Promise instance"
            await expect(withTimeout('not a promise', 1000)).rejects.toThrow('Promise must be a Promise instance');
        });

        test('debe lanzar error cuando timeoutMs no es número', async () => {
            // Propósito: Verificar validación de tipo numérico en timeout
            // Entrada: withTimeout(Promise.resolve(), "1000")
            // Esperado: Error "Timeout must be a number"
            await expect(withTimeout(Promise.resolve(), '1000')).rejects.toThrow('Timeout must be a number');
        });

        test('debe lanzar error cuando timeoutMs es menor o igual a 0', async () => {
            // Propósito: Verificar validación de valor positivo
            // Entrada: withTimeout(Promise.resolve(), 0)
            // Esperado: Error "Timeout must be greater than 0"
            await expect(withTimeout(Promise.resolve(), 0)).rejects.toThrow('Timeout must be greater than 0');
            await expect(withTimeout(Promise.resolve(), -100)).rejects.toThrow('Timeout must be greater than 0');
        });

        test('debe lanzar error cuando url está vacío en fetchWithRetry', async () => {
            // Propósito: Verificar validación de URL requerido
            // Entrada: fetchWithRetry("", 3)
            // Esperado: Error "URL is required"
            await expect(fetchWithRetry('', 3)).rejects.toThrow('URL is required');
        });

        test('debe lanzar error cuando urls no es array en processMultipleRequests', async () => {
            // Propósito: Verificar validación de tipo array
            // Entrada: processMultipleRequests("not an array")
            // Esperado: Error "URLs must be an array"
            await expect(processMultipleRequests('not an array')).rejects.toThrow('URLs must be an array');
        });
    });

    // ===== CASOS ADICIONALES =====
    describe('Casos adicionales', () => {
        test('debe fallar después de todos los reintentos si la operación nunca tiene éxito', async () => {
            // Propósito: Verificar que retryOperation falla después de agotar reintentos
            // Entrada: Operación que siempre falla, maxRetries=2
            // Esperado: Debe rechazar después de 3 intentos (1 inicial + 2 reintentos)
            let attempts = 0;
            const alwaysFailing = () => {
                attempts++;
                return Promise.reject(new Error('Always fails'));
            };

            await expect(retryOperation(alwaysFailing, 2)).rejects.toThrow('Always fails');
            expect(attempts).toBe(3); // 1 inicial + 2 reintentos
        });

        test('debe mantener el orden de resultados en processMultipleRequests', async () => {
            // Propósito: Verificar que los resultados mantienen el orden relativo de URLs exitosas
            // Entrada: processMultipleRequests(["url1", "url2", "url3"])
            // Esperado: Los resultados deben estar en el mismo orden que las URLs exitosas
            const urls = ['https://first.com', 'https://second.com', 'https://third.com'];
            const results = await processMultipleRequests(urls);

            // Verificar que los resultados mantienen el orden
            if (results.length > 1) {
                const firstIndex = urls.findIndex(url => results[0].includes(url.split('//')[1].split('.')[0]));
                const secondIndex = urls.findIndex(url => results[1] && results[1].includes(url.split('//')[1].split('.')[0]));
                if (firstIndex !== -1 && secondIndex !== -1) {
                    expect(firstIndex).toBeLessThan(secondIndex);
                }
            }
        }, 15000);
    });
});

