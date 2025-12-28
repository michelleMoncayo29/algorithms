# Simulador de Carga de Datos con Progress

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Asincronía, Callbacks  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa funciones que simulan carga de datos con callbacks de progreso usando promesas. Este ejercicio te enseñará a trabajar con promesas, callbacks de progreso, y simulación de operaciones asíncronas con actualizaciones de estado.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a crear promesas con callbacks de progreso
- [ ] Entender cómo simular operaciones asíncronas con setTimeout
- [ ] Practicar cálculo de progreso porcentual
- [ ] Aplicar validación de parámetros en funciones asíncronas

## 📝 Enunciado

Implementa dos funciones que simulan carga de datos con progreso:

### 1. `loadDataWithProgress`

Simula la carga de un número de items con callbacks de progreso.

**Parámetros:**
- `totalItems`: Número total de items a cargar (número positivo)
- `onProgress`: Callback que se llama con el progreso (0-100) cada vez que se carga un item

**Comportamiento:**
- Carga items uno por uno con un delay simulado
- Para cada item, calcula el progreso: `(loaded / total) * 100`
- Llama `onProgress` con el progreso calculado
- Resuelve con `{loaded: number, total: number, items: Array}`

### 2. `loadDataWithStages`

Simula la carga de datos con múltiples etapas y progreso por etapa.

**Parámetros:**
- `stages`: Array con número de items por etapa `[stage1Items, stage2Items, ...]`
- `onProgress`: Callback que se llama con `{stage, stageProgress, overallProgress}`

**Comportamiento:**
- Carga cada etapa secuencialmente
- Calcula progreso de la etapa: `(stageLoaded / stageTotal) * 100`
- Calcula progreso general: `(totalLoaded / totalItems) * 100`
- Llama `onProgress` con información de progreso

## 💡 Ejemplos

### Ejemplo 1
```javascript
const { loadDataWithProgress } = require('./exercise');

const progressLog = [];
loadDataWithProgress(5, (progress) => {
    progressLog.push(progress);
}).then(result => {
    console.log(result);
    // {loaded: 5, total: 5, items: [1, 2, 3, 4, 5]}
});

// progressLog será: [20, 40, 60, 80, 100]
```

### Ejemplo 2
```javascript
const { loadDataWithStages } = require('./exercise');

loadDataWithStages([3, 2, 5], (progress) => {
    console.log(progress);
    // {stage: 1, stageProgress: 33, overallProgress: 3}
    // {stage: 1, stageProgress: 67, overallProgress: 7}
    // ...
});
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `loadDataWithProgress(5, callback)` | Progreso: 20, 40, 60, 80, 100 | Progreso incremental |
| `loadDataWithStages([3, 2], callback)` | Progreso por etapa y general | Múltiples etapas |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para simular carga progresiva, usa un loop con setTimeout:
```javascript
for (let i = 0; i < totalItems; i++) {
    setTimeout(() => {
        const progress = ((i + 1) / totalItems) * 100;
        onProgress(progress);
        // ...
    }, i * delay);
}
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para esperar a que todos los items se carguen antes de resolver:
```javascript
let loaded = 0;
const loadItem = (index) => {
    return new Promise(resolve => {
        setTimeout(() => {
            loaded++;
            onProgress((loaded / totalItems) * 100);
            resolve();
        }, delay);
    });
};
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para cargar etapas secuencialmente, usa async/await o encadenar promesas:
```javascript
for (let stage = 0; stage < stages.length; stage++) {
    await loadStage(stage, stages[stage]);
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las funciones `loadDataWithProgress` y `loadDataWithStages`
3. Ejecuta los tests: `npm test 56-data-loader-progress`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: setTimeout()](https://developer.mozilla.org/es/docs/Web/API/setTimeout)
- [Async/Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)

---

**💡 Tip:** Asegúrate de llamar `onProgress` con el progreso correcto en cada paso. El progreso debe ir de 0 a 100.

