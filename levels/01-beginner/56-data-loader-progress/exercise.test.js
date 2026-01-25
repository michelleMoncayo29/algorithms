const { loadDataWithProgress, loadDataWithStages } = require('./exercise');

describe('Simulador de Carga de Datos con Progress', () => {
    describe('loadDataWithProgress', () => {
        test('debe llamar onProgress con progreso incremental', (done) => {
            const progressValues = [];
            loadDataWithProgress(5, (progress) => {
                progressValues.push(progress);
            }).then(result => {
                expect(progressValues).toEqual([20, 40, 60, 80, 100]);
                expect(result.loaded).toBe(5);
                expect(result.total).toBe(5);
                done();
            });
        });

        test('debe resolver con items correctos', (done) => {
            loadDataWithProgress(3, () => {}).then(result => {
                expect(result.items).toEqual([1, 2, 3]);
                done();
            });
        });

        test('debe lanzar error con totalItems inválido', () => {
            expect(() => loadDataWithProgress(0, () => {})).toThrow();
            expect(() => loadDataWithProgress(-1, () => {})).toThrow();
        });

        test('debe lanzar error si onProgress no es función', () => {
            expect(() => loadDataWithProgress(5, null)).toThrow();
        });
    });

    describe('loadDataWithStages', () => {
        test('debe llamar onProgress con progreso por etapa', (done) => {
            const progressCalls = [];
            loadDataWithStages([2, 2], (progress) => {
                progressCalls.push(progress);
            }).then(() => {
                expect(progressCalls.length).toBeGreaterThan(0);
                expect(progressCalls[0]).toHaveProperty('stage');
                expect(progressCalls[0]).toHaveProperty('stageProgress');
                expect(progressCalls[0]).toHaveProperty('overallProgress');
                done();
            });
        });

        test('debe lanzar error con stages inválido', () => {
            expect(() => loadDataWithStages([], () => {})).toThrow();
            expect(() => loadDataWithStages([0, 1], () => {})).toThrow();
        });
    });
});

