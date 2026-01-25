const { processTasksSequentially, processTasksInParallel, processTasksWithConcurrency } = require('./exercise');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Procesador de Tareas en Cola con Promesas', () => {
    describe('processTasksSequentially', () => {
        test('debe procesar tareas secuencialmente', (done) => {
            const results = [];
            const tasks = [
                () => delay(10).then(() => { results.push(1); return 1; }),
                () => delay(10).then(() => { results.push(2); return 2; }),
                () => delay(10).then(() => { results.push(3); return 3; })
            ];

            processTasksSequentially(tasks).then(output => {
                expect(output).toEqual([1, 2, 3]);
                expect(results).toEqual([1, 2, 3]); // Verifica orden secuencial
                done();
            });
        });

        test('debe retornar resultados en orden', (done) => {
            const tasks = [
                () => Promise.resolve('first'),
                () => Promise.resolve('second'),
                () => Promise.resolve('third')
            ];

            processTasksSequentially(tasks).then(results => {
                expect(results).toEqual(['first', 'second', 'third']);
                done();
            });
        });

        test('debe lanzar error con tasks inválido', () => {
            expect(() => processTasksSequentially(null)).toThrow();
            expect(() => processTasksSequentially([null])).toThrow();
        });
    });

    describe('processTasksInParallel', () => {
        test('debe procesar tareas en paralelo', (done) => {
            const startTime = Date.now();
            const tasks = [
                () => delay(50).then(() => 1),
                () => delay(50).then(() => 2),
                () => delay(50).then(() => 3)
            ];

            processTasksInParallel(tasks).then(results => {
                const elapsed = Date.now() - startTime;
                expect(results).toEqual([1, 2, 3]);
                expect(elapsed).toBeLessThan(100); // Debe ser ~50ms, no ~150ms
                done();
            });
        });

        test('debe retornar resultados en orden', (done) => {
            const tasks = [
                () => Promise.resolve('a'),
                () => Promise.resolve('b'),
                () => Promise.resolve('c')
            ];

            processTasksInParallel(tasks).then(results => {
                expect(results).toEqual(['a', 'b', 'c']);
                done();
            });
        });
    });

    describe('processTasksWithConcurrency', () => {
        test('debe respetar límite de concurrencia', (done) => {
            let running = 0;
            let maxRunning = 0;
            
            const tasks = Array.from({length: 5}, (_, i) => () => {
                running++;
                maxRunning = Math.max(maxRunning, running);
                return delay(20).then(() => {
                    running--;
                    return i + 1;
                });
            });

            processTasksWithConcurrency(tasks, 2).then(results => {
                expect(maxRunning).toBeLessThanOrEqual(2);
                expect(results).toHaveLength(5);
                done();
            });
        });

        test('debe retornar resultados en orden', (done) => {
            const tasks = [
                () => delay(10).then(() => 1),
                () => delay(10).then(() => 2),
                () => delay(10).then(() => 3)
            ];

            processTasksWithConcurrency(tasks, 2).then(results => {
                expect(results).toEqual([1, 2, 3]);
                done();
            });
        });

        test('debe lanzar error con concurrencyLimit inválido', () => {
            const tasks = [() => Promise.resolve(1)];
            expect(() => processTasksWithConcurrency(tasks, 0)).toThrow();
            expect(() => processTasksWithConcurrency(tasks, -1)).toThrow();
        });
    });
});

