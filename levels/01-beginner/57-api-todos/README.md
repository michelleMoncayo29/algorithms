# Gestión de Tareas (TODOs) con API

Este ejercicio profundiza en el consumo de APIs agregando filtros de datos y creando nuevos recursos utilizando `POST`. Trabajarás con una lista de tareas (TODO list) simulada.

## 🎯 Objetivos

- Recuperar y filtrar colecciones de datos.
- Realizar peticiones `POST` para crear recursos.
- Analizar datos obtenidos para generar resúmenes estadísticos.
- Manejar respuestas de arrays y objetos JSON.

## 📝 Descripción

Utilizarás la API de **JSONPlaceholder** (endpoints `/todos`) para gestionar las tareas de los usuarios. Deberás implementar funciones que permitan ver tareas pendientes, completadas y agregar nuevas tareas.

### Endpoints Disponibles

Consulta la documentación detallada:
[📄 Ver Documentación de Endpoints (`endpoint-doc.md`)](./endpoint-doc.md)

### Requerimientos

Implementa las siguientes funciones en `exercise.js`:

1.  **`fetchTodosByUser(userId)`**:
    - Obtiene todas las tareas de un usuario específico (`GET /todos?userId={id}`).

2.  **`getCompletedTodos(userId)`**:
    - Retorna solo las tareas que tienen `completed: true`.
    - **Pista:** Usa `fetchTodosByUser` y luego `filter`.

3.  **`getPendingTodos(userId)`**:
    - Retorna solo las tareas que tienen `completed: false`.

4.  **`countTodosByStatus(userId)`**:
    - Retorna un objeto con el conteo de tareas:
      ```javascript
      {
        total: 10,
        completed: 4,
        pending: 6
      }
      ```

5.  **`createTodo(userId, title)`**:
    - Realiza un `POST` a `/todos` para crear una nueva tarea.
    - El body debe ser JSON: `{ userId, title, completed: false }`.
    - Retorna la respuesta de la API (la tarea creada).

### Pistas y Consejos

#### Filtrado de Arrays

Después de obtener los datos con `fetch`, puedes usar métodos de array como `.filter()`:

```javascript
const todos = await fetchTodosByUser(1);
const completed = todos.filter(todo => todo.completed === true);
```

#### Peticiones POST

Para crear datos, necesitas especificar el método, headers y body en `fetch`:

```javascript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }), // Convertir objeto a string JSON
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
const data = await response.json();
```

### 🧪 Ejecutar Tests

```bash
npm test 57-api-todos
```

¡Es hora de organizar esas tareas! 📋
