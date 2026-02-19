# Documentación de Endpoints - JSONPlaceholder

Este documento describe los endpoints de la API JSONPlaceholder que utilizarás en este ejercicio.

**URL Base:** `https://jsonplaceholder.typicode.com`

---

## 1. Obtener Usuario por ID

Recupera la información detallada de un usuario específico.

- **Método:** `GET`
- **Endpoint:** `/users/{id}`
- **Parámetros:**
  - `id` (número): El identificador único del usuario (ej. `1`).

### Ejemplo de Respuesta Exitosa (200 OK):

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

### Posibles Errores:
- **404 Not Found:** Si el usuario con el ID especificado no existe.

---

## 2. Obtener Posts de un Usuario

Recupera todos los posts publicados por un usuario específico.

- **Método:** `GET`
- **Endpoint:** `/posts`
- **Query Params:**
  - `userId` (número): Filtrar posts por el ID del usuario (ej. `?userId=1`).

### Ejemplo de Respuesta Exitosa (200 OK):

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  // ... más posts
]
```

### Posibles Errores:
- **Respuesta Vacía (`[]`):** Si el usuario no tiene posts o no existe, la API retorna un array vacío (no un error 404).

---

## 3. Obtener Todos los Usuarios (Opcional)

Recupera la lista completa de usuarios.

- **Método:** `GET`
- **Endpoint:** `/users`

### Ejemplo de Respuesta Exitosa (200 OK):

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    // ...
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    // ...
  }
]
```
