/**
 * Solución: Funciones Asíncronas con Delays Simples
 * 
 * Esta implementación muestra cómo crear y usar promesas básicas,
 * encadenar operaciones asíncronas y ejecutar promesas en paralelo.
 */

/**
 * Crea una promesa que se resuelve después de un número específico de milisegundos.
 */
function delay(ms) {
    // Validar que ms sea un número
    if (typeof ms !== 'number') {
        return Promise.reject(new Error('Delay must be a number'));
    }

    // Validar que ms sea mayor o igual a 0
    if (ms < 0) {
        return Promise.reject(new Error('Delay must be greater than or equal to 0'));
    }

    // Retornar una nueva promesa
    return new Promise((resolve) => {
        // Usar setTimeout para esperar ms milisegundos
        setTimeout(() => {
            // Resolver la promesa con el mensaje
            resolve('Delay completed');
        }, ms);
    });
}

/**
 * Simula obtener datos de un usuario desde una "API" con un delay de 500ms.
 */
function fetchUserData(userId) {
    // Validar que userId no sea null, undefined o string vacío
    if (userId === null || userId === undefined || userId === '') {
        return Promise.reject(new Error('User ID is required'));
    }

    // Retornar una nueva promesa
    return new Promise((resolve) => {
        // Simular delay de 500ms
        setTimeout(() => {
            // Resolver con los datos del usuario
            resolve({
                id: userId,
                name: 'User ' + userId,
                email: 'user' + userId + '@example.com'
            });
        }, 500);
    });
}

/**
 * Simula procesar datos con un delay de 300ms.
 */
function processData(data) {
    // Validar que data no sea null o undefined
    if (data === null || data === undefined) {
        return Promise.reject(new Error('Data is required'));
    }

    // Retornar una nueva promesa
    return new Promise((resolve) => {
        // Simular delay de 300ms
        setTimeout(() => {
            // Procesar los datos agregando prefijo
            resolve('Processed: ' + String(data));
        }, 300);
    });
}

/**
 * Encadena operaciones asíncronas usando .then()
 */
function handleAsyncOperation(userId) {
    // Paso 1: Obtener datos del usuario
    return fetchUserData(userId)
        .then(userData => {
            // Paso 2: Procesar los datos del usuario
            return processData(userData.name);
        })
        .catch(error => {
            // Manejar errores y re-lanzarlos
            throw error;
        });
}

/**
 * Hace lo mismo que handleAsyncOperation() pero usando async/await.
 */
async function handleAsyncOperationWithAwait(userId) {
    try {
        // Paso 1: Esperar a que se obtengan los datos del usuario
        const userData = await fetchUserData(userId);

        // Paso 2: Esperar a que se procesen los datos
        const processedData = await processData(userData.name);

        // Paso 3: Retornar el resultado
        return processedData;
    } catch (error) {
        // Manejar errores y re-lanzarlos
        throw error;
    }
}

/**
 * Obtiene datos de múltiples usuarios en paralelo usando Promise.all().
 */
function fetchMultipleUsers(userIds) {
    // Validar que userIds sea un array
    if (!Array.isArray(userIds)) {
        return Promise.reject(new Error('User IDs must be an array'));
    }

    // Validar que el array no esté vacío
    if (userIds.length === 0) {
        return Promise.reject(new Error('User IDs array cannot be empty'));
    }

    // Crear un array de promesas usando .map()
    const promises = userIds.map(userId => fetchUserData(userId));

    // Ejecutar todas las promesas en paralelo
    return Promise.all(promises);
}

module.exports = {
    delay,
    fetchUserData,
    processData,
    handleAsyncOperation,
    handleAsyncOperationWithAwait,
    fetchMultipleUsers
};

