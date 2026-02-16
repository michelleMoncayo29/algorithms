// items = 12
// itemsProcesados = 4
// progreso = itemsProcesados / items * 100

// const totalItems = 10;
// const onProcess = (prcess) => {console.log('progreso', prcess)};

// for(...) {
//     await sleep(500);
//     const percentage = ...
//     onProcess(percentage)
// }



/**
 * Simulador de Carga de Datos con Progress
 *
 * Descripción: Simula carga de datos con callbacks de progreso usando promesas.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Crear promesas con new Promise()
 * - Usar setTimeout() para simular delays
 * - Callbacks de progreso en promesas
 * - Eventos asíncronos con progreso
 */

/**
 * Simula la carga de datos con callbacks de progreso.
 * La función debe llamar al callback onProgress con el progreso (0-100) durante la carga.
 *
 * @param {number} totalItems - Número total de items a cargar (debe ser mayor que 0)
 * @param {Function} onProgress - Callback que se llama con el progreso (0-100) cada vez que se carga un item
 * @returns {Promise<Object>} Promesa que se resuelve con {loaded: number, total: number, items: Array} después de cargar todos los items
 *
 * Ejemplo:
 * loadDataWithProgress(5, (progress) => console.log(progress))
 * // Llama onProgress con: 20, 40, 60, 80, 100
 * // Resuelve con: {loaded: 5, total: 5, items: [1, 2, 3, 4, 5]}
 *
 * TODO:
 * - Valida que totalItems sea un número positivo
 * - Valida que onProgress sea una función
 * - Retorna una nueva Promise
 * - Simula carga de items uno por uno con setTimeout
 * - Para cada item cargado, calcula el progreso: (loaded / total) * 100
 * - Llama onProgress con el progreso calculado
 * - Después de cargar todos, resuelve con {loaded, total, items: [1, 2, ..., total]}
 */
function loadDataWithProgress(totalItems, onProgress) {
    if(typeof totalItems !== 'number' || isNaN(totalItems) || totalItems <= 0) {
        throw new Error('Total items must be a positive number');
    }

    if (typeof onProgress !== 'function') {
        throw new Error('onProgress must be a function');
    }

    
    // * ejecutar aca adentro la funcion y progress. Por cada totalItems.

    // Y debo ejecutar un progress con el porcentaje de progreso. Para eso debo saber cuantos items se han cargado y cuantos quedan por cargar.

    // ejecutar el ciclo para ejecutar la funcion de progress por la cantidad de items procesados.


    // esto debe estar dentro de una promesa.

    return new Promise(function (resolve, reject) {

        const items = [];

        for (let i = 1; i <= totalItems; i++) {
            const progress = (i / totalItems) * 100;
            onProgress(progress);
            items.push(i);
        }
        
        resolve({total: totalItems, loaded: totalItems, items});
    });
}

// loadDataWithProgress(5, function (progress) {
//     console.log('progress', progress);
// }).then((valor) => {
//     console.log('Carga completa:', valor);
// });



/**
 * Simula la carga de datos con múltiples etapas y progreso por etapa.
 *
 * @param {Array<number>} stages - Array con el número de items por etapa [stage1Items, stage2Items, ...]
 * @param {Function} onProgress - Callback que se llama con {stage: number, stageProgress: number, overallProgress: number}
 * @returns {Promise<Object>} Promesa que se resuelve con información de todas las etapas
 *
 * Ejemplo:
 * loadDataWithStages([3, 2, 5], (progress) => console.log(progress))
 * // Llama onProgress con progreso por etapa y progreso general
 *
 * TODO:
 * - Valida que stages sea un array de números positivos
 * - Valida que onProgress sea una función
 * - Carga cada etapa secuencialmente
 * - Para cada etapa, calcula el progreso de la etapa y el progreso general
 * - Llama onProgress con {stage, stageProgress, overallProgress}
 */
function loadDataWithStages(stages, onProgress) {
    if(!Array.isArray(stages) || stages.length === 0) {
        throw new Error('Stages must be a non-empty array');
    }

    for (const stage of stages) {
        if (typeof stage !== 'number' || isNaN(stage) || stage <= 0) {
            throw new Error('Stages must be an array of positive numbers');
        }
    }

    if (typeof onProgress !== 'function') {
        throw new Error('onProgress must be a function');
    }


    // return new Promise((resolve) => {
    //     let overallLoaded = 0;
    //     const totalItems = stages.reduce((sum, stage) => sum + stage, 0);

    //     let currentStage = 0;
    //     let currentStageLoaded = 0;

    //     const loadStage = (stageIndex) => {
    //         if (stageIndex >= stages.length) {
    //             resolve({ overallLoaded, total: totalItems });
    //             return;
    //         }

    //         const stageItems = stages[stageIndex];
    //         currentStage = stageIndex + 1;
    //         currentStageLoaded = 0;

    //         const interval = setInterval(() => {
    //             currentStageLoaded++;
    //             overallLoaded++;

    //             const stageProgress = (currentStageLoaded / stageItems) * 100;
    //             const overallProgress = (overallLoaded / totalItems) * 100;

    //             onProgress({
    //                 stage: currentStage,
    //                 stageProgress: stageProgress,
    //                 overallProgress: overallProgress
    //             });

    //             if (currentStageLoaded === stageItems) {
    //                 clearInterval(interval);
    //                 loadStage(stageIndex + 1);
    //             }
    //         }, 100);
    //     };

    //     loadStage(0);
    // });
}

module.exports = {
    loadDataWithProgress,
    loadDataWithStages
};

