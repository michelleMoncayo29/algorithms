# Simulador de Operaciones con Retry y Timeout

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Asincronía, Retry Pattern, Timeout Pattern  
**Tiempo estimado:** 35-40 minutos

## 📦 Contexto

En el mundo real, las operaciones asíncronas (como llamadas a APIs) pueden fallar por muchas razones: problemas de red, servidores sobrecargados, timeouts, etc. Es común implementar estrategias como **reintentos (retry)** y **timeouts** para hacer las aplicaciones más robustas.

Este ejercicio te enseña a manejar estos escenarios comunes usando promesas, introduciendo patrones útiles que usarás frecuentemente en desarrollo real.

## 🎯 Objetivos de Aprendizaje

- [ ] Crear funciones que retornan promesas que pueden fallar
- [ ] Implementar patrón de retry básico (reintentar operaciones fallidas)
- [ ] Implementar patrón de timeout (rechazar si tarda demasiado)
- [ ] Combinar retry y timeout en una sola función
- [ ] Manejar errores en operaciones asíncronas
- [ ] Entender cuándo usar retry y cuándo no

## 📚 Conceptos Fundamentales

### ¿Qué es Retry?

**Retry** (reintentar) es un patrón donde si una operación falla, la intentamos nuevamente un número limitado de veces antes de darnos por vencidos.

```javascript
// Ejemplo conceptual
intentarOperacion()
    .catch(() => intentarOperacion()) // Reintentar 1 vez
    .catch(() => intentarOperacion()); // Reintentar 2 veces
```

### ¿Qué es Timeout?

**Timeout** es un patrón donde establecemos un tiempo máximo para que una operación se complete. Si excede ese tiempo, la rechazamos automáticamente.

```javascript
// Ejemplo conceptual
const promesaConTimeout = Promise.race([
    operacionLenta(),
    delay(5000).then(() => Promise.reject(new Error('Timeout')))
]);
```

## 📝 Enunciado Detallado

Implementa las siguientes funciones en `exercise.js`. Cada función maneja operaciones que pueden fallar y estrategias para recuperarse.

### 1. `simulateApiCall(successRate)`

Simula una llamada a una API que puede tener éxito o fallar aleatoriamente según una tasa de éxito.

**Parámetros:**
- `successRate` (number): Probabilidad de éxito entre 0 y 1 (0.5 = 50% de éxito). Default: 0.8

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con "Success" o se rechaza con error "API call failed"

**Comportamiento:**
- Genera un número aleatorio entre 0 y 1
- Si el número aleatorio < successRate → Resuelve con "Success"
- Si el número aleatorio >= successRate → Rechaza con error "API call failed"
- Usa `Math.random()` para generar el número aleatorio
- Delay simulado de 200ms antes de resolver/rechazar

**Validaciones:**
- Si `successRate` no es un número → Error: "Success rate must be a number"
- Si `successRate` está fuera del rango [0, 1] → Error: "Success rate must be between 0 and 1"

**Ejemplo:**
```javascript
simulateApiCall(0.8).then(result => {
    console.log(result); // "Success" (80% de probabilidad)
}).catch(error => {
    console.error(error.message); // "API call failed" (20% de probabilidad)
});
```

**Guía de implementación:**
```javascript
function simulateApiCall(successRate = 0.8) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random < successRate) {
                resolve("Success");
            } else {
                reject(new Error("API call failed"));
            }
        }, 200);
    });
}
```

### 2. `retryOperation(operation, maxRetries)`

Reintenta una operación que retorna una promesa si falla, hasta un número máximo de intentos.

**Parámetros:**
- `operation` (function): Función que retorna una promesa (se ejecutará sin parámetros)
- `maxRetries` (number): Número máximo de reintentos (default: 3)

**Retorna:**
- `Promise<any>`: Promesa que se resuelve con el resultado de la operación o se rechaza después de todos los intentos

**Comportamiento:**
- Intenta ejecutar `operation()` (llamándola como función)
- Si tiene éxito, retorna el resultado
- Si falla, reintenta hasta `maxRetries` veces
- Si todos los intentos fallan, rechaza con el último error

**Validaciones:**
- Si `operation` no es una función → Error: "Operation must be a function"
- Si `maxRetries` no es un número → Error: "Max retries must be a number"
- Si `maxRetries` es menor que 0 → Error: "Max retries must be greater than or equal to 0"

**Ejemplo:**
```javascript
// Operación que falla 2 veces y luego tiene éxito
let attempts = 0;
const flakyOperation = () => {
    attempts++;
    return attempts < 3 
        ? Promise.reject(new Error('Failed'))
        : Promise.resolve('Success');
};

retryOperation(flakyOperation, 5).then(result => {
    console.log(result); // "Success" después de 3 intentos
});
```

**Guía de implementación:**
```javascript
function retryOperation(operation, maxRetries = 3) {
    return operation().catch(error => {
        if (maxRetries <= 0) {
            throw error; // No más reintentos
        }
        return retryOperation(operation, maxRetries - 1); // Reintentar
    });
}
```

### 3. `withTimeout(promise, timeoutMs)`

Agrega un timeout a una promesa existente. Si la promesa no se resuelve en el tiempo especificado, se rechaza.

**Parámetros:**
- `promise` (Promise): Promesa a la cual agregar timeout
- `timeoutMs` (number): Tiempo máximo en milisegundos (default: 5000)

**Retorna:**
- `Promise<any>`: Promesa que se resuelve/rechaza igual que la original, o rechaza con "Timeout" si excede el tiempo

**Comportamiento:**
- Usa `Promise.race()` para competir entre la promesa original y un timeout
- Si la promesa original se resuelve primero → retorna su resultado
- Si el timeout se completa primero → rechaza con error "Operation timed out"

**Validaciones:**
- Si `promise` no es una promesa → Error: "Promise must be a Promise instance"
- Si `timeoutMs` no es un número → Error: "Timeout must be a number"
- Si `timeoutMs` es menor o igual a 0 → Error: "Timeout must be greater than 0"

**Ejemplo:**
```javascript
const slowOperation = delay(2000); // Tarda 2 segundos
withTimeout(slowOperation, 1000).then(() => {
    console.log("Completado");
}).catch(error => {
    console.error(error.message); // "Operation timed out" (porque 2000ms > 1000ms)
});
```

**Guía de implementación:**
```javascript
function withTimeout(promise, timeoutMs = 5000) {
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}
```

### 4. `fetchWithRetry(url, maxRetries)`

Combina retry y timeout. Intenta obtener datos de una URL simulada con reintentos y timeout.

**Parámetros:**
- `url` (string): URL a obtener (simulada)
- `maxRetries` (number): Número máximo de reintentos (default: 3)

**Retorna:**
- `Promise<string>`: Promesa que se resuelve con "Data from [url]" o se rechaza después de todos los intentos

**Comportamiento:**
- Simula obtener datos de una URL con `simulateApiCall(0.6)` (60% de éxito)
- Agrega timeout de 1000ms usando `withTimeout()`
- Si falla, reintenta hasta `maxRetries` veces usando `retryOperation()`
- Si tiene éxito, retorna "Data from [url]"

**Validaciones:**
- Si `url` está vacío o es null/undefined → Error: "URL is required"
- Si `maxRetries` no es un número → Error: "Max retries must be a number"
- Si `maxRetries` es menor que 0 → Error: "Max retries must be greater than or equal to 0"

**Ejemplo:**
```javascript
fetchWithRetry("https://api.example.com/data", 3).then(data => {
    console.log(data); // "Data from https://api.example.com/data"
}).catch(error => {
    console.error(error.message); // Error después de todos los reintentos
});
```

**Guía de implementación:**
```javascript
function fetchWithRetry(url, maxRetries = 3) {
    // Validar URL
    if (!url || url.trim() === '') {
        return Promise.reject(new Error("URL is required"));
    }
    
    // Crear operación que simula fetch con timeout
    const fetchOperation = () => {
        const apiCall = simulateApiCall(0.6);
        return withTimeout(apiCall, 1000).then(() => {
            return "Data from " + url;
        });
    };
    
    // Reintentar la operación
    return retryOperation(fetchOperation, maxRetries);
}
```

### 5. `processMultipleRequests(urls)`

Procesa múltiples URLs en paralelo, cada una con su propio retry.

**Parámetros:**
- `urls` (array): Array de URLs a procesar

**Retorna:**
- `Promise<Array>`: Promesa que se resuelve con array de resultados exitosos (puede tener menos elementos si algunos fallan)

**Comportamiento:**
- Procesa cada URL con `fetchWithRetry()` en paralelo usando `Promise.allSettled()`
- `Promise.allSettled()` espera a que todas las promesas se resuelvan o rechacen
- Filtra solo los resultados exitosos (status === 'fulfilled')
- Retorna array con los valores de las promesas exitosas

**Validaciones:**
- Si `urls` no es un array → Error: "URLs must be an array"
- Si el array está vacío → Error: "URLs array cannot be empty"

**Ejemplo:**
```javascript
processMultipleRequests([
    "https://api1.com",
    "https://api2.com",
    "https://api3.com"
]).then(results => {
    console.log(results); 
    // Array con resultados exitosos (puede tener 1, 2 o 3 elementos dependiendo de cuáles tuvieron éxito)
});
```

**Guía de implementación:**
```javascript
function processMultipleRequests(urls) {
    // Validar que urls sea un array
    if (!Array.isArray(urls)) {
        return Promise.reject(new Error("URLs must be an array"));
    }
    
    if (urls.length === 0) {
        return Promise.reject(new Error("URLs array cannot be empty"));
    }
    
    // Crear array de promesas
    const promises = urls.map(url => fetchWithRetry(url));
    
    // Usar Promise.allSettled() para esperar todas (exitosas o fallidas)
    return Promise.allSettled(promises).then(results => {
        // Filtrar solo las exitosas
        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);
    });
}
```

## 💡 Ejemplos Paso a Paso

### Ejemplo 1: Operación que Falla y se Reintenta

```javascript
let intentos = 0;
const operacionInestable = () => {
    intentos++;
    console.log(`Intento ${intentos}`);
    if (intentos < 3) {
        return Promise.reject(new Error('Falló'));
    }
    return Promise.resolve('¡Éxito!');
};

retryOperation(operacionInestable, 5).then(resultado => {
    console.log(resultado); // "¡Éxito!" después de 3 intentos
});

// Salida:
// Intento 1
// Intento 2
// Intento 3
// ¡Éxito!
```

### Ejemplo 2: Timeout en Operación Lenta

```javascript
const operacionLenta = new Promise(resolve => {
    setTimeout(() => resolve("Completado"), 3000); // Tarda 3 segundos
});

withTimeout(operacionLenta, 1000).then(() => {
    console.log("Completado");
}).catch(error => {
    console.error(error.message); // "Operation timed out"
});
```

### Ejemplo 3: Combinando Retry y Timeout

```javascript
fetchWithRetry("https://api.example.com", 3)
    .then(data => console.log("Datos:", data))
    .catch(error => console.error("Error final:", error.message));
```

## 🔍 Casos de Prueba

| Función | Entrada | Resultado Esperado | Notas |
|---------|---------|-------------------|-------|
| `simulateApiCall(1.0)` | 1.0 | "Success" | Siempre éxito |
| `simulateApiCall(0.0)` | 0.0 | Error "API call failed" | Siempre falla |
| `retryOperation(op, 0)` | op que falla, 0 retries | Error | Sin reintentos |
| `withTimeout(delay(100), 50)` | delay 100ms, timeout 50ms | Error "Operation timed out" | Timeout más corto |
| `fetchWithRetry("url", 0)` | url, 0 retries | Puede fallar | Sin reintentos |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Simular éxito/fallo aleatorio</summary>

Usa `Math.random()` para generar un número entre 0 y 1, luego compáralo con `successRate`:

```javascript
const random = Math.random();
if (random < successRate) {
    resolve("Success");
} else {
    reject(new Error("API call failed"));
}
```

</details>

<details>
<summary>💡 Pista 2 – Implementar retry recursivo</summary>

Puedes usar recursión para reintentar. Cada vez que falla, llamas a la función nuevamente con `maxRetries - 1`:

```javascript
function retryOperation(operation, maxRetries = 3) {
    return operation().catch(error => {
        if (maxRetries <= 0) {
            throw error; // No más intentos
        }
        return retryOperation(operation, maxRetries - 1); // Reintentar
    });
}
```

</details>

<details>
<summary>💡 Pista 3 – Promise.race() para timeout</summary>

`Promise.race()` retorna la primera promesa que se resuelve o rechaza:

```javascript
const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Timeout")), timeoutMs);
});

return Promise.race([promise, timeout]);
```

</details>

<details>
<summary>💡 Pista 4 – Promise.allSettled() vs Promise.all()</summary>

- `Promise.all()`: Falla si alguna promesa falla
- `Promise.allSettled()`: Espera todas, exitosas o fallidas, y retorna array con `{status, value/reason}`

```javascript
Promise.allSettled([promesa1, promesa2]).then(results => {
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('Éxito:', result.value);
        } else {
            console.log('Error:', result.reason);
        }
    });
});
```

</details>

## 🧭 Pasos Sugeridos

1. **Implementa `simulateApiCall()`**: Crea una promesa que puede tener éxito o fallar aleatoriamente.

2. **Implementa `retryOperation()`**: Usa recursión o un loop para reintentar operaciones fallidas.

3. **Implementa `withTimeout()`**: Usa `Promise.race()` para competir entre la promesa y un timeout.

4. **Implementa `fetchWithRetry()`**: Combina `simulateApiCall()`, `withTimeout()` y `retryOperation()`.

5. **Implementa `processMultipleRequests()`**: Usa `Promise.allSettled()` para procesar múltiples URLs en paralelo.

6. **Ejecuta los tests**: `npm test async-retry`

7. **Experimenta**: Prueba diferentes valores de `successRate` y `maxRetries` para ver cómo afectan los resultados.

## ✅ Checklist antes de enviar

- [ ] `simulateApiCall()` puede tener éxito o fallar según successRate
- [ ] `retryOperation()` reintenta operaciones fallidas correctamente
- [ ] `withTimeout()` rechaza promesas que exceden el tiempo límite
- [ ] `fetchWithRetry()` combina retry y timeout correctamente
- [ ] `processMultipleRequests()` procesa URLs en paralelo y filtra exitosas
- [ ] Todas las validaciones están implementadas
- [ ] Los tests `npm test async-retry` pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las funciones solicitadas
3. Ejecuta los tests: `npm test async-retry` (o `npm run t async-retry`)
4. Opcional: Prueba las funciones manualmente para entender el comportamiento

## 📚 Recursos Adicionales

- [MDN: Promise.race()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [MDN: Promise.allSettled()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [MDN: Math.random()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

---

**💡 Tip:** Los patrones de retry y timeout son muy comunes en desarrollo real. Aprenderlos ahora te ayudará mucho cuando trabajes con APIs reales.

