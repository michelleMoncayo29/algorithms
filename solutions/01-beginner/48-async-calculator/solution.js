/**
 * Solución: Calculadora Asíncrona con Operaciones Simuladas
 * 
 * Esta implementación muestra cómo trabajar con operaciones matemáticas asíncronas,
 * comparando ejecución secuencial vs paralela.
 */

/**
 * Simula una suma asíncrona con un delay de 200ms.
 */
async function asyncAdd(a, b) {
    // Validar que a sea un número
    if (typeof a !== 'number') {
        return Promise.reject(new Error('First number must be a number'));
    }

    // Validar que b sea un número
    if (typeof b !== 'number') {
        return Promise.reject(new Error('Second number must be a number'));
    }

    // Retornar promesa que se resuelve después de 200ms
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 200);
    });
}

/**
 * Simula una multiplicación asíncrona con un delay de 300ms.
 */
async function asyncMultiply(a, b) {
    // Validar que a sea un número
    if (typeof a !== 'number') {
        return Promise.reject(new Error('First number must be a number'));
    }

    // Validar que b sea un número
    if (typeof b !== 'number') {
        return Promise.reject(new Error('Second number must be a number'));
    }

    // Retornar promesa que se resuelve después de 300ms
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a * b);
        }, 300);
    });
}

/**
 * Calcula una secuencia de operaciones matemáticas de forma secuencial.
 */
async function asyncCalculate(operations) {
    // Validar que operations sea un array
    if (!Array.isArray(operations)) {
        return Promise.reject(new Error('Operations must be an array'));
    }

    // Validar que el array no esté vacío
    if (operations.length === 0) {
        return Promise.reject(new Error('Operations array cannot be empty'));
    }

    // Validar cada operación
    for (const op of operations) {
        if (!op.hasOwnProperty('type') || !op.hasOwnProperty('a') || !op.hasOwnProperty('b')) {
            return Promise.reject(new Error('Operation must have type, a, and b'));
        }

        if (op.type !== 'add' && op.type !== 'multiply') {
            return Promise.reject(new Error("Operation type must be 'add' or 'multiply'"));
        }
    }

    // Inicializar resultado con el primer 'a'
    let result = operations[0].a;

    // Ejecutar operaciones secuencialmente
    for (const op of operations) {
        if (op.type === 'add') {
            result = await asyncAdd(result, op.b);
        } else if (op.type === 'multiply') {
            result = await asyncMultiply(result, op.b);
        }
    }

    return result;
}

/**
 * Calcula múltiples operaciones independientes en paralelo y suma los resultados.
 */
async function asyncCalculateParallel(operations) {
    // Validar que operations sea un array
    if (!Array.isArray(operations)) {
        return Promise.reject(new Error('Operations must be an array'));
    }

    // Validar que el array no esté vacío
    if (operations.length === 0) {
        return Promise.reject(new Error('Operations array cannot be empty'));
    }

    // Validar cada operación
    for (const op of operations) {
        if (!op.hasOwnProperty('type') || !op.hasOwnProperty('a') || !op.hasOwnProperty('b')) {
            return Promise.reject(new Error('Operation must have type, a, and b'));
        }

        if (op.type !== 'add' && op.type !== 'multiply') {
            return Promise.reject(new Error("Operation type must be 'add' or 'multiply'"));
        }
    }

    // Crear array de promesas ejecutando todas en paralelo
    const promises = operations.map(op => {
        if (op.type === 'add') {
            return asyncAdd(op.a, op.b);
        } else {
            return asyncMultiply(op.a, op.b);
        }
    });

    // Esperar todas las promesas
    const results = await Promise.all(promises);

    // Sumar todos los resultados
    return results.reduce((sum, result) => sum + result, 0);
}

/**
 * Mide el tiempo de ejecución de una función asíncrona.
 */
async function measureExecutionTime(asyncFn) {
    // Validar que asyncFn sea una función
    if (typeof asyncFn !== 'function') {
        return Promise.reject(new Error('Function must be a function'));
    }

    // Registrar tiempo inicial
    const startTime = Date.now();

    // Ejecutar la función y esperar a que termine
    await asyncFn();

    // Registrar tiempo final
    const endTime = Date.now();

    // Retornar diferencia en milisegundos
    return endTime - startTime;
}

module.exports = {
    asyncAdd,
    asyncMultiply,
    asyncCalculate,
    asyncCalculateParallel,
    measureExecutionTime
};

