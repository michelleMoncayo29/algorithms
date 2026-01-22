/**
 * Calculadora Asíncrona con Operaciones Simuladas (Async Calculator with Simulated Operations)
 *
 * Descripción: Este ejercicio enseña a trabajar con operaciones matemáticas asíncronas,
 * comparando ejecución secuencial vs paralela y midiendo tiempos de ejecución.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Crear funciones asíncronas que simulan operaciones con delays
 * - Encadenar operaciones secuencialmente con async/await
 * - Ejecutar operaciones en paralelo con Promise.all()
 * - Medir tiempo de ejecución de funciones asíncronas
 */

/**
 * Simula una suma asíncrona con un delay de 200ms.
 * Traducción: Suma Asíncrona
 *
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Promise<number>} Promesa que se resuelve con a + b después de 200ms
 *
 * TODO:
 * - Valida que a sea un número
 * - Lanza error "First number must be a number" si no es número
 * - Valida que b sea un número
 * - Lanza error "Second number must be a number" si no es número
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout con 200ms de delay
 * - Después del delay, resuelve con a + b
 */
async function asyncAdd(a, b) {
    if (typeof a !== 'number') {
        return Promise.reject(new Error('First number must be a number'));
    }

    if (typeof b !== 'number') {
        return Promise.reject(new Error('Second number must be a number'));
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 200);
    })
};

asyncAdd(6, 10)
    .then(result => { console.log('✅ suma:', result) })
    .catch(err => { console.log('✖️ suma erronea', err) });

/**
 * Simula una multiplicación asíncrona con un delay de 300ms.
 * Traducción: Multiplicación Asíncrona
 *
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Promise<number>} Promesa que se resuelve con a * b después de 300ms
 *
 * TODO:
 * - Valida que a sea un número
 * - Lanza error "First number must be a number" si no es número
 * - Valida que b sea un número
 * - Lanza error "Second number must be a number" si no es número
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout con 300ms de delay
 * - Después del delay, resuelve con a * b
 */
async function asyncMultiply(a, b) {
    if (typeof a !== 'number') {
        return Promise.reject(new Error('First number must be a number'));
    }

    if (typeof b !== 'number') {
        return Promise.reject(new Error('Second number must be a number'));
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a * b);
        }, 300);
    })
}

asyncMultiply(4, 7)
    .then(result => { console.log('✅ mult:', result) })
    .catch(err => { console.log('✖️ error mult:' , err)})

/**
 * Calcula una secuencia de operaciones matemáticas de forma secuencial.
 * Traducción: Calcular Asíncrono
 *
 * @param {Array} operations - Array de objetos {type: 'add'|'multiply', a: number, b: number}
 * @returns {Promise<number>} Promesa que se resuelve con el resultado final
 *
 * TODO:
 * - Valida que operations sea un array
 * - Lanza error "Operations must be an array" si no es array
 * - Valida que el array no esté vacío
 * - Lanza error "Operations array cannot be empty" si está vacío
 * - Valida cada operación:
 *   - Debe tener type, a y b
 *   - type debe ser 'add' o 'multiply'
 * - Inicializa resultado con operations[0].a
 * - Itera sobre operations usando for...of
 * - Para cada operación:
 *   - Si type === 'add': resultado = await asyncAdd(resultado, op.b)
 *   - Si type === 'multiply': resultado = await asyncMultiply(resultado, op.b)
 * - Retorna el resultado final
 */
async function asyncCalculate(operations) {
    if (!Array.isArray(operations)) {
        return Promise.reject(new Error('Operations must be an array'));
    }

    if (operations.length === 0) {
        return Promise.reject(new Error('Operations array cannot be empty'));
    }

    const arrResult = [];

    let result = operations[0].a;

    for (const element of operations) {
        if (element.type === 'add') {
            result =  await asyncAdd(result, element.b);
        } else if(element.type === 'multiply') {
            result =  await asyncMultiply(result, element.b);
        }

        arrResult.push(result);
    }
    return result;
}
asyncCalculate([
    {type: 'add', a: 5, b: 3},      // 5 + 3 = 8 (200ms)
    {type: 'multiply', a: 8, b: 2}, // 8 * 2 = 16 (300ms)
    {type: 'add', a: 16, b: 4}      // 16 + 4 = 20 (200ms)
]).then(result => {
    console.log(result); // Después de ~700ms (200+300+200): 20
});

/**
 * Calcula múltiples operaciones independientes en paralelo y suma los resultados.
 * Traducción: Calcular Asíncrono en Paralelo
 *
 * @param {Array} operations - Array de objetos {type: 'add'|'multiply', a: number, b: number}
 * @returns {Promise<number>} Promesa que se resuelve con la suma de todos los resultados
 *
 * TODO:
 * - Mismas validaciones que asyncCalculate()
 * - Crea un array de promesas usando .map() sobre operations
 *   - Para cada op, si type === 'add' → asyncAdd(op.a, op.b)
 *   - Si type === 'multiply' → asyncMultiply(op.a, op.b)
 * - Usa Promise.all() con el array de promesas
 * - Suma todos los resultados usando reduce()
 * - Retorna la suma total
 */
async function asyncCalculateParallel(operations) {
    if (!Array.isArray(operations)) {
        return Promise.reject(new Error('Operations must be an array'));
    }

    if (operations.length === 0) {
        return Promise.reject(new Error('Operations array cannot be empty'));
    }

    const arrPromise = operations.map(item => {
        if (item.type === 'add') {
            return asyncAdd(item.a, item.b);
        } else if (item.type === 'multiply') {
            return asyncMultiply(item.a, item.b);
        }
    })
}

asyncCalculateParallel([
    {type: 'add', a: 5, b: 3},      // 8 (200ms)
    {type: 'multiply', a: 4, b: 2}, // 8 (300ms)
    {type: 'add', a: 1, b: 1}       // 2 (200ms)
]).then(result => {
    console.log(result); // Después de ~300ms (no 700ms): 18 (8+8+2)
});
/**
 * Mide el tiempo de ejecución de una función asíncrona.
 * Traducción: Medir Tiempo de Ejecución
 *
 * @param {Function} asyncFn - Función asíncrona a medir
 * @returns {Promise<number>} Promesa que se resuelve con el tiempo en milisegundos
 *
 * TODO:
 * - Valida que asyncFn sea una función
 * - Lanza error "Function must be a function" si no es función
 * - Registra tiempo inicial con Date.now()
 * - Ejecuta asyncFn() con await
 * - Registra tiempo final con Date.now()
 * - Retorna diferencia (tiempoFinal - tiempoInicial)
 */
async function measureExecutionTime(asyncFn) {
    throw new Error('Function measureExecutionTime not implemented');
}

module.exports = {
    asyncAdd,
    asyncMultiply,
    asyncCalculate,
    asyncCalculateParallel,
    measureExecutionTime
};

