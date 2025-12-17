# Gestor de Tareas (Task Manager)

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Métodos de Arrays (find, filter, map, reduce)  
**Tiempo estimado:** 30-35 minutos

## 📦 Contexto

Necesitas crear un sistema básico para gestionar tareas personales. El sistema debe permitir crear tareas, marcarlas como completadas, filtrarlas por diferentes criterios y obtener estadísticas. Este ejercicio te ayudará a practicar el uso de métodos de arrays como `find`, `filter`, `map` y `reduce` dentro de clases.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir múltiples clases relacionadas (`Task` y `TaskManager`)
- [ ] Usar el método `find()` para buscar elementos en un array
- [ ] Usar el método `filter()` para filtrar arrays según criterios
- [ ] Usar el método `map()` para transformar arrays
- [ ] Usar el método `reduce()` para acumular valores y realizar cálculos
- [ ] Gestionar colecciones internas (arrays) en clases
- [ ] Implementar métodos que retornen datos derivados de las colecciones

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js`:

### Clase `Task`

- **Constructor**: Recibe tres parámetros:
  - `description` (string): Descripción de la tarea (no puede estar vacío)
  - `priority` (string, opcional): Prioridad de la tarea ('low', 'medium', 'high'). Default: 'medium'
  - `completed` (boolean, opcional): Estado de completado. Default: `false`
  - Debe validar los parámetros:
    - Lanza `"Task description is required"` si la descripción está vacía
    - Lanza `"Priority must be 'low', 'medium', or 'high'"` si la prioridad no es válida

- **Propiedades**:
  - `description` (string): Descripción de la tarea
  - `priority` (string): Prioridad de la tarea
  - `completed` (boolean): Estado de completado

- **Método `toggleComplete()`** - Alternar estado de completado:
  - Cambia el estado `completed` (si es `true` lo pone en `false` y viceversa)
  - Retorna el nuevo valor de `completed`

### Clase `TaskManager`

- **Constructor**: No recibe parámetros. Inicializa un array vacío `tasks` para almacenar las tareas.

- **Método `addTask(description, priority)`** - Agregar tarea:
  - Crea una nueva instancia de `Task` con los parámetros recibidos
  - Agrega la tarea al array interno
  - Retorna la nueva tarea creada

- **Método `findTask(description)`** - Buscar tarea por descripción (usa `find`):
  - Busca una tarea cuyo `description` coincida exactamente (case-sensitive)
  - Retorna la tarea encontrada o `null` si no existe
  - **Debe usar el método `find()` del array**

- **Método `getPendingTasks()`** - Obtener tareas pendientes (usa `filter`):
  - Retorna un nuevo array con todas las tareas que tienen `completed === false`
  - **Debe usar el método `filter()` del array**

- **Método `getCompletedTasks()`** - Obtener tareas completadas (usa `filter`):
  - Retorna un nuevo array con todas las tareas que tienen `completed === true`
  - **Debe usar el método `filter()` del array**

- **Método `getTasksByPriority(priority)`** - Filtrar por prioridad (usa `filter`):
  - Recibe un parámetro `priority` ('low', 'medium', 'high')
  - Retorna un nuevo array con todas las tareas que tienen esa prioridad
  - **Debe usar el método `filter()` del array**

- **Método `getTaskDescriptions()`** - Obtener solo las descripciones (usa `map`):
  - Retorna un nuevo array de strings con las descripciones de todas las tareas
  - **Debe usar el método `map()` del array**

- **Método `completeTask(description)`** - Completar una tarea:
  - Busca la tarea por descripción usando `findTask()`
  - Si la encuentra y no está completada, la marca como completada usando `toggleComplete()`
  - Retorna `true` si se completó la tarea, `false` si no se encontró o ya estaba completada

- **Método `getCompletionPercentage()`** - Calcular porcentaje de completado (usa `reduce`):
  - Calcula el porcentaje de tareas completadas
  - Retorna un número entre 0 y 100 (con 2 decimales)
  - Si no hay tareas, retorna 0
  - **Debe usar el método `reduce()` del array para contar las tareas completadas**
  - Fórmula: (tareas completadas / total de tareas) * 100

- **Método `getTaskCount()`** - Contar tareas (usa `reduce`):
  - Retorna el número total de tareas en el gestor
  - **Debe usar el método `reduce()` del array para contar**

- **Método `getPriorityCounts()`** - Contar por prioridad (usa `reduce`):
  - Retorna un objeto con el conteo de tareas por cada prioridad
  - Formato: `{ low: X, medium: Y, high: Z }`
  - **Debe usar el método `reduce()` del array**

## 💡 Ejemplos

### Ejemplo 1 - Crear tareas

```javascript
const manager = new TaskManager();
const task1 = manager.addTask('Comprar leche', 'high');
const task2 = manager.addTask('Hacer ejercicio', 'medium');
const task3 = manager.addTask('Leer libro', 'low');

console.log(task1.description); // "Comprar leche"
console.log(task1.priority); // "high"
console.log(task1.completed); // false
```

### Ejemplo 2 - Buscar y filtrar tareas

```javascript
const manager = new TaskManager();
manager.addTask('Tarea 1', 'high');
manager.addTask('Tarea 2', 'medium');
manager.addTask('Tarea 3', 'low');

const found = manager.findTask('Tarea 2');
console.log(found); // Task { description: 'Tarea 2', priority: 'medium', completed: false }

const highPriority = manager.getTasksByPriority('high');
console.log(highPriority.length); // 1
```

### Ejemplo 3 - Obtener tareas pendientes y completadas

```javascript
const manager = new TaskManager();
manager.addTask('Tarea 1', 'high');
manager.addTask('Tarea 2', 'medium');
const task3 = manager.addTask('Tarea 3', 'low');

task3.toggleComplete(); // Completar una tarea

const pending = manager.getPendingTasks();
console.log(pending.length); // 2

const completed = manager.getCompletedTasks();
console.log(completed.length); // 1
```

### Ejemplo 4 - Usar map para obtener descripciones

```javascript
const manager = new TaskManager();
manager.addTask('Comprar pan', 'high');
manager.addTask('Llamar a mamá', 'medium');
manager.addTask('Estudiar JavaScript', 'low');

const descriptions = manager.getTaskDescriptions();
console.log(descriptions);
// ["Comprar pan", "Llamar a mamá", "Estudiar JavaScript"]
```

### Ejemplo 5 - Usar reduce para calcular porcentaje

```javascript
const manager = new TaskManager();
manager.addTask('Tarea 1', 'high');
manager.addTask('Tarea 2', 'medium');
manager.addTask('Tarea 3', 'low');
manager.addTask('Tarea 4', 'high');

manager.completeTask('Tarea 1');
manager.completeTask('Tarea 3');

const percentage = manager.getCompletionPercentage();
console.log(percentage); // 50.00 (2 de 4 tareas completadas)
```

### Ejemplo 6 - Usar reduce para contar por prioridad

```javascript
const manager = new TaskManager();
manager.addTask('Tarea 1', 'high');
manager.addTask('Tarea 2', 'high');
manager.addTask('Tarea 3', 'medium');
manager.addTask('Tarea 4', 'low');

const counts = manager.getPriorityCounts();
console.log(counts); // { low: 1, medium: 1, high: 2 }
```

## ⚙️ Restricciones y Reglas

- Debes usar los métodos de array especificados (`find`, `filter`, `map`, `reduce`)
- No uses bucles `for` o `while` para iterar sobre arrays (usa los métodos de array)
- Los métodos que retornan arrays deben retornar nuevos arrays (no modificar el original)
- Los mensajes de error deben ser exactos como se especifican
- Las validaciones deben ser Fail Fast (lanzar errores inmediatamente)

## 🔍 Casos de Prueba Recomendados

| Escenario | Método | Método de Array Usado |
|-----------|--------|----------------------|
| Buscar tarea existente | `findTask()` | `find()` |
| Buscar tarea inexistente | `findTask()` | `find()` → retorna `null` |
| Filtrar tareas pendientes | `getPendingTasks()` | `filter()` |
| Filtrar tareas completadas | `getCompletedTasks()` | `filter()` |
| Filtrar por prioridad | `getTasksByPriority()` | `filter()` |
| Obtener solo descripciones | `getTaskDescriptions()` | `map()` |
| Calcular porcentaje de completado | `getCompletionPercentage()` | `reduce()` |
| Contar total de tareas | `getTaskCount()` | `reduce()` |
| Contar por prioridad | `getPriorityCounts()` | `reduce()` |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Método find()</summary>

`find()` retorna el primer elemento que cumple una condición o `undefined` si no encuentra nada:
```javascript
const task = this.tasks.find(task => task.description === description);
return task || null;
```

</details>

<details>
<summary>💡 Pista 2 – Método filter()</summary>

`filter()` retorna un nuevo array con elementos que cumplen una condición:
```javascript
return this.tasks.filter(task => task.completed === false);
```

</details>

<details>
<summary>💡 Pista 3 – Método map()</summary>

`map()` transforma cada elemento del array:
```javascript
return this.tasks.map(task => task.description);
```

</details>

<details>
<summary>💡 Pista 4 – Método reduce()</summary>

`reduce()` acumula valores. Para contar:
```javascript
return this.tasks.reduce((count, task) => {
    return task.completed ? count + 1 : count;
}, 0);
```

Para contar por prioridad:
```javascript
return this.tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
}, {});
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Task` con constructor y validaciones
2. Implementa `TaskManager` con constructor y método `addTask()`
3. Implementa métodos que usan `find()`: `findTask()`
4. Implementa métodos que usan `filter()`: `getPendingTasks()`, `getCompletedTasks()`, `getTasksByPriority()`
5. Implementa métodos que usan `map()`: `getTaskDescriptions()`
6. Implementa métodos que usan `reduce()`: `getCompletionPercentage()`, `getTaskCount()`, `getPriorityCounts()`
7. Implementa `completeTask()` que combina `find()` y `toggleComplete()`
8. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] Todos los métodos usan los métodos de array especificados (`find`, `filter`, `map`, `reduce`)
- [ ] No se usan bucles `for` o `while` para iterar sobre arrays
- [ ] Los mensajes de error coinciden con los solicitados
- [ ] Los métodos retornan nuevos arrays cuando corresponda (no mutan el original)
- [ ] El porcentaje de completado se calcula correctamente con 2 decimales
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`
2. Implementa las clases `Task` y `TaskManager` con todos los métodos requeridos
3. Ejecuta los tests con `npm test` o `npm run test -- 29-task-manager`
4. Asegúrate de usar los métodos de array especificados

## 📚 Recursos Adicionales

- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.map() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)

---

**💡 Tip:** Empieza implementando los métodos más simples primero (find, filter) y luego avanza a los más complejos (reduce). Recuerda que `reduce()` es muy poderoso y puede hacer cálculos complejos en una sola iteración.

