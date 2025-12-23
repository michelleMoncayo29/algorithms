/**
 * Simulador de Operaciones con Retry y Timeout (Async Operations with Retry and Timeout)
 *
 * Descripción: Este ejercicio introduce patrones comunes para manejar operaciones asíncronas
 * que pueden fallar: retry (reintentos) y timeout (tiempo límite).
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Crear promesas que pueden fallar aleatoriamente
 * - Implementar patrón de retry (reintentar operaciones)
 * - Implementar patrón de timeout (rechazar si tarda mucho)
 * - Combinar retry y timeout
 * - Usar Promise.allSettled() para manejar múltiples promesas
 */

/**
 * Simula una llamada a una API que puede tener éxito o fallar aleatoriamente.
 * Traducción: Simular Llamada API
 *
 * @param {number} successRate - Probabilidad de éxito entre 0 y 1 (default: 0.8)
 * @returns {Promise<string>} Promesa que se resuelve con "Success" o se rechaza con error
 *
 * TODO:
 * - Valida que successRate sea un número (si se proporciona)
 * - Lanza error "Success rate must be a number" si no es número
 * - Valida que successRate esté entre 0 y 1 (si se proporciona)
 * - Lanza error "Success rate must be between 0 and 1" si está fuera de rango
 * - Si successRate no se proporciona, usa 0.8 como default
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout con 200ms de delay
 * - Genera un número aleatorio con Math.random() (entre 0 y 1)
 * - Si random < successRate → resolve("Success")
 * - Si random >= successRate → reject(new Error("API call failed"))
 */
function simulateApiCall(successRate = 0.8) {
    throw new Error('Function simulateApiCall not implemented');
}

/**
 * Reintenta una operación que retorna una promesa si falla.
 * Traducción: Reintentar Operación
 *
 * @param {Function} operation - Función que retorna una promesa
 * @param {number} maxRetries - Número máximo de reintentos (default: 3)
 * @returns {Promise<any>} Promesa que se resuelve con el resultado o se rechaza después de todos los intentos
 *
 * TODO:
 * - Valida que operation sea una función
 * - Lanza error "Operation must be a function" si no es función
 * - Valida que maxRetries sea un número (si se proporciona)
 * - Lanza error "Max retries must be a number" si no es número
 * - Valida que maxRetries sea >= 0
 * - Lanza error "Max retries must be greater than or equal to 0" si es negativo
 * - Si maxRetries no se proporciona, usa 3 como default
 * - Intenta ejecutar operation() (llamándola como función)
 * - Si tiene éxito, retorna el resultado
 * - Si falla y maxRetries > 0, reintenta con maxRetries - 1 (recursión)
 * - Si falla y maxRetries <= 0, rechaza con el error
 */
function retryOperation(operation, maxRetries = 3) {
    throw new Error('Function retryOperation not implemented');
}

/**
 * Agrega un timeout a una promesa existente.
 * Traducción: Con Timeout
 *
 * @param {Promise} promise - Promesa a la cual agregar timeout
 * @param {number} timeoutMs - Tiempo máximo en milisegundos (default: 5000)
 * @returns {Promise<any>} Promesa con timeout aplicado
 *
 * TODO:
 * - Valida que promise sea una instancia de Promise
 * - Lanza error "Promise must be a Promise instance" si no es promesa
 * - Valida que timeoutMs sea un número (si se proporciona)
 * - Lanza error "Timeout must be a number" si no es número
 * - Valida que timeoutMs sea > 0
 * - Lanza error "Timeout must be greater than 0" si es <= 0
 * - Si timeoutMs no se proporciona, usa 5000 como default
 * - Crea una promesa de timeout que rechaza después de timeoutMs
 * - Usa Promise.race() entre la promesa original y el timeout
 * - Retorna el resultado de Promise.race()
 */
function withTimeout(promise, timeoutMs = 5000) {
    throw new Error('Function withTimeout not implemented');
}

/**
 * Combina retry y timeout para obtener datos de una URL.
 * Traducción: Obtener con Reintento
 *
 * @param {string} url - URL a obtener (simulada)
 * @param {number} maxRetries - Número máximo de reintentos (default: 3)
 * @returns {Promise<string>} Promesa que se resuelve con "Data from [url]" o se rechaza
 *
 * TODO:
 * - Valida que url no sea null, undefined o string vacío
 * - Lanza error "URL is required" si url es inválido
 * - Valida que maxRetries sea un número (si se proporciona)
 * - Lanza error "Max retries must be a number" si no es número
 * - Valida que maxRetries sea >= 0
 * - Lanza error "Max retries must be greater than or equal to 0" si es negativo
 * - Crea una función fetchOperation que:
 *   - Llama a simulateApiCall(0.6) para simular fetch (60% de éxito)
 *   - Envuelve el resultado con withTimeout(..., 1000) para agregar timeout de 1 segundo
 *   - Si tiene éxito, retorna "Data from " + url
 * - Usa retryOperation() para reintentar fetchOperation hasta maxRetries veces
 * - Retorna el resultado de retryOperation()
 */
function fetchWithRetry(url, maxRetries = 3) {
    throw new Error('Function fetchWithRetry not implemented');
}

/**
 * Procesa múltiples URLs en paralelo, cada una con su propio retry.
 * Traducción: Procesar Múltiples Requests
 *
 * @param {Array<string>} urls - Array de URLs a procesar
 * @returns {Promise<Array>} Promesa que se resuelve con array de resultados exitosos
 *
 * TODO:
 * - Valida que urls sea un array
 * - Lanza error "URLs must be an array" si no es array
 * - Valida que el array no esté vacío
 * - Lanza error "URLs array cannot be empty" si está vacío
 * - Crea un array de promesas usando .map() sobre urls
 *   - Para cada url, llama fetchWithRetry(url)
 * - Usa Promise.allSettled() con el array de promesas
 * - Filtra solo los resultados con status === 'fulfilled'
 * - Mapea los resultados exitosos a sus valores (result.value)
 * - Retorna el array filtrado y mapeado
 */
function processMultipleRequests(urls) {
    throw new Error('Function processMultipleRequests not implemented');
}

module.exports = {
    simulateApiCall,
    retryOperation,
    withTimeout,
    fetchWithRetry,
    processMultipleRequests
};

