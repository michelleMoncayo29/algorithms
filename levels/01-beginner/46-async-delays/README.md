# Funciones Asíncronas con Delays Simples

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Asincronía, Async/Await, Delays  
**Tiempo estimado:** 35-40 minutos

## 📦 Contexto

En JavaScript, muchas operaciones toman tiempo: cargar datos de un servidor, leer archivos, esperar respuestas de APIs, etc. Estas operaciones **no bloquean** el resto del código, permitiendo que otras cosas sigan ejecutándose. Para manejar esto, JavaScript usa **Promesas** y **async/await**.

Este ejercicio te introduce a los conceptos fundamentales de programación asíncrona en JavaScript de forma práctica y guiada.

## 🎯 Objetivos de Aprendizaje

- [ ] Entender qué es una Promesa y cómo crearla
- [ ] Aprender a usar `setTimeout()` dentro de promesas para simular delays
- [ ] Dominar el uso de `.then()` y `.catch()` para manejar promesas
- [ ] Introducir `async/await` como alternativa más legible
- [ ] Encadenar múltiples operaciones asíncronas
- [ ] Manejar errores en operaciones asíncronas
- [ ] Comprender la diferencia entre código síncrono y asíncrono

## 📚 Conceptos Fundamentales

### ¿Qué es una Promesa?

Una **Promesa** es un objeto que representa el resultado eventual (éxito o fallo) de una operación asíncrona. Tiene tres estados:

1. **Pending (Pendiente)**: La operación aún no se ha completado
2. **Fulfilled (Cumplida)**: La operación se completó exitosamente
3. **Rejected (Rechazada)**: La operación falló

### Crear una Promesa

```javascript
const miPromesa = new Promise((resolve, reject) => {
    // resolve() se llama cuando la operación tiene éxito
    // reject() se llama cuando la operación falla
    
    setTimeout(() => {
        resolve('¡Operación exitosa!');
    }, 1000);
});
```

### Usar `.then()` y `.catch()`

```javascript
miPromesa
    .then(resultado => {
        console.log(resultado); // Se ejecuta cuando resolve() se llama
    })
    .catch(error => {
        console.error(error); // Se ejecuta cuando reject() se llama
    });
```

### Usar `async/await`

```javascript
async function miFuncion() {
    try {
        const resultado = await miPromesa; // Espera a que la promesa se resuelva
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }
}
```

## 📝 Enunciado Detallado

Implementa las siguientes funciones en `exercise.js`. Cada función debe manejar operaciones asíncronas usando promesas.

### 1. `delay(ms)`

Crea una promesa que se resuelve después de un número específico de milisegundos.

**Parámetros:**
- `ms` (number): Milisegundos a esperar (debe ser mayor o igual a 0)

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con el mensaje "Delay completed" después del tiempo especificado

**Validaciones:**
- Si `ms` no es un número → Error: "Delay must be a number"
- Si `ms` es menor que 0 → Error: "Delay must be greater than or equal to 0"

**Ejemplo:**
```javascript
delay(1000).then(message => {
    console.log(message); // Se imprime después de 1 segundo: "Delay completed"
});
```

### 2. `fetchUserData(userId)`

Simula obtener datos de un usuario desde una "API" con un delay de 500ms.

**Parámetros:**
- `userId` (string|number): ID del usuario

**Retorna:**
- `Promise<Object>`: Promesa que se resuelve con un objeto `{ id: userId, name: "User " + userId, email: "user" + userId + "@example.com" }` después de 500ms

**Validaciones:**
- Si `userId` está vacío o es null/undefined → Error: "User ID is required"

**Ejemplo:**
```javascript
fetchUserData(123).then(user => {
    console.log(user); 
    // Después de 500ms imprime: { id: 123, name: "User 123", email: "user123@example.com" }
});
```

### 3. `processData(data)`

Simula procesar datos con un delay de 300ms. Los datos procesados tienen un prefijo "Processed: ".

**Parámetros:**
- `data` (any): Datos a procesar

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con "Processed: " + String(data) después de 300ms

**Validaciones:**
- Si `data` es null o undefined → Error: "Data is required"

**Ejemplo:**
```javascript
processData("Hello").then(result => {
    console.log(result); // Después de 300ms: "Processed: Hello"
});
```

### 4. `handleAsyncOperation(userId)`

Encadena operaciones asíncronas usando `.then()`:
1. Obtiene datos del usuario con `fetchUserData()`
2. Procesa los datos del usuario con `processData()`
3. Retorna el resultado procesado

**Parámetros:**
- `userId` (string|number): ID del usuario

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con los datos procesados del usuario

**Ejemplo:**
```javascript
handleAsyncOperation(456).then(result => {
    console.log(result); 
    // Después de ~800ms (500ms + 300ms): "Processed: User 456"
});
```

**Guía de implementación:**
```javascript
function handleAsyncOperation(userId) {
    // Paso 1: Obtener datos del usuario
    return fetchUserData(userId)
        .then(userData => {
            // Paso 2: Procesar los datos (puedes usar userData.name o userData)
            return processData(userData.name);
        })
        .catch(error => {
            // Manejar errores si algo falla
            throw error;
        });
}
```

### 5. `handleAsyncOperationWithAwait(userId)`

Hace lo mismo que `handleAsyncOperation()` pero usando `async/await` en lugar de `.then()`.

**Parámetros:**
- `userId` (string|number): ID del usuario

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con los datos procesados del usuario

**Ejemplo:**
```javascript
handleAsyncOperationWithAwait(789).then(result => {
    console.log(result); 
    // Después de ~800ms: "Processed: User 789"
});
```

**Guía de implementación:**
```javascript
async function handleAsyncOperationWithAwait(userId) {
    try {
        // Paso 1: Esperar a que se obtengan los datos del usuario
        const userData = await fetchUserData(userId);
        
        // Paso 2: Esperar a que se procesen los datos
        const processedData = await processData(userData.name);
        
        // Paso 3: Retornar el resultado
        return processedData;
    } catch (error) {
        // Manejar errores
        throw error;
    }
}
```

### 6. `fetchMultipleUsers(userIds)`

Obtiene datos de múltiples usuarios en paralelo usando `Promise.all()`.

**Parámetros:**
- `userIds` (array): Array de IDs de usuarios

**Retorna:**
- `Promise<Array>`: Promesa que se resuelve con un array de objetos de usuario

**Validaciones:**
- Si `userIds` no es un array → Error: "User IDs must be an array"
- Si el array está vacío → Error: "User IDs array cannot be empty"

**Ejemplo:**
```javascript
fetchMultipleUsers([1, 2, 3]).then(users => {
    console.log(users);
    // Después de ~500ms (no 1500ms, porque es en paralelo):
    // [
    //   { id: 1, name: "User 1", email: "user1@example.com" },
    //   { id: 2, name: "User 2", email: "user2@example.com" },
    //   { id: 3, name: "User 3", email: "user3@example.com" }
    // ]
});
```

**Guía de implementación:**
```javascript
function fetchMultipleUsers(userIds) {
    // Validar que userIds es un array
    if (!Array.isArray(userIds)) {
        return Promise.reject(new Error("User IDs must be an array"));
    }
    
    if (userIds.length === 0) {
        return Promise.reject(new Error("User IDs array cannot be empty"));
    }
    
    // Crear un array de promesas
    const promises = userIds.map(userId => fetchUserData(userId));
    
    // Ejecutar todas las promesas en paralelo
    return Promise.all(promises);
}
```

## 💡 Ejemplos Paso a Paso

### Ejemplo 1: Delay Básico

```javascript
console.log("Inicio");
delay(1000).then(() => {
    console.log("Después de 1 segundo");
});
console.log("Fin");

// Salida:
// "Inicio"
// "Fin"
// "Después de 1 segundo" (aparece 1 segundo después)
```

**Explicación:** Aunque `delay(1000)` se llama antes de "Fin", el código continúa ejecutándose. El `.then()` se ejecuta cuando la promesa se resuelve.

### Ejemplo 2: Encadenamiento con .then()

```javascript
fetchUserData(1)
    .then(user => {
        console.log("Usuario obtenido:", user);
        return processData(user.name);
    })
    .then(processed => {
        console.log("Datos procesados:", processed);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

**Explicación:** Cada `.then()` recibe el resultado del anterior. Si alguno falla, se ejecuta `.catch()`.

### Ejemplo 3: Usando async/await

```javascript
async function ejemplo() {
    try {
        const user = await fetchUserData(1);
        console.log("Usuario obtenido:", user);
        
        const processed = await processData(user.name);
        console.log("Datos procesados:", processed);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

**Explicación:** `await` hace que el código espere a que la promesa se resuelva antes de continuar. Es más legible que `.then()`.

### Ejemplo 4: Paralelo vs Secuencial

```javascript
// SECUENCIAL (lento): ~1500ms
async function secuencial() {
    const user1 = await fetchUserData(1); // 500ms
    const user2 = await fetchUserData(2); // 500ms
    const user3 = await fetchUserData(3); // 500ms
    return [user1, user2, user3];
}

// PARALELO (rápido): ~500ms
async function paralelo() {
    return await fetchMultipleUsers([1, 2, 3]); // Todas se ejecutan al mismo tiempo
}
```

## 🔍 Casos de Prueba

| Función | Entrada | Resultado Esperado | Tiempo Aprox. |
|---------|---------|-------------------|---------------|
| `delay(100)` | 100 | "Delay completed" | ~100ms |
| `fetchUserData(5)` | 5 | `{id: 5, name: "User 5", email: "user5@example.com"}` | ~500ms |
| `processData("test")` | "test" | "Processed: test" | ~300ms |
| `handleAsyncOperation(10)` | 10 | "Processed: User 10" | ~800ms |
| `fetchMultipleUsers([1,2])` | [1,2] | Array con 2 usuarios | ~500ms |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Crear una promesa con delay</summary>

Para crear una promesa que se resuelve después de un tiempo, usa `setTimeout()`:

```javascript
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Delay completed");
        }, ms);
    });
}
```

El `resolve` es una función que se pasa automáticamente a tu callback. Cuando la llamas, la promesa se resuelve con ese valor.

</details>

<details>
<summary>💡 Pista 2 – Encadenar con .then()</summary>

Puedes encadenar múltiples `.then()`. El valor retornado de un `.then()` se pasa al siguiente:

```javascript
fetchUserData(1)
    .then(user => {
        // user es el resultado de fetchUserData
        return processData(user.name); // Retorna una nueva promesa
    })
    .then(processed => {
        // processed es el resultado de processData
        console.log(processed);
    });
```

</details>

<details>
<summary>💡 Pista 3 – Usar async/await</summary>

`async/await` es azúcar sintáctico para `.then()`. Una función marcada con `async` siempre retorna una promesa:

```javascript
async function ejemplo() {
    const resultado = await algunaPromesa(); // Espera aquí
    return resultado; // Retorna una promesa que se resuelve con resultado
}
```

</details>

<details>
<summary>💡 Pista 4 – Promise.all() para paralelo</summary>

`Promise.all()` ejecuta múltiples promesas en paralelo y espera a que todas se resuelvan:

```javascript
const promesa1 = delay(1000);
const promesa2 = delay(1000);
const promesa3 = delay(1000);

Promise.all([promesa1, promesa2, promesa3]).then(resultados => {
    // Todas se completaron en ~1000ms (no 3000ms)
    console.log(resultados);
});
```

</details>

## 🧭 Pasos Sugeridos

1. **Implementa `delay(ms)`**: Empieza con la función más simple. Crea una promesa que usa `setTimeout()`.

2. **Implementa `fetchUserData(userId)`**: Crea una promesa que simula obtener datos después de 500ms.

3. **Implementa `processData(data)`**: Similar a la anterior, pero con 300ms y procesando los datos.

4. **Implementa `handleAsyncOperation(userId)`**: Usa `.then()` para encadenar `fetchUserData` y `processData`.

5. **Implementa `handleAsyncOperationWithAwait(userId)`**: Haz lo mismo pero con `async/await`.

6. **Implementa `fetchMultipleUsers(userIds)`**: Usa `Promise.all()` para ejecutar múltiples `fetchUserData` en paralelo.

7. **Ejecuta los tests**: `npm test async-delays`

8. **Experimenta**: Prueba las funciones en la consola para ver cómo funcionan.

## ✅ Checklist antes de enviar

- [ ] `delay()` crea una promesa que se resuelve después del tiempo especificado
- [ ] `fetchUserData()` retorna datos de usuario después de 500ms
- [ ] `processData()` procesa datos después de 300ms
- [ ] `handleAsyncOperation()` encadena operaciones con `.then()`
- [ ] `handleAsyncOperationWithAwait()` hace lo mismo con `async/await`
- [ ] `fetchMultipleUsers()` ejecuta promesas en paralelo con `Promise.all()`
- [ ] Todas las validaciones están implementadas
- [ ] Los tests `npm test async-delays` pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las funciones solicitadas
3. Ejecuta los tests: `npm test async-delays` (o `npm run t async-delays`)
4. Opcional: Prueba las funciones manualmente en la consola de Node.js

## 📚 Recursos Adicionales

- [MDN: Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: async/await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [JavaScript.info: Promesas](https://es.javascript.info/promise-basics)

---

**💡 Tip:** Recuerda que las promesas son asíncronas. El código después de una promesa se ejecuta inmediatamente, no espera a que la promesa se resuelva. Solo el código dentro de `.then()` o después de `await` espera.

