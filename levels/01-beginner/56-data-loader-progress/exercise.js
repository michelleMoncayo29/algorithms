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
    throw new Error('Function loadDataWithProgress not implemented');
}

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
    throw new Error('Function loadDataWithStages not implemented');
}

module.exports = {
    loadDataWithProgress,
    loadDataWithStages
};

