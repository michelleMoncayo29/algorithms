# Calculadora Asíncrona con Operaciones Simuladas

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Asincronía, Async/Await, Operaciones Secuenciales y Paralelas  
**Tiempo estimado:** 35-40 minutos

## 📦 Contexto

En aplicaciones reales, muchas operaciones matemáticas o de cálculo pueden ser asíncronas: consultas a bases de datos, cálculos distribuidos, procesamiento en servidores remotos, etc. Este ejercicio te enseña a trabajar con operaciones matemáticas asíncronas, comparando ejecución secuencial vs paralela y midiendo tiempos de ejecución.

Aprenderás a encadenar operaciones asíncronas y a entender cuándo ejecutar operaciones en paralelo para mejorar el rendimiento.

## 🎯 Objetivos de Aprendizaje

- [ ] Crear funciones asíncronas que simulan operaciones matemáticas con delays
- [ ] Encadenar múltiples operaciones asíncronas secuencialmente
- [ ] Ejecutar múltiples operaciones asíncronas en paralelo
- [ ] Comparar tiempos de ejecución secuencial vs paralelo
- [ ] Medir tiempo de ejecución de funciones asíncronas
- [ ] Entender cuándo usar secuencial vs paralelo

## 📚 Conceptos Fundamentales

### Ejecución Secuencial vs Paralela

**Secuencial:** Las operaciones se ejecutan una después de otra. El tiempo total es la suma de todos los tiempos.

```javascript
// SECUENCIAL: ~1500ms total
const resultado1 = await operacion1(); // 500ms
const resultado2 = await operacion2(); // 500ms
const resultado3 = await operacion3(); // 500ms
```

**Paralelo:** Las operaciones se ejecutan al mismo tiempo. El tiempo total es el tiempo de la operación más lenta.

```javascript
// PARALELO: ~500ms total
const [resultado1, resultado2, resultado3] = await Promise.all([
    operacion1(), // 500ms
    operacion2(), // 500ms
    operacion3()  // 500ms
]);
```

## 📝 Enunciado Detallado

Implementa las siguientes funciones en `exercise.js`. Cada función simula operaciones matemáticas que toman tiempo.

### 1. `asyncAdd(a, b)`

Simula una suma asíncrona con un delay de 200ms.

**Parámetros:**
- `a` (number): Primer número
- `b` (number): Segundo número

**Retorna:**
- `Promise<number>`: Promesa que se resuelve con `a + b` después de 200ms

**Validaciones:**
- Si `a` no es un número → Error: "First number must be a number"
- Si `b` no es un número → Error: "Second number must be a number"

**Ejemplo:**
```javascript
asyncAdd(5, 3).then(result => {
    console.log(result); // Después de 200ms: 8
});
```

**Guía de implementación:**
```javascript
async function asyncAdd(a, b) {
    // Validar parámetros
    // Retornar promesa que se resuelve con a + b después de 200ms
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 200);
    });
}
```

### 2. `asyncMultiply(a, b)`

Simula una multiplicación asíncrona con un delay de 300ms.

**Parámetros:**
- `a` (number): Primer número
- `b` (number): Segundo número

**Retorna:**
- `Promise<number>`: Promesa que se resuelve con `a * b` después de 300ms

**Validaciones:**
- Si `a` no es un número → Error: "First number must be a number"
- Si `b` no es un número → Error: "Second number must be a number"

**Ejemplo:**
```javascript
asyncMultiply(4, 7).then(result => {
    console.log(result); // Después de 300ms: 28
});
```

### 3. `asyncCalculate(operations)`

Calcula una secuencia de operaciones matemáticas de forma secuencial usando `async/await`.

**Parámetros:**
- `operations` (array): Array de objetos `{type: 'add'|'multiply', a: number, b: number}`

**Retorna:**
- `Promise<number>`: Promesa que se resuelve con el resultado final después de ejecutar todas las operaciones secuencialmente

**Comportamiento:**
- Ejecuta cada operación en orden, esperando a que termine antes de continuar
- Si `type === 'add'` → usa `asyncAdd(a, b)`
- Si `type === 'multiply'` → usa `asyncMultiply(a, b)`
- El resultado de una operación se usa como primer operando de la siguiente
- La primera operación usa `a` y `b` del primer objeto
- Las siguientes usan el resultado anterior como `a` y el `b` del objeto actual

**Validaciones:**
- Si `operations` no es un array → Error: "Operations must be an array"
- Si el array está vacío → Error: "Operations array cannot be empty"
- Si algún objeto no tiene `type`, `a` o `b` → Error: "Operation must have type, a, and b"
- Si `type` no es 'add' ni 'multiply' → Error: "Operation type must be 'add' or 'multiply'"

**Ejemplo:**
```javascript
asyncCalculate([
    {type: 'add', a: 5, b: 3},      // 5 + 3 = 8 (200ms)
    {type: 'multiply', a: 8, b: 2}, // 8 * 2 = 16 (300ms)
    {type: 'add', a: 16, b: 4}      // 16 + 4 = 20 (200ms)
]).then(result => {
    console.log(result); // Después de ~700ms (200+300+200): 20
});
```

**Guía de implementación:**
```javascript
async function asyncCalculate(operations) {
    // Validar que operations sea un array no vacío
    // Validar cada operación
    
    let result = operations[0].a; // Empezar con el primer 'a'
    
    for (const op of operations) {
        if (op.type === 'add') {
            result = await asyncAdd(result, op.b);
        } else if (op.type === 'multiply') {
            result = await asyncMultiply(result, op.b);
        }
    }
    
    return result;
}
```

### 4. `asyncCalculateParallel(operations)`

Calcula múltiples operaciones independientes en paralelo y suma los resultados.

**Parámetros:**
- `operations` (array): Array de objetos `{type: 'add'|'multiply', a: number, b: number}`

**Retorna:**
- `Promise<number>`: Promesa que se resuelve con la suma de todos los resultados después de ejecutar todas en paralelo

**Comportamiento:**
- Ejecuta TODAS las operaciones en paralelo usando `Promise.all()`
- Cada operación es independiente (usa su propio `a` y `b`)
- Suma todos los resultados y retorna el total
- El tiempo total es aproximadamente el tiempo de la operación más lenta (~300ms)

**Validaciones:**
- Mismas validaciones que `asyncCalculate()`

**Ejemplo:**
```javascript
asyncCalculateParallel([
    {type: 'add', a: 5, b: 3},      // 8 (200ms)
    {type: 'multiply', a: 4, b: 2}, // 8 (300ms)
    {type: 'add', a: 1, b: 1}       // 2 (200ms)
]).then(result => {
    console.log(result); // Después de ~300ms (no 700ms): 18 (8+8+2)
});
```

**Guía de implementación:**
```javascript
async function asyncCalculateParallel(operations) {
    // Validar operations (igual que asyncCalculate)
    
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
```

### 5. `measureExecutionTime(asyncFn)`

Mide el tiempo de ejecución de una función asíncrona.

**Parámetros:**
- `asyncFn` (function): Función asíncrona a medir (se ejecutará sin parámetros)

**Retorna:**
- `Promise<number>`: Promesa que se resuelve con el tiempo de ejecución en milisegundos

**Comportamiento:**
- Registra el tiempo antes de ejecutar la función
- Ejecuta la función y espera a que termine
- Registra el tiempo después de que termine
- Retorna la diferencia en milisegundos

**Validaciones:**
- Si `asyncFn` no es una función → Error: "Function must be a function"

**Ejemplo:**
```javascript
const slowOperation = async () => {
    await asyncAdd(1, 2);
    await asyncMultiply(3, 4);
};

measureExecutionTime(slowOperation).then(time => {
    console.log(`Tardó ${time}ms`); // Aproximadamente 500ms (200+300)
});
```

**Guía de implementación:**
```javascript
async function measureExecutionTime(asyncFn) {
    // Validar que asyncFn sea función
    
    const startTime = Date.now();
    await asyncFn();
    const endTime = Date.now();
    
    return endTime - startTime;
}
```

## 💡 Ejemplos Paso a Paso

### Ejemplo 1: Operación Asíncrona Simple

```javascript
asyncAdd(10, 20).then(result => {
    console.log(result); // 30 después de 200ms
});
```

### Ejemplo 2: Encadenamiento Secuencial

```javascript
async function ejemploSecuencial() {
    const suma1 = await asyncAdd(5, 3);        // 8 después de 200ms
    const multiplicacion = await asyncMultiply(suma1, 2); // 16 después de 300ms
    const suma2 = await asyncAdd(multiplicacion, 4); // 20 después de 200ms
    return suma2; // Total: ~700ms
}
```

### Ejemplo 3: Ejecución Paralela

```javascript
async function ejemploParalelo() {
    const [resultado1, resultado2, resultado3] = await Promise.all([
        asyncAdd(5, 3),        // 8 (200ms)
        asyncMultiply(4, 2),   // 8 (300ms)
        asyncAdd(1, 1)         // 2 (200ms)
    ]);
    return resultado1 + resultado2 + resultado3; // 18 después de ~300ms (no 700ms)
}
```

### Ejemplo 4: Comparando Secuencial vs Paralelo

```javascript
const operaciones = [
    {type: 'add', a: 1, b: 1},
    {type: 'add', a: 2, b: 2},
    {type: 'add', a: 3, b: 3}
];

// SECUENCIAL: ~600ms (200+200+200)
const tiempoSecuencial = await measureExecutionTime(() => 
    asyncCalculate(operaciones)
);

// PARALELO: ~200ms (todas al mismo tiempo)
const tiempoParalelo = await measureExecutionTime(() => 
    asyncCalculateParallel(operaciones)
);

console.log(`Secuencial: ${tiempoSecuencial}ms`);
console.log(`Paralelo: ${tiempoParalelo}ms`);
// Paralelo es aproximadamente 3 veces más rápido
```

## 🔍 Casos de Prueba

| Función | Entrada | Resultado Esperado | Tiempo Aprox. |
|---------|---------|-------------------|---------------|
| `asyncAdd(5, 3)` | 5, 3 | 8 | ~200ms |
| `asyncMultiply(4, 7)` | 4, 7 | 28 | ~300ms |
| `asyncCalculate([{add, 2, 3}])` | 1 operación | 5 | ~200ms |
| `asyncCalculateParallel([{add, 1, 1}, {add, 2, 2}])` | 2 operaciones | 6 | ~200ms |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Crear función asíncrona</summary>

Una función marcada con `async` siempre retorna una promesa. Puedes usar `await` dentro de ella:

```javascript
async function asyncAdd(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(a + b), 200);
    });
}
```

</details>

<details>
<summary>💡 Pista 2 – Encadenar operaciones secuencialmente</summary>

Usa `await` para esperar cada operación antes de continuar:

```javascript
async function calcular() {
    let resultado = valorInicial;
    for (const op of operaciones) {
        resultado = await ejecutarOperacion(resultado, op);
    }
    return resultado;
}
```

</details>

<details>
<summary>💡 Pista 3 – Ejecutar operaciones en paralelo</summary>

Usa `Promise.all()` para ejecutar múltiples promesas al mismo tiempo:

```javascript
const resultados = await Promise.all([
    operacion1(),
    operacion2(),
    operacion3()
]);
// Todas se ejecutan simultáneamente
```

</details>

<details>
<summary>💡 Pista 4 – Medir tiempo de ejecución</summary>

Usa `Date.now()` antes y después de ejecutar la función:

```javascript
const inicio = Date.now();
await funcionAsincrona();
const fin = Date.now();
const tiempo = fin - inicio;
```

</details>

## 🧭 Pasos Sugeridos

1. **Implementa `asyncAdd()`**: Crea función asíncrona que suma con delay de 200ms.

2. **Implementa `asyncMultiply()`**: Similar pero con multiplicación y delay de 300ms.

3. **Implementa `asyncCalculate()`**: Usa un loop con `await` para ejecutar operaciones secuencialmente.

4. **Implementa `asyncCalculateParallel()`**: Usa `Promise.all()` para ejecutar todas las operaciones en paralelo.

5. **Implementa `measureExecutionTime()`**: Mide tiempo antes y después de ejecutar la función.

6. **Ejecuta los tests**: `npm test async-calculator`

7. **Experimenta**: Compara tiempos de ejecución secuencial vs paralelo con diferentes números de operaciones.

## ✅ Checklist antes de enviar

- [ ] `asyncAdd()` suma correctamente después de 200ms
- [ ] `asyncMultiply()` multiplica correctamente después de 300ms
- [ ] `asyncCalculate()` ejecuta operaciones secuencialmente
- [ ] `asyncCalculateParallel()` ejecuta operaciones en paralelo y suma resultados
- [ ] `measureExecutionTime()` mide correctamente el tiempo de ejecución
- [ ] Todas las validaciones están implementadas
- [ ] Los tests `npm test async-calculator` pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las funciones solicitadas
3. Ejecuta los tests: `npm test async-calculator` (o `npm run t async-calculator`)
4. Opcional: Prueba las funciones manualmente y compara tiempos

## 📚 Recursos Adicionales

- [MDN: async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN: Date.now()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/now)

---

**💡 Tip:** Cuando tengas múltiples operaciones independientes que no dependen unas de otras, ejecutarlas en paralelo puede mejorar significativamente el rendimiento. Pero si una operación depende del resultado de otra, debes ejecutarlas secuencialmente.

