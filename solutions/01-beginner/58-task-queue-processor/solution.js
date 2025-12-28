/**
 * SOLUCIÓN: Procesador de Tareas en Cola con Promesas
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

async function processTasksSequentially(tasks) {
    // Validar que tasks sea un array
    if (!Array.isArray(tasks)) {
        throw new Error('Tasks must be an array');
    }

    // Validar que cada elemento sea una función
    for (let i = 0; i < tasks.length; i++) {
        if (typeof tasks[i] !== 'function') {
            throw new Error(`Task at index ${i} must be a function`);
        }
    }

    // Procesar tareas una por una (secuencialmente)
    const results = [];
    for (const task of tasks) {
        const result = await task();
        results.push(result);
    }

    return results;
}

async function processTasksInParallel(tasks) {
    // Validar que tasks sea un array
    if (!Array.isArray(tasks)) {
        throw new Error('Tasks must be an array');
    }

    // Validar que cada elemento sea una función
    for (let i = 0; i < tasks.length; i++) {
        if (typeof tasks[i] !== 'function') {
            throw new Error(`Task at index ${i} must be a function`);
        }
    }

    // Ejecutar todas las tareas en paralelo usando Promise.all()
    return Promise.all(tasks.map(task => task()));
}

async function processTasksWithConcurrency(tasks, concurrencyLimit) {
    // Validar que tasks sea un array
    if (!Array.isArray(tasks)) {
        throw new Error('Tasks must be an array');
    }

    // Validar que cada elemento sea una función
    for (let i = 0; i < tasks.length; i++) {
        if (typeof tasks[i] !== 'function') {
            throw new Error(`Task at index ${i} must be a function`);
        }
    }

    // Validar que concurrencyLimit sea un número positivo
    if (typeof concurrencyLimit !== 'number' || !Number.isInteger(concurrencyLimit) || concurrencyLimit <= 0) {
        throw new Error('Concurrency limit must be a positive integer');
    }

    const results = [];
    const executing = [];

    // Función para procesar una tarea
    const executeTask = async (task, index) => {
        const result = await task();
        results[index] = result;
    };

    // Procesar tareas con límite de concurrencia
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const promise = executeTask(task, i).then(() => {
            // Remover de executing cuando termine
            const index = executing.indexOf(promise);
            if (index > -1) {
                executing.splice(index, 1);
            }
        });

        executing.push(promise);

        // Si alcanzamos el límite de concurrencia, esperar a que una termine
        if (executing.length >= concurrencyLimit) {
            await Promise.race(executing);
        }
    }

    // Esperar a que todas las tareas restantes terminen
    await Promise.all(executing);

    return results;
}

module.exports = {
    processTasksSequentially,
    processTasksInParallel,
    processTasksWithConcurrency
};

