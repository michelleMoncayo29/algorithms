# Documentación de Endpoints - JSONPlaceholder (Posts y Comentarios)

Este documento describe los endpoints relacionados con Posts y Comentarios que utilizarás en este ejercicio.

**URL Base:** `https://jsonplaceholder.typicode.com`

---

## 1. Obtener un Post por ID

Recupera los detalles de una publicación específica.

- **Método:** `GET`
- **Endpoint:** `/posts/{id}`

### Ejemplo de Respuesta Exitosa (200 OK):

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

---

## 2. Obtener Comentarios de un Post

Recupera todos los comentarios asociados a un post específico.

- **Método:** `GET`
- **Endpoint:** `/comments`
- **Query Params:**
  - `postId` (número): Filtrar comentarios por el ID del post (ej. `?postId=1`).

Tambien es posible usar la ruta anidada `/posts/{id}/comments`, pero usaremos el query param para practicar filtrado.

### Ejemplo de Respuesta Exitosa (200 OK):

```json
[
  {
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    "postId": 1,
    "id": 2,
    "name": "quo vero reiciendis velit similique earum",
    "email": "Jayne_Kuhic@sydney.com",
    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  }
]
```

---

## 3. Buscar Comentarios (Búsqueda Global)

Permite buscar comentarios que contengan cierto texto. JSONPlaceholder soporta búsqueda simple con el parámetro `q`.

- **Método:** `GET`
- **Endpoint:** `/comments`
- **Query Params:**
  - `q` (string): Texto a buscar en cualquier campo del comentario (ej. `?q=voluptate`).

### Ejemplo de Respuesta Exitosa (200 OK):

Devuelve un array de comentarios que coinciden con la búsqueda.
