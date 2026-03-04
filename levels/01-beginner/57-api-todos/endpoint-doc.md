# Documentación de Endpoints - JSONPlaceholder (TODOs)

Este documento describe los endpoints relacionados con las "Tareas" (Todos) que utilizarás en este ejercicio.

**URL Base:** `https://jsonplaceholder.typicode.com`

---

## 1. Obtener Todas las Tareas del Usuario

Recupera la lista de todas las tareas asignadas a un usuario específico.

- **Método:** `GET`
- **Endpoint:** `/todos`
- **Query Params:**
  - `userId` (número): Filtrar tareas por ID de usuario (ej. `?userId=1`).

### Ejemplo de Respuesta Exitosa (200 OK):

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": true
  }
]
```

---

## 2. Crear una Nueva Tarea

Simula la creación de una nueva tarea en el sistema.

- **Método:** `POST`
- **Endpoint:** `/todos`
- **Headers:**
  - `Content-type: application/json; charset=UTF-8`
- **Body (JSON):**
  - `title` (string): Título de la tarea.
  - `userId` (número): ID del usuario que crea la tarea.
  - `completed` (boolean): Estado inicial de la tarea (generalmente `false`).

### Ejemplo de Body:

```json
{
  "title": "Comprar leche",
  "userId": 1,
  "completed": false
}
```

### Ejemplo de Respuesta Exitosa (201 Created):
La API retorna el objeto creado, asignándole un nuevo ID (generalmente 201 en JSONPlaceholder).

```json
{
  "title": "Comprar leche",
  "userId": 1,
  "completed": false,
  "id": 201
}
```

---

## 3. Obtener Tarea por ID (Opcional/Referencia)

Recupera una sola tarea específica.

- **Método:** `GET`
- **Endpoint:** `/todos/{id}`

### Ejemplo de Respuesta:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```
