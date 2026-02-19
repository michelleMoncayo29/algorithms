/**
 * Sistema de Polling/Verificación Periódica
 *
 * Descripción: Verifica estado de algo periódicamente hasta que se cumpla condición.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Polling pattern
 * - Verificación repetitiva con promesas
 * - Condiciones de parada
 * - setTimeout y setInterval con promesas
 */

/**
 * Verifica periódicamente si una condición se cumple.
 * Ejecuta checkFunction cada intervalMs hasta que retorne true o se alcance maxAttempts.
 *
 * @param {Function} checkFunction - Función que retorna true si la condición se cumple, false en caso contrario
 * @param {number} intervalMs - Intervalo en milisegundos entre verificaciones (debe ser > 0)
 * @param {number} maxAttempts - Número máximo de intentos (debe ser > 0). Si es undefined, intenta indefinidamente
 * @returns {Promise<Object>} Promesa que se resuelve con {success: true, attempts: number} cuando la condición se cumple,
 *                           o se rechaza con {success: false, attempts: number} si se alcanza maxAttempts
 *
 * Ejemplo:
 * pollUntil(() => Math.random() > 0.8, 100, 10)
 * // Verifica cada 100ms hasta 10 veces o hasta que Math.random() > 0.8
 *
 * TODO:
 * - Valida que checkFunction sea una función
 * - Valida que intervalMs sea un número positivo
 * - Valida que maxAttempts sea un número positivo (si está definido)
 * - Retorna una nueva Promise
 * - Implementa polling: ejecuta checkFunction cada intervalMs
 * - Si checkFunction retorna true, resuelve con {success: true, attempts}
 * - Si se alcanza maxAttempts sin éxito, rechaza con {success: false, attempts}
 */
function pollUntil(checkFunction, intervalMs, maxAttempts) {
    if (typeof checkFunction !== 'function') {
        throw new Error('checkFunction must be a function');

        // esto me da truo o false el callback
    }

    // Validar que intervalMs sea un número positivo
    if (typeof intervalMs !== 'number' || intervalMs <= 0) {
        throw new Error('intervalMs must be a positive number');
    }

    // Validar que maxAttempts sea un número positivo (si está definido)
    if (maxAttempts !== undefined && (typeof maxAttempts !== 'number' || !Number.isInteger(maxAttempts) || maxAttempts <= 0)) {
        throw new Error('maxAttempts must be a positive integer');
    }

    return new Promise(  function (resolve, reject)  {
        function check() {

        }
    })
}

/**
 * Verifica periódicamente hasta que una condición se cumple o se alcanza un timeout.
 *
 * @param {Function} checkFunction - Función que retorna true si la condición se cumple
 * @param {number} intervalMs - Intervalo en milisegundos entre verificaciones
 * @param {number} timeoutMs - Tiempo máximo en milisegundos para esperar (debe ser > 0)
 * @returns {Promise<Object>} Promesa que se resuelve con {success: true, attempts, elapsed} o se rechaza con {success: false, attempts, elapsed}
 *
 * TODO:
 * - Similar a pollUntil pero con timeout en lugar de maxAttempts
 * - Usa Date.now() para rastrear el tiempo transcurrido
 * - Si se alcanza timeout sin éxito, rechaza con información del tiempo
 */
function pollUntilTimeout(checkFunction, intervalMs, timeoutMs) {
    if (typeof checkFunction !== 'function') {
        throw new Error('checkFunction must be a function');
    }

    // Validar que intervalMs sea un número positivo
    if (typeof intervalMs !== 'number' || intervalMs <= 0) {
        throw new Error('intervalMs must be a positive number');
    }

    // Validar que timeoutMs sea un número positivo
    if (typeof timeoutMs !== 'number' || timeoutMs <= 0) {
        throw new Error('timeoutMs must be a positive number');
    }
}
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function () {
    for (let attempt = 2; attempt < 10; attempt++) {
        console.log("⭐ For")
        await delay(1000)
        console.log("✨ Set")
    }
})()

function repetidor () {
    
}

module.exports = {
    pollUntil,
    pollUntilTimeout
};

async function waitForCondition(maxAttempts = 10, intervalMs = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // Ejecutamos la función síncrona
        const value = checkFunction();

        if (value) {
            return { success: true, attempts: attempt };
        }

        // Si no es el último intento, esperamos antes de reintentar
        if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
    }

    return { success: false, attempts: maxAttempts };
}