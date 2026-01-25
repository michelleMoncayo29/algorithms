# Sistema de Polling/Verificación Periódica

**Dificultad:** BEGINNER  
**Categoría:** Promesas, Polling Pattern, Asincronía  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa funciones que verifican periódicamente si una condición se cumple usando el patrón de polling. Este ejercicio te enseñará a trabajar con polling, promesas, timeouts y verificación repetitiva de condiciones.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a implementar el patrón de polling
- [ ] Entender verificación repetitiva con promesas
- [ ] Practicar manejo de timeouts y límites de intentos
- [ ] Aplicar condiciones de parada en loops asíncronos

## 📝 Enunciado

Implementa dos funciones que implementan polling:

### 1. `pollUntil`

Verifica periódicamente si una condición se cumple hasta que retorne `true` o se alcance el máximo de intentos.

**Parámetros:**
- `checkFunction`: Función que retorna `true` si la condición se cumple, `false` en caso contrario
- `intervalMs`: Intervalo en milisegundos entre verificaciones (número positivo)
- `maxAttempts`: Número máximo de intentos (número positivo). Si es `undefined`, intenta indefinidamente

**Comportamiento:**
- Ejecuta `checkFunction` cada `intervalMs` milisegundos
- Si `checkFunction` retorna `true`, resuelve con `{success: true, attempts: number}`
- Si se alcanza `maxAttempts` sin éxito, rechaza con `{success: false, attempts: number}`

### 2. `pollUntilTimeout`

Similar a `pollUntil` pero con timeout en lugar de máximo de intentos.

**Parámetros:**
- `checkFunction`: Función que retorna `true` si la condición se cumple
- `intervalMs`: Intervalo en milisegundos entre verificaciones
- `timeoutMs`: Tiempo máximo en milisegundos para esperar

**Comportamiento:**
- Ejecuta `checkFunction` cada `intervalMs` milisegundos
- Si `checkFunction` retorna `true`, resuelve con `{success: true, attempts, elapsed}`
- Si se alcanza `timeoutMs` sin éxito, rechaza con `{success: false, attempts, elapsed}`

## 💡 Ejemplos

### Ejemplo 1
```javascript
const { pollUntil } = require('./exercise');

let attempts = 0;
pollUntil(() => {
    attempts++;
    return attempts >= 3;
}, 100, 10).then(result => {
    console.log(result);
    // {success: true, attempts: 3}
});
```

### Ejemplo 2
```javascript
const { pollUntilTimeout } = require('./exercise');

pollUntilTimeout(() => {
    return Math.random() > 0.9;
}, 50, 1000).then(result => {
    console.log(result);
    // {success: true, attempts: 15, elapsed: 750}
}).catch(error => {
    console.log(error);
    // {success: false, attempts: 20, elapsed: 1000}
});
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `pollUntil(() => true, 100, 10)` | `{success: true, attempts: 1}` | Condición se cumple inmediatamente |
| `pollUntil(() => false, 100, 3)` | Rechaza con `{success: false, attempts: 3}` | Se alcanza maxAttempts |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para implementar polling, usa recursión o un loop con setTimeout:
```javascript
const check = (attempt) => {
    return new Promise((resolve, reject) => {
        if (checkFunction()) {
            resolve({success: true, attempts: attempt});
        } else if (attempt >= maxAttempts) {
            reject({success: false, attempts: attempt});
        } else {
            setTimeout(() => {
                check(attempt + 1).then(resolve).catch(reject);
            }, intervalMs);
        }
    });
};
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para rastrear tiempo transcurrido:
```javascript
const startTime = Date.now();
const elapsed = Date.now() - startTime;
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para timeout, verifica el tiempo en cada iteración:
```javascript
if (Date.now() - startTime >= timeoutMs) {
    reject({success: false, attempts, elapsed: timeoutMs});
    return;
}
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las funciones `pollUntil` y `pollUntilTimeout`
3. Ejecuta los tests: `npm test 57-polling-system`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: Date.now()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
- [Polling Pattern](https://en.wikipedia.org/wiki/Polling_(computer_science))

---

**💡 Tip:** Asegúrate de limpiar cualquier timeout o intervalo cuando la condición se cumple o se alcanza el límite para evitar memory leaks.

