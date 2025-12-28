/**
 * Solución: Simulador de Operaciones con Retry y Timeout
 * 
 * Esta implementación muestra cómo implementar patrones de retry y timeout
 * para hacer operaciones asíncronas más robustas.
 */

/**
 * Simula una llamada a una API que puede tener éxito o fallar aleatoriamente.
 */
function simulateApiCall(successRate = 0.8) {
    // Validar que successRate sea un número
    if (typeof successRate !== 'number') {
        return Promise.reject(new Error('Success rate must be a number'));
    }

    // Validar que successRate esté entre 0 y 1
    if (successRate < 0 || successRate > 1) {
        return Promise.reject(new Error('Success rate must be between 0 and 1'));
    }

    // Retornar una nueva promesa
    return new Promise((resolve, reject) => {
        // Simular delay de 200ms
        setTimeout(() => {
            // Generar número aleatorio entre 0 y 1
            const random = Math.random();

            // Determinar éxito o fallo basado en successRate
            if (random < successRate) {
                resolve('Success');
            } else {
                reject(new Error('API call failed'));
            }
        }, 200);
    });
}

/**
 * Reintenta una operación que retorna una promesa si falla.
 */
function retryOperation(operation, maxRetries = 3) {
    // Validar que operation sea una función
    if (typeof operation !== 'function') {
        return Promise.reject(new Error('Operation must be a function'));
    }

    // Validar que maxRetries sea un número
    if (typeof maxRetries !== 'number') {
        return Promise.reject(new Error('Max retries must be a number'));
    }

    // Validar que maxRetries sea mayor o igual a 0
    if (maxRetries < 0) {
        return Promise.reject(new Error('Max retries must be greater than or equal to 0'));
    }

    // Intentar ejecutar la operación
    return operation().catch(error => {
        // Si no quedan reintentos, rechazar con el error
        if (maxRetries <= 0) {
            throw error;
        }

        // Reintentar con un intento menos
        return retryOperation(operation, maxRetries - 1);
    });
}

/**
 * Agrega un timeout a una promesa existente.
 */
function withTimeout(promise, timeoutMs = 5000) {
    // Validar que promise sea una instancia de Promise
    if (!(promise instanceof Promise)) {
        return Promise.reject(new Error('Promise must be a Promise instance'));
    }

    // Validar que timeoutMs sea un número
    if (typeof timeoutMs !== 'number') {
        return Promise.reject(new Error('Timeout must be a number'));
    }

    // Validar que timeoutMs sea mayor que 0
    if (timeoutMs <= 0) {
        return Promise.reject(new Error('Timeout must be greater than 0'));
    }

    // Crear promesa de timeout
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, timeoutMs);
    });

    // Competir entre la promesa original y el timeout
    return Promise.race([promise, timeoutPromise]);
}

/**
 * Combina retry y timeout para obtener datos de una URL.
 */
function fetchWithRetry(url, maxRetries = 3) {
    // Validar que url no sea null, undefined o string vacío
    if (!url || (typeof url === 'string' && url.trim() === '')) {
        return Promise.reject(new Error('URL is required'));
    }

    // Validar que maxRetries sea un número
    if (typeof maxRetries !== 'number') {
        return Promise.reject(new Error('Max retries must be a number'));
    }

    // Validar que maxRetries sea mayor o igual a 0
    if (maxRetries < 0) {
        return Promise.reject(new Error('Max retries must be greater than or equal to 0'));
    }

    // Crear función de operación que simula fetch con timeout
    const fetchOperation = () => {
        const apiCall = simulateApiCall(0.6); // 60% de éxito
        return withTimeout(apiCall, 1000).then(() => {
            return 'Data from ' + url;
        });
    };

    // Reintentar la operación
    return retryOperation(fetchOperation, maxRetries);
}

/**
 * Procesa múltiples URLs en paralelo, cada una con su propio retry.
 */
function processMultipleRequests(urls) {
    // Validar que urls sea un array
    if (!Array.isArray(urls)) {
        return Promise.reject(new Error('URLs must be an array'));
    }

    // Validar que el array no esté vacío
    if (urls.length === 0) {
        return Promise.reject(new Error('URLs array cannot be empty'));
    }

    // Crear array de promesas
    const promises = urls.map(url => fetchWithRetry(url));

    // Usar Promise.allSettled() para esperar todas (exitosas o fallidas)
    return Promise.allSettled(promises).then(results => {
        // Filtrar solo los resultados exitosos
        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
    });
}

module.exports = {
    simulateApiCall,
    retryOperation,
    withTimeout,
    fetchWithRetry,
    processMultipleRequests
};

