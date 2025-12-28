/**
 * SOLUCIÓN: Simulador de Carga de Datos con Progress
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function loadDataWithProgress(totalItems, onProgress) {
    // Validar que totalItems sea un número positivo
    if (typeof totalItems !== 'number' || !Number.isInteger(totalItems) || totalItems <= 0) {
        throw new Error('Total items must be a positive integer');
    }

    // Validar que onProgress sea una función
    if (typeof onProgress !== 'function') {
        throw new Error('onProgress must be a function');
    }

    return new Promise((resolve) => {
        const items = [];
        let loaded = 0;

        // Función para cargar un item
        const loadItem = (index) => {
            setTimeout(() => {
                loaded++;
                items.push(index + 1);

                // Calcular progreso
                const progress = (loaded / totalItems) * 100;
                onProgress(progress);

                // Si se cargaron todos los items, resolver
                if (loaded === totalItems) {
                    resolve({
                        loaded: loaded,
                        total: totalItems,
                        items: items
                    });
                }
            }, index * 10); // Pequeño delay para simular carga
        };

        // Iniciar carga de todos los items
        for (let i = 0; i < totalItems; i++) {
            loadItem(i);
        }
    });
}

function loadDataWithStages(stages, onProgress) {
    // Validar que stages sea un array de números positivos
    if (!Array.isArray(stages) || stages.length === 0) {
        throw new Error('Stages must be a non-empty array');
    }

    for (let i = 0; i < stages.length; i++) {
        if (typeof stages[i] !== 'number' || !Number.isInteger(stages[i]) || stages[i] <= 0) {
            throw new Error('Each stage must be a positive integer');
        }
    }

    // Validar que onProgress sea una función
    if (typeof onProgress !== 'function') {
        throw new Error('onProgress must be a function');
    }

    return new Promise(async (resolve) => {
        const allItems = [];
        let totalLoaded = 0;
        const totalItems = stages.reduce((sum, stage) => sum + stage, 0);

        // Procesar cada etapa secuencialmente
        for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
            const stageItems = stages[stageIndex];
            let stageLoaded = 0;

            // Cargar items de esta etapa
            for (let itemIndex = 0; itemIndex < stageItems; itemIndex++) {
                await new Promise(resolveItem => {
                    setTimeout(() => {
                        stageLoaded++;
                        totalLoaded++;
                        allItems.push(totalLoaded);

                        // Calcular progresos
                        const stageProgress = (stageLoaded / stageItems) * 100;
                        const overallProgress = (totalLoaded / totalItems) * 100;

                        // Llamar callback con información de progreso
                        onProgress({
                            stage: stageIndex + 1,
                            stageProgress: Math.round(stageProgress),
                            overallProgress: Math.round(overallProgress)
                        });

                        resolveItem();
                    }, 10); // Pequeño delay
                });
            }
        }

        resolve({
            stages: stages.length,
            totalItems: totalItems,
            items: allItems
        });
    });
}

module.exports = {
    loadDataWithProgress,
    loadDataWithStages
};

