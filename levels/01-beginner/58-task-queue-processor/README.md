# Procesador de Tareas en Cola con Promesas

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Concurrencia, Colas de Tareas  
**Tiempo estimado:** 60-75 minutos

## 📋 Descripción

Implementa funciones para procesar tareas asíncronas en cola con diferentes estrategias: secuencial, paralelo y con límite de concurrencia. Este ejercicio te enseñará a trabajar con promesas, control de concurrencia y procesamiento de colas de tareas.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a procesar tareas secuencialmente con promesas
- [ ] Entender procesamiento paralelo con Promise.all()
- [ ] Practicar control de concurrencia (límite de tareas simultáneas)
- [ ] Aplicar validación de inputs en funciones asíncronas

## 📝 Enunciado

Implementa tres funciones para procesar tareas asíncronas:

### 1. `processTasksSequentially`

Procesa tareas una por una (secuencialmente).

**Parámetros:**
- `tasks`: Array de funciones que retornan Promises

**Comportamiento:**
- Ejecuta cada tarea y espera a que termine antes de empezar la siguiente
- Retorna array de resultados en el mismo orden que las tareas

### 2. `processTasksInParallel`

Procesa todas las tareas en paralelo (simultáneamente).

**Parámetros:**
- `tasks`: Array de funciones que retornan Promises

**Comportamiento:**
- Ejecuta todas las tareas al mismo tiempo usando `Promise.all()`
- Retorna array de resultados en el mismo orden que las tareas

### 3. `processTasksWithConcurrency`

Procesa tareas con límite de concurrencia (máximo N tareas a la vez).

**Parámetros:**
- `tasks`: Array de funciones que retornan Promises
- `concurrencyLimit`: Número máximo de tareas simultáneas (número positivo)

**Comportamiento:**
- Ejecuta máximo `concurrencyLimit` tareas a la vez
- Cuando una tarea termina, inicia la siguiente
- Retorna array de resultados en el mismo orden que las tareas

## 💡 Ejemplos

### Ejemplo 1
```javascript
const { processTasksSequentially } = require('./exercise');

const tasks = [
    () => Promise.resolve(1),
    () => Promise.resolve(2),
    () => Promise.resolve(3)
];

processTasksSequentially(tasks).then(results => {
    console.log(results); // [1, 2, 3]
});
```

### Ejemplo 2
```javascript
const { processTasksInParallel } = require('./exercise');

const tasks = [
    () => delay(100).then(() => 1),
    () => delay(100).then(() => 2),
    () => delay(100).then(() => 3)
];

// Todas se ejecutan al mismo tiempo, terminan en ~100ms
processTasksInParallel(tasks).then(results => {
    console.log(results); // [1, 2, 3]
});
```

### Ejemplo 3
```javascript
const { processTasksWithConcurrency } = require('./exercise');

const tasks = [
    () => delay(100).then(() => 1),
    () => delay(100).then(() => 2),
    () => delay(100).then(() => 3),
    () => delay(100).then(() => 4)
];

// Ejecuta máximo 2 a la vez
// Primero: tareas 1 y 2 (terminan en ~100ms)
// Luego: tareas 3 y 4 (terminan en ~100ms)
// Total: ~200ms
processTasksWithConcurrency(tasks, 2).then(results => {
    console.log(results); // [1, 2, 3, 4]
});
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `processTasksSequentially([task1, task2])` | `[result1, result2]` | Secuencial, orden preservado |
| `processTasksInParallel([task1, task2])` | `[result1, result2]` | Paralelo, orden preservado |
| `processTasksWithConcurrency([...], 2)` | `[result1, ...]` | Máximo 2 a la vez |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para procesar secuencialmente, usa async/await en un loop:
```javascript
const results = [];
for (const task of tasks) {
    const result = await task();
    results.push(result);
}
return results;
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para procesar en paralelo:
```javascript
return Promise.all(tasks.map(task => task()));
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para control de concurrencia, procesa en "chunks":
```javascript
const results = [];
for (let i = 0; i < tasks.length; i += concurrencyLimit) {
    const chunk = tasks.slice(i, i + concurrencyLimit);
    const chunkResults = await Promise.all(chunk.map(task => task()));
    results.push(...chunkResults);
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las funciones `processTasksSequentially`, `processTasksInParallel` y `processTasksWithConcurrency`
3. Ejecuta los tests: `npm test 58-task-queue-processor`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN: Promise.allSettled()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Async/Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)

---

**💡 Tip:** Para control de concurrencia, puedes usar un array de "workers" que procesen tareas. Cuando un worker termina, toma la siguiente tarea de la cola.

