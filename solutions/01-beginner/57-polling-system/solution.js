/**
 * SOLUCIÓN: Sistema de Polling/Verificación Periódica
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

function pollUntil(checkFunction, intervalMs, maxAttempts) {
    // Validar que checkFunction sea una función
    if (typeof checkFunction !== 'function') {
        throw new Error('checkFunction must be a function');
    }

    // Validar que intervalMs sea un número positivo
    if (typeof intervalMs !== 'number' || intervalMs <= 0) {
        throw new Error('intervalMs must be a positive number');
    }

    // Validar que maxAttempts sea un número positivo (si está definido)
    if (maxAttempts !== undefined && (typeof maxAttempts !== 'number' || !Number.isInteger(maxAttempts) || maxAttempts <= 0)) {
        throw new Error('maxAttempts must be a positive integer');
    }

    return new Promise((resolve, reject) => {
        let attempts = 0;

        const check = () => {
            attempts++;

            // Verificar la condición
            try {
                if (checkFunction()) {
                    resolve({
                        success: true,
                        attempts: attempts
                    });
                    return;
                }
            } catch (error) {
                reject({
                    success: false,
                    attempts: attempts,
                    error: error
                });
                return;
            }

            // Si se alcanzó maxAttempts, rechazar
            if (maxAttempts !== undefined && attempts >= maxAttempts) {
                reject({
                    success: false,
                    attempts: attempts
                });
                return;
            }

            // Continuar polling
            setTimeout(check, intervalMs);
        };

        // Iniciar polling
        check();
    });
}

function pollUntilTimeout(checkFunction, intervalMs, timeoutMs) {
    // Validar que checkFunction sea una función
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

    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let attempts = 0;
        let timeoutId = null;
        let intervalId = null;

        const check = () => {
            attempts++;
            const elapsed = Date.now() - startTime;

            // Verificar timeout
            if (elapsed >= timeoutMs) {
                clearInterval(intervalId);
                reject({
                    success: false,
                    attempts: attempts,
                    elapsed: elapsed
                });
                return;
            }

            // Verificar la condición
            try {
                if (checkFunction()) {
                    clearInterval(intervalId);
                    resolve({
                        success: true,
                        attempts: attempts,
                        elapsed: elapsed
                    });
                    return;
                }
            } catch (error) {
                clearInterval(intervalId);
                reject({
                    success: false,
                    attempts: attempts,
                    elapsed: elapsed,
                    error: error
                });
                return;
            }
        };

        // Iniciar polling
        intervalId = setInterval(check, intervalMs);

        // Configurar timeout máximo
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            reject({
                success: false,
                attempts: attempts,
                elapsed: timeoutMs
            });
        }, timeoutMs);
    });
}

module.exports = {
    pollUntil,
    pollUntilTimeout
};

